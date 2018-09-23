package domains

import (
	"context"
	"sync"
	"time"
)

// Like has the like data for session.
type Like struct {
	ID        int64
	SessionID int
	UUID      string
	CreatedAt time.Time
}

// LikeRepo is basic operation unit for Like.
type LikeRepo interface {
	Insert(ctx context.Context, like *Like) (*Like, error)
	BulkInsert(ctx context.Context, like []*Like) ([]*Like, error)
}

// NewLikeRepo returns new LikeRepo.
func NewLikeRepo() (LikeRepo, error) {
	return &likeRepo{}, nil
}

type likeRepo struct {
	list []*Like

	mu sync.Mutex
}

func (repo *likeRepo) Insert(ctx context.Context, like *Like) (*Like, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	like.ID = int64(len(repo.list) + 1)
	repo.list = append(repo.list, like)
	return like, nil
}

func (repo *likeRepo) BulkInsert(ctx context.Context, likes []*Like) ([]*Like, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	for _, like := range likes {
		like.ID = int64(len(repo.list) + 1)
		repo.list = append(repo.list, like)
	}
	return likes, nil
}
