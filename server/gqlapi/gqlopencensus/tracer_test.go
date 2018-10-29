package gqlopencensus_test

import (
	"context"
	"reflect"
	"sync"
	"testing"

	"github.com/99designs/gqlgen/graphql"
	"github.com/mercari/mtc2018-web/server/gqlapi/gqlopencensus"
	"github.com/vektah/gqlparser/ast"
	"go.opencensus.io/trace"
)

func TestTracer(t *testing.T) {
	var logs []string
	var mu sync.Mutex

	tracer := gqlopencensus.New(
		gqlopencensus.WithStartOperationExecution(func(ctx context.Context) context.Context {
			logs = append(logs, "StartOperationExecution")
			return ctx
		}),
		gqlopencensus.WithStartFieldExecution(func(ctx context.Context, field graphql.CollectedField) context.Context {
			logs = append(logs, "StartFieldExecution")
			return ctx
		}),
		gqlopencensus.WithStartFieldResolverExecution(func(ctx context.Context, rc *graphql.ResolverContext) context.Context {
			logs = append(logs, "StartFieldResolverExecution")
			return ctx
		}),
		gqlopencensus.WithStartFieldChildExecution(func(ctx context.Context) context.Context {
			logs = append(logs, "StartFieldChildExecution")
			return ctx
		}),
		gqlopencensus.WithEndFieldExecution(func(ctx context.Context) {
			logs = append(logs, "EndFieldExecution")
		}),
		gqlopencensus.WithEndOperationExecutions(func(ctx context.Context) {
			logs = append(logs, "EndOperationExecution")
		}),
	)

	t.Run("with sampling", func(t *testing.T) {
		mu.Lock()
		defer mu.Unlock()
		logs = nil

		ctx := context.Background()
		ctx = graphql.WithRequestContext(ctx, &graphql.RequestContext{})
		ctx, _ = trace.StartSpan(ctx, "test", trace.WithSampler(trace.AlwaysSample()))
		ctx = tracer.StartOperationExecution(ctx)
		ctx = tracer.StartFieldExecution(ctx, graphql.CollectedField{
			Field: &ast.Field{
				Name: "F",
				ObjectDefinition: &ast.Definition{
					Name: "OD",
				},
			},
		})
		ctx = tracer.StartFieldResolverExecution(ctx, &graphql.ResolverContext{})
		ctx = tracer.StartFieldChildExecution(ctx)
		tracer.EndFieldExecution(ctx)
		tracer.EndOperationExecution(ctx)

		expected := []string{
			"StartOperationExecution",
			"StartFieldExecution",
			"StartFieldResolverExecution",
			"StartFieldChildExecution",
			"EndFieldExecution",
			"EndOperationExecution",
		}
		if !reflect.DeepEqual(logs, expected) {
			t.Errorf("unexpected result: %+v", logs)
		}
	})
	t.Run("without sampling", func(t *testing.T) {
		mu.Lock()
		defer mu.Unlock()
		logs = nil

		ctx := context.Background()
		ctx = graphql.WithRequestContext(ctx, &graphql.RequestContext{})
		ctx, _ = trace.StartSpan(ctx, "test", trace.WithSampler(trace.NeverSample()))
		ctx = tracer.StartOperationExecution(ctx)
		ctx = tracer.StartFieldExecution(ctx, graphql.CollectedField{
			Field: &ast.Field{
				Name: "F",
				ObjectDefinition: &ast.Definition{
					Name: "OD",
				},
			},
		})
		ctx = tracer.StartFieldResolverExecution(ctx, &graphql.ResolverContext{})
		ctx = tracer.StartFieldChildExecution(ctx)
		tracer.EndFieldExecution(ctx)
		tracer.EndOperationExecution(ctx)

		var expected []string
		if !reflect.DeepEqual(logs, expected) {
			t.Errorf("unexpected result: %+v", logs)
		}
	})
}
