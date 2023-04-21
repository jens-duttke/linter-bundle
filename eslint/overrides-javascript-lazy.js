/**
 * @file Extends `./overrides-javascript` but ignores unsafe types.
 */

const overridesJavaScript = require('./overrides-javascript');

module.exports = {
	...overridesJavaScript,
	overrides: [
		{
			...overridesJavaScript.overrides[0],
			rules: {
				...overridesJavaScript.overrides[0].rules,

				/**
				 * typescript-eslint
				 *
				 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
				 */
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off'
			}
		}
	]
};
