/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import isStandardSyntaxSelector from 'stylelint/lib/utils/isStandardSyntaxSelector.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import transformSelector from '../../utils/transformSelector.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import { levelOneAndTwoPseudoElements } from '../../reference/selectors.mjs';

const ruleName = 'plugin/selector-pseudo-element-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-pseudo-element-case/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['lower', 'upper']
	});

	if (!validOptions) {
		return;
	}

	root.walkRules((ruleNode) => {
		if (!isStandardSyntaxRule(ruleNode)) {
			return;
		}

		const selector = ruleNode.selector;

		if (!selector.includes(':')) {
			return;
		}

		transformSelector(result, ruleNode, (selectorTree) => {
			selectorTree.walkPseudos((pseudoNode) => {
				const pseudoElement = pseudoNode.value;

				if (!isStandardSyntaxSelector(pseudoElement)) {
					return;
				}

				if (
					!pseudoElement.includes('::') &&
						!levelOneAndTwoPseudoElements.has(pseudoElement.toLowerCase().slice(1))
				) {
					return;
				}

				const expectedPseudoElement =
						primary === 'lower' ? pseudoElement.toLowerCase() : pseudoElement.toUpperCase();

				if (pseudoElement === expectedPseudoElement) {
					return;
				}

				report({
					message: messages.expected(pseudoElement, expectedPseudoElement),
					node: ruleNode,
					index: pseudoNode.sourceIndex,
					endIndex: pseudoNode.sourceIndex,
					ruleName,
					result
				});
			});
		});
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
