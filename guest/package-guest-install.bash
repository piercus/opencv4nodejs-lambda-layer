#!/bin/bash

set -e

UID1=`stat -c '%u' .`
GID1=`stat -c '%g' .`
echo "chown -R $UID1:$GID1 /root"
chown -R $UID1:$GID1 "/root"
OPENCV4NODEJS_DISABLE_AUTOBUILD=1
npm install
npx build-opencv --incDir /usr/include/opencv4/ --libDir /lib/x86_64-linux-gnu/ --binDir=/usr/bin/ --nobuild --flags '-DCMAKE_BUILD_TYPE=RELEASE -DBUILD_LIST=core,calib3d -DWITH_IPP=OFF -DWITH_V4L=OFF -DWITH_FFMPEG=OFF -DWITH_GSTREAMER=OFF -DWITH_GTK=OFF -DWITH_PROTOBUF=OFF -DBUILD_PROTOBUF=OFF -DOPENCV_DNN_OPENCL=OFF -DWITH_WIN32UI=OFF -DWITH_PNG=OFF -DWITH_JPEG=OFF -DWITH_TIFF=OFF -DWITH_WEBP=OFF -DWITH_OPENJPEG=OFF -DWITH_JASPER=OFF -DWITH_OPENEXR=OFF -DBUILD_opencv_python=OFF -DBUILD_opencv_java=OFF' rebuild