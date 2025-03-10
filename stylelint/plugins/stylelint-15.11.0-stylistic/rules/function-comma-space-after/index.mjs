/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import functionCommaSpaceChecker from '../functionCommaSpaceChecker.mjs';
import fixer from '../functionCommaSpaceFix.mjs';

const ruleName = 'plugin/function-comma-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after ","',
	rejectedAfter: () => 'Unexpected whitespace after ","',
	expectedAfterSingleLine: () => 'Expected single space after "," in a single-line function',
	rejectedAfterSingleLine: () => 'Unexpected whitespace after "," in a single-line function'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/function-comma-space-after/README.md',
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

		functionCommaSpaceChecker({
			root,
			result,
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			fix:
				(div, index, nodes) => fixer({
					div,
					index,
					nodes,
					expectation: primary,
					position: 'after',
					symb: ' '
				})
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
