# Opencv4nodejs lambda layer

Check releases -> assets to find the layers for your AWS lambda function with pre-installed opencv modules

You can check the layers.json file to get information about compilation options for each layer.

Feel free to add a PR for more layers

## Package

`./bin/package-layers.js`

## Test

`./bin/test-layers.js`

## Optimization

`./bin/study-layers-flags.js` will automatically test the flags given in layers.json `remainingFlags` to try to limit the size of the package for a specific behavior

