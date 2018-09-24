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
	BulkInsert(ctx context.Context, like []Like) ([]Like, error)
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

func (repo *fakeLikeRepo) BulkInsert(ctx context.Context, likes []Like) ([]Like, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	for _, like := range likes {
		like.UUID = uuid.New().String()
		repo.list = append(repo.list, &like)
	}
	return likes, nil
}

// NewLikeRepo returns new LikeRepo.
func NewLikeRepo(spannerClient *spanner.Client) (LikeRepo, error) {
	return &likeRepo{spanner: spannerClient}, nil
}

type likeRepo struct {
	spanner *spanner.Client
}

func (repo *likeRepo) Insert(ctx context.Context, like *Like) (*Like, error) {
	like.UUID = uuid.New().String()
	_, err := repo.spanner.Apply(ctx, []*spanner.Mutation{like.Insert(ctx)})
	if err != nil {
		return nil, err
	}
	return like, nil
}

func (repo *likeRepo) BulkInsert(ctx context.Context, likes []Like) ([]Like, error) {
	muts := make([]*spanner.Mutation, 0, len(likes))
	for _, like := range likes {
		like.UUID = uuid.New().String()
		muts = append(muts, like.Insert(ctx))
	}

	_, err := repo.spanner.Apply(ctx, muts)
	if err != nil {
		return nil, err
	}
	return likes, nil
}
