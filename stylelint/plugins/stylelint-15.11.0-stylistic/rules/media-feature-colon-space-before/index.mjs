// @ts-nocheck

import stylelint from 'stylelint';
import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import mediaFeatureColonSpaceChecker from '../mediaFeatureColonSpaceChecker.mjs';

const ruleName = 'plugin/media-feature-colon-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ":"',
	rejectedBefore: () => 'Unexpected whitespace before ":"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-feature-colon-space-before/README.md',
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

		/** @type {Map<import('postcss').AtRule, number[]> | undefined} */
		let fixData;

		mediaFeatureColonSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: (atRule, index) => {
				const parameterColonIndex = index - atRuleParamIndex(atRule);

				fixData ||= new Map();
				const colonIndices = fixData.get(atRule) || [];

				colonIndices.push(parameterColonIndex);
				fixData.set(atRule, colonIndices);

				return true;
			}
		});

		if (fixData) {
			for (const [atRule, colonIndices] of fixData.entries()) {
				let parameters = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

				for (const index of colonIndices.sort((a, b) => b - a)) {
					const beforeColon = parameters.slice(0, index);
					const afterColon = parameters.slice(index);

					if (primary === 'always') {
						parameters = beforeColon.replace(/\s*$/u, ' ') + afterColon;
					}
					else if (primary === 'never') {
						parameters = beforeColon.replace(/\s*$/u, '') + afterColon;
					}
				}

				if (atRule.raws.params) {
					atRule.raws.params.raw = parameters;
				}
				else {
					atRule.params = parameters;
				}
			}
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
