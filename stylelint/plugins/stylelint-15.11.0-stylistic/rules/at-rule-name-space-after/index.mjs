/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import atRuleNameSpaceChecker from '../atRuleNameSpaceChecker.mjs';

const ruleName = 'plugin/at-rule-name-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: (name) => `Expected single space after at-rule name "${name}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/at-rule-name-space-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondary) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-single-line']
		});

		if (!validOptions) {
			return;
		}

		atRuleNameSpaceChecker({
			root,
			result,
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			fix: (atRule) => {
				if (typeof atRule.raws.afterName === 'string') {
					atRule.raws.afterName = atRule.raws.afterName.replace(/^\s*/, ' ');
				}
			}
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
