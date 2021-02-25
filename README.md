# linter-bundle

[![npm version](https://badge.fury.io/js/linter-bundle.svg)](https://badge.fury.io/js/linter-bundle)
[![Dependency Status](https://img.shields.io/david/jens-duttke/linter-bundle)](https://www.npmjs.com/package/linter-bundle)
[![Known Vulnerabilities](https://snyk.io/test/github/jens-duttke/linter-bundle/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jens-duttke/linter-bundle?targetFile=package.json)
[![npm](https://img.shields.io/npm/dm/linter-bundle.svg?maxAge=2592000)](https://www.npmjs.com/package/linter-bundle)
[![MIT license](https://img.shields.io/github/license/jens-duttke/linter-bundle.svg?style=flat)](https://opensource.org/licenses/MIT)

Ready-to use bundle of linting tools, containing configurations for

- [ESLint](https://eslint.org/): JavaScript (Node.js); TypeScript, React (Browser)
- [stylelint](https://stylelint.io/): SCSS (Browser)
- [markdownlint](https://github.com/DavidAnson/markdownlint): Markdown

## Used plugins

This setup is using the following additional plugins:

### ESLint

- @typescript-eslint/eslint-plugin
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

### Usage examples

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
// Sometimes it's required to adjust specific settings. These can be defined here:
global.linterBundleSettings = {
  overrides: {
    general: {
      'no-restricted-globals': {
        additionalRestictions: [
          {
            name: 'fetch',
            message: 'Use Utils.fetchWithTimeout() instead.'
          }
        ]
      },
      'no-restricted-properties': {
        additionalRestictions: [
          {
            object: 'localStorage',
            property: 'getItem',
            message: 'Use StorageHelper.getItem() instead.'
          },
          {
            object: 'localStorage',
            property: 'setItem',
            message: 'Use StorageHelper.setItem() instead.'
          },
          {
            object: 'localStorage',
            property: 'removeItem',
            message: 'Use StorageHelper.removeItem() instead.'
          }
        ]
      },
      'no-restricted-syntax': {
        additionalRestictions: [
          {
            selector: 'NewExpression[callee.name="Blob"]',
            message: 'Use BlobHelper.create() instead of new Blob().'
          }
        ]
      },
      'import/order': {
        additionalExternalPatterns: ['@sentry/*']
      }
    },
    react: {
      'react/forbid-component-props': {
        allowClassNameFor: ['Checkbox', 'Grid', 'GridItem', 'Button'],
        allowStyleFor: []
      }
    }
  }
};

module.exports = {
  extends: [
    require.resolve('linter-bundle/eslint'),
    require.resolve('linter-bundle/eslint/overrides-type-declarations'),
    require.resolve('linter-bundle/eslint/overrides-worker'),
    require.resolve('linter-bundle/eslint/overrides-react'),
    require.resolve('linter-bundle/eslint/overrides-gatsby'),
    require.resolve('linter-bundle/eslint/overrides-javascript'),
    require.resolve('linter-bundle/eslint/overrides-storybook'),
    // require.resolve('linter-bundle/eslint/overrides-javascript-lazy'),
    require.resolve('linter-bundle/eslint/overrides-jest')
  ],
  ignorePatterns: [
    // Define paths which should be ignored here. (The following paths are ignored by default: '.cache/', '.vscode/', 'coverage/', 'node_modules/')
    'build/',
    'etc/',
    'private/'
  ],
  globals: {
    // Define project-specific global variables. JavaScript built-in objects (like ArrayBuffer, typed arrays, Promise, Set/Map etc.) are automatically set to
    // 'readonly', and don't need to be added here.
    __DEV__: 'readonly',
    APP_NAME: 'readonly',
    APP_VERSION: 'readonly',
  }
};
```

#### stylelint.config.js

```js
global.linterBundleSettings = {
  // The prefix used for the 'custom-media-pattern' and 'custom-property-pattern' rule. If not defined, these rules are disabled.
  propertyPrefix: 'hexedit'
};

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

#### .gitignore / .npmignore

```json
.eslintcache
```

## Available commands and what they are doing

### `lint tsc`

```sh
tsc --skipLibCheck --noEmit
```

#### Optional command line arguments for `lint tsc`

Argument | Description | Example
-|-|-
`--tsconfig` | Allows to specifiy a different `tsconfig.json` file. | `--tsconfig=./cypress/tsconfig.json`

### `lint ts`

```sh
eslint "./**/*.{js,jsx,ts,tsx}" --format unix
```

Additionally, the environment variable `TIMING` is set to `10`.

#### Optional command line arguments for `lint ts`

Argument | Description | Example
-|-|-
`--tsconfig` | Allows to specifiy a different `tsconfig.json` file. | `--tsconfig=./cypress/tsconfig.json`
`--include` | Patterns with files which should be considered | `--include="./cypress/**/*.ts"`
`--exclude` | Patterns with files which should not be considered. Can be used multiple times for different patterns. Used as `--ignore-pattern` argument for ESLint. | `--exclude="cypress" --exclude=".storybook"`

### `lint sass`

```sh
stylelint "src/**/*.scss" --formatter unix --report-needless-disables --report-invalid-scope-disables --report-descriptionless-disables
```

### `lint md`

```sh
markdownlint **/*.md --ignore node_modules
```

### `lint audit`

```sh
npm audit --production --audit-level=moderate
```

## VSCode setup

For VSCode I recommend the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.

If you have multiple ESLint versions in your project - which can happen if you use Gatsby, which comes with an own, outdated ESLint version - the ESLint VSCode
extension may use this outdated version, and then show you errors like `Definition for rule '...' was not found.` or doesn't work at all.

To solve this issue, add these options to your `.vscode/settings.json`:

```json
{
  "eslint.nodePath": "./node_modules/linter-bundle/node_modules/eslint",
  "eslint.options": {
    "configFile": "./.eslintrc.js",
    "resolvePluginsRelativeTo": "./node_modules/linter-bundle"
  },
}
```
