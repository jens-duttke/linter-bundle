/**
 * @file Settings for Jest based unit tests.
 */

import { createRequire } from 'node:module';

import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

const jestVersion = await getJestVersion();

export default [
	{
		files: ['**/__tests__/**/*.[jt]s', '**/?(*.)+(spec|test).[jt]s'],
		languageOptions: {
			globals: {
				...globals.jest
			}
		},
		settings: {
			jest: {
				version: jestVersion
			}
		},
		plugins: {
			jest: jestPlugin
		},
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
			'jest/max-expects': 'error',
			'jest/max-nested-describe': 'error',
			'jest/no-alias-methods': 'error',
			'jest/no-commented-out-tests': 'error',
			'jest/no-conditional-expect': 'error',
			'jest/no-conditional-in-test': 'error',
			'jest/no-confusing-set-timeout': 'error',
			'jest/no-deprecated-functions': 'error',
			'jest/no-disabled-tests': 'error',
			'jest/no-done-callback': 'error',
			'jest/no-duplicate-hooks': 'error',
			'jest/no-export': 'error',
			'jest/no-focused-tests': 'error',
			'jest/no-hooks': ['error', { allow: ['beforeEach', 'afterEach', 'afterAll'] }],
			'jest/no-identical-title': 'error',
			'jest/no-interpolation-in-snapshots': 'error',
			'jest/no-jasmine-globals': 'error',
			'jest/no-large-snapshots': 'error',
			'jest/no-mocks-import': 'error',
			'jest/no-restricted-jest-methods': 'off', // Right now, there are no specific restrictions
			'jest/no-restricted-matchers': ['error', {
				resolves: 'Use `expect(await promise)` instead.',
				toBeFalsy: 'Avoid `toBeFalsy`',
				toBeTruthy: 'Avoid `toBeTruthy`',
				toMatchSnapshot: 'Use `toMatchInlineSnapshot()` instead',
				toThrowErrorMatchingSnapshot: 'Use `toThrowErrorMatchingInlineSnapshot()` instead'
			}],
			'jest/no-standalone-expect': 'error',
			'jest/no-test-prefixes': 'error',
			'jest/no-test-return-statement': 'error',
			'jest/prefer-called-with': 'error',
			'jest/prefer-expect-assertions': ['error', { onlyFunctionsWithAsyncKeyword: true }],
			'jest/prefer-expect-resolves': 'off', // We prefer `expect(await promise)` enforced by 'jest/no-restricted-matchers'
			'jest/prefer-hooks-in-order': 'error',
			'jest/prefer-hooks-on-top': 'error',
			'jest/prefer-comparison-matcher': 'error',
			'jest/prefer-each': 'error',
			'jest/prefer-equality-matcher': 'error',
			'jest/prefer-importing-jest-globals': 'error',
			'jest/prefer-jest-mocked': 'error',
			'jest/prefer-mock-promise-shorthand': 'error',
			'jest/prefer-snapshot-hint': 'error',
			'jest/prefer-spy-on': 'error',
			'jest/prefer-strict-equal': 'error',
			'jest/prefer-to-be': 'error',
			'jest/prefer-to-contain': 'error',
			'jest/prefer-to-have-length': 'error',
			'jest/prefer-todo': 'error',
			'jest/require-hook': 'error',
			'jest/require-top-level-describe': 'error',
			'jest/require-to-throw-message': 'error',
			'jest/unbound-method': 'error',
			'jest/valid-describe-callback': 'error',
			'jest/valid-expect-in-promise': 'error',
			'jest/valid-expect': 'error',
			'jest/valid-title': 'error'
		}
	},
	{
		files: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
		languageOptions: {
			globals: {
				...globals.jest
			}
		},
		settings: {
			jest: {
				version: jestVersion
			}
		},
		plugins: {
			jest: jestPlugin
		},
		rules: {
			/**
			 * eslint-plugin-jest
			 *
			 * @see https://github.com/jest-community/eslint-plugin-jest/tree/master/docs/rules
			 */
			'jest/no-untyped-mock-factory': 'error'
		}
	}
];

/**
 * Detects and retrieves the major version number of Jest installed in the project.
 *
 * This function attempts to dynamically import Jest using Node.js's module resolution
 * system. It extracts just the major version number (e.g., "29" from "29.3.1") and
 * logs the detected version to stdout. If Jest cannot be found or an error occurs,
 * it returns the fallback value "detect".
 *
 * @returns {Promise<string>} A promise that resolves to the major version number of Jest
 */
async function getJestVersion () {
	try {
		const require = createRequire(import.meta.url);

		const jestModule = await import(require.resolve('jest', { paths: [process.cwd()] }));

		const version = jestModule.getVersion().split('.')[0];

		process.stdout.write(`Detected Jest version: ${version}\n\n`);

		return version;
	}
	catch {
		process.stderr.write('No Jest version detected\n\n');

		return 'detect';
	}
}
