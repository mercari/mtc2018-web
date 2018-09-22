package gqlapi

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/mercari/mtc2018-web/server/domains"
)

var _ SubscriptionResolver = (*subscriptionResolver)(nil)

type subscriptionResolver struct{ *rootResolver }

func (r *subscriptionResolver) LikeAdded(ctx context.Context) (<-chan domains.Like, error) {
	id := uuid.New().String()

	r.Logger.Info(fmt.Sprintf("likesAdded: new subscption: %s", id))
	r.mu.Lock()
	defer r.mu.Unlock()

	observer := make(chan domains.Like, 1)

	r.likeObservers[id] = observer

	go func() {
		<-ctx.Done()
		r.Logger.Info(fmt.Sprintf("likesAdded: end subscription: %s", id))

		r.mu.Lock()
		defer r.mu.Unlock()

		delete(r.likeObservers, id)
	}()

	return observer, nil
}
