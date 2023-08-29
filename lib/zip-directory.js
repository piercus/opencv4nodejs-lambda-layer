const fsRaw = require('node:fs');
const archiver = require('archiver');

module.exports = function (sourceDir, outPath) {
	const archive = archiver('zip', {zlib: {level: 9}});
	const stream = fsRaw.createWriteStream(outPath);

	return new Promise((resolve, reject) => {
		archive
			.directory(sourceDir, false)
			.on('error', error => reject(error))
			.pipe(stream);

		stream.on('close', () => resolve());

		archive.finalize();
	});
};
