/**
 * @file ESLint helper function to check if an ESLint Rule Node is wrapped in parentheses.
 */

/**
 * Helper function to check if the node is wrapped in parentheses.
 *
 * @param {import('eslint').Rule.RuleContext} context - The rule context.
 * @param {import('eslint').Rule.Node} node - The expression node.
 * @returns {boolean} Returns `true` with the node is wrapped by parens.
 */
export function isParenthesized (context, node) {
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
