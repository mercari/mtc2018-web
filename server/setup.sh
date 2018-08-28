#!/bin/sh -eux

cd `dirname $0`

# build tools
rm -rf bin/
mkdir bin/

go mod download
# go mod tidy

export GOBIN=`pwd -P`/bin
go install golang.org/x/tools/cmd/goimports
go install golang.org/x/lint/golint
go install github.com/99designs/gqlgen
