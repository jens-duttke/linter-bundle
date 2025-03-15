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

The `linter-bundle` is using the Flat Configuration Format which was introduced in ESLint v8.

- [@stylistic/eslint-plugin](https://eslint.style/)
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [eslint-plugin-eslint-comments](https://www.npmjs.com/package/eslint-plugin-eslint-comments)
- [eslint-plugin-functional](https://www.npmjs.com/package/eslint-plugin-functional)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc)
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) (fork of [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node))
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
- [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn)

Beside that, the following additional rules are part of this bundle:

- [`linter-bundle/enforce-logical-expression-parens`](./eslint/rules/enforce-logical-expression-parens.md)
- [`linter-bundle/enforce-ternary-parens`](./eslint/rules/enforce-ternary-parens.md)
- [`linter-bundle/ensure-lucide-import-consistency`](./eslint/rules/ensure-lucide-import-consistency.md)
- [`linter-bundle/newline-before-after-if`](./eslint/rules/newline-before-after-if.md)
- [`linter-bundle/newline-before-after-variable-declarations`](./eslint/rules/newline-before-after-variable-declarations.md)
- [`linter-bundle/no-extra-spaces-in-generics`](./eslint/rules/no-extra-spaces-in-generics.md)
- [`linter-bundle/no-ternary-return`](./eslint/rules/no-ternary-return.md)
- [`linter-bundle/no-unnecessary-typeof`](./eslint/rules/no-unnecessary-typeof.md)
- [`linter-bundle/restricted-filenames`](./eslint/rules/restricted-filenames.md)

### stylelint

- [stylelint-declaration-block-no-ignored-properties](https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties)
- [stylelint-high-performance-animation](https://www.npmjs.com/package/stylelint-high-performance-animation)
- [stylelint-order](https://www.npmjs.com/package/stylelint-order)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)
- [stylelint-selector-no-empty](https://www.npmjs.com/package/stylelint-selector-no-empty) (Forked version)
- [stylelint-selector-tag-no-without-class](https://www.npmjs.com/package/stylelint-selector-tag-no-without-class) (Forked version)
- [stylelint-use-logical-spec](https://www.npmjs.com/package/stylelint-use-logical-spec)

Beside that [73 stylistic rules](https://github.com/jens-duttke/linter-bundle/tree/main/stylelint/plugins/stylelint-15.11.0-stylistic/rules) has been forked from `stylelint@15.11.0`, which have been removed in `stylelint@16.0.0`, are part of this bundle.

### Previously used, but now unmaintained plugins

Unfortunately a couple of previously used plugins are not regularly maintained or depend on unmaintained third-party code which blocks them from updating, so they don't provide updates for the major releases of the linters (ESLint and Stylelint).
For that reason the following plugins are not used anymore:

- [stylelint-use-nesting](https://www.npmjs.com/package/stylelint-use-nesting) (removed on 2021-11-05)

If these plugins are maintained again, the plugins will also be used again.

## Install

Ensure you are using atleast Node.js version 20.9.0/21.1.0.

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

#### eslint.config.mjs

```js
export default [
  ...(await import('linter-bundle/eslint.mjs')).default,
  // ...(await import('linter-bundle/eslint/gatsby.mjs')).default,
  // ...(await import('linter-bundle/eslint/javascript.mjs')).default,
  ...(await import('linter-bundle/eslint/javascript-lazy.mjs')).default,
  // ...(await import('linter-bundle/eslint/jest.mjs')).default,
  ...(await import('linter-bundle/eslint/jsdoc.mjs')).default,
  // ...(await import('linter-bundle/eslint/react.mjs')).default,
  // ...(await import('linter-bundle/eslint/storybook.mjs')).default,
  // ...(await import('linter-bundle/eslint/type-declarations.mjs')).default,
  // ...(await import('linter-bundle/eslint/worker.mjs')).default
]
```

##### Available `extends`

Source | Description | Rules setup
-|-|-
`linter-bundle/eslint.mjs` | General rule setup. This is also the base for the following specialized rule sets. | [View](./eslint/index.mjs)
`linter-bundle/eslint/gatsby.mjs` | Settings for Gatsby-based projects. | [View](./eslint/gatsby.mjs)
`linter-bundle/eslint/javascript.mjs` |  Strict settings for JavaScript files, which enforces correct types everywhere. | [View](./eslint/javascript.mjs)
`linter-bundle/eslint/javascript-lazy.mjs` | Can be used instead of `javascript`. It's less strict and allows the `any` type. | [View](./eslint/javascript-lazy.mjs)
`linter-bundle/eslint/jest.mjs` | Settings for projects using Jest. | [View](./eslint/jest.mjs)
`linter-bundle/eslint/jsdoc.mjs` | Settings for projects using JSDoc comments. | [View](./eslint/jsdoc.mjs)
`linter-bundle/eslint/react.mjs` | Settings for projects using React comments. | [View](./eslint/react.mjs)
`linter-bundle/eslint/storybook.mjs` | Settings for projects using Storybook comments. | [View](./eslint/storybook.mjs)
`linter-bundle/eslint/type-declarations.mjs` | Settings for type declaration files (.d.ts). | [View](./eslint/type-declarations.mjs)
`linter-bundle/eslint/worker.mjs` | Settings for projects using Web Workers. | [View](./eslint/worker.mjs)

#### stylelint.config.js

```js
export default {
  extends: 'linter-bundle/stylelint.mjs'
};

```

#### .markdownlint.json

```json
{
  "extends": "node_modules/linter-bundle/markdownlint/base.json"
}
```

#### .gitignore / .npmignore

```cmd
.eslintcache
```

### .linter-bundle.json / .linter-bundle.mjs / .linter-bundle.js

`linter-bundle` supports a couple of additional options, which can be configured in the configuration file, in the root of your project.  
Some of the options are also available as command line arguments (see below).  
The file itself, and any of the options is optional.

#### Minimum example configuration (`.linter-bundle.json`)

```json
{
  "verbose": true,
  "timing": true,
  "git": true,
  "tsc": {
    "tsconfig": "./tsconfig.lint.json"
  },
  "ts": {
    "tsconfig": "./tsconfig.lint.json",
    "include": ["./included/*.ts"],
    "exclude": ["./excluded/*.ts"],
    "overrides": {
      "general": {
        "no-restricted-globals": {
          "additionalRestrictions": [
            {
              "name": "fetch",
              "message": "Use Utils.fetchWithTimeout() instead."
            }
          ]
        },
        "no-restricted-properties": {
          "additionalRestrictions": [
            {
              "object": "localStorage",
              "property": "getItem",
              "message": "Use StorageHelper.getItem() instead."
            }
          ]
        },
        "no-restricted-syntax": {
          "additionalRestrictions": [
            {
              "selector": "NewExpression[callee.name=\"Blob\"]",
              "message": "Use BlobHelper.create() instead of new Blob()."
            }
          ]
        },
        "import/order": {
          "additionalExternalPatterns": ["@sentry/*"]
        },
        "@typescript-eslint/naming-convention": {
          "additionalOptions": [
            {
              "selector": "variable",
              "modifiers": ["const"],
              "format": ["camelCase"]
            }
          ]
        }
      },
      "react": {
        "react/forbid-component-props": {
          "allowClassNameFor": ["Checkbox", "Grid", "GridItem", "Button"],
          "allowStyleFor": ["Grid", "GridItem"]
        }
      }
    }
  },
  "sass": {
    "include": ["./included/*.ts"],
    "patternPrefix": "(my-prefix|another-prefix)"
  },
  "md": {
    "include": ["./included/*.md"],
  },
  "audit": {
    "minSeverity": "high",
    "exclude": ["975", "1751"]
  },
  "files": {
    "restrictions": [
      {
        "basePath": "./src",
        "allow": [
          "components/**/index.tsx",
          "utils/{index.ts,lib/[a-z]+([a-zA-Z])?(.spec).ts}"
        ],
        "disallow": [
          "components/NotAllowed/index.tsx"
        ]
      }
    ]
  }
}
```

#### Maximum example configuration (`.linter-bundle.js`)

<!-- markdownlint-disable-next-line MD033 -->
<details><summary>Click here to see the example configuration with descriptions</summary>

```js
export default {
  /**
   * Same as `--verbose` command line argument.
   * 
   * @type {boolean}
   */
  verbose: true,

  /**
   * Same as `--timing` command line argument.
   * 
   * @type {boolean}
   */
  timing: true,

  /**
   * Same as `--git` command line argument.
   * 
   * @type {boolean}
   */
  git: true,

  /**
   * Configuration, specific to the `tsc` command.
   */
  tsc: {
    /**
     * Same as `--tsconfig` command line argument.
     * 
     * @type {string}
     */
    tsconfig: './tsconfig.lint.json'
  },

  /**
   * Configuration, specific to the `ts` command.
   */
  ts: {
    /**
     * `timing` and `git` are the same as in the root node.
     */
    timing: true,
    git: true,

    /**
     * Same as `--tsconfig` command line argument.
     * 
     * @type {string}
     */
    tsconfig: './tsconfig.lint.json',

    /**
     * Same as `--include` command line argument.
     * 
     * @type {string[]}
     */
    include: ['./included/*.ts'],

    /**
     * Same as `--exclude` command line argument.
     * 
     * @type {string[]}
     */
    exclude: ['./excluded/*.ts'],

    /**
     * Overrides and extensions for specific ESLint rules.
     */
    overrides: {
      /**
       * Rules that are applied to `linter-bundle/eslint.mjs`.
       */
      general: {
        'no-restricted-globals': {
          /**
           * Extend the `restrictions` of the `no-restricted-globals` rule.
           * 
           * @type {{ name: string; message: string; }[]}
           */
          additionalRestrictions: [
            {
              name: 'fetch',
              message: 'Use Utils.fetchWithTimeout() instead.'
            }
          ]
        },
        'no-restricted-properties': {
          /**
           * Extend the `restrictions` of the `no-restricted-properties` rule.
           * 
           * @type {{ object: string; property: string; message: string; }[]}
           */
          additionalRestrictions: [
            {
              object: 'localStorage',
              property: 'getItem',
              message: 'Use StorageHelper.getItem() instead.'
            }
          ]
        },
        'no-restricted-syntax': {
          /**
           * Extend the `restrictions` of the `no-restricted-syntax` rule.
           * 
           * @type {{ selector: string; message: string; }[]}
           */
          additionalRestrictions: [
            {
              selector: 'NewExpression[callee.name="Blob"]',
              message: 'Use BlobHelper.create() instead of new Blob().'
            }
          ]
        },
        'import/order': {
          /**
           * Extend the `externalPatterns` of the `import/order` rule.
           *
           * @type {string[]}
           */
          additionalExternalPatterns: ['@sentry/*']
        }
      },

      /**
       * Rules that are applied to `linter-bundle/eslint/react.mjs`.
       */
      react: {
        'react/forbid-component-props': {
          /**
           * Allows the `className` property for the specified components.
           *
           * @type {string[]}
           */
          allowClassNameFor: ['Checkbox', 'Grid', 'GridItem', 'Button'],

          /**
           * Allows the `style` property for the specified components.
           *
           * @type {string[]}
           */
          allowStyleFor: ['Grid', 'GridItem']
        }
      }
    }
  },

  /**
   * Configuration, specific to the `sass` command.
   */
  sass: {
    /**
     * `verbose`, `timing` and `git` are the same as in the root node.
     */
    verbose: true,
    timing: true,
    git: true,

    /**
     * Same as `--include` command line argument.
     * 
     * @type {string[]}
     */
    include: ['./included/*.ts'],

    /**
     * The prefix used for the 'custom-media-pattern' (`@media (--my-prefix-foo)`) and 'custom-property-pattern' (`var(--my-prefix-bar)`) rule.
     *
     * If not defined, these rules are disabled.
     */
    patternPrefix: '--my-prefix'
  },

  /**
   * Configuration, specific to the `audit` command.
   */
  md: {
    /**
     * `git` is the same as in the root node.
     */
    git: true,

    /**
     * Same as `--include` command line argument.
     * 
     * @type {string[]}
     */
    include: ['./included/*.ts']
  },

  /**
   * Configuration, specific to the `audit` command.
   */
  audit: {
    /**
     * Same as `--min-severity` command line argument.
     * 
     * @type {'info' | 'low' | 'moderate' | 'high' | 'critical'}
     */
    minSeverity: 'high',

    /**
     * Same as `--exclude` command line argument.
     * 
     * @type {string[]}
     */
    exclude: ['975', '1751']
  },

  /**
   * Configuration, specific to the `files` command.
   */
  files: {
    /**
     * `git` is the same as in the root node.
     */
    git: true,

    /**
     * Same as `--include` command line argument.
     * 
     * @type {string[]}
     */
    include: ['./included/*.ts'],

    /**
     * Array of restrictions for different base paths.
     *
     * The configuration is equal to the `restricted-filenames` ESLint plugin.
     * This plugin is using the configuration here, if ESLint is used outside of `linter-bundle` (e.g. in VSCode).
     *
     * @see https://github.com/jens-duttke/linter-bundle/blob/main/eslint/rules/restricted-filenames.md
     */
    restrictions: [
      {
        /**
         * Same as `--exclude` command line argument.
         * 
         * @type {string}
         */
        basePath: './src',

        /**
         * Glob pattern Same as `--exclude` command line argument.
         * 
         * @type {string[]}
         */
        allow: [
          'components/**/index.tsx',
          'utils/{index.ts,lib/[a-z]+([a-zA-Z])?(.spec).ts}'
        ],

        /**
         * Same as `--exclude` command line argument.
         * 
         * @type {string[]}
         * 
         */
        disallow: [
          'components/NotAllowed/index.tsx'
        ]
      }
    ]
  }
}
```

</details>

## Available commands

The command line arguments are separated in groups. Here are some examples:

```sh
# Run File restrictions, TypeScript compiler, ESLint, Stylelint, Markdownlint, and audit in the given order, using the default configuration
lint files tsc ts sass md audit

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
`--git` | **Experimental** Only lint (ESLint, Stylelint and Markdownlint) files which have been detected as changed (compared to the upstream branch) by Git. This can result into massive performance improvements on large code bases, but also lead to undetected issues with cross-file rules. | `--git`

### `lint files`

Will check if the files in the project match the restrictions defined in the linter-bundle configuration file.

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
eslint "./**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}" --format unix
```

Additionally, the environment variable `TIMING` is set to `10`, to show timing information about the 10 slowest rules.

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
    "overrideConfigFile": "./eslint.config.mjs"
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
  "[javascript]": {
    "editor.rulers": [300]
  },
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

## FAQ

### How to solve the problem `Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.` ?

If you get such an error message:

> Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.  
> The file does not match your project config: *[any-name]*.js.  
> The file must be included in at least one of the projects provided.

the problem is most likely, that your `tsconfig.json` does not cover your JavaScript files and that you don't have a `jsconfig.json` file in your root directory. This is required by the `@typescript-eslint` to use TypeScript for linting of JavaScript files.

To solve this problem, either `"include"` your JavaScript files in your `tsconfig.json` (don't forget to set the compiler option `"checkJs"` to `true`) or create a `jsconfig.json` file in your root directory (this can be a copy of your `tsconfig.json` with an `"include"` of your JavaScript files).
