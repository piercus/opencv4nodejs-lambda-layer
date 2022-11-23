#!/bin/bash

set -e
NODE_VERSION="$1"

bash package-guest-preinstall.bash
bash package-guest-install.bash
bash package-guest-test.bash