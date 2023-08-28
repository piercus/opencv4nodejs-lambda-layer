const fs = require('fs').promises;
const zipDirectory = require('./zip-directory')
const {rimraf} = require('rimraf');
const { mkdirp } = require('mkdirp');
const copy = require('recursive-copy');
const spawn = require('./spawn')

module.exports = function({nodeVersion, output, opencvVersion, flags}){
    console.log(`Packaging starts for Node ${nodeVersion} - opencv ${opencvVersion} and flags: ${flags}`)

    return mkdirp('/tmp/opencv4nodejs-lambda-layer').then(() => {
        return rimraf('/tmp/opencv4nodejs-lambda-layer')
    }).then(() => {
        return copy('./guest', '/tmp/opencv4nodejs-lambda-layer')
    }).then(() => {
        return fs.readFile('/tmp/opencv4nodejs-lambda-layer/package.json').then((pkg) => {
            const packageJSON = JSON.parse(pkg)
            packageJSON.opencv4nodejs.autoBuildFlags = flags;
            return fs.writeFile('/tmp/opencv4nodejs-lambda-layer/package.json', JSON.stringify(packageJSON, null, 4));
        })
    }).then(() => {
        return spawn(`./host/package-host-cmd.bash`,[nodeVersion, `/tmp/opencv4nodejs-lambda-layer/`, opencvVersion]); 
    }).then(() => {
        return rimraf('/tmp/opencv4nodejs-lambda-layer/nodejs').then(() => {
            return mkdirp('/tmp/opencv4nodejs-lambda-layer/nodejs')
        })
    }).then(() => {
        return fs.rename('/tmp/opencv4nodejs-lambda-layer/node_modules/', '/tmp/opencv4nodejs-lambda-layer/nodejs/node_modules/');
    }).then(() => {
        return zipDirectory('/tmp/opencv4nodejs-lambda-layer/nodejs/', output)
    }).then(() => {
        return rimraf('/tmp/opencv4nodejs-lambda-layer')
    }).then(() => {
        console.log(`Packaging done for Node ${nodeVersion} - opencv ${opencvVersion} and flags: ${flags} in ${output}`)
    })
}