// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import isSingleLineString from 'stylelint/lib/utils/isSingleLineString.mjs';
import isStandardSyntaxFunction from 'stylelint/lib/utils/isStandardSyntaxFunction.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/function-parentheses-space-inside';

const messages = ruleMessages(ruleName, {
	expectedOpening: 'Expected single space after "("',
	rejectedOpening: 'Unexpected whitespace after "("',
	expectedClosing: 'Expected single space before ")"',
	rejectedClosing: 'Unexpected whitespace before ")"',
	expectedOpeningSingleLine: 'Expected single space after "(" in a single-line function',
	rejectedOpeningSingleLine: 'Unexpected whitespace after "(" in a single-line function',
	expectedClosingSingleLine: 'Expected single space before ")" in a single-line function',
	rejectedClosingSingleLine: 'Unexpected whitespace before ")" in a single-line function'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/function-parentheses-space-inside/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['always', 'never', 'always-single-line', 'never-single-line']
	});

	if (!validOptions) {
		return;
	}

	root.walkDecls((decl) => {
		if (!decl.value.includes('(')) {
			return;
		}

		let hasFixed = false;
		const declValue = getDeclarationValue(decl);
		const parsedValue = valueParser(declValue);

		parsedValue.walk((valueNode) => {
			if (valueNode.type !== 'function') {
				return;
			}

			if (!isStandardSyntaxFunction(valueNode)) {
				return;
			}

			// Ignore function without parameters
			if (valueNode.nodes.length === 0) {
				return;
			}

			const functionString = valueParser.stringify(valueNode);
			const isSingleLine = isSingleLineString(functionString);

			// Check opening ...

			const openingIndex = valueNode.sourceIndex + valueNode.value.length + 1;

			if (primary === 'always' && valueNode.before !== ' ') {
				complain(messages.expectedOpening, openingIndex);
			}

			if (primary === 'never' && valueNode.before !== '') {
				complain(messages.rejectedOpening, openingIndex);
			}

			if (isSingleLine && primary === 'always-single-line' && valueNode.before !== ' ') {
				complain(messages.expectedOpeningSingleLine, openingIndex);
			}

			if (isSingleLine && primary === 'never-single-line' && valueNode.before !== '') {
				complain(messages.rejectedOpeningSingleLine, openingIndex);
			}

			// Check closing ...

			const closingIndex = valueNode.sourceIndex + functionString.length - 2;

			if (primary === 'always' && valueNode.after !== ' ') {
				complain(messages.expectedClosing, closingIndex);
			}

			if (primary === 'never' && valueNode.after !== '') {
				complain(messages.rejectedClosing, closingIndex);
			}

			if (isSingleLine && primary === 'always-single-line' && valueNode.after !== ' ') {
				complain(messages.expectedClosingSingleLine, closingIndex);
			}

			if (isSingleLine && primary === 'never-single-line' && valueNode.after !== '') {
				complain(messages.rejectedClosingSingleLine, closingIndex);
			}
		});

		if (hasFixed) {
			setDeclarationValue(decl, parsedValue.toString());
		}

		/**
		 * @param {string} message
		 * @param {number} offset
		 */
		function complain (message, offset) {
			report({
				ruleName,
				result,
				message,
				node: decl,
				index: declarationValueIndex(decl) + offset
			});
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
