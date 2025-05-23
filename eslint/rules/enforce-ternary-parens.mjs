/**
 * @file ESLint rule that ensures ternary expressions are wrapped in parentheses.
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
			recommended: true
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
						const nodeBefore = context.sourceCode.getTokenBefore(node, { includeComments: true });
						const nodeAfter = context.sourceCode.getTokenAfter(node, { includeComments: true });

						if (!nodeBefore || !nodeAfter || nodeBefore.loc?.end.line === node.loc?.start.line) {
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
