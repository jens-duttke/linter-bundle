// @ts-nocheck

import isStandardSyntaxCombinator from 'stylelint/lib/utils/isStandardSyntaxCombinator.mjs';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import parseSelector from 'stylelint/lib/utils/parseSelector.mjs';
import report from 'stylelint/lib/utils/report.mjs';

/**
 * @typedef {(args: { source: string, index: number, errTarget: string, err: (message: string) => void }) => void} LocationChecker
 * @param - - {{
 * root: import('postcss').Root,
 * result: import('stylelint').PostcssResult,
 * locationChecker: LocationChecker,
 * locationType: 'before' | 'after',
 * checkedRuleName: string,
 * fix: ((combinator: import('postcss-selector-parser').Combinator) => boolean) | null,
 * @param options-
 * @param options-
 * @param options-
 * @param options-
 * @param options-
 * @param options-
 * @param options
 * }} opts
 * @returns {void}
 */
export default function selectorCombinatorSpaceChecker (options) {
	let hasFixed;

	options.root.walkRules((rule) => {
		if (!isStandardSyntaxRule(rule)) {
			return;
		}

		hasFixed = false;
		const selector = rule.raws.selector ? rule.raws.selector.raw : rule.selector;

		const fixedSelector = parseSelector(selector, options.result, rule, (selectorTree) => {
			selectorTree.walkCombinators((node) => {
				// Ignore non-standard combinators
				if (!isStandardSyntaxCombinator(node)) {
					return;
				}

				// Ignore spaced descendant combinator
				if ((/\s/).test(node.value)) {
					return;
				}

				// Check the exist of node in prev of the combinator.
				// in case some that aren't the first begin with combinators (nesting syntax)
				if (options.locationType === 'before' && !node.prev()) {
					return;
				}

				const parentParentNode = node.parent?.parent;

				// Ignore pseudo-classes selector like `.foo:nth-child(2n + 1) {}`
				if (parentParentNode && parentParentNode.type === 'pseudo') {
					return;
				}

				const sourceIndex = node.sourceIndex;
				const index =
					node.value.length > 1 && options.locationType === 'before' ?
						sourceIndex
						: sourceIndex + node.value.length - 1;

				check(selector, node, index, rule, sourceIndex);
			});
		});

		if (hasFixed && fixedSelector) {
			if (!rule.raws.selector) {
				rule.selector = fixedSelector;
			}
			else {
				rule.raws.selector.raw = fixedSelector;
			}
		}
	});

	/**
	 * @param {string} source
	 * @param {import('postcss-selector-parser').Combinator} combinator
	 * @param {number} index
	 * @param {import('postcss').Node} node
	 * @param {number} sourceIndex
	 */
	function check (source, combinator, index, node, sourceIndex) {
		options.locationChecker({
			source,
			index,
			errTarget: combinator.value,
			err: (message) => {
				if (options.fix?.(combinator)) {
					hasFixed = true;

					return;
				}

				report({
					message,
					node,
					index: sourceIndex,
					result: options.result,
					ruleName: options.checkedRuleName
				});
			}
		});
	}
};
