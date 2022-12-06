#!/bin/bash

set -e

NODE_VERSION="$1"
LOCAL_FOLDER="$2"
OPENCV_VERSION="$3"

echo "docker run -v \"$LOCAL_FOLDER\":/opt/nodejs \"public.ecr.aws/sam/build-nodejs${NODE_VERSION}.x:latest\" /bin/sh -c \"cd /opt/nodejs && bash package-guest-cmd.bash ${NODE_VERSION} ${OPENCV_VERSION}\""
docker run -v "$LOCAL_FOLDER":/opt/nodejs "public.ecr.aws/sam/build-nodejs${NODE_VERSION}.x:latest" /bin/sh -c "cd /opt/nodejs && bash package-guest-cmd.bash ${NODE_VERSION} ${OPENCV_VERSION}"
