package domains

import (
	"context"
	"time"
)

// Like has the like data for session.
type Like struct {
	ID        int64
	SessionID int
	UserID    string
	CreatedAt time.Time
}

// LikeRepo is basic operation unit for Like.
type LikeRepo interface {
	Insert(ctx context.Context, like *Like) (*Like, error)
}

// NewLikeRepo returns new LikeRepo.
func NewLikeRepo() (LikeRepo, error) {
	return &likeRepo{}, nil
}

type likeRepo struct {
	list []*Like
}

func (repo *likeRepo) Insert(ctx context.Context, like *Like) (*Like, error) {
	like.ID = int64(len(repo.list) + 1)
	repo.list = append(repo.list, like)
	return like, nil
}
