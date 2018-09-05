#!/bin/sh -eux

cd `dirname $0`

# build tools
rm -rf bin/ vendor/
mkdir bin/

go mod download
# go mod tidy
# go generate のため
go mod vendor

export GOBIN=`pwd -P`/bin
go install golang.org/x/tools/cmd/goimports
go install golang.org/x/lint/golint
go install github.com/99designs/gqlgen
go install github.com/rakyll/statik
