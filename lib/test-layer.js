const fs = require('fs');
const YAML = require('yaml')
const spawn = require('./spawn')
const {rimraf} = require('rimraf');
const { mkdirp } = require('mkdirp');
const assert = require('assert')

module.exports = function({zip, nodeVersion, maxFileSize = 262144000, testStr}){
    const stats = fs.statSync(zip)
	assert(stats.size <= maxFileSize, `${zip} should be smaller than ${maxFileSize} and is ${stats.size}`)
	console.log({zip})
	const template = {
		"AWSTemplateFormatVersion": '2010-09-09',
		"Transform": 'AWS::Serverless-2016-10-31',
		"Resources": {
			"Layer": {
				"Type": "AWS::Serverless::LayerVersion",
				"LayerName": "Layer",
				"Description": "Layer",
				"ContentUri": zip
			},
			"Test": {
				"Type": "AWS::Serverless::Function",
				"Properties": {
					"Runtime": `nodejs${nodeVersion}.x`,
					"Layers":["!Ref Layer"],
					"FunctionName": "test",
					"Handler": "handler.handler"
				}
			}
		}
	};

	const handlerContent = `
const cv = require('@u4/opencv4nodejs'); 
const assert = require('assert');

exports.handler = function(){
	${testStr}
}`
	return rimraf('./tmp/fake_fn').then(() => {
		return mkdirp('./tmp/fake_fn')
	}).then(() => {
		fs.writeFileSync('./tmp/fake_fn/handler.js', handlerContent);
		fs.writeFileSync('./tmp/fake_fn/template.yml', YAML.stringify(template));
		return spawn('sam', ['local','invoke','Test'], {cwd:'./tmp/fake_fn'})
	})


}