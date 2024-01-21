/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const blockString = require('stylelint/lib/utils/blockString.cjs');
const hasBlock = require('stylelint/lib/utils/hasBlock.cjs');
const hasEmptyLine = require('stylelint/lib/utils/hasEmptyLine.cjs');
const isSingleLineString = require('stylelint/lib/utils/isSingleLineString.cjs');
const optionsMatches = require('stylelint/lib/utils/optionsMatches.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const addEmptyLineAfter = require('../../utils/addEmptyLineAfter.cjs');
const hasEmptyBlock = require('../../utils/hasEmptyBlock.cjs');
const removeEmptyLinesAfter = require('../../utils/removeEmptyLinesAfter.cjs');

const ruleName = 'plugin/block-closing-brace-empty-line-before';

const messages = ruleMessages(ruleName, {
	expected: 'Expected empty line before closing brace',
	rejected: 'Unexpected empty line before closing brace'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/block-closing-brace-empty-line-before/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(
		result,
		ruleName,
		{
			actual: primary,
			possible: ['always-multi-line', 'never']
		},
		{
			actual: secondaryOptions,
			possible: {
				except: ['after-closing-brace']
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
		// Return early if blockless or has empty block
		if (!hasBlock(statement) || hasEmptyBlock(statement)) {
			return;
		}

		// Get whitespace after ""}", ignoring extra semicolon
		const before = (statement.raws.after || '').replace(/;+/, '');

		// Calculate index
		const statementString = statement.toString();
		let index = statementString.length - 1;

		if (statementString[index - 1] === '\r') {
			index -= 1;
		}

		// Set expectation
		const expectEmptyLineBefore = (() => {
			const childNodeTypes = statement.nodes.map((item) => item.type);

			// Reverse the primary options if `after-closing-brace` is set
			if (
				optionsMatches(secondaryOptions, 'except', 'after-closing-brace') &&
					statement.type === 'atrule' &&
					!childNodeTypes.includes('decl')
			) {
				return primary === 'never';
			}

			return primary === 'always-multi-line' && !isSingleLineString(blockString(statement));
		})();

		// Check for at least one empty line
		const hasEmptyLineBefore = hasEmptyLine(before);

		// Return if the expectation is met
		if (expectEmptyLineBefore === hasEmptyLineBefore) {
			return;
		}

		if (context.fix) {
			const { newline } = context;

			if (typeof newline !== 'string') { return; }

			if (expectEmptyLineBefore) {
				addEmptyLineAfter(statement, newline);
			}
			else {
				removeEmptyLinesAfter(statement, newline);
			}

			return;
		}

		const message = expectEmptyLineBefore ? messages.expected : messages.rejected;

		report({
			message,
			result,
			ruleName,
			node: statement,
			index
		});
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
