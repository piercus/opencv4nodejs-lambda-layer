#!/bin/node
const process = require('node:process');
const {program} = require('commander');
const packageLayers = require('../lib/package-layers');

program
	.option('--node-version <version>')
	.option('--opencv-version <version>')
	.option('--layer-name <name>');

program.parse();

const options = program.opts();

packageLayers(options).catch(error => {
	console.log(error.stack);
	console.log(error);
	process.exit(1);
});
