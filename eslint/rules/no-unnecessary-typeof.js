/**
 * @file ESLint rule which ensures that `typeof window === 'undefined'` is not used, since it's often the source of rehydration issues in Gatsby.
 *
 * @see https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 */

const { ESLintUtils } = require('@typescript-eslint/utils');

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
	meta: {
		docs: {
			description: 'If a `typeof` operant has only one type in TypeScript, it\'s unnecessary to check it\'s type at runtime.',
			recommended: true
		},
		messages: {
			text: 'Unnecessary `typeof`, because the only possible type of `{{ name }}` is `{{ type }}`.'
		}
	},
	create (context) {
		return {
			UnaryExpression (node) {
				if (node.operator !== 'typeof' || node.argument.type !== 'Identifier') {
					return;
				}

				// @ts-expect-error -- Different type definitions for `Rule.RuleContext` in ESLint and @typescript-eslint
				const parserServices = ESLintUtils.getParserServices(context);
				const checker = parserServices.program.getTypeChecker();

				// @ts-expect-error -- ESLint `Identifier` is not recognized as `Node` by @typescript-eslint
				const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node.argument);

				/** @type {import('typescript').Type & { intrinsicName?: string; }} */
				const nodeType = checker.getTypeAtLocation(originalNode);

				// `intrinsicName` only exists if there is exactly one type
				if (nodeType.intrinsicName && !['any', 'error', 'unknown'].includes(nodeType.intrinsicName)) {
					context.report({
						node,
						messageId: 'text',
						data: {
							name: node.argument.name,
							type: nodeType.intrinsicName
						}
					});
				}
			}
		};
	}
};
