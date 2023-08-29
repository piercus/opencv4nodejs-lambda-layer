const fs = require('node:fs');
const assert = require('node:assert');
const process = require('node:process');
const YAML = require('yaml');
const {rimraf} = require('rimraf');
const {mkdirp} = require('mkdirp');
const spawn = require('./spawn');

module.exports = function ({zip, nodeVersion, maxFileSize = 262_144_000, testStr}) {
	const stats = fs.statSync(zip);
	assert(stats.size <= maxFileSize, `${zip} should be smaller than ${maxFileSize} and is ${stats.size}`);
	const template = {
		AWSTemplateFormatVersion: '2010-09-09',
		Transform: 'AWS::Serverless-2016-10-31',
		Resources: {
			Layer: {
				Type: 'AWS::Serverless::LayerVersion',
				Properties: {
					LayerName: 'Layer',
					Description: 'Layer',
					ContentUri: '../../' + zip,
				},
			},
			Test: {
				Type: 'AWS::Serverless::Function',
				Properties: {
					Runtime: `nodejs${nodeVersion}.x`,
					Layers: ['!Ref Layer'],
					FunctionName: 'test',
					Handler: 'handler.handler',
				},
			},
		},
	};

	const handlerContent = `
const cv = require('@u4/opencv4nodejs'); 
const assert = require('assert');

exports.handler = function(){
	${testStr}
}`;
	return rimraf('./tmp/fake_fn').then(() => mkdirp('./tmp/fake_fn')).then(() => {
		fs.writeFileSync('./tmp/fake_fn/handler.js', handlerContent);
		fs.writeFileSync('./tmp/fake_fn/template.yml', YAML.stringify(template).replace('"!Ref Layer"', '!Ref Layer'));

		const onStdError = function (reject, data) {
			if (data.includes('ERROR')) {
				reject(new Error(data));
			} else {
				process.stderr.write(data);
			}
		};

		return spawn('sam', ['local', 'invoke', 'Test'], {
			cwd: './tmp/fake_fn',
			onStdErr: onStdError,
		});
	});
};
