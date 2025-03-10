/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/media-feature-parentheses-space-inside';

const messages = ruleMessages(ruleName, {
	expectedOpening: 'Expected single space after "("',
	rejectedOpening: 'Unexpected whitespace after "("',
	expectedClosing: 'Expected single space before ")"',
	rejectedClosing: 'Unexpected whitespace before ")"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-feature-parentheses-space-inside/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['always', 'never']
	});

	if (!validOptions) {
		return;
	}

	root.walkAtRules(/^media$/i, (atRule) => {
		// If there are comments in the params, the complete string
		// will be at atRule.raws.params.raw
		const parameters = (atRule.raws.params?.raw) || atRule.params;
		const indexBoost = atRuleParamIndex(atRule);
		/** @type {Array<{ message: string, index: number }>} */
		const problems = [];

		const parsedParameters = valueParser(parameters).walk((node) => {
			if (node.type === 'function') {
				const length_ = valueParser.stringify(node).length;

				if (primary === 'never') {
					if ((/[\t ]/).test(node.before)) {
						problems.push({
							message: messages.rejectedOpening,
							index: node.sourceIndex + 1 + indexBoost
						});
					}

					if ((/[\t ]/).test(node.after)) {
						problems.push({
							message: messages.rejectedClosing,
							index: node.sourceIndex - 2 + length_ + indexBoost
						});
					}
				}
				else if (primary === 'always') {
					if (node.before === '') {
						problems.push({
							message: messages.expectedOpening,
							index: node.sourceIndex + 1 + indexBoost
						});
					}

					if (node.after === '') {
						problems.push({
							message: messages.expectedClosing,
							index: node.sourceIndex - 2 + length_ + indexBoost
						});
					}
				}
			}
		});

		if (problems.length > 0) {
			for (const error of problems) {
				report({
					message: error.message,
					node: atRule,
					index: error.index,
					endIndex: error.index,
					result,
					ruleName
				});
			}
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
