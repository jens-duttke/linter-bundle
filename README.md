[![npm version](https://badge.fury.io/js/linter-bundle.svg)](https://badge.fury.io/js/linter-bundle)
[![Dependency Status](https://img.shields.io/david/jens-duttke/linter-bundle)](https://www.npmjs.com/package/linter-bundle)
[![Known Vulnerabilities](https://snyk.io/test/github/jens-duttke/linter-bundle/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jens-duttke/linter-bundle?targetFile=package.json)
[![npm](https://img.shields.io/npm/dm/linter-bundle.svg?maxAge=2592000)](https://www.npmjs.com/package/linter-bundle)
[![MIT license](https://img.shields.io/github/license/jens-duttke/linter-bundle.svg?style=flat)](https://opensource.org/licenses/MIT)

# linter-bundle

Ready-to use bundle of linting tools, containing configurations for
- [ESLint](https://eslint.org/): JavaScript (Node.js); TypeScript, React (Browser)
- [stylelint](https://stylelint.io/): SCSS (Browser)
- [markdownlint](https://github.com/DavidAnson/markdownlint): and Markdown

## Used plugins

This setup is using the following additional plugins:

### ESLint

- eslint-plugin-functional
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-jest
- eslint-plugin-node
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-unicorn

### stylelint

- stylelint-declaration-block-no-ignored-properties
- stylelint-high-performance-animation
- stylelint-order
- stylelint-scss
- stylelint-selector-no-empty
- stylelint-use-logical-spec
- stylelint-use-nesting

## Install

```sh
npm install linter-bundle --save-dev
```

### Usage

#### package.json

```json
{
  "scripts": {
    "lint": "lint tsc & lint ts & lint sass & lint md & lint audit"
  }
}
```

#### .eslintrc.js

```js
module.exports = {
	extends: [
		'./node_modules/linter-bundle/eslint'
	],
	ignorePatterns: [
		'build/',
		'coverage/',
		'etc/',
		'node_modules/',
		'private/'
	],
	overrides: [
		require('linter-bundle/eslint/overrides-type-declarations'),
		require('linter-bundle/eslint/overrides-worker'),
		require('linter-bundle/eslint/overrides-react'),
		require('linter-bundle/eslint/overrides-javascript'),
		require('linter-bundle/eslint/overrides-jest')
	]
};
```

#### stylelint.config.js

```js
module.exports = {
	extends: 'linter-bundle/stylelint'
};

```

#### .markdownlint.json

```json
{
	"extends": "node_modules/linter-bundle/markdownlint/base.json"
}
```

## Available commands and what they are doing

### `lint tsc`

```sh
tsc --skipLibCheck
```

### `lint ts`

```sh
eslint . --ext .ts,.tsx,.js --format unix
```

Additionally, the environment variable `TIMING` is set to `10`.

### `lint sass`

```sh
stylelint "src/**/*.scss" --formatter unix --report-needless-disables 
```

### `lint md`

```sh
markdownlint **/*.md --ignore node_modules
```

### `lint audit`

```sh
npm audit --production --audit-level=moderate
```
