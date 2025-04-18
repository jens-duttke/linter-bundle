// @ts-nocheck

import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import report from 'stylelint/lib/utils/report.mjs';

import styleSearch from '../style-search/index.mjs';

/**
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: (opts: { source: string, index: number, err: (msg: string) => void }) => void,
 *   checkedRuleName: string,
 *   fix: ((rule: import('postcss').Rule, index: number) => boolean) | null,
 * }} options
 * @returns {void}
 */
export default function selectorListCommaWhitespaceChecker (options) {
	options.root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) {
			return;
		}

		const selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector;

		styleSearch(
			{
				source: selector,
				target: ',',
				functionArguments: 'skip'
			},
			(match) => {
				checkDelimiter(selector, match.startIndex, rule);
			}
		);
	});

	/**
	 * @param {string} source
	 * @param {number} index
	 * @param {import('postcss').Rule} node
	 */
	function checkDelimiter (source, index, node) {
		options.locationChecker({
			source,
			index,
			err: (message) => {
				report({
					message,
					node,
					index,
					endIndex: index,
					result: options.result,
					ruleName: options.checkedRuleName,
					fix: (options.fix ? () => options.fix(node, index) : undefined)
				});
			}
		});
	}
}
