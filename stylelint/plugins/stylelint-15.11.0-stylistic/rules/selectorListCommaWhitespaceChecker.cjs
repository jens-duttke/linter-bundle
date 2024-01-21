/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule.cjs');
const report = require('stylelint/lib/utils/report.cjs');

const styleSearch = require('../style-search/index.cjs');

/**
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: (opts: { source: string, index: number, err: (msg: string) => void }) => void,
 *   checkedRuleName: string,
 *   fix: ((rule: import('postcss').Rule, index: number) => boolean) | null,
 * }} opts
 * @param options
 * @returns {void}
 */
module.exports = function selectorListCommaWhitespaceChecker (options) {
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
				if (options.fix?.(node, index)) {
					return;
				}

				report({
					message,
					node,
					index,
					result: options.result,
					ruleName: options.checkedRuleName
				});
			}
		});
	}
};
