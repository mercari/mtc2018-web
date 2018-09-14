//go:generate gqlgen

package gqlapi

import (
	"context"
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

	for _, session := range data.Sessions {
		speakers := make([]Speaker, 0)
		for _, speaker := range session.Speakers {
			if speaker.SpeakerID == "" {
				return nil, fmt.Errorf("unexpected SpeakerID: %s", speaker.SpeakerID)
			}
			r.speakers[speaker.GithubID] = Speaker{
				ID:         fmt.Sprintf("Speaker:%s", speaker.SpeakerID),
				SpeakerID:  speaker.SpeakerID,
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

		if session.SessionID == 0 {
			return nil, fmt.Errorf("unexpected SessionID: %d", session.SessionID)
		}
		r.sessions = append(r.sessions, Session{
			ID:        fmt.Sprintf("Session:%d", session.SessionID),
			SessionID: session.SessionID,
			Type:      session.Type,
			Title:     session.Title,
			TitleJa:   session.TitleJa,
			StartTime: session.StartTime,
			EndTime:   session.EndTime,
			Outline:   session.Outline,
			OutlineJa: session.OutlineJa,
			Lang:      session.Lang,
			Tags:      session.Tags,
			Speakers:  speakers,
		})
	}

	for _, news := range data.News {
		if news.NewsID == "" {
			return nil, fmt.Errorf("unexpected NewsID: %s", news.NewsID)
		}
		r.news = append(r.news, News{
			ID:        fmt.Sprintf("News:%s", news.NewsID),
			NewsID:    news.NewsID,
			Date:      news.Date,
			Message:   news.Message,
			MessageJa: news.MessageJa,
			Link:      &news.Link,
		})
	}

	return r, nil
}

type rootResolver struct {
	sessions []Session
	speakers map[string]Speaker
	likes    []Like
	news     []News

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

	var session *Session
	for idx := range r.sessions {
		if r.sessions[idx].ID == input.SessionID {
			session = &r.sessions[idx]
			break
		}
	}
	if session == nil {
		// TODO Internal Server ErrorとBad Requestを区別できるようにしたい
		return nil, fmt.Errorf("unknown sessionId: %s", input.SessionID)
	}

	session.Liked++

	id := fmt.Sprintf("Like:%d", len(r.likes)+1)
	like := Like{
		ID:      id,
		Session: *session,
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

func (r *queryResolver) SessionList(ctx context.Context, first *int, after *string, req *SessionListInput) (SessionConnection, error) {

	if first == nil || *first == 0 {
		newFirst := 10
		first = &newFirst
	}

	var startIndex int
	var pageInfo PageInfo
	if after != nil {
		// after には前回の最後のIDが渡される想定
		pageInfo.StartCursor = after
		pageInfo.HasPreviousPage = true
		for idx, session := range r.sessions {
			startIndex = idx + 1
			if session.ID == *after {
				break
			}
		}
	}
	if startIndex > len(r.sessions) {
		startIndex = len(r.sessions)
	}
	endIndex := startIndex + *first
	if endIndex > len(r.sessions) {
		endIndex = len(r.sessions)
	}
	pageInfo.HasNextPage = endIndex != len(r.sessions)

	conn := SessionConnection{}
	for _, session := range r.sessions[startIndex:endIndex] {
		session := session
		pageInfo.EndCursor = &session.ID
		conn.Edges = append(conn.Edges, SessionEdge{
			Cursor: &session.ID,
			Node:   session,
		})
		conn.Nodes = append(conn.Nodes, session)
	}
	conn.PageInfo = pageInfo

	return conn, nil
}

func (r *queryResolver) Session(ctx context.Context, sessionID int) (*Session, error) {
	for _, session := range r.sessions {
		if session.SessionID == sessionID {
			return &session, nil
		}
	}
	return nil, nil
}

func (r *queryResolver) NewsList(ctx context.Context, first *int, after *string) (NewsConnection, error) {
	// TODO first, afterちゃんと参照する

	if first == nil || *first == 0 {
		newFirst := 10
		first = &newFirst
	}

	var startIndex int
	var pageInfo PageInfo
	if after != nil {
		// after には前回の最後のIDが渡される想定
		pageInfo.StartCursor = after
		pageInfo.HasPreviousPage = true
		for idx, news := range r.news {
			startIndex = idx + 1
			if news.ID == *after {
				break
			}
		}
	}
	if startIndex > len(r.news) {
		startIndex = len(r.news)
	}
	endIndex := startIndex + *first
	if endIndex > len(r.news) {
		endIndex = len(r.news)
	}
	pageInfo.HasNextPage = endIndex != len(r.news)

	conn := NewsConnection{}
	for _, news := range r.news[startIndex:endIndex] {
		news := news
		pageInfo.EndCursor = &news.ID
		conn.Edges = append(conn.Edges, NewsEdge{
			Cursor: &news.ID,
			Node:   news,
		})
		conn.Nodes = append(conn.Nodes, news)
	}
	conn.PageInfo = pageInfo

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
