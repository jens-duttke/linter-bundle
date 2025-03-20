/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import functionCommaSpaceChecker from '../functionCommaSpaceChecker.mjs';
import fixer from '../functionCommaSpaceFix.mjs';

const ruleName = 'plugin/function-comma-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ","',
	expectedAfterMultiLine: () => 'Expected newline after "," in a multi-line function',
	rejectedAfterMultiLine: () => 'Unexpected whitespace after "," in a multi-line function'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/function-comma-newline-after/README.md',
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

		functionCommaSpaceChecker({
			root,
			result,
			locationChecker: checker.afterOneOnly,
			checkedRuleName: ruleName,
			fix: (div, index, nodes) => fixer({
				div,
				index,
				nodes,
				expectation: primary,
				position: 'after',
				symb: context.newline || ''
			})
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
