package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ NewsResolver = (*newsResolver)(nil)

type newsResolver struct{ *rootResolver }

func (r *newsResolver) ID(ctx context.Context, obj *domains.News) (string, error) {
	return fmt.Sprintf("News:%s", obj.ID), nil
}
