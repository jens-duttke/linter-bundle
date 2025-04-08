// @ts-nocheck

import valueParser from 'postcss-value-parser';
import stylelint from 'stylelint';
import { atRuleParamIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

const ruleName = 'plugin/media-feature-parentheses-space-inside';

const messages = ruleMessages(ruleName, {
	expectedOpening: 'Expected single space after "("',
	rejectedOpening: 'Unexpected whitespace after "("',
	expectedClosing: 'Expected single space before ")"',
	rejectedClosing: 'Unexpected whitespace before ")"'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/media-feature-parentheses-space-inside/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions) => (root, result) => {
	const validOptions = validateOptions(result, ruleName, {
		actual: primary,
		possible: ['always', 'never']
	});

	if (!validOptions) {
		return;
	}

	root.walkAtRules(/^media$/iu, (atRule) => {
		// If there are comments in the params, the complete string
		// will be at atRule.raws.params.raw
		const parameters = (atRule.raws.params?.raw) || atRule.params;
		const indexBoost = atRuleParamIndex(atRule);

		// Parse the parameters once, and create a static copy for reporting
		const originalParsedParams = valueParser(parameters);

		// First pass - only detect problems
		const problems = [];
		originalParsedParams.walk((node) => {
			if (node.type === 'function') {
				const len = valueParser.stringify(node).length;

				if (primary === 'never') {
					if ((/[\t ]/u).test(node.before)) {
						problems.push({
							message: messages.rejectedOpening,
							index: node.sourceIndex + 1 + indexBoost,
							functionIndex: node.sourceIndex,
							type: 'opening'
						});
					}

					if ((/[\t ]/u).test(node.after)) {
						problems.push({
							message: messages.rejectedClosing,
							index: node.sourceIndex - 2 + len + indexBoost,
							functionIndex: node.sourceIndex,
							type: 'closing'
						});
					}
				}
				else if (primary === 'always') {
					if (node.before === '') {
						problems.push({
							message: messages.expectedOpening,
							index: node.sourceIndex + 1 + indexBoost,
							functionIndex: node.sourceIndex,
							type: 'opening'
						});
					}

					if (node.after === '') {
						problems.push({
							message: messages.expectedClosing,
							index: node.sourceIndex - 2 + len + indexBoost,
							functionIndex: node.sourceIndex,
							type: 'closing'
						});
					}
				}
			}
		});

		// Report each problem with a fix function
		if (problems.length > 0) {
			for (const problem of problems) {
				report({
					message: problem.message,
					node: atRule,
					index: problem.index,
					endIndex: problem.index,
					result,
					ruleName,
					fix: () => {
						// Create a fresh copy for fixing each time to avoid mixing fixes
						const parsedParams = valueParser(parameters);
						let fixed = false;

						parsedParams.walk((node) => {
							if (node.type === 'function' && node.sourceIndex === problem.functionIndex) {
								if (problem.type === 'opening') {
									if (primary === 'never' && (/[\t ]/u).test(node.before)) {
										node.before = '';
										fixed = true;
									}
									else if (primary === 'always' && node.before === '') {
										node.before = ' ';
										fixed = true;
									}
								}
								else if (problem.type === 'closing') {
									if (primary === 'never' && (/[\t ]/u).test(node.after)) {
										node.after = '';
										fixed = true;
									}
									else if (primary === 'always' && node.after === '') {
										node.after = ' ';
										fixed = true;
									}
								}
							}
						});

						if (fixed) {
							const fixedParams = parsedParams.toString();

							if (atRule.raws.params?.raw) {
								atRule.raws.params.raw = fixedParams;
							}
							else {
								atRule.params = fixedParams;
							}
							return true;
						}

						return false;
					}
				});
			}
		}
	});
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
