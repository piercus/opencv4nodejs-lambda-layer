const PromiseBlue = require('bluebird');
const testLayer = require('./test-layer')

module.exports = function(opts){
    const {nodeVersion, opencvVersion} = opts;
    const layers = require('../layers.json');
    
	return PromiseBlue.map(Object.keys(layers), name => {
		return testLayer({nodeVersion, zip: `./layers/${name}.zip`, testStr: layers[name].testStr, opencvVersion})
	}, {concurrency: 1})
	.then(() => {
        console.log(`Testing done`)
    })  
}