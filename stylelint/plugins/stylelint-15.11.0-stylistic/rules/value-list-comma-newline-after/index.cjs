/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const declarationValueIndex = require('stylelint/lib/utils/declarationValueIndex.cjs');
const getDeclarationValue = require('stylelint/lib/utils/getDeclarationValue.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const setDeclarationValue = require('stylelint/lib/utils/setDeclarationValue.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const whitespaceChecker = require('../../utils/whitespaceChecker.cjs');
const valueListCommaWhitespaceChecker = require('../valueListCommaWhitespaceChecker.cjs');

const ruleName = 'plugin/value-list-comma-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ","',
	expectedAfterMultiLine: () => 'Expected newline after "," in a multi-line list',
	rejectedAfterMultiLine: () => 'Unexpected whitespace after "," in a multi-line list'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/value-list-comma-newline-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-multi-line', 'never-multi-line']
		});

		if (!validOptions) {
			return;
		}

		/** @type {Map<import('postcss').Declaration, number[]> | undefined} */
		let fixData;

		valueListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.afterOneOnly,
			checkedRuleName: ruleName,
			fix: context.fix ?
				(declNode, index) => {
					const valueIndex = declarationValueIndex(declNode);

					if (index <= valueIndex) {
						return false;
					}

					fixData ||= new Map();
					const commaIndices = fixData.get(declNode) || [];

					commaIndices.push(index);
					fixData.set(declNode, commaIndices);

					return true;
				  }
				: null,
			determineIndex: (declString, match) => {
				const nextChars = declString.substring(match.endIndex, declString.length);

				// If there's a // comment, that means there has to be a newline
				// ending the comment so we're fine
				if ((/^[\t ]*\/\//).test(nextChars)) {
					return false;
				}

				// If there are spaces and then a comment begins, look for the newline
				return (/^[\t ]*\/\*/).test(nextChars) ?
					declString.indexOf('*/', match.endIndex) + 1
					: match.startIndex;
			}
		});

		if (fixData) {
			for (const [decl, commaIndices] of fixData.entries()) {
				for (const index of commaIndices.sort((a, b) => a - b).reverse()) {
					const value = getDeclarationValue(decl);
					const valueIndex = index - declarationValueIndex(decl);
					const beforeValue = value.slice(0, valueIndex + 1);
					let afterValue = value.slice(valueIndex + 1);

					if (primary.startsWith('always')) {
						afterValue = context.newline + afterValue;
					}
					else if (primary.startsWith('never-multi-line')) {
						afterValue = afterValue.replace(/^\s*/, '');
					}

					setDeclarationValue(decl, beforeValue + afterValue);
				}
			}
		}
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
