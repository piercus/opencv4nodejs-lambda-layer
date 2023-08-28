const PromiseBlue = require('bluebird');
const { mkdirp } = require('mkdirp');

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
const zipDirectory = require('./zip-directory')
const packageLayer = require('./package-layer')

module.exports = function(opts){
    const {nodeVersion, opencvVersion} = opts;
    const layers = require('../layers.json');
    
    return mkdirp('./layers').then(() => {
        return PromiseBlue.map(Object.keys(layers), name => {
            return packageLayer({
				nodeVersion, 
				output: `./dist/${name}.zip`, 
				opencvVersion, 
				flags: layers[name].flags
			})
        }, {concurrency: 1})
    }).then(() => {
        console.log(`Packaging done`)
    })  
}