/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const hasBlock = require('stylelint/lib/utils/hasBlock.cjs');
const isStandardSyntaxAtRule = require('stylelint/lib/utils/isStandardSyntaxAtRule.cjs');
const rawNodeString = require('stylelint/lib/utils/rawNodeString.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const nextNonCommentNode = require('../../utils/nextNonCommentNode.cjs');
const whitespaceChecker = require('../../utils/whitespaceChecker.cjs');

const ruleName = 'plugin/at-rule-semicolon-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ";"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/at-rule-semicolon-newline-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondary, context) => {
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
					if (context.fix) {
						nodeToCheck.raws.before = context.newline + nodeToCheck.raws.before;
					}
					else {
						report({
							message,
							node: atRule,
							index: atRule.toString().length + 1,
							result,
							ruleName
						});
					}
				}
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
