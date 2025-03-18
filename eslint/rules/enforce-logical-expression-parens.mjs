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
			recommended: true
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

				context.report({
					node,
					message: 'Add parentheses around the logical operation.',
					fix (fixer) {
						const nodeBefore = context.sourceCode.getTokenBefore(node, { includeComments: true });
						const nodeAfter = context.sourceCode.getTokenAfter(node, { includeComments: true });

						if (!nodeBefore || !nodeAfter) {
							return fixer.replaceText(node, `(${context.sourceCode.getText(node)})`);
						}

						return [
							fixer.insertTextAfter(nodeBefore, '('),
							fixer.insertTextBefore(nodeAfter, ')')
						];
					}
				});
			}
		};
	}
};
