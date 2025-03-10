/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import blockString from 'stylelint/lib/utils/blockString.mjs';
import rawNodeString from 'stylelint/lib/utils/rawNodeString.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule, isRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import nextNonCommentNode from '../../utils/nextNonCommentNode.mjs';
import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/declaration-block-semicolon-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ";"',
	expectedAfterMultiLine: () => 'Expected newline after ";" in a multi-line declaration block',
	rejectedAfterMultiLine: () => 'Unexpected newline after ";" in a multi-line declaration block'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-block-semicolon-newline-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
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
			// Ignore last declaration if there's no trailing semicolon
			const parentRule = decl.parent;

			if (!parentRule) { throw new Error('A parent node must be present'); }

			if (!isAtRule(parentRule) && !isRule(parentRule)) {
				return;
			}

			if (!parentRule.raws.semicolon && parentRule.last === decl) {
				return;
			}

			const nextNode = decl.next();

			if (!nextNode) {
				return;
			}

			// Allow end-of-line comment
			const nodeToCheck = nextNonCommentNode(nextNode);

			if (!nodeToCheck) {
				return;
			}

			checker.afterOneOnly({
				source: rawNodeString(nodeToCheck),
				index: -1,
				lineCheckStr: blockString(parentRule),
				err: (m) => {
					report({
						message: m,
						node: decl,
						index: decl.toString().length + 1,
						endIndex: decl.toString().length + 1,
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
