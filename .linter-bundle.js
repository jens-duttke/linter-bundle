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
					'stylelint/index.cjs',
					`stylelint/plugins/stylelint-${snippets.kebabCase}.js`,
					'.editorconfig',
					'.eslintrc.cjs',
					'.gitattributes',
					'.gitignore',
					'.linter-bundle.js',
					'.markdownlint.json',
					'.npmignore',
					'*.md',
					'eslint.cjs',
					'LICENSE',
					'lint.js',
					'package-lock.json',
					'package.json',
					'stylelint.cjs',
					'stylelint.config.cjs',
					'test-stylelint.js',
					'tsconfig.json',
					'vscode-eslint-1.png',
					'vscode-eslint-2.png'
				]
			}
		]
	}
}
