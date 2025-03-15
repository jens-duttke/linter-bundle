/**
 * @file ESLint helper function for retrieving the previous statement before a given node.
 */

/**
 * Gets the previous statement before the given node, supporting switch cases.
 *
 * @param {import('eslint').Rule.RuleContext} context - The ESLint rule context.
 * @param {import('eslint').Rule.Node} node - The current variable declaration node.
 * @returns {import('eslint').Rule.Node | undefined} The previous statement if found, otherwise undefined.
 */
export function getPreviousStatement (context, node) {
	const previousNode = context.sourceCode.getTokenBefore(node);

	if (previousNode) {
		const parent = node.parent;
		let parentBody;

		if (parent.type === 'SwitchCase') {
			const switchStatement = parent.parent;

			if (switchStatement.type === 'SwitchStatement') {
				parentBody = switchStatement.cases.flatMap((caseNode) => caseNode.consequent);
			}
		}
		else if (Array.isArray(/** @type {any} */(parent).body)) {
			parentBody = /** @type {any} */(parent).body;
		}

		if (Array.isArray(parentBody)) {
			const index = parentBody.indexOf(node);

			if (index > 0) {
				return parentBody[index - 1];
			}
		}
	}

	return undefined;
}
