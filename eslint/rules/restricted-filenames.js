/**
 * @file ESLint rule which ensures that only files which match given glob patterns are part of your project.
 */

/* eslint-disable unicorn/prefer-module -- For ESLint, we still need to rely on CommonJS modules */

const path = require('node:path');

const micromatch = require('micromatch');

// eslint-disable-next-line n/no-process-env -- Only merge the linter-bundle config, if the linting is not started by the linter-bundle CLI tool (e.g. if ESlint is running separately in VSCode), to get warnings shown there too
const linterBundleConfig = (!process.env['LINTER_BUNDLE'] ? require('../../helper/linter-bundle-config.cjs').linterBundleConfig : undefined);

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
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
		/** @type {{ basePath: string, allowed?: string[]; disallowed?: string[]; }[]} */
		const options = linterBundleConfig?.files?.restrictions ? [...linterBundleConfig.files.restrictions, ...context.options] : context.options;

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
