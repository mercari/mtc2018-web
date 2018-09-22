package main

import (
	"net/http"
	"time"

	"github.com/mercari/mtc2018-web/server/config"
	"go.uber.org/zap"
)

// WithCORSHandler wrap http handler with CORS handling.
func WithCORSHandler(env *config.Env, handler http.Handler) http.Handler {
	return &corsHandler{
		Env:     env,
		Handler: handler,
	}
}

type corsHandler struct {
	Env     *config.Env
	Handler http.Handler
}

func (h *corsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if h.Env.Env != "production" {
		if origin := r.Header.Get("Origin"); origin == "http://localhost:8080" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			if r.Method == "OPTIONS" {
				// preflightに適当に200返す
				w.Write([]byte("✈️"))
				return
			}
		}
	}

	h.Handler.ServeHTTP(w, r)
}

// WithLogHandler wrap http handler with access logger with zap logger.
func WithLogHandler(logger *zap.Logger, handler http.Handler) http.Handler {
	return &logHandler{
		logger:  logger,
		handler: handler,
	}
}

type logHandler struct {
	logger  *zap.Logger
	handler http.Handler
}

func (h *logHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	start := time.Now()
	d := newDelegator(w)
	h.handler.ServeHTTP(d, r)
	h.logger.Info("request",
		zap.String("host", r.Host),
		zap.String("path", r.URL.Path),
		zap.Int("status", d.status),
		zap.Duration("duration", time.Now().Sub(start)),
		zap.String("method", r.Method),
		zap.String("proto", r.Proto),
		zap.String("user_agent", r.UserAgent()),
	)
}

func newDelegator(w http.ResponseWriter) *responseWriterDelegator {
	cn, ok := w.(http.CloseNotifier)
	if ok {
		return &responseWriterDelegator{
			ResponseWriter: w,
			CloseNotifier:  cn,
		}
	}
	return &responseWriterDelegator{
		ResponseWriter: w,
	}
}

type responseWriterDelegator struct {
	status int
	http.ResponseWriter
	http.CloseNotifier
}

// WriteHeader recordes status code while writing header.
func (w *responseWriterDelegator) WriteHeader(code int) {
	w.status = code
	w.ResponseWriter.WriteHeader(code)
}

// Write recordes status code while writing response.
func (w *responseWriterDelegator) Write(bytes []byte) (int, error) {
	if w.status == 0 {
		w.status = http.StatusOK
	}
	return w.ResponseWriter.Write(bytes)
}
