#!/bin/bash

set -e
TEST_STR="$1"

echo "node -e \"const assert = require('assert'); const cv = require('@u4/opencv4nodejs'); ${TEST_STR}\""
node -e "const assert = require('assert'); const cv = require('@u4/opencv4nodejs'); ${TEST_STR}"