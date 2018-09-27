package gqlapi

import (
	"context"
	"testing"
)

func TestExtractIntID(t *testing.T) {
	specs := []struct {
		ID    string
		Kind  string
		IntID int
	}{
		{ID: "Session:10", Kind: "Session", IntID: 10},
	}

	ctx := context.Background()
	for idx, spec := range specs {
		kind, id, err := extractIntID(ctx, spec.ID)
		if err != nil {
			t.Errorf("#%d err: %s", idx, err)
		}
		if kind != spec.Kind {
			t.Errorf("#%d kind mismatch, expected: %s, actual: %s", idx, spec.Kind, kind)
		}
		if id != spec.IntID {
			t.Errorf("#%d id mismatch, expected: %d, actual: %d", idx, spec.IntID, id)
		}
	}
}

func TestExtractStringID(t *testing.T) {
	specs := []struct {
		ID       string
		Kind     string
		StringID string
	}{
		{ID: "Speaker:vvakame", Kind: "Speaker", StringID: "vvakame"},
	}

	ctx := context.Background()
	for idx, spec := range specs {
		kind, id, err := extractStringID(ctx, spec.ID)
		if err != nil {
			t.Errorf("#%d err: %s", idx, err)
		}
		if kind != spec.Kind {
			t.Errorf("#%d kind mismatch, expected: %s, actual: %s", idx, spec.Kind, kind)
		}
		if id != spec.StringID {
			t.Errorf("#%d id mismatch, expected: %s, actual: %s", idx, spec.StringID, id)
		}
	}
}
