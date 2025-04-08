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
const rule = (primary, _secondaryOptions) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never']
		});

		if (!validOptions) {
			return;
		}

		root.walkAtRules(/^media$/iu, (atRule) => {
			findMediaOperator(atRule, (match, parameters, node) => {
				checkAfterOperator(match, parameters, node);
			});
		});

		/**
		 * @param {import('style-search').StyleSearchMatch} match
		 * @param {string} parameters
		 * @param {import('postcss').AtRule} node
		 */
		function checkAfterOperator (match, parameters, node) {
			const endIndex = match.startIndex + match.target.length - 1;

			checker.after({
				source: parameters,
				index: endIndex,
				err: (m) => {
					report({
						message: m,
						node,
						index: endIndex + atRuleParamIndex(node) + 1,
						endIndex: endIndex + atRuleParamIndex(node) + 1,
						result,
						ruleName,
						fix: (fixer) => {
							let parameters = node.raws.params ? node.raws.params.raw : node.params;
							const beforeOperator = parameters.slice(0, endIndex + 1);
							const afterOperator = parameters.slice(endIndex + 1);

							if (primary === 'always') {
								parameters = beforeOperator + afterOperator.replace(/^\s*/u, ' ');
							}
							else if (primary === 'never') {
								parameters = beforeOperator + afterOperator.replace(/^\s*/u, '');
							}

							if (node.raws.params) {
								node.raws.params.raw = parameters;
							}
							else {
								node.params = parameters;
							}

							return fixer;
						}
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
