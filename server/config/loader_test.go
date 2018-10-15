package config

import (
	"testing"

	_ "github.com/mercari/mtc2018-web/server/config/statik"
)

func TestLoad(t *testing.T) {
	data, err := Load()
	if err != nil {
		t.Fatal(err)
	}

	if v := len(data.Tags); v == 0 {
		t.Errorf("unexpected: %+v", v)
	}
	if v := len(data.Sessions); v == 0 {
		t.Errorf("unexpected: %+v", v)
	}
}
