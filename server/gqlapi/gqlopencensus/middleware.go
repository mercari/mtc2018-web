package gqlopencensus

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"go.opencensus.io/trace"
)

// ResolverMiddleware add tracing for resolver.
func ResolverMiddleware() graphql.FieldMiddleware {
	return func(ctx context.Context, next graphql.Resolver) (interface{}, error) {
		rctx := graphql.GetResolverContext(ctx)
		ctx, span := trace.StartSpan(ctx, rctx.Object+"_"+rctx.Field.Name)
		defer span.End()

		span.AddAttributes(
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
		requestContext := graphql.GetRequestContext(ctx)
		requestName := "nameless-operation"
		if len(requestContext.Doc.Operations) != 0 {
			op := requestContext.Doc.Operations[0]
			if op.Name != "" {
				requestName = op.Name
			}
		}

		ctx, span := trace.StartSpan(ctx, requestName)
		defer span.End()

		span.AddAttributes(
			trace.StringAttribute("request.query", requestContext.RawQuery),
		)

		return next(ctx)
	}
}
