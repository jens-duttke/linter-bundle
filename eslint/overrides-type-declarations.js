module.exports = {
	files: ['*.d.ts'],
	rules: {
		/**
		 * @typescript-eslint Rules
		 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
		 */
		'@typescript-eslint/no-unused-vars': 'off', // This rule reports interfaces as unused vars in d.ts files.

		/**
		 * eslint-plugin-import Rules
		 * @see https://github.com/benmosher/eslint-plugin-import
		 */
		'import/no-default-export': 'off',

		/**
		 * eslint Rules
		 * @see https://eslint.org/docs/rules/
		 */
		'max-classes-per-file': 'off',
		'one-var': 'off',

		/**
		 * eslint-plugin-unicorn Rules
		 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
		 */
		'unicorn/filename-case': ['error', {
			cases: {
				camelCase: true,
				kebabCase: true
			}
		}]
	}
};
