/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const atRuleParamIndex = require('stylelint/lib/utils/atRuleParamIndex.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const { assertString } = require('stylelint/lib/utils/validateTypes.cjs');

const styleSearch = require('../style-search/index.cjs');

/**
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: (args: { source: string, index: number, err: (message: string) => void }) => void,
 *   checkedRuleName: string,
 *   fix?: ((atRule: import('postcss').AtRule, index: number) => boolean) | null | undefined,
 *   allowTrailingComments?: boolean,
 * }} opts
 * @param options
 */
module.exports = function mediaQueryListCommaWhitespaceChecker (options) {
	options.root.walkAtRules(/^media$/i, (atRule) => {
		const parameters = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

		styleSearch({ source: parameters, target: ',' }, (match) => {
			let index = match.startIndex;

			if (options.allowTrailingComments) {
				// if there is a comment on the same line at after the comma, check the space after the comment.
				let execResult;

				while ((execResult = (/^[^\S\n\r]*\/\*([\S\s]*?)\*\//).exec(parameters.slice(index + 1)))) {
					assertString(execResult[0]);
					index += execResult[0].length;
				}

				if ((execResult = (/^([^\S\n\r]*\/\/[\S\s]*?)\r?\n/).exec(parameters.slice(index + 1)))) {
					assertString(execResult[1]);
					index += execResult[1].length;
				}
			}

			checkComma(parameters, index, atRule);
		});
	});

	/**
	 * @param {string} source
	 * @param {number} index
	 * @param {import('postcss').AtRule} node
	 */
	function checkComma (source, index, node) {
		options.locationChecker({
			source,
			index,
			err: (message) => {
				const commaIndex = index + atRuleParamIndex(node);

				if (options.fix?.(node, commaIndex)) {
					return;
				}

				report({
					message,
					node,
					index: commaIndex,
					result: options.result,
					ruleName: options.checkedRuleName
				});
			}
		});
	}
};
