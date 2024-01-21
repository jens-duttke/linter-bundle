/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const isCustomProperty = require('stylelint/lib/utils/isCustomProperty.cjs');
const isStandardSyntaxProperty = require('stylelint/lib/utils/isStandardSyntaxProperty.cjs');
const optionsMatches = require('stylelint/lib/utils/optionsMatches.cjs');
const report = require('stylelint/lib/utils/report.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const { isRule } = require('stylelint/lib/utils/typeGuards.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');
const { isRegExp, isString } = require('stylelint/lib/utils/validateTypes.cjs');

const ruleName = 'plugin/property-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/property-case/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(
		result,
		ruleName,
		{
			actual: primary,
			possible: ['lower', 'upper']
		},
		{
			actual: secondaryOptions,
			possible: {
				ignoreSelectors: [isString, isRegExp]
			},
			optional: true
		}
	);

	if (!validOptions) {
		return;
	}

	root.walkDecls((decl) => {
		const property = decl.prop;

		if (!isStandardSyntaxProperty(property)) {
			return;
		}

		if (isCustomProperty(property)) {
			return;
		}

		const { parent } = decl;

		if (!parent) { throw new Error('A parent node must be present'); }

		if (isRule(parent)) {
			const { selector } = parent;

			if (selector && optionsMatches(secondaryOptions, 'ignoreSelectors', selector)) {
				return;
			}
		}

		const expectedProperty = primary === 'lower' ? property.toLowerCase() : property.toUpperCase();

		if (property === expectedProperty) {
			return;
		}

		if (context.fix) {
			decl.prop = expectedProperty;

			return;
		}

		report({
			message: messages.expected(property, expectedProperty),
			word: property,
			node: decl,
			ruleName,
			result
		});
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
