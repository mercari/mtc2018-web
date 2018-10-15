package domains

import (
	"context"

	"github.com/mercari/mtc2018-web/server/config"
)

// News has the news data.
type News struct {
	ID        string
	Date      string
	Message   string
	MessageJa string
	Link      *string
}

// IsNode is marker for gqlgen.
func (*News) IsNode() {}

// NewsRepo is basic operation unit for News.
type NewsRepo interface {
	List(ctx context.Context, req *NewsListRequest) (*NewsListResp, error)
}

// NewsListRequest provides option for NewsRepo#List.
type NewsListRequest struct {
	Limit       int
	LastKnownID string // 前回リストで返した最後のEntityのID
}

// NewsListResp provides response for NewsRepo#List.
type NewsListResp struct {
	List        []*News
	LastKnownID string
	HasNext     bool
}

// NewNewsRepo returns new NewsRepo.
func NewNewsRepo() (NewsRepo, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	repo := &newsRepo{}

	for _, newsData := range data.News {
		link := newsData.Link
		news := &News{
			ID:        newsData.NewsID,
			Date:      newsData.Date,
			Message:   newsData.Message,
			MessageJa: newsData.MessageJa,
			Link:      &link,
		}

		repo.list = append(repo.list, news)
	}

	return repo, nil
}

type newsRepo struct {
	list []*News
	data map[int]*News
}

func (repo *newsRepo) List(ctx context.Context, req *NewsListRequest) (*NewsListResp, error) {

	if req.Limit == 0 {
		req.Limit = 10
	}

	resp := &NewsListResp{}
	var startIndex int
	if req.LastKnownID != "" {
		for idx, news := range repo.list {
			startIndex = idx + 1
			if news.ID == req.LastKnownID {
				break
			}
		}
	}
	if startIndex > len(repo.list) {
		startIndex = len(repo.list)
	}
	endIndex := startIndex + req.Limit
	if endIndex > len(repo.list) {
		endIndex = len(repo.list)
	}
	resp.HasNext = endIndex != len(repo.list)

	for _, news := range repo.list[startIndex:endIndex] {
		resp.List = append(resp.List, news)
		resp.LastKnownID = news.ID
	}

	return resp, nil
}
