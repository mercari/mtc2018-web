package config

import "testing"

func TestLoad(t *testing.T) {
	sessions, err := Load()
	if err != nil {
		t.Fatal(err)
	}

	if v := len(sessions); v == 0 {
		t.Errorf("unexpected: %+v", v)
	}
}
