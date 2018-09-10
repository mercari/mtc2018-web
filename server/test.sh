#!/bin/bash -eux

cd `dirname $0`

PACKAGE_NAME=github.com/mercari/mtc2018-web/server

targets=`find . -type f \( -name '*.go' -and -not -iwholename '*vendor*'  -and -not -iwholename '*node_modules*' \)`
packages=`go list ${PACKAGE_NAME}/...`

# Apply tools
export PATH=$(pwd)/bin:$PATH
goimports -w $targets
go tool vet $targets
golint -min_confidence 0.6 -set_exit_status $packages

go test -race ./... $@

# diff check (まだできない)
# git diff --quiet
