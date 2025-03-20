/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

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
const rule = (primary, _secondaryOptions) => (root, result) => {
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

			report({
				message: messages.expected(value, expected),
				node: decl,
				index: declarationValueIndex(decl) + node.sourceIndex,
				endIndex: declarationValueIndex(decl) + node.sourceIndex,
				result,
				ruleName,
				fix: () => {
					node.value = expected;
					needsFix = true;
				}
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
export default stylelint.createPlugin(ruleName, rule);
