// @ts-nocheck

import stylelint from 'stylelint';
import getDeclarationValue from 'stylelint/lib/utils/getDeclarationValue.mjs';
import isWhitespace from 'stylelint/lib/utils/isWhitespace.mjs';
import { atRuleParamIndex, declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import setDeclarationValue from 'stylelint/lib/utils/setDeclarationValue.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import styleSearch from '../../style-search/index.mjs';

const ruleName = 'plugin/function-whitespace-after';

const messages = ruleMessages(ruleName, {
	expected: 'Expected whitespace after ")"',
	rejected: 'Unexpected whitespace after ")"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/function-whitespace-after/README.md',
	fixable: true
};

const ACCEPTABLE_AFTER_CLOSING_PAREN = new Set([')', ',', '}', ':', '/', undefined]);

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['always', 'never']
	});

	if (!validOptions) {
		return;
	}

	/**
	 * @param {import('postcss').Node} node
	 * @param {string} value
	 * @param {number} nodeIndex
	 * @param {((index: number) => void) | undefined} fix
	 */
	function check (node, value, nodeIndex, fix) {
		styleSearch(
			{
				source: value,
				target: ')',
				functionArguments: 'only'
			},
			(match) => {
				checkClosingParen(value, match.startIndex + 1, node, nodeIndex, fix);
			}
		);
	}

	/**
	 * @param {string} source
	 * @param {number} index
	 * @param {import('postcss').Node} node
	 * @param {number} nodeIndex
	 * @param {((index: number) => void) | undefined} fix
	 */
	function checkClosingParen (source, index, node, nodeIndex, fix) {
		const nextChar = source.charAt(index);

		if (!nextChar) { return; }

		if (primary === 'always') {
			// Allow for the next character to be a single empty space,
			// another closing parenthesis, a comma, or the end of the value
			if (nextChar === ' ') {
				return;
			}

			if (nextChar === '\n') {
				return;
			}

			if (source.slice(index, index + 2) === '\r\n') {
				return;
			}

			if (ACCEPTABLE_AFTER_CLOSING_PAREN.has(nextChar)) {
				return;
			}

			report({
				message: messages.expected,
				node,
				index: nodeIndex + index,
				endIndex: nodeIndex + index,
				result,
				ruleName,
				fix: () => {
					fix(index);
				}
			});
		}
		else if (primary === 'never' && isWhitespace(nextChar)) {
			report({
				message: messages.rejected,
				node,
				index: nodeIndex + index,
				endIndex: nodeIndex + index,
				result,
				ruleName,
				fix: () => {
					fix(index);
				}
			});
		}
	}

	/**
	 * @param {string} value
	 */
	function createFixer (value) {
		let fixed = '';
		let lastIndex = 0;
		/** @type {(index: number) => void} */
		let applyFix;

		if (primary === 'always') {
			applyFix = (index) => {
				fixed += value.slice(lastIndex, index) + ' ';
				lastIndex = index;
			};
		}
		else if (primary === 'never') {
			applyFix = (index) => {
				let whitespaceEndIndex = index + 1;

				while (
					whitespaceEndIndex < value.length &&
						isWhitespace(value.charAt(whitespaceEndIndex))
				) {
					whitespaceEndIndex++;
				}

				fixed += value.slice(lastIndex, index);
				lastIndex = whitespaceEndIndex;
			};
		}
		else {
			throw new Error(`Unexpected option: "${primary}"`);
		}

		return {
			applyFix,
			get hasFixed () {
				return Boolean(lastIndex);
			},
			get fixed () {
				return fixed + value.slice(lastIndex);
			}
		};
	}

	root.walkAtRules(/^import$/iu, (atRule) => {
		const parameter = (atRule.raws.params?.raw) || atRule.params;
		const fixer = createFixer(parameter);

		check(atRule, parameter, atRuleParamIndex(atRule), fixer ? fixer.applyFix : undefined);

		if (fixer && fixer.hasFixed) {
			if (atRule.raws.params) {
				atRule.raws.params.raw = fixer.fixed;
			}
			else {
				atRule.params = fixer.fixed;
			}
		}
	});
	root.walkDecls((decl) => {
		const value = getDeclarationValue(decl);
		const fixer = createFixer(value);

		check(decl, value, declarationValueIndex(decl), fixer ? fixer.applyFix : undefined);

		if (fixer && fixer.hasFixed) {
			setDeclarationValue(decl, fixer.fixed);
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
