#!/bin/bash

set -e
echo "Run Nodejs : const cv = require('@u4/opencv4nodejs'); if(typeof(cv.solvePnP) === 'function'){ console.log('require @u4/opencv4nodejs is sucessful')} else {throw(new Error('cv.solvePnP is not a function'))}"
node -e "const cv = require('@u4/opencv4nodejs'); if(typeof(cv.solvePnP) === 'function'){ console.log('require @u4/opencv4nodejs is sucessful')} else {throw(new Error('cv.solvePnP is not a function'))}"

