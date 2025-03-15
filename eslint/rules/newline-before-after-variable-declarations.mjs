/**
 * @file Rule to enforce a newline before and after `const`, `let`, and `var` declarations, unless followed by another declaration
 */

import { getNextStatement } from './helper/get-next-statement.mjs';
import { getPreviousStatement } from './helper/get-previous-statement.mjs';

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce a newline before and after `const`, `let`, and `var` declarations, unless followed by another declaration.',
			category: 'Styling'
		},
		fixable: 'whitespace'
	},

	create (context) {
		return {
			VariableDeclaration (node) {
				if (!node.loc) {
					return;
				}

				const previousStatement = getPreviousStatement(context, node);
				const nextStatement = getNextStatement(context, node);

				if (previousStatement?.loc && node.loc.start.line === previousStatement.loc.end.line + 1 && previousStatement.type !== 'VariableDeclaration') {
					context.report({
						node,
						message: 'Add a newline before this declaration.',
						fix (fixer) {
							return fixer.insertTextBefore(node, '\n');
						}
					});
				}

				if (nextStatement?.loc && node.loc.end.line === nextStatement.loc.start.line - 1 && nextStatement.type !== 'VariableDeclaration') {
					context.report({
						node,
						message: 'Add a newline after this declaration.',
						fix (fixer) {
							return fixer.insertTextAfter(node, '\n');
						}
					});
				}
			}
		};
	}
};
