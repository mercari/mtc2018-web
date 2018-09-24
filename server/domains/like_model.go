package domains

import (
	"context"
	"sync"

	"cloud.google.com/go/spanner"
	"github.com/google/uuid"
)

// LikeRepo is basic operation unit for Like.
type LikeRepo interface {
	Insert(ctx context.Context, like *Like) (*Like, error)
	BulkInsert(ctx context.Context, like []*Like) ([]*Like, error)
}

// NewFakeLikeRepo returns new LikeRepo.
func NewFakeLikeRepo() (LikeRepo, error) {
	return &fakeLikeRepo{}, nil
}

type fakeLikeRepo struct {
	list []*Like

	mu sync.Mutex
}

func (repo *fakeLikeRepo) Insert(ctx context.Context, like *Like) (*Like, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	like.UUID = uuid.New().String()
	repo.list = append(repo.list, like)
	return like, nil
}

func (repo *fakeLikeRepo) BulkInsert(ctx context.Context, likes []*Like) ([]*Like, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	for _, like := range likes {
		like.UUID = uuid.New().String()
		repo.list = append(repo.list, like)
	}
	return likes, nil
}

// NewLikeRepo returns new LikeRepo.
func NewLikeRepo(spannerClient *spanner.Client) (LikeRepo, error) {
	return &likeRepo{spanner: spannerClient}, nil
}

type likeRepo struct {
	spanner *spanner.Client

	list []*Like
}

func (repo *likeRepo) Insert(ctx context.Context, like *Like) (*Like, error) {
	like.UUID = uuid.New().String()
	repo.list = append(repo.list, like)
	return like, nil
}

func (repo *likeRepo) BulkInsert(ctx context.Context, likes []*Like) ([]*Like, error) {
	for _, like := range likes {
		like.UUID = uuid.New().String()
		repo.list = append(repo.list, like)
	}
	return likes, nil
}
