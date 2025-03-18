/**
 * @file ESLint rule which disallows spaces after '<' and before '>' in TypeScript generics.
 */

/**
 * @typedef {'noSpaceAfterLessThan' | 'noSpaceBeforeGreaterThan'} MessageIds
 */

/** @type {import('@typescript-eslint/utils/ts-eslint').RuleModule<MessageIds>} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: "Disallow spaces after '<' and before '>' in TypeScript generics.",
			category: 'Stylistic Issues',
			recommended: true
		},
		fixable: 'whitespace',
		schema: [],
		messages: {
			noSpaceAfterLessThan: "No space allowed after '<' in generics.",
			noSpaceBeforeGreaterThan: "No space allowed before '>' in generics."
		}
	},
	defaultOptions: [],
	create (context) {
		return {
			TSTypeParameterInstantiation (node) {
				const text = context.sourceCode.getText(node);

				// Check for space after "<"
				if ((/<[ \t]+/u).test(text)) {
					context.report({
						node,
						messageId: 'noSpaceAfterLessThan',
						fix (fixer) {
							return fixer.replaceText(node, text.replace(/<[ \t]+/u, '<'));
						}
					});
				}

				// Check for space before ">"
				if ((/[ \t]+>/u).test(text)) {
					context.report({
						node,
						messageId: 'noSpaceBeforeGreaterThan',
						fix (fixer) {
							return fixer.replaceText(node, text.replace(/[ \t]+>/u, '>'));
						}
					});
				}
			}
		};
	}
};
