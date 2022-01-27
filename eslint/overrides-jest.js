/**
 * @file Settings for Jest based unit tests.
 */

module.exports = {
	overrides: [
		{
			files: ['**/__tests__/**/*.[jt]s', '**/?(*.)+(spec|test).[jt]s'],
			env: {
				jest: true
			},
			settings: {
				jest: {
					version: (() => {
						try {
							// eslint-disable-next-line node/no-missing-require, import/no-dynamic-require -- If "overrides-jest" is used, "jest" should be installed, and it should be searched in the working directory of the process.
							const jestVersion = require(require.resolve('jest', { paths: [process.cwd()] })).getVersion().split('.')[0];

							process.stdout.write(`Detected Jest version: ${jestVersion}\n\n`);

							return jestVersion;
						}
						catch {
							process.stderr.write('No Jest version detected\n\n');

							return 'detect';
						}
					})()
				}
			},
			plugins: ['jest'],
			rules: {
				/**
				 * eslint
				 *
				 * @see https://eslint.org/docs/rules/
				 */
				'max-lines': 'off',
				'max-lines-per-function': 'off',

				/**
				 * typescript-eslint
				 *
				 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
				 */
				'@typescript-eslint/ban-ts-comment': ['error', {
					'ts-expect-error': false
				}],

				/**
				 * eslint-plugin-import
				 *
				 * @see https://github.com/import-js/eslint-plugin-import
				 */
				'import/no-unassigned-import': 'error',

				/**
				 * eslint-plugin-jest
				 *
				 * @see https://github.com/jest-community/eslint-plugin-jest/tree/master/docs/rules
				 */
				'jest/consistent-test-it': 'error',
				'jest/expect-expect': 'error',
				'jest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
				'jest/max-nested-describe': 'error',
				'jest/no-alias-methods': 'error',
				'jest/no-commented-out-tests': 'error',
				'jest/no-conditional-expect': 'error',
				'jest/no-deprecated-functions': 'error',
				'jest/no-disabled-tests': 'error',
				'jest/no-done-callback': 'error',
				'jest/no-duplicate-hooks': 'error',
				'jest/no-export': 'error',
				'jest/no-focused-tests': 'error',
				'jest/no-hooks': ['error', { allow: ['beforeEach', 'afterEach', 'afterAll'] }],
				'jest/no-identical-title': 'error',
				'jest/no-if': 'error',
				'jest/no-interpolation-in-snapshots': 'error',
				'jest/no-jasmine-globals': 'error',
				'jest/no-jest-import': 'error',
				'jest/no-large-snapshots': 'error',
				'jest/no-mocks-import': 'error',
				'jest/no-standalone-expect': 'error',
				'jest/no-test-prefixes': 'error',
				'jest/no-test-return-statement': 'error',
				'jest/prefer-called-with': 'error',
				'jest/prefer-expect-assertions': ['error', { onlyFunctionsWithAsyncKeyword: true }],
				'jest/prefer-expect-resolves': 'off', // We prefer `expect(await promise)` enforced by 'jest/no-restricted-matchers'
				'jest/prefer-hooks-on-top': 'error',
				'jest/require-hook': 'error',
				'jest/prefer-comparison-matcher': 'error',
				'jest/prefer-equality-matcher': 'error',
				'jest/prefer-spy-on': 'error',
				'jest/prefer-strict-equal': 'error',
				'jest/prefer-to-be': 'error',
				'jest/prefer-to-contain': 'error',
				'jest/prefer-to-have-length': 'error',
				'jest/prefer-todo': 'error',
				'jest/no-restricted-matchers': ['error', {
					resolves: 'Use `expect(await promise)` instead.',
					toBeFalsy: 'Avoid `toBeFalsy`',
					toBeTruthy: 'Avoid `toBeTruthy`',
					toMatchSnapshot: 'Use `toMatchInlineSnapshot()` instead',
					toThrowErrorMatchingSnapshot: 'Use `toThrowErrorMatchingInlineSnapshot()` instead'
				}],
				'jest/require-top-level-describe': 'error',
				'jest/require-to-throw-message': 'error',
				'jest/unbound-method': 'error',
				'jest/valid-describe-callback': 'error',
				'jest/valid-expect-in-promise': 'error',
				'jest/valid-expect': 'error',
				'jest/valid-title': 'error'
			}
		}
	]
};
