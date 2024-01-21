/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const declarationValueIndex = require('stylelint/lib/utils/declarationValueIndex.cjs');
const getDeclarationValue = require('stylelint/lib/utils/getDeclarationValue.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const setDeclarationValue = require('stylelint/lib/utils/setDeclarationValue.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const whitespaceChecker = require('../../utils/whitespaceChecker.cjs');
const declarationBangSpaceChecker = require('../declarationBangSpaceChecker.cjs');

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
			fix: context.fix ?
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
				: null
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
module.exports = stylelint.createPlugin(ruleName, rule);
