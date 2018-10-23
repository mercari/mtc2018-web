package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"cloud.google.com/go/spanner"
	"github.com/99designs/gqlgen/handler"
	"github.com/DataDog/opencensus-go-exporter-datadog"
	"github.com/gorilla/websocket"
	"github.com/mercari/mtc2018-web/server/config"
	_ "github.com/mercari/mtc2018-web/server/config/statik"
	"github.com/mercari/mtc2018-web/server/gqlapi"
	"github.com/mercari/mtc2018-web/server/gqlapi/gqlopencensus"
	"github.com/pkg/errors"
	"go.opencensus.io/plugin/ochttp"
	"go.opencensus.io/trace"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// newLogger creates a new zap logger with the given log level.
func newLogger(level string) (*zap.Logger, error) {
	level = strings.ToUpper(level)
	var l zapcore.Level
	switch level {
	case "DEBUG":
		l = zapcore.DebugLevel
	case "INFO":
		l = zapcore.InfoLevel
	case "ERROR":
		l = zapcore.ErrorLevel
	default:
		return nil, errors.Errorf("invalid loglevel: %s", level)
	}

	config := zap.NewProductionConfig()
	config.Level = zap.NewAtomicLevelAt(l)
	config.DisableStacktrace = true
	config.OutputPaths = []string{"stdout"}
	config.ErrorOutputPaths = []string{"stderr"}
	return config.Build()
}

func main() {
	// Read configurations from environmental variables.
	env, err := config.ReadFromEnv()
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] Failed to read env vars: %s\n", err)
		os.Exit(1)
	}

	// Setup new zap logger. This logger should be used for all logging in this service.
	// The log level can be updated via environment variables.
	logger, err := newLogger(env.LogLevel)
	if err != nil {
		fmt.Fprintf(os.Stderr, "[ERROR] Failed to setup logger: %s\n", err)
		os.Exit(1)
	}

	dd := datadog.NewExporter(datadog.Options{
		Service:   config.ServiceName,
		TraceAddr: fmt.Sprintf("%s:8126", env.DDAgentHostname),
		Tags:      []string{"env", env.Env},
		GlobalTags: map[string]interface{}{
			"env": env.Env,
		},
	})
	defer dd.Stop()

	trace.RegisterExporter(dd)

	trace.ApplyConfig(trace.Config{
		DefaultSampler: trace.AlwaysSample(),
	})

	var spannerClient *spanner.Client
	if env.UseSpanner {
		var err error
		dbname := fmt.Sprintf("projects/%s/instances/%s/databases/%s",
			env.SpannerProjectID, env.SpannerInstanceID, env.SpannerDatabaseID)
		logger.Info(fmt.Sprintf("enable spanner: %s", dbname))
		spannerClient, err = spanner.NewClient(context.Background(), dbname)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] Failed to create spanner client: %s\n", err)
			os.Exit(1)
		}
	}

	runServer(env.Port, env, logger, spannerClient)
}

func runServer(port int, env *config.Env, logger *zap.Logger, spannerClient *spanner.Client) {
	mux := http.NewServeMux()

	// for kubernetes readiness probe
	mux.HandleFunc("/healthz/readiness", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// for kubernetes liveness probe
	mux.HandleFunc("/healthz/liveness", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// GraphQL implementation
	// playgroundがapiの下にあるの微妙だけどGKEのIngress的にこのほうが楽なのでまぁこれでいいでしょ
	mux.Handle("/2018/api/playground", handler.Playground("GraphQL playground", "/2018/api/query"))
	resolver, err := gqlapi.NewResolver(logger, spannerClient)
	if err != nil {
		logger.Fatal(err.Error(), zap.Error(err))
	}
	mux.Handle("/2018/api/query", handler.GraphQL(
		gqlapi.NewExecutableSchema(
			gqlapi.Config{
				Resolvers: resolver,
			},
		),
		handler.Tracer(gqlopencensus.New(gqlopencensus.DataDogConfig)),
		handler.WebsocketUpgrader(websocket.Upgrader{}),
	))

	// index
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		ctx, span := trace.StartSpan(r.Context(), "hello世界")

		r = r.WithContext(ctx)
		defer span.End()

		w.Write([]byte("Hello, 世界"))
	})

	logger.Info("start http server")

	var handler http.Handler
	handler = &ochttp.Handler{
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if span := trace.FromContext(r.Context()); span != nil {
				span.AddAttributes(trace.StringAttribute("env", env.Env))
			}
			mux.ServeHTTP(w, r)
		}),
		IsPublicEndpoint: true,
	}
	handler = WithLogHandler(logger, mux)
	handler = WithCORSHandler(env, handler)
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), handler)
	if err != nil {
		logger.Fatal(err.Error(), zap.Error(err))
	}
}
