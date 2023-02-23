#!/bin/bash
set -e

if [[ $1 -eq 0 ]] ; then
    echo 'please provide node version as first argument'
    exit 1
fi

NODE_VERSION="$1"
export SIZE=`unzip -Zt opencv4nodejs-layer-node${NODE_VERSION}.zip | awk '{print $3}'`
if (( $SIZE > 262144000 )); then
    echo "Package size is ${SIZE} and should be less than 262144000"
    exit 1
fi
sam local invoke Test${NODE_VERSION}
