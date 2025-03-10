// @ts-nocheck

import stylelint from 'stylelint';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import declarationBangSpaceChecker from '../declarationBangSpaceChecker.mjs';

const ruleName = 'plugin/declaration-bang-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before "!"',
	rejectedBefore: () => 'Unexpected whitespace before "!"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-bang-space-before/README.md',
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
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			fix:
				(decl, index) => {
					let bangIndex = index - declarationValueIndex(decl);
					const value = getDeclarationValue(decl);
					let target;
					/** @type {(val: string) => void} */
					let setFixed;

					if (bangIndex < value.length) {
						target = value;
						setFixed = (value_) => {
							setDeclarationValue(decl, value_);
						};
					}
					else if (decl.important) {
						target = (decl.raws.important ? decl.raws.important : ' !important');
						bangIndex -= value.length;
						setFixed = (value_) => {
							decl.raws.important = value_;
						};
					}
					else {
						return false; // not standard
					}

					const targetBefore = target.slice(0, bangIndex);
					const targetAfter = target.slice(bangIndex);

					if (primary === 'always') {

						setFixed(targetBefore.replace(/\s*$/, '') + ' ' + targetAfter);

						return true;
					}

					if (primary === 'never') {
						setFixed(targetBefore.replace(/\s*$/, '') + targetAfter);

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
