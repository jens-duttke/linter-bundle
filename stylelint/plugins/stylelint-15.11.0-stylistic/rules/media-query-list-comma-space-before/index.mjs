/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import mediaQueryListCommaWhitespaceChecker from '../mediaQueryListCommaWhitespaceChecker.mjs';

const ruleName = 'plugin/media-query-list-comma-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ","',
	rejectedBefore: () => 'Unexpected whitespace before ","',
	expectedBeforeSingleLine: () => 'Expected single space before "," in a single-line list',
	rejectedBeforeSingleLine: () => 'Unexpected whitespace before "," in a single-line list'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-query-list-comma-space-before/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never', 'always-single-line', 'never-single-line']
		});

		if (!validOptions) {
			return;
		}

		/** @type {Map<import('postcss').AtRule, number[]> | undefined} */
		let fixData;

		mediaQueryListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix: (atRule, index) => {
				const parameterCommaIndex = index - atRuleParamIndex(atRule);

				fixData ||= new Map();
				const commaIndices = fixData.get(atRule) || [];

				commaIndices.push(parameterCommaIndex);
				fixData.set(atRule, commaIndices);

				return true;
			}
		});

		if (fixData) {
			for (const [atRule, commaIndices] of fixData.entries()) {
				let parameters = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

				for (const index of commaIndices.sort((a, b) => b - a)) {
					const beforeComma = parameters.slice(0, index);
					const afterComma = parameters.slice(index);

					if (primary.startsWith('always')) {
						parameters = beforeComma.replace(/\s*$/, ' ') + afterComma;
					}
					else if (primary.startsWith('never')) {
						parameters = beforeComma.replace(/\s*$/, '') + afterComma;
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
