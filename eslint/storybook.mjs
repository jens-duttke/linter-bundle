/**
 * @file Settings for Storybook configuration and stories.
 */

export default [
	{
		files: ['**/*.stories.[jt]s?(x)'],
		rules: {
			/**
			 * eslint-plugin-import
			 *
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/no-default-export': 'off'
		}
	},
	{
		files: ['.storybook/main.ts'],
		rules: {
			/**
			 * eslint-plugin-import
			 *
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/no-nodejs-modules': 'off'
		}
	},
	{
		files: ['.storybook/preview.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
		rules: {
			/**
			 * eslint
			 *
			 * @see https://eslint.org/docs/rules/
			 */
			'no-underscore-dangle': ['error', {
				allow: ['__BASE_PATH__', '___loader', '___navigate'],
				allowAfterThis: true
			}]
		}
	}
];
