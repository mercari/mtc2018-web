package domains

import (
	"context"

	"github.com/mercari/mtc2018-web/server/config"
)

// Slide has the slide data.
type Slide struct {
	ID        int
	Lang      string
	URL       string
	SessionID int
	SpeakerID string
}

// IsNode is marker for gqlgen.
func (*Slide) IsNode() {}

// SlideRepo is basic operation unit for Slide.
type SlideRepo interface {
	ListBySessionID(ctx context.Context, sessionID int) ([]Slide, error)
}

// NewSlideRepo returns new SlideRepo.
func NewSlideRepo() (SlideRepo, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	repo := &slideRepo{list: []Slide{}}

	for index, slideData := range data.Slides {
		slide := Slide{
			ID:        index,
			Lang:      slideData.Lang,
			URL:       slideData.URL,
			SessionID: slideData.SessionID,
			SpeakerID: slideData.SpeakerID,
		}

		repo.list = append(repo.list, slide)
	}

	return repo, nil
}

type slideRepo struct {
	list []Slide
}

func (repo *slideRepo) ListBySessionID(ctx context.Context, sessionID int) ([]Slide, error) {
	slides := []Slide{}

	for _, s := range repo.list {
		if s.SessionID == sessionID {
			slides = append(slides, s)
		}
	}

	return slides, nil
}
