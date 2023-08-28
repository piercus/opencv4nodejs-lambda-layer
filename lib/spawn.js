const { spawn } = require('node:child_process');

module.exports = function(cmdStr, args = []){
	const cmd = spawn(cmdStr, args);

	return new Promise((resolve, reject) => {
		cmd.stdout.on('data', (data) => {
			console.log(`stdout: ${data}`);
		});

		cmd.stderr.on('data', (data) => {
			console.error(`stderr: ${data}`);
		});

		cmd.on('close', (code) => {
			if(code !== 0){
				reject(new Error(`child process exited with code ${code}`))
			} else {
				resolve()
			}
		}); 
	})
}