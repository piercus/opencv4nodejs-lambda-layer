#!/bin/bash
set -e

if [[ $1 -eq 0 ]] ; then
    echo 'please provide node version as first argument'
    exit 1
fi

NODE_VERSION="$1"

sam local invoke Test${NODE_VERSION}