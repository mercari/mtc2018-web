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

	if input.UUID == "" {
		return nil, fmt.Errorf("invalid uuid")
	}

	sessionList, err := r.sessionRepo.Get(ctx, input.SessionID)
	if err != nil {
		return nil, err
	}
	session := sessionList[0]

	session, err = r.sessionRepo.AddLiked(ctx, session.ID, 1)
	if err != nil {
		return nil, err
	}

	like, err := r.likeRepo.Insert(ctx, &domains.Like{
		SessionID: session.ID,
		UUID:      input.UUID,
	})
	if err != nil {
		return nil, err
	}

	r.storer.Add(session.ID, input.UUID)

	return &CreateLikePayload{
		ClientMutationID: input.ClientMutationID,
		Like:             *like,
	}, nil
}
