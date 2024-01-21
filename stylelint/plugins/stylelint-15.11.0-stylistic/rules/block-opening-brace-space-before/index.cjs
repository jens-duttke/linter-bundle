/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const beforeBlockString = require('stylelint/lib/utils/beforeBlockString.cjs');
const blockString = require('stylelint/lib/utils/blockString.cjs');
const hasBlock = require('stylelint/lib/utils/hasBlock.cjs');
const optionsMatches = require('stylelint/lib/utils/optionsMatches.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');
const { isRegExp, isString } = require('stylelint/lib/utils/validateTypes.cjs');

const hasEmptyBlock = require('../../utils/hasEmptyBlock.cjs');
const whitespaceChecker = require('../../utils/whitespaceChecker.cjs');

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
					if (context.fix) {
						if (primary.startsWith('always')) {
							statement.raws.between = ' ';

							return;
						}

						if (primary.startsWith('never')) {
							statement.raws.between = '';

							return;
						}
					}

					report({
						message: m,
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
