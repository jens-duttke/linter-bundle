/**
 * @file ESLint rule which ensures ternary expressions are wrapped in parentheses.
 */

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

/**
 * Helper function to check if the node is wrapped in parentheses.
 *
 * @param {import('eslint').Rule.RuleContext} context - The rule context.
 * @param {import('eslint').Rule.Node} node - The expression node.
 * @returns {boolean} Returns `true` with the node is wrapped by parens.
 */
function isParenthesized (context, node) {
	const { sourceCode } = context;

	const firstToken = sourceCode.getFirstToken(node);

	if (!firstToken) {
		return false;
	}

	const lastToken = sourceCode.getLastToken(node);

	if (!lastToken) {
		return false;
	}

	const tokenBefore = sourceCode.getTokenBefore(firstToken);

	if (!tokenBefore) {
		return false;
	}

	const tokenAfter = sourceCode.getTokenAfter(lastToken);

	if (!tokenAfter) {
		return false;
	}

	return (tokenBefore.value === '(' && tokenAfter.value === ')');
}
