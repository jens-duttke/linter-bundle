/**
 * @file ESLint rule that disallows ternary expressions as return values for better readability.
 */

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Disallow ternary expressions as return values for better readability',
			category: 'Stylistic Issues',
			recommended: true
		},
		fixable: 'code',
		schema: []
	},
	create (context) {
		return {
			ReturnStatement (node) {
				if (node.argument?.type === 'ConditionalExpression') {
					context.report({
						node,
						message: 'Avoid using ternary expressions as return values; use an if-else statement instead.',
						fix (fixer) {
							const sourceCode = context.sourceCode;
							const argumentText = /** @type {any} */(node.argument)?.test;
							const argumentConsequent = /** @type {any} */(node.argument)?.consequent;
							const argumentAlternate = /** @type {any} */(node.argument)?.alternate;

							if (!argumentText || !argumentConsequent || !argumentAlternate) {
								return null;
							}

							const test = sourceCode.getText(argumentText);
							const consequent = sourceCode.getText(argumentConsequent);
							const alternate = sourceCode.getText(argumentAlternate);
							const indent = (/^\s*/u).exec(sourceCode.getText(node))?.[0];

							const fixedCode = `if (${test}) {\n${indent}  return ${consequent};\n}\n\n${indent}return ${alternate};`;

							return fixer.replaceText(node, fixedCode);
						}
					});
				}
			}
		};
	}
};
