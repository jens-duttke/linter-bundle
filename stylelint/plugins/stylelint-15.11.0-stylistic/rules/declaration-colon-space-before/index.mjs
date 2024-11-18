/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import declarationValueIndex from 'stylelint/lib/utils/declarationValueIndex.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import declarationColonSpaceChecker from '../declarationColonSpaceChecker.mjs';

const ruleName = 'plugin/declaration-colon-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ":"',
	rejectedBefore: () => 'Unexpected whitespace before ":"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-colon-space-before/README.md',
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

		declarationColonSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix:
				(decl, index) => {
					const colonIndex = index - declarationValueIndex(decl);
					const between = decl.raws.between;

					if (between == null) { throw new Error('`between` must be present'); }

					if (primary === 'always') {
						decl.raws.between =
								between.slice(0, colonIndex).replace(/\s*$/, ' ') + between.slice(colonIndex);

						return true;
					}

					if (primary === 'never') {
						decl.raws.between =
								between.slice(0, colonIndex).replace(/\s*$/, '') + between.slice(colonIndex);

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
