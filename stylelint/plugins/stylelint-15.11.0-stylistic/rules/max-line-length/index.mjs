// @ts-nocheck

import stylelint from 'stylelint';
import optionsMatches from 'stylelint/lib/utils/optionsMatches.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';
import { isNumber, isRegExp, isString, assert } from 'stylelint/lib/utils/validateTypes.mjs';

import styleSearch from '../../style-search/index.mjs';

const ruleName = 'plugin/max-line-length';

const messages = ruleMessages(ruleName, {
	expected: (max) => `Expected line length to be no more than ${max} ${max === 1 ? 'character' : 'characters'}`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/max-line-length/README.md'
};

/** @type {import('stylelint').Rule} */
const rule = (primary, secondaryOptions) => (root, result) => {
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
				ignore: ['non-comments', 'comments'],
				ignorePattern: [isString, isRegExp]
			},
			optional: true
		}
	);

	if (!validOptions) {
		return;
	}

	if (root.source == null) {
		throw new Error('The root node must have a source');
	}

	const EXCLUDED_PATTERNS = [
		/url\(\s*(\S.*\S)\s*\)/giu, // allow tab, whitespace in url content
		/@import\s+(["'].*["'])/giu
	];

	const ignoreNonComments = optionsMatches(secondaryOptions, 'ignore', 'non-comments');
	const ignoreComments = optionsMatches(secondaryOptions, 'ignore', 'comments');
	const rootString = root.toString();
	// Array of skipped sub strings, i.e `url(...)`, `@import "..."`
	/** @type {Array<[number, number]>} */
	let skippedSubStrings = [];
	let skippedSubStringsIndex = 0;

	for (const pattern of EXCLUDED_PATTERNS) {
		for (const match of rootString.matchAll(pattern)) {
			const subMatch = match[1] || '';
			const startOfSubString = (match.index || 0) + (match[0] || '').indexOf(subMatch);

			skippedSubStrings.push([startOfSubString, startOfSubString + subMatch.length]);
		}
	}

	skippedSubStrings = skippedSubStrings.sort((a, b) => a[0] - b[0]);

	// Check first line
	checkNewline({ endIndex: 0 });
	// Check subsequent lines
	styleSearch({ source: rootString, target: ['\n'], comments: 'check' }, (match) => checkNewline(match));

	/**
	 * @param {number} index
	 */
	function complain (index) {
		report({
			index,
			endIndex: index,
			result,
			ruleName,
			message: messages.expected(primary),
			node: root
		});
	}

	/**
	 * @param {number} start
	 * @param {number} end
	 */
	function tryToPopSubString (start, end) {
		const skippedSubString = skippedSubStrings[skippedSubStringsIndex];

		assert(skippedSubString);
		const [startSubString, endSubString] = skippedSubString;

		// Excluded substring does not presented in current line
		if (end < startSubString) {
			return 0;
		}

		// Compute excluded substring size regarding to current line indexes
		const excluded = Math.min(end, endSubString) - Math.max(start, startSubString);

		// Current substring is out of range for next lines
		if (endSubString <= end) {
			skippedSubStringsIndex++;
		}

		return excluded;
	}

	/**
	 * @param {import('style-search').StyleSearchMatch | { endIndex: number }} match
	 */
	function checkNewline (match) {
		let nextNewlineIndex = rootString.indexOf('\n', match.endIndex);

		if (rootString[nextNewlineIndex - 1] === '\r') {
			nextNewlineIndex -= 1;
		}

		// Accommodate last line
		if (nextNewlineIndex === -1) {
			nextNewlineIndex = rootString.length;
		}

		const rawLineLength = nextNewlineIndex - match.endIndex;
		const excludedLength = skippedSubStrings[skippedSubStringsIndex] ?
				tryToPopSubString(match.endIndex, nextNewlineIndex)
				: 0;
		const lineText = rootString.slice(match.endIndex, nextNewlineIndex);

		// Case sensitive ignorePattern match
		if (optionsMatches(secondaryOptions, 'ignorePattern', lineText)) {
			return;
		}

		// If the line's length is less than or equal to the specified
		// max, ignore it ... So anything below is liable to be complained about.
		// **Note that the length of any url arguments or import urls
		// are excluded from the calculation.**
		if (rawLineLength - excludedLength <= primary) {
			return;
		}

		const complaintIndex = nextNewlineIndex - 1;

		if (ignoreComments) {
			if ('insideComment' in match && match.insideComment) {
				return;
			}

			// This trimming business is to notice when the line starts a
			// comment but that comment is indented, e.g.
			//       /* something here */
			const nextTwoChars = rootString.slice(match.endIndex).trim().slice(0, 2);

			if (nextTwoChars === '/*' || nextTwoChars === '//') {
				return;
			}
		}

		if (ignoreNonComments) {
			if ('insideComment' in match && match.insideComment) {
				return complain(complaintIndex);
			}

			// This trimming business is to notice when the line starts a
			// comment but that comment is indented, e.g.
			//       /* something here */
			const nextTwoChars = rootString.slice(match.endIndex).trim().slice(0, 2);

			if (nextTwoChars !== '/*' && nextTwoChars !== '//') {
				return;
			}

			return complain(complaintIndex);
		}

		// If there are no spaces besides initial (indent) spaces, ignore it
		const lineString = rootString.slice(match.endIndex, nextNewlineIndex);

		if (!lineString.replace(/^\s+/u, '').includes(' ')) {
			return;
		}

		return complain(complaintIndex);
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
