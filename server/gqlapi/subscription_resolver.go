package gqlapi

import (
	"context"

	"github.com/google/uuid"
	"github.com/mercari/mtc2018-web/server/domains"
)

var _ SubscriptionResolver = (*subscriptionResolver)(nil)

type subscriptionResolver struct{ *rootResolver }

func (r *subscriptionResolver) LikeAdded(ctx context.Context) (<-chan domains.Like, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	id := uuid.New().String()
	observer := make(chan domains.Like, 1)

	r.likeObservers[id] = observer

	go func() {
		<-ctx.Done()

		r.mu.Lock()
		defer r.mu.Unlock()

		delete(r.likeObservers, id)
	}()

	return observer, nil
}
