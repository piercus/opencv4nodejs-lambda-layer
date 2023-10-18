const packageLayer = require('./package-layer');
const testLayer = require('./test-layer');

module.exports = function ({nodeVersion, opencvVersion, layerName}) {
	const layers = require('../layers.json');
	const {testStr, flags: workingFlags, nonWorkingFlags = [], remainingFlags = [], failureFlags = []} = layers[layerName];

	const zip = `./dist/${layerName}.zip`;
	const isWorkingFlags = function (flags) {
		const concatFlags = flags.join(' ');
		console.log('Packaging');
		return packageLayer({nodeVersion, opencvVersion, flags: concatFlags, testStr, output: zip})
			.then(
				() => testLayer({nodeVersion, opencvVersion, flags: concatFlags, testStr, zip, maxFileSize: 10e20}).then(
					() => ({working: true, error: null}),
					error => ({working: false, error}),
				),
				error => ({working: false, error}),
			);
	};

	const dicho = function ({workingFlags, nonWorkingFlags, remainingFlags = [], failureFlags = [], lastError = null}) {
		console.log(`Dicho: working ${workingFlags.length}, not working: ${nonWorkingFlags.length}, remaining: ${remainingFlags.length}, failureFlags: ${failureFlags.length}`);

		console.log(`Working: ${workingFlags}`);
		console.log(`Not working: ${nonWorkingFlags}`);
		console.log(`Remaining: ${remainingFlags}`);
		// eslint-disable-next-line no-unsafe-optional-chaining
		console.log(`Failure: ${failureFlags.map(({flag, error}) => flag + ':' + error?.message)}`);

		if (nonWorkingFlags.length <= 1) {
			let newFailureFlags = failureFlags;
			if (nonWorkingFlags.length === 1) {
				newFailureFlags = failureFlags.concat({flag: nonWorkingFlags[0], error: lastError});
			}

			if (remainingFlags.length > 0) {
				return isWorkingFlags(workingFlags.concat(remainingFlags)).then(({working, error}) => {
					if (working) {
						return {workingFlags: workingFlags.concat(remainingFlags), failureFlags: newFailureFlags};
					}

					return dicho({workingFlags, failureFlags: newFailureFlags, nonWorkingFlags: remainingFlags, lastError: error});
				});
			}

			return {
				workingFlags: workingFlags.concat(remainingFlags),
				failureFlags: newFailureFlags,
			};
		}

		const cut = Math.floor(nonWorkingFlags.length / 2);

		const testedFlags = nonWorkingFlags.slice(0, cut);

		console.log(`Testing ${testedFlags.length} flags`);

		return isWorkingFlags(workingFlags.concat(testedFlags)).then(({working, error}) => {
			if (working) {
				console.log(`flags ${testedFlags} added to the working flags pool`);
				return dicho({workingFlags: workingFlags.concat(testedFlags), remainingFlags, nonWorkingFlags: nonWorkingFlags.slice(cut), failureFlags, lastError});
			}

			console.log(`flags ${testedFlags} not added to the working flags pool`);
			return dicho({workingFlags, nonWorkingFlags: testedFlags, remainingFlags: nonWorkingFlags.slice(cut).concat(remainingFlags), failureFlags, lastError: error});
		});
	};

	return dicho({workingFlags, remainingFlags, nonWorkingFlags, failureFlags});
};
