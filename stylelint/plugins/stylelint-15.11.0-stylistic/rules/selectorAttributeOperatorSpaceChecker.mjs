// @ts-nocheck

import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import parseSelector from 'stylelint/lib/utils/parseSelector.mjs';
import report from 'stylelint/lib/utils/report.mjs';

import styleSearch from '../style-search/index.mjs';

/**
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: (opts: { source: string, index: number, err: (msg: string) => void }) => void,
 *   checkedRuleName: string,
 *   checkBeforeOperator: boolean,
 *   fix: ((attributeNode: import('postcss-selector-parser').Attribute) => boolean) | null,
 * }} options
 * @returns {void}
 */
export default function selectorAttributeOperatorSpaceChecker (options) {
	options.root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) {
			return;
		}

		if (!rule.selector.includes('[') || !rule.selector.includes('=')) {
			return;
		}

		let hasFixed = false;
		const selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector;

		const fixedSelector = parseSelector(selector, options.result, rule, (selectorTree) => {
			selectorTree.walkAttributes((attributeNode) => {
				const operator = attributeNode.operator;

				if (!operator) {
					return;
				}

				const attributeNodeString = attributeNode.toString();

				styleSearch({ source: attributeNodeString, target: operator }, (match) => {
					const index = options.checkBeforeOperator ? match.startIndex : match.endIndex - 1;

					checkOperator(attributeNodeString, index, rule, attributeNode, operator);
				});
			});
		});

		if (hasFixed && fixedSelector) {
			if (!rule.raws.selector) {
				rule.selector = fixedSelector;
			}
			else {
				rule.raws.selector.raw = fixedSelector;
			}
		}

		/**
		 * @param {string} source
		 * @param {number} index
		 * @param {import('postcss').Node} node
		 * @param {import('postcss-selector-parser').Attribute} attributeNode
		 * @param {string} operator
		 */
		function checkOperator (source, index, node, attributeNode, operator) {
			options.locationChecker({
				source,
				index,
				err: (message) => {
					report({
						message: message.replace(
							options.checkBeforeOperator ?
								operator.charAt(0)
								: operator.charAt(operator.length - 1),
							operator
						),
						node,
						index: attributeNode.sourceIndex + index,
						endIndex: attributeNode.sourceIndex + index,
						result: options.result,
						ruleName: options.checkedRuleName,
						fix: (options.fix ? () => {
							if (options.fix(attributeNode)) {
								hasFixed = true;
							}
						} : undefined)
					});
				}
			});
		}
	});
}
