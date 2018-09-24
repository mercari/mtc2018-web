package gqlapi

import (
	"context"
	"fmt"
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

	like := r.storer.Add(session.ID, input.UUID)

	return &CreateLikePayload{
		ClientMutationID: input.ClientMutationID,
		Like:             like,
	}, nil
}
