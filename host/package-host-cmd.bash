#!/bin/bash

NODE_VERSION="$1"
LOCAL_FOLDER="$2"
OPENCV_VERSION="$3"
TEST_STR="$4"

echo "docker run -v \"$LOCAL_FOLDER\":/opt/nodejs \"public.ecr.aws/sam/build-nodejs${NODE_VERSION}.x:latest\" /bin/sh -c \"cd /opt/nodejs && bash package-guest-cmd.bash ${NODE_VERSION} ${OPENCV_VERSION} \\\"${TEST_STR}\\\"\""
docker run -v "$LOCAL_FOLDER":/opt/nodejs "public.ecr.aws/sam/build-nodejs${NODE_VERSION}.x:latest" /bin/sh -c "cd /opt/nodejs && bash package-guest-cmd.bash ${NODE_VERSION} ${OPENCV_VERSION} \"${TEST_STR}\""

DOCKER_EXIT="$?"

sudo chown -R $USER: $LOCAL_FOLDER/node_modules

exit $DOCKER_EXIT