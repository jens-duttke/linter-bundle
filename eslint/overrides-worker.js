module.exports = {
	overrides: [
        {
			files: ['*.worker.ts'],
			rules: {
				/**
				 * eslint-plugin-import Rules
				 * @see https://github.com/benmosher/eslint-plugin-import
				 */
				'import/no-default-export': 'off'
			}
		}
	]
};
