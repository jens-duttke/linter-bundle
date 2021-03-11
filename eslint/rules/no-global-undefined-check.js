/**
 * @file ESLint rule which ensures that `typeof window === 'undefined'` is not used, since it's often the source of rehydration issues in Gatsby.
 *
 * @see https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 */

const DISALLOWED_OBJECTS = new Set(['globalThis', 'window', 'self']);

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
	meta: {
		docs: {
			description: 'Rendering different output, depending on whether it is SSR or CSR, can lead to hard-to-debug rehydration problems in Gatsby.',
			recommended: true,
			url: 'https://www.joshwcomeau.com/react/the-perils-of-rehydration/'
		},
		messages: {
			text: 'Use `React.useEffect()` instead of checking if `{{ name }}` is `undefined`.'
		}
	},
	create (context) {
		return {
			BinaryExpression (node) {
				let expressionValue = getExpressionValue(node.left);
				let isLiteral;

				if (expressionValue !== null) {
					isLiteral = checkLiteral(node.right);
				}
				else {
					expressionValue = getExpressionValue(node.right);

					if (expressionValue === null) {
						return;
					}

					isLiteral = checkLiteral(node.left);
				}

				if (!isLiteral) {
					return;
				}

				context.report({
					node,
					messageId: 'text',
					data: {
						name: expressionValue
					}
				});
			}
		};
	}
};

/**
 * Get the name (identifier) of a global scope of an BinaryExpression operator.
 *
 * @param {import('estree').Expression} node - The node to check.
 * @returns {string | null} Returns the name of the `node`, or null if not compared with a global scope identifier.
 */
function getExpressionValue (node) {
	if (node.type === 'UnaryExpression' && node.operator === 'typeof' && node.argument.type === 'Identifier' && DISALLOWED_OBJECTS.has(node.argument.name)) {
		return node.argument.name;
	}

	return null;
}

/**
 * Check if a given `node` is a literal expression consisting of the text "undefined".
 *
 * @param {import('estree').Expression} node - The node to check
 * @returns {boolean} `true` if the node is a literal expression consisting of the text "undefined", otherwise `false`.
 */
function checkLiteral (node) {
	return (
		(node.type === 'Literal' && node.value === 'undefined') ||
		(node.type === 'TemplateLiteral' && node.quasis.map((quasi) => quasi.value.cooked).join('') === 'undefined')
	);
}
