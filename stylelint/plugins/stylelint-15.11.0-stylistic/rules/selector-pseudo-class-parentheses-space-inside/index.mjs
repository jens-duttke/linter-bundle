/* eslint-disable -- We want to keep as much of the original code as possible */
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
const rule = (primary, _secondaryOptions, context) => (root, result) => {
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
		const fixedSelector = parseSelector(selector, result, ruleNode, (selectorTree) => {
			selectorTree.walkPseudos((pseudoNode) => {
				if (pseudoNode.length === 0) {
					return;
				}

				const paramString = pseudoNode.map((node) => String(node)).join(',');
				const nextCharIsSpace = paramString.startsWith(' ');
				const openIndex = pseudoNode.sourceIndex + pseudoNode.value.length + 1;

				if (nextCharIsSpace && primary === 'never') {
					if (context.fix) {
						hasFixed = true;
						setFirstNodeSpaceBefore(pseudoNode, '');
					}
					else {
						complain(messages.rejectedOpening, openIndex);
					}
				}

				if (!nextCharIsSpace && primary === 'always') {
					if (context.fix) {
						hasFixed = true;
						setFirstNodeSpaceBefore(pseudoNode, ' ');
					}
					else {
						complain(messages.expectedOpening, openIndex);
					}
				}

				const previousCharIsSpace = paramString.endsWith(' ');
				const closeIndex = openIndex + paramString.length - 1;

				if (previousCharIsSpace && primary === 'never') {
					if (context.fix) {
						hasFixed = true;
						setLastNodeSpaceAfter(pseudoNode, '');
					}
					else {
						complain(messages.rejectedClosing, closeIndex);
					}
				}

				if (!previousCharIsSpace && primary === 'always') {
					if (context.fix) {
						hasFixed = true;
						setLastNodeSpaceAfter(pseudoNode, ' ');
					}
					else {
						complain(messages.expectedClosing, closeIndex);
					}
				}
			});
		});

		if (hasFixed && fixedSelector) {
			if (!ruleNode.raws.selector) {
				ruleNode.selector = fixedSelector;
			}
			else {
				ruleNode.raws.selector.raw = fixedSelector;
			}
		}

		/**
		 * @param {string} message
		 * @param {number} index
		 */
		function complain (message, index) {
			report({
				message,
				index,
				endIndex: index,
				result,
				ruleName,
				node: ruleNode
			});
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
