/**
 * @file Configuration used for linting the linter-bundle.
 */

module.exports = {
	root: true,
	extends: [
		require.resolve('./eslint'),
		require.resolve('./eslint/overrides-javascript-lazy'),
		require.resolve('./eslint/overrides-jsdoc')
	]
};
