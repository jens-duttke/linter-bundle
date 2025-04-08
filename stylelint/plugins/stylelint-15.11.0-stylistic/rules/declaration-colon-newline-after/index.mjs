// @ts-nocheck

import stylelint from 'stylelint';
import isStandardSyntaxDeclaration from 'stylelint/lib/utils/isStandardSyntaxDeclaration.mjs';
import { declarationValueIndex } from 'stylelint/lib/utils/nodeFieldIndices.mjs';
import report from 'stylelint/lib/utils/report.mjs';
import ruleMessages from 'stylelint/lib/utils/ruleMessages.mjs';
import validateOptions from 'stylelint/lib/utils/validateOptions.mjs';

import whitespaceChecker from '../../utils/whitespaceChecker.mjs';

const ruleName = 'plugin/declaration-colon-newline-after';

const messages = ruleMessages(ruleName, {
	expectedAfter: () => 'Expected newline after ":"',
	expectedAfterMultiLine: () => 'Expected newline after ":" with a multi-line declaration'
});

const meta = {
	url: 'https://github.com/jens-duttke/linter-bundle/blob/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules/declaration-colon-newline-after/README.md',
	fixable: true
};

/** @type {import('stylelint').Rule} */
const rule = (primary, _secondaryOptions, context) => {
	const checker = whitespaceChecker('newline', primary, messages);

	return (root, result) => {
		const validOptions = validateOptions(result, ruleName, {
			actual: primary,
			possible: ['always', 'always-multi-line']
		});

		if (!validOptions) {
			return;
		}

		root.walkDecls((decl) => {
			if (!isStandardSyntaxDeclaration(decl)) {
				return;
			}

			// Get the raw prop, and only the prop
			const endOfPropertyIndex = declarationValueIndex(decl) + (decl.raws.between || '').length - 1;

			// The extra characters tacked onto the end ensure that there is a character to check
			// after the colon. Otherwise, with `background:pink` the character after the
			const propertyPlusColon = `${decl.toString().slice(0, endOfPropertyIndex)}xxx`;

			for (let i = 0, l = propertyPlusColon.length; i < l; i++) {
				if (propertyPlusColon[i] !== ':') {
					continue;
				}

				const indexToCheck = (/^[^\S\n\r]*\/\*/u).test(propertyPlusColon.slice(i + 1)) ?
					propertyPlusColon.indexOf('*/', i) + 1
					: i;

				checker.afterOneOnly({
					source: propertyPlusColon,
					index: indexToCheck,
					lineCheckStr: decl.value,
					err: (m) => {
						report({
							message: m,
							node: decl,
							index: indexToCheck,
							endIndex: indexToCheck,
							result,
							ruleName,
							fix: () => {
								const between = decl.raws.between;

								if (between == null) { throw new Error('`between` must be present'); }

								const betweenStart = declarationValueIndex(decl) - between.length;
								const sliceIndex = indexToCheck - betweenStart + 1;
								const betweenBefore = between.slice(0, sliceIndex);
								const betweenAfter = between.slice(sliceIndex);

								decl.raws.between = (/^\s*\n/u).test(betweenAfter) ?
									betweenBefore + betweenAfter.replace(/^[^\S\n\r]*/u, '')
									: betweenBefore + context.newline + betweenAfter;

								return;
							}
						});
					}
				});
			}
		});
	};
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
export default stylelint.createPlugin(ruleName, rule);
