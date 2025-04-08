// @ts-nocheck

import stylelint from 'stylelint';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import { isNumber } from 'stylelint/lib/utils/validateTypes.mjs';

const ruleName = 'plugin/value-list-max-empty-lines';

const messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} empty ${max === 1 ? 'line' : 'lines'}`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/value-list-max-empty-lines/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => {
	const maxAdjacentNewlines = primary + 1;

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: isNumber
		});

		if (!validOptions) {
			return;
		}

		const violatedCRLFNewLinesRegex = new RegExp(`(?:\r\n){${maxAdjacentNewlines + 1},}`, 'u');
		const violatedLFNewLinesRegex = new RegExp(`\n{${maxAdjacentNewlines + 1},}`, 'u');
		const allowedLFNewLinesString = '\n'.repeat(maxAdjacentNewlines);
		const allowedCRLFNewLinesString = '\r\n'.repeat(maxAdjacentNewlines);

		root.walkDecls((decl) => {
			const value = getDeclarationValue(decl);

			if (violatedLFNewLinesRegex.test(value) || violatedCRLFNewLinesRegex.test(value)) {
				report({
					message: messages.expected(primary),
					node: decl,
					index: 0,
					endIndex: 0,
					result,
					ruleName,
					fix: () => {
						const newValueString = value
							.replace(new RegExp(violatedLFNewLinesRegex, 'gmu'), allowedLFNewLinesString)
							.replace(new RegExp(violatedCRLFNewLinesRegex, 'gmu'), allowedCRLFNewLinesString);

						setDeclarationValue(decl, newValueString);
					}
				});
			}
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
