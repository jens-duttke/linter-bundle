/**
 * @file Fork of `stylelint-selector-no-empty` rule.
 *
 * @license MIT
 *
 * @see https://www.npmjs.com/package/stylelint-selector-no-empty
 */

import stylelint from 'stylelint';

const ruleName = 'plugin/stylelint-selector-no-empty';

let nearestSelector = '';

const messages = stylelint.utils.ruleMessages(ruleName, {
	expected (selector) {
		if (typeof selector === 'string' && selector.length > 0) {
			return `Unexpected empty selector near '${selector}'`;
		}

		return 'Unexpected empty selector';
	}
});

// @ts-expect-error -- Parameter 'enabled' implicitly has an 'any' type.
export default stylelint.createPlugin(ruleName, (enabled) => {
	if (!enabled) {
		return;
	}

	return (root, result) => {
		root.walkRules((rule) => {
			try {
				nearestSelector = '';

				for (const selector of rule.selector.split(',')) {
					if (selector.length === 0) {
						reportError(rule, result);
						continue;
					}
					nearestSelector = selector;

					const tabSplittedSelectors = getSplittedSelectors(selector.split('\n'), '\t');
					const spaceSplittedSelectors = getSplittedSelectors(tabSplittedSelectors, ' ');
					checkEmptySelector(spaceSplittedSelectors, result, rule);
				}
			}
			catch { /* Do nothing */ }
		});
	};
});

/**
 * Splits the selectors based on a specified delimiter and filters out empty selectors.
 *
 * @param {string[]} splittedSelectors - The selectors to be split
 * @param {string} splitBy - The delimiter to split the selectors
 * @returns {string[]} The split and filtered selectors
 */
function getSplittedSelectors (splittedSelectors, splitBy) {
	const res = [];

	for (const splittedSelector of splittedSelectors) {
		try {
			for (const selector of splittedSelector.split(splitBy)) {
				if (selector.trim().length > 0) {
					res.push(selector);
				}
			}
		}
		catch { /* Do nothing */ }
	}

	return res;
}

/**
 * Checks for empty selectors within the space-split selectors.
 *
 * @param {string[]} spaceSplittedSelectors - The space-split selectors
 * @param {stylelint.PostcssResult} result - The result object
 * @param {import('postcss').Rule} rule - The current rule
 */
function checkEmptySelector (spaceSplittedSelectors, result, rule) {
	for (let sp of spaceSplittedSelectors) {
		if ((sp.startsWith('.') || sp.startsWith('#')) && sp.trim().length > 1) {
			sp = sp.slice(1);
		}

		for (const classSelectorsWithoutDot of sp.split('.')) {
			for (const selector of classSelectorsWithoutDot.split('#')) {
				if (selector.trim().length === 0) {
					reportError(rule, result);
					return;
				}
			}
		}
	}
}

/**
 * Reports an error for an empty selector.
 *
 * @param {import('postcss').Rule} rule - The current rule
 * @param {stylelint.PostcssResult} result - The result object
 */
function reportError (rule, result) {
	stylelint.utils.report({
		result,
		ruleName,
		message: messages.expected(nearestSelector),
		node: rule
	});
}
