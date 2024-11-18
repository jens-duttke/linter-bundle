/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import atRuleParamIndex from 'stylelint/lib/utils/atRuleParamIndex.mjs';
import declarationValueIndex from 'stylelint/lib/utils/declarationValueIndex.mjs';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import parseSelector from 'stylelint/lib/utils/parseSelector.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import { isBoolean, assertString } from 'stylelint/lib/utils/validateTypes.mjs';

const ruleName = 'plugin/string-quotes';

const messages = ruleMessages(ruleName, {
	expected: (q) => `Expected ${q} quotes`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/string-quotes/README.md',
	fixable: true
};

const singleQuote = '\'';
const doubleQuote = '"';

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => {
	const correctQuote = primary === 'single' ? singleQuote : doubleQuote;
	const erroneousQuote = primary === 'single' ? doubleQuote : singleQuote;

	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: ['single', 'double']
			},
			{
				actual: secondaryOptions,
				possible: {
					avoidEscape: [isBoolean]
				},
				optional: true
			}
		);

		if (!validOptions) {
			return;
		}

		const avoidEscape =
			secondaryOptions && secondaryOptions.avoidEscape !== undefined ?
				secondaryOptions.avoidEscape
				: true;

		root.walk((node) => {
			switch (node.type) {
				case 'atrule':
					checkDeclOrAtRule(node, node.params, atRuleParamIndex);
					break;
				case 'decl':
					checkDeclOrAtRule(node, node.value, declarationValueIndex);
					break;
				case 'rule':
					checkRule(node);
					break;
			}
		});

		/**
		 * @param {import('postcss').Rule} ruleNode
		 * @returns {void}
		 */
		function checkRule (ruleNode) {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			if (!ruleNode.selector.includes('[') || !ruleNode.selector.includes('=')) {
				return;
			}

			/** @type {number[]} */
			const fixPositions = [];

			parseSelector(ruleNode.selector, result, ruleNode, (selectorTree) => {
				let selectorFixed = false;

				selectorTree.walkAttributes((attributeNode) => {
					if (!attributeNode.quoted) {
						return;
					}

					if (attributeNode.quoteMark === correctQuote && avoidEscape) {
						assertString(attributeNode.value);
						const needsCorrectEscape = attributeNode.value.includes(correctQuote);
						const needsOtherEscape = attributeNode.value.includes(erroneousQuote);

						if (needsOtherEscape) {
							return;
						}

						if (needsCorrectEscape) {
							report({
								message: messages.expected(primary === 'single' ? 'double' : primary),
								node: ruleNode,
								index: attributeNode.sourceIndex + attributeNode.offsetOf('value'),
								result,
								ruleName
							});
						}
					}

					if (attributeNode.quoteMark === erroneousQuote) {
						if (avoidEscape) {
							assertString(attributeNode.value);
							const needsCorrectEscape = attributeNode.value.includes(correctQuote);
							const needsOtherEscape = attributeNode.value.includes(erroneousQuote);

							if (needsOtherEscape) {
								report({
									message: messages.expected(primary),
									node: ruleNode,
									index: attributeNode.sourceIndex + attributeNode.offsetOf('value'),
									result,
									ruleName
								});

								return;
							}

							if (needsCorrectEscape) {
								return;
							}
						}

						report({
							message: messages.expected(primary),
							node: ruleNode,
							index: attributeNode.sourceIndex + attributeNode.offsetOf('value'),
							result,
							ruleName
						});
					}
				});

				if (selectorFixed) {
					ruleNode.selector = selectorTree.toString();
				}
			});

			for (const fixIndex of fixPositions) {
				ruleNode.selector = replaceQuote(ruleNode.selector, fixIndex, correctQuote);
			}
		}

		/**
		 * @template {import('postcss').AtRule | import('postcss').Declaration} T
		 * @param {T} node
		 * @param {string} value
		 * @param {(node: T) => number} getIndex
		 * @returns {void}
		 */
		function checkDeclOrAtRule (node, value, getIndex) {
			/** @type {number[]} */
			const fixPositions = [];

			// Get out quickly if there are no erroneous quotes
			if (!value.includes(erroneousQuote)) {
				return;
			}

			if (isAtRule(node) && node.name === 'charset') {
				// allow @charset rules to have double quotes, in spite of the configuration
				// TODO: @charset should always use double-quotes, see https://github.com/stylelint/stylelint/issues/2788
				return;
			}

			valueParser(value).walk((valueNode) => {
				if (valueNode.type === 'string' && valueNode.quote === erroneousQuote) {
					const needsEscape = valueNode.value.includes(correctQuote);

					if (avoidEscape && needsEscape) {
						// don't consider this an error
						return;
					}

					const openIndex = valueNode.sourceIndex;

					// we currently don't fix escapes
					report({
						message: messages.expected(primary),
						node,
						index: getIndex(node) + openIndex,
						result,
						ruleName
					});
				}
			});

			for (const fixIndex of fixPositions) {
				if (isAtRule(node)) {
					node.params = replaceQuote(node.params, fixIndex, correctQuote);
				}
				else {
					node.value = replaceQuote(node.value, fixIndex, correctQuote);
				}
			}
		}
	};
};

/**
 * @param {string} string
 * @param {number} index
 * @param {string} replace
 * @returns {string}
 */
function replaceQuote (string, index, replace) {
	return string.substring(0, index) + replace + string.substring(index + replace.length);
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
