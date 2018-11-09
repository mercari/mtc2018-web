package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ SlideResolver = (*slideResolver)(nil)

type slideResolver struct{ *rootResolver }

func (r *slideResolver) ID(ctx context.Context, obj *domains.Slide) (string, error) {
	if obj == nil {
		return "", nil
	}

	return fmt.Sprintf("Slide:%d", obj.ID), nil
}

func (r *slideResolver) SlideID(ctx context.Context, obj *domains.Slide) (int, error) {
	if obj == nil {
		return 0, nil
	}
	return obj.ID, nil
}

func (r *slideResolver) Session(ctx context.Context, obj *domains.Slide) (domains.Session, error) {
	if obj == nil {
		return domains.Session{}, nil
	}

	sessions, err := r.sessionRepo.Get(ctx, obj.SessionID)
	if err != nil || len(sessions) < 1 {
		return domains.Session{}, nil
	}

	return *sessions[0], nil
}

func (r *slideResolver) Speaker(ctx context.Context, obj *domains.Slide) (domains.Speaker, error) {
	if obj == nil {
		return domains.Speaker{}, nil
	}

	speakers, err := r.speakerRepo.Get(ctx, obj.SpeakerID)
	if err != nil || len(speakers) < 1 {
		return domains.Speaker{}, nil
	}

	return *speakers[0], nil
}
