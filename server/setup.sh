#!/bin/sh -eux

cd `dirname $0`

# build tools
rm -rf bin/
mkdir bin/

go mod download
# go mod tidy

go build -o bin/goimports   golang.org/x/tools/cmd/goimports
go build -o bin/golint      golang.org/x/lint/golint
go build -o bin/gqlgen      github.com/99designs/gqlgen
