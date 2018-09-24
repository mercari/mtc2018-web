package gqlapi

import (
	"context"
	"os"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/mercari/mtc2018-web/server/domains"
	"go.uber.org/zap"
)

var hostname string

func init() {
	var err error
	hostname, err = os.Hostname()
	if err != nil {
		panic(err)
	}
}

const (
	flushTimeout     = 1 * time.Second
	flushHardTimeout = 10 * time.Second
)

type likeSummaryPerSec struct {
	sessionID int
	second    int64
}

type likeEvent struct {
	sessionID int
	num       int
}

func newObserver(logger *zap.Logger, eventCh chan<- likeEvent, likeSumRepo domains.LikeSummaryRepo) *observer {
	return &observer{
		logger:      logger.Named("observer"),
		likeSumRepo: likeSumRepo,
		lastLikes:   make(map[int]map[int64]int),
		eventCh:     eventCh,
		done:        make(chan struct{}, 0),
	}
}

type observer struct {
	logger      *zap.Logger
	likeSumRepo domains.LikeSummaryRepo
	// lastLikes is sum of likes: sessionID -> second -> num
	lastLikes map[int]map[int64]int

	eventCh chan<- likeEvent
	done    chan struct{}
}

func (o *observer) Run() {
	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	done := false
	for {
		select {
		case <-o.done:
			done = true
			break
		case <-ticker.C:
		}
		if done {
			break
		}

		// no async
		o.observeUpdate()

	}
	o.logger.Info("stopped")
}

func (o *observer) Stop() {
	close(o.done)
}

func (o *observer) observeUpdate() {
	o.logger.Debug("start observe")
	now := time.Now().Unix()

	parentCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var mu sync.Mutex
	listResp := map[int64]*domains.LikeSummaryListResp{}
	wg := &sync.WaitGroup{}
	fn := func(second int64) {
		wg.Add(1)

		go func() {
			defer wg.Done()
			ctx, cancel := context.WithTimeout(parentCtx, 2*time.Second)
			defer cancel()
			resp, err := o.likeSumRepo.List(ctx, second)
			if err != nil {
				resp, err = o.likeSumRepo.List(parentCtx, second)
				if err != nil {
					o.logger.Error("likeSumRepo.List error",
						zap.Error(err),
					)
					return
				}
			}

			mu.Lock()
			listResp[second] = resp
			mu.Unlock()
		}()
	}

	fn(now - 1)
	fn(now - 2)
	fn(now - 3)
	wg.Wait()

	updates := map[int]int{}
	fn2 := func(second int64) {
		resp, ok := listResp[second]
		if !ok {
			return
		}

		for _, sum := range resp.List {
			if _, ok := o.lastLikes[sum.SessionID]; !ok {
				o.lastLikes[sum.SessionID] = make(map[int64]int)
			}
			last := o.lastLikes[sum.SessionID][sum.Second]
			if last != sum.Likes {
				o.lastLikes[sum.SessionID][sum.Second] = sum.Likes
				increased := sum.Likes - last
				o.logger.Info("observe update",
					zap.Int("session", sum.SessionID),
					zap.Int64("second", sum.Second),
					zap.Int("diff", increased),
				)

				updates[sum.SessionID] += increased
			}
		}
	}

	fn2(now - 1)
	fn2(now - 2)
	fn2(now - 3)

	for sessionID, num := range updates {
		o.eventCh <- likeEvent{
			sessionID: sessionID,
			num:       num,
		}
	}
}

func newListener(logger *zap.Logger, eventCh <-chan likeEvent) *listener {
	return &listener{
		logger:  logger.Named("listener"),
		eventCh: eventCh,
		done:    make(chan struct{}, 0),

		listeners: make(map[int]map[string]chan LikeEvent),
	}
}

type listener struct {
	logger  *zap.Logger
	eventCh <-chan likeEvent
	done    chan struct{}

	mu sync.RWMutex
	// sessionID -> id -> channel
	listeners map[int]map[string]chan LikeEvent
}

func (l *listener) Run() {
	done := false
	for {
		select {
		case <-l.done:
			done = true
			break
		case ev := <-l.eventCh:
			l.handleEvent(ev)
		}
		if done {
			break
		}
	}
	l.logger.Info("stopped")
}

func (l *listener) Stop() {
	close(l.done)
}

func (l *listener) handleEvent(ev likeEvent) {
	// ここのロックの粒度が大きそう
	l.mu.RLock()
	defer l.mu.RUnlock()

	sessionListeners, ok := l.listeners[ev.sessionID]
	if !ok {
		return
	}

	like := LikeEvent{
		SessionID: ev.sessionID,
		Likes:     ev.num,
	}

	for _, ch := range sessionListeners {
		select {
		case ch <- like:
		default: // non-blocking
		}
	}
}

func (l *listener) AddListener(id string, sessionID int) <-chan LikeEvent {
	l.mu.Lock()
	if _, ok := l.listeners[sessionID]; !ok {
		l.listeners[sessionID] = make(map[string]chan LikeEvent)
	}
	ch := make(chan LikeEvent, 1)
	l.listeners[sessionID][id] = ch
	l.mu.Unlock()

	return ch
}

func (l *listener) RemoveListener(id string, sessionID int) {
	l.mu.Lock()
	defer l.mu.Unlock()
	if _, ok := l.listeners[sessionID]; !ok {
		return
	}
	ch, ok := l.listeners[sessionID][id]
	if !ok {
		return
	}
	_ = ch
	// close(ch) // 大丈夫だろうけど自信がでない
	delete(l.listeners[sessionID], id)
}

func newStorer(logger *zap.Logger, likeRepo domains.LikeRepo, likeSumRepo domains.LikeSummaryRepo) *storer {
	return &storer{
		logger:      logger.Named("storer"),
		likeRepo:    likeRepo,
		likeSumRepo: likeSumRepo,
		likeSum:     make(map[likeSummaryPerSec]int),
		done:        make(chan struct{}, 0),
	}
}

type storer struct {
	logger      *zap.Logger
	likeRepo    domains.LikeRepo
	likeSumRepo domains.LikeSummaryRepo

	likesMu sync.Mutex
	likes   []domains.Like

	likeSumMu                sync.Mutex
	likeSum                  map[likeSummaryPerSec]int
	likeSum2                 map[int64]map[int]int
	lastSummaryFlushedSecond int64

	done chan struct{}
}

func (s *storer) Run() {
	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	done := false
	for {
		select {
		case <-s.done:
			done = true
			break
		case <-ticker.C:
		}
		if done {
			break
		}

		go s.flushLikes()
		go s.flushLikeSummary()
	}
	s.logger.Info("stopped")
}

func (s *storer) Stop() {
	close(s.done)
}

func (s *storer) Add(sessionID int, uuid string) domains.Like {
	now := time.Now().UTC()

	like := domains.Like{
		SessionID: int64(sessionID),
		UserUUID:  uuid,
		CreatedAt: now,
	}

	// 全体のロック取るからスケールしないけどまあいいでしょう

	s.likesMu.Lock()
	s.likes = append(s.likes, like)
	s.likesMu.Unlock()

	sum := likeSummaryPerSec{
		sessionID: sessionID,
		second:    now.Unix(),
	}

	s.likeSumMu.Lock()
	if _, ok := s.likeSum[sum]; ok {
		s.likeSum[sum]++
	} else {
		s.likeSum[sum] = 1
	}
	s.likeSumMu.Unlock()

	return like
}

func (s *storer) flushLikes() {
	flushID := uuid.New().String()
	s.logger.Debug("start flush likes",
		zap.String("flush_id", flushID),
	)
	s.likesMu.Lock()
	if len(s.likes) == 0 {
		s.likesMu.Unlock()
		return
	}
	likes := make([]domains.Like, len(s.likes))
	copy(likes, s.likes)
	s.likes = s.likes[:0]
	s.likesMu.Unlock()

	parentCtx, cancel := context.WithTimeout(context.Background(), flushHardTimeout)
	defer cancel()

	for {
		select {
		case <-parentCtx.Done():
			s.logger.Error("timeout: give up flushing",
				zap.String("flush_id", flushID),
			)
			return
		default:
		}

		err := func() error {
			ctx, cancel := context.WithTimeout(parentCtx, flushTimeout)
			defer cancel()

			_, err := s.likeRepo.BulkInsert(ctx, likes)
			return err
		}()
		if err == nil {
			return
		}

		s.logger.Error("failed to flush likes, will retry",
			zap.Error(err),
			zap.String("flush_id", flushID),
		)
	}
}

func (s *storer) flushLikeSummary() {
	t := time.Now().Add(-100 * time.Millisecond) // 100ms の余裕をもたせる
	sec := t.Unix() - 1                          // 1秒より前のものを対象

	s.likeSumMu.Lock()
	lastFlushed := s.lastSummaryFlushedSecond
	s.lastSummaryFlushedSecond = sec

	if lastFlushed == sec {
		s.likeSumMu.Unlock()
		return
	}

	copyLikeSum := make(map[likeSummaryPerSec]int, 10)
	flushID := uuid.New().String()

	s.logger.Debug("start flush summary",
		zap.Int64("second", sec),
		zap.String("flush_id", flushID),
	)

	for sum, v := range s.likeSum {
		if sum.second == sec {
			copyLikeSum[sum] = v
		}
	}

	for sum := range copyLikeSum {
		delete(s.likeSum, sum)
	}
	s.likeSumMu.Unlock()

	parentCtx, cancel := context.WithTimeout(context.Background(), flushHardTimeout)
	defer cancel()

	now := time.Now().UTC()
	likeSummary := make([]*domains.LikeSummaryServer, 0, len(copyLikeSum))
	for sum, v := range copyLikeSum {
		likeSummary = append(likeSummary, &domains.LikeSummaryServer{
			SessionID: int64(sum.sessionID),
			Second:    sum.second,
			ServerID:  hostname,
			Likes:     int64(v),
			CreatedAt: now,
		})
	}

	for {
		select {
		case <-parentCtx.Done():
			s.logger.Error("timeout: give up flushing summary",
				zap.String("flush_id", flushID),
			)
			return
		default:
		}

		err := func() error {
			ctx, cancel := context.WithTimeout(parentCtx, flushTimeout)
			defer cancel()

			_, err := s.likeSumRepo.BulkInsert(ctx, likeSummary)
			return err
		}()
		if err == nil {
			return
		}

		s.logger.Error("failed to flush like summary, will retry",
			zap.Error(err),
			zap.String("flush_id", flushID),
		)
	}
}
