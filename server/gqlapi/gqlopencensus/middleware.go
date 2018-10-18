package gqlopencensus

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"go.opencensus.io/trace"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
)

func datadogResourceName(ctx context.Context) string {
	// for DataDog tracing by github.com/DataDog/opencensus-go-exporter-datadog
	// https://github.com/DataDog/opencensus-go-exporter-datadog/blob/e6c7f767dc57ec482938d9d37237dc10d578fba9/span.go#L125-L126
	requestContext := graphql.GetRequestContext(ctx)
	requestName := "nameless-operation"
	if len(requestContext.Doc.Operations) != 0 {
		op := requestContext.Doc.Operations[0]
		if op.Name != "" {
			requestName = op.Name
		}
	}

	return requestName
}

// ResolverMiddleware add tracing for resolver.
func ResolverMiddleware() graphql.FieldMiddleware {
	return func(ctx context.Context, next graphql.Resolver) (interface{}, error) {
		rctx := graphql.GetResolverContext(ctx)
		ctx, span := trace.StartSpan(ctx, rctx.Object+"/"+rctx.Field.Name)
		defer span.End()

		span.AddAttributes(
			trace.StringAttribute(ext.ResourceName, datadogResourceName(ctx)),
			trace.StringAttribute("resolver.object", rctx.Object),
			trace.StringAttribute("resolver.field", rctx.Field.Name),
			trace.StringAttribute("resolver.path", fmt.Sprintf("%+v", rctx.Path())),
		)

		return next(ctx)
	}
}

// RequestMiddleware add tracing for request.
func RequestMiddleware() graphql.RequestMiddleware {
	return func(ctx context.Context, next func(ctx context.Context) []byte) []byte {
		ctx, span := trace.StartSpan(ctx, datadogResourceName(ctx))
		defer span.End()

		requestContext := graphql.GetRequestContext(ctx)
		span.AddAttributes(
			trace.StringAttribute("request.query", requestContext.RawQuery),
		)

		return next(ctx)
	}
}
