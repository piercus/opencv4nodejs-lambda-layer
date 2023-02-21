#!/bin/bash

set -e

OPENCV_VERSION="$1"

UID1=`stat -c '%u' .`
GID1=`stat -c '%g' .`
echo "chown -R $UID1:$GID1 /root"
chown -R $UID1:$GID1 "/root"
echo "Run: npm install"
npm install
echo "Run: npx build-opencv rebuild --version ${OPENCV_VERSION}"
npx build-opencv build --version ${OPENCV_VERSION}
