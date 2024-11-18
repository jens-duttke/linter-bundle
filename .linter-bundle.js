const snippets = {
	lowerCase: '[a-z]*([a-z0-9])',
	upperCase: '[A-Z]*([A-Z0-9])',
	snakeCase: '[a-z]*(*([a-z0-9]_)+([a-z0-9]))',
	screamingSnakeCase: '[A-Z]*(*([A-Z0-9]_)+([A-Z0-9]))',
	kebabCase: '[a-z]*(*([a-z0-9]-)+([a-z0-9]))',
	camelCase: '[a-z]*([a-zA-Z0-9])',
	pascalCase: '[A-Z]*([a-zA-Z0-9])'
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
					`eslint/rules/package.json`,
					`eslint/rules/${snippets.kebabCase}.{js,md}`,
					`eslint/{index.cjs,overrides-${snippets.kebabCase}.cjs}`,
					'files/index.js',
					`helper/${snippets.kebabCase}.{js,cjs,d.ts}`,
					'markdownlint/base.json',
					'node_modules/**',
					'stylelint/index.mjs',
					`stylelint/plugins/stylelint-${snippets.kebabCase}.js`,
					`stylelint/plugins/stylelint-15.11.0-stylistic/**/{${snippets.camelCase}.mjs,README.md,LICENSE}`,
					'.editorconfig',
					'.eslintrc.cjs',
					'.gitattributes',
					'.gitignore',
					'.linter-bundle.js',
					'.linter-bundle.schema.json',
					'.markdownlint.json',
					'.npmignore',
					'*.md',
					'eslint.cjs',
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
	}
}
