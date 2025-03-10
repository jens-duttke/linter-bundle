/* eslint-disable -- We want to keep as much of the original code as possible */

/**
 * @file Fork of `stylelint-selector-tag-no-without-class` rule.
 *
 * @license MIT
 *
 * @see https://github.com/Moxio/stylelint-selector-tag-no-without-class
 */

import stylelint from 'stylelint';
// @ts-expect-error -- No declaration file.
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
// @ts-expect-error -- No declaration file.
import isStandardSyntaxSelector from 'stylelint/lib/utils/isStandardSyntaxSelector.mjs';
// @ts-expect-error -- No declaration file.
import matchesStringOrRegExp from 'stylelint/lib/utils/matchesStringOrRegExp.mjs';
// @ts-expect-error -- No declaration file.
import parseSelector from 'stylelint/lib/utils/parseSelector.mjs';

const ruleName = 'plugin/selector-tag-no-without-class';
const messages = stylelint.utils.ruleMessages(ruleName, {
	unexpected: (tagName) => `Unexpected tag ${tagName} without class qualifier`
});

// @ts-expect-error -- Parameter 'primaryOption' implicitly has an 'any' type.
function rule (primaryOption) {
	// @ts-expect-error -- Parameter 'root' implicitly has an 'any' type. / Parameter 'result' implicitly has an 'any' type.
	return (root, result) => {
		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: primaryOption,
			possible: [(string) => (typeof string === 'string' || Object.prototype.toString.call(string) === '[object String]')]
		});

		if (!validOptions) {
			return;
		}

		// @ts-expect-error -- Parameter 'selectorNode' implicitly has an 'any' type. / Parameter 'ruleNode' implicitly has an 'any' type.
		function checkSelector (selectorNode, ruleNode) {
			// @ts-expect-error -- Parameter 'node' implicitly has an 'any' type.
			const combinedSegments = selectorNode.split((node) => (node.type === 'combinator'));

			for (const segment of combinedSegments) {
				let unqualifiedTagNode;
				for (const node of segment) {
					if (node.type === 'tag' && matchesStringOrRegExp(node.value, primaryOption)) {
						unqualifiedTagNode = node;
					}
					if (node.type === 'class') {
						unqualifiedTagNode = void 0;
					}
				}

				if (unqualifiedTagNode) {
					stylelint.utils.report({
						ruleName,
						result,
						node: ruleNode,
						message: messages.unexpected(unqualifiedTagNode.value),
						word: unqualifiedTagNode
					});
				}
			}
		}

		// @ts-expect-error -- Parameter 'ruleNode' implicitly has an 'any' type.
		function checkSelectorRoot (selectorRootNode, ruleNode) {
			// @ts-expect-error -- Parameter 'selectorNode' implicitly has an 'any' type.
			selectorRootNode.each((selectorNode) => {
				checkSelector(selectorNode, ruleNode);
			});
		}

		// @ts-expect-error -- Parameter 'ruleNode' implicitly has an 'any' type.
		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			if (!isStandardSyntaxSelector(ruleNode.selector)) {
				return;
			}

			// @ts-expect-error -- Parameter 'node' implicitly has an 'any' type.
			if (ruleNode.nodes.some((node) => ['rule', 'atrule'].includes(node.type))) {
				// Skip unresolved nested selectors
				return;
			}

			if (ruleNode.parent && ruleNode.parent.type === 'atrule' && ruleNode.parent.name === 'keyframes') {
				// Skip rules within an @keyframes at-rule
				// (https://github.com/Moxio/stylelint-selector-tag-no-without-class/issues/5)
				return;
			}

			for (const selector of ruleNode.selectors) {
				// @ts-expect-error -- Parameter 'container' implicitly has an 'any' type.
				parseSelector(selector, result, ruleNode, (container) => {
					checkSelectorRoot(container, ruleNode);
				});
			}
		});
	};
}

rule.primaryOptionArray = true;
rule.ruleName = ruleName;
rule.messages = messages;

export default stylelint.createPlugin(ruleName, rule);
