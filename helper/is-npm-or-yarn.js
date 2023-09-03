/**
 * @file Check if the project is using npm or yarn by checking the existence of a `package-lock.json` or a `yarn.lock`.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/**
 * Returns if the project is using npm or yarn.
 *
 * @public
 * @returns {Promise<'none' | 'npm' | 'yarn' | 'both'>} Returns which package manager name.
 */
export async function isNpmOrYarn () {
	let npm = false;
	let yarn = false;

	try {
		const stat = await fs.stat(path.join(process.cwd(), 'package-lock.json'));

		if (stat.isFile()) {
			npm = true;
		}
	}
	catch { /* `package-lock.json` cannot be accessed. */ }

	try {
		const stat = await fs.stat(path.join(process.cwd(), 'yarn.lock'));

		if (stat.isFile()) {
			yarn = true;
		}
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
