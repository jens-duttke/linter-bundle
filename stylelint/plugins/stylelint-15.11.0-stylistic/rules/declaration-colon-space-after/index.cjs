/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const stylelint = require('stylelint');
const declarationValueIndex = require('stylelint/lib/utils/declarationValueIndex.cjs');
const ruleMessages = require('stylelint/lib/utils/ruleMessages.cjs');
const validateOptions = require('stylelint/lib/utils/validateOptions.cjs');

const whitespaceChecker = require('../../utils/whitespaceChecker.cjs');
const declarationColonSpaceChecker = require('../declarationColonSpaceChecker.cjs');

const ruleName = 'plugin/declaration-colon-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected single space after ":"',
	rejectedAfter: () => 'Unexpected whitespace after ":"',
	expectedAfterSingleLine: () => 'Expected single space after ":" with a single-line declaration'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-colon-space-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never', 'always-single-line']
		});

		if (!validOptions) {
			return;
		}

		declarationColonSpaceChecker({
			root,
			result,
			locationChecker: checker.after,
			checkedRuleName: ruleName,
			fix: context.fix ?
				(decl, index) => {
					const colonIndex = index - declarationValueIndex(decl);
					const between = decl.raws.between;

					if (between == null) { throw new Error('`between` must be present'); }

					if (primary.startsWith('always')) {
						decl.raws.between =
								between.slice(0, colonIndex) + between.slice(colonIndex).replace(/^:\s*/, ': ');

						return true;
					}

					if (primary === 'never') {
						decl.raws.between =
								between.slice(0, colonIndex) + between.slice(colonIndex).replace(/^:\s*/, ':');

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
