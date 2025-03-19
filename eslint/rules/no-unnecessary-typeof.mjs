/**
 * @file ESLint rule that ensures that a `typeof` operant has more than one type in TypeScript, to prevent unnecessary checks of types at runtime.
 */

/** @typedef {ts.Type & { intrinsicName?: string; types?: ts.Type[]; objectFlags?: ts.ObjectFlags; }} Type */

import * as ts from 'typescript';

import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * @typedef {'text'} MessageIds
 */

/** @type {import('@typescript-eslint/utils/ts-eslint').RuleModule<MessageIds>} */
export default {
	meta: {
		type: 'problem',
		docs: {
			description: 'If a `typeof` operant has only one type in TypeScript, it\'s unnecessary to check it\'s type at runtime.',
			recommended: true,
			requiresTypeChecking: true
		},
		messages: {
			text: 'Unnecessary `typeof`, because the only possible type of {{ variableName }} is `{{ typeName }}`.'
		},
		schema: []
	},
	defaultOptions: [],

	create (context) {
		return {
			UnaryExpression (node) {
				if (node.operator !== 'typeof') {
					return;
				}

				const parserServices = ESLintUtils.getParserServices(context);
				const checker = parserServices.program.getTypeChecker();

				const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node.argument);

				/** @type {Type} */
				const nodeType = checker.getTypeAtLocation(originalNode);

				const variableName = checker.getSymbolAtLocation(originalNode)?.getName();
				const typeName = getSingleType(checker, nodeType);

				if (typeName !== null) {
					context.report({
						node,
						messageId: 'text',
						data: {
							variableName: (variableName ? `\`${variableName}\`` : `the ${node.argument.type.replace(/[A-Z]/gu, (substring) => ` ${substring.toLowerCase()}`).trim()}`),
							typeName
						}
					});
				}
			}
		};
	}
};

/**
 * Check if the number of types equals one, and returns the type.
 *
 * @param {ts.TypeChecker} checker - TypeScript type checker
 * @param {Type} type - TypeScript type node
 * @returns {string | null} Type as string match the `typeof` string, or `null` if it's not a primitive type
 */
function getSingleType (checker, type) {
	if (isAnyOrUnknown(type)) {
		return null;
	}

	if (!type.types) {
		return getTypeString(checker, type);
	}

	const firstType = getTypeString(checker, type.types[0]);

	if (firstType === null) {
		return null;
	}

	for (let i = 1; i < type.types.length; i++) {
		if (getTypeString(checker, type.types[i]) !== firstType) {
			return null;
		}
	}

	return firstType;
}

/**
 * Converts a TypeScript type into a `typeof` compatible string, or `null` if it's not a primitive type.
 *
 * @param {ts.TypeChecker} checker - TypeScript type checker
 * @param {Type} type - TypeScript type node
 * @returns {string | null} Type as string match the `typeof` string, or `null` if it's not a primitive type
 */
function getTypeString (checker, type) {
	if (isAnyOrUnknown(type)) {
		return null;
	}

	const typeString = checker.typeToString(type);

	if (['undefined', 'boolean', 'number', 'bigint', 'string', 'symbol', 'function', 'object'].includes(typeString)) {
		return typeString;
	}

	if (isUndefined(type)) { return 'undefined'; }
	if (isBoolean(type)) { return 'boolean'; }
	if (isNumber(type)) { return 'number'; }
	if (isBigInt(type)) { return 'bigint'; }
	if (isString(type)) { return 'string'; }
	if (isSymbol(type)) { return 'symbol'; }
	if (isFunction(type)) { return 'function'; }
	if (isObject(type)) { return 'object'; }

	return null;
}

/**
 * Check if the type is either `any` or `unknown`, which represents multiple types.
 *
 * @param {ts.Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is either `any` or `unknown`, or an object which is based on `unknown`
 */
function isAnyOrUnknown (type) {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- @todo I've seen `symbol` to be undefined. Is that an issue in the TypeScript type definition?
	return (type.flags === ts.TypeFlags.Any || type.flags === ts.TypeFlags.Unknown || (type.flags === ts.TypeFlags.Object && type.symbol === undefined));
}

/**
 * Checks if the given `type` is a `string`.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is a `string`
 */
function isString (type) {
	return [ts.TypeFlags.String, ts.TypeFlags.StringLiteral, ts.TypeFlags.StringMapping].includes(type.flags);
}

/**
 * Checks if the given `type` is a `number`.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is a `number`
 */
function isNumber (type) {
	return [ts.TypeFlags.Number, ts.TypeFlags.NumberLiteral].includes(type.flags);
}

/**
 * Checks if the given `type` is a `bigint`.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is a `bigint`
 */
function isBigInt (type) {
	return [ts.TypeFlags.BigInt, ts.TypeFlags.BigIntLiteral].includes(type.flags);
}

/**
 * Checks if the given `type` is a `boolean`.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is a `boolean`
 */
function isBoolean (type) {
	return [ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLiteral].includes(type.flags);
}

/**
 * Checks if the given `type` is a `symbol`.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is a `symbol`
 */
function isSymbol (type) {
	return [ts.TypeFlags.ESSymbol, ts.TypeFlags.UniqueESSymbol].includes(type.flags);
}

/**
 * Checks if the given `type` is a `function`.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is a `function`
 */
function isFunction (type) {
	return (type.flags === ts.TypeFlags.Object && type.objectFlags === ts.ObjectFlags.Anonymous);
}

/**
 * Checks if the given `type` is a `undefined`.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is `undefined`
 */
function isUndefined (type) {
	return [ts.TypeFlags.Undefined].includes(type.flags);
}

/**
 * Checks if the given `type` is a `object`.
 *
 * We don't check `ts.TypeFlags.Object`, because for TypeScript Object seems to be the fallback for everything - even unknown types.
 *
 * @param {Type} type - TypeScript type node
 * @returns {boolean} Returns `true` if the type is an `object`
 */
function isObject (type) {
	return [ts.TypeFlags.Null].includes(type.flags);
}
