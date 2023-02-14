#!/bin/bash

set -e

UID1=`stat -c '%u' .`
GID1=`stat -c '%g' .`
echo "chown -R $UID1:$GID1 /root"
chown -R $UID1:$GID1 "/root"
echo "Npm Install"
npm install
echo "build-opencv"
npx build-opencv \
  --nobuild \
  --flags '\
    -DCMAKE_BUILD_TYPE=RELEASE \
    -DBUILD_opencv_core=ON \
    -DBUILD_opencv_calib3d=ON \
    -DBUILD_opencv_python_tests=OFF \
    -DBUILD_opencv_core=OFF \
    -DBUILD_opencv_imgproc=OFF \
    -DBUILD_opencv_imgcodecs=OFF \
    -DBUILD_opencv_videoio=OFF \
    -DBUILD_opencv_highgui=OFF \
    -DBUILD_opencv_video=OFF \
    -DBUILD_opencv_calib3d=OFF \
    -DBUILD_opencv_features2d=OFF \
    -DBUILD_opencv_objdetect=OFF \
    -DBUILD_opencv_dnn=OFF \
    -DBUILD_opencv_ml=OFF \
    -DBUILD_opencv_flann=OFF \
    -DBUILD_opencv_photo=OFF \
    -DBUILD_opencv_gapi=OFF \
    -DBUILD_opencv_face=OFF \
    -DBUILD_opencv_img_hash=OFF \
    -DBUILD_opencv_text=OFF \
    -DBUILD_opencv_tracking=OFF \
    -DBUILD_opencv_videostab=OFF  \
    -DBUILD_opencv_xfeatures2d=OFF \
    -DBUILD_opencv_ximgproc=OFF \
    -DWITH_IPP=OFF \
    -DWITH_V4L=OFF \
    -DWITH_FFMPEG=OFF \
    -DWITH_GSTREAMER=OFF \
    -DWITH_GTK=OFF \
    -DWITH_PROTOBUF=OFF \
    -DBUILD_PROTOBUF=OFF \
    -DOPENCV_DNN_OPENCL=OFF \
    -DWITH_WIN32UI=OFF \
    -DWITH_PNG=OFF \
    -DWITH_JPEG=OFF \
    -DWITH_TIFF=OFF \
    -DWITH_WEBP=OFF \
    -DWITH_OPENJPEG=OFF \
    -DWITH_JASPER=OFF \
    -DWITH_OPENEXR=OFF \
    -DBUILD_opencv_python=OFF \
    -DBUILD_opencv_java=OFF' \
  rebuild