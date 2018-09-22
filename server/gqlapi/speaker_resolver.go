package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ SpeakerResolver = (*speakerResolver)(nil)

type speakerResolver struct{ *rootResolver }

func (r *speakerResolver) ID(ctx context.Context, obj *domains.Speaker) (string, error) {
	return fmt.Sprintf("Speaker:%s", obj.ID), nil
}

func (r *speakerResolver) Sessions(ctx context.Context, obj *domains.Speaker) ([]domains.Session, error) {
	if obj == nil {
		return nil, nil
	}

	sessionsList, err := r.sessionRepo.GetBySpeakerIDs(ctx, obj.ID)
	if err != nil {
		return nil, err
	}

	sessions := make([]domains.Session, 0, len(sessionsList[0]))
	for _, session := range sessionsList[0] {
		sessions = append(sessions, *session)
	}

	return sessions, nil
}
