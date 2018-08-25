package main

import "net/http"

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, 世界"))
	})

	// for kubenretes readiness probe
	http.HandleFunc("/healthz/readiness", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	// for kubenretes liveness probe
	http.HandleFunc("/healthz/liveness", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("OK"))
	})

	http.ListenAndServe(":8080", nil)
}
