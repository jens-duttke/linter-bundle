/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import{ isNumber } from 'stylelint/lib/utils/validateTypes.mjs';

const ruleName = 'plugin/function-max-empty-lines';

const messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} empty ${max === 1 ? 'line' : 'lines'}`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/function-max-empty-lines/README.md',
	fixable: true
};

/**
 * @param {import('postcss').Declaration} decl
 */
function placeIndexOnValueStart (decl) {
	if (decl.raws.between == null) { throw new Error('`between` must be present'); }

	return decl.prop.length + decl.raws.between.length - 1;
}

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => {
	const maxAdjacentNewlines = primary + 1;

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: isNumber
		});

		if (!validOptions) {
			return;
		}

		const violatedCRLFNewLinesRegex = new RegExp(`(?:\r\n){${maxAdjacentNewlines + 1},}`);
		const violatedLFNewLinesRegex = new RegExp(`\n{${maxAdjacentNewlines + 1},}`);
		const allowedLFNewLinesString = '\n'.repeat(maxAdjacentNewlines);
		const allowedCRLFNewLinesString = '\r\n'.repeat(maxAdjacentNewlines);

		root.walkDecls((decl) => {
			if (!decl.value.includes('(')) {
				return;
			}

			const stringValue = getDeclarationValue(decl);
			/** @type {Array<[string, string]>} */
			const splittedValue = [];
			let sourceIndexStart = 0;

			valueParser(stringValue).walk((node) => {
				if (
					node.type !== 'function' /* ignore non functions */ ||
					node.value.length === 0 /* ignore sass lists */
				) {
					return;
				}

				const stringifiedNode = valueParser.stringify(node);

				if (
					!violatedLFNewLinesRegex.test(stringifiedNode) &&
					!violatedCRLFNewLinesRegex.test(stringifiedNode)
				) {
					return;
				}

				report({
					message: messages.expected(primary),
					node: decl,
					index: placeIndexOnValueStart(decl) + node.sourceIndex,
					endIndex: placeIndexOnValueStart(decl) + node.sourceIndex,
					result,
					ruleName,
					fix: () => {
						const newNodeString = stringifiedNode
							.replace(new RegExp(violatedLFNewLinesRegex, 'gm'), allowedLFNewLinesString)
							.replace(new RegExp(violatedCRLFNewLinesRegex, 'gm'), allowedCRLFNewLinesString);

						splittedValue.push([
							stringValue.slice(sourceIndexStart, node.sourceIndex),
							newNodeString
						]);
						sourceIndexStart = node.sourceIndex + stringifiedNode.length;
					}
				});
			});

			if (splittedValue.length > 0) {
				const updatedValue =
					splittedValue.reduce((accumulator, current) => accumulator + current[0] + current[1], '') +
					stringValue.slice(sourceIndexStart);

				setDeclarationValue(decl, updatedValue);
			}
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
