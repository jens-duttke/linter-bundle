/**
 * @file Settings for JavaScript (Node.js) files.
 */

import globals from "globals";

import nPlugin from 'eslint-plugin-n';

export default [
	{
		files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
		languageOptions: {
			globals: {
				...globals.es2015,
				...globals.node,
			}
		},
		plugins: {
			'n': nPlugin
		},
		rules: {
			/**
			 * eslint
			 *
			 * @see https://eslint.org/docs/rules/
			 */
			'max-lines-per-function': 'off',
			'no-undef': 'error',

			/**
			 * typescript-eslint
			 *
			 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
			 */
			'@typescript-eslint/explicit-function-return-type': 'off', // Requires type information (@see https://github.com/typescript-eslint/typescript-eslint/issues/906)
			'@typescript-eslint/explicit-member-accessibility': 'off', // @todo This function should also consider JSDoc @public/@private, but it doesn't do that yet, so create an ticket.
			'@typescript-eslint/naming-convention': 'off', // Requires type information
			'@typescript-eslint/no-implicit-any-catch': 'off', // @todo What's the correct way to define the type of the error-parameter in js files?
			'@typescript-eslint/no-require-imports': 'off', // Requires type information
			'@typescript-eslint/no-unsafe-assignment': 'off', // @todo Reactivate after bug in @typescript-eslint is fixed (@see https://github.com/typescript-eslint/typescript-eslint/issues/1943)
			'@typescript-eslint/no-var-requires': 'off', // Requires type information
			'@typescript-eslint/triple-slash-reference': 'off', // Required to make use of *.d.ts files

			/**
			 * eslint-plugin-import
			 *
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/no-commonjs': 'off',
			'import/no-import-module-exports': 'error',
			'import/no-internal-modules': 'off',
			'import/no-nodejs-modules': 'off',
			'import/dynamic-import-chunkname': 'off',

			/**
			 * eslint-plugin-n
			 *
			 * @see https://github.com/eslint-community/eslint-plugin-n
			 */
			'n/callback-return': 'error',
			'n/exports-style': 'error',
			'n/file-extension-in-import': 'error',
			'n/global-require': 'off',
			'n/handle-callback-err': 'error',
			'n/no-callback-literal': 'error',
			'n/no-deprecated-api': 'error',
			'n/no-exports-assign': 'error',
			'n/no-extraneous-import': 'error',
			'n/no-extraneous-require': 'error',
			'n/no-missing-import': 'error',
			'n/no-missing-require': 'error',
			'n/no-mixed-requires': 'error',
			'n/no-new-require': 'error',
			'n/no-path-concat': 'error',
			'n/no-process-env': 'error',
			'n/no-process-exit': 'error',
			'n/no-restricted-import': 'error',
			'n/no-restricted-require': 'error',
			'n/no-sync': 'off', // Since the .js files are used in the CLI, preventing the use of sync functions is not required
			'n/no-unpublished-bin': 'error',
			'n/no-unpublished-import': 'error',
			'n/no-unpublished-require': 'off', // Since we use .js files only for the dev-environment, we don't need this rule
			'n/no-unsupported-features/es-builtins': 'error',
			'n/no-unsupported-features/es-syntax': 'error',
			'n/no-unsupported-features/node-builtins': 'error',
			'n/prefer-global/buffer': 'error',
			'n/prefer-global/console': 'error',
			'n/prefer-global/process': 'error',
			'n/prefer-global/text-decoder': 'error',
			'n/prefer-global/text-encoder': 'error',
			'n/prefer-global/url-search-params': 'error',
			'n/prefer-global/url': 'error',
			'n/prefer-promises/dns': 'error',
			'n/prefer-promises/fs': 'error',
			'n/process-exit-as-throw': 'error',
			'n/shebang': 'error',

			/**
			 * eslint-plugin-unicorn
			 *
			 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
			 */
			'unicorn/filename-case': ['off', { // Disabled in favour of the linter-bundle `files` task
				cases: {
					kebabCase: true
				}
			}],
			'unicorn/no-process-exit': 'off', // n/no-process-exit
			'unicorn/prefer-module': 'error',
			'unicorn/prefer-node-protocol': 'error',
			'unicorn/prevent-abbreviations': ['error', { ignore: ['args', 'dev', 'env', 'i', 'j', 'i18n', 'pkg', /[Rr]ef/u, 'req', 'res', 'setupDevServerMiddleware'] }],
			'unicorn/text-encoding-identifier-case': 'off'
		}
	},
	{
		files: ['**/*.mjs'],
		rules: {
			'unicorn/prefer-top-level-await': 'error'
		}
	},
	{
		files: ['**/*.js'],
		rules: {
			'unicorn/prefer-module': 'off'
		}
	}
];
