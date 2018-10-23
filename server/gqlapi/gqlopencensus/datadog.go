package gqlopencensus

import (
	"context"

	"go.opencensus.io/trace"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
)

var DataDogConfig = &Config{
	FieldSpanModifier: func(ctx context.Context, span *trace.Span) {
		// for DataDog tracing by github.com/DataDog/opencensus-go-exporter-datadog
		// https://github.com/DataDog/opencensus-go-exporter-datadog/blob/e6c7f767dc57ec482938d9d37237dc10d578fba9/span.go#L125-L126
		span.AddAttributes(
			trace.StringAttribute(ext.ResourceName, operationName(ctx)),
		)
	},
}
