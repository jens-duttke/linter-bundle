/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule.cjs');
const isStandardSyntaxSelector = require('stylelint/lib/utils/isStandardSyntaxSelector.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const transformSelector = require('stylelint/lib/utils/transformSelector.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const { levelOneAndTwoPseudoElements } = require('../../reference/selectors.cjs');

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

				if (context.fix) {
					pseudoNode.value = expectedPseudoElement;

					return;
				}

				report({
					message: messages.expected(pseudoElement, expectedPseudoElement),
					node: ruleNode,
					index: pseudoNode.sourceIndex,
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
module.exports = stylelint.createPlugin(ruleName, rule);
