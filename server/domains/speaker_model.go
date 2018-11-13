package domains

import (
	"context"

	"github.com/mercari/mtc2018-web/server/config"
)

// Speaker has the speaker data.
type Speaker struct {
	ID         string
	Name       string
	NameJa     string
	Company    string
	Position   string
	PositionJa string
	Profile    string
	ProfileJa  string
	IconURL    string
	TwitterID  string
	GithubID   string
}

// IsNode is marker for gqlgen.
func (*Speaker) IsNode() {}

// SpeakerRepo is basic operation unit for Speaker.
type SpeakerRepo interface {
	Get(ctx context.Context, ids ...string) ([]Speaker, error)
}

// NewSpeakerRepo returns new SpeakerRepo.
func NewSpeakerRepo() (SpeakerRepo, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	repo := &speakerRepo{data: make(map[string]*Speaker)}

	for _, sessionData := range data.Sessions {
		for _, speakerData := range sessionData.Speakers {
			speaker := &Speaker{
				ID:         speakerData.SpeakerID,
				Name:       speakerData.Name,
				NameJa:     speakerData.NameJa,
				Company:    speakerData.Company,
				Position:   speakerData.Position,
				PositionJa: speakerData.PositionJa,
				Profile:    speakerData.Profile,
				ProfileJa:  speakerData.ProfileJa,
				IconURL:    speakerData.IconURL,
				TwitterID:  speakerData.TwitterID,
				GithubID:   speakerData.GithubID,
			}

			repo.data[speaker.ID] = speaker
		}
	}

	return repo, nil
}

type speakerRepo struct {
	data map[string]*Speaker
}

func (repo *speakerRepo) Get(ctx context.Context, ids ...string) ([]Speaker, error) {
	list := make([]Speaker, 0, len(ids))

	for _, id := range ids {
		speaker := repo.data[id]
		list = append(list, *speaker)
	}

	return list, nil
}
