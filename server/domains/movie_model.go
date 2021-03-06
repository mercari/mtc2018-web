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
	ListByMoviesBySpeakerID(ctx context.Context, speakerID string) ([]Movie, error)
}

// NewMovieRepo returns new MovieRepo
func NewMovieRepo() (MovieRepo, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	repo := &movieRepo{}

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
	var movies []Movie

	for _, s := range repo.list {
		if s.SessionID == sessionID {
			movies = append(movies, s)
		}
	}
	return movies, nil
}

func (repo *movieRepo) ListByMoviesBySpeakerID(ctx context.Context, speakerID string) ([]Movie, error) {
	var movies []Movie

	for _, s := range repo.list {
		if s.SpeakerID == speakerID {
			movies = append(movies, s)
		}
	}

	return movies, nil
}
