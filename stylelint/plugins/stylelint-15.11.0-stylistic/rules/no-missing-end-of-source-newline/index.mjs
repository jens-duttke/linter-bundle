/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

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

	const rootString = root.source.input.css;

	if (!rootString.trim() || rootString.endsWith('\n')) {
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
export default stylelint.createPlugin(ruleName, rule);
