/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import declarationValueIndex from 'stylelint/lib/utils/declarationValueIndex.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import declarationBangSpaceChecker from '../declarationBangSpaceChecker.mjs';

const ruleName = 'plugin/declaration-bang-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after "!"',
	rejectedAfter: () => 'Unexpected whitespace after "!"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-bang-space-after/README.md',
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

		declarationBangSpaceChecker({
			root,
			result,
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			fix: (decl, index) => {
				let bangIndex = index - declarationValueIndex(decl);
				const declValue = getDeclarationValue(decl);
				let target;
				/** @type {(value: string) => void} */
				let setFixed;

				if (bangIndex < declValue.length) {
					target = declValue;
					setFixed = (value) => {
						setDeclarationValue(decl, value);
					};
				}
				else if (decl.important) {
					target = (decl.raws.important ? decl.raws.important : ' !important');
					bangIndex -= declValue.length;
					setFixed = (value) => {
						decl.raws.important = value;
					};
				}
				else {
					return false; // not standard
				}

				const targetBefore = target.slice(0, bangIndex + 1);
				const targetAfter = target.slice(bangIndex + 1);

				if (primary === 'always') {
					setFixed(targetBefore + targetAfter.replace(/^\s*/, ' '));

					return true;
				}

				if (primary === 'never') {
					setFixed(targetBefore + targetAfter.replace(/^\s*/, ''));

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
