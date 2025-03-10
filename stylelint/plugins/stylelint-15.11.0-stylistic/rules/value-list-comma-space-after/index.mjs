/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import valueListCommaWhitespaceChecker from '../valueListCommaWhitespaceChecker.mjs';

const ruleName = 'plugin/value-list-comma-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after ","',
	rejectedAfter: () => 'Unexpected whitespace after ","',
	expectedAfterSingleLine: () => 'Expected single space after "," in a single-line list',
	rejectedAfterSingleLine: () => 'Unexpected whitespace after "," in a single-line list'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/value-list-comma-space-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never', 'always-single-line', 'never-single-line']
		});

		if (!validOptions) {
			return;
		}

		/** @type {Map<import('postcss').Declaration, number[]> | undefined} */
		let fixData;

		valueListCommaWhitespaceChecker({
			root,
			result,
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			fix:
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
		});

		if (fixData) {
			for (const [decl, commaIndices] of fixData.entries()) {
				for (const index of commaIndices.sort((a, b) => b - a)) {
					const value = getDeclarationValue(decl);
					const valueIndex = index - declarationValueIndex(decl);
					const beforeValue = value.slice(0, valueIndex + 1);
					let afterValue = value.slice(valueIndex + 1);

					if (primary.startsWith('always')) {
						afterValue = afterValue.replace(/^\s*/, ' ');
					}
					else if (primary.startsWith('never')) {
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
export default stylelint.createPlugin(ruleName, rule);
