/**
 * @file Returns the `.linter-bundle.js` configuration result.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

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
 * @param {string} fileName - The name of the config file in the current working directory
 * @returns {Promise<import('./linter-bundle-config.js').LinterBundleConfig | undefined>} Either the file content for `undefined` if the file does not exist
 * */
async function loadConfig (fileName) {
	const filePath = path.join(process.cwd(), fileName);

	if (!await fs.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false)) {
		return undefined;
	}

	try {
		if (fileName.endsWith('.json')) {
			const content = await fs.readFile(filePath, 'utf8');

			return JSON.parse(content);
		}

		const fileUrl = new URL('file:');

		fileUrl.pathname = filePath;

		const config = await import(fileUrl.toString());

		if ('default' in config) {
			return config.default;
		}

		return config;
	}
	catch (error) {
		process.stderr.write(`Error reading ${filePath}\n${error}\n`);
	}

	return undefined;
}
