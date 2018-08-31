//go:generate gqlgen

package gqlapi

import (
	"context"
	"encoding/base64"
	"fmt"
	"sync"

	"github.com/google/uuid"
	"github.com/mercari/mtc2018-web/server/config"
)

// NewResolver returns GraphQL root resolver.
func NewResolver() (ResolverRoot, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	r := &rootResolver{
		speakers:      make(map[string]Speaker),
		likeObservers: make(map[string]chan Like),
	}

	for idx, session := range data.Sessions {
		speakers := make([]Speaker, 0)
		for _, speaker := range session.Speakers {
			id := base64.RawURLEncoding.EncodeToString([]byte(fmt.Sprintf("Speaker:%d", len(r.speakers)+1)))
			// GitHubIDは必須入力でかつユニークっぽい(今のところ)
			r.speakers[speaker.GithubID] = Speaker{
				ID:         id,
				Name:       speaker.Name,
				NameJa:     speaker.NameJa,
				Company:    speaker.Company,
				Position:   speaker.Position,
				PositionJa: speaker.PositionJa,
				Profile:    speaker.Profile,
				ProfileJa:  speaker.ProfileJa,
				IconURL:    speaker.IconURL,
				TwitterID:  speaker.TwitterID,
				GithubID:   speaker.GithubID,
				// Sessions will be calculate dynamically
			}
			speakers = append(speakers, r.speakers[speaker.GithubID])
		}

		r.sessions = append(r.sessions, Session{
			ID:        base64.RawURLEncoding.EncodeToString([]byte(fmt.Sprintf("Session:%d", idx+1))),
			Title:     session.Title,
			TitleJa:   session.TitleJa,
			StartTime: session.StartTime,
			EndTime:   session.EndTime,
			Outline:   session.Outline,
			OutlineJa: session.OutlineJa,
			Tags:      session.Tags,
			Speakers:  speakers,
		})
	}

	return r, nil
}

type rootResolver struct {
	sessions []Session
	speakers map[string]Speaker
	likes    []Like

	mu            sync.Mutex
	likeObservers map[string]chan Like
}

func (r *rootResolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

func (r *rootResolver) Query() QueryResolver {
	return &queryResolver{r}
}

func (r *rootResolver) Subscription() SubscriptionResolver {
	return &subscriptionResolver{r}
}

func (r *rootResolver) Speaker() SpeakerResolver {
	return &speakerQueryResolver{r}
}

type mutationResolver struct{ *rootResolver }

func (r *mutationResolver) CreateLike(ctx context.Context, input CreateLikeInput) (*CreateLikePayload, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	id := base64.RawURLEncoding.EncodeToString([]byte(fmt.Sprintf("Like:%d", len(r.likes)+1)))
	like := Like{
		ID:        id,
		SessionID: input.SessionID,
	}

	for _, observer := range r.likeObservers {
		observer <- like
	}

	return &CreateLikePayload{
		ClientMutationID: input.ClientMutationID,
		Like:             like,
	}, nil
}

type queryResolver struct{ *rootResolver }

func (r *queryResolver) Node(ctx context.Context, id string) (Node, error) {
	panic("not implemented")
}

func (r *queryResolver) Nodes(ctx context.Context, ids []string) ([]*Node, error) {
	panic("not implemented")
}

func (r *queryResolver) Sessions(ctx context.Context, first int, after *string, req *SessionListInput) (SessionConnection, error) {
	// TODO first, afterちゃんと参照する

	conn := SessionConnection{}

	for _, session := range r.sessions {
		session := session
		conn.Edges = append(conn.Edges, &SessionEdge{Node: session})
		conn.Nodes = append(conn.Nodes, &session)
	}

	return conn, nil
}

type speakerQueryResolver struct{ *rootResolver }

func (r *speakerQueryResolver) Sessions(ctx context.Context, obj *Speaker) ([]Session, error) {
	if obj == nil {
		return nil, nil
	}

	var sessions []Session
	for _, session := range r.sessions {
		for _, speaker := range session.Speakers {
			if obj.GithubID == speaker.GithubID {
				sessions = append(sessions, session)
				break
			}
		}
	}

	return sessions, nil
}

type subscriptionResolver struct{ *rootResolver }

func (r *subscriptionResolver) LikeAdded(ctx context.Context) (<-chan Like, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	id := uuid.New().String()
	observer := make(chan Like, 1)

	r.likeObservers[id] = observer

	go func() {
		<-ctx.Done()

		r.mu.Lock()
		defer r.mu.Unlock()

		delete(r.likeObservers, id)
	}()

	return observer, nil
}
