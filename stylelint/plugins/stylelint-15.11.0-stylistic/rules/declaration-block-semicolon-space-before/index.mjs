// @ts-nocheck

import stylelint from 'stylelint';
import blockString from 'stylelint/lib/utils/blockString.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import { isAtRule, isRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/declaration-block-semicolon-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected single space before ";"',
	rejectedBefore: () => 'Unexpected whitespace before ";"',
	expectedBeforeSingleLine: () => 'Expected single space before ";" in a single-line declaration block',
	rejectedBeforeSingleLine: () => 'Unexpected whitespace before ";" in a single-line declaration block'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-block-semicolon-space-before/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never', 'always-single-line', 'never-single-line']
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			// Ignore last declaration if there's no trailing semicolon
			const parentRule = decl.parent;

			if (!parentRule) { throw new Error('A parent node must be present'); }

			if (!isAtRule(parentRule) && !isRule(parentRule)) {
				return;
			}

			if (!parentRule.raws.semicolon && parentRule.last === decl) {
				return;
			}

			const declString = decl.toString();

			checker.before({
				source: declString,
				index: declString.length,
				lineCheckStr: blockString(parentRule),
				err: (m) => {
					report({
						message: m,
						node: decl,
						index: decl.toString().length - 1,
						endIndex: decl.toString().length - 1,
						result,
						ruleName,
						fix: () => {
							const value = getDeclarationValue(decl);

							if (primary.startsWith('always')) {
								if (decl.important) {
									decl.raws.important = ' !important ';
								}
								else {
									setDeclarationValue(decl, value.replace(/\s*$/u, ' '));
								}

								return;
							}

							if (primary.startsWith('never')) {
								if (decl.raws.important) {
									decl.raws.important = decl.raws.important.replace(/\s*$/u, '');
								}
								else {
									setDeclarationValue(decl, value.replace(/\s*$/u, ''));
								}

								return;
							}
						}
					});
				}
			});
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
