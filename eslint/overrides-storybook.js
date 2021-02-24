module.exports = {
	overrides: [
		{
			files: ['*.stories.[jt]s?(x)'],
			rules: {
				/**
				 * eslint-plugin-import
				 * @see https://github.com/benmosher/eslint-plugin-import
				 */
				'import/no-default-export': 'off'
			}
		},
		{
			files: ['.storybook/main.ts'],
			rules: {
				/**
				 * eslint-plugin-import
				 * @see https://github.com/benmosher/eslint-plugin-import
				 */
				'import/no-nodejs-modules': 'off'
			}
		}
	]
};
