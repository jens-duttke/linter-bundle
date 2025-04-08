// @ts-nocheck

import stylelint from 'stylelint';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';
import selectorAttributeOperatorSpaceChecker from '../selectorAttributeOperatorSpaceChecker.mjs';

const ruleName = 'plugin/selector-attribute-operator-space-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: (operator) => `Expected single space after "${operator}"`,
	rejectedAfter: (operator) => `Unexpected whitespace after "${operator}"`
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/selector-attribute-operator-space-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => (root, result) => {
	const checker = whitespaceChecker('space', primary, messages);
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
		locationChecker: checker.after,
		checkedRuleName: ruleName,
		checkBeforeOperator: false,
		fix: (attributeNode) => {
			/** @type {{ operatorAfter: string, setOperatorAfter: (fixed: string) => void }} */
			const { operatorAfter, setOperatorAfter } = (() => {
				const rawOperator = attributeNode.raws.operator;

				if (rawOperator) {
					return {
						operatorAfter: rawOperator.slice(
								attributeNode.operator ? attributeNode.operator.length : 0
						),
						setOperatorAfter (fixed) {
							delete attributeNode.raws.operator;

							if (!attributeNode.raws.spaces) { attributeNode.raws.spaces = {}; }

							if (!attributeNode.raws.spaces.operator) { attributeNode.raws.spaces.operator = {}; }

							attributeNode.raws.spaces.operator.after = fixed;
						}
					};
				}

				const rawSpacesOperator =
						attributeNode.raws.spaces?.operator;
				const rawOperatorAfter = rawSpacesOperator?.after;

				if (rawOperatorAfter) {
					return {
						operatorAfter: rawOperatorAfter,
						setOperatorAfter (fixed) {
							rawSpacesOperator.after = fixed;
						}
					};
				}

				return {
					operatorAfter:
							(attributeNode.spaces.operator?.after) || '',
					setOperatorAfter (fixed) {
						if (!attributeNode.spaces.operator) { attributeNode.spaces.operator = {}; }

						attributeNode.spaces.operator.after = fixed;
					}
				};
			})();

			if (primary === 'always') {
				setOperatorAfter(operatorAfter.replace(/^\s*/u, ' '));

				return true;
			}

			if (primary === 'never') {
				setOperatorAfter(operatorAfter.replace(/^\s*/u, ''));

				return true;
			}

			return false;
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
