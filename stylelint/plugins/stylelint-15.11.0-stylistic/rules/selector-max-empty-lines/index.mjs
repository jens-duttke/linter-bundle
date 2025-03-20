/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import{ isNumber } from 'stylelint/lib/utils/validateTypes.mjs';

const ruleName = 'plugin/selector-max-empty-lines';

const messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} empty ${max === 1 ? 'line' : 'lines'}`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-max-empty-lines/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => {
	const maxAdjacentNewlines = primary + 1;

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: isNumber
		});

		if (!validOptions) {
			return;
		}

		const violatedCRLFNewLinesRegex = new RegExp(`(?:\r\n){${maxAdjacentNewlines + 1},}`);
		const violatedLFNewLinesRegex = new RegExp(`\n{${maxAdjacentNewlines + 1},}`);
		const allowedLFNewLinesString = '\n'.repeat(maxAdjacentNewlines);
		const allowedCRLFNewLinesString = '\r\n'.repeat(maxAdjacentNewlines);

		root.walkRules((ruleNode) => {
			const selector = ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector;

			if (
				violatedLFNewLinesRegex.test(selector) ||
				violatedCRLFNewLinesRegex.test(selector)
			) {
				report({
					message: messages.expected(primary),
					node: ruleNode,
					index: 0,
					endIndex: 0,
					result,
					ruleName,
					fix: () => {
						const newSelectorString = selector
							.replace(new RegExp(violatedLFNewLinesRegex, 'gm'), allowedLFNewLinesString)
							.replace(new RegExp(violatedCRLFNewLinesRegex, 'gm'), allowedCRLFNewLinesString);

						if (ruleNode.raws.selector) {
							ruleNode.raws.selector.raw = newSelectorString;
						}
						else {
							ruleNode.selector = newSelectorString;
						}
					}
				});
			}
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
