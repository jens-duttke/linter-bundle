/**
 * @file Check if the project is using npm or yarn by checking the existence of a `package-lock.json` or a `yarn.lock`.
 */

const fs = require('fs');
const path = require('path');

/**
 * Returns if the project is using npm or yarn.
 *
 * @public
 * @returns {'none' | 'npm' | 'yarn' | 'both'} Returns which package manager name.
 */
function isNpmOrYarn () {
	let npm = false;
	let yarn = false;

	try {
		fs.accessSync(path.join(process.cwd(), 'package-lock.json'), fs.constants.R_OK);

		npm = true;
	}
	catch { /* `package-lock.json` cannot be accessed. */ }

	try {
		fs.accessSync(path.join(process.cwd(), 'yarn.lock'), fs.constants.R_OK);

		yarn = true;
	}
	catch { /* `yarn.lock` cannot be accessed. */ }

	if (npm && yarn) {
		return 'both';
	}

	if (npm) {
		return 'npm';
	}

	if (yarn) {
		return 'yarn';
	}

	return 'none';
}

module.exports = {
	isNpmOrYarn
};
