/**
 * @file ESLint rule which ensures logical operations are wrapped in parentheses.
 */

import { isParenthesized } from './helper/is-parenthesized.mjs';

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'Add parentheses around logical operations if not already present',
			category: 'Best Practices',
			recommended: false
		},
		fixable: 'code'
	},
	create (context) {
		return {
			LogicalExpression (node) {
				// Check if the parent node is a logical expression
				if (node.parent.type === 'LogicalExpression' || isParenthesized(context, node)) {
					return; // Do not add parentheses if they are already present
				}

				// If no parentheses are present, add parentheses around the logical operation
				context.report({
					node,
					message: 'Add parentheses around the logical operation.',
					fix (fixer) {
						return fixer.replaceText(node, `(${context.getSourceCode().getText(node)})`);
					}
				});
			}
		};
	}
};
