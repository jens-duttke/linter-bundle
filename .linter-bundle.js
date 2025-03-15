/**
 * @file Configuration used for linting the linter-bundle.
 */

const snippets = {
	kebabCase: '[a-z]*(*([a-z0-9]-)+([a-z0-9]))',
	camelCase: '[a-z]*([a-zA-Z0-9])'
};

export default {
	verbose: true,
	timing: true,
	files: {
		restrictions: [
			{
				basePath: '.',
				allowed: [
					'.git/**',
					'.github/FUNDING.yml',
					'.vscode/settings.json',
					`eslint/rules/${snippets.kebabCase}.{js,mjs,md}`,
					`eslint/rules/helper/${snippets.kebabCase}.{js,mjs,md}`,
					`eslint/${snippets.kebabCase}.mjs`,
					'files/index.js',
					`helper/${snippets.kebabCase}.{js,mjs,cjs,d.ts}`,
					'markdownlint/base.json',
					'node_modules/**',
					'stylelint/index.mjs',
					`stylelint/plugins/stylelint-${snippets.kebabCase}.js`,
					`stylelint/plugins/stylelint-15.11.0-stylistic/**/{${snippets.camelCase}.mjs,README.md,LICENSE}`,
					'.editorconfig',
					'eslint.config.mjs',
					'.gitattributes',
					'.gitignore',
					'.linter-bundle.js',
					'.linter-bundle.schema.json',
					'.markdownlint.json',
					'.npmignore',
					'*.md',
					'eslint.mjs',
					'LICENSE',
					'lint.js',
					'package-lock.json',
					'package.json',
					'stylelint.mjs',
					'stylelint.config.js',
					'test-stylelint.js',
					'tsconfig.json',
					'vscode-eslint-1.png',
					'vscode-eslint-2.png'
				]
			}
		]
	},
	ts: {
		overrides: {
			general: {
				'import/order': {
					additionalExternalPatterns: [
						'@stylistic/**'
					]
				}
			}
		}
	}
};
