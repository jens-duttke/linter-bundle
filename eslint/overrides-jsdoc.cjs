/**
 * @file Settings for JSDoc comments in JavaScript (Node.js) files.
 */

module.exports = {
	overrides: [
		{
			files: ['*.js', '*.cjs', '*.mjs'],
			env: {
				node: true,
				es6: true
			},
			plugins: ['jsdoc'],
			settings: {
				jsdoc: {
					mode: 'typescript',
					exemptDestructuredRootsFromChecks: true
				}
			},
			rules: {
				/**
				 * "eslint-plugin-jsdoc" rules
				 * @see https://github.com/gajus/eslint-plugin-jsdoc
				 */
				'jsdoc/check-access': 'error',
				'jsdoc/check-alignment': 'error',
				'jsdoc/check-examples': 'off', // @todo Need to be configured to allow text-based examples
				'jsdoc/check-indentation': ['off', { excludeTags: ['typedef'] }], // @todo Why is this disabled?
				'jsdoc/check-param-names': 'error',
				'jsdoc/check-syntax': 'error',
				'jsdoc/check-line-alignment': ['error', { disableWrapIndent: true }],
				'jsdoc/check-tag-names': 'error',
				'jsdoc/check-template-names': 'error',
				'jsdoc/check-types': 'error',
				'jsdoc/check-values': 'error',
				'jsdoc/convert-to-jsdoc-comments': 'off',
				'jsdoc/empty-tags': 'error',
				'jsdoc/implements-on-classes': 'error',
				'jsdoc/imports-as-dependencies': 'off', // @todo Doesn't cover `peerDependencies` yet. As of v46.2.5 it should cover Node.js modules (like `child_process`), which must be checked, before activation.
				'jsdoc/informative-docs': 'error',
				'jsdoc/lines-before-block': ['error', {ignoreSameLine : false }],
				'jsdoc/match-description': 'error',
				'jsdoc/match-name': 'off',
				'jsdoc/multiline-blocks': ['error', { noSingleLineBlocks: true, singleLineTags: ['lends', 'type', 'typedef'], noFinalLineText: false }],
				'jsdoc/no-bad-blocks': 'error',
				'jsdoc/no-blank-blocks': 'error',
				'jsdoc/no-defaults': 'off',
				'jsdoc/no-missing-syntax': 'off',
				'jsdoc/no-multi-asterisks': ['error', { preventAtEnd: false }],
				'jsdoc/no-restricted-syntax': 'off',
				'jsdoc/no-types': 'off',
				'jsdoc/no-undefined-types': ['error', { definedTypes: ['void', 'never', 'Readonly'] }],
				'jsdoc/require-description-complete-sentence': 'error',
				'jsdoc/require-description': 'error',
				'jsdoc/require-example': 'off',
				'jsdoc/require-file-overview': 'error',
				'jsdoc/require-hyphen-before-param-description': 'error',
				'jsdoc/require-jsdoc': ['error', { minLineCount: 2 }],
				'jsdoc/require-param-description': 'error',
				'jsdoc/require-param-name': 'error',
				'jsdoc/require-param-type': 'error',
				'jsdoc/require-param': 'error',
				'jsdoc/require-property': 'error',
				'jsdoc/require-returns-check': 'error',
				'jsdoc/require-returns-description': 'error',
				'jsdoc/require-returns-type': 'error',
				'jsdoc/require-returns': ['error', { forceReturnsWithAsync: true }],
				'jsdoc/require-template': 'error',
				'jsdoc/require-throws': 'error',
				'jsdoc/require-yields': 'error',
				'jsdoc/require-yields-check': 'error',
				'jsdoc/tag-lines': ['error', 'always', {
					tags: {
						example: { lines: 'always' },
						file: { lines: 'always' },
						fileOverview: { lines: 'always' },
						license: { lines: 'always' },
						param: { lines: 'never' },
						private: { lines: 'never' },
						property: { lines: 'never' },
						protected: { lines: 'never' },
						public: { lines: 'never' },
						returns: { lines: 'never' },
						see: { lines: 'any' },
						template: { lines: 'never' },
						throws: { lines: 'never' },
						typedef: { lines: 'never' }
					},
					startLines: null,
					endLines: null,
					applyToEndTag: false
				}],
				'jsdoc/text-escaping': 'off', // Right now, there is no description of this rule available on the page. Only the discussion here: https://github.com/gajus/eslint-plugin-jsdoc/issues/864
				'jsdoc/valid-types': 'off' // Checked by TypeScript
			}
		}
	]
};
