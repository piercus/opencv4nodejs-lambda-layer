#!/bin/node
const process = require('node:process');
const {program} = require('commander');
const studyLayerFlags = require('../lib/study-layer-flags');

program
	.option('--node-version <version>')
	.option('--opencv-version <version>')
	.option('--layer-name <name>');

program.parse();

const options = program.opts();

studyLayerFlags(options).then(res => {
	console.log(`Result is ${JSON.stringify(res, null, 4)}`)
}).catch(error => {
	console.log(error.stack);
	console.log(error);
	process.exit(1);
});
