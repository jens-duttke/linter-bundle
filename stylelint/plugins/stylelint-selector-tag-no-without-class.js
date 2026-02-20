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
function rule (primaryOption, secondaryOptions = {}) {
	// @ts-expect-error -- Parameter 'root' implicitly has an 'any' type. / Parameter 'result' implicitly has an 'any' type.
	return (root, result) => {
		const validOptions = stylelint.utils.validateOptions(
			result,
			ruleName,
			{
				actual: primaryOption,
				possible: [(string) => (typeof string === 'string' || Object.prototype.toString.call(string) === '[object String]')]
			},
			{
				actual: secondaryOptions,
				possible: {
					allowCombinators: [' ', '+', '>', '~', '||']
				},
				optional: true
			}
		);

		if (!validOptions) {
			return;
		}

		/** @type {{ allowCombinators?: string | string[] }} */
		const typedSecondaryOptions = secondaryOptions;
		const allowCombinatorsOption = typedSecondaryOptions.allowCombinators;
		const allowCombinatorValues = allowCombinatorsOption === undefined ? [] : (Array.isArray(allowCombinatorsOption) ? allowCombinatorsOption : [allowCombinatorsOption]);
		/** @type {string[]} */
		const normalizedAllowedCombinators = [];
		for (const combinator of allowCombinatorValues) {
			if (combinator.length === 0) {
				continue;
			}

			normalizedAllowedCombinators.push(normalizeCombinatorValue(combinator));
		}

		const allowedCombinators = new Set(normalizedAllowedCombinators);

		/**
		 * @param {string | undefined} value
		 * @returns {string}
		 */
		function normalizeCombinatorValue (value) {
			if (typeof value !== 'string') {
				return '';
			}

			return value.trim() === '' ? ' ' : value.trim();
		}

		/**
		 * @param {import('postcss-selector-parser').Selector} selectorNode
		 */
		function splitSelectorIntoSegments (selectorNode) {
			/** @type {{ nodes: import('postcss-selector-parser').Node[], leadingCombinator?: string }[]} */
			const segments = [];
			/** @type {import('postcss-selector-parser').Node[]} */
			let currentSegment = [];
			/** @type {string | undefined} */
			let leadingCombinator;

			function pushCurrentSegment () {
				if (currentSegment.length === 0) {
					return;
				}

				const segmentNodes = currentSegment;
				currentSegment = [];

				/** @type {{ nodes: import('postcss-selector-parser').Node[], leadingCombinator?: string }} */
				const segment = { nodes: segmentNodes };

				if (leadingCombinator !== undefined) {
					segment.leadingCombinator = leadingCombinator;
					leadingCombinator = undefined;
				}

				segments.push(segment);
			}

			selectorNode.each((/** @type {import('postcss-selector-parser').Node} */ child) => {
				if (child.type === 'combinator') {
					pushCurrentSegment();
					leadingCombinator = normalizeCombinatorValue(child.value);

					return;
				}

				currentSegment.push(child);
			});

			pushCurrentSegment();

			return segments;
		}

		/**
		 * @param {string | undefined} leadingCombinator
		 */
		function shouldIgnoreSegment (leadingCombinator) {
			if (!leadingCombinator || allowedCombinators.size === 0) {
				return false;
			}

			return allowedCombinators.has(leadingCombinator);
		}

		// @ts-expect-error -- Parameter 'selectorNode' implicitly has an 'any' type. / Parameter 'ruleNode' implicitly has an 'any' type.
		function checkSelector (selectorNode, ruleNode) {
			const segments = splitSelectorIntoSegments(selectorNode);

			for (const segment of segments) {
				let unqualifiedTagNode;
				for (const node of segment.nodes) {
					if (node.type === 'tag' && matchesStringOrRegExp(node.value, primaryOption)) {
						unqualifiedTagNode = node;
					}
					if (node.type === 'class') {
						unqualifiedTagNode = void 0;
					}
				}

				if (unqualifiedTagNode && !shouldIgnoreSegment(segment.leadingCombinator)) {
					stylelint.utils.report({
						ruleName,
						result,
						node: ruleNode,
						message: messages.unexpected(unqualifiedTagNode.value),
						word: unqualifiedTagNode.value
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
				const container = parseSelector(selector, result, ruleNode);

				if (container) {
					checkSelectorRoot(container, ruleNode);
				}
			}
		});
	};
}

rule.primaryOptionArray = true;
rule.ruleName = ruleName;
rule.messages = messages;

export default stylelint.createPlugin(ruleName, rule);
