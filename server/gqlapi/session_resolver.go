package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ SessionResolver = (*sessionResolver)(nil)

type sessionResolver struct{ *rootResolver }

func (r *sessionResolver) ID(ctx context.Context, obj *domains.Session) (string, error) {
	return fmt.Sprintf("Session:%d", obj.ID), nil
}

func (r *sessionResolver) Speakers(ctx context.Context, obj *domains.Session) ([]domains.Speaker, error) {
	if obj == nil {
		return nil, nil
	}

	speakerIDs := make([]string, 0, len(obj.SpeakerIDs))
	for _, id := range obj.SpeakerIDs {
		speakerIDs = append(speakerIDs, id)
	}

	sessionList, err := r.speakerRepo.Get(ctx, speakerIDs...)
	if err != nil {
		return nil, err
	}

	var resp []domains.Speaker
	for _, session := range sessionList {
		resp = append(resp, *session)
	}

	return resp, nil
}
