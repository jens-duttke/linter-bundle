/**
 * @file Fork of the stylistic Stylelint rules.
 *
 * Stylistic rules have been deprecated in Stylelint v15 and will be removed in Stylelint v16, in favour of Prettier.
 * To provide a smooth transition, we will fork them from the latest 15.x version which will contain them.
 *
 * The following stylistic rules are not considered, as they are not used by `linter-bundle`:
 * - at-rule-name-newline-after
 * - block-closing-brace-space-after
 * - block-opening-brace-newline-before
 *
 * @license MIT
 *
 * @see https://stylelint.io/user-guide/rules/at-rule-name-case
 * @see https://stylelint.io/user-guide/rules/at-rule-name-space-after
 * @see https://stylelint.io/user-guide/rules/at-rule-semicolon-newline-after
 * @see https://stylelint.io/user-guide/rules/at-rule-semicolon-space-before
 * @see https://stylelint.io/user-guide/rules/block-closing-brace-empty-line-before
 * @see https://stylelint.io/user-guide/rules/block-closing-brace-newline-after
 * @see https://stylelint.io/user-guide/rules/block-closing-brace-newline-before
 * @see https://stylelint.io/user-guide/rules/block-closing-brace-space-before
 * @see https://stylelint.io/user-guide/rules/block-opening-brace-newline-after
 * @see https://stylelint.io/user-guide/rules/block-opening-brace-space-after
 * @see https://stylelint.io/user-guide/rules/block-opening-brace-space-before
 * @see https://stylelint.io/user-guide/rules/color-hex-case
 * @see https://stylelint.io/user-guide/rules/declaration-bang-space-after
 * @see https://stylelint.io/user-guide/rules/declaration-bang-space-before
 * @see https://stylelint.io/user-guide/rules/declaration-block-semicolon-newline-after
 * @see https://stylelint.io/user-guide/rules/declaration-block-semicolon-newline-before
 * @see https://stylelint.io/user-guide/rules/declaration-block-semicolon-space-after
 * @see https://stylelint.io/user-guide/rules/declaration-block-semicolon-space-before
 * @see https://stylelint.io/user-guide/rules/declaration-block-trailing-semicolon
 * @see https://stylelint.io/user-guide/rules/declaration-colon-newline-after
 * @see https://stylelint.io/user-guide/rules/declaration-colon-space-after
 * @see https://stylelint.io/user-guide/rules/declaration-colon-space-before
 * @see https://stylelint.io/user-guide/rules/function-comma-newline-after
 * @see https://stylelint.io/user-guide/rules/function-comma-newline-before
 * @see https://stylelint.io/user-guide/rules/function-comma-space-after
 * @see https://stylelint.io/user-guide/rules/function-comma-space-before
 * @see https://stylelint.io/user-guide/rules/function-max-empty-lines
 * @see https://stylelint.io/user-guide/rules/function-parentheses-newline-inside
 * @see https://stylelint.io/user-guide/rules/function-parentheses-space-inside
 * @see https://stylelint.io/user-guide/rules/function-whitespace-after
 * @see https://stylelint.io/user-guide/rules/indentation
 * @see https://stylelint.io/user-guide/rules/linebreaks
 * @see https://stylelint.io/user-guide/rules/max-empty-lines
 * @see https://stylelint.io/user-guide/rules/max-line-length
 * @see https://stylelint.io/user-guide/rules/media-feature-colon-space-after
 * @see https://stylelint.io/user-guide/rules/media-feature-colon-space-before
 * @see https://stylelint.io/user-guide/rules/media-feature-name-case
 * @see https://stylelint.io/user-guide/rules/media-feature-parentheses-space-inside
 * @see https://stylelint.io/user-guide/rules/media-feature-range-operator-space-after
 * @see https://stylelint.io/user-guide/rules/media-feature-range-operator-space-before
 * @see https://stylelint.io/user-guide/rules/media-query-list-comma-newline-after
 * @see https://stylelint.io/user-guide/rules/media-query-list-comma-newline-before
 * @see https://stylelint.io/user-guide/rules/media-query-list-comma-space-after
 * @see https://stylelint.io/user-guide/rules/media-query-list-comma-space-before
 * @see https://stylelint.io/user-guide/rules/no-empty-first-line
 * @see https://stylelint.io/user-guide/rules/no-eol-whitespace
 * @see https://stylelint.io/user-guide/rules/no-extra-semicolons
 * @see https://stylelint.io/user-guide/rules/no-missing-end-of-source-newline
 * @see https://stylelint.io/user-guide/rules/number-leading-zero
 * @see https://stylelint.io/user-guide/rules/number-no-trailing-zeros
 * @see https://stylelint.io/user-guide/rules/property-case
 * @see https://stylelint.io/user-guide/rules/selector-attribute-brackets-space-inside
 * @see https://stylelint.io/user-guide/rules/selector-attribute-operator-space-after
 * @see https://stylelint.io/user-guide/rules/selector-attribute-operator-space-before
 * @see https://stylelint.io/user-guide/rules/selector-combinator-space-after
 * @see https://stylelint.io/user-guide/rules/selector-combinator-space-before
 * @see https://stylelint.io/user-guide/rules/selector-descendant-combinator-no-non-space
 * @see https://stylelint.io/user-guide/rules/selector-list-comma-newline-after
 * @see https://stylelint.io/user-guide/rules/selector-list-comma-newline-before
 * @see https://stylelint.io/user-guide/rules/selector-list-comma-space-after
 * @see https://stylelint.io/user-guide/rules/selector-list-comma-space-before
 * @see https://stylelint.io/user-guide/rules/selector-max-empty-lines
 * @see https://stylelint.io/user-guide/rules/selector-pseudo-class-case
 * @see https://stylelint.io/user-guide/rules/selector-pseudo-class-parentheses-space-inside
 * @see https://stylelint.io/user-guide/rules/selector-pseudo-element-case
 * @see https://stylelint.io/user-guide/rules/string-quotes
 * @see https://stylelint.io/user-guide/rules/unicode-bom
 * @see https://stylelint.io/user-guide/rules/unit-case
 * @see https://stylelint.io/user-guide/rules/value-list-comma-newline-after
 * @see https://stylelint.io/user-guide/rules/value-list-comma-newline-before
 * @see https://stylelint.io/user-guide/rules/value-list-comma-space-after
 * @see https://stylelint.io/user-guide/rules/value-list-comma-space-before
 * @see https://stylelint.io/user-guide/rules/value-list-max-empty-lines
 */

import stylelint from 'stylelint';
// @ts-expect-error -- There's no type definition for this file.
import rules from 'stylelint/lib/rules/index.js';

export default await Promise.all([
	'at-rule-name-case',
	'at-rule-name-space-after',
	'at-rule-semicolon-newline-after',
	'at-rule-semicolon-space-before',
	'block-closing-brace-empty-line-before',
	'block-closing-brace-newline-after',
	'block-closing-brace-newline-before',
	'block-closing-brace-space-before',
	'block-opening-brace-newline-after',
	'block-opening-brace-space-after',
	'block-opening-brace-space-before',
	'color-hex-case',
	'declaration-bang-space-after',
	'declaration-bang-space-before',
	'declaration-block-semicolon-newline-after',
	'declaration-block-semicolon-newline-before',
	'declaration-block-semicolon-space-after',
	'declaration-block-semicolon-space-before',
	'declaration-block-trailing-semicolon',
	'declaration-colon-newline-after',
	'declaration-colon-space-after',
	'declaration-colon-space-before',
	'function-comma-newline-after',
	'function-comma-newline-before',
	'function-comma-space-after',
	'function-comma-space-before',
	'function-max-empty-lines',
	'function-parentheses-newline-inside',
	'function-parentheses-space-inside',
	'function-whitespace-after',
	'indentation',
	'linebreaks',
	'max-empty-lines',
	'max-line-length',
	'media-feature-colon-space-after',
	'media-feature-colon-space-before',
	'media-feature-name-case',
	'media-feature-parentheses-space-inside',
	'media-feature-range-operator-space-after',
	'media-feature-range-operator-space-before',
	'media-query-list-comma-newline-after',
	'media-query-list-comma-newline-before',
	'media-query-list-comma-space-after',
	'media-query-list-comma-space-before',
	'no-empty-first-line',
	'no-eol-whitespace',
	'no-extra-semicolons',
	'no-missing-end-of-source-newline',
	'number-leading-zero',
	'number-no-trailing-zeros',
	'property-case',
	'selector-attribute-brackets-space-inside',
	'selector-attribute-operator-space-after',
	'selector-attribute-operator-space-before',
	'selector-combinator-space-after',
	'selector-combinator-space-before',
	'selector-descendant-combinator-no-non-space',
	'selector-list-comma-newline-after',
	'selector-list-comma-newline-before',
	'selector-list-comma-space-after',
	'selector-list-comma-space-before',
	'selector-max-empty-lines',
	'selector-pseudo-class-case',
	'selector-pseudo-class-parentheses-space-inside',
	'selector-pseudo-element-case',
	'string-quotes',
	'unicode-bom',
	'unit-case',
	'value-list-comma-newline-after',
	'value-list-comma-newline-before',
	'value-list-comma-space-after',
	'value-list-comma-space-before',
	'value-list-max-empty-lines'
].map(async (ruleName) => {
	const rule = rules[ruleName];

	const forkedRule = Object.assign(
		/**
		 * Wrapper for the original rule, to be able to manipulate the additional properties.
		 *
		 * @param {Parameters<import('stylelint').RuleBase>} args - The arguments of the rule function
		 * @returns {ReturnType<import('stylelint').RuleBase>} The return value of the rule function
		 */
		(...args) => rule(...args),
		rule
	);

	forkedRule.ruleName = `plugin/${ruleName}`;
	forkedRule.meta = {
		...rule.meta,
		deprecated: false
	};

	return stylelint.createPlugin(`plugin/${ruleName}`, forkedRule);
}));
