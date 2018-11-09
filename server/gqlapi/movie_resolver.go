package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ MovieResolver = (*movieResolver)(nil)

type movieResolver struct{ *rootResolver }

func (r *movieResolver) ID(ctx context.Context, obj *domains.Movie) (string, error) {
	if obj == nil {
		return "", nil
	}

	return fmt.Sprintf("Movie:%d", obj.ID), nil
}

func (r *movieResolver) MovieID(ctx context.Context, obj *domains.Movie) (int, error) {
	if obj == nil {
		return 0, nil
	}
	return obj.ID, nil
}
func (r *movieResolver) Session(ctx context.Context, obj *domains.Movie) (domains.Session, error) {
	if obj == nil {
		return domains.Session{}, nil
	}

	sessions, err := r.sessionRepo.Get(ctx, obj.SessionID)
	if err != nil || len(sessions) < 1 {
		return domains.Session{}, nil
	}

	return *sessions[0], nil
}
func (r *movieResolver) Speaker(ctx context.Context, obj *domains.Movie) (domains.Speaker, error) {
	if obj == nil {
		return domains.Speaker{}, nil
	}

	speakers, err := r.speakerRepo.Get(ctx, obj.SpeakerID)
	if err != nil || len(speakers) < 1 {
		return domains.Speaker{}, nil
	}

	return *speakers[0], nil
}
