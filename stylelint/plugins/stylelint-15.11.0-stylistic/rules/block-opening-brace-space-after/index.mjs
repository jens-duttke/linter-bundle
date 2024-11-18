/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import beforeBlockString from 'stylelint/lib/utils/beforeBlockString.mjs';
import blockString from 'stylelint/lib/utils/blockString.mjs';
import hasBlock from 'stylelint/lib/utils/hasBlock.mjs';
import optionsMatches from 'stylelint/lib/utils/optionsMatches.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import hasEmptyBlock from '../../utils/hasEmptyBlock.mjs';
import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/block-opening-brace-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after "{"',
	rejectedAfter: () => 'Unexpected whitespace after "{"',
	expectedAfterSingleLine: () => 'Expected single space after "{" of a single-line block',
	rejectedAfterSingleLine: () => 'Unexpected whitespace after "{" of a single-line block',
	expectedAfterMultiLine: () => 'Expected single space after "{" of a multi-line block',
	rejectedAfterMultiLine: () => 'Unexpected whitespace after "{" of a multi-line block'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/block-opening-brace-space-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: [
					'always',
					'never',
					'always-single-line',
					'never-single-line',
					'always-multi-line',
					'never-multi-line'
				]
			},
			{
				actual: secondaryOptions,
				possible: {
					ignore: ['at-rules']
				},
				optional: true
			}
		);

		if (!validOptions) {
			return;
		}

		// Check both kinds of statements: rules and at-rules
		root.walkRules(check);

		if (!optionsMatches(secondaryOptions, 'ignore', 'at-rules')) {
			root.walkAtRules(check);
		}

		/**
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement
		 */
		function check (statement) {
			// Return early if blockless or has an empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) {
				return;
			}

			checker.after({
				source: blockString(statement),
				index: 0,
				err: (m) => {
					report({
						message: m,
						node: statement,
						index: beforeBlockString(statement, { noRawBefore: true }).length + 1,
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
