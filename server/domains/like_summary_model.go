package domains

import (
	"context"
	"sync"
	"time"
)

// LikeSummaryServer has the like summary per second per server for session.
type LikeSummaryServer struct {
	SessionID int
	Second    int64
	ServerID  string
	Likes     int
	CreatedAt time.Time
}

// LikeSummary has the like summary per second for session.
type LikeSummary struct {
	SessionID int
	Second    int64
	Likes     int
}

// LikeSummaryListResp has a list of like summary per second for session.
type LikeSummaryListResp struct {
	List []*LikeSummary
}

// LikeSummaryRepo is basic operation unit for LikeSummary.
type LikeSummaryRepo interface {
	Insert(ctx context.Context, like *LikeSummaryServer) (*LikeSummaryServer, error)
	BulkInsert(ctx context.Context, like []*LikeSummaryServer) ([]*LikeSummaryServer, error)
	List(ctx context.Context, second int64) (*LikeSummaryListResp, error)
}

// NewLikeSummaryRepo returns new LikeSummaryRepo.
func NewLikeSummaryRepo() (LikeSummaryRepo, error) {
	return &likeSummaryRepo{}, nil
}

type likeSummaryRepo struct {
	list []*LikeSummaryServer
	mu   sync.RWMutex
}

func (repo *likeSummaryRepo) Insert(ctx context.Context, like *LikeSummaryServer) (*LikeSummaryServer, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	repo.list = append(repo.list, like)
	return like, nil
}

func (repo *likeSummaryRepo) BulkInsert(ctx context.Context, likeSum []*LikeSummaryServer) ([]*LikeSummaryServer, error) {
	repo.mu.Lock()
	defer repo.mu.Unlock()

	for i := range likeSum {
		repo.list = append(repo.list, likeSum[i])
	}
	return likeSum, nil
}

// List fetches sum of likes in specified second.
func (repo *likeSummaryRepo) List(ctx context.Context, second int64) (*LikeSummaryListResp, error) {
	// SELECT Second, SessionID, SUM(Likes) Likes FROM LikesSummaries GROUP BY Second, SessionID WHERE Second = n

	repo.mu.RLock()
	defer repo.mu.RUnlock()

	sessionSum := make(map[int]int)
	for i := range repo.list {
		s := repo.list[i]
		if s.Second != second {
			continue
		}

		sessionSum[s.SessionID] += s.Likes
	}

	var list []*LikeSummary
	for sessionID, v := range sessionSum {
		list = append(list, &LikeSummary{
			SessionID: sessionID,
			Second:    second,
			Likes:     v,
		})
	}

	return &LikeSummaryListResp{
		List: list,
	}, nil
}
