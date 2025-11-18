// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import styleSearch from '../../style-search/index.mjs';
import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/selector-list-comma-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ","',
	expectedAfterMultiLine: () => 'Expected newline after "," in a multi-line list',
	rejectedAfterMultiLine: () => 'Unexpected whitespace after "," in a multi-line list'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-list-comma-newline-after/README.md',
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

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			// Get raw selector so we can allow end-of-line comments, e.g.
			// a, /* comment */
			// b {}
			const selector = ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector;

			/** @type {number[]} */
			const fixIndices = [];

			styleSearch(
				{
					source: selector,
					target: ',',
					functionArguments: 'skip'
				},
				(match) => {
					const nextChars = selector.slice(match.endIndex);

					// If there's a // comment, that means there has to be a newline
					// ending the comment so we're fine
					if ((/^\s+\/\//u).test(nextChars)) {
						return;
					}

					// If there are spaces and then a comment begins, look for the newline
					const indextoCheckAfter = (/^\s+\/\*/u).test(nextChars) ?
						selector.indexOf('*/', match.endIndex) + 1
						: match.startIndex;

					checker.afterOneOnly({
						source: selector,
						index: indextoCheckAfter,
						err: (m) => {
							report({
								message: m,
								node: ruleNode,
								index: match.startIndex,
								endIndex: match.startIndex,
								result,
								ruleName,
								fix: () => {
									fixIndices.push(indextoCheckAfter + 1);
								}
							});
						}
					});
				}
			);

			if (fixIndices.length > 0) {
				let fixedSelector = selector;

				for (const index of fixIndices.toSorted((a, b) => b - a)) {
					const beforeSelector = fixedSelector.slice(0, index);
					let afterSelector = fixedSelector.slice(index);

					if (primary.startsWith('always')) {
						afterSelector = context.newline + afterSelector;
					}
					else if (primary.startsWith('never-multi-line')) {
						afterSelector = afterSelector.replace(/^\s*/u, '');
					}

					fixedSelector = beforeSelector + afterSelector;
				}

				if (ruleNode.raws.selector) {
					ruleNode.raws.selector.raw = fixedSelector;
				}
				else {
					ruleNode.selector = fixedSelector;
				}
			}
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
