package domains

import (
	"context"
	"fmt"
	"time"

	"github.com/mercari/mtc2018-web/server/config"
)

// Session has the session data.
type Session struct {
	ID         int
	Type       string
	Place      string
	Title      string
	TitleJa    string
	StartTime  string
	EndTime    string
	Outline    string
	OutlineJa  string
	Lang       string
	Tags       []string
	Liked      int
	SpeakerIDs []string
	UpdatedAt  time.Time
}

// IsNode is marker for gqlgen.
func (*Session) IsNode() {}

// SessionRepo is basic operation unit for Session.
type SessionRepo interface {
	Get(ctx context.Context, ids ...int) ([]*Session, error)
	GetBySpeakerIDs(ctx context.Context, speakerIDs ...string) ([][]*Session, error)
	List(ctx context.Context, req *SessionListRequest) (*SessionListResp, error)
	AddLiked(ctx context.Context, id int, delta int) (*Session, error)
}

// SessionListRequest provides option for SessionRepo#List.
type SessionListRequest struct {
	Limit       int
	LastKnownID int // 前回リストで返した最後のEntityのID
}

// SessionListResp provides response for SessionRepo#List.
type SessionListResp struct {
	List        []*Session
	LastKnownID int
	HasNext     bool
}

// NewSessionRepo returns new SessionRepo.
func NewSessionRepo() (SessionRepo, error) {
	data, err := config.Load()
	if err != nil {
		return nil, err
	}

	repo := &sessionRepo{data: make(map[int]*Session)}

	for _, sessionData := range data.Sessions {
		session := &Session{
			ID:        sessionData.SessionID,
			Type:      sessionData.Type,
			Place:     sessionData.Place,
			Title:     sessionData.Title,
			TitleJa:   sessionData.TitleJa,
			StartTime: sessionData.StartTime,
			EndTime:   sessionData.EndTime,
			Outline:   sessionData.Outline,
			OutlineJa: sessionData.OutlineJa,
			Lang:      sessionData.Lang,
			Tags:      sessionData.Tags,
		}

		for _, speaker := range sessionData.Speakers {
			session.SpeakerIDs = append(session.SpeakerIDs, speaker.SpeakerID)
		}

		repo.list = append(repo.list, session)
		repo.data[session.ID] = session
	}

	return repo, nil
}

type sessionRepo struct {
	list []*Session
	data map[int]*Session
}

func (repo *sessionRepo) Get(ctx context.Context, ids ...int) ([]*Session, error) {

	resp := make([]*Session, 0, len(ids))
	for _, id := range ids {
		session, ok := repo.data[id]
		if !ok {
			return nil, fmt.Errorf("'Session:%d' is not found", id)
		}
		resp = append(resp, session)
	}

	return resp, nil
}

func (repo *sessionRepo) GetBySpeakerIDs(ctx context.Context, speakerIDs ...string) ([][]*Session, error) {

	resp := make([][]*Session, 0, len(speakerIDs))
	for _, speakerID := range speakerIDs {
		list := make([]*Session, 0)
		for _, session := range repo.list {
			for _, targetSpeakerID := range session.SpeakerIDs {
				if targetSpeakerID == speakerID {
					list = append(list, session)
					break
				}
			}
		}
		resp = append(resp, list)
	}

	return resp, nil
}

func (repo *sessionRepo) List(ctx context.Context, req *SessionListRequest) (*SessionListResp, error) {

	if req.Limit == 0 {
		req.Limit = 100
	}

	resp := &SessionListResp{}
	var startIndex int
	if req.LastKnownID != 0 {
		for idx, session := range repo.list {
			startIndex = idx + 1
			if session.ID == req.LastKnownID {
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

	for _, session := range repo.list[startIndex:endIndex] {
		resp.List = append(resp.List, session)
		resp.LastKnownID = session.ID
	}

	return resp, nil
}

func (repo *sessionRepo) AddLiked(ctx context.Context, id int, delta int) (*Session, error) {
	sessionList, err := repo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	session := sessionList[0]
	session.Liked += delta
	return session, nil
}
