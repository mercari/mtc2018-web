package config

import "testing"

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
