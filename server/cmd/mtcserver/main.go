package main

import (
	"fmt"
	"github.com/pkg/errors"
	"net/http"
	"os"
	"strings"

	"github.com/mercari/mtc2018-web/server/config"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	ddnethttp "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
	ddtracer "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
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

	// Start DataDog trace client for sending tracing information(APM).
	ddtracer.Start(
		ddtracer.WithAgentAddr(fmt.Sprintf("%s:8126", env.DDAgentHostname)),
		ddtracer.WithServiceName(config.ServiceName),
		ddtracer.WithGlobalTag("env", env.Env),
	)
	defer ddtracer.Stop()

	runServer(env.Port, logger)
}

func runServer(port int, logger *zap.Logger) {
	mux := ddnethttp.NewServeMux(ddnethttp.WithServiceName(config.ServiceName))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, 世界"))
	})

	// for kubernetes readiness probe
	mux.HandleFunc("/healthz/readiness", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// for kubernetes liveness probe
	mux.HandleFunc("/healthz/liveness", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	logger.Info("start http server")
	http.ListenAndServe(fmt.Sprintf(":%d", port), mux)
}
