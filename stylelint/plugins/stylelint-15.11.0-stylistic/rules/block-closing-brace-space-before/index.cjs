/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const blockString = require('stylelint/lib/utils/blockString.cjs');
const hasBlock = require('stylelint/lib/utils/hasBlock.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const hasEmptyBlock = require('../../utils/hasEmptyBlock.cjs');
const whitespaceChecker = require('../../utils/whitespaceChecker.cjs');

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
					if (context.fix) {
						const statementRaws = statement.raws;

						if (typeof statementRaws.after !== 'string') { return; }

						if (primary.startsWith('always')) {
							statementRaws.after = statementRaws.after.replace(/\s*$/, ' ');

							return;
						}

						if (primary.startsWith('never')) {
							statementRaws.after = statementRaws.after.replace(/\s*$/, '');

							return;
						}
					}

					report({
						message,
						node: statement,
						index,
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
module.exports = stylelint.createPlugin(ruleName, rule);
