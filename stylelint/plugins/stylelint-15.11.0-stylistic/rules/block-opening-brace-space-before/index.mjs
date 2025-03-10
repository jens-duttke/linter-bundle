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
import { isRegExp, isString } from  'stylelint/lib/utils/validateTypes.mjs';

import hasEmptyBlock from '../../utils/hasEmptyBlock.mjs';
import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/block-opening-brace-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before "{"',
	rejectedBefore: () => 'Unexpected whitespace before "{"',
	expectedBeforeSingleLine: () => 'Expected single space before "{" of a single-line block',
	rejectedBeforeSingleLine: () => 'Unexpected whitespace before "{" of a single-line block',
	expectedBeforeMultiLine: () => 'Expected single space before "{" of a multi-line block',
	rejectedBeforeMultiLine: () => 'Unexpected whitespace before "{" of a multi-line block'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/block-opening-brace-space-before/README.md',
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
					ignoreAtRules: [isString, isRegExp],
					ignoreSelectors: [isString, isRegExp]
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
			// Return early if blockless or has an empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) {
				return;
			}

			// Return early if at-rule is to be ignored
			if (
				statement.type === 'atrule' &&
				optionsMatches(secondaryOptions, 'ignoreAtRules', statement.name)
			) {
				return;
			}

			// Return early if selector is to be ignored
			if (
				statement.type === 'rule' &&
				optionsMatches(secondaryOptions, 'ignoreSelectors', statement.selector)
			) {
				return;
			}

			const source = beforeBlockString(statement);
			const beforeBraceNoRaw = beforeBlockString(statement, {
				noRawBefore: true
			});

			let index = beforeBraceNoRaw.length - 1;

			if (beforeBraceNoRaw[index - 1] === '\r') {
				index -= 1;
			}

			checker.before({
				source,
				index: source.length,
				lineCheckStr: blockString(statement),
				err: (m) => {
					report({
						message: m,
						node: statement,
						index,
						endIndex: index,
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
