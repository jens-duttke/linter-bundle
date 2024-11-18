/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import atRuleParamIndex from 'stylelint/lib/utils/atRuleParamIndex.mjs';
import findMediaFeatureNames from 'stylelint/lib/utils/findMediaFeatureNames.mjs';
import isCustomMediaQuery from 'stylelint/lib/utils/isCustomMediaQuery.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import { mutateIdent } from '@csstools/css-tokenizer';

const ruleName = 'plugin/media-feature-name-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-feature-name-case/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['lower', 'upper']
	});

	if (!validOptions) {
		return;
	}

	root.walkAtRules(/^media$/i, (atRule) => {
		const hasComments = atRule.raws.params?.raw;
		let mediaRule = hasComments ? hasComments : atRule.params;

		let hasFixes = false;

		mediaRule = findMediaFeatureNames(mediaRule, (mediaFeatureNameToken) => {
			const [, , startIndex, endIndex, { value: featureName }] = mediaFeatureNameToken;

			if (isCustomMediaQuery(featureName)) {
				return;
			}

			const expectedFeatureName =
					primary === 'lower' ? featureName.toLowerCase() : featureName.toUpperCase();

			if (featureName === expectedFeatureName) {
				return;
			}

			const atRuleIndex = atRuleParamIndex(atRule);

			report({
				message: messages.expected(featureName, expectedFeatureName),
				node: atRule,
				index: atRuleIndex + startIndex,
				endIndex: atRuleIndex + endIndex + 1,
				ruleName,
				result
			});
		}).stringify();

		if (hasFixes) {
			if (hasComments) {
				if (atRule.raws.params == null) {
					throw new Error('The `AtRuleRaws` node must have a `params` property');
				}

				atRule.raws.params.raw = mediaRule;
			}
			else {
				atRule.params = mediaRule;
			}
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
