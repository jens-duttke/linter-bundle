/**
 * @file Fork of `stylelint-high-performance-animation` rule.
 *
 * @license MIT
 *
 * @see https://github.com/kristerkari/stylelint-high-performance-animation
 */

import valueParser from 'postcss-value-parser';
/** @type {(declaration: import('postcss').Declaration) => number} */
import stylelint from 'stylelint';
// @ts-expect-error -- No declaration file.
import declarationValueIndex from 'stylelint/lib/utils/declarationValueIndex.js';

const ruleName = 'plugin/no-low-performance-animation-properties';

const messages = stylelint.utils.ruleMessages(ruleName, {
	rejected: (type, property) => `Unexpected use of low performance ${type} property (${property}).`
});

/**
 * Function which ensures that a given `value` is of type "string".
 *
 * @param {any} value - Any value which should be ensured to be a string.
 * @returns {boolean} - True if the value is a string, false otherwise.
 */
const isString = (value) => (typeof value === 'string');

// https://drafts.csswg.org/css-timing/
const cssLinearTimingFunctions = ['linear'];
const cssCubicBezierTimingFunctions = [
	'ease',
	'ease-in',
	'ease-out',
	'ease-in-out',
	'cubic-bezier'
];
const cssStepTimingFunctions = ['step-start', 'step-end', 'steps'];
const cssFramesTimingFunctions = ['frames'];
const cssTimingFunctions = [
	...cssLinearTimingFunctions,
	...cssCubicBezierTimingFunctions,
	...cssStepTimingFunctions,
	...cssFramesTimingFunctions
];
const cssTimingFunctionsRE = new RegExp(`^(${cssTimingFunctions.join('|')}).*`, 'u');

const propertiesThatCauseLayout = [
	'position',
	'top',
	'bottom',
	'left',
	'right',
	'width',
	'height',
	'min-height',
	'max-height',
	'max-width',
	'min-width',
	'padding',
	'padding-bottom',
	'padding-left',
	'padding-right',
	'padding-top',
	'margin',
	'margin-bottom',
	'margin-left',
	'margin-right',
	'margin-top',
	'display',
	'border-width',
	'border-spacing',
	'border-collapse',
	'border',
	'font',
	'font-size',
	'font-family',
	'font-weight',
	'font-style',
	'float',
	'overflow-y',
	'overflow-x',
	'overflow',
	'line-height',
	'vertical-align',
	'clear',
	'white-space',
	'list-style',
	'list-style-type',
	'zoom',
	'content',
	'box-sizing',
	'text-shadow',
	'text-align',
	'text-indent',
	'text-transform',
	'text-overflow',
	'word-wrap',
	'letter-spacing',
	'appearance',
	'direction'
];

const propsThatCausePaint = [
	'color',
	'border-color',
	'border-style',
	'border-radius',
	'visibility',
	'text-decoration',
	'background',
	'background-color',
	'background-size',
	'background-image',
	'background-position',
	'background-repeat',
	'outline',
	'outline-style',
	'outline-width',
	'outline-color',
	'box-shadow'
];

/**
 * Get disallowed properties.
 *
 * @param {string} ignore - Property name.
 * @returns {string[]} - Array of disallowed properties.
 */
const getDisallowedList = (ignore) => {
	if (ignore === 'paint-properties') {
		return propertiesThatCauseLayout;
	}

	return propertiesThatCauseLayout.concat(propsThatCausePaint);
};

/**
 * Returns the input string stripped of its vendor prefix.
 *
 * @example
 * unprefixed('-moz-tab-size') //=> 'tab-size'
 *
 * @param {string} property - String with or without vendor prefix.
 * @returns {string} String name without vendor prefixes.
 */
const unprefixed = (property) => property.replace(/^-\w+-/u, '');

/**
 * Rule function.
 *
 * @param {Record<string, any>} actual - Primary options
 * @param {Record<string, any>} options - Secondary options
 * @returns {(root: import('postcss').Root, result: import('stylelint').PostcssResult) => Promise<void> | void} PostCSS plugin
 */
const ruleFunction = (actual, options) => (cssRoot, result) => {
	const validOptions = stylelint.utils.validateOptions(
		result,
		ruleName,
		{ actual },
		{
			actual: options,
			possible: {
				ignore: ['paint-properties'],
				ignoreProperties: [isString]
			},
			optional: true
		}
	);

	if (!validOptions) { return; }

	const disallowedList = getDisallowedList(options['ignore']);
	const ignored = options['ignoreProperties'] ?? [];

	cssRoot.walkDecls('transition-property', (decl) => {
		valueParser(decl.value).walk((node) => {
			const value = unprefixed(node.value);

			if (
				node.type === 'word' &&
				!ignored.includes(value) &&
				(disallowedList.includes(value) || value === 'all')
			) {
				const index = declarationValueIndex(decl) + node.sourceIndex;

				stylelint.utils.report({
					ruleName,
					result,
					node: decl,
					message: messages.rejected('transition', node.value),
					index
				});
			}
		});
	});

	cssRoot.walkDecls('transition', (decl) => {
		/** @type {{ index: number; value: string; }[]} */
		const nodes = [];

		valueParser(decl.value).walk((node) => {
			if (node.type === 'word' || node.type === 'function') {
				nodes.push({
					index: node.sourceIndex,
					value: node.value
				});
			}

			return false;
		});

		if (!ignored.includes('all')) {
			const transitionProp = nodes.filter((node) => {
				const isUnit = valueParser.unit(node.value);
				const isTimingFunction = cssTimingFunctionsRE.test(node.value);

				if (isUnit || isTimingFunction) {
					return false;
				}

				return node;
			});

			if (nodes.length > 0 && transitionProp.length === 0) {
				stylelint.utils.report({
					ruleName,
					result,
					node: decl,
					message: messages.rejected('transition', 'all'),
					index: declarationValueIndex(decl) + nodes[0].index
				});

				return;
			}
		}

		for (const property of nodes) {
			const index = declarationValueIndex(decl) + property.index;
			const value = unprefixed(property.value);

			if (
				!ignored.includes(value) &&
				(disallowedList.includes(value) || value === 'all')
			) {
				stylelint.utils.report({
					ruleName,
					result,
					node: decl,
					message: messages.rejected('transition', property.value),
					index
				});
			}
		}
	});

	cssRoot.walkAtRules(/^keyframes$/iu, (atRuleKeyframes) => {
		atRuleKeyframes.walkDecls((decl) => {
			const value = unprefixed(decl.prop);

			if (!ignored.includes(value) && disallowedList.includes(value)) {
				stylelint.utils.report({
					ruleName,
					result,
					node: decl,
					message: messages.rejected('animation', decl.prop)
				});
			}
		});
	});
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default stylelint.createPlugin(ruleName, ruleFunction);
