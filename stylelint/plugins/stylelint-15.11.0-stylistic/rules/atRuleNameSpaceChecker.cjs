/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const isStandardSyntaxAtRule = require('stylelint/lib/utils/isStandardSyntaxAtRule.cjs');
const report = require('stylelint/lib/utils/report.cjs');

/**
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: (opts: { source: string, index: number, err: (msg: string) => void, errTarget: string }) => void,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 *   fix?: ((atRule: import('postcss').AtRule) => void) | null,
 * }} options
 */
module.exports = function atRuleNameSpaceChecker (options) {
	options.root.walkAtRules((atRule) => {
		if (!isStandardSyntaxAtRule(atRule)) {
			return;
		}

		checkColon(
			`@${atRule.name}${atRule.raws.afterName || ''}${atRule.params}`,
			atRule.name.length,
			atRule
		);
	});

	/**
	 * @param {string} source
	 * @param {number} index
	 * @param {import('postcss').AtRule} node
	 */
	function checkColon (source, index, node) {
		options.locationChecker({
			source,
			index,
			err: (m) => {
				if (options.fix) {
					options.fix(node);

					return;
				}

				report({
					message: m,
					node,
					index,
					result: options.result,
					ruleName: options.checkedRuleName
				});
			},
			errTarget: `@${node.name}`
		});
	}
};
