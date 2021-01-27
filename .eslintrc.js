module.exports = {
	root: true,
	extends: [
		require.resolve('./eslint'),
		require.resolve('./eslint/overrides-javascript-lazy')
	]
};
