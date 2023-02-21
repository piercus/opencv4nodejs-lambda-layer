#!/bin/bash

set -e

OPENCV_VERSION="$1"

UID1=`stat -c '%u' .`
GID1=`stat -c '%g' .`
echo "chown -R $UID1:$GID1 /root"
chown -R $UID1:$GID1 "/root"
echo "Run: npm install  --foreground-scripts"
npm install --foreground-scripts
echo "Run: npx build-opencv build"
export OPENCV4NODEJS_AUTOBUILD_OPENCV_VERSION="${OPENCV_VERSION}"
npx build-opencv rebuild 
