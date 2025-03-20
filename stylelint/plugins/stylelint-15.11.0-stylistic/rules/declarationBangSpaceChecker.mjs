/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';

import styleSearch from '../style-search/index.mjs';

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
export default function declarationBangSpaceChecker (options) {
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
				report({
					message,
					node: decl,
					index,
					endIndex: index,
					result: options.result,
					ruleName: options.checkedRuleName,
					fix: (options.fix ? () => options.fix(decl, index) : undefined)
				});
			}
		});
	}
};
