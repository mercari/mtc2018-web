// +build tools

package server

// from https://github.com/golang/go/issues/25922#issuecomment-412992431

import (
	_ "golang.org/x/lint"
	_ "golang.org/x/tools"

	_ "github.com/99designs/gqlgen"
	_ "github.com/rakyll/statik"
)
