/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

import stylelint from 'stylelint';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import selectorAttributeOperatorSpaceChecker from '../selectorAttributeOperatorSpaceChecker.mjs';

const ruleName = 'plugin/selector-attribute-operator-space-before';

const messages = ruleMessages(ruleName, {
	expectedBefore: (operator) => `Expected single space before "${operator}"`,
	rejectedBefore: (operator) => `Unexpected whitespace before "${operator}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-attribute-operator-space-before/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('space', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'never']
		});

		if (!validOptions) {
			return;
		}

		selectorAttributeOperatorSpaceChecker({
			root,
			result,
			locationChecker: checker.before,
			checkedRuleName: ruleName,
			checkBeforeOperator: true,
			fix: context.fix ?
				(attributeNode) => {
					const rawAttribute = attributeNode.raws.spaces?.attribute;
					const rawAttributeAfter = rawAttribute?.after;

					/** @type {{ attrAfter: string, setAttrAfter: (fixed: string) => void }} */
					const { attrAfter, setAttrAfter } = rawAttributeAfter ?
							{
								attrAfter: rawAttributeAfter,
								setAttrAfter (fixed) {
									rawAttribute.after = fixed;
								}
							  }
							: {
								attrAfter:
										(attributeNode.spaces.attribute?.after) || '',
								setAttrAfter (fixed) {
									if (!attributeNode.spaces.attribute) { attributeNode.spaces.attribute = {}; }

									attributeNode.spaces.attribute.after = fixed;
								}
							  };

					if (primary === 'always') {
						setAttrAfter(attrAfter.replace(/\s*$/, ' '));

						return true;
					}

					if (primary === 'never') {
						setAttrAfter(attrAfter.replace(/\s*$/, ''));

						return true;
					}

					return false;
				  }
				: null
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
