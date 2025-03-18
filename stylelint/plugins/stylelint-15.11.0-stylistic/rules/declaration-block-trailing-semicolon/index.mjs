/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import hasBlock from 'stylelint/lib/utils/hasBlock.mjs';
import optionsMatches from 'stylelint/lib/utils/optionsMatches.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/declaration-block-trailing-semicolon';

const messages = ruleMessages(ruleName, {
	expected: 'Expected a trailing semicolon',
	rejected: 'Unexpected trailing semicolon'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-block-trailing-semicolon/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(
		result,
		ruleName,
		{
			actual: primary,
			possible: ['always', 'never']
		},
		{
			actual: secondaryOptions,
			possible: {
				ignore: ['single-declaration']
			},
			optional: true
		}
	);

	if (!validOptions) {
		return;
	}

	root.walkAtRules((atRule) => {
		if (!atRule.parent) { throw new Error('A parent node must be present'); }

		if (atRule.parent === root) {
			return;
		}

		if (atRule !== atRule.parent.last) {
			return;
		}

		if (hasBlock(atRule)) {
			return;
		}

		checkLastNode(atRule);
	});

	root.walkDecls((decl) => {
		if (!decl.parent) { throw new Error('A parent node must be present'); }

		if (decl.parent.type === 'object') {
			return;
		}

		if (decl !== decl.parent.last) {
			return;
		}

		checkLastNode(decl);
	});

	/**
	 * @param {import('postcss').Node} node
	 */
	function checkLastNode (node) {
		if (!node.parent) { throw new Error('A parent node must be present'); }

		const hasSemicolon = node.parent.raws.semicolon;
		const ignoreSingleDeclaration = optionsMatches(
			secondaryOptions,
			'ignore',
			'single-declaration'
		);

		if (ignoreSingleDeclaration && node.parent.first === node) {
			return;
		}

		let message;

		if (primary === 'always') {
			if (hasSemicolon) {
				return;
			}

			// auto-fix
			if (context.fix) {
				node.parent.raws.semicolon = true;

				if (isAtRule(node)) {
					node.raws.between = '';
					node.parent.raws.after = ' ';
				}

				return;
			}

			message = messages.expected;
		}
		else if (primary === 'never') {
			if (!hasSemicolon) {
				return;
			}

			// auto-fix
			if (context.fix) {
				node.parent.raws.semicolon = false;

				return;
			}

			message = messages.rejected;
		}
		else {
			throw new Error(`Unexpected primary option: "${primary}"`);
		}

		report({
			message,
			node,
			index: node.toString().trim().length - 1,
			endIndex: node.toString().trim().length - 1,
			result,
			ruleName
		});
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
