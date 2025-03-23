/**
 * @file ESLint rule that ensures that only files which match given glob patterns are part of your project.
 */

import path from 'node:path';

import micromatch from 'micromatch';

// eslint-disable-next-line n/no-process-env -- If the ESLint sub-process is running from within the linter-bundle, we make use of its configuration.
const isInLinterBundle = !process.env['LINTER_BUNDLE'];

const { linterBundleConfig } = (isInLinterBundle ? await import('../../helper/linter-bundle-config.js') : {});

/**
 * @type {import('eslint').Rule.RuleModule}
 */
export default {
	meta: {
		docs: {
			description: 'Restrict file and path names with given glob patterns.',
			recommended: true
		},
		messages: {
			text: 'Disallowed filename "{{name}}".'
		},
		schema: {
			type: 'array',
			additionalItems: false,
			items: [
				{
					type: 'object',
					additionalProperties: false,
					properties: {
						basePath: {
							type: 'string'
						},
						allowed: {
							type: 'array',
							items: {
								type: 'string'
							}
						},
						disallowed: {
							type: 'array',
							items: {
								type: 'string'
							}
						}
					},
					required: ['basePath']
				}
			]
		}
	},
	create: (context) => {
		const filePath = context.filename;

		// The type is ensured by `meta.schema`
		const contextOptions = /** @type {{ basePath: string, allowed?: string[]; disallowed?: string[]; }[]} */(context.options);

		/** @type {{ basePath: string, allowed?: string[]; disallowed?: string[]; }[]} */
		const options = (linterBundleConfig?.files?.restrictions ? [...linterBundleConfig.files.restrictions, ...contextOptions] : contextOptions);

		for (const { basePath, allowed, disallowed } of options) {
			const normalizedName = path.relative(path.join(process.cwd(), basePath), filePath);

			if (normalizedName.startsWith('..')) {
				continue;
			}

			if (allowed && !disallowed) {
				if (!micromatch.isMatch(normalizedName, allowed, { dot: true })) {
					return report();
				}
			}
			else if (!allowed && disallowed) {
				if (micromatch.isMatch(normalizedName, disallowed, { dot: true })) {
					return report();
				}
			}
			else if (allowed && disallowed) {
				if (
					micromatch.isMatch(normalizedName, disallowed, { dot: true }) ||
					!micromatch.isMatch(normalizedName, allowed, { dot: true })
				) {
					return report();
				}
			}
		}

		return {};

		/**
		 * Add rule listener which reports the error.
		 *
		 * @returns {import('eslint').Rule.RuleListener} Returns a `Program` rule lister which reports the error
		 */
		function report () {
			return {
				Program: (node) => {
					context.report({
						node,
						loc: { line: 1, column: 0 },
						messageId: 'text',
						data: {
							name: path.relative(process.cwd(), filePath).replace(/\\/gu, '/')
						}
					});
				}
			};
		}
	}
};
