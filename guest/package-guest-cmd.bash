#!/bin/bash

set -e
NODE_VERSION="$1"
export OPENCV4NODEJS_AUTOBUILD_OPENCV_VERSION="$2"

bash package-guest-preinstall.bash
bash package-guest-install.bash
bash package-guest-test.bash