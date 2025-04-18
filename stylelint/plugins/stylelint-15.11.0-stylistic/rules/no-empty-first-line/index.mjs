// @ts-nocheck

import stylelint from 'stylelint';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/no-empty-first-line';
const noEmptyFirstLineTest = /^\s*[\n\r]/u;

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected empty line'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/no-empty-first-line/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, { actual: primary });

	// @ts-expect-error -- TS2339: Property 'inline' does not exist on type 'Source'. Property 'lang' does not exist on type 'Source'.
	if (!validOptions || root.source.inline || root.source.lang === 'object-literal') {
		return;
	}

	const rootString = root.toString();

	if (!rootString.trim()) {
		return;
	}

	if (noEmptyFirstLineTest.test(rootString)) {
		report({
			message: messages.rejected,
			node: root,
			result,
			ruleName,
			fix: () => {
				if (root.first == null) {
					throw new Error('The root node must have the first node.');
				}

				if (root.first.raws.before == null) {
					throw new Error('The first node must have spaces before.');
				}

				root.first.raws.before = root.first.raws.before.trimStart();
			}
		});
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
