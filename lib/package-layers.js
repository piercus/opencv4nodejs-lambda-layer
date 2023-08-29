const PromiseBlue = require('bluebird');
const {mkdirp} = require('mkdirp');
const packageLayer = require('./package-layer');

module.exports = function (options) {
	const {nodeVersion, opencvVersion} = options;
	const layers = require('../layers.json');

	return mkdirp('./layers').then(() => PromiseBlue.map(Object.keys(layers), name => packageLayer({
		nodeVersion,
		output: `./dist/${name}.zip`,
		opencvVersion,
		flags: layers[name].flags,
	}), {concurrency: 1})).then(() => {
		console.log('Packaging done');
	});
};
