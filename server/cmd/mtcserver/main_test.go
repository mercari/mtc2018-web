package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"go.uber.org/zap"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/mocktracer"
)

func TestTrace(t *testing.T) {
	// github.com/DataDog/opencensus-go-exporter-datadog がmocktracerサポートしてなさそうなので
	t.SkipNow()

	mt := mocktracer.Start()
	defer mt.Stop()

	port := 10000
	logger := zap.NewNop()

	go runServer(port, logger) // never stop

	time.Sleep(100 * time.Millisecond)

	t.Run("Trace", func(t *testing.T) {
		url := fmt.Sprintf("http://localhost:%d/", port)
		res, err := http.Get(url)
		require.NoError(t, err)
		defer res.Body.Close()

		assert.Equal(t, 200, res.StatusCode)
		b, err := ioutil.ReadAll(res.Body)
		require.NoError(t, err)
		assert.Equal(t, "Hello, 世界", string(b))

		spans := mt.FinishedSpans()
		require.Equal(t, 1, len(spans))

		s := spans[0]
		assert.Equal(t, "http.request", s.OperationName())
		assert.Equal(t, "mtc2018", s.Tag(ext.ServiceName))
		assert.Equal(t, "GET /", s.Tag(ext.ResourceName))
		assert.Equal(t, "200", s.Tag(ext.HTTPCode))
		assert.Equal(t, "GET", s.Tag(ext.HTTPMethod))
		assert.Equal(t, "/", s.Tag(ext.HTTPURL))
		assert.Equal(t, nil, s.Tag(ext.Error))
	})
}
