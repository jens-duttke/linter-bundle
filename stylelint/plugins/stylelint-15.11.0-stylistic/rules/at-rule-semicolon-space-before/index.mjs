// @ts-nocheck

import stylelint from 'stylelint';
import hasBlock from 'stylelint/lib/utils/hasBlock.mjs';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule.mjs';
import rawNodeString from 'stylelint/lib/utils/rawNodeString.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/at-rule-semicolon-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ";"',
	rejectedBefore: () => 'Unexpected whitespace before ";"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/at-rule-semicolon-space-before/README.md'
};

/** @type {import('stylelint').Rule} */
const rule = (primary) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never']
		});

		if (!validOptions) {
			return;
		}

		root.walkAtRules((atRule) => {
			if (hasBlock(atRule)) {
				return;
			}

			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			const nodeString = rawNodeString(atRule);

			checker.before({
				source: nodeString,
				index: nodeString.length,
				err: (m) => {
					report({
						message: m,
						node: atRule,
						index: nodeString.length - 1,
						endIndex: nodeString.length - 1,
						result,
						ruleName
					});
				}
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
