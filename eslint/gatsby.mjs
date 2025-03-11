/**
 * @file Settings for Gatsby-based projects.
 *
 */

export default [
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			/**
			 * eslint
			 * @see https://eslint.org/docs/rules/
			 */
			'no-restricted-imports': ['error', {
				paths: [{
					name: '@reach/router',
					importNames: ['useNavigate'],
					message: 'Use "import { navigate } from \'gatsby\';" instead of "const navigate = useNavigate();"'
				}]
			}],

			/**
			 * typescript-eslint
			 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
			 */
			'@typescript-eslint/no-confusing-void-expression': 'off', // @todo Conflicts with graphql-template strings

			/**
			 * eslint-plugin-import
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/no-unresolved': ['error', { caseSensitiveStrict: true, ignore: ['@reach/router'] }],

			/**
			 * eslint-plugin-unicorn
			 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
			 */
			'unicorn/string-content': 'off' // Breaks code (e.g. imports with `...` in Next.js or GraphQL template strings)
		}
	},
	{
		files: ['**/*.tsx'],
		settings: {
			linkComponents: [
				{ name: 'Link', linkAttribute: 'to' }
			]
		},
		rules: {
			/**
			 * eslint-plugin-unicorn
			 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
			 */
			'unicorn/filename-case': ['off', { // Disabled in favour of the linter-bundle `files` task
				cases: {
					camelCase: true,
					pascalCase: true
				},
				ignore: [
					/([A-Za-z0-9]?[a-z0-9]+)*[A-Z]{2,4}([A-Za-z0-9]?[a-z0-9]+)*/u // Up to 4 Characters can be upper-case in a row (e.g. in `prepareDOM` or `SVGIcon`)
				]
			}]
		}
	},
	{
		files: ['src/pages/*.tsx'],
		rules: {
			/**
			 * eslint-plugin-import
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/no-default-export': 'off',
			'import/no-unused-modules': ['error', { missingExports: true }],

			/**
			 * eslint-plugin-unicorn
			 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
			 */
			'unicorn/filename-case': ['off', { // Disabled in favour of the linter-bundle `files` task
				cases: {
					kebabCase: true
				}
			}]
		}
	},
	{
		files: ['gatsby-browser.js'],
		rules: {
			/**
			 * eslint-plugin-n
			 * @see https://github.com/eslint-community/eslint-plugin-n
			 */
			'n/no-unsupported-features/es-syntax': 'off'
		}
	}
];
