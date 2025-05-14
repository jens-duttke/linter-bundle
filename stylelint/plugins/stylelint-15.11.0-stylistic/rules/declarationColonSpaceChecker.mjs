// @ts-nocheck

import isStandardSyntaxDeclaration from 'stylelint/lib/utils/isStandardSyntaxDeclaration.mjs';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';

/** @typedef {(args: { source: string, index: number, lineCheckStr: string, err: (message: string) => void }) => void} LocationChecker */

/**
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: LocationChecker,
 *   fix: ((decl: import('postcss').Declaration, index: number) => boolean) | null,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 * }} options
 */
export default function declarationColonSpaceChecker (options) {
	options.root.walkDecls((decl) => {
		if (!isStandardSyntaxDeclaration(decl)) {
			return;
		}

		// Get the raw prop, and only the prop
		const endOfPropertyIndex = declarationValueIndex(decl) + (decl.raws.between || '').length - 1;

		// The extra characters tacked onto the end ensure that there is a character to check
		// after the colon. Otherwise, with `background:pink` the character after the
		const propertyPlusColon = `${decl.toString().slice(0, endOfPropertyIndex)}xxx`;

		for (let i = 0, l = propertyPlusColon.length; i < l; i++) {
			if (propertyPlusColon[i] !== ':') {
				continue;
			}

			options.locationChecker({
				source: propertyPlusColon,
				index: i,
				lineCheckStr: decl.value,
				err: (message) => {
					report({
						message,
						node: decl,
						index: decl.prop.length + 1,
						endIndex: decl.prop.length + 1,
						result: options.result,
						ruleName: options.checkedRuleName,
						fix: (options.fix ? () => options.fix(decl, i) : undefined)
					});
				}
			});
			break;
		}
	});
}
