package gqlapi

import (
	"context"
	"fmt"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ SessionResolver = (*sessionResolver)(nil)

type sessionResolver struct{ *rootResolver }

func (r *sessionResolver) ID(ctx context.Context, obj *domains.Session) (string, error) {
	return fmt.Sprintf("Session:%d", obj.ID), nil
}

func (r *sessionResolver) Liked(ctx context.Context, obj *domains.Session) (int, error) {
	if obj == nil {
		return 0, nil
	}

	// TODO DBから取得して適当にキャッシュするようにする

	return obj.Liked, nil
}

func (r *sessionResolver) Speakers(ctx context.Context, obj *domains.Session) ([]domains.Speaker, error) {
	if obj == nil {
		return nil, nil
	}

	speakerIDs := make([]string, 0, len(obj.SpeakerIDs))
	for _, id := range obj.SpeakerIDs {
		speakerIDs = append(speakerIDs, id)
	}

	sessionList, err := r.speakerRepo.Get(ctx, speakerIDs...)
	if err != nil {
		return nil, err
	}

	var resp []domains.Speaker
	for _, session := range sessionList {
		resp = append(resp, *session)
	}

	return resp, nil
}

func (r *sessionResolver) Slides(ctx context.Context, obj *domains.Session) ([]domains.Slide, error) {
	if obj == nil {
		return nil, nil
	}

	slides, err := r.slideRepo.ListBySessionID(ctx, obj.ID)
	if err != nil {
		return nil, err
	}

	return slides, nil
}

func (r *sessionResolver) Movies(ctx context.Context, obj *domains.Session) ([]domains.Movie, error) {
	if obj == nil {
		return nil, nil
	}

	movies, err := r.movieRepo.ListByMoviesBySessionID(ctx, obj.ID)
	if err != nil {
		return nil, err
	}

	return movies, nil
}
