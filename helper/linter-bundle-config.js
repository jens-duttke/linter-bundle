/**
 * @file Returns the `.linter-bundle.js` configuration result.
 */

import * as path from 'node:path';

export const linterBundleConfig = (
	await loadConfig('.linter-bundle.json') ??
	await loadConfig('.linter-bundle.cjs') ??
	await loadConfig('.linter-bundle.mjs') ??
	await loadConfig('.linter-bundle.js') ??
	{}
);

/**
 * Load a config file if it exist.
 *
 * @param {string} fileName - The name of the config file
 * @returns {Promise<import('./linter-bundle-config.js').LinterBundleConfig | undefined>} - Either the file content for `undefined` if the file does not exist.
 * */
async function loadConfig (fileName) {
	const filePath = path.join('file://', process.cwd(), fileName);

	try {
		const config = await import(filePath);

		if ('default' in config) {
			return config.default;
		}

		return config;
	}
	catch {
		return;
	}
}
