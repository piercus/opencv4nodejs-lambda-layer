#!/bin/bash

set -e
NODE_VERSION="$1"
OPENCV_VERSION="$2"
TEST_STR="$3"

bash package-guest-preinstall.bash
bash package-guest-install.bash "${OPENCV_VERSION}"
bash package-guest-test.bash "${TEST_STR}"