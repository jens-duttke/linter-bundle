// @ts-nocheck

import stylelint from 'stylelint';
import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import mediaQueryListCommaWhitespaceChecker from '../mediaQueryListCommaWhitespaceChecker.mjs';

const ruleName = 'plugin/media-query-list-comma-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ","',
	expectedAfterMultiLine: () => 'Expected newline after "," in a multi-line list',
	rejectedAfterMultiLine: () => 'Unexpected whitespace after "," in a multi-line list'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-query-list-comma-newline-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-multi-line', 'never-multi-line']
		});

		if (!validOptions) {
			return;
		}

		// Only check for the newline after the comma, while allowing
		// arbitrary indentation after the newline
		/** @type {Map<import('postcss').AtRule, number[]> | undefined} */
		let fixData;

		mediaQueryListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.afterOneOnly,
			checkedRuleName: ruleName,
			allowTrailingComments: primary.startsWith('always'),
			fix:
				(atRule, index) => {
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
					const beforeComma = parameters.slice(0, index + 1);
					const afterComma = parameters.slice(index + 1);

					if (primary.startsWith('always')) {
						parameters = (/^\s*\n/).test(afterComma) ?
							beforeComma + afterComma.replace(/^[^\S\n\r]*/, '')
							: beforeComma + context.newline + afterComma;
					}
					else if (primary.startsWith('never')) {
						parameters = beforeComma + afterComma.replace(/^\s*/, '');
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
