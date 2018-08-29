//go:generate statik -f -src=../contents

package config

import (
	"encoding/json"

	// link asset data
	_ "github.com/mercari/mtc2018-web/server/config/statik"

	"github.com/rakyll/statik/fs"
)

// Load from contents.json assets
func Load() ([]Session, error) {
	statikFS, err := fs.New()
	if err != nil {
		return nil, err
	}

	b, err := fs.ReadFile(statikFS, "/contents.json")
	if err != nil {
		return nil, err
	}

	var data struct{ Sessions []Session }
	err = json.Unmarshal(b, &data)
	if err != nil {
		return nil, err
	}

	return data.Sessions, nil
}

// Session information.
type Session struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	TitleJa   string    `json:"titleJa"`
	StartTime string    `json:"startTime"`
	EndTime   string    `json:"endTime"`
	Outline   string    `json:"outline"`
	OutlineJa string    `json:"outlineJa"`
	HashTags  []string  `json:"hashTags"`
	Speakers  []Speaker `json:"speakers"`
}

// Speaker information.
type Speaker struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	NameJa     string `json:"nameJa"`
	Company    string `json:"company"`
	Position   string `json:"position"`
	PositionJa string `json:"positionJa"`
	Profile    string `json:"profile"`
	ProfileJa  string `json:"profileJa"`
	IconURL    string `json:"iconUrl"`
	TwitterID  string `json:"twitterId"`
	GithubID   string `json:"githubId"`
}
