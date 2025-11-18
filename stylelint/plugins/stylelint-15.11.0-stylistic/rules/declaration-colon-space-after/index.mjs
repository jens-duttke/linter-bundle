// @ts-nocheck

import stylelint from 'stylelint';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import declarationColonSpaceChecker from '../declarationColonSpaceChecker.mjs';

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
const rule = (primary, _secondaryOptions) => {
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
			fix: (decl, index) => {
				const colonIndex = index - declarationValueIndex(decl);
				const between = decl.raws.between;

				if (between == null) { throw new Error('`between` must be present'); }

				if (primary.startsWith('always')) {
					decl.raws.between = between.slice(0, colonIndex) + between.slice(colonIndex).replace(/^:\s*/u, ': ');

					return true;
				}

				if (primary === 'never') {
					decl.raws.between = between.slice(0, colonIndex) + between.slice(colonIndex).replace(/^:\s*/u, ':');

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
