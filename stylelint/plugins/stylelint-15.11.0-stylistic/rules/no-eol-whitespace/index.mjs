// @ts-nocheck

import stylelint from 'stylelint';
import isOnlyWhitespace from 'stylelint/lib/utils/isOnlyWhitespace.mjs';
import isStandardSyntaxComment from 'stylelint/lib/utils/isStandardSyntaxComment.mjs';
import optionsMatches from 'stylelint/lib/utils/optionsMatches.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule, isComment, isDeclaration, isRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import styleSearch from '../../style-search/index.mjs';

const ruleName = 'plugin/no-eol-whitespace';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected whitespace at end of line'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/no-eol-whitespace/README.md',
	fixable: true
};

const whitespacesToReject = new Set([' ', '\t']);

/**
 * @param {string} str
 * @returns {string}
 */
function fixString (str) {
	return str.replace(/[\t ]+$/u, '');
}

/**
 * @param {number} lastEOLIndex
 * @param {string} string
 * @param {{ ignoreEmptyLines: boolean, isRootFirst: boolean }} options
 * @returns {number}
 */
function findErrorStartIndex (lastEOLIndex, string, { ignoreEmptyLines, isRootFirst }) {
	const eolWhitespaceIndex = lastEOLIndex - 1;

	// If the character before newline is not whitespace, ignore
	if (!whitespacesToReject.has(string.charAt(eolWhitespaceIndex))) {
		return -1;
	}

	if (ignoreEmptyLines) {
		// If there is only whitespace between the previous newline and
		// this newline, ignore
		const beforeNewlineIndex = string.lastIndexOf('\n', eolWhitespaceIndex);

		if (beforeNewlineIndex >= 0 || isRootFirst) {
			const line = string.substring(beforeNewlineIndex, eolWhitespaceIndex);

			if (isOnlyWhitespace(line)) {
				return -1;
			}
		}
	}

	return eolWhitespaceIndex;
}

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions) => (root, result) => {
	const validOptions = validateOptions(
		result,
		ruleName,
		{
			actual: primary
		},
		{
			optional: true,
			actual: secondaryOptions,
			possible: {
				ignore: ['empty-lines']
			}
		}
	);

	if (!validOptions) {
		return;
	}

	const ignoreEmptyLines = optionsMatches(secondaryOptions, 'ignore', 'empty-lines');

	const rootString = root.toString();

	/**
	 * @param {number} index
	 */
	const reportFromIndex = (index) => {
		report({
			message: messages.rejected,
			node: root,
			index,
			endIndex: index,
			result,
			ruleName,
			fix: () => {
				fix(root);
			}
		});
	};

	eachEolWhitespace(rootString, reportFromIndex, true);

	const errorIndex = findErrorStartIndex(rootString.length, rootString, {
		ignoreEmptyLines,
		isRootFirst: true
	});

	if (errorIndex > -1) {
		reportFromIndex(errorIndex);
	}

	/**
	 * Iterate each whitespace at the end of each line of the given string.
	 *
	 * @param {string} string - the source code string
	 * @param {(index: number) => void} callback - callback the whitespace index at the end of each line
	 * @param {boolean} isRootFirst - set `true` if the given string is the first token of the root
	 * @returns {void}
	 */
	function eachEolWhitespace (string, callback, isRootFirst) {
		styleSearch(
			{
				source: string,
				target: ['\n', '\r'],
				comments: 'check'
			},
			(match) => {
				const index = findErrorStartIndex(match.startIndex, string, {
					ignoreEmptyLines,
					isRootFirst
				});

				if (index > -1) {
					callback(index);
				}
			}
		);
	}

	/**
	 * @param {import('postcss').Root} rootNode
	 */
	function fix (rootNode) {
		let isRootFirst = true;

		rootNode.walk((node) => {
			fixText(
				node.raws.before,
				(fixed) => {
					node.raws.before = fixed;
				},
				isRootFirst
			);
			isRootFirst = false;

			if (isAtRule(node)) {
				fixText(node.raws.afterName, (fixed) => {
					node.raws.afterName = fixed;
				});

				const rawsParameters = node.raws.params;

				if (rawsParameters) {
					fixText(rawsParameters.raw, (fixed) => {
						rawsParameters.raw = fixed;
					});
				}
				else {
					fixText(node.params, (fixed) => {
						node.params = fixed;
					});
				}
			}

			if (isRule(node)) {
				const rawsSelector = node.raws.selector;

				if (rawsSelector) {
					fixText(rawsSelector.raw, (fixed) => {
						rawsSelector.raw = fixed;
					});
				}
				else {
					fixText(node.selector, (fixed) => {
						node.selector = fixed;
					});
				}
			}

			if (isAtRule(node) || isRule(node) || isDeclaration(node)) {
				fixText(node.raws.between, (fixed) => {
					node.raws.between = fixed;
				});
			}

			if (isDeclaration(node)) {
				const rawsValue = node.raws.value;

				if (rawsValue) {
					fixText(rawsValue.raw, (fixed) => {
						rawsValue.raw = fixed;
					});
				}
				else {
					fixText(node.value, (fixed) => {
						node.value = fixed;
					});
				}
			}

			if (isComment(node)) {
				fixText(node.raws.left, (fixed) => {
					node.raws.left = fixed;
				});

				if (!isStandardSyntaxComment(node)) {
					node.raws.right = node.raws.right && fixString(node.raws.right);
				}
				else {
					fixText(node.raws.right, (fixed) => {
						node.raws.right = fixed;
					});
				}

				fixText(node.text, (fixed) => {
					node.text = fixed;
				});
			}

			if (isAtRule(node) || isRule(node)) {
				fixText(node.raws.after, (fixed) => {
					node.raws.after = fixed;
				});
			}
		});

		fixText(
			rootNode.raws.after,
			(fixed) => {
				rootNode.raws.after = fixed;
			},
			isRootFirst
		);

		if (typeof rootNode.raws.after === 'string') {
			const lastEOL = Math.max(
				rootNode.raws.after.lastIndexOf('\n'),
				rootNode.raws.after.lastIndexOf('\r')
			);

			if (lastEOL !== rootNode.raws.after.length - 1) {
				rootNode.raws.after =
						rootNode.raws.after.slice(0, lastEOL + 1) +
						fixString(rootNode.raws.after.slice(lastEOL + 1));
			}
		}
	}

	/**
	 * @param {string | undefined} value
	 * @param {(text: string) => void} fixFn
	 * @param {boolean} isRootFirst
	 */
	function fixText (value, fixFn, isRootFirst = false) {
		if (!value) {
			return;
		}

		let fixed = '';
		let lastIndex = 0;

		eachEolWhitespace(
			value,
			(index) => {
				const newlineIndex = index + 1;

				fixed += fixString(value.slice(lastIndex, newlineIndex));
				lastIndex = newlineIndex;
			},
			isRootFirst
		);

		if (lastIndex) {
			fixed += value.slice(lastIndex);
			fixFn(fixed);
		}
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
