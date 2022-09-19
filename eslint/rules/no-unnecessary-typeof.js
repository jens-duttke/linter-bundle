/**
 * @file ESLint rule which ensures that a `typeof` operant has more than one type in TypeScript, to prevent unnecessary checks of types at runtime.
 */

/** @typedef {ts.Type & { intrinsicName?: string; types?: ts.Type[]; objectFlags?: ts.ObjectFlags; }} Type */

const ts = require('typescript');

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
			textWithType: 'Unnecessary `typeof`, because the only possible type of `{{ name }}` is `{{ type }}`.',
			textWithoutType: 'Unnecessary `typeof`, because there is only one possible type of `{{ name }}`.'
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

				/** @type {Type} */
				const nodeType = checker.getTypeAtLocation(originalNode);

				if (isSingleType(nodeType)) {
					if (nodeType.intrinsicName) {
						context.report({
							node,
							messageId: 'textWithType',
							data: {
								name: node.argument.name,
								type: nodeType.intrinsicName
							}
						});
					}
					else {
						context.report({
							node,
							messageId: 'textWithoutType',
							data: {
								name: node.argument.name
							}
						});
					}
				}
			}
		};
	}
};

/**
 * Check if the number of types equals one.
 *
 * @param {Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the `type` is only one specific type.
 */
function isSingleType (type) {
	if (isAnyOrUnknown(type)) {
		return false;
	}

	if (!type.types) {
		return true;
	}

	const firstType = type.types[0];

	if (isAnyOrUnknown(firstType)) {
		return false;
	}

	for (let i = 1; i < type.types.length; i++) {
		if (isDifferentType(type.types[i], firstType)) {
			return false;
		}
	}

	return true;
}

/**
 * Check if the type is either `any` or `unknown`, which represents multiple types.
 *
 * @param {ts.Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the type is either `any` or `unknown`, or an object which is based on `unknown`.
 */
function isAnyOrUnknown (type) {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- `symbol` on Object is `undefined` for `Omit<unknown, 'undefined'>`
	return (type.flags === ts.TypeFlags.Any || type.flags === ts.TypeFlags.Unknown || (type.flags === ts.TypeFlags.Object && type.symbol === undefined));
}

/**
 * Check if two types are identical.
 *
 * @param {Type} type1 - TypeScript type node.
 * @param {Type} type2 - TypeScript type node.
 * @returns {boolean} Returns `true` if both types are identical.
 */
function isDifferentType (type1, type2) {
	if (isString(type1) && isString(type2)) { return false; }
	if (isNumber(type1) && isNumber(type2)) { return false; }
	if (isBigInt(type1) && isBigInt(type2)) { return false; }
	if (isBoolean(type1) && isBoolean(type2)) { return false; }
	if (isSymbol(type1) && isSymbol(type2)) { return false; }

	if (type1.flags !== type2.flags) {
		return true;
	}

	if (type1.flags === ts.TypeFlags.Object) {
		if (isFunction(type1)) {
			return !isFunction(type2);
		}

		return isFunction(type2);
	}

	return false;
}

/**
 * Checks if the given `type` is a `string`.
 *
 * @param {Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the type is a `string`.
 */
function isString (type) {
	return [ts.TypeFlags.String, ts.TypeFlags.StringLiteral, ts.TypeFlags.StringMapping].includes(type.flags);
}

/**
 * Checks if the given `type` is a `number`.
 *
 * @param {Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the type is a `number`.
 */
function isNumber (type) {
	return [ts.TypeFlags.Number, ts.TypeFlags.NumberLiteral].includes(type.flags);
}

/**
 * Checks if the given `type` is a `bigint`.
 *
 * @param {Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the type is a `bigint`.
 */
function isBigInt (type) {
	return [ts.TypeFlags.BigInt, ts.TypeFlags.BigIntLiteral].includes(type.flags);
}

/**
 * Checks if the given `type` is a `boolean`.
 *
 * @param {Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the type is a `boolean`.
 */
function isBoolean (type) {
	return [ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLiteral].includes(type.flags);
}

/**
 * Checks if the given `type` is a `symbol`.
 *
 * @param {Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the type is a `symbol`.
 */
function isSymbol (type) {
	return [ts.TypeFlags.ESSymbol, ts.TypeFlags.UniqueESSymbol].includes(type.flags);
}

/**
 * Checks if the given `type` is a `function`.
 *
 * @param {Type} type - TypeScript type node.
 * @returns {boolean} Returns `true` if the type is a `function`.
 */
function isFunction (type) {
	return (type.objectFlags === ts.ObjectFlags.Anonymous);
}
