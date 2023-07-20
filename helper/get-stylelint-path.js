/**
 * @file Returns the path to the Stylelint CLI script.
 */

const fs = require('fs');
const path = require('path');

/**
 * Returns if the project is using npm or yarn.
 *
 * @public
 * @returns {string | null} Return the path to the Stylelint CLI script, or `null` if it can't be found.
 */
function getStylelintPath () {
	const stylelintLibPath = path.dirname(require.resolve('stylelint'));

	for (const stylelintBinPath of [
		path.join(stylelintLibPath, '../bin/stylelint.mjs'),
		path.join(stylelintLibPath, '../bin/stylelint.js')
	]) {
		if (fs.existsSync(stylelintBinPath)) {
			return stylelintBinPath;
		}
	}

	return null;
}

module.exports = {
	getStylelintPath
};

