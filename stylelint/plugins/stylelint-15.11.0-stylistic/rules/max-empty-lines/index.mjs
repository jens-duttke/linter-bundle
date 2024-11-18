/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import optionsMatches from 'stylelint/lib/utils/optionsMatches.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import{ isNumber } from 'stylelint/lib/utils/validateTypes.mjs';

import styleSearch from '../../style-search/index.mjs';

const ruleName = 'plugin/max-empty-lines';

const messages = ruleMessages(ruleName, {
	expected: (max) => `Expected no more than ${max} empty ${max === 1 ? 'line' : 'lines'}`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/max-empty-lines/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions, context) => {
	let emptyLines = 0;
	let lastIndex = -1;

	return (root, result) => {
		const validOptions = validateOptions(
			result,
			ruleName,
			{
				actual: primary,
				possible: isNumber
			},
			{
				actual: secondaryOptions,
				possible: {
					ignore: ['comments']
				},
				optional: true
			}
		);

		if (!validOptions) {
			return;
		}

		const ignoreComments = optionsMatches(secondaryOptions, 'ignore', 'comments');
		const getChars = replaceEmptyLines.bind(null, primary);

		emptyLines = 0;
		lastIndex = -1;
		const rootString = root.toString();

		styleSearch(
			{
				source: rootString,
				target: rootString.includes('\r\n') ? '\r\n' : '\n',
				comments: ignoreComments ? 'skip' : 'check'
			},
			(match) => {
				checkMatch(rootString, match.startIndex, match.endIndex, root);
			}
		);

		/**
		 * @param {string} source
		 * @param {number} matchStartIndex
		 * @param {number} matchEndIndex
		 * @param {import('postcss').Root} node
		 */
		function checkMatch (source, matchStartIndex, matchEndIndex, node) {
			const eof = matchEndIndex === source.length;
			let problem = false;

			// Additional check for beginning of file
			if (!matchStartIndex || lastIndex === matchStartIndex) {
				emptyLines++;
			}
			else {
				emptyLines = 0;
			}

			lastIndex = matchEndIndex;

			if (emptyLines > primary) { problem = true; }

			if (!eof && !problem) { return; }

			if (problem) {
				report({
					message: messages.expected(primary),
					node,
					index: matchStartIndex,
					result,
					ruleName
				});
			}

			// Additional check for end of file
			if (eof && primary) {
				emptyLines++;

				if (emptyLines > primary && isEofNode(result.root, node)) {
					report({
						message: messages.expected(primary),
						node,
						index: matchEndIndex,
						result,
						ruleName
					});
				}
			}
		}

		/**
		 * @param {number} maxLines
		 * @param {unknown} str
		 * @param string_
		 * @param {boolean?} isSpecialCase
		 */
		function replaceEmptyLines (maxLines, string_, isSpecialCase = false) {
			const repeatTimes = isSpecialCase ? maxLines : maxLines + 1;

			if (repeatTimes === 0 || typeof string_ !== 'string') {
				return '';
			}

			const emptyLFLines = '\n'.repeat(repeatTimes);
			const emptyCRLFLines = '\r\n'.repeat(repeatTimes);

			return (/(?:\r\n)+/).test(string_) ?
				string_.replace(/(\r\n)+/g, ($1) => {
					if ($1.length / 2 > repeatTimes) {
						return emptyCRLFLines;
					}

					return $1;
				  })
				: string_.replace(/(\n)+/g, ($1) => {
					if ($1.length > repeatTimes) {
						return emptyLFLines;
					}

					return $1;
				  });
		}
	};
};

/**
 * Checks whether the given node is the last node of file.
 * @param {import('stylelint').PostcssResult['root']} document - the document node with `postcss-html` and `postcss-jsx`
 * @param {import('postcss').Root} root - the root node of css
 */
function isEofNode (document, root) {
	if (!document || document.constructor.name !== 'Document' || !('type' in document)) {
		return true;
	}

	// In the `postcss-html` and `postcss-jsx` syntax, checks that there is text after the given node.
	let after;

	if (root === document.last) {
		after = document.raws?.codeAfter;
	}
	else {
		// @ts-expect-error -- TS2345: Argument of type 'Root' is not assignable to parameter of type 'number | ChildNode'.
		const rootIndex = document.index(root);

		const nextNode = document.nodes[rootIndex + 1];

		after = nextNode.raws.codeBefore;
	}

	return !String(after).trim();
}

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
