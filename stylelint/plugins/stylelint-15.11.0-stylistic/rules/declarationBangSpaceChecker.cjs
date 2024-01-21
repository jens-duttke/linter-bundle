/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const declarationValueIndex = require('stylelint/lib/utils/declarationValueIndex.cjs');
const report = require('stylelint/lib/utils/report.cjs');

const styleSearch = require('../style-search/index.cjs');

/** @typedef {import('postcss').Declaration} Declaration */

/** @typedef {(args: { source: string, index: number, err: (message: string) => void }) => void} LocationChecker */

/**
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: LocationChecker,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 *   fix: ((decl: Declaration, index: number) => boolean) | null,
 * }} opts
 * @param options
 * @returns {void}
 */
module.exports = function declarationBangSpaceChecker (options) {
	options.root.walkDecls((decl) => {
		const indexOffset = declarationValueIndex(decl);
		const declString = decl.toString();
		const valueString = decl.toString().slice(indexOffset);

		if (!valueString.includes('!')) {
			return;
		}

		styleSearch({ source: valueString, target: '!' }, (match) => {
			check(declString, match.startIndex + indexOffset, decl);
		});
	});

	/**
	 * @param {string} source
	 * @param {number} index
	 * @param {Declaration} decl
	 */
	function check (source, index, decl) {
		options.locationChecker({
			source,
			index,
			err: (message) => {
				if (options.fix?.(decl, index)) {
					return;
				}

				report({
					message,
					node: decl,
					index,
					result: options.result,
					ruleName: options.checkedRuleName
				});
			}
		});
	}
};
