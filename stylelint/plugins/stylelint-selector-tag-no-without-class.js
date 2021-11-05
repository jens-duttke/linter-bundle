/**
 * @file Fork of `stylelint-selector-tag-no-without-class` rule.
 *
 * @see https://github.com/Moxio/stylelint-selector-tag-no-without-class
 */

/* eslint-disable jsdoc/require-jsdoc -- Unfortunately, this is not given in the original code. */

// @ts-expect-error -- No declaration file.
const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule');
// @ts-expect-error -- No declaration file.
const isStandardSyntaxSelector = require('stylelint/lib/utils/isStandardSyntaxSelector');
// @ts-expect-error -- No declaration file.
const matchesStringOrRegExp = require('stylelint/lib/utils/matchesStringOrRegExp');
// @ts-expect-error -- No declaration file.
const parseSelector = require('stylelint/lib/utils/parseSelector');

const stylelint = require('stylelint');

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

module.exports = stylelint.createPlugin(ruleName, rule);
