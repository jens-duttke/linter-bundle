// @ts-nocheck

import stylelint from 'stylelint';
import blockString from 'stylelint/lib/utils/blockString.mjs';
import hasBlock from 'stylelint/lib/utils/hasBlock.mjs';
import optionsMatches from 'stylelint/lib/utils/optionsMatches.mjs';
import rawNodeString from 'stylelint/lib/utils/rawNodeString.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import { isString } from 'stylelint/lib/utils/validateTypes.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/block-closing-brace-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after "}"',
	expectedAfterSingleLine: () => 'Expected newline after "}" of a single-line block',
	rejectedAfterSingleLine: () => 'Unexpected whitespace after "}" of a single-line block',
	expectedAfterMultiLine: () => 'Expected newline after "}" of a multi-line block',
	rejectedAfterMultiLine: () => 'Unexpected whitespace after "}" of a multi-line block'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/block-closing-brace-newline-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: [
					'always',
					'always-single-line',
					'never-single-line',
					'always-multi-line',
					'never-multi-line'
				]
			},
			{
				actual: secondaryOptions,
				possible: {
					ignoreAtRules: [isString]
				},
				optional: true
			}
		);

		if (!validOptions) {
			return;
		}

		// Check both kinds of statements: rules and at-rules
		root.walkRules(check);
		root.walkAtRules(check);

		/**
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement
		 */
		function check (statement) {
			if (!hasBlock(statement)) {
				return;
			}

			if (
				statement.type === 'atrule' &&
				optionsMatches(secondaryOptions, 'ignoreAtRules', statement.name)
			) {
				return;
			}

			const nextNode = statement.next();

			if (!nextNode) {
				return;
			}

			// Allow an end-of-line comment x spaces after the brace
			const nextNodeIsSingleLineComment =
				nextNode.type === 'comment' &&
				!(/[^ ]/).test(nextNode.raws.before || '') &&
				!nextNode.toString().includes('\n');

			const nodeToCheck = nextNodeIsSingleLineComment ? nextNode.next() : nextNode;

			if (!nodeToCheck) {
				return;
			}

			let reportIndex = statement.toString().length;
			let source = rawNodeString(nodeToCheck);

			// Skip a semicolon at the beginning, if any
			if (source?.startsWith(';')) {
				source = source.slice(1);
				reportIndex++;
			}

			// Only check one after, because there might be other
			// spaces handled by the indentation rule
			checker.afterOneOnly({
				source,
				index: -1,
				lineCheckStr: blockString(statement),
				err: (message) => {
					report({
						message,
						node: statement,
						index: reportIndex,
						result,
						ruleName
					});
				}
			});
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
