#!/bin/node
const process = require('node:process');
const {program} = require('commander');
const testLayers = require('../lib/test-layers');

program
	.option('--node-version <version>')
	.option('--opencv-version <version>');

program.parse();

const options = program.opts();

testLayers(options).catch(error => {
	console.log(error.stack);
	console.log(error);
	process.exit(1);
});
