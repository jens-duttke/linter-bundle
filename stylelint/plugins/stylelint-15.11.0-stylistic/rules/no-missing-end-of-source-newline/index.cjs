/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const ruleName = 'plugin/no-missing-end-of-source-newline';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected missing end-of-source newline'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/no-missing-end-of-source-newline/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, { actual: primary });

	if (!validOptions) {
		return;
	}

	if (root.source == null) {
		throw new Error('The root node must have a source property');
	}

	// @ts-expect-error -- TS2339: Property 'inline' does not exist on type 'Source'.
	if (root.source.inline || root.source.lang === 'object-literal') {
		return;
	}

	const rootString = context.fix ? root.toString() : root.source.input.css;

	if (!rootString.trim() || rootString.endsWith('\n')) {
		return;
	}

	// Fix
	if (context.fix) {
		root.raws.after = context.newline;

		return;
	}

	report({
		message: messages.rejected,
		node: root,
		index: rootString.length - 1,
		result,
		ruleName
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
