package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ MutationResolver = (*mutationResolver)(nil)

type mutationResolver struct{ *rootResolver }

func (r *mutationResolver) CreateLike(ctx context.Context, input CreateLikeInput) (*CreateLikePayload, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	kind, id, err := extractIntID(ctx, input.SessionID)
	if err != nil {
		return nil, err
	}
	if kind != "Session" {
		return nil, fmt.Errorf("invalid id format: %s", input.SessionID)
	}
	if id == 0 {
		return nil, fmt.Errorf("invalid id format: %s", input.SessionID)
	}

	sessionList, err := r.sessionRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	session := sessionList[0]

	session, err = r.sessionRepo.AddLiked(ctx, session.ID, 1)
	if err != nil {
		return nil, err
	}

	like, err := r.likeRepo.Insert(ctx, &domains.Like{
		SessionID: id,
		UserID:    "TODO",
	})
	if err != nil {
		return nil, err
	}

	for _, observer := range r.likeObservers {
		observer <- *like
	}

	return &CreateLikePayload{
		ClientMutationID: input.ClientMutationID,
		Like:             *like,
	}, nil
}
