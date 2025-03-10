/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import isSingleLineString from 'stylelint/lib/utils/isSingleLineString.mjs';
import isStandardSyntaxFunction from 'stylelint/lib/utils/isStandardSyntaxFunction.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/function-parentheses-newline-inside';

const messages = ruleMessages(ruleName, {
	expectedOpening: 'Expected newline after "("',
	expectedClosing: 'Expected newline before ")"',
	expectedOpeningMultiLine: 'Expected newline after "(" in a multi-line function',
	rejectedOpeningMultiLine: 'Unexpected whitespace after "(" in a multi-line function',
	expectedClosingMultiLine: 'Expected newline before ")" in a multi-line function',
	rejectedClosingMultiLine: 'Unexpected whitespace before ")" in a multi-line function'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/function-parentheses-newline-inside/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['always', 'always-multi-line', 'never-multi-line']
	});

	if (!validOptions) {
		return;
	}

	root.walkDecls((decl) => {
		if (!decl.value.includes('(')) {
			return;
		}

		let hasFixed = false;
		const declValue = getDeclarationValue(decl);
		const parsedValue = valueParser(declValue);

		parsedValue.walk((valueNode) => {
			if (valueNode.type !== 'function') {
				return;
			}

			if (!isStandardSyntaxFunction(valueNode)) {
				return;
			}

			const functionString = valueParser.stringify(valueNode);
			const isMultiLine = !isSingleLineString(functionString);
			const containsNewline = (/** @type {string} */ string_) => string_.includes('\n');

			// Check opening ...

			const openingIndex = valueNode.sourceIndex + valueNode.value.length + 1;
			const checkBefore = getCheckBefore(valueNode);

			if (primary === 'always' && !containsNewline(checkBefore)) {
				complain(messages.expectedOpening, openingIndex);
			}

			if (isMultiLine && primary === 'always-multi-line' && !containsNewline(checkBefore)) {
				complain(messages.expectedOpeningMultiLine, openingIndex);
			}

			if (isMultiLine && primary === 'never-multi-line' && checkBefore !== '') {
				complain(messages.rejectedOpeningMultiLine, openingIndex);
			}

			// Check closing ...

			const closingIndex = valueNode.sourceIndex + functionString.length - 2;
			const checkAfter = getCheckAfter(valueNode);

			if (primary === 'always' && !containsNewline(checkAfter)) {
				complain(messages.expectedClosing, closingIndex);
			}

			if (isMultiLine && primary === 'always-multi-line' && !containsNewline(checkAfter)) {
				complain(messages.expectedClosingMultiLine, closingIndex);
			}

			if (isMultiLine && primary === 'never-multi-line' && checkAfter !== '') {
				complain(messages.rejectedClosingMultiLine, closingIndex);
			}
		});

		if (hasFixed) {
			setDeclarationValue(decl, parsedValue.toString());
		}

		/**
		 * @param {string} message
		 * @param {number} offset
		 */
		function complain (message, offset) {
			report({
				ruleName,
				result,
				message,
				node: decl,
				index: declarationValueIndex(decl) + offset,
				endIndex: declarationValueIndex(decl) + offset
			});
		}
	});
};

/** @typedef {import('postcss-value-parser').FunctionNode} FunctionNode */

/**
 * @param {FunctionNode} valueNode
 */
function getCheckBefore (valueNode) {
	let before = valueNode.before;

	for (const node of valueNode.nodes) {
		if (node.type === 'comment') {
			continue;
		}

		if (node.type === 'space') {
			before += node.value;
			continue;
		}

		break;
	}

	return before;
}

/**
 * @param {FunctionNode} valueNode
 */
function getCheckAfter (valueNode) {
	let after = '';

	for (const node of [...valueNode.nodes].reverse()) {
		if (node.type === 'comment') {
			continue;
		}

		if (node.type === 'space') {
			after = node.value + after;
			continue;
		}

		break;
	}

	after += valueNode.after;

	return after;
}

/**
 * @param {FunctionNode} valueNode
 * @param {string} newline
 */
function fixBeforeForAlways (valueNode, newline) {
	let target;

	for (const node of valueNode.nodes) {
		if (node.type === 'comment') {
			continue;
		}

		if (node.type === 'space') {
			target = node;
			continue;
		}

		break;
	}

	if (target) {
		target.value = newline + target.value;
	}
	else {
		valueNode.before = newline + valueNode.before;
	}
}

/**
 * @param {FunctionNode} valueNode
 */
function fixBeforeForNever (valueNode) {
	valueNode.before = '';

	for (const node of valueNode.nodes) {
		if (node.type === 'comment') {
			continue;
		}

		if (node.type === 'space') {
			node.value = '';
			continue;
		}

		break;
	}
}

/**
 * @param {FunctionNode} valueNode
 * @param {string} newline
 */
function fixAfterForAlways (valueNode, newline) {
	valueNode.after = newline + valueNode.after;
}

/**
 * @param {FunctionNode} valueNode
 */
function fixAfterForNever (valueNode) {
	valueNode.after = '';

	for (const node of [...valueNode.nodes].reverse()) {
		if (node.type === 'comment') {
			continue;
		}

		if (node.type === 'space') {
			node.value = '';
			continue;
		}

		break;
	}
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
