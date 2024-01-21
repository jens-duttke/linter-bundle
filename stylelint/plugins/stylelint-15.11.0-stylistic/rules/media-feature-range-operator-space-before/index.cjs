/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const atRuleParamIndex = require('stylelint/lib/utils/atRuleParamIndex.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const whitespaceChecker = require('../../utils/whitespaceChecker.cjs');
const findMediaOperator = require('../findMediaOperator.cjs');

const ruleName = 'plugin/media-feature-range-operator-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before range operator',
	rejectedBefore: () => 'Unexpected whitespace before range operator'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-feature-range-operator-space-before/README.md',
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
			/** @type {((index: number) => void) | null} */
			const fix = context.fix ? (index) => fixOperatorIndices.push(index) : null;

			findMediaOperator(atRule, (match, parameters, node) => {
				checkBeforeOperator(match, parameters, node, fix);
			});

			if (fixOperatorIndices.length > 0) {
				let parameters = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

				for (const index of fixOperatorIndices.sort((a, b) => b - a)) {
					const beforeOperator = parameters.slice(0, index);
					const afterOperator = parameters.slice(index);

					if (primary === 'always') {
						parameters = beforeOperator.replace(/\s*$/, ' ') + afterOperator;
					}
					else if (primary === 'never') {
						parameters = beforeOperator.replace(/\s*$/, '') + afterOperator;
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
		function checkBeforeOperator (match, parameters, node, fix) {
			// The extra `+ 1` is because the match itself contains
			// the character before the operator
			checker.before({
				source: parameters,
				index: match.startIndex,
				err: (m) => {
					if (fix) {
						fix(match.startIndex);

						return;
					}

					report({
						message: m,
						node,
						index: match.startIndex - 1 + atRuleParamIndex(node),
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
module.exports = stylelint.createPlugin(ruleName, rule);
