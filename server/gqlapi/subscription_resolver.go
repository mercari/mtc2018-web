package gqlapi

import (
	"context"
	"fmt"

	"github.com/google/uuid"
)

var _ SubscriptionResolver = (*subscriptionResolver)(nil)

type subscriptionResolver struct{ *rootResolver }

func (r *subscriptionResolver) LikeAdded(ctx context.Context, sessionID int) (<-chan LikeEvent, error) {
	listenerID := uuid.New().String()

	sessionList, err := r.sessionRepo.Get(ctx, sessionID)
	if err != nil {
		return nil, err
	}
	session := sessionList[0]

	r.Logger.Info(fmt.Sprintf("likesAdded: new subscption: %s", listenerID))
	r.mu.Lock()
	defer r.mu.Unlock()

	ch := r.listener.AddListener(listenerID, session.ID)

	go func() {
		<-ctx.Done()
		r.Logger.Info(fmt.Sprintf("likesAdded: end subscription: %s", listenerID))
		r.listener.RemoveListener(listenerID, session.ID)
	}()

	return ch, nil
}
