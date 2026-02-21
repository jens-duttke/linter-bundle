// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import parseSelector from 'stylelint/lib/utils/parseSelector.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/selector-pseudo-class-parentheses-space-inside';

const messages = ruleMessages(ruleName, {
	expectedOpening: 'Expected single space after "("',
	rejectedOpening: 'Unexpected whitespace after "("',
	expectedClosing: 'Expected single space before ")"',
	rejectedClosing: 'Unexpected whitespace before ")"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-pseudo-class-parentheses-space-inside/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['always', 'never']
	});

	if (!validOptions) {
		return;
	}

	root.walkRules((ruleNode) => {
		if (!isStandardSyntaxRule(ruleNode)) {
			return;
		}

		if (!ruleNode.selector.includes('(')) {
			return;
		}

		let hasFixed = false;
		const selector = ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector;
		const selectorTree = parseSelector(selector, result, ruleNode);

		if (!selectorTree) {
			return;
		}

		selectorTree.walkPseudos((pseudoNode) => {
			if (pseudoNode.length === 0) {
				return;
			}

			const paramString = pseudoNode.map((node) => String(node)).join(',');
			const nextCharIsSpace = paramString.startsWith(' ');
			const openIndex = pseudoNode.sourceIndex + pseudoNode.value.length + 1;

			if (nextCharIsSpace && primary === 'never') {
				report({
					message: messages.rejectedOpening,
					index: openIndex,
					endIndex: openIndex,
					result,
					ruleName,
					node: ruleNode,
					fix: () => {
						hasFixed = true;
						setFirstNodeSpaceBefore(pseudoNode, '');
					}
				});
			}

			if (!nextCharIsSpace && primary === 'always') {
				report({
					message: messages.expectedOpening,
					index: openIndex,
					endIndex: openIndex,
					result,
					ruleName,
					node: ruleNode,
					fix: () => {
						hasFixed = true;
						setFirstNodeSpaceBefore(pseudoNode, ' ');
					}
				});
			}

			const previousCharIsSpace = paramString.endsWith(' ');
			const closeIndex = openIndex + paramString.length - 1;

			if (previousCharIsSpace && primary === 'never') {
				report({
					message: messages.rejectedClosing,
					index: closeIndex,
					endIndex: closeIndex,
					result,
					ruleName,
					node: ruleNode,
					fix: () => {
						hasFixed = true;
						setLastNodeSpaceAfter(pseudoNode, '');
					}
				});
			}

			if (!previousCharIsSpace && primary === 'always') {
				report({
					message: messages.expectedClosing,
					index: closeIndex,
					endIndex: closeIndex,
					result,
					ruleName,
					node: ruleNode,
					fix: () => {
						hasFixed = true;
						setLastNodeSpaceAfter(pseudoNode, ' ');
					}
				});
			}
		});

		if (hasFixed) {
			if (!ruleNode.raws.selector) {
				ruleNode.selector = selectorTree.toString();
			}
			else {
				ruleNode.raws.selector.raw = selectorTree.toString();
			}
		}
	});
};

/**
 * @param {import('postcss-selector-parser').Container} node
 * @param {string} value
 * @returns {void}
 */
function setFirstNodeSpaceBefore (node, value) {
	const target = node.first;

	if (target.type === 'selector') {
		setFirstNodeSpaceBefore(target, value);
	}
	else {
		target.spaces.before = value;
	}
}

/**
 * @param {import('postcss-selector-parser').Container} node
 * @param {string} value
 * @returns {void}
 */
function setLastNodeSpaceAfter (node, value) {
	const target = node.last;

	if (target.type === 'selector') {
		setLastNodeSpaceAfter(target, value);
	}
	else {
		target.spaces.after = value;
	}
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
