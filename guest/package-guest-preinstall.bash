#!/bin/bash

set -e

echo "Node ${NODE_VERSION}: Install cmake";

yum install -y cmake3 && yum clean all;
ln -s /usr/bin/cmake3 /usr/bin/cmake;