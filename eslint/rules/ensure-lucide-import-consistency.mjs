/**
 * @file ESLint rule which enforces using Lucide prefix for lucide-react imports and their usage.
 */

import { AST_NODE_TYPES } from '@typescript-eslint/utils';

/**
 * @typedef {'alternative'} MessageIds
 */

/** @type {import('@typescript-eslint/utils/ts-eslint').RuleModule<MessageIds>} */
export default {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Enforces using Lucide prefix for lucide-react imports and their usage',
			category: 'Best Practices',
			recommended: true
		},
		messages: {
			alternative: 'Please use "{{lucideName}}" instead of "{{componentName}}"'
		},
		schema: [],
		fixable: 'code'
	},
	defaultOptions: [],
	create (context) {
		// Track renamed imports from lucide-react
		const renamedImports = new Map();

		return {
			ImportDeclaration (node) {
				if (node.source.value === 'lucide-react') {
					for (const specifier of node.specifiers) {
						if (specifier.type === AST_NODE_TYPES.ImportSpecifier) {
							const importedName = /** @type {any} */(specifier.imported).name;
							const localName = specifier.local.name;

							if (!importedName.startsWith('Lucide')) {
								const lucideName = `Lucide${importedName.replace(/Icon$/u, '')}`;

								// Store the mapping of local name to Lucide name
								renamedImports.set(localName, lucideName);

								context.report({
									node: specifier,
									messageId: 'alternative',
									data: { lucideName, importedName },
									fix (fixer) {
										return fixer.replaceText(
											specifier.imported,
											lucideName
										);
									}
								});
							}
						}
					}
				}
			},

			// Fix JSX usage
			JSXIdentifier (node) {
				// Only check opening elements, not attributes
				if (node.parent.type === AST_NODE_TYPES.JSXOpeningElement || node.parent.type === AST_NODE_TYPES.JSXClosingElement) {
					const componentName = node.name;

					if (renamedImports.has(componentName)) {
						/** @type {string} */
						const lucideName = renamedImports.get(componentName);

						context.report({
							node,
							messageId: 'alternative',
							data: { lucideName, componentName },
							fix (fixer) {
								return fixer.replaceText(node, lucideName);
							}
						});
					}
				}
			},

			// Fix JS usage (for non-JSX cases like React.createElement)
			Identifier (node) {
				// Exclude import declarations (already handled) and JSX (handled separately)
				if (
					node.parent.type !== AST_NODE_TYPES.ImportSpecifier &&
					node.parent.type !== AST_NODE_TYPES.JSXIdentifier &&
					node.parent.type !== AST_NODE_TYPES.JSXOpeningElement &&
					node.parent.type !== AST_NODE_TYPES.JSXClosingElement
				) {
					const componentName = node.name;

					if (renamedImports.has(componentName)) {
						/** @type {string} */
						const lucideName = renamedImports.get(componentName);

						context.report({
							node,
							messageId: 'alternative',
							data: { lucideName, componentName },
							fix (fixer) {
								return fixer.replaceText(node, lucideName);
							}
						});
					}
				}
			}
		};
	}
};
