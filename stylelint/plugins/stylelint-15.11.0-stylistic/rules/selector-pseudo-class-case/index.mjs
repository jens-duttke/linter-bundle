/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import isStandardSyntaxSelector from 'stylelint/lib/utils/isStandardSyntaxSelector.mjs';
import parseSelector from 'stylelint/lib/utils/parseSelector.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import { levelOneAndTwoPseudoElements } from '../../reference/selectors.mjs';

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
							endIndex: pseudoNode.sourceIndex,
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
export default stylelint.createPlugin(ruleName, rule);
