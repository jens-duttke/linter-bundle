/**
 * @file Settings for React code in TypeScript (TSX) files.
 */

const ensureType = require('../helper/ensure-type');

module.exports = {
	overrides: [
		{
			files: ['*.tsx'],
			rules: {
				/**
				 * typescript-eslint
				 *
				 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
				 */
				'@typescript-eslint/member-ordering': 'off' // For React components we are using react/sort-comp
			}
		}
	]
};
