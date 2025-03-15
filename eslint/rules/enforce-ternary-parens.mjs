/**
 * @file ESLint rule which ensures ternary expressions are wrapped in parentheses.
 */

import { isParenthesized } from './helper/is-parenthesized.mjs';

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
	meta: {
		type: 'problem',
		fixable: 'code',
		docs: {
			description: 'Requires ternary expressions to be wrapped in parentheses.',
			category: 'Styling',
			recommended: false
		}
	},

	create (context) {
		return {
			ConditionalExpression (node) {
				if (isParenthesized(context, node)) {
					return;
				}

				context.report({
					node,
					message: 'Ternary expressions must be wrapped in parentheses.',
					fix (fixer) {
						// Wrap the entire ternary expression in parentheses.
						return fixer.replaceText(node, `(${context.sourceCode.getText(node)})`);
					}
				});
			}
		};
	}
};
