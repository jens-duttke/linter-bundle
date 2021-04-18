/**
 * @file stylelint processor to filter warnings.
 */

/**
 * The processor hook.
 *
 * @param {{ test: RegExp | string; include?: string[];  exclude?: string[]; }[] | undefined} options - The processors options, set in the stylelint configuration.
 * @returns {{ code? (input: string, filePath: stirng): string; result (stylelintResult: import('stylelint').LintResult, filePath: string): import('stylelint').LintResult; } | void} The processor functionality.
 */
module.exports = (options) => ({
	result (stylelintResult, filePath) {
		if (!options) {
			throw new Error('No options set for filter processor.');
		}

		const collectedInclude = [];
		const collectedExclude = [];

		for (const { test, include, exclude } of options) {
			let matches = false;

			if (test.constructor === RegExp) {
				if (test.test(filePath)) {
					matches = true;
				}
			}
			else if (typeof test === 'string') {
				if (new RegExp(test, 'u').test(filePath)) {
					matches = true;
				}
			}
			else {
				throw new TypeError('Invalid configuration of "test" for filter processor.');
			}

			if (matches) {
				if (Array.isArray(include)) {
					collectedInclude.push(...include);
				}
				if (Array.isArray(exclude)) {
					collectedExclude.push(...exclude);
				}
			}
		}

		if (collectedInclude.length === 0 && collectedExclude.length === 0) {
			return;
		}

		const warnings = stylelintResult.warnings.filter((warning) => (
			collectedInclude.includes(warning.rule) ||
			(collectedExclude.length > 0 && !collectedExclude.includes(warning.rule))
		));

		const transformedResult = {
			...stylelintResult,
			warnings,
			errored: (warnings.length === 0 ? false : stylelintResult.errored)
		};

		return transformedResult;
	}
});
