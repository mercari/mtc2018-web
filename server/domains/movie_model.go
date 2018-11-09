package domains

import (
	"context"

	"github.com/mercari/mtc2018-web/server/config"
)

// Movie has the movie data.
type Movie struct {
	ID        int
	URL       string
	SessionID int
	SpeakerID string
}

// IsNode is marker for gqlgen.
func (*Movie) IsNode() {}

// MovieRepo is basic operation unit for Movie.
type MovieRepo interface {
	ListByMoviesBySessionID(ctx context.Context, sessionID int) ([]Movie, error)
}

// NewMovieRepo returns new MovieRepo
func NewMovieRepo() (MovieRepo, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	repo := &movieRepo{list: []Movie{}}

	for index, movieData := range data.Movies {
		movie := Movie{
			ID:        index,
			URL:       movieData.URL,
			SessionID: movieData.SessionID,
			SpeakerID: movieData.SpeakerID,
		}
		repo.list = append(repo.list, movie)
	}

	return repo, nil
}

type movieRepo struct {
	list []Movie
}

func (repo *movieRepo) ListByMoviesBySessionID(ctx context.Context, sessionID int) ([]Movie, error) {
	movies := []Movie{}

	for _, s := range repo.list {
		if s.SessionID == sessionID {
			movies = append(movies, s)
		}
	}

	return movies, nil
}
