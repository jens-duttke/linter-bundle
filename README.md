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
- [better-npm-audit](https://www.npmjs.com/package/better-npm-audit): Security audit using `npm`
- [improved-yarn-audit](https://www.npmjs.com/package/improved-yarn-audit): Security audit using `yarn`

The linting tools are running in parallel, which can improve the performance by more than 20 percent.

## Used plugins

This setup is using the following additional plugins:

### ESLint

- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [eslint-plugin-eslint-comments](https://www.npmjs.com/package/eslint-plugin-eslint-comments)
- [eslint-plugin-functional](https://www.npmjs.com/package/eslint-plugin-functional)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc)
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)

Beside that, the following additional rules are part of this bundle:

- [no-global-undefined-check](./eslint/rules/no-global-undefined-check.md)

### stylelint

- [stylelint-declaration-block-no-ignored-properties](https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties)
- [stylelint-high-performance-animation](https://www.npmjs.com/package/stylelint-high-performance-animation) (Forked version)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
- [stylelint-selector-no-empty](https://www.npmjs.com/package/stylelint-selector-no-empty)
- [stylelint-selector-tag-no-without-class](https://www.npmjs.com/package/stylelint-selector-tag-no-without-class) (Forked version)
- [stylelint-use-logical-spec](https://www.npmjs.com/package/stylelint-use-logical-spec)

### Previously used, but now unmaintained plugins

Unfortunately a couple of previously used plugins are not regularly maintained or depend on unmaintained third-party code which blocks them from updating, so they don't provide updates for the major releases of the linters (ESLint and Stylelint).
For that reason the following plugins are not used anymore:

- [stylelint-use-nesting](https://www.npmjs.com/package/stylelint-use-nesting) (removed on 2021-11-05)

If these plugins are maintained again, the plugins will also be used again.

## Install

Ensure you are using atleast Node.js version 14.

```sh
npm install linter-bundle --save-dev
```

### Usage examples

#### package.json

```json
{
  "scripts": {
    "lint": "lint tsc ts sass md audit",
    "lint-different-configurations": "lint tsc --tsconfig=./path1/tsconfig.json tsc --tsconfig=./path2/tsconfig.json ts sass md audit"
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
    require.resolve('linter-bundle/eslint/overrides-gatsby'),
    require.resolve('linter-bundle/eslint/overrides-javascript'),
    // require.resolve('linter-bundle/eslint/overrides-javascript-lazy'),
    require.resolve('linter-bundle/eslint/overrides-jest'),
    require.resolve('linter-bundle/eslint/overrides-jsdoc'),
    require.resolve('linter-bundle/eslint/overrides-react'),
    require.resolve('linter-bundle/eslint/overrides-storybook'),
    require.resolve('linter-bundle/eslint/overrides-type-declarations'),
    require.resolve('linter-bundle/eslint/overrides-worker')
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

##### Available `extends`

Source | Description | Rules setup
-|-|-
`linter-bundle/eslint` | General rule setup. This is also the base for the following **overrides**. | [View](./eslint/index.js)
`linter-bundle/eslint/overrides-gatsby` | Settings for Gatsby-based projects. | [View](./eslint/overrides-gatsby)
`linter-bundle/eslint/overrides-javascript` |  Strict settings for JavaScript files, which enforces correct types everywhere. | [View](./eslint/overrides-javascript.js)
`linter-bundle/eslint/overrides-javascript-lazy` | Can be used instead of `overrides-javascript`. It's less strict and allows the `any` type. | [View](./eslint/overrides-javascript-lazy.js)
`linter-bundle/eslint/overrides-jest` | Settings for projects using Jest. | [View](./eslint/overrides-jest.js)
`linter-bundle/eslint/overrides-jsdoc` | Settings for projects using JSDoc comments. | [View](./eslint/overrides-jsdoc.js)
`linter-bundle/eslint/overrides-react` | Settings for projects using React comments. | [View](./eslint/overrides-react.js)
`linter-bundle/eslint/overrides-storybook` | Settings for projects using Storybook comments. | [View](./eslint/overrides-storybook.js)
`linter-bundle/eslint/overrides-type-declarations` | Settings for type declaration files (.d.ts). | [View](./eslint/overrides-type-declarations.js)
`linter-bundle/eslint/overrides-worker` | Settings for projects using Web Workers. | [View](./eslint/overrides-worker.js)

#### stylelint.config.js

```js
global.linterBundleSettings = {
  // The prefix used for the 'custom-media-pattern' (`@media (--my-prefix-foo)`) and 'custom-property-pattern' (`var(--my-prefix-bar)`) rule. If not defined, these rules are disabled.
  propertyPrefix: 'my-prefix'
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

## Available commands

The command line arguments are separated in groups. Here are some examples:

```sh
# Run TypeScript compiler, ESLint, Stylelint, Markdownlint, and audit in the given order, using the default configuration
lint tsc ts sass md audit

# Run ESLint and Audit, and show their terminal output even on success
lint --verbose ts audit

# Run ESLint and Audit, and show the ESLint terminal output even on success
lint ts --verbose audit

# Run TypeScript compiler and ESLint, but with different tsconfig.json files
lint tsc --tsconfig=./cypress/tsconfig.json ts --tsconfig=./.storybook/tsconfig.json

# Run TypeScript compiler twice with different configurations
lint tsc tsc --tsconfig="./cypress/tsconfig.json"
```

Below, you can find the available command line arguments and what they are doing.

### General optional command line arguments

Argument | Description | Example
-|-|-
`--verbose` | By default, the terminal output of linters is only shown if an error occurs. Use this option to show their terminal output even on success. | `--verbose`
`--timing` | Show information how long each linting process was running. | `--timing`

### `lint tsc`

Will execute:

```sh
tsc --skipLibCheck --noEmit
```

#### Optional command line arguments for `lint tsc`

Argument | Description | Example
-|-|-
`--tsconfig` | Allows to specifiy a different `tsconfig.json` file. | `--tsconfig=./cypress/tsconfig.json`

### `lint ts`

Will execute:

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

Will execute:

```sh
stylelint "src/**/*.scss" --formatter unix --report-needless-disables --report-invalid-scope-disables --report-descriptionless-disables
```

### `lint md`

Will execute:

```sh
markdownlint **/*.md --ignore node_modules
```

### `lint audit`

If a `package.json` exist, it will execute:

```sh
better-npm-audit audit -l moderate -p
```

If a `yarn.lock` exist, it will execute:

```sh
improved-yarn-audit --min-severity moderate --fail-on-missing-exclusions --ignore-dev-deps
```

#### Optional command line arguments for `lint audit`

Argument | Description | Example
-|-|-
`--min-severity` | Minimum severity to treat as an error, default is moderate (info, low, moderate, high, critical). Used as `-l` argument for [better-npm-audit](https://www.npmjs.com/package/better-npm-audit), and `--min-severity` argument for [improved-yarn-audit](https://www.npmjs.com/package/improved-yarn-audit). | `--min-severity=moderate`
`--exclude` | Comma-separated list of  advisory IDs to ignore. Used as `-i` argument for [better-npm-audit](https://www.npmjs.com/package/better-npm-audit), and `--exclude` argument for [improved-yarn-audit](https://www.npmjs.com/package/improved-yarn-audit). | `--exclude=118,577`

## VSCode setup

### ESLint

For VSCode I recommend the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.

To ensure the ESLint plugins are correctly loaded, you need to adjust the settings of this plugin.

This can be done by adding these options to your `.vscode/settings.json`:

```json
{
  "eslint.nodePath": "./node_modules/linter-bundle/node_modules/eslint",
  "eslint.options": {
    "overrideConfigFile": "./.eslintrc.js",
    "resolvePluginsRelativeTo": "./node_modules/linter-bundle",
    "rulePaths": ["./node_modules/linter-bundle/eslint/rules"],
    "reportUnusedDisableDirectives": "error",
  }
}
```

If the ESLint extension shows the following message on the bottom-right:

![https://cdn.jsdelivr.net/gh/jens-duttke/linter-bundle@f7d514f/vscode-eslint-1.png](https://cdn.jsdelivr.net/gh/jens-duttke/linter-bundle@f7d514f/vscode-eslint-1.png)

Click on "Select Node Path". A selection popup will appear at the top of the editor:

![https://cdn.jsdelivr.net/gh/jens-duttke/linter-bundle@f7d514f/vscode-eslint-2.png](https://cdn.jsdelivr.net/gh/jens-duttke/linter-bundle@f7d514f/vscode-eslint-2.png)

Here, choose the option "Use NODE_PATH value defined via setting".

### stylelint

For VSCode I recommend the [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension.

To ensure the stylelint plugins are correctly loaded, you need to adjust the settings of this plugin in your `.vscode/settings.json`:

```json
{
  "stylelint.enable": true,
  "stylelint.validate": [
    "scss"
  ],
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false
}
```

### Auto-fix code on save

In order to fix the code according to the ESLint/stylelint rules when saving, the following settings can be added to your `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

### Rulers

To visualize the max line-length rules in VSCode, you can activate rulers, by adding the following settings to your `.vscode/settings.json`:

```json
{
  "[markdown]": {
    "editor.rulers": [300]
  },
  "[scss]": {
    "editor.rulers": [160]
  },
  "[typescript]": {
    "editor.rulers": [300]
  },
  "[typescriptreact]": {
    "editor.rulers": [300]
  }
}
```
