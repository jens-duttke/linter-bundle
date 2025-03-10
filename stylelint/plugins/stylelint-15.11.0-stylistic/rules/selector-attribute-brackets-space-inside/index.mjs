/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxRule from 'stylelint/lib/utils/isStandardSyntaxRule.mjs';
import parseSelector from 'stylelint/lib/utils/parseSelector.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import styleSearch from '../../style-search/index.mjs';

const ruleName = 'plugin/selector-attribute-brackets-space-inside';

const messages = ruleMessages(ruleName, {
	expectedOpening: 'Expected single space after "["',
	rejectedOpening: 'Unexpected whitespace after "["',
	expectedClosing: 'Expected single space before "]"',
	rejectedClosing: 'Unexpected whitespace before "]"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-attribute-brackets-space-inside/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never']
		});

		if (!validOptions) {
			return;
		}

		root.walkRules((ruleNode) => {
			if (!isStandardSyntaxRule(ruleNode)) {
				return;
			}

			if (!ruleNode.selector.includes('[')) {
				return;
			}

			const selector = ruleNode.raws.selector ? ruleNode.raws.selector.raw : ruleNode.selector;

			let hasFixed;
			const fixedSelector = parseSelector(selector, result, ruleNode, (selectorTree) => {
				selectorTree.walkAttributes((attributeNode) => {
					const attributeSelectorString = attributeNode.toString();

					styleSearch({ source: attributeSelectorString, target: '[' }, (match) => {
						const nextCharIsSpace = attributeSelectorString[match.startIndex + 1] === ' ';
						const index = attributeNode.sourceIndex + match.startIndex + 1;

						if (nextCharIsSpace && primary === 'never') {
							complain(messages.rejectedOpening, index);
						}

						if (!nextCharIsSpace && primary === 'always') {
							complain(messages.expectedOpening, index);
						}
					});

					styleSearch({ source: attributeSelectorString, target: ']' }, (match) => {
						const previousCharIsSpace = attributeSelectorString[match.startIndex - 1] === ' ';
						const index = attributeNode.sourceIndex + match.startIndex - 1;

						if (previousCharIsSpace && primary === 'never') {
							complain(messages.rejectedClosing, index);
						}

						if (!previousCharIsSpace && primary === 'always') {
							complain(messages.expectedClosing, index);
						}
					});
				});
			});

			if (hasFixed && fixedSelector) {
				if (!ruleNode.raws.selector) {
					ruleNode.selector = fixedSelector;
				}
				else {
					ruleNode.raws.selector.raw = fixedSelector;
				}
			}

			/**
			 * @param {string} message
			 * @param {number} index
			 */
			function complain (message, index) {
				report({
					message,
					index,
					endIndex: index,
					result,
					ruleName,
					node: ruleNode
				});
			}
		});
	};

	/**
	 * @param {import('postcss-selector-parser').Attribute} attributeNode
	 */
	function fixBefore (attributeNode) {
		const spacesAttribute = attributeNode.raws.spaces?.attribute;
		const rawAttributeBefore = spacesAttribute?.before;

		/** @type {{ attrBefore: string, setAttrBefore: (fixed: string) => void }} */
		const { attrBefore, setAttrBefore } = rawAttributeBefore ?
			{
				attrBefore: rawAttributeBefore,
				setAttrBefore (fixed) {
					spacesAttribute.before = fixed;
				}
			  }
			: {
				attrBefore:
						(attributeNode.spaces.attribute?.before) || '',
				setAttrBefore (fixed) {
					if (!attributeNode.spaces.attribute) { attributeNode.spaces.attribute = {}; }

					attributeNode.spaces.attribute.before = fixed;
				}
			  };

		if (primary === 'always') {
			setAttrBefore(attrBefore.replace(/^\s*/, ' '));
		}
		else if (primary === 'never') {
			setAttrBefore(attrBefore.replace(/^\s*/, ''));
		}
	}

	/**
	 * @param {import('postcss-selector-parser').Attribute} attributeNode
	 */
	function fixAfter (attributeNode) {
		const key = attributeNode.operator ?
			attributeNode.insensitive ?
				'insensitive'
				: 'value'
			: 'attribute';

		const rawSpaces = attributeNode.raws.spaces?.[key];
		const rawAfter = rawSpaces?.after;

		const spaces = attributeNode.spaces[key];

		/** @type {{ after: string, setAfter: (fixed: string) => void }} */
		const { after, setAfter } = rawAfter ?
			{
				after: rawAfter,
				setAfter (fixed) {
					rawSpaces.after = fixed;
				}
			  }
			: {
				after: (spaces?.after) || '',
				setAfter (fixed) {
					if (!attributeNode.spaces[key]) { attributeNode.spaces[key] = {}; }

					// @ts-expect-error -- TS2532: Object is possibly 'undefined'.
					attributeNode.spaces[key].after = fixed;
				}
			  };

		if (primary === 'always') {
			setAfter(after.replace(/\s*$/, ' '));
		}
		else if (primary === 'never') {
			setAfter(after.replace(/\s*$/, ''));
		}
	}
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
