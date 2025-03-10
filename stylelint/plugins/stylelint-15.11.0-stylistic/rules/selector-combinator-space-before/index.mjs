/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import selectorCombinatorSpaceChecker from '../selectorCombinatorSpaceChecker.mjs';

const ruleName = 'plugin/selector-combinator-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: (combinator) => `Expected single space before "${combinator}"`,
	rejectedBefore: (combinator) => `Unexpected whitespace before "${combinator}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-combinator-space-before/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never']
		});

		if (!validOptions) {
			return;
		}

		selectorCombinatorSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			locationType: 'before',
			checkedRuleName: ruleName,
			fix:
				(combinator) => {
					if (primary === 'always') {
						combinator.spaces.before = ' ';

						return true;
					}

					if (primary === 'never') {
						combinator.spaces.before = '';

						return true;
					}

					return false;
				  }
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
