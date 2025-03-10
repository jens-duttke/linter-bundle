/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxAtRule from 'stylelint/lib/utils/isStandardSyntaxAtRule.mjs';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import { isAtRule } from 'stylelint/lib/utils/typeGuards.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import styleSearch from '../../style-search/index.mjs';

const ruleName = 'plugin/no-extra-semicolons';

const messages = ruleMessages(ruleName, {
	rejected: 'Unexpected extra semicolon'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/no-extra-semicolons/README.md',
	fixable: true
};

/**
 * @param {import('postcss').Node} node
 * @returns {number}
 */
function getOffsetByNode (node) {
	// @ts-expect-error -- TS2339: Property 'document' does not exist on type 'Document | Container<ChildNode>'
	if (node.parent?.document) {
		return 0;
	}

	const root = node.root();

	if (!root.source) { throw new Error('The root node must have a source'); }

	if (!node.source) { throw new Error('The node must have a source'); }

	if (!node.source.start) { throw new Error('The source must have a start position'); }

	const string = root.source.input.css;
	const nodeColumn = node.source.start.column;
	const nodeLine = node.source.start.line;
	let line = 1;
	let column = 1;
	let index = 0;

	for (let i = 0; i < string.length; i++) {
		if (column === nodeColumn && nodeLine === line) {
			index = i;
			break;
		}

		if (string[i] === '\n') {
			column = 1;
			line += 1;
		}
		else {
			column += 1;
		}
	}

	return index;
}

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, { actual: primary });

	if (!validOptions) {
		return;
	}

	if (root.raws.after && root.raws.after.trim().length > 0) {
		const rawAfterRoot = root.raws.after;

		/** @type {number[]} */
		const fixSemiIndices = [];

		styleSearch({ source: rawAfterRoot, target: ';' }, (match) => {
			if (!root.source) { throw new Error('The root node must have a source'); }

			complain(root.source.input.css.length - rawAfterRoot.length + match.startIndex);
		});

		// fix
		if (fixSemiIndices.length > 0) {
			root.raws.after = removeIndices(rawAfterRoot, fixSemiIndices);
		}
	}

	root.walk((node) => {
		if (isAtRule(node) && !isStandardSyntaxAtRule(node)) {
			return;
		}

		if (node.type === 'rule' && !isStandardSyntaxRule(node)) {
			return;
		}

		if (node.raws.before && node.raws.before.trim().length > 0) {
			const rawBeforeNode = node.raws.before;
			const allowedSemi = 0;

			const rawBeforeIndexStart = 0;

			/** @type {number[]} */
			const fixSemiIndices = [];

			styleSearch({ source: rawBeforeNode, target: ';' }, (match, count) => {
				if (count === allowedSemi) {
					return;
				}

				complain(getOffsetByNode(node) - rawBeforeNode.length + match.startIndex);
			});

			// fix
			if (fixSemiIndices.length > 0) {
				node.raws.before = removeIndices(rawBeforeNode, fixSemiIndices);
			}
		}

		if (typeof node.raws.after === 'string' && node.raws.after.trim().length > 0) {
			const rawAfterNode = node.raws.after;

			/**
			 * If the last child is a Less mixin followed by more than one semicolon,
			 * node.raws.after will be populated with that semicolon.
			 * Since we ignore Less mixins, exit here
			 */
			if (
				'last' in node &&
					node.last &&
					node.last.type === 'atrule' &&
					!isStandardSyntaxAtRule(node.last)
			) {
				return;
			}

			/** @type {number[]} */
			const fixSemiIndices = [];

			styleSearch({ source: rawAfterNode, target: ';' }, (match) => {
				const index =
						getOffsetByNode(node) +
						node.toString().length -
						1 -
						rawAfterNode.length +
						match.startIndex;

				complain(index);
			});

			// fix
			if (fixSemiIndices.length > 0) {
				node.raws.after = removeIndices(rawAfterNode, fixSemiIndices);
			}
		}

		if (typeof node.raws.ownSemicolon === 'string') {
			const rawOwnSemicolon = node.raws.ownSemicolon;
			const allowedSemi = 0;

			/** @type {number[]} */
			const fixSemiIndices = [];

			styleSearch({ source: rawOwnSemicolon, target: ';' }, (match, count) => {
				if (count === allowedSemi) {
					return;
				}

				const index =
						getOffsetByNode(node) +
						node.toString().length -
						rawOwnSemicolon.length +
						match.startIndex;

				complain(index);
			});

			// fix
			if (fixSemiIndices.length > 0) {
				node.raws.ownSemicolon = removeIndices(rawOwnSemicolon, fixSemiIndices);
			}
		}
	});

	/**
	 * @param {number} index
	 */
	function complain (index) {
		report({
			message: messages.rejected,
			node: root,
			index,
			endIndex: index,
			result,
			ruleName
		});
	}

	/**
	 * @param {string} str
	 * @param string_
	 * @param {number[]} indices
	 * @returns {string}
	 */
	function removeIndices (string_, indices) {
		for (const index of indices.reverse()) {
			string_ = string_.slice(0, index) + string_.slice(index + 1);
		}

		return string_;
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
