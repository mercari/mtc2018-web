package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ ExhibitionResolver = (*exhibitionResolver)(nil)

type exhibitionResolver struct{ *rootResolver }

func (r *exhibitionResolver) ID(ctx context.Context, obj *domains.Exhibition) (string, error) {
	return fmt.Sprintf("Exhibition:%d", obj.ID), nil
}
