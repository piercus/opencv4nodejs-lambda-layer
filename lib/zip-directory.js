const archiver = require('archiver');
const fsRaw = require('fs')

module.exports = function(sourceDir, outPath) {
	const archive = archiver('zip', { zlib: { level: 9 }});
	const stream = fsRaw.createWriteStream(outPath);
  
	return new Promise((resolve, reject) => {
	  archive
		.directory(sourceDir, false)
		.on('error', err => reject(err))
		.pipe(stream)
	  ;
  
	  stream.on('close', () => resolve());
	  archive.finalize();
	});
  }