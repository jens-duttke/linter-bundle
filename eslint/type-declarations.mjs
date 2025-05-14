/**
 * @file Settings for TypeScript type definition files.
 */

export default [
	{
		files: ['**/*.d.ts'],
		rules: {
			/**
			 * eslint
			 *
			 * @see https://eslint.org/docs/rules/
			 */
			'max-classes-per-file': 'off',
			'one-var': 'off',

			/**
			 * eslint-plugin-import
			 *
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/no-default-export': 'off',
			'import/no-unused-modules': 'off',

			/**
			 * eslint-plugin-unicorn
			 *
			 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
			 */
			'unicorn/filename-case': ['off', { // Disabled in favour of the linter-bundle `files` task
				cases: {
					kebabCase: true,
					pascalCase: true
				}
			}]
		}
	},
	{
		files: [
			'**/*.css.d.ts',
			'**/*.scss.d.ts'
		],
		rules: {
			/**
			 * eslint
			 *
			 * @see https://eslint.org/docs/rules/
			 */
			'linebreak-style': 'off' // Ignore for automatically generated .(s)css.d.ts files, since that does not affect the project.
		}
	}
];
