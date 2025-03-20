/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import { atRuleParamIndex, declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/number-leading-zero';

const messages = ruleMessages(ruleName, {
	expected: 'Expected a leading zero',
	rejected: 'Unexpected leading zero'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/number-leading-zero/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['always', 'never']
	});

	if (!validOptions) {
		return;
	}

	root.walkAtRules((atRule) => {
		if (atRule.name.toLowerCase() === 'import') {
			return;
		}

		check(atRule, atRule.params);
	});

	root.walkDecls((decl) => check(decl, decl.value));

	/**
	 * @param {import('postcss').AtRule | import('postcss').Declaration} node
	 * @param {string} value
	 */
	function check (node, value) {
		// Get out quickly if there are no periods
		if (!value.includes('.')) {
			return;
		}

		valueParser(value).walk((valueNode) => {
			// Ignore `url` function
			if (valueNode.type === 'function' && valueNode.value.toLowerCase() === 'url') {
				return false;
			}

			// Ignore strings, comments, etc
			if (valueNode.type !== 'word') {
				return;
			}

			// Check leading zero
			if (primary === 'always') {
				const match = (/(?:\D|^)(\.\d+)/).exec(valueNode.value);

				if (match?.[0] == null || match[1] == null) {
					return;
				}

				// The regexp above consists of 2 capturing groups (or capturing parentheses).
				// We need the index of the second group. This makes sense when we have "-.5" as an input
				// for regex. And we need the index of ".5".
				const capturingGroupIndex = match[0].length - match[1].length;

				const index = valueNode.sourceIndex + match.index + capturingGroupIndex;
				const baseIndex = isAtRule(node) ? atRuleParamIndex(node) : declarationValueIndex(node);

				complain(messages.expected, node, baseIndex + index, () => {
					if (isAtRule(node)) {
						node.params = addLeadingZero(node.params, index);
					}
					else {
						node.value = addLeadingZero(node.value, index);
					}
				});
			}

			if (primary === 'never') {
				const match = (/(?:\D|^)(0+)(\.\d+)/).exec(valueNode.value);

				if (match?.[0] == null || match[1] == null || match[2] == null) {
					return;
				}

				// The regexp above consists of 3 capturing groups (or capturing parentheses).
				// We need the index of the second group. This makes sense when we have "-00.5"
				// as an input for regex. And we need the index of "00".
				const capturingGroupIndex = match[0].length - (match[1].length + match[2].length);

				const index = valueNode.sourceIndex + match.index + capturingGroupIndex;
				const baseIndex = isAtRule(node) ? atRuleParamIndex(node) : declarationValueIndex(node);
				const startIndex = index;
				const endIndex = index + match[1].length;

				complain(messages.rejected, node, baseIndex + index, () => {
					if (isAtRule(node)) {
						node.params = removeLeadingZeros(node.params, startIndex, endIndex);
					}
					else {
						node.value = removeLeadingZeros(node.value, startIndex, endIndex);
					}
				});
			}
		});
	}

	/**
	 * @param {string} message
	 * @param {import('postcss').Node} node
	 * @param {number} index
	 * @param {function(): void} [fixFunction]
	 */
	function complain (message, node, index, fixFunction) {
		report({
			result,
			ruleName,
			message,
			node,
			index,
			endIndex: index,
			fix: fixFunction
		});
	}
};

/**
 * @param {string} input
 * @param {number} index
 * @returns {string}
 */
function addLeadingZero (input, index) {
	return input.slice(0, index) + '0' + input.slice(index);
}

/**
 * @param {string} input
 * @param {number} startIndex
 * @param {number} endIndex
 * @returns {string}
 */
function removeLeadingZeros (input, startIndex, endIndex) {
	return input.slice(0, startIndex) + input.slice(endIndex);
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
