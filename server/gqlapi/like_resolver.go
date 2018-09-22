package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ LikeResolver = (*likeResolver)(nil)

type likeResolver struct{ *rootResolver }

func (r *likeResolver) ID(ctx context.Context, obj *domains.Like) (string, error) {
	return fmt.Sprintf("Like:%d", obj.ID), nil
}

func (r *likeResolver) Session(ctx context.Context, obj *domains.Like) (domains.Session, error) {
	if obj == nil {
		return domains.Session{}, nil
	}

	sessionList, err := r.sessionRepo.Get(ctx, obj.SessionID)
	if err != nil {
		return domains.Session{}, err
	}
	session := sessionList[0]

	return *session, nil
}
