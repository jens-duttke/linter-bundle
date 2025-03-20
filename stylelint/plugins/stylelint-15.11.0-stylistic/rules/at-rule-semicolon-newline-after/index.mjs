/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import hasBlock from 'stylelint/lib/utils/hasBlock.mjs';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule.mjs';
import rawNodeString from 'stylelint/lib/utils/rawNodeString.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import nextNonCommentNode from '../../utils/nextNonCommentNode.mjs';
import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/at-rule-semicolon-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ";"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/at-rule-semicolon-newline-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondary) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always']
		});

		if (!validOptions) {
			return;
		}

		root.walkAtRules((atRule) => {
			const nextNode = atRule.next();

			if (!nextNode) {
				return;
			}

			if (hasBlock(atRule)) {
				return;
			}

			if (!isStandardSyntaxAtRule(atRule)) {
				return;
			}

			// Allow an end-of-line comment
			const nodeToCheck = nextNonCommentNode(nextNode);

			if (!nodeToCheck) {
				return;
			}

			checker.afterOneOnly({
				source: rawNodeString(nodeToCheck),
				index: -1,
				err: (message) => {
					report({
						message,
						node: atRule,
						index: atRule.toString().length + 1,
						endIndex: atRule.toString().length + 1,
						result,
						ruleName,
						fix: () => {
							nodeToCheck.raws.before = '\n' + nodeToCheck.raws.before;
						}
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
