#!/bin/node

const { program } = require('commander');
const testLayers = require('../lib/test-layers')

program
    .option('--node-version <version>')
    .option('--opencv-version <version>')

program.parse();

const options = program.opts();

testLayers(options).catch(err => {
    console.log(err.stack);
    console.log(err);
    process.exit(1);
})
