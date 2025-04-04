/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import isStandardSyntaxDeclaration from 'stylelint/lib/utils/isStandardSyntaxDeclaration.mjs';
import report from 'stylelint/lib/utils/report.mjs';

/** @typedef {(args: { source: string, index: number, lineCheckStr: string, err: (message: string) => void }) => void} LocationChecker */

/**
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: LocationChecker,
 *   fix: ((decl: import('postcss').Declaration, index: number) => boolean) | null,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 * }} opts
 */
export default function declarationColonSpaceChecker(opts) {
	opts.root.walkDecls((decl) => {
		if (!isStandardSyntaxDeclaration(decl)) {
			return;
		}

		// Get the raw prop, and only the prop
		const endOfPropIndex = declarationValueIndex(decl) + (decl.raws.between || '').length - 1;

		// The extra characters tacked onto the end ensure that there is a character to check
		// after the colon. Otherwise, with `background:pink` the character after the
		const propPlusColon = `${decl.toString().slice(0, endOfPropIndex)}xxx`;

		for (let i = 0, l = propPlusColon.length; i < l; i++) {
			if (propPlusColon[i] !== ':') {
				continue;
			}

			opts.locationChecker({
				source: propPlusColon,
				index: i,
				lineCheckStr: decl.value,
				err: (message) => {
					report({
						message,
						node: decl,
						index: decl.prop.toString().length + 1,
						endIndex: decl.prop.toString().length + 1,
						result: opts.result,
						ruleName: opts.checkedRuleName,
						fix: (opts.fix ? () => opts.fix(decl, i) : undefined)
					});
				},
			});
			break;
		}
	});
};
