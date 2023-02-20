#!/bin/bash

set -e

UID1=`stat -c '%u' .`
GID1=`stat -c '%g' .`
echo "chown -R $UID1:$GID1 /root"
chown -R $UID1:$GID1 "/root"
echo "Run: npm install"
npm install
echo "Run: npx build-opencv rebuild"
npx build-opencv rebuild