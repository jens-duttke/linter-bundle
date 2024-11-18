/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import valueParser from 'postcss-value-parser';
import declarationValueIndex from 'stylelint/lib/utils/declarationValueIndex.mjs';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import isStandardSyntaxFunction from 'stylelint/lib/utils/isStandardSyntaxFunction.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';

/** @typedef {import('postcss-value-parser').Node} ValueParserNode */
/** @typedef {import('postcss-value-parser').DivNode} ValueParserDivNode */
/** @typedef {(args: { source: string, index: number, err: (message: string) => void }) => void} LocationChecker */

/**
 * @param {{
 *   root: import('postcss').Root,
 *   locationChecker: LocationChecker,
 *   fix: ((node: ValueParserDivNode, index: number, nodes: ValueParserNode[]) => boolean) | null,
 *   result: import('stylelint').PostcssResult,
 *   checkedRuleName: string,
 * }} opts
 * @param options
 */
export default function functionCommaSpaceChecker (options) {
	options.root.walkDecls((decl) => {
		const declValue = getDeclarationValue(decl);

		let hasFixed;
		const parsedValue = valueParser(declValue);

		parsedValue.walk((valueNode) => {
			if (valueNode.type !== 'function') {
				return;
			}

			if (!isStandardSyntaxFunction(valueNode)) {
				return;
			}

			// Ignore `url()` arguments, which may contain data URIs or other funky stuff
			if (valueNode.value.toLowerCase() === 'url') {
				return;
			}

			const argumentStrings = valueNode.nodes.map((node) => valueParser.stringify(node));

			const functionArguments = (() => {
				// Remove function name and parens
				let result = valueNode.before + argumentStrings.join('') + valueNode.after;

				// 1. Remove comments including preceding whitespace (when only succeeded by whitespace)
				// 2. Remove all other comments, but leave adjacent whitespace intact
				// eslint-disable-next-line regexp/no-dupe-disjunctions -- TODO: Possible to simplify the regex.
				result = result.replace(/( *\/(\*.*\*\/(?!\S)|\/.*)|(\/(\*.*\*\/|\/.*)))/, '');

				return result;
			})();

			/**
			 * Gets the index of the comma for checking.
			 * @param {ValueParserDivNode} commaNode - The comma node
			 * @param {number} nodeIndex - The index of the comma node
			 * @returns {number} The index of the comma for checking
			 */
			const getCommaCheckIndex = (commaNode, nodeIndex) => {
				let commaBefore =
					valueNode.before + argumentStrings.slice(0, nodeIndex).join('') + commaNode.before;

				// 1. Remove comments including preceding whitespace (when only succeeded by whitespace)
				// 2. Remove all other comments, but leave adjacent whitespace intact
				// eslint-disable-next-line regexp/no-dupe-disjunctions -- TODO: Possible to simplify the regex.
				commaBefore = commaBefore.replace(/( *\/(\*.*\*\/(?!\S)|\/.*)|(\/(\*.*\*\/|\/.*)))/, '');

				return commaBefore.length;
			};

			/** @type {{ commaNode: ValueParserDivNode, checkIndex: number, nodeIndex: number }[]} */
			const commaDataList = [];

			for (const [nodeIndex, node] of valueNode.nodes.entries()) {
				if (node.type !== 'div' || node.value !== ',') {
					continue;
				}

				const checkIndex = getCommaCheckIndex(node, nodeIndex);

				commaDataList.push({
					commaNode: node,
					checkIndex,
					nodeIndex
				});
			}

			for (const { commaNode, checkIndex, nodeIndex } of commaDataList) {
				options.locationChecker({
					source: functionArguments,
					index: checkIndex,
					err: (message) => {
						const index =
							declarationValueIndex(decl) + commaNode.sourceIndex + commaNode.before.length;

						if (options.fix?.(commaNode, nodeIndex, valueNode.nodes)) {
							hasFixed = true;

							return;
						}

						report({
							index,
							message,
							node: decl,
							result: options.result,
							ruleName: options.checkedRuleName
						});
					}
				});
			}
		});

		if (hasFixed) {
			setDeclarationValue(decl, parsedValue.toString());
		}
	});
};