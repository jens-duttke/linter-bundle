// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import { atRuleParamIndex, declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/number-no-trailing-zeros';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected trailing zero(s)'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/number-no-trailing-zeros/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, { actual: primary });

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
		/** @type {Array<{ startIndex: number, endIndex: number }>} */
		const fixPositions = [];

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

			const match = (/\.(\d{0,100}?)(0+)(?:\D|$)/u).exec(valueNode.value);

			// match[1] is any numbers between the decimal and our trailing zero, could be empty
			// match[2] is our trailing zero(s)
			if (match?.[1] == null || match[2] == null) {
				return;
			}

			// our index is:
			//  the index of our valueNode +
			//  the index of our match +
			//  1 for our decimal +
			//  the length of our potential non-zero number match (match[1])
			const index = valueNode.sourceIndex + match.index + 1 + match[1].length;

			// our startIndex is identical to our index except when we have only
			// trailing zeros after our decimal. in that case we don't need the decimal
			// either so we move our index back by 1.
			const startIndex = match[1].length > 0 ? index : index - 1;

			// our end index is our original index + the length of our trailing zeros
			const endIndex = index + match[2].length;

			const baseIndex = isAtRule(node) ? atRuleParamIndex(node) : declarationValueIndex(node);

			report({
				message: messages.rejected,
				node,
				// this is the index of the _first_ trailing zero
				index: baseIndex + index,
				endIndex: baseIndex + index,
				result,
				ruleName,
				fix: () => {
					fixPositions.unshift({
						startIndex,
						endIndex
					});
				}
			});
		});

		if (fixPositions.length > 0) {
			for (const fixPosition of fixPositions) {
				const startIndex = fixPosition.startIndex;
				const endIndex = fixPosition.endIndex;

				if (isAtRule(node)) {
					node.params = removeTrailingZeros(node.params, startIndex, endIndex);
				}
				else {
					node.value = removeTrailingZeros(node.value, startIndex, endIndex);
				}
			}
		}
	}
};

/**
 * @param {string} input
 * @param {number} startIndex
 * @param {number} endIndex
 * @returns {string}
 */
function removeTrailingZeros (input, startIndex, endIndex) {
	return input.slice(0, startIndex) + input.slice(endIndex);
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
