/**
 * @file ESLint rule which ensures that only files which match given glob patterns are part of your project.
 */

const path = require('node:path');

const micromatch = require('micromatch');

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
		const filePath = context.getFilename();
		/** @type {{ basePath: string, allowed?: string[]; disallowed?: string[]; }[]} */
		const options = context.options;

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
		 * @returns {import('eslint').Rule.RuleListener} Returns a `Program` rule lister which reports the error.
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
