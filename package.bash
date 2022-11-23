#!/bin/bash
set -e


if [[ $1 -eq 0 ]] ; then
    echo 'please provide node version as first argument'
    exit 1
fi

if [[ $2 -eq 0 ]] ; then
    echo 'please provide an output as second argument'
    exit 1
fi

NODE_VERSION="$1"
OUTPUT="$2"

mkdir -p /tmp/opencv4nodejs-lambda-layer
rm -rf /tmp/opencv4nodejs-lambda-layer/*

cp guest/* /tmp/opencv4nodejs-lambda-layer/

./package-host-cmd.bash ${NODE_VERSION} /tmp/opencv4nodejs-lambda-layer/

mkdir /tmp/opencv4nodejs-lambda-layer/nodejs
mv /tmp/opencv4nodejs-lambda-layer/node_modules/ /tmp/opencv4nodejs-lambda-layer/nodejs/node_modules/

zip -r /tmp/opencv4nodejs-lambda-layer/package.zip /tmp/opencv4nodejs-lambda-layer/nodejs

mv /tmp/opencv4nodejs-lambda-layer/package.zip $OUTPUT
rm -rf /tmp/opencv4nodejs-lambda-layer
