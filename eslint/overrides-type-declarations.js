module.exports = {
	overrides: [
		{
			files: ['*.d.ts'],
			rules: {
				/**
				 * eslint
				 * @see https://eslint.org/docs/rules/
				 */
				'max-classes-per-file': 'off',
				'one-var': 'off',

				/**
				 * @typescript-eslint
				 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
				 */
				'@typescript-eslint/no-unused-vars': 'off', // This rule reports interfaces as unused vars in d.ts files.

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
						kebabCase: true,
						pascalCase: true
					}
				}]
			}
		}
	]
};
