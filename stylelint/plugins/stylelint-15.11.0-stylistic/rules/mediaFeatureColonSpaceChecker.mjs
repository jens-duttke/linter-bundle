// @ts-nocheck

import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';

import styleSearch from '../style-search/index.mjs';

/**
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: (args: { source: string, index: number, err: (message: string) => void }) => void,
 *   fix: ((node: import('postcss').AtRule, index: number) => boolean) | null,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 * }} opts
 * @param options
 */
export default function mediaFeatureColonSpaceChecker (options) {
	options.root.walkAtRules(/^media$/i, (atRule) => {
		const parameters = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

		styleSearch({ source: parameters, target: ':' }, (match) => {
			checkColon(parameters, match.startIndex, atRule);
		});
	});

	/**
	 * @param {string} source
	 * @param {number} index
	 * @param {import('postcss').AtRule} node
	 */
	function checkColon (source, index, node) {
		options.locationChecker({
			source,
			index,
			err: (message) => {
				const colonIndex = index + atRuleParamIndex(node);

				if (options.fix?.(node, colonIndex)) {
					return;
				}

				report({
					message,
					node,
					index: colonIndex,
					result: options.result,
					ruleName: options.checkedRuleName
				});
			}
		});
	}
};
