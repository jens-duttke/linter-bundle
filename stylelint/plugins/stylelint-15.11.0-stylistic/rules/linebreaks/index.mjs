/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import postcss from 'postcss';
import stylelint from 'stylelint';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/linebreaks';

const messages = ruleMessages(ruleName, {
	expected: (linebreak) => `Expected linebreak to be ${linebreak}`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/linebreaks/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['unix', 'windows']
	});

	if (!validOptions) {
		return;
	}

	const shouldHaveCR = primary === 'windows';

	if (root.source == null) { throw new Error('The root node must have a source'); }

	const lines = root.source.input.css.split('\n');

	for (let [i, line] of lines.entries()) {
		if (i < lines.length - 1 && !line.includes('\r')) {
			line += '\n';
		}

		if (hasError(line)) {
			const lineNum = i + 1;
			const colNumber = line.length;

			reportNewlineError(lineNum, colNumber);
		}
	}

	/**
	 * @param {string} dataToCheck
	 */
	function hasError (dataToCheck) {
		const hasNewlineToVerify = (/[\n\r]/).test(dataToCheck);
		const hasCR = hasNewlineToVerify ? dataToCheck.includes('\r') : false;

		return hasNewlineToVerify && hasCR !== shouldHaveCR;
	}

	/**
	 * @param {string} data
	 */
	function fixData (data) {
		if (data) {
			let res = data.replace(/\r/g, '');

			if (shouldHaveCR) {
				res = res.replace(/\n/g, '\r\n');
			}

			return res;
		}

		return data;
	}

	/**
	 * @param {number} line
	 * @param {number} column
	 */
	function reportNewlineError (line, column) {
		// Creating a node manually helps us to point to empty lines.
		const node = postcss.rule({
			source: {
				start: { line, column, offset: 0 },
				input: new postcss.Input('')
			}
		});

		report({
			message: messages.expected(primary),
			node,
			result,
			ruleName
		});
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
