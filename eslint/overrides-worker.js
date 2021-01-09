module.exports = {
	overrides: [
        {
			files: ['*.worker.ts'],
			rules: {
				'import/no-default-export': 'off'
			}
		}
	]
};
