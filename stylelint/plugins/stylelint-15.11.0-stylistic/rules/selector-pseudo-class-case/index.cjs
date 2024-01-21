/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule.cjs');
const isStandardSyntaxSelector = require('stylelint/lib/utils/isStandardSyntaxSelector.cjs');
const parseSelector = require('stylelint/lib/utils/parseSelector.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const { levelOneAndTwoPseudoElements } = require('../../reference/selectors.cjs');

const ruleName = 'plugin/selector-pseudo-class-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-pseudo-class-case/README.md',
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

		const fixedSelector = parseSelector(
				ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector,
				result,
				ruleNode,
				(selectorTree) => {
					selectorTree.walkPseudos((pseudoNode) => {
						const pseudo = pseudoNode.value;

						if (!isStandardSyntaxSelector(pseudo)) {
							return;
						}

						if (
							pseudo.includes('::') ||
							levelOneAndTwoPseudoElements.has(pseudo.toLowerCase().slice(1))
						) {
							return;
						}

						const expectedPseudo =
							primary === 'lower' ? pseudo.toLowerCase() : pseudo.toUpperCase();

						if (pseudo === expectedPseudo) {
							return;
						}

						if (context.fix) {
							pseudoNode.value = expectedPseudo;

							return;
						}

						report({
							message: messages.expected(pseudo, expectedPseudo),
							node: ruleNode,
							index: pseudoNode.sourceIndex,
							ruleName,
							result
						});
					});
				}
		);

		if (context.fix && fixedSelector) {
			if (ruleNode.raws.selector) {
				ruleNode.raws.selector.raw = fixedSelector;
			}
			else {
				ruleNode.selector = fixedSelector;
			}
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
