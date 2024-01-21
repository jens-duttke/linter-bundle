/**
 * @file Returns the `.linter-bundle.js` configuration result.
 */

import * as fs from 'node:fs/promises';
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
 * @param {string} fileName - The name of the config file in the current working directory
 * @returns {Promise<import('./linter-bundle-config.js').LinterBundleConfig | undefined>} Either the file content for `undefined` if the file does not exist
 * */
async function loadConfig (fileName) {
	const filePath = path.join(process.cwd(), fileName);

	if (!await fs.access(filePath, fs.constants.F_OK).then(() => true).catch(() => false)) {
		return;
	}

	try {
		if (fileName.endsWith('.json')) {
			const content = await fs.readFile(filePath, 'utf8');

			return JSON.parse(content);
		}

		const fileUri = path.join('file://', filePath);

		const config = await import(fileUri);

		if ('default' in config) {
			return config.default;
		}

		return config;
	}
	catch (error) {
		process.stderr.write(`Error reading ${filePath}\n`);

		if (error instanceof Error) {
			process.stderr.write(`${error.stack}\n`);
		}
		else {
			process.stderr.write(`${error}\n`);
		}
	}

	return;
}
