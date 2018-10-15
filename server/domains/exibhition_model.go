package domains

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/config"
)

// Exhibition has the exhibition data.
type Exhibition struct {
	ID            int
	Place         string
	Title         string
	TitleJa       string
	Description   string
	DescriptionJa string
}

// IsNode is marker for gqlgen.
func (*Exhibition) IsNode() {}

// ExhibitionRepo is basic operation unit for Exhibition.
type ExhibitionRepo interface {
	Get(ctx context.Context, ids ...int) ([]*Exhibition, error)
	List(ctx context.Context, req *ExhibitionListRequest) (*ExhibitionListResp, error)
}

// ExhibitionListRequest provides option for ExhibitionRepo#List.
type ExhibitionListRequest struct {
	Limit       int
	LastKnownID int // 前回リストで返した最後のEntityのID
}

// ExhibitionListResp provides response for ExhibitionRepo#List.
type ExhibitionListResp struct {
	List        []*Exhibition
	LastKnownID int
	HasNext     bool
}

// NewExhibitionRepo returns new ExhibitionRepo.
func NewExhibitionRepo() (ExhibitionRepo, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	repo := &exhibitionRepo{data: make(map[int]*Exhibition)}

	for _, exhibitionData := range data.Exhibitions {
		exhibition := &Exhibition{
			ID:            exhibitionData.ExhibitionID,
			Place:         exhibitionData.Place,
			Title:         exhibitionData.Title,
			TitleJa:       exhibitionData.TitleJa,
			Description:   exhibitionData.Description,
			DescriptionJa: exhibitionData.DescriptionJa,
		}

		repo.list = append(repo.list, exhibition)
		repo.data[exhibition.ID] = exhibition
	}

	return repo, nil
}

type exhibitionRepo struct {
	list []*Exhibition
	data map[int]*Exhibition
}

func (repo *exhibitionRepo) Get(ctx context.Context, ids ...int) ([]*Exhibition, error) {

	resp := make([]*Exhibition, 0, len(ids))
	for _, id := range ids {
		exhibition, ok := repo.data[id]
		if !ok {
			return nil, fmt.Errorf("'Exhibition:%d' is not found", id)
		}
		resp = append(resp, exhibition)
	}

	return resp, nil
}

func (repo *exhibitionRepo) List(ctx context.Context, req *ExhibitionListRequest) (*ExhibitionListResp, error) {

	if req.Limit == 0 {
		req.Limit = 10
	}

	resp := &ExhibitionListResp{}
	var startIndex int
	if req.LastKnownID != 0 {
		for idx, exhibition := range repo.list {
			startIndex = idx + 1
			if exhibition.ID == req.LastKnownID {
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

	for _, exhibition := range repo.list[startIndex:endIndex] {
		resp.List = append(resp.List, exhibition)
		resp.LastKnownID = exhibition.ID
	}

	return resp, nil
}
