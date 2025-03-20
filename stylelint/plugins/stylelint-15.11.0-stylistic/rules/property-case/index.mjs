/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import isCustomProperty from 'stylelint/lib/utils/isCustomProperty.mjs';
import isStandardSyntaxProperty from 'stylelint/lib/utils/isStandardSyntaxProperty.mjs';
import optionsMatches from 'stylelint/lib/utils/optionsMatches.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import { isRegExp, isString } from 'stylelint/lib/utils/validateTypes.mjs';

const ruleName = 'plugin/property-case';

const messages = ruleMessages(ruleName, {
	expected: (actual, expected) => `Expected "${actual}" to be "${expected}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/property-case/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions) => (root, result) => {
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

		report({
			message: messages.expected(property, expectedProperty),
			word: property,
			node: decl,
			ruleName,
			result,
			fix: () => {
				decl.prop = expectedProperty;
			}
		});
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
