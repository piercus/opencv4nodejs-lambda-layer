#!/bin/bash
set -e


if [[ $1 -eq 0 ]] ; then
    echo 'please provide node version as first argument'
    exit 1
fi

NODE_VERSION="$1"
OUTPUT="$2"
OPENCV_VERSION="$3"

echo "Packaging starts for Node ${NODE_VERSION} - opencv ${OPENCV_VERSION}"
mkdir -p /tmp/opencv4nodejs-lambda-layer
rm -rf /tmp/opencv4nodejs-lambda-layer/*

cp guest/* /tmp/opencv4nodejs-lambda-layer/

./package-host-cmd.bash ${NODE_VERSION} /tmp/opencv4nodejs-lambda-layer/ ${OPENCV_VERSION}

sudo chown -R $USER: /tmp/opencv4nodejs-lambda-layer/node_modules/
mkdir /tmp/opencv4nodejs-lambda-layer/nodejs
mv /tmp/opencv4nodejs-lambda-layer/node_modules/ /tmp/opencv4nodejs-lambda-layer/nodejs/node_modules/
CURRENT=$(pwd)

cd /tmp/opencv4nodejs-lambda-layer/

zip -r package.zip nodejs

cd $CURRENT

mv /tmp/opencv4nodejs-lambda-layer/package.zip $OUTPUT
sudo rm -rf /tmp/opencv4nodejs-lambda-layer

echo "Packaging done for Node ${NODE_VERSION} in ${OUTPUT}"
