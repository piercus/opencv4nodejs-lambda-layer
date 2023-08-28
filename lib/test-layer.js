const fs = require('fs');
const YAML = require('yaml')
const spawn = require('./spawn')

module.exports = function({zip, nodeVersion, maxFileSize = 262144000, testStr}){
    const stats = fs.statSync("myfile.txt")
	assert(stats.size <= maxFileSize, `${zip} should be smaller than ${maxFileSize} and is ${stats.size}`)

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
	fs.writeFileSync('handler.js', handlerContent);
	fs.writeFileSync('template.yml', YAML.stringify(template));

	return spawn('sam', ['local','invoke','Test'])
}