/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import findMediaOperator from '../findMediaOperator.mjs';

const ruleName = 'plugin/media-feature-range-operator-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after range operator',
	rejectedAfter: () => 'Unexpected whitespace after range operator'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-feature-range-operator-space-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never']
		});

		if (!validOptions) {
			return;
		}

		root.walkAtRules(/^media$/i, (atRule) => {
			/** @type {number[]} */
			const fixOperatorIndices = [];

			findMediaOperator(atRule, (match, parameters, node) => {
				checkAfterOperator(match, parameters, node, null);
			});

			if (fixOperatorIndices.length > 0) {
				let parameters = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

				for (const index of fixOperatorIndices.sort((a, b) => b - a)) {
					const beforeOperator = parameters.slice(0, index + 1);
					const afterOperator = parameters.slice(index + 1);

					if (primary === 'always') {
						parameters = beforeOperator + afterOperator.replace(/^\s*/, ' ');
					}
					else if (primary === 'never') {
						parameters = beforeOperator + afterOperator.replace(/^\s*/, '');
					}
				}

				if (atRule.raws.params) {
					atRule.raws.params.raw = parameters;
				}
				else {
					atRule.params = parameters;
				}
			}
		});

		/**
		 * @param {import('style-search').StyleSearchMatch} match
		 * @param {string} params
		 * @param parameters
		 * @param {import('postcss').AtRule} node
		 * @param {((index: number) => void) | null} fix
		 */
		function checkAfterOperator (match, parameters, node, fix) {
			const endIndex = match.startIndex + match.target.length - 1;

			checker.after({
				source: parameters,
				index: endIndex,
				err: (m) => {
					if (fix) {
						fix(endIndex);

						return;
					}

					report({
						message: m,
						node,
						index: endIndex + atRuleParamIndex(node) + 1,
						endIndex: endIndex + atRuleParamIndex(node) + 1,
						result,
						ruleName
					});
				}
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
