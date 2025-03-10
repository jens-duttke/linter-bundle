/**
 * @file Returns the path to the Stylelint CLI script.
 */

import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

/**
 * Returns if the project is using npm or yarn.
 *
 * @public
 * @returns {Promise<string | null>} Return the path to the Stylelint CLI script, or `null` if it can't be found
 */
export async function getStylelintPath () {
	const stylelintLibPath = path.dirname(require.resolve('stylelint'));

	for (const stylelintBinPath of [
		path.join(stylelintLibPath, '../bin/stylelint.mjs'),
		path.join(stylelintLibPath, '../bin/stylelint.js')
	]) {
		try {
			// eslint-disable-next-line no-await-in-loop -- As we return from the method on the first file which exist, we cannot run the promises in parallel.
			const stat = await fs.stat(stylelintBinPath);

			if (stat.isFile()) {
				return stylelintBinPath;
			}
		}
		catch { /* Do nothing */ }
	}

	return null;
}
