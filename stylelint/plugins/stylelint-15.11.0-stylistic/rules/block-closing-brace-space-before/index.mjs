/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import blockString from 'stylelint/lib/utils/blockString.mjs';
import hasBlock from 'stylelint/lib/utils/hasBlock.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import hasEmptyBlock from '../../utils/hasEmptyBlock.mjs';
import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/block-closing-brace-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before "}"',
	rejectedBefore: () => 'Unexpected whitespace before "}"',
	expectedBeforeSingleLine: () => 'Expected single space before "}" of a single-line block',
	rejectedBeforeSingleLine: () => 'Unexpected whitespace before "}" of a single-line block',
	expectedBeforeMultiLine: () => 'Expected single space before "}" of a multi-line block',
	rejectedBeforeMultiLine: () => 'Unexpected whitespace before "}" of a multi-line block'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/block-closing-brace-space-before/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: [
				'always',
				'never',
				'always-single-line',
				'never-single-line',
				'always-multi-line',
				'never-multi-line'
			]
		});

		if (!validOptions) {
			return;
		}

		// Check both kinds of statement: rules and at-rules
		root.walkRules(check);
		root.walkAtRules(check);

		/**
		 * @param {import('postcss').Rule | import('postcss').AtRule} statement
		 */
		function check (statement) {
			// Return early if blockless or has empty block
			if (!hasBlock(statement) || hasEmptyBlock(statement)) {
				return;
			}

			const source = blockString(statement);
			const statementString = statement.toString();

			let index = statementString.length - 2;

			if (statementString[index - 1] === '\r') {
				index -= 1;
			}

			checker.before({
				source,
				index: source.length - 1,
				err: (message) => {
					report({
						message,
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
