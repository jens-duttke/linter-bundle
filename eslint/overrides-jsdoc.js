/**
 * @file Settings for JSDoc comments in JavaScript (Node.js) files.
 */

module.exports = {
	overrides: [
		{
			files: ['*.js'],
			env: {
				node: true,
				es6: true
			},
			plugins: ['jsdoc'],
			settings: {
				jsdoc: {
					mode: 'typescript'
				}
			},
			rules: {
				/**
				 * "eslint-plugin-jsdoc" rules
				 *
				 * @see https://github.com/gajus/eslint-plugin-jsdoc
				 */
				'jsdoc/check-access': 'error',
				'jsdoc/check-alignment': 'error',
				'jsdoc/check-examples': 'off', // @todo need to be configured to allow text-based examples
				'jsdoc/check-indentation': ['off', { excludeTags: ['typedef'] }], // @todo this doesn't work in all cases
				'jsdoc/check-param-names': 'error',
				'jsdoc/check-syntax': 'error',
				'jsdoc/check-line-alignment': 'error',
				'jsdoc/check-tag-names': 'error',
				'jsdoc/check-types': 'error',
				'jsdoc/check-values': 'error',
				'jsdoc/empty-tags': 'error',
				'jsdoc/implements-on-classes': 'error',
				'jsdoc/match-description': 'error',
				'jsdoc/newline-after-description': 'error',
				'jsdoc/no-bad-blocks': 'error',
				'jsdoc/no-defaults': 'off',
				'jsdoc/no-missing-syntax': 'off',
				'jsdoc/no-restricted-syntax': 'off',
				'jsdoc/no-types': 'off',
				'jsdoc/no-undefined-types': ['error', { definedTypes: ['void', 'never', 'Readonly'] }],
				'jsdoc/require-description-complete-sentence': 'off', // @todo Doesn't work correctly (e.g. the `g` of `e.g.` is interpreted as separate sentence).
				'jsdoc/require-description': 'error',
				'jsdoc/require-example': 'off',
				'jsdoc/require-file-overview': 'error',
				'jsdoc/require-hyphen-before-param-description': 'error',
				'jsdoc/require-jsdoc': 'error',
				'jsdoc/require-param-description': 'error',
				'jsdoc/require-param-name': 'error',
				'jsdoc/require-param-type': 'error',
				'jsdoc/require-param': 'error',
				'jsdoc/require-property': 'error',
				'jsdoc/require-returns-check': 'error',
				'jsdoc/require-returns-description': 'error',
				'jsdoc/require-returns-type': 'error',
				'jsdoc/require-returns': ['error', { forceReturnsWithAsync: true }],
				'jsdoc/require-throws': 'error',
				'jsdoc/require-yields': 'error',
				'jsdoc/require-yields-check': 'error',
				'jsdoc/valid-types': 'off' // Checked by TypeScript
			}
		}
	]
};
