const fs = require('node:fs').promises;
const {rimraf} = require('rimraf');
const {mkdirp} = require('mkdirp');
const copy = require('recursive-copy');
const zipDirectory = require('./zip-directory');
const spawn = require('./spawn');

module.exports = function ({nodeVersion, output, opencvVersion, flags, testStr}) {
	console.log(`Packaging starts for Node ${nodeVersion} - opencv ${opencvVersion} and flags: ${flags}`);

	return mkdirp('/tmp/opencv4nodejs-lambda-layer').then(() => rimraf('/tmp/opencv4nodejs-lambda-layer')).then(() => copy('./guest', '/tmp/opencv4nodejs-lambda-layer')).then(() => fs.readFile('/tmp/opencv4nodejs-lambda-layer/package.json').then(pkg => {
		const packageJSON = JSON.parse(pkg);
		packageJSON.opencv4nodejs.autoBuildFlags = flags;
		return fs.writeFile('/tmp/opencv4nodejs-lambda-layer/package.json', JSON.stringify(packageJSON, null, 4));
	}))
		.then(() => spawn('./host/package-host-cmd.bash', [nodeVersion, '/tmp/opencv4nodejs-lambda-layer/', opencvVersion, testStr]))
		.then(() => rimraf('/tmp/opencv4nodejs-lambda-layer/nodejs')
			.then(() => mkdirp('/tmp/opencv4nodejs-lambda-layer/nodejs')))
		.then(() => fs.rename('/tmp/opencv4nodejs-lambda-layer/node_modules/', '/tmp/opencv4nodejs-lambda-layer/nodejs/node_modules/'))
		.then(() => zipDirectory('/tmp/opencv4nodejs-lambda-layer/', output))
		.then(() => rimraf('/tmp/opencv4nodejs-lambda-layer'))
		.then(() => {
			console.log(`Packaging done for Node ${nodeVersion} - opencv ${opencvVersion} and flags: ${flags} in ${output}`);
		}).catch(error => {
			console.log('err', error);
			throw (error);
		});
};
