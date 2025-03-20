/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/at-rule-name-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/at-rule-name-case/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondary) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['lower', 'upper']
	});

	if (!validOptions) {
		return;
	}

	/** @type {'lower' | 'upper'} */
	const expectation = primary;

	root.walkAtRules((atRule) => {
		if (!isStandardSyntaxAtRule(atRule)) {
			return;
		}

		const name = atRule.name;
		const expectedName = expectation === 'lower' ? name.toLowerCase() : name.toUpperCase();

		if (name === expectedName) {
			return;
		}

		report({
			message: messages.expected(name, expectedName),
			node: atRule,
			ruleName,
			result,
			fix: () => {
				atRule.name = expectedName;
			}
		});
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
