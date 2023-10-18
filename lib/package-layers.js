const PromiseBlue = require('bluebird');
const {mkdirp} = require('mkdirp');
const packageLayer = require('./package-layer');

module.exports = function (options) {
	const {nodeVersion, opencvVersion, layerName} = options;
	const layers = require('../layers.json');

	if (layerName) {
		return packageLayer({
			nodeVersion,
			output: `./dist/${layerName}.zip`,
			opencvVersion,
			flags: layers[layerName].flags.join(' '),
			testStr: layers[layerName].testStr,
		});
	}

	return mkdirp('./dist').then(() => PromiseBlue.map(Object.keys(layers), name => packageLayer({
		nodeVersion,
		output: `./dist/${name}.zip`,
		opencvVersion,
		flags: layers[name].flags.join(' '),
		testStr: layers[name].testStr,
	}), {concurrency: 1})).then(() => {
		console.log('Packaging done');
	});
};
