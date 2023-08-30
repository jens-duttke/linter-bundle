/**
 * @file Returns the `.linter-bundle.js` configuration result.
 */

const fs = require('node:fs');
const path = require('node:path');

/**
 * @typedef linterBundleConfig
 * @property {boolean} [verbose]
 * @property {boolean} [timing]
 * @property {boolean} [git]
 * @property {{ tsconfig?: string; }} [tsc]
 * @property {{ tsconfig?: string; include?: string[]; exclude?: string[]; overrides?: {
 *   general?: {
 *     'no-restricted-globals'?: { additionalRestrictions?: { name: string; message: string; }[]; },
 *     'no-restricted-properties'?: { additionalRestrictions?: { object: string; property: string; message: string; }[]; },
 *     'no-restricted-syntax'?: { additionalRestrictions?: { selector: string; message: string; }[]; },
 *     'import/order'?: { additionalExternalPatterns?: string[]; }
 *   },
 *   react?: {
 *     'react/forbid-component-props'?: { allowClassNameFor?: string[]; allowStyleFor?: string[]; }
 *   }
 * }; }} [ts]
 * @property {{ patternPrefix?: string; }} [sass]
 * @property {{ minSeverity?: 'info' | 'low' | 'moderate' | 'high' | 'critical'; exclude?: string[]; }} [audit]
 * @property {{ restrictions: { basePath: string; allowed?: string[]; disallowed?: string[]; }[]; }} [files]
 */

module.exports = (
	loadConfig('.linter-bundle.json') ??
	loadConfig('.linter-bundle.cjs') ??
	loadConfig('.linter-bundle.js') ??
	{}
);

/**
 * Load a config file if it exist.
 *
 * @param {string} fileName - The name of the config file
 * @returns {linterBundleConfig | undefined} - Either the file content for `undefined` if the file does not exist.
 * */
function loadConfig (fileName) {
	const filePath = path.join(process.cwd(), fileName);

	// eslint-disable-next-line import/no-dynamic-require -- Required here to load the configuration file.
	return (fs.existsSync(filePath) ? require(filePath) : undefined);
}
