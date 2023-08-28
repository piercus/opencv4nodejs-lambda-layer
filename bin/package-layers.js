const { program } = require('commander');
const packageLayers = require('./lib/package-layers')

program
    .option('--node-version <version>')
    .option('--opencv-version <version>')

program.parse();

const options = program.opts();

packageLayers(options).catch(err => {
    console.log(err.stack);
    console.log(err);
    process.exit(1);
})