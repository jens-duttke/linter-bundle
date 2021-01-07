module.exports = {
	files: ['*.js'],
	env: {
		node: true,
		es6: true
	},
	globals: {},
	rules: {
		/**
		 * @typescript-eslint Rules
		 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
		 */
		'@typescript-eslint/explicit-function-return-type': 'off', // Requires type information (@see https://github.com/typescript-eslint/typescript-eslint/issues/906)
		'@typescript-eslint/explicit-member-accessibility': 'off', // @todo This function should also consider JSDoc @public/@private, but it doesn't do that yet, so create an ticket.
		'@typescript-eslint/naming-convention': 'off', // Requires type information
		'@typescript-eslint/no-implicit-any-catch': 'off', // @todo What's the correct way to define the type of the error-parameter in js files?
		'@typescript-eslint/no-require-imports': 'off', // Requires type information
		'@typescript-eslint/no-unused-vars-experimental': 'off', // @todo Throws an error "Maximum call stack size exceeded."
		'@typescript-eslint/no-var-requires': 'off', // Requires type information
		'@typescript-eslint/prefer-nullish-coalescing': 'off', // @todo `??` is not yet supported by NodeJS. Remove this like, as soon as it is supported.
		'@typescript-eslint/prefer-optional-chain': 'off', // @todo `?.` is not yet supported by NodeJS. Remove this like, as soon as it is supported.
		'@typescript-eslint/triple-slash-reference': 'off', // Required to make use of *.d.ts files

		/**
		 * eslint-plugin-import Rules
		 * @see https://github.com/benmosher/eslint-plugin-import
		 */
		'import/no-commonjs': 'off',
		'import/no-internal-modules': ['error', {
			allow: [
				'**/webpack/*',
				'**/helper/*'
			]
		}],
		'import/no-nodejs-modules': 'off',

		/**
		 * eslint-plugin-unicorn Rules
		 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
		 */
		'unicorn/filename-case': ['error', {
			cases: {
				kebabCase: true
			}
		}],
		'unicorn/prevent-abbreviations': ['error', { ignore: ['dev', 'env', 'i', 'j', 'i18n', 'pkg', 'ref', 'Ref', 'req', 'res', 'setupDevServerMiddleware'] }],

		/**
		 * eslint Rules
		 * @see https://eslint.org/docs/rules/
		 */
		'max-lines-per-function': 'off',
		'no-undef': 'error',

		/**
		 * eslint-plugin-node Rules
		 * @see https://github.com/mysticatea/eslint-plugin-node
		 */

		// Possible Errors
		'node/handle-callback-err': 'error',
		'node/no-callback-literal': 'error',
		'node/no-exports-assign': 'error',
		'node/no-extraneous-import': 'error',
		'node/no-extraneous-require': 'error',
		'node/no-missing-import': 'error',
		'node/no-missing-require': 'error',
		'node/no-new-require': 'error',
		'node/no-path-concat': 'error',
		'node/no-process-exit': 'error',
		'node/no-unpublished-bin': 'error',
		'node/no-unpublished-import': 'error',
		'node/no-unpublished-require': 'off', // Since we use .js files only for the dev-environment, we don't need this rule
		'node/no-unsupported-features/es-builtins': 'error',
		'node/no-unsupported-features/es-syntax': 'error',
		'node/no-unsupported-features/node-builtins': 'error',
		'node/process-exit-as-throw': 'error',
		'node/shebang': 'error',

		// Best Practices
		'node/no-deprecated-api': 'error',

		// Stylistic Issues
		'node/callback-return': 'error',
		'node/exports-style': 'error',
		'node/file-extension-in-import': 'error',
		'node/global-require': 'off',
		'node/no-mixed-requires': 'error',
		'node/no-process-env': 'error',
		'node/no-restricted-import': 'error',
		'node/no-restricted-require': 'error',
		'node/no-sync': 'off', // Since the .js files are used in the CLI, preventing the use of sync functions is not required
		'node/prefer-global/buffer': 'error',
		'node/prefer-global/console': 'error',
		'node/prefer-global/process': 'error',
		'node/prefer-global/text-decoder': 'error',
		'node/prefer-global/text-encoder': 'error',
		'node/prefer-global/url-search-params': 'error',
		'node/prefer-global/url': 'error',
		'node/prefer-promises/dns': 'error',
		'node/prefer-promises/fs': 'error'
	}
};
