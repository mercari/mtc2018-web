package main

import (
	"net/http"

	"github.com/mercari/mtc2018-web/server/config"
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
