/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import { assertString } from 'stylelint/lib/utils/validateTypes.mjs';

import styleSearch from '../style-search/index.mjs';

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
export default function mediaQueryListCommaWhitespaceChecker (options) {
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

				report({
					message,
					node,
					index: commaIndex,
					endIndex: commaIndex,
					result: options.result,
					ruleName: options.checkedRuleName,
					fix: (options.fix ? () => options.fix(node, commaIndex) : undefined)
				});
			}
		});
	}
};
