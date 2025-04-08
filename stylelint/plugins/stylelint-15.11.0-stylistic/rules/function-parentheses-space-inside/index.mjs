// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import isSingleLineString from 'stylelint/lib/utils/isSingleLineString.mjs';
import isStandardSyntaxFunction from 'stylelint/lib/utils/isStandardSyntaxFunction.mjs';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
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
const rule = (primary, _secondaryOptions) => (root, result) => {
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
				report({
					ruleName,
					result,
					message: messages.expectedOpening,
					node: decl,
					index: declarationValueIndex(decl) + openingIndex,
					endIndex: declarationValueIndex(decl) + openingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.before = ' ';
					}
				});
			}

			if (primary === 'never' && valueNode.before !== '') {
				report({
					ruleName,
					result,
					message: messages.rejectedOpening,
					node: decl,
					index: declarationValueIndex(decl) + openingIndex,
					endIndex: declarationValueIndex(decl) + openingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.before = '';
					}
				});
			}

			if (isSingleLine && primary === 'always-single-line' && valueNode.before !== ' ') {
				report({
					ruleName,
					result,
					message: messages.expectedOpeningSingleLine,
					node: decl,
					index: declarationValueIndex(decl) + openingIndex,
					endIndex: declarationValueIndex(decl) + openingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.before = ' ';
					}
				});
			}

			if (isSingleLine && primary === 'never-single-line' && valueNode.before !== '') {
				report({
					ruleName,
					result,
					message: messages.rejectedOpeningSingleLine,
					node: decl,
					index: declarationValueIndex(decl) + openingIndex,
					endIndex: declarationValueIndex(decl) + openingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.before = '';
					}
				});
			}

			// Check closing ...

			const closingIndex = valueNode.sourceIndex + functionString.length - 2;

			if (primary === 'always' && valueNode.after !== ' ') {
				report({
					ruleName,
					result,
					message: messages.expectedClosing,
					node: decl,
					index: declarationValueIndex(decl) + closingIndex,
					endIndex: declarationValueIndex(decl) + closingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.after = ' ';
					}
				});
			}

			if (primary === 'never' && valueNode.after !== '') {
				report({
					ruleName,
					result,
					message: messages.rejectedClosing,
					node: decl,
					index: declarationValueIndex(decl) + closingIndex,
					endIndex: declarationValueIndex(decl) + closingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.after = '';
					}
				});
			}

			if (isSingleLine && primary === 'always-single-line' && valueNode.after !== ' ') {
				report({
					ruleName,
					result,
					message: messages.expectedClosingSingleLine,
					node: decl,
					index: declarationValueIndex(decl) + closingIndex,
					endIndex: declarationValueIndex(decl) + closingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.after = ' ';
					}
				});
			}

			if (isSingleLine && primary === 'never-single-line' && valueNode.after !== '') {
				report({
					ruleName,
					result,
					message: messages.rejectedClosingSingleLine,
					node: decl,
					index: declarationValueIndex(decl) + closingIndex,
					endIndex: declarationValueIndex(decl) + closingIndex,
					fix: () => {
						hasFixed = true;
						valueNode.after = '';
					}
				});
			}
		});

		if (hasFixed) {
			setDeclarationValue(decl, parsedValue.toString());
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
