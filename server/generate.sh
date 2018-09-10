#!/bin/bash -eu

cd `dirname $0`

PACKAGE_NAME=github.com/mercari/mtc2018-web/server

targets=`find . -type f \( -name '*.go' -and -not -iwholename '*vendor*'  -and -not -iwholename '*node_modules*' \)`
packages=`go list ${PACKAGE_NAME}/...`

set -x

# Apply tools
export PATH=$(pwd)/bin:$PATH
GO111MODULE=off go generate $packages
