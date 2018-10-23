package gqlopencensus

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"go.opencensus.io/trace"
)

var _ graphql.Tracer = (*tracerImpl)(nil)

// New tracer returns for OpenCensus.
func New(cfg *Config) graphql.Tracer {
	return &tracerImpl{cfg}
}

// Config provides Tracer agent specific values.
type Config struct {
	OperationSpanModifier func(ctx context.Context, span *trace.Span)
	FieldSpanModifier     func(ctx context.Context, span *trace.Span)
}

type tracerImpl struct {
	cfg *Config
}

func (t *tracerImpl) StartOperationExecution(ctx context.Context) context.Context {
	ctx, span := trace.StartSpan(ctx, operationName(ctx))
	requestContext := graphql.GetRequestContext(ctx)
	span.AddAttributes(
		trace.StringAttribute("request.query", requestContext.RawQuery),
	)
	if t.cfg != nil && t.cfg.OperationSpanModifier != nil {
		t.cfg.OperationSpanModifier(ctx, span)
	}

	return ctx
}

func (t *tracerImpl) EndOperationExecution(ctx context.Context) {
	span := trace.FromContext(ctx)
	span.End()
}

func (t *tracerImpl) StartFieldExecution(ctx context.Context) context.Context {
	rctx := graphql.GetResolverContext(ctx)
	ctx, span := trace.StartSpan(ctx, rctx.Object+"/"+rctx.Field.Name)
	span.AddAttributes(
		trace.StringAttribute("resolver.object", rctx.Object),
		trace.StringAttribute("resolver.field", rctx.Field.Name),
		trace.StringAttribute("resolver.path", fmt.Sprintf("%+v", rctx.Path())),
	)
	if t.cfg != nil && t.cfg.FieldSpanModifier != nil {
		t.cfg.FieldSpanModifier(ctx, span)
	}

	return ctx
}

func (t *tracerImpl) EndFieldExecution(ctx context.Context) {
	span := trace.FromContext(ctx)
	span.End()
}

func operationName(ctx context.Context) string {
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
