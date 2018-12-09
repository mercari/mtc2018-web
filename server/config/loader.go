//go:generate statik -f -src=../contents

package config

import (
	"encoding/json"

	"github.com/rakyll/statik/fs"
)

// Load from contents.json assets
func Load() (*Data, error) {
	statikFS, err := fs.New()
	if err != nil {
		return nil, err
	}

	b, err := fs.ReadFile(statikFS, "/contents.json")
	if err != nil {
		return nil, err
	}

	var data Data
	err = json.Unmarshal(b, &data)
	if err != nil {
		return nil, err
	}

	return &data, nil
}

// Data provides content of contents.json.
type Data struct {
	Tags        []string     `json:"tags"`
	Sessions    []Session    `json:"sessions"`
	News        []News       `json:"news"`
	Exhibitions []Exhibition `json:"exhibitions"`
	Slides      []Slide      `json:"slides"`
	Movies      []Movie      `json:"movies"`
}

// Session information.
type Session struct {
	SessionID int       `json:"id"` // Relay Global Object ID SpecのIDではない
	Type      string    `json:"type"`
	Place     string    `json:"place"`
	Title     string    `json:"title"`
	TitleJa   string    `json:"titleJa"`
	StartTime string    `json:"startTime"`
	EndTime   string    `json:"endTime"`
	Outline   string    `json:"outline"`
	OutlineJa string    `json:"outlineJa"`
	Lang      string    `json:"lang"`
	Tags      []string  `json:"tags"`
	Speakers  []Speaker `json:"speakers"`
}

// Speaker information.
type Speaker struct {
	SpeakerID  string `json:"id"` // Relay Global Object ID SpecのIDではない
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

// Exhibition information.
type Exhibition struct {
	ExhibitionID  int    `json:"id"` // Relay Global Object ID SpecのIDではない
	Place         string `json:"place"`
	Title         string `json:"title"`
	TitleJa       string `json:"titleJa"`
	Description   string `json:"description"`
	DescriptionJa string `json:"descriptionJa"`
}

// News information
type News struct {
	NewsID    string `json:"id"` // Relay Global Object ID SpecのIDではない
	Date      string `json:"date"`
	Message   string `json:"message"`
	MessageJa string `json:"messageJa"`
	Link      string `json:"link"`
}

// Slide information
type Slide struct {
	Lang      string `json:"lang"`
	URL       string `json:"url"`
	SessionID int    `json:"sessionId"`
	SpeakerID string `json:"speakerId"`
}

// Movie information
type Movie struct {
	URL       string `json:"url"`
	SessionID int    `json:"sessionId"`
	SpeakerID string `json:"speakerId"`
}
