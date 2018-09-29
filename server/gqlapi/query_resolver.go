package gqlapi

import (
	"context"
	"fmt"
	"strings"

	"github.com/mercari/mtc2018-web/server/domains"
)

var _ QueryResolver = (*queryResolver)(nil)

type queryResolver struct{ *rootResolver }

func (r *queryResolver) Node(ctx context.Context, id string) (Node, error) {
	panic("not implemented")
}

func (r *queryResolver) Nodes(ctx context.Context, ids []string) ([]*Node, error) {
	panic("not implemented")
}

func (r *queryResolver) SessionList(ctx context.Context, first *int, after *string, req *SessionListInput) (SessionConnection, error) {

	listReq := &domains.SessionListRequest{}
	if first != nil {
		listReq.Limit = *first
	}
	if after != nil {
		kind, id, err := extractIntID(ctx, *after)
		if err != nil {
			return SessionConnection{}, err
		}
		if kind != "Session" {
			return SessionConnection{}, fmt.Errorf("invalid id format: %s", *after)
		}
		if id == 0 {
			return SessionConnection{}, fmt.Errorf("invalid id format: %s", *after)
		}

		listReq.LastKnownID = id
	}

	var pageInfo PageInfo
	if after != nil {
		// after には前回の最後のIDが渡される想定
		pageInfo.StartCursor = after
		pageInfo.HasPreviousPage = true
	}

	listResp, err := r.sessionRepo.List(ctx, listReq)
	if err != nil {
		return SessionConnection{}, err
	}

	pageInfo.HasNextPage = listResp.HasNext

	conn := SessionConnection{}
	for _, node := range listResp.List {
		id := fmt.Sprintf("Session:%d", node.ID)
		conn.Edges = append(conn.Edges, SessionEdge{
			Cursor: &id,
			Node:   *node,
		})
		conn.Nodes = append(conn.Nodes, *node)
	}
	if len(listResp.List) != 0 {
		id := fmt.Sprintf("Session:%d", listResp.LastKnownID)
		pageInfo.EndCursor = &id
	}
	conn.PageInfo = pageInfo

	return conn, nil
}

func (r *queryResolver) Session(ctx context.Context, sessionID int) (*domains.Session, error) {
	sessionList, err := r.sessionRepo.Get(ctx, sessionID)
	if err != nil {
		return nil, err
	}
	return sessionList[0], nil
}

func (r *queryResolver) NewsList(ctx context.Context, first *int, after *string) (NewsConnection, error) {

	listReq := &domains.NewsListRequest{}
	if first != nil {
		listReq.Limit = *first
	}
	if after != nil {
		if !strings.HasPrefix("News:", *after) {
			return NewsConnection{}, fmt.Errorf("invalid id format: %s", *after)
		}

		id := (*after)[len("News:"):]
		listReq.LastKnownID = id
	}

	var pageInfo PageInfo
	if after != nil {
		// after には前回の最後のIDが渡される想定
		pageInfo.StartCursor = after
		pageInfo.HasPreviousPage = true
	}

	listResp, err := r.newsRepo.List(ctx, listReq)
	if err != nil {
		return NewsConnection{}, err
	}

	pageInfo.HasNextPage = listResp.HasNext

	conn := NewsConnection{}
	for _, node := range listResp.List {
		id := fmt.Sprintf("News:%s", node.ID)
		conn.Edges = append(conn.Edges, NewsEdge{
			Cursor: &id,
			Node:   *node,
		})
		conn.Nodes = append(conn.Nodes, *node)
	}
	if len(listResp.List) != 0 {
		id := fmt.Sprintf("News:%s", listResp.LastKnownID)
		pageInfo.EndCursor = &id
	}
	conn.PageInfo = pageInfo

	return conn, nil
}

func (r *queryResolver) ExhibisionList(ctx context.Context, first *int, after *string, req *ExhibitionListInput) (ExhibitionConnection, error) {

	listReq := &domains.ExhibitionListRequest{}
	if first != nil {
		listReq.Limit = *first
	}
	if after != nil {
		kind, id, err := extractIntID(ctx, *after)
		if err != nil {
			return ExhibitionConnection{}, err
		}
		if kind != "Exhibition" {
			return ExhibitionConnection{}, fmt.Errorf("invalid id format: %s", *after)
		}
		if id == 0 {
			return ExhibitionConnection{}, fmt.Errorf("invalid id format: %s", *after)
		}

		listReq.LastKnownID = id
	}

	var pageInfo PageInfo
	if after != nil {
		// after には前回の最後のIDが渡される想定
		pageInfo.StartCursor = after
		pageInfo.HasPreviousPage = true
	}

	listResp, err := r.exhibitionRepo.List(ctx, listReq)
	if err != nil {
		return ExhibitionConnection{}, err
	}

	pageInfo.HasNextPage = listResp.HasNext

	conn := ExhibitionConnection{}
	for _, node := range listResp.List {
		id := fmt.Sprintf("Exhibition:%d", node.ID)
		conn.Edges = append(conn.Edges, ExhibitionEdge{
			Cursor: &id,
			Node:   *node,
		})
		conn.Nodes = append(conn.Nodes, *node)
	}
	if len(listResp.List) != 0 {
		id := fmt.Sprintf("Exhibition:%d", listResp.LastKnownID)
		pageInfo.EndCursor = &id
	}
	conn.PageInfo = pageInfo

	return conn, nil
}
