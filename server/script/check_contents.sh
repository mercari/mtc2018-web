#!/bin/bash

set -eux

# check tags list are correct
diff <(cat contents/contents.json | jq '.sessions[].tags[]' | sort -u) <(cat contents/contents.json | jq '.tags[]' | sort -u)
