/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const valueParser = require('postcss-value-parser');
const stylelint = require('stylelint');
const declarationValueIndex = require('stylelint/lib/utils/declarationValueIndex.cjs');
const getDeclarationValue = require('stylelint/lib/utils/getDeclarationValue.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const setDeclarationValue = require('stylelint/lib/utils/setDeclarationValue.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const ruleName = 'plugin/color-hex-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/color-hex-case/README.md',
	fixable: true
};

const HEX = /^#[\da-z]+/i;
const CONTAINS_HEX = /#[\da-z]+/i;
const IGNORED_FUNCTIONS = new Set(['url']);

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['lower', 'upper']
	});

	if (!validOptions) {
		return;
	}

	root.walkDecls((decl) => {
		if (!CONTAINS_HEX.test(decl.value)) { return; }

		const parsedValue = valueParser(getDeclarationValue(decl));
		let needsFix = false;

		parsedValue.walk((node) => {
			const { value } = node;

			if (isIgnoredFunction(node)) { return false; }

			if (!isHexColor(node)) { return; }

			const expected = primary === 'lower' ? value.toLowerCase() : value.toUpperCase();

			if (value === expected) { return; }

			if (context.fix) {
				node.value = expected;
				needsFix = true;

				return;
			}

			report({
				message: messages.expected(value, expected),
				node: decl,
				index: declarationValueIndex(decl) + node.sourceIndex,
				result,
				ruleName
			});
		});

		if (needsFix) {
			setDeclarationValue(decl, parsedValue.toString());
		}
	});
};

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isIgnoredFunction ({ type, value }) {
	return type === 'function' && IGNORED_FUNCTIONS.has(value.toLowerCase());
}

/**
 * @param {import('postcss-value-parser').Node} node
 */
function isHexColor ({ type, value }) {
	return type === 'word' && HEX.test(value);
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
