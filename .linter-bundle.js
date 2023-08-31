const snippets = {
	lowerCase: '[a-z]*([a-z0-9])',
	upperCase: '[A-Z]*([A-Z0-9])',
	snakeCase: '[a-z]*(*([a-z0-9]_)+([a-z0-9]))',
	screamingSnakeCase: '[A-Z]*(*([A-Z0-9]_)+([A-Z0-9]))',
	kebabCase: '[a-z]*(*([a-z0-9]-)+([a-z0-9]))',
	camelCase: '[a-z]*([a-zA-Z0-9])',
	pascalCase: '[A-Z]*([a-zA-Z0-9])'
};

module.exports = {
	files: {
		restrictions: [
			{
				basePath: '.',
				allowed: [
					'.git/**',
					'.github/FUNDING.yml',
					'.vscode/settings.json',
					`eslint/rules/${snippets.kebabCase}.{js,md}`,
					`eslint/{index.js,overrides-${snippets.kebabCase}.js}`,
					'files/index.js',
					`helper/${snippets.kebabCase}.js`,
					'markdownlint/base.json',
					'node_modules/**',
					'stylelint/index.js',
					`stylelint/plugins/stylelint-${snippets.kebabCase}.js`,
					'.editorconfig',
					'.eslintrc.js',
					'.gitattributes',
					'.gitignore',
					'.linter-bundle.js',
					'.markdownlint.json',
					'.npmignore',
					'*.md',
					'LICENSE',
					'lint.js',
					'package-lock.json',
					'package.json',
					'stylelint.config.js',
					'tsconfig.json',
					'types.d.ts',
					'validate-stylelint-options.mjs',
					'vscode-eslint-1.png',
					'vscode-eslint-2.png'
				]
			}
		]
	}
}
