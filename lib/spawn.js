const {spawn} = require('node:child_process');
const process = require('node:process');

module.exports = function (cmdString, args = [], options = {}) {
	console.log('spawn:', [cmdString].concat(args).join(' '));
	const cmd = spawn(cmdString, args, options);

	const onStdError = options.onStdErr || ((_, data) => {
		process.stderr.write(data);
	});
	const onStdOut = options.onStdOut || ((_, data) => {
		process.stdout.write(data);
	});
	return new Promise((resolve, reject) => {
		cmd.stdout.on('data', onStdOut.bind(this, reject));

		cmd.stderr.on('data', onStdError.bind(this, reject));

		cmd.on('close', code => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`child process exited with code ${code}`));
			}
		});
	});
};
