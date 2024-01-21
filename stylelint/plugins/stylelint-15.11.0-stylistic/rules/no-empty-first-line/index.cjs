/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const ruleName = 'plugin/no-empty-first-line';
const noEmptyFirstLineTest = /^\s*[\n\r]/;

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected empty line'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/no-empty-first-line/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, { actual: primary });

	// @ts-expect-error -- TS2339: Property 'inline' does not exist on type 'Source'. Property 'lang' does not exist on type 'Source'.
	if (!validOptions || root.source.inline || root.source.lang === 'object-literal') {
		return;
	}

	const rootString = context.fix ? root.toString() : (root.source?.input.css) || '';

	if (!rootString.trim()) {
		return;
	}

	if (noEmptyFirstLineTest.test(rootString)) {
		if (context.fix) {
			if (root.first == null) {
				throw new Error('The root node must have the first node.');
			}

			if (root.first.raws.before == null) {
				throw new Error('The first node must have spaces before.');
			}

			root.first.raws.before = root.first.raws.before.trimStart();

			return;
		}

		report({
			message: messages.rejected,
			node: root,
			result,
			ruleName
		});
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
