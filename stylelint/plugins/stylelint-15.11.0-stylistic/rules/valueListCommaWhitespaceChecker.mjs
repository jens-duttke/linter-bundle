// @ts-nocheck

import isStandardSyntaxDeclaration from 'stylelint/lib/utils/isStandardSyntaxDeclaration.mjs';
import isStandardSyntaxProperty from 'stylelint/lib/utils/isStandardSyntaxProperty.mjs';
import report from 'stylelint/lib/utils/report.mjs';

import styleSearch from '../style-search/index.mjs';

/**
 * @param {{
 *   root: import('postcss').Root,
 *   result: import('stylelint').PostcssResult,
 *   locationChecker: (opts: { source: string, index: number, err: (msg: string) => void }) => void,
 *   checkedRuleName: string,
 *   fix?: ((node: import('postcss').Declaration, index: number) => boolean) | null,
 *   determineIndex?: (declString: string, match: import('style-search').StyleSearchMatch) => number | false,
 * }} options
 */
export default function valueListCommaWhitespaceChecker (options) {
	options.root.walkDecls((decl) => {
		if (!isStandardSyntaxDeclaration(decl) || !isStandardSyntaxProperty(decl.prop)) {
			return;
		}

		const declString = decl.toString();

		styleSearch(
			{
				source: declString,
				target: ',',
				functionArguments: 'skip'
			},
			(match) => {
				const indexToCheckAfter = options.determineIndex ?
					options.determineIndex(declString, match)
					: match.startIndex;

				if (indexToCheckAfter === false) {
					return;
				}

				checkComma(declString, indexToCheckAfter, decl);
			}
		);
	});

	/**
	 * @param {string} source
	 * @param {number} index
	 * @param {import('postcss').Declaration} node
	 * @returns {void}
	 */
	function checkComma (source, index, node) {
		options.locationChecker({
			source,
			index,
			err: (message) => {
				if (options.fix?.(node, index)) {
					return;
				}

				report({
					message,
					node,
					index,
					endIndex: index,
					result: options.result,
					ruleName: options.checkedRuleName,
					fix: (options.fix ? () => options.fix(node, index) : undefined)
				});
			}
		});
	}
}
