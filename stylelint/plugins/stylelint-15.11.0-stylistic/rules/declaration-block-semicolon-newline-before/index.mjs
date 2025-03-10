/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import blockString from 'stylelint/lib/utils/blockString.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule, isRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/declaration-block-semicolon-newline-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: () => 'Expected newline before ";"',
	expectedBeforeMultiLine: () => 'Expected newline before ";" in a multi-line declaration block',
	rejectedBeforeMultiLine: () => 'Unexpected whitespace before ";" in a multi-line declaration block'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-block-semicolon-newline-before/README.md'
};

/** @type {import('stylelint').Rule} */
const rule = (primary) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-multi-line', 'never-multi-line']
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			const parentRule = decl.parent;

			if (!parentRule) { throw new Error('A parent node must be present'); }

			if (!isAtRule(parentRule) && !isRule(parentRule)) {
				return;
			}

			if (!parentRule.raws.semicolon && parentRule.last === decl) {
				return;
			}

			const declString = decl.toString();

			checker.beforeAllowingIndentation({
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
						ruleName
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
