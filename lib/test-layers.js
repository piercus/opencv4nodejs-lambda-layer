const PromiseBlue = require('bluebird');
const testLayer = require('./test-layer');

module.exports = function (options) {
	const {nodeVersion, opencvVersion, layerName} = options;
	const layers = require('../layers.json');

	if (layerName) {
		return testLayer({
			nodeVersion,
			zip: `./dist/${layerName}.zip`,
			opencvVersion,
			testStr: layers[layerName].testStr
		});
	}

	return PromiseBlue.map(Object.keys(layers), name => testLayer({nodeVersion, zip: `./dist/${name}.zip`, testStr: layers[name].testStr, opencvVersion}), {concurrency: 1})
		.then(() => {
			console.log('Testing done');
		});
};
