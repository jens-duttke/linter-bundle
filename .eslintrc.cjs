/**
 * @file Configuration used for linting the linter-bundle.
 */

module.exports = {
	root: true,
	extends: [
		require.resolve('./eslint.cjs'),
		require.resolve('./eslint/overrides-javascript-lazy.cjs'),
		require.resolve('./eslint/overrides-jsdoc.cjs')
	],
	overrides: [
		{
			files: ['stylelint/plugins/*.js'],
			rules: {
				'import/no-default-export': 'off' // stylelint plugins need to use default exports.
			}
		}
	]
};
