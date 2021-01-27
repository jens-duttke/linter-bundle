module.exports = {
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				/**
				 * @typescript-eslint
				 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
				 */
				'@typescript-eslint/no-confusing-void-expression': 'off', // @todo Conflicts with graphql-template strings

				/**
				 * eslint-plugin-unicorn
				 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
				 */
				'unicorn/string-content': ['error', {
					patterns: {
						// '\\.\\.\\.': '…', // @todo Does not support graphql-template strings. Report that as bug!
						// eslint-disable-next-line unicorn/string-content
						'->': '→'
					}
				}]
			}
		},
		{
			files: ['*.tsx'],
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
				'unicorn/filename-case': ['error', {
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
				 * @see https://github.com/benmosher/eslint-plugin-import
				 */
				'import/no-default-export': 'off',

				/**
				 * eslint-plugin-unicorn
				 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
				 */
				'unicorn/filename-case': ['error', {
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
				 * eslint-plugin-node
				 * @see https://github.com/mysticatea/eslint-plugin-node
				 */
				'node/no-unsupported-features/es-syntax': 'off'
			}
		}
	]
};
