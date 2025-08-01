# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.7.0...HEAD)

## [7.7.0] - 2025-07-25

### Breaking changes

- [general] Drop support for Node.js version less than 20.12.0, 21.*.* and 23.*.* as some of the ESLint plugins are not supporting them anymore
- [eslint] Removed deprecated `@stylistic/eslint-plugin-jsx` plugin

### Changed

- [eslint] Updated `eslint` from `9.26.0` to `9.31.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `4.3.4` to `4.4.4`
- [eslint] Updated `eslint-plugin-functional` from `9.0.1` to `9.0.2`
- [eslint] Updated `eslint-plugin-import` from `2.31.0` to `2.32.0`
- [eslint] Updated `eslint-plugin-jest` from `28.11.0` to `29.0.1`
- [eslint] Updated `eslint-plugin-jsdoc` from `50.6.17` to `51.4.1`
- [eslint] Updated `eslint-plugin-n` from `17.18.0` to `17.21.0`
- [eslint] Updated `eslint-plugin-unicorn` from `59.0.1` to `60.0.0`
- [eslint] Updated `globals` from `16.1.0` to `16.3.0`
- [eslint] Updated `@stylistic/eslint-plugin` from `4.2.0` to `5.2.2`
- [eslint] Updated `typescript-eslint` from `8.32.1` to `8.38.0`
- [markdownlint] Updated `markdownlint-cli` from `0.44.0` to `0.45.0`
- [stylelint] Updated `stylelint` from `16.19.1` to `16.22.0`
- [stylelint] Updated `stylelint-scss` from `6.12.0` to `6.12.1`
- [eslint] Added [`no-unassigned-vars`](https://github.com/eslint/eslint/blob/main/docs/src/rules/no-unassigned-vars.md) rule
- [eslint] Added [`unicorn/prefer-class-fields`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-class-fields.md) rule
- [eslint] Added [`unicorn/no-array-reverse`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reverse.md) rule
- [eslint] Added [`unicorn/require-module-specifiers`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-module-specifiers.md) rule
- [eslint] Added [`unicorn/no-useless-error-capture-stack-trace`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-error-capture-stack-trace.md) rule
- [eslint] Added [`jest/prefer-ending-with-an-expect`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-ending-with-an-expect.md) rule
- [eslint] Added but disabled [`import/enforce-node-protocol-usage`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/enforce-node-protocol-usage.md) rule, as this is covered by `unicorn/prefer-node-protocol`
- [eslint] Added but disabled [`n/no-top-level-await`](https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-top-level-await.md) rule as it conflicts with `unicorn/prefer-top-level-await`
- [eslint] Rename `@stylistic/func-call-spacing` to `@stylistic/function-call-spacing`
- [stylelint] Activate `custom-property-empty-line-before` rule and `ignore` `"after-custom-property"`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.6.0...v7.7.0)

## [7.6.0] - 2025-05-14

### Changed

- [general] Added support for `.css` files in ESLint and Stylelint rules
- [eslint] Updated `eslint` from `9.24.0` to `9.26.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `4.3.2` to `4.3.4`
- [eslint] Updated `eslint-plugin-jsdoc` from `50.6.9` to `50.6.17`
- [eslint] Updated `eslint-plugin-n` from `17.17.0` to `17.18.0`
- [eslint] Updated `eslint-plugin-unicorn` from `58.0.0` to `59.0.1`
- [eslint] Updated `globals` from `16.0.0` to `16.1.0`
- [eslint] Updated `typescript-eslint` from `8.29.1` to `8.32.1`
- [stylelint] Updated `stylelint` from `16.18.0` to `16.19.1`
- [stylelint] Updated `stylelint-order` from `6.0.4` to `7.0.0`
- [stylelint] Updated `stylelint-scss` from `6.11.1` to `6.12.0`
- [eslint] Renamed `unicorn/no-array-push-push` rule to `prefer-single-call`
- [eslint] Renamed `unicorn/no-length-as-slice-end` rule to `no-unnecessary-slice-end`
- [eslint] Added but disabled [`unicorn/prefer-import-meta-properties`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-import-meta-properties.md) rule
- [eslint] Added [`unicorn/no-unnecessary-array-flat-depth`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-flat-depth.md) rule
- [eslint] Added [`unicorn/no-unnecessary-array-splice-count`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-splice-count.md) rule
- [eslint] Activated [`unicorn/prefer-event-target`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-event-target.md) rule
- [eslint] Activated [`unicorn/prefer-top-level-await`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md) rule
- [eslint] Added [`@typescript-eslint/no-unnecessary-type-conversion`](https://typescript-eslint.io/rules/no-unnecessary-type-conversion/) rule
- [stylelint] Activated [`selector-not-notation`](https://stylelint.io/user-guide/rules/selector-not-notation/) rule with "complex" option

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.5.0...v7.6.0)

## [7.5.0] - 2025-04-08

### Changed

- [eslint] Updated `eslint` from `9.23.0` to `9.24.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `4.2.2` to `4.3.2`
- [eslint] Updated `eslint-plugin-jsdoc` from `50.6.8` to `50.6.9`
- [eslint] Updated `eslint-plugin-n` from `17.16.2` to `17.17.0`
- [eslint] Updated `eslint-plugin-react` from `7.37.4` to `7.37.5`
- [eslint] Updated `eslint-plugin-unicorn` from `57.0.0` to `58.0.0`
- [eslint] Updated `typescript-eslint` from `8.27.0` to `8.29.1`
- [stylelint] Updated `stylelint` from `16.16.0` to `16.18.0`
- [eslint] Disabled [`unicorn/prefer-global-this`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-global-this.md) rule
- [eslint] Disabled [`unicorn/prefer-string-raw`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-raw.md) rule
- [stylelint] Added new [`color-function-alias-notation`](https://github.com/stylelint/stylelint/blob/main/lib/rules/color-function-alias-notation/README.md) rule and set it to `without-alpha`
- [stylelint] Added new [`container-name-pattern`](https://github.com/stylelint/stylelint/blob/main/lib/rules/container-name-pattern/README.md) rule and apply `sass` > `patternPrefix` from the linter-bundle configuration, if set
- [stylelint] Added new [`layer-name-pattern`](https://github.com/stylelint/stylelint/blob/main/lib/rules/layer-name-pattern/README.md) rule and apply `sass` > `patternPrefix` from the linter-bundle configuration, if set

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.4.0...v7.5.0)

## [7.4.0] - 2025-03-23

### Changed

- [eslint] Updated `eslint` from `9.22.0` to `9.23.0`
- [eslint/react] Activated `allowExpressions` of the `@typescript-eslint/explicit-function-return-type`rule also for the React overrides

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.3.0...v7.4.0)

## [7.3.0] - 2025-03-20

### Changed

- [eslint] Updated `eslint-import-resolver-typescript` from `4.2.0` to `4.2.2`
- [eslint] Updated `typescript-eslint` from `8.26.1` to `8.27.0`
- [stylelint] Refactored all mocked stylistic Stylelint rule, to get rid of the deprecated `context.fix`

### Removed

- [stylelint] Removed the stylistic `linebreaks` plugin, as this can be achieved using the `.editorconfig` file

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.2.0...v7.3.0)

## [7.2.0] - 2025-03-18

### Changed

- [eslint] Updated `eslint-import-resolver-typescript` from `3.9.0` to `4.2.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `50.6.6` to `50.6.8`
- [eslint/jest] Disabled `import/dynamic-import-chunkname` rule for tests
- [eslint] Adjusted `padding-line-between-statements` rule, to enforce empty line around directives (like `"use client";`)
- [eslint/react] Adjusted `@typescript-eslint/no-empty-object-type` rule, to allow empty interfaces with the suffix `Props` in TSX files
- [eslint] Optimized position of closing parenthesis in `enforce-logical-expression-parens` and `enforce-ternary-parens` rule

### Added

- [stylelint] Re-added fixers of the mocked stylistic Stylelint rule.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.1.2...v7.2.0)

## [7.1.2] - 2025-03-15

### Fixed

- [eslint] Add line-break before variable declarations groups

### Changed

- [eslint] Optimize parens position of `enforce-logical-expression-parens` and `enforce-ternary-parens`
- [eslint] Improve `eslint.config.mjs` code example in [README.md](./README.md)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.1.1...v7.1.2)

## [7.1.1] - 2025-03-15

### Fixed

- [eslint/react] Fixed `Key "plugins": Cannot redefine plugin "linter-bundle".` issue

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.1.0...v7.1.1)

## [7.1.0] - 2025-03-15

### Fixed

- [eslint/jest] Fix code for Jest Version detection

### Changed

- [general] Suppress Node.js warnings, such as 'ExperimentalWarning: Importing JSON modules is an experimental feature and might change at any time' (which is triggered by ESLint)
- [eslint] Added custom linter rule [`linter-bundle/enforce-logical-expression-parens`](./eslint/rules/enforce-logical-expression-parens.md) which enforces parentheses around logical operations
- [eslint] Added custom linter rule [`linter-bundle/enforce-ternary-parens`](./eslint/rules/enforce-ternary-parens.md) which ensures ternary expressions are wrapped in parentheses
- [eslint] Added custom linter rule [`linter-bundle/no-extra-spaces-in-generics`](./eslint/rules/no-extra-spaces-in-generics.md) to disallows spaces after the `<` and before the `>` in TypeScript generics
- [eslint] Added custom linter rule [`linter-bundle/no-ternary-return`](./eslint/rules/no-ternary-return.md) which disallows ternary expressions as return values for better readability
- [eslint] Configured [`padding-line-between-statements`](https://eslint.org/docs/latest/rules/padding-line-between-statements) to enforce line-breaks before `return`, `throw`, `break`, `continue`, around multi-line block statements and around `const`, `let`, `var` groups
- [eslint/react] Added custom linter rule [`linter-bundle/ensure-lucide-import-consistency`](./eslint/rules/ensure-lucide-import-consistency.md) to enforces using [Lucide](https://lucide.dev/guide/packages/lucide-react) prefix for lucide-react imports and their usage
- [eslint] Updated `eslint-import-resolver-typescript` from `3.8.4` to `3.9.0`
- [stylelint] Updated `stylelint` from `16.15.0` to `16.16.0`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v7.0.0...v7.1.0)

## [7.0.0] - 2025-03-11

### Breaking Changes

- [general] All configuration files have been migrated from CommonJS to ESModules
- [general] The global configuration variable `global.linterBundleSettings` has been replaced by a `.linter-bundle.json` / `.linter-bundle.mjs` / `.linter-bundle.cjs` / `.linter-bundle.js` configuration file in the projects root directory
- [eslint] It's now using the ESLint Flat Config format
- [eslint] `.eslintrc.js` needs to be renamed to `eslint.config.mjs`, `module.exports =` needs to be replaced by `export default [`. See [eslint.org](https://eslint.org/docs/latest/use/configure/migration-guide#key-differences-between-configuration-formats) website additional required changes
- [eslint] The VSCode configuration needs to be adapted. See [README.md](./README.md)
- [eslint] The prefixes "override-" has been removed from the specialized rule files and the suffix `.cjs` has been replaced by `.mjs`
- [stylelint] The stylelint configuration has been renamed from `linter-bundle/stylelint.cjs` to  `linter-bundle/stylelint.mjs`
- [stylelint] As the interface for rules changed slightly, I had to remove some auto-fixes for the previously forked stylistic rules.
- [general] Drop support for Node.js version less than v20.9.0 and v21.1.0 as a lot of the ESLint plugins are not supporting them

### Fixed

- [eslint] Fixed "Error reading .linter-bundle.js" in VSCode in some conditions

Beside these changes:

### Changed

- [general] `"extends"` in the .eslintrc.js needs to be suffixed with the ".mjs" file extension (e.g. `require.resolve('linter-bundle/eslint.mjs')`)
- [general] `"extends"` in the stylelint.config.js needs to be suffixed with the ".mjs" file extension (e.g. `require.resolve('linter-bundle/stylelint.mjs')`)
- [eslint] Updated `@typescript-eslint` from `6.21.0` to `8.26.1`
- [eslint] Updated `eslint` from `8.56.0` to `9.22.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.6.1` to `3.8.4`
- [eslint] Updated `eslint-import-resolver-webpack` from `0.13.8` to `0.13.10`
- [eslint] Updated `eslint-plugin-functional` from `6.0.0` to `9.0.1`
- [eslint] Updated `eslint-plugin-jest` from `27.6.3` to `28.11.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `48.0.5` to `50.6.6`
- [eslint] Updated `eslint-plugin-jsx-a11y` from `6.8.0` to `6.10.2`
- [eslint] Updated `eslint-plugin-n` from `16.6.2` to `17.16.2`
- [eslint] Updated `eslint-plugin-promise` from `6.1.1` to `7.2.1`
- [eslint] Updated `eslint-plugin-react` from `7.33.2` to `7.37.4`
- [eslint] Updated `eslint-plugin-react-hooks` from `4.6.0` to `5.2.0`
- [eslint] Updated `eslint-plugin-unicorn` from `51.0.0` to `57.0.0`
- [eslint] Updated `@stylistic/eslint-plugin` from `2.11.0` to `4.2.0`
- [markdownlint] Updated `markdownlint-cli` from `0.39.0` to `0.44.0`
- [stylelint] Updated `stylelint` from `16.2.1` to `16.15.0`
- [stylelint] Updated `stylelint-scss` from `6.1.0` to `6.11.1`
- [stylelint] Updated `stylelint-high-performance-animation` from `1.10.0` to `1.11.0`
- [audit] Updated `better-npm-audit` from `3.7.3` to `3.11.0`
- [eslint] Activate `checkTypePredicates` of [`@typescript-eslint/no-unnecessary-condition`](https://typescript-eslint.io/rules/no-unnecessary-condition/) rule
- [eslint] Adjusted `@typescript-eslint/naming-convention` rule configuration to allow constant names starting with "_" if they are unused
- [eslint] Renamed the rule `no-unnecessary-typeof` to `linter-bundle/no-unnecessary-typeof`
- [eslint] Renamed the rule `restricted-filenames` to `linter-bundle/restricted-filenames`
- [eslint] Increase `max` of `import/max-dependencies` rule from 20 to 25
- [eslint] Disabled `unicorn/string-content` as it sometimes breaks code (e.g. imports with `...` in Next.js or GraphQL template strings)

### Added

- [eslint] Added "_" and "c" to allowed id names in [`id-length`] rule
- [eslint] Added [`@typescript-eslint/no-unnecessary-template-expression`](https://typescript-eslint.io/rules/no-unnecessary-template-expression/) rule (replaces `@typescript-eslint/no-useless-template-literals`)
- [eslint] Added but disabled new [`functional/no-class-inheritance`](https://github.com/eslint-functional/eslint-plugin-functional/blob/main/docs/rules/no-class-inheritance.md) rule
- [eslint] Added new [`@typescript-eslint/consistent-return`](https://typescript-eslint.io/rules/consistent-return/) rule
- [eslint] Added new [`@typescript-eslint/no-unnecessary-parameter-property-assignment`](https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment/) rule
- [eslint] Added new [`@typescript-eslint/no-unnecessary-type-parameters`](https://typescript-eslint.io/rules/no-unnecessary-type-parameters/) rule
- [eslint] Added new [`@typescript-eslint/no-unsafe-type-assertion`](https://typescript-eslint.io/rules/no-unsafe-type-assertion/) rule
- [eslint] Added new [`@typescript-eslint/no-useless-assignment`](https://eslint.org/docs/latest/rules/no-useless-assignment) rule
- [eslint] Added new [`@typescript-eslint/only-throw-error`](https://typescript-eslint.io/rules/only-throw-error/) rule
- [eslint] Added new [`@typescript-eslint/use-unknown-in-catch-callback-variable`](https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable/) rule
- [eslint] Added new [`no-empty-object-type`](https://typescript-eslint.io/rules/no-empty-object-type/) rule
- [eslint] Added new [`promise/spec-only`](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/spec-only.md) rule
- [eslint] Added new [`unicorn/consistent-empty-array-spread`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-empty-array-spread.md) rule
- [eslint] Added new [`unicorn/consistent-existence-index-check`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-existence-index-check.md) rule
- [eslint] Added new [`unicorn/no-invalid-fetch-options`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-fetch-options.md) rule
- [eslint] Added new [`unicorn/no-length-as-slice-end`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-length-as-slice-end.md) rule
- [eslint] Added new [`unicorn/no-magic-array-flat-depth`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-magic-array-flat-depth.md) rule
- [eslint] Added new [`unicorn/no-negation-in-equality-check`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negation-in-equality-check.md) rule
- [eslint] Added new [`unicorn/prefer-global-this`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-global-this.md) rule
- [eslint] Added new [`unicorn/prefer-math-min-max`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-min-max.md) rule
- [eslint] Added new [`unicorn/prefer-string-raw`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-raw.md) rule
- [eslint] Added new [`unicorn/prefer-structured-clone`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-structured-clone.md) rule
- [eslint] Added new [`unicorn/consistent-date-clone`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-date-clone.md) rule
- [eslint] Added new [`unicorn/consistent-assert`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-assert.md) rule
- [eslint] Added new [`unicorn/no-accessor-recursion`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-accessor-recursion.md) rule
- [eslint] Added new [`unicorn/no-instanceof-builtins`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-builtins.md) rule
- [eslint] Added new [`unicorn/no-named-default`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-named-default.md) rule
- [eslint] Replaced deprecated `unicorn/no-instanceof-array` by new [`unicorn/no-instanceof-builtins`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-builtins.md) rule
- [eslint] Activate `linterOptions.reportUnusedInlineConfigs` setting
- [eslint/jsdoc] Added [`jsdoc/require-template`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-template.md) rule
- [eslint/jsdoc] Added but disabled new [jsdoc/convert-to-jsdoc-comments`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/convert-to-jsdoc-comments.md) rule
- [eslint/jsdoc] Added new [`jsdoc/check-template-names`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-template-names.md) rule
- [eslint/jsdoc] Added new [`jsdoc/lines-before-block`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/lines-before-block.md) rule with disabled `ignoreSameLine`
- [eslint/react] Added new [`react/forward-ref-uses-ref`](https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.36.0/docs/rules/forward-ref-uses-ref.md) rule
- [eslint/react] Activate `ignoreTranspilerName` for  [`react/display-name`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md)
- [eslint/react] Activate `unicorn/prefer-node-protocol` rule
- [eslint/react] Added new [`react/checked-requires-onchange-or-readonly`](https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.34.0/docs/rules/checked-requires-onchange-or-readonly.md) rule
- [eslint/react] Added new [`react/jsx-props-no-spread-multi`](https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.35.0/docs/rules/jsx-props-no-spread-multi.md) rule
- [eslint/jest] Added but disabled new[`jest/prefer-importing-jest-globals`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-importing-jest-globals.md) rule
- [eslint/jest] Added new [`jest/prefer-jest-mocked`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-jest-mocked.md) rule
- [eslint/promise] Added new [`promise/prefer-catch`](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/prefer-catch.md) rule
- [markdownlint] Added new [`MD058/blanks-around-tables`](https://github.com/DavidAnson/markdownlint/blob/main/doc/md058.md) rule
- [stylelint] Added and disabled new [`scss/at-import-partial-extension-allowed-list`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-partial-extension-allowed-list/README.md) rule, and removed deprecated `at-import-partial-extension-whitelist` rule
- [stylelint] Added and disabled new [`scss/at-import-partial-extension-disallowed-list`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-import-partial-extension-disallowed-list/README.md) rule, and removed deprecated `at-import-partial-extension-blacklist rule` rule
- [stylelint] Added new [`no-unknown-custom-media`](https://stylelint.io/user-guide/rules/no-unknown-custom-media/) rule
- [stylelint] Added new [`scss/at-mixin-no-risky-nesting-selector`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-no-risky-nesting-selector/README.md) rule
- [stylelint] Added new [`scss/declaration-property-value-no-unknown`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-property-value-no-unknown/README.md) rule, which disabled `declaration-property-value-no-unknown`
- [stylelint] Added new [`scss/function-color-channel`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-color-channel/README.md) rule
- [stylelint] Added new [`scss/load-partial-extension`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/load-partial-extension/README.md) rule, and removed deprecated `at-import-partial-extension` rule
- [stylelint] Added new [`scss/no-duplicate-load-rules`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-load-rules) rule
- [stylelint] Added new [`at-rule-descriptor-no-unknown`](https://stylelint.io/user-guide/rules/at-rule-descriptor-no-unknown/) rule
- [stylelint] Added new [`at-rule-descriptor-value-no-unknown`](https://stylelint.io/user-guide/rules/at-rule-descriptor-value-no-unknown/) rule
- [stylelint] Added new [`at-rule-no-deprecated`](https://stylelint.io/user-guide/rules/at-rule-no-deprecated/) rule
- [stylelint] Added new [`at-rule-prelude-no-invalid`](https://stylelint.io/user-guide/rules/at-rule-prelude-no-invalid/) rule
- [stylelint] Added new [`declaration-property-value-keyword-no-deprecated`](https://stylelint.io/user-guide/rules/declaration-property-value-keyword-no-deprecated/) rule
- [stylelint] Added new [`syntax-string-no-invalid`](https://stylelint.io/user-guide/rules/syntax-string-no-invalid/) rule
- [stylelint] Show rule performance information
- [stylelint] Activated [`reportUnscopedDisables`] setting

### Removed

- [eslint] Removed deprecated `@typescript-eslint/ban-types` rule
- [eslint] Removed deprecated `@typescript-eslint/no-throw-literal` rule
- [eslint] Removed deprecated `no-new-symbol` rule
- [eslint] Removed deprecated `prefer-ts-expect-error` rule
- [eslint] Replaced deprecated `@typescript-eslint/no-loss-of-precision` rule by ESLint `no-loss-of-precision`
- [eslint/gatsby] Removed `no-global-undefined-check` rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v6.3.0...v7.0.0)

## [6.3.0] - 2024-02-06

### Changed

- [eslint] Updated `@typescript-eslint/eslint-plugin` from `6.19.1` to `6.21.0`
- [eslint] Updated `eslint-plugin-unicorn` from `50.0.1` to `51.0.0`
- [eslint/overrides-jsdoc] Updated `eslint-plugin-jsdoc` from `48.0.3` to `48.0.5`
- [markdownlint] Updated `markdownlint-cli` from `0.38.0` to `0.39.0`
- [stylelint] Updated `stylelint` from `16.2.0` to `16.2.1`
- [eslint] Make use of [`@typescript-eslint/no-array-delete`](https://typescript-eslint.io/rules/no-array-delete/) rule
- [eslint] Make use of [`@typescript-eslint/no-useless-template-literals`](https://typescript-eslint.io/rules/no-useless-template-literals/) rule
- [eslint] Make use of [`@typescript-eslint/prefer-find`](https://typescript-eslint.io/rules/prefer-find/) rule
- [eslint] Make use of [`@typescript-eslint/prefer-promise-reject-errors`](https://typescript-eslint.io/rules/prefer-promise-reject-errors/) rule
- [markdownlint] Make use of new [`MD054`/link-image-style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md054.md) rule
- [markdownlint] Make use of new [`MD056`/table-column-count](https://github.com/DavidAnson/markdownlint/blob/main/doc/md056.md) rule
- [audit] Updated `improved-yarn-audit` from `3.0.0` to `3.0.3`

### Added

- [eslint] Added "Params" to the [unicorn/prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v32.0.1/docs/rules/prevent-abbreviations.md) `ignore` list.
- [eslint] Added the possibility to configure additional options for the [`@typescript-eslint/naming-convention`](https://typescript-eslint.io/rules/naming-convention/) rule in the `overrides.general` linter-bundle configuration

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v6.2.2...v6.3.0)

## [6.2.2] - 2024-01-25

### Fixed

- [eslint/overrides-jest] Changed `jest/no-confusing-set-time` to correct rule name [`jest/no-confusing-set-timeout`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-confusing-set-timeout.md)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v6.2.1...v6.2.2)

## [6.2.1] - 2024-01-25

### Changed

- [stylelint] Change order of `(inset/margin/padding)-block` and `(inset/margin/padding)-inset`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v6.2.0...v6.2.1)

## [6.2.0] - 2024-01-25

### Changed

- [eslint/overrides-jsdoc] Updated `eslint-plugin-jsdoc` from `48.0.2` to `48.0.3`
- [stylelint] Remove `padding-inline`, `margin-inline`, `inset-inline`, `inset-inline-start` and `inset-inline-end` from [`property-disallowed-list`](https://stylelint.io/user-guide/rules/property-disallowed-list/) rule, as it is supported in all main browsers since at least 3 years
- [stylelint] Add `inset-block(-start/-end)`, `inset-inline(-start/-end)`, `padding-block(-start/-end)`, `padding-inline(-start/-end)` and `margin-block(-start/-end)`, `margin-inline(-start/-end)`
  to [`order/properties-order`](https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md) configuration

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v6.1.0...v6.2.0)

## [6.1.0] - 2024-01-24

### Changed

- [eslint] Updated `@typescript-eslint` from `6.19.0` to `6.19.1`
- [stylelint] Updated `stylelint-scss` from `6.0.0` to `6.1.0`
- [eslint] Activate `allowConstantLoopConditions` of [`@typescript-eslint/no-unnecessary-condition`](https://typescript-eslint.io/rules/no-unnecessary-condition/) rule, as this is covered by [`no-constant-condition`](https://archive.eslint.org/docs/rules/no-constant-condition)
- [eslint] Allow "camelCase" and "PascalCase" style in [`@typescript-eslint/naming-convention`](https://typescript-eslint.io/rules/naming-convention/) rule for imports
- [eslint/overrides-javascript] Disable [`unicorn/prefer-module`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md) for *.js files in the root directory (so that configuration files are ignored)
- [stylelint] Make use of new [`scss/no-unused-private-members`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-unused-private-members/README.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v6.0.0...v6.1.0)

## [6.0.0] - 2024-01-21

### Added

- [eslint] Make use of new [`@typescript-eslint/no-useless-empty-export`](https://typescript-eslint.io/rules/no-useless-empty-export) rule
- [eslint] Make use of new [`@typescript-eslint/no-unsafe-unary-minus`](https://typescript-eslint.io/rules/no-unsafe-unary-minus/) rule
- [eslint] Make use of new [`no-object-constructor`](https://eslint.org/docs/latest/rules/no-object-constructor) rule
- [eslint] Make use of new [`unicorn/no-unnecessary-polyfills`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-polyfills.md) rule
- [markdownlint] Make use of new [`MD054`/link-image-style](https://github.com/DavidAnson/markdownlint/blob/main/doc/md054.md) rule
- [eslint/overrides-jest] Make use of new [`jest/no-confusing-set-timeout`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-confusing-set-timeout.md) rule
- [eslint/overrides-jsdoc] Make use of [`jsdoc/informative-docs`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/informative-docs.md) rule
- [stylelint] Make use of new [`lightness-notation`](https://stylelint.io/user-guide/rules/lightness-notation/) rule with option "percentage"
- [stylelint] Make use of new [`scss/at-root-no-redundant`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-root-no-redundant/README.md) rule
- [stylelint] Make use of new [`scss/property-no-unknown`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/property-no-unknown/README.md) rule, replacing [`property-no-unknown`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/property-no-unknown/) rule
- [stylelint] Make use of new [`scss/function-calculation-no-interpolation`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-calculation-no-interpolation/README.md) rule
- [stylelint] Added, but disabled new [`scss/block-no-redundant-nesting`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/block-no-redundant-nesting/README.md) rule
- [stylelint] Added, but disabled new [`scss/load-no-partial-leading-underscore`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/load-no-partial-leading-underscore/README.md) rule
- [stylelint] Added, but disabled [`scss/at-use-no-redundant-alias`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-use-no-redundant-alias/README.md) rule

### Fixed

- [general] Removed '--verbose' argument for `tsc` and `markdownlint`, which don't support it
- [general] Show errors in linter-bundle configuration file

### Changed

- [general] Drop support for Node.js version less than v18.12.0 as `stylelint@16.0.0` doesn't support them anymore
- [eslint] Updated `@typescript-eslint` from `6.5.0` to `6.19.0`
- [eslint] Updated `eslint` from `8.48.0` to `8.56.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.6.0` to `3.6.1`
- [eslint] Updated `eslint-import-resolver-webpack` from `0.13.7` to `0.13.8`
- [eslint] Updated `eslint-plugin-import` from `2.28.1` to `2.29.1`
- [eslint] Updated `eslint-plugin-jest` from `27.2.3` to `27.6.3`
- [eslint] Updated `eslint-plugin-jsdoc` from `46.5.1` to `48.0.2`
- [eslint] Updated `eslint-plugin-jsx-a11y` from `6.7.1` to `6.8.0`
- [eslint] Updated `eslint-plugin-n` from `16.0.2` to `16.6.2`
- [eslint] Updated `eslint-plugin-unicorn` from `48.0.1` to `50.0.1`
- [markdownlint] Updated `markdownlint-cli` from `0.36.0` to `0.38.0`
- [stylelint] Updated `postcss-scss` from `4.0.7` to `4.0.9`
- [stylelint] Updated `stylelint` from `15.10.3` to `16.2.0`
- [stylelint] Updated `stylelint-declaration-block-no-ignored-properties` from `2.7.0` to `2.8.0`
- [stylelint] Updated `stylelint-order` from `6.0.3` to `6.0.4`
- [stylelint] Updated `stylelint-scss` from `5.1.0` to `6.0.0`
- [stylelint] Updated `stylelint-use-logical-spec` from `5.0.0` to `5.0.1`
- [stylelint] Forked 73 stylistic rules from `stylelint@15.11.0` which have been removed in `stylelint@16.0.0`
- [audit] Updated `better-npm-audit` from `1.9.1` to `3.7.3`
- [audit] Updated `improved-yarn-audit` from `2.3.3` to `3.0.0`
- [eslint] Enable `ignoreOverrideMethods` and `ignoreClassesThatImplementAnInterface` of [`@typescript-eslint/class-methods-use-this`](https://typescript-eslint.io/rules/class-methods-use-this/) rule
- [eslint] Enable `includeTypes` option of [`import/no-extraneous-dependencies`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md) rule
- [eslint/overrides-javascript] Activated rule [`unicorn/prefer-module`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md) rule
- [stylelint] Re-use [`stylelint-high-performance-animation`](https://www.npmjs.com/package/stylelint-high-performance-animation) instead of the fork, as it seems to be maintained again

### Removed

- [eslint] Remove deprecated `no-new-object` rule
- [markdownlint] Update removed the deprecated `MD002`/`MD006` rules
- [markdownlint] Update removed rule aliases for "header"
- [stylelint] Removed deprecated `scss/at-import-no-partial-leading-underscore` rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v5.1.0...v6.0.0)

## [5.1.0] - 2023-09-03

### Added

- [general] Added basic schema for `.linter-bundle.json` configuration file

### Fixed

- [general] Fix support for `.linter-bundle.json`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v5.0.1...v5.1.0)

## [5.0.1] - 2023-09-03

### Changed

- [general] Updated [README.md](./README.md) to reflect breaking changes in v5.0.0.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v5.0.0...v5.0.1)

## [5.0.0] - 2023-09-03

### Breaking change

- [general] Migrated the code base from CommonJS to ESModules (as far as possible, because ESLint currently does not support ESModules)
- [general] The linter-bundle configuration can now be a ESModule (`.linter-bundle.mjs` is supported)
- [general] `"extends"` in the .eslintrc.js needs to be suffixed with the ".cjs" file extension (e.g. `require.resolve('linter-bundle/eslint.cjs')`)
- [general] `"extends"` in the stylelint.config.js needs to be suffixed with the ".cjs" file extension (e.g. `require.resolve('linter-bundle/stylelint.cjs')`)

### Changed

- [files] Report unmatched `allowed` pattern
- [markdownlint] Updated `markdownlint-cli` from `0.35.0` to `0.36.0`
- [eslint] Disabled `considerComments` option of [`import/new-after-import`](https://github.com/import-js/eslint-plugin-import/blob/v2.28.1/docs/rules/newline-after-import.md) rule
  as it conflicts with the [`import/order`](https://github.com/import-js/eslint-plugin-import/blob/v2.28.1/docs/rules/order.md) rule
- [eslint/overrides-javascript] Disable [`import/dynamic-import-chunkname`](https://github.com/import-js/eslint-plugin-import/blob/v2.28.1/docs/rules/dynamic-import-chunkname.md) for JavaScript files

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v4.0.3...v5.0.0)

## [4.0.3] - 2023-08-31

### Fixed

- [files] Don't show "No relevant files changed." if the `--git`` option was not used

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v4.0.2...v4.0.3)

## [4.0.2] - 2023-08-31

### Fixed

- [files] Don't append `"**"` as fallback argument to the command line

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v4.0.1...v4.0.2)

## [4.0.1] - 2023-08-31

### Changed

- [eslint] Disabled `unicorn/filename-case` in favour of the new linter-bundle `files` task

### Fixed

- [files] Fixed path to `files` task

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v4.0.0...v4.0.1)

## [4.0.0] - 2023-08-30

### Breaking change

- [general] The global configuration variable `global.linterBundleSettings` has been replaced by a `.linter-bundle.json` / `.linter-bundle.cjs` / `.linter-bundle.js` configuration file in the projects root directory

### Added

- [general] New `files` task which ensures that files in the project match the restrictions defined in the linter-bundle configuration file.

### Changed

- [eslint] Updated `eslint-plugin-jsdoc` from `46.5.0` to `46.5.1`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.10.0...v4.0.0)

## [3.10.0] - 2023-08-29

### Changed

- [eslint] Updated `@typescript-eslint` from `6.4.1` to `6.5.0`

### Fixed

- [eslint] Don't consider files outside of `basePath` in [`restricted-filenames`](./eslint/rules/restricted-filenames.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.9.0...v3.10.0)

## [3.9.0] - 2023-08-28

### Changed

- [general] Use users default shell for linting sub-processes

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.8.0...v3.9.0)

## [3.8.0] - 2023-08-28

### Changed

- [eslint] Updated `@typescript-eslint` from `6.3.0` to `6.4.1`
- [eslint] Updated `eslint` from `8.47.0` to `8.48.0`
- [eslint] Updated `eslint-import-resolver-webpack` from `0.13.4` to `0.13.7`
- [eslint] Updated `eslint-plugin-import` from `2.28.0` to `2.28.1`
- [eslint] Updated `eslint-plugin-jsdoc` from `46.4.6` to `46.5.0`
- [eslint] Updated `eslint-plugin-n` from `16.0.1` to `16.0.2`
- [eslint] Updated `eslint-plugin-react` from `7.33.1` to `7.33.2`
- [stylelint] Updated `postcss-scss` from `4.0.6` to `4.0.7`
- [stylelint] Updated `stylelint` from `15.10.2` to `15.10.3`

### Added

- [eslint] New rule [`restricted-filenames`](./eslint/rules/restricted-filenames.md), which restrict file and path names with given glob patterns.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.7.0...v3.8.0)

## [3.7.0] - 2023-08-11

### Changed

- [eslint] Adjusted `jsdoc/tag-lines` configuration to enforce no empty like for `@typedef`, `@property` and `@returns`; and weakened line configuration for `@see`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.6.0...v3.7.0)

## [3.6.0] - 2023-08-11

### Changed

- [general] Change peer-dependency of `typescript` from `^4.0.0` to `>=4.0.0`
- [eslint] Updated `@typescript-eslint` from `6.2.0` to `6.3.0`
- [eslint] Updated `eslint` from `8.45.0` to `8.47.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.5.5` to `3.6.0`
- [eslint] Updated `eslint-import-resolver-webpack` from `0.13.2` to `0.13.4`
- [eslint] Updated `eslint-plugin-functional` from `5.0.8` to `6.0.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `46.4.5` to `46.4.6`
- [eslint] Updated `eslint-plugin-react` from `7.33.0` to `7.33.1`
- [stylelint] Updated `stylelint-scss` from `5.0.1` to `5.1.0`
- [styleint] Added but disabled [`scss/function-disallowed-list`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-disallowed-list) rule

### Removed

- [eslint] Removed deprecated (and currently disabled) `no-return-await` rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.5.0...v3.6.0)

## [3.5.0] - 2023-07-28

### Changed

- [eslint] Updated `@typescript-eslint/eslint-plugin` from `6.1.0` to `6.2.0`
- [eslint] Updated `eslint-plugin-import` from `2.27.5` to `2.28.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `46.4.4` to `46.4.5`
- [eslint] Updated `eslint-plugin-react` from `7.32.2` to `7.33.0`
- [eslint] Updated `eslint-plugin-unicorn` from `48.0.0` to `48.0.1`
- [eslint] Reactivated `unicorn/no-empty-file`
- [eslint] Activated `ignoreConditionalTests` and `ignoreMixedLogicalExpressions` options of [@typescript-eslint/prefer-nullish-coalescing](https://typescript-eslint.io/rules/prefer-nullish-coalescing.md) rule
- [styleint] Set `ignoreFunctions` option to `/^custom-/u` of [`scss/function-no-unknown`](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-no-unknown/README.md) rule
- [stylelint] Ignore SCSS variables in [`declaration-property-value-no-unknown`](https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown/) rule
- [stylelint] Ignore wrapping parentheses for `grid-template-areas` values in [`declaration-property-value-no-unknown`](https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown/) rule

### Added

- Replace the ESLint rule `class-methods-use-this` by the new [`@typescript-eslint/class-methods-use-this`](https://typescript-eslint.io/rules/class-methods-use-this/) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.4.0...v3.5.0)

## [3.4.0] - 2023-07-20

### Changed

- [eslint] Updated `@typescript-eslint` from `6.0.0` to `6.1.0`
- [eslint] Updated `eslint` from `8.44.0` to `8.45.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `46.4.3` to `46.4.4`
- [eslint] Updated `eslint-plugin-unicorn` from `47.0.0` to `48.0.0`
- [stylelint] Updated `stylelint` from `15.10.1` to `15.10.2`
- [eslint] Moved `unicorn/import-style` configuration for `path` (unassigned: false, default: false, namespace: true, named: true) from `overrides-storybook` into the main configuration.
- [eslint/overrides-javascript] Activated [`unicorn/prefer-top-level-await`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md) rule for `*.mjs` files.

### Fixed

- [stylelint] Fixed `Cannot find module 'node_modules/stylelint/bin/stylelint.js'` issue, if the file is called `stylelint.mjs`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.3.0...v3.4.0)

## [3.3.0] - 2023-07-13

### Changed

- [general] Drop support for Node.js version v17 (v16 is still supported), as `@typescript-eslint` v6.0.0 doesn't support it anymore
- [eslint] Updated `@typescript-eslint` from `5.59.9` to `6.0.0`
- [eslint] Updated `eslint` from `8.42.0` to `8.44.0`
- [eslint] Updated `eslint-plugin-jest` from `27.2.1` to `27.2.3`
- [eslint] Updated `eslint-plugin-n` from `16.0.0` to `16.0.1`
- [eslint/overrides-jsdoc] Updated `eslint-plugin-jsdoc` from `46.2.4` to `46.4.3`
- [markdownlint] Updated `markdownlint-cli` from `0.34.0` to `0.35.0`
- [stylelint] Updated `stylelint` from `15.7.0` to `15.10.1`
- [stylelint] Updated `stylelint-scss` from `5.0.0` to `5.0.1`
- [eslint/overrides-jsdoc] Don't enforce line-breaks before `@throws` by the [`jsdoc/tag-lines`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-tag-lines) rule
- [stylelint] Forked [`stylelint-selector-no-empty`](https://github.com/ssivanatarajan/stylelint-selector-no-empty), because it seems not to be regularly maintained anymore

### Added

- [stylelint] Make use of new [`media-feature-name-value-no-unknown`](https://github.com/stylelint/stylelint/blob/main/lib/rules/media-feature-name-value-no-unknown/README.md) rule
- [stylelint] Make use of new [`media-query-no-invalid`](https://github.com/stylelint/stylelint/blob/main/lib/rules/media-query-no-invalid/README.md) rule
- [eslint/overrides-javascript] Activated `@typescript-eslint/prefer-nullish-coalescing` for JavaScript file, as it is now supported in Node.js for a while.
- [eslint/overrides-javascript] Activated `@typescript-eslint/prefer-optional-chain` for JavaScript file, as it is now supported in Node.js for a while.

### Removed

- [eslint] Remove silently removed `@typescript-eslint/no-parameter-properties` rule
- [eslint] Disabled `unicorn/no-empty-file`, because of [false-positives](https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2175) with `@typescript-eslint v6.0.0`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.2.0...v3.3.0)

## [3.2.0] - 2023-06-06

### Changed

- [eslint] Updated `@typescript-eslint` from `5.59.8` to `5.59.9`
- [stylelint] Updated `stylelint` from `15.6.3` to `15.7.0`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.1.0...v3.2.0)

## [3.1.0] - 2023-06-05

### Changed

- [eslint] Disabled [`unicorn/prefer-blob-reading-methods`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md) rule, as it's not widely supported yet
- [eslint] Updated `@typescript-eslint` from `5.59.6` to `5.59.8`
- [eslint] Updated `eslint` from `8.40.0` to `8.42.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `44.2.4` to `46.2.4`
- [stylelint] Updated `stylelint` from `15.6.1` to `15.6.3`

### Added

- [eslint/overrides-jsdoc] Added, but disabled new [`jsdoc/imports-as-dependencies`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/imports-as-dependencies.md) rule, as it doesn't cover `peerDependencies` and Node.js modules (like `child_process`)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v3.0.0...v3.1.0)

## [3.0.0] - 2023-05-16

### Changed

- [general] The minimum required Node.js version is v16 now
- [eslint] Consider JavaScript files with the '.cjs' file extension (CommonJS Modules)
- [eslint] Consider TypeScript files with the '.mts' file extension (TypeScript ES Modules)
- [eslint] Consider TypeScript files with the '.cts' file extension (TypeScript CommonJS modules)
- [eslint] Move root rules into `overrides` to limit them to the files with the extensions `js`, `cjs`, `mjs`, `jsx`, `ts`, `cts`, `mts`, `tsx`, and to prevent that they are applied to `overrides` for non-JavaScript files (e.g. GraphQL schema files)
- [eslint] Updated `@typescript-eslint` from `5.59.2` to `5.59.6`
- [eslint] Updated `eslint` from `8.39.0` to `8.40.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `43.2.0` to `44.2.4`
- [eslint] Updated `eslint-plugin-n` from `15.7.0` to `16.0.0`
- [eslint] Updated `eslint-plugin-unicorn` from `46.0.0` to `47.0.0`
- [eslint] Make use of new [`unicorn/prefer-blob-reading-methods`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.29.0...v3.0.0)

## [2.29.0] - 2023-05-05

### Fixed

- [stylelint] Fix `liberty/use-logical-spec` and `order/properties-order` issue with the `inset` property

### Changed

- [eslint] Updated `@typescript-eslint` from `5.59.0` to `5.59.2`
- [eslint] Updated `eslint-plugin-jsdoc` from `43.0.7` to `43.2.0`
- [markdownlint] Updated `markdownlint-cli` from `0.33.0` to `0.34.0`
- [stylelint] Updated `stylelint` from `15.5.0` to `15.6.1`
- [stylelint] Updated `stylelint-scss` from `4.6.0` to `5.0.0`

### Added

- [eslint/overrides-jsdoc] Make use of new rule [`jsdoc/no-blank-blocks`](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-blocks.md)
- [stylelint] Reactivate [color-function-notation](https://github.com/stylelint/stylelint/blob/main/lib/rules/color-function-notation/README.md) with option `'modern'` and `ignore: ['with-var-inside']`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.28.0...v2.29.0)

## [2.28.0] - 2023-04-22

### Changed

- [eslint] Updated `@typescript-eslint` from `5.49.0` to `5.59.0`
- [eslint] Updated `eslint` from `8.32.0` to `8.39.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.5.3` to `3.5.5`
- [eslint] Updated `eslint-plugin-functional` from `4.4.1` to `5.0.8`
- [eslint] Updated `eslint-plugin-jsdoc` from `39.6.9` to `43.0.7`
- [eslint] Updated `eslint-plugin-n` from `15.6.1` to `15.7.0`
- [eslint] Updated `eslint-plugin-react` from `7.32.1` to `7.32.2`
- [eslint] Updated `eslint-plugin-unicorn` from `45.0.2` to `46.0.0`
- [stylelint] Updated `stylelint` from `14.16.1` to `15.5.0`
- [stylelint] Updated `stylelint-declaration-block-no-ignored-properties` from `2.6.0` to `2.7.0`
- [stylelint] Updated `stylelint-order` from `6.0.1` to `6.0.3`
- [stylelint] Updated `stylelint-scss` from `4.3.0` to `4.6.0`
- [stylelint] Updated `stylelint-use-logical-spec` from `4.1.0` to `5.0.0`
- [eslint] Consider JavaScript files with the '.mjs' file extension (ECMAScript Modules)
- [eslint] Activated [`react/destructuring-assignment`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md) rule
- [stylelint] Since all 76 stylistic Stylelint rules have been marked as deprecated, code to fork them has been implemented

### Added

- [eslint] Added new [`@typescript-eslint/key-spacing`](https://typescript-eslint.io/rules/key-spacing.md) rule
- [eslint] Added new [`@typescript-eslint/no-duplicate-type-constituents.md`](https://typescript-eslint.io/rules/no-duplicate-type-constituents.md) rule
- [eslint] Added new [`@typescript-eslint/no-import-type-side-effects`](https://typescript-eslint.io/rules/no-import-type-side-effects.md) rule
- [eslint] Added new [`@typescript-eslint/no-mixed-enums`](https://typescript-eslint.io/rules/no-mixed-enums.md) rule
- [eslint] Added new [`@typescript-eslint/no-unsafe-enum-comparison`](https://typescript-eslint.io/rules/no-unsafe-enum-comparison.md) rule
- [eslint] Added new [`@typescript-eslint/sort-type-constituents`](https://typescript-eslint.io/rules/sort-type-constituents.md) rule
- [eslint] Added new [`no-constant-binary-expression`](https://github.com/eslint/eslint/blob/main/docs/src/rules/no-constant-binary-expression.md) rule
- [eslint] Added new [`functional/prefer-immutable-types`](https://github.com/eslint-functional/eslint-plugin-functional/blob/main/docs/rules/prefer-immutable-types.md) rule, but disabled it
- [eslint] Added new [`functional/readonly-type`](https://github.com/eslint-functional/eslint-plugin-functional/blob/main/docs/rules/readonly-type.md) rule with option `keyword`
- [eslint] Added new [`functional/type-declaration-immutability`](https://github.com/eslint-functional/eslint-plugin-functional/blob/main/docs/rules/type-declaration-immutability.md) rule, but disabled it
- [stylelint] Added new [`declaration-property-value-no-unknown`](https://github.com/stylelint/stylelint/blob/main/lib/rules/declaration-property-value-no-unknown/README.md) rule
- [stylelint] Added new [`media-feature-name-unit-allowed-list`](https://github.com/stylelint/stylelint/blob/main/lib/rules/media-feature-name-unit-allowed-list/README.md) rule, but disabled it
- [stylelint] Added new [`no-unknown-custom-properties`](https://github.com/stylelint/stylelint/blob/main/lib/rules/no-unknown-custom-properties/README.md) rule, but disabled
- [stylelint] Added new [`selector-anb-no-unmatchable`](https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-anb-no-unmatchable/README.md) rule

### Removed

- [eslint] Removed deprecated rule `functional/prefer-readonly-type`
- [eslint/overrides-jsdoc] Removed deprecated rule `jsdoc/newline-after-description`
- [stylelint] Removed deprecated rule `at-rule-name-newline-after`
- [stylelint] Removed deprecated rule `block-closing-brace-space-after`
- [stylelint] Removed deprecated rule `block-opening-brace-newline-before`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.27.0...v2.28.0)

## [2.27.0] - 2023-01-27

### Changed

- [eslint] Updated `@typescript-eslint` from `5.41.0` to `5.49.0`
- [eslint] Updated `eslint` from `8.26.0` to `8.32.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.5.2` to `3.5.3`
- [eslint] Updated `eslint-plugin-import` from `2.26.0` to `2.27.5`
- [eslint] Updated `eslint-plugin-jest` from `27.1.3` to `27.2.1`
- [eslint] Updated `eslint-plugin-jsdoc` from `39.3.25` to `39.6.9`
- [eslint] Updated `eslint-plugin-jsx-a11y` from `6.6.1` to `6.7.1`
- [eslint] Updated `eslint-plugin-n` from `15.3.0` to `15.6.1`
- [eslint] Updated `eslint-plugin-react` from `7.31.10` to `7.32.1`
- [eslint] Updated `eslint-plugin-unicorn` from `44.0.2` to `45.0.2`
- [markdownlint] Updated `markdownlint-cli` from `0.32.2` to `0.33.0`
- [stylelint] Updated `postcss-scss` from `4.0.5` to `4.0.6`
- [stylelint] Updated `stylelint` from `14.14.0` to `14.16.1`
- [stylelint] Updated `stylelint-order` from `5.0.0` to `6.0.1`
- [eslint] Define order for getters and setters and private fields of [`@typescript-eslint/member-ordering`](https://typescript-eslint.io/rules/member-ordering/) rule

### Added

- [eslint] Added new [`no-empty-static-block`](https://eslint.org/docs/latest/rules/no-empty-static-block) rule
- [eslint] Added new [`no-new-native-nonconstructor`](https://eslint.org/docs/latest/rules/no-new-native-nonconstructor) rule
- [eslint] Added new [`import/no-empty-named-blocks`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-empty-named-blocks.md) rule
- [eslint] Added new [`import/consistent-type-specifier-style`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/consistent-type-specifier-style.md) rule, and used `"prefer-top-level"` option
- [eslint] Make use of new `alphabetize.orderImportKind` option of [`import/order`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/order.md) rule, and set it to `"asc"`
- [eslint] Make use of new `distinctGroup` option of [`import/order`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/order.md) rule, and set it to `false`
- [eslint] Make use of new `considerComments` option of [`import/newline-after-import`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md) rule, and set it to `true`
- [eslint] Added new [`unicorn/no-typeof-undefined`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-typeof-undefined.md) rule
- [eslint] Added, but disabled new [`unicorn/no-negated-condition`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md) rule
- [eslint] Added new [`unicorn/prefer-set-size`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-size.md) rule
- [eslint/overrides-jest] Added new [`jest/no-untyped-mock-factory`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-untyped-mock-factory.md) rule for TypeScript files
- [eslint/overrides-jsdoc] Activate `exemptDestructuredRootsFromChecks` setting for the rules [`jsdoc/require-param-type`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-type) and
  [`jsdoc/require-param-description`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-require-param-description)
- [eslint/overrides-jsdoc] Added, but disabled new [`jsdoc/text-escaping`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-text-escaping) rule
- [eslint/overrides-react] Added, but disabled new [`jsx-a11y/anchor-ambiguous-text`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-ambiguous-text.md) rule
- [eslint/overrides-react] Added new [`jsx-a11y/no-aria-hidden-on-focusable`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-aria-hidden-on-focusable.md) rule
- [eslint/overrides-react] Added new [`react/no-object-type-as-default-prop`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md) rule
- [eslint/overrides-react] Added new [`react/sort-default-props`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-default-props.md) rule
- [eslint/overrides-react] Make use of new `allowDestructuredState` option of [`react/hook-use-state`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md) rule
- [stylelint] Added new [`media-feature-range-notation`](https://stylelint.io/user-guide/rules/media-feature-range-notation/) rule, and used `"prefix"` option

### Fixed

- [general] Fix typo in `linterBundleSettings.overrides.general.additionalRest*r*ictions`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.26.0...v2.27.0)

## [2.26.0] - 2022-10-27

### Changed

- [eslint] Updated `@typescript-eslint` from `5.40.1` to `5.41.0`
- [eslint] Updated `eslint` from `8.25.0` to `8.26.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `39.3.14` to `39.3.25`
- [stylelint] Updated `stylelint-declaration-block-no-ignored-properties` from `2.5.0` to `2.6.0`
- [stylelint] Grouped `hyphenate-character` below `hyphens` for `order/properties-order` rule

### Added

- [general] Stop execution on outdated "overrides"/"resolutions" in package.json
- [eslint] Make use of [`@typescript-eslint/no-unsafe-declaration-merging`](https://typescript-eslint.io/rules/no-unsafe-declaration-merging/) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.25.2...v2.26.0)

## [2.25.2] - 2022-10-20

- [eslint/overrides-react] Revert: Added new [`react/no-object-type-as-default-prop`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.25.1...v2.25.2)

## [2.25.1] - 2022-10-20

### Removed

- [eslint/overrides-react] Revert: Replaced deprecated `react/jsx-sort-default-props` rule by new [`react/sort-default-props`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-default-props.md) rule
- [eslint/overrides-react] Revert: Activate `allowDestructuredState` option of [`react/hook-use-state`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.25.0...v2.25.1)

## [2.25.0] - 2022-10-20

### Changed

- [eslint] Updated `@typescript-eslint` from `5.38.0` to `5.40.1`
- [eslint] Updated `eslint` from `8.23.1` to `8.25.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.5.1` to `3.5.2`
- [eslint] Updated `eslint-plugin-functional` from `4.4.0` to `4.4.1`
- [eslint] Updated `eslint-plugin-jest` from `27.0.4` to `27.1.3`
- [eslint] Updated `eslint-plugin-jsdoc` from `39.3.6` to `39.3.14`
- [eslint] Updated `eslint-plugin-promise` from `6.0.1` to `6.1.1`
- [eslint] Updated `eslint-plugin-react` from `7.31.8` to `7.31.10`
- [eslint] Updated `eslint-plugin-unicorn` from `43.0.2` to `44.0.2`
- [eslint] Moved `eslint-plugin-jsx-a11y` configuration to `eslint/overrides-react`
- [stylelint] Updated `stylelint` from `14.12.1` to `14.14.0`
- [stylelint] Ignore `!default` annotation in [`annotation-no-unknown`](https://stylelint.io/user-guide/rules/annotation-no-unknown/) rule

### Added

- [eslint] Added new [`logical-assignment-operators`](https://eslint.org/docs/latest/rules/logical-assignment-operators) rule with option `"always"`
- [eslint] Added new [`promise/no-multiple-resolved`](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-multiple-resolved.md) rule
- [eslint] Make use of new [`unicorn/no-unnecessary-await`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-await.md) rule
- [eslint] Make use of new [`unicorn/switch-case-braces`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md) rule with option `"avoid"`
- [eslint/overrides-jest] Added but disable new [`jest/no-restricted-jest-methods`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-restricted-jest-methods.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.24.0...v2.25.0)

## [2.24.0] - 2022-09-23

### Changed

- [eslint/overrides-javascript] Replace [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node) by the fork [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.23.0...v2.24.0)

## [2.23.0] - 2022-09-21

### Added

- [general] Add functionality to ensure that the installed dependencies match to the required dependency of the linter-bundle

### Changed

- [eslint] Updated `eslint-plugin-functional` from `4.3.2` to `4.4.0`
- [stylelint] Updated `stylelint` from `14.12.0` to `14.12.1`
- [eslint] Improved [`no-unnecessary-typeof`](./eslint/rules/no-unnecessary-typeof.md) to cover even more cases and fix false-positives

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.22.0...v2.23.0)

## [2.22.0] - 2022-09-19

### Changed

- [eslint] Updated `@typescript-eslint` from `5.37.0` to `5.38.0`
- [eslint] Updated `eslint-plugin-functional` from `4.3.1` to `4.3.2`
- [stylelint] Updated `postcss-scss` from `4.0.4` to `4.0.5`
- [stylelint] Updated `stylelint` from `14.11.0` to `14.12.0`
- [eslint] Improved [`no-unnecessary-typeof`](./eslint/rules/no-unnecessary-typeof.md) to cover more cases

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.21.0...v2.22.0)

## [2.21.0] - 2022-09-14

### Added

- [eslint] New rule [`no-unnecessary-typeof`](./eslint/rules/no-unnecessary-typeof.md), which prevents `typeof` checks at runtime, if a `typeof` operant has only one type in TypeScript.

### Changed

- [eslint] Updated `@typescript-eslint` from `5.36.1` to `5.37.0`
- [eslint] Updated `eslint` from `8.23.0` to `8.23.1`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.5.0` to `3.5.1`
- [eslint] Updated `eslint-plugin-functional` from `4.2.2` to `4.3.1`
- [eslint] Updated `eslint-plugin-jest` from `27.0.1` to `27.0.4`
- [eslint] Updated `eslint-plugin-react` from `7.31.1` to `7.31.8`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.20.0...v2.21.0)

## [2.20.0] - 2022-09-01

### Changed

- [eslint] Updated `@typescript-eslint` from `5.35.1` to `5.36.1`
- [eslint] Updated `eslint-plugin-jest` from `26.9.0` to `27.0.1`

### Removed

- [eslint/overrides-jest] Removed deprecated `jest/no-jest-import`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.19.0...v2.20.0)

## [2.19.0] - 2022-08-28

### Changed

- [eslint] Updated `@typescript-eslint` from `5.33.1` to `5.35.1`
- [eslint] Updated `eslint` from `8.22.0` to `8.23.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.4.2` to `3.5.0`
- [eslint] Updated `eslint-plugin-jest` from `26.8.3` to `26.9.0`
- [eslint] Updated `eslint-plugin-promise` from `6.0.0` to `6.0.1`
- [eslint] Updated `eslint-plugin-react` from `7.30.1` to `7.31.1`
- [markdownlint] Updated `markdownlint-cli` from `0.32.1` to `0.32.2`
- [stylelint] Updated `stylelint` from `14.10.0` to `14.11.0`
- [eslint] Activate [`allowEmptyCase`](https://github.com/eslint/eslint/blob/main/docs/src/rules/no-fallthrough.md#allowemptycase) option of `no-fallthrough` rule
- [stylelint] Activate [`ignoreAfterCombinators: ['>', '+']`](https://stylelint.io/user-guide/rules/list/selector-max-universal/#ignoreaftercombinators-array-of-combinators) of `selector-max-universal` rule, see [this issue](https://github.com/stylelint/stylelint/issues/5792) for details

### Added

- [eslint/overrides-jest] Make use of [jest/prefer-each](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-each.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.18.0...v2.19.0)

## [2.18.0] - 2022-08-19

### Changed

- [eslint] Updated `@typescript-eslint` from `5.33.0` to `5.33.1`
- [eslint] Updated `eslint` from `8.21.0` to `8.22.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `3.4.0` to `3.4.2`
- [eslint] Updated `eslint-plugin-jest` from `26.8.2` to `26.8.3`
- [stylelint] Updated `stylelint` from `14.9.1` to `14.10.0`
- [eslint/overrides-react] Activate [`allowExpressions`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md#allowexpressions) for
  [`react/jsx-no-useless-fragment`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md) rule, to fill the React type definitions
  requirement that when a component returns only children (a ReactNode), the return value is a ReactElement by wrapping children in a React.Fragment

### Added

- [stylelint] Make use of [`annotation-no-unknown`](https://github.com/stylelint/stylelint/tree/main/lib/rules/annotation-no-unknown) rule
- [stylelint] Make use of [`keyframe-selector-notation`](https://github.com/stylelint/stylelint/tree/main/lib/rules/keyframe-selector-notation) rule, with option `percentage`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.17.0...v2.18.0)

## [2.17.0] - 2022-08-10

### Changed

- [eslint] Updated `@typescript-eslint` from `5.32.0` to `5.33.0`
- [eslint] Updated `eslint-plugin-jest` from `26.7.0` to `26.8.2`
- [eslint] Updated `eslint-plugin-jsdoc` from `39.3.4` to `39.3.6`

### Fixed

- [eslint/overrides-react] Disable [`react/jsx-no-leaked-render`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md) rule, as this should be covered by types in TypeScript to prevent unnecessary type castings from boolean to boolean
- [stylelint] Add `except` for `"margin"` and `"padding"` in `stylelint-use-logical-spec` rule, to prevent [unnecessary warnings](https://github.com/Jordan-Hall/stylelint-use-logical-spec/issues/33) for usages like `margin: 10px 20px;`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.16.0...v2.17.0)

## [2.16.0] - 2022-08-05

### Changed

- [eslint] Updated `eslint` from `8.14.0` to `8.21.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `2.7.1` to `3.4.0`
- [eslint] Updated `eslint-plugin-functional` from `4.2.1` to `4.2.2`
- [eslint] Updated `eslint-plugin-jest` from `26.1.5` to `26.7.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `39.2.9` to `39.3.4`
- [eslint] Updated `eslint-plugin-jsx-a11y` from `6.5.1` to `6.6.1`
- [eslint] Updated `eslint-plugin-react` from `7.29.4` to `7.30.1`
- [eslint] Updated `eslint-plugin-react-hooks` from `4.5.0` to `4.6.0`
- [eslint] Updated `eslint-plugin-unicorn` from `42.0.0` to `43.0.2`
- [eslint] Updated `@typescript-eslint` from `5.22.0` to `5.32.0`
- [markdownlint] Updated `markdownlint-cli` from `0.31.1` to `0.32.1`
- [stylelint] Updated `stylelint` from `14.8.2` to `14.9.1`
- [stylelint] Updated `stylelint-scss` from `4.2.0` to `4.3.0`
- [stylelint] Updated `stylelint-selector-no-empty` from `1.0.8` to `1.0.9`
- [stylelint] Updated `stylelint-use-logical-spec` from `3.2.2` to `4.1.0`

### Added

- [eslint] Make use of [`@typescript-eslint/no-restricted-imports`](https://typescript-eslint.io/rules/no-restricted-imports/) rule
- [eslint] Make use of [`@stylistic/space-infix-ops`](https://typescript-eslint.io/rules/space-infix-ops/) rule
- [eslint] Make use of [`@typescript-eslint/consistent-generic-constructors`](https://typescript-eslint.io/rules/consistent-generic-constructors/) rule
- [eslint/overrides-jest] Make use of [`jest/prefer-hooks-in-order`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-in-order.md) rule
- [eslint/overrides-jest] Make use of [`jest/max-expects`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-expects.md) rule
- [eslint/overrides-jest] Make use of [`jest/prefer-mock-promise-shorthand`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-mock-promise-shorthand.md) rule
- [eslint/overrides-react] Make use of [`react/jsx-no-leaked-render`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md) rule
- [eslint] Added but disable [`unicorn/prefer-event-target`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-event-target.md) rule
- [eslint] Make use of [`unicorn/prefer-logical-operator-over-ternary`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md) rule
- [stylelint] Added but disable [`import-notation`](https://github.com/stylelint/stylelint/tree/main/lib/rules/import-notation) rule

### Removed

- [eslint] Remove deprecated `@typescript-eslint/no-duplicate-imports` rule
- [eslint] Remove deprecated `unicorn/import-index` rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.15.0...v2.16.0)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.15.0...v2.16.0)

## [2.15.0] - 2022-05-05

### Fixed

- [stylelint] Disabled `declaration-property-max-values` rule because of false-positives.
- [stylelint] Disabled `selector-not-notation` for now, because it depends on the project if modern Selectors Level 4 CSS can be used.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.14.1...v2.15.0)

## [2.14.1] - 2022-05-05

### Fixed

- [general] Fixed empty warning for outdated `resolutions` in `package.json`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.14.0...v2.14.1)

## [2.14.0] - 2022-05-05

### Changed

- [eslint] Updated `@typescript-eslint` from `5.21.0` to `5.22.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `39.2.8` to `39.2.9`
- [eslint] Updated `eslint-plugin-react-hooks` from `4.4.0` to `4.5.0`
- [stylelint] Updated `stylelint` from `14.7.1` to `14.8.2`

### Added

- [eslint] Make use of new [`@typescript-eslint/no-duplicate-enum-values`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-enum-values.md) rule
- [stylelint] Make use of new [`keyframe-block-no-duplicate-selectors`](https://github.com/stylelint/stylelint/blob/main/lib/rules/keyframe-block-no-duplicate-selectors/README.md) rule
- [stylelint] In the deployment process, ensure that the used Stylelint options are valid

### Fixed

- [general] Remove files from npm package which are only necessary for development
- [stylelint] Fix invalid configuration of [`declaration-property-max-values`](https://github.com/stylelint/stylelint/blob/main/lib/rules/declaration-property-max-values/README.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.13.0...v2.14.0)

## [2.13.0] - 2022-04-25

### Changed

- [eslint] Updated `@typescript-eslint` from `5.17.0` to `5.21.0`
- [eslint] Updated `eslint` from `8.12.0` to `8.14.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `2.7.0` to `2.7.1`
- [eslint] Updated `eslint-plugin-functional` from `4.2.0` to `4.2.1`
- [eslint] Updated `eslint-plugin-import` from `2.25.4` to `2.26.0`
- [eslint] Updated `eslint-plugin-jest` from `26.1.3` to `26.1.5`
- [eslint] Updated `eslint-plugin-jsdoc` from `38.1.4` to `39.2.8`
- [eslint] Updated `eslint-plugin-unicorn` from `41.0.1` to `42.0.0`
- [stylelint] Updated `postcss-scss` from `4.0.3` to `4.0.4`
- [stylelint] Updated `stylelint` from `14.6.1` to `14.7.1`
- [eslint/overrides-jsdoc] Set [`minLineCount` option to 2](https://github.com/gajus/eslint-plugin-jsdoc/issues/870) for `require-jsdoc` rule
- [stylelint] Set [`selector-not-notation`](https://github.com/stylelint/stylelint/blob/main/lib/rules/selector-not-notation/README.md) rule to `"complex"`

### Added

- [eslint] Activate `allowExpressions` option of [`@typescript-eslint/explicit-function-return-type`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md) rule
- [eslint] Reactivated the [`import/no-relative-packages`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-relative-packages.md) rule
- [eslint] Make use of new [`unicorn/no-useless-switch-case`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md) rule
- [eslint] Make use of new [`unicorn/prefer-modern-math-apis`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-math-apis.md) rule
- [eslint] Make use of new [`unicorn/no-unreadable-iife`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-iife.md) rule
- [eslint] Add but disable [`unicorn/prefer-native-coercion-functions`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md) rule, because this would produce inconsistency in the code and is harder to read

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.12.0...v2.13.0)

## [2.12.0] - 2022-03-30

### Changed

- [eslint] Updated `@typescript-eslint` from `5.14.0` to `5.17.0`
- [eslint] Updated `eslint` from `8.11.0` to `8.12.0`
- [eslint] Updated `eslint-import-resolver-typescript` from `2.5.0` to `2.7.0`
- [eslint] Updated `eslint-plugin-jest` from `26.1.1` to `26.1.3`
- [eslint] Updated `eslint-plugin-jsdoc` from `38.0.2` to `38.1.4`
- [eslint] Updated `eslint-plugin-react` from `7.29.3` to `7.29.4`
- [eslint] Updated `eslint-plugin-react-hooks` from `4.3.0` to `4.4.0`
- [eslint] Updated `eslint-plugin-unicorn` from `41.0.0` to `41.0.1`
- [stylelint] Updated `stylelint` from `14.5.3` to `14.6.1`
- [stylelint] Updated `stylelint-scss` from `4.1.0` to `4.2.0`
- [general] Updated `micromatch` from `4.0.4` to `4.0.5`
- [stylelint] Replace `function-no-unknown` by `scss/function-no-unknown`

### Added

- [eslint] Make use of [`destructuredArrayIgnorePattern`](https://eslint.org/docs/rules/no-unused-vars#destructuredarrayignorepattern) of `@typescript-eslint/no-unused-vars` rule, to ignore variables with leading underscore.
- [stylelint] Make use of [`declaration-property-max-values`](https://stylelint.io/user-guide/rules/list/declaration-property-max-values/) rule, and set `unprefixed-property-name` to `4`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.11.1...v2.12.0)

## [2.11.1] - 2022-03-13

### Changed

- [eslint] Disabled `@typescript-eslint/no-redundant-type-constituents`, because of false positives with `Promise<... | never>`
- [eslint] Weaken `@typescript-eslint/naming-convention` rule to allow names with special characters for `objectLiteralProperty`.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.11.0...v2.11.1)

## [2.11.0] - 2022-03-12

### Added

- [general] Ensures that the ["overrides"](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides) and ["resolutions"](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/) configuration in the `package.json` is up-to-date for linter dependencies, to prevent errors with unknown
  linter rules or options.

### Changed

- [eslint] Updated `eslint` from `8.10.0` to `8.11.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `37.9.7` to `38.0.2`
- [eslint] Disabled [`unicorn/prefer-json-parse-buffer`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md) rule, as [TypeScript states](https://github.com/microsoft/TypeScript/issues/11842) that string needs to be used as of the ES specification.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.10.1...v2.11.0)

## [2.10.1] - 2022-03-11

### Fixed

- [eslint/override-react] Fix naming `warnOnDuplicates` option of [`react/jsx-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.10.0...v2.10.1)

## [2.10.0] - 2022-03-10

### Changed

- [stylelint] Remove `"before-comment"` exception in `scss/dollar-variable-empty-line-after` rule
- [eslint] Updated `@typescript-eslint` from `5.12.1` to `5.14.0`
- [eslint] Updated `eslint` from `8.9.0` to `8.10.0`
- [eslint] Updated `eslint-plugin-jsdoc` from `37.9.4` to `37.9.7`
- [eslint] Updated `eslint-plugin-react` from `7.28.0` to `7.29.3`
- [stylelint] Updated `stylelint` from `14.5.2` to `14.5.3`

### Added

- [eslint] Make use of new [`@typescript-eslint/no-redundant-type-constituents`](https://typescript-eslint.io/rules/no-redundant-type-constituents/) rule
- [eslint/override-react] Make use of new [`react/hook-use-state`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md) rule
- [eslint/override-react] Set new `propElementValues` option to "always" for [`react/jsx-curly-brace-presence`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md) rule
- [eslint/override-react] Make use of new [`react/iframe-missing-sandbox`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md) rule
- [eslint/override-react] Make use of new `warnDuplicates` option of [`react/jsx-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.9.0...v2.10.0)

## [2.9.0] - 2022-02-23

### Changed

- [eslint] Updated `@typescript-eslint` from v5.12.0 to v5.12.1
- [stylelint] Updated `stylelint` from v14.5.1 to v14.5.2
- [eslint] Re-activated `@typescript-eslint/no-unnecessary-type-arguments` since the false positives with `React.FunctionComponent` generics has been fixed.

### Added

- [general] `--timing` argument to show information how long each linting process was running.
- [general] Experimental `--git` argument to only lint (ESLint, Stylelint and Markdownlint) files which have been detected as changed (compared to the upstream branch) by Git

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.8.4...v2.9.0)

## [2.8.4] - 2022-02-19

### Changed

- [eslint] Disabled [`import/no-unused-modules`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md) rule, because of false positives with type exports.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.8.3...v2.8.4)

## [2.8.3] - 2022-02-19

### Changed

- [eslint/overrides-react] Disabled [`react/no-unused-class-component-methods`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-class-component-methods.md) rule, because of false positives with public methods.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.8.2...v2.8.3)

## [2.8.2] - 2022-02-19

### Changed

- [eslint] Disable `@typescript-eslint/no-unnecessary-type-arguments` rule, because of false positives with `React.FunctionComponent` generics

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.8.1...v2.8.2)

## [2.8.1] - 2022-02-19

### Changed

- [eslint/overrides-javascript] Use [`unicorn/text-encoding-identifier-case`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/text-encoding-identifier-case.md) rule, only in JavaScript files.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.8.0...v2.8.1)

## [2.8.0] - 2022-02-18

### Changed

- [eslint] Updated `eslint-plugin-jsdoc` from v37.9.1 to v37.9.4
- [eslint] Updated `eslint-plugin-unicorn` from v40.1.0 to v41.0.0

### Added

- [eslint] Make use of new [`unicorn/text-encoding-identifier-case`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/text-encoding-identifier-case.md) rule

### Fixed

- [stylelint] Fixed disabling of [`function-no-unknown`](https://github.com/stylelint/stylelint/blob/main/lib/rules/function-no-unknown/README.md) rule, because of false positives

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.7.0...v2.8.0)

## [2.7.0] - 2022-02-16

### Changed

- [eslint] Updated `eslint-plugin-jest` from v26.1.0 to v26.1.1
- [stylelint] Updated `stylelint`  from v14.5.0 to v14.5.1

### Added

- [eslint] Activate `ignoreUsedVariables` option of [`unicorn/prefer-export-from`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.6.0...v2.7.0)

## [2.6.0] - 2022-02-14

### Changed

- [eslint] Updated `@typescript-eslint` from v5.11.0 to v5.12.0
- [eslint] Updated `eslint` from v8.8.0 to v8.9.0
- [eslint] Updated `eslint-plugin-jsdoc` from v37.8.2 to v37.9.1
- [eslint] Ignore `generics` in [`@typescript-eslint/comma-dangle`](https://typescript-eslint.io/rules/comma-dangle.md) to allow [generic component definitions for function components](https://wanago.io/2020/03/09/functional-react-components-with-generic-props-in-typescript/#crayon-620a96e97d44a141656396)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.5.0...v2.6.0)

## [2.5.0] - 2022-02-11

### Changed

- [eslint] Updated `eslint-plugin-jsdoc` from v37.8.1 to v37.8.2
- [stylelint] Updated `stylelint` from v14.4.0 to v14.5.0
- [eslint/overrides-gatsby] Disabled `unusedExports` and enabled `missingExports` for the [`import/no-unused-modules`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md) rule, for `src/pages/*.tsx` files.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.4.0...v2.5.0)

## [2.4.0] - 2022-02-09

### Changed

- [eslint] Updated `@typescript-eslint` from v5.10.1 to v5.11.0
- [eslint] Updated `eslint` from v8.7.0 to v8.8.0
- [eslint] Updated `eslint-plugin-functional` from v4.1.1 to v4.2.0
- [eslint] Updated `eslint-plugin-jest` from v26.0.0 to v26.1.0
- [eslint] Updated `eslint-plugin-jsdoc` from v37.7.0 to v37.8.1
- [markdownlint] Updated `markdownlint-cli` from v0.30.0 to v0.31.1, which adds the new rules `MD049` and `MD050` for consistent emphasis/strong style, and improves the rules `MD007`/`MD010`/`MD032`/`MD033`/`MD035`/`MD037`/`MD039`
- [stylelint] Updated `stylelint` from v14.3.0 to v14.4.0

### Added

- [eslint] Activated `unusedExports` option of the [`import/no-unused-modules`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md) rule
- [eslint] Activate [`@typescript-eslint/explicit-function-return-type`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md) rule
- [eslint/react] Add React class methods (`componentDidMount`, `render` etc.) to the allowed names in the [`@typescript-eslint/explicit-function-return-type`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md) rule
- [eslint/jest] Make use of new [`no-conditional-in-test`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-in-test.md) rule, which deprecates `no-if`
- [eslint/jest] Make use of new [`prefer-snapshot-hint`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-snapshot-hint.md) rule
- [stylelint] Added but disabled new [`function-no-unknown`](https://github.com/stylelint/stylelint/blob/main/lib/rules/function-no-unknown/README.md) rule, because of false positives

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.3.1...v2.4.0)

## [2.3.1] - 2022-01-28

### Fixed

- [eslint/overrides-javascript(-lazy)] Move `import/no-import-module-exports` rule to`overrides-javascript`
- [eslint/overrides-gatsby] Ignore '@reach/router' in `import/no-unresolved` rule
- [eslint] Disabled `react/require-default-props`, because of false-positive for React.forwardRef wrapped functional components
- [eslint] Disabled `unicorn/prefer-top-level-await`, because of false-positive on environments with Node.js below v14.8

### Added

- [eslint] Activated `allowThrowingUnknown` option of the [`@typescript-eslint/no-throw-literal`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md) rule
- [stylelint] Activate `camelCaseSvgKeywords` option of the [`value-keyword-case`](https://github.com/stylelint/stylelint/tree/main/lib/rules/value-keyword-case) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.3.0...v2.3.1)

## [2.3.0] - 2022-01-27

### Changed

- [eslint] In the `.vscode/settings.json` the "configFile" option in "eslint.options" has been renamed to "overrideConfigFile"
- [eslint] Updated `eslint-plugin-react-hooks` from v4.2.1-alpha-13455d26d-20211104 to v4.3.0
- [eslint] Disabled [`unicorn/prefer-object-has-own`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-has-own.md) for now, because of limited engine support
- [eslint] Disabled `allowThrowingAny` and `allowThrowingUnknown` of the [`@typescript-eslint/no-throw-literal`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md) rule
- [eslint] Updated `@typescript-eslint` from v5.3.0 to v5.10.1
- [eslint] Updated `eslint` from v8.2.0 to v8.7.0
- [eslint] Updated `eslint-plugin-functional` from v4.0.2 to v4.1.1
- [eslint] Updated `eslint-plugin-import` from v2.25.2 to v2.25.4
- [eslint] Updated `eslint-plugin-jest` from v25.2.3 to v26.0.0
- [eslint] Updated `eslint-plugin-jsdoc` from v37.0.3 to v37.7.0
- [eslint] Updated `eslint-plugin-unicode` from v38.0.0 to v40.1.0
- [markdownlint] Updated `markdownlint-cli` from v0.29.0 to v0.30.0
- [stylelint] Updated `stylelint` from v14.0.1 to v14.3.0
- [stylelint] Updated `stylelint-scss` from v4.0.0 to v4.1.0

### Added

- [eslint] Re-added [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) v6.5.1
- [eslint] Re-added [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise) v6.0.0
- [eslint] Re-added [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) v7.28.0
- [stylelint] Re-added [`stylelint-declaration-block-no-ignored-properties`](https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties) v2.5.0
- [eslint] Re-added [`react/no-invalid-html-attribute`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md) rule
- [eslint] Re-added [`react/no-arrow-function-lifecycle`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md) rule
- [eslint] Re-added [`react/no-unused-class-component-methods`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-class-component-methods.md) rule
- [eslint] Reactivated [`import/no-import-module-exports`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-import-module-exports.md) rule
- [eslint] Added new [`import/no-unused-modules`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-unused-modules.md) rule
- [eslint] Added new [`jest/prefer-comparison-matcher`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-comparison-matcher.md) rule
- [eslint] Added new [`jest/prefer-equality-matcher`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-equality-matcher.md) rule
- [eslint] Added new [`unicorn/no-await-expression-member`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md) rule
- [eslint] Added new [`unicorn/prefer-code-point`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md) rule
- [eslint] Added new [`unicorn/no-thenable`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md) rule
- [eslint] Added new [`unicorn/no-useless-promise-resolve-reject`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-promise-resolve-reject.md) rule
- [eslint] Added new [`unicorn/relative-url-style`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md) rule
- [eslint] Added new [`unicorn/prefer-json-parse-buffer`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md) rule
- [stylelint] Added new [`scss/dollar-variable-no-namespaced-assignment`](https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/dollar-variable-no-namespaced-assignment) rule
- [stylelint] Added new [`scss/at-use-no-unnamespaced`](https://github.com/stylelint-scss/stylelint-scss/tree/master/src/rules/at-use-no-unnamespaced) rule
- [stylelint] Added but disabled [`rule-selector-property-disallowed-list`](https://github.com/stylelint/stylelint/tree/main/lib/rules/rule-selector-property-disallowed-list) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.1.0...v2.3.0)

## [2.1.0] - 2021-11-07

### Changed

- [stylelint] Forked [`stylelint-high-performance-animation`](https://www.npmjs.com/package/stylelint-high-performance-animation), because it seems not to be regularly maintained anymore
- [eslint] Updated `eslint` from v8.1.0 to v8.2.0

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v2.0.0...v2.1.0)

## [2.0.0] - 2021-11-05

### Removed

- [eslint] [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) has been removed, because it seems not to be regularly maintained anymore, which blocks us from updating to ESLint v8
- [eslint] [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise) has been removed, because it seems not to be regularly maintained anymore, which blocks us from updating to ESLint v8
- [eslint] [`eslint-plugin-react`](https://www.npmjs.com/package/eslint-plugin-react) has been removed, because it's relying on unmaintained dependencies, which blocks us from updating to ESLint v8
- [stylelint] [`stylelint-declaration-block-no-ignored-properties`](https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties) has been removed, because it seems not to be regularly maintained anymore, which blocks us from updating to Stylelint v14
- [stylelint] [`stylelint-use-nesting`](https://www.npmjs.com/package/stylelint-use-nesting) has been removed, because it seems not to be regularly maintained anymore, which blocks us from updating to Stylelint v14
- [eslint] Removed deprecated `@typescript-eslint/no-unused-vars-experimental` rule
- [eslint] Removed deprecated `functional/prefer-type-literal` rule
- [eslint] Removed deprecated `jest/prefer-to-be-null` rule
- [eslint] Removed deprecated `jest/prefer-to-be-undefined` rule
- [stylelint] Removed deprecated `function-calc-no-invalid` rule

### Changed

- [eslint] Updated `@typescript-eslint` from v4.31.1 to v5.3.0
- [eslint] Updated `eslint` from v7.32.0 to v8.1.0
- [eslint] Updated `eslint-plugin-functional` from v3.7.0 to v4.0.2
- [eslint] Updated `eslint-plugin-import` from v2.24.2 to v2.25.2
- [eslint] Updated `eslint-plugin-jest` from v24.4.2 to v25.2.3
- [eslint] Updated `eslint-plugin-jsdoc` from v36.1.0 to v37.0.3
- [eslint] Updated `eslint-plugin-promise` from v5.1.0 to v5.1.1
- [eslint] Updated `eslint-plugin-react` from v7.25.2 to v7.26.1
- [eslint] Updated `eslint-plugin-unicorn` from v36.0.0 to v38.0.0
- [eslint] Updated `eslint-import-resolver-webpack` from v0.13.1 to v0.13.2
- [eslint] Updated `eslint-plugin-react-hooks` from v4.2.0 to v4.2.1-alpha-13455d26d-20211104
- [eslint] `jest/valid-describe` as been renamed to `valid-describe-callback`
- [eslint] `jest/lowercase-name` as been renamed to `prefer-lowercase-title`
- [markdownlint] Updated `markdownlint-cli` from v0.28.1 to v0.29.0
- [stylelint] Updated `stylelint` from v13.13.1 to v14.0.1
- [stylelint] Updated `stylelint-order` from v4.1.0 to v5.0.0
- [stylelint] Updated `stylelint-scss` from v3.21.0 to v4.0.0
- [stylelint] Forked [`stylelint-selector-tag-no-without-class`](https://www.npmjs.com/package/stylelint-selector-tag-no-without-class), because it seems not to be regularly maintained anymore

### Added

- [eslint] Make use of `caseSensitiveStrict` option of [`import/no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md) rule
- [eslint] Added but disabled [`jest/prefer-expect-resolves`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-resolves.md) rule, because we prefer `expect(await promise)`
- [eslint] Make use of [`jest/prefer-to-be`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-be.md) rule
- [eslint] Make use of [`jest/require-hook`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/require-hook.md) rule
- [eslint] Make use of [`no-unused-private-class-members`](https://github.com/eslint/eslint/blob/main/docs/rules/no-unused-private-class-members.md) rule
- [eslint] Make use of [`react/no-namespace`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-namespace.md) rule
- [eslint] Make use of [`react/jsx-max-props-per-line`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md) rule
- [eslint] Make use of [`template-indent`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md) rule
- [eslint] Make use of [`@typescript-eslint/consistent-type-exports`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-exports.md) rule
- [eslint] Make use of [unicorn/no-empty-file](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-empty-file.md) rule
- [eslint] Make use of [unicorn/prefer-export-from](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md) rule
- [stylelint] Added but disabled [`color-hex-alpha`](https://github.com/stylelint/stylelint/blob/main/lib/rules/color-hex-alpha/README.md) rule, because of limited browser support
- [stylelint] Make use of [`custom-property-no-missing-var-function`](https://github.com/stylelint/stylelint/blob/main/lib/rules/custom-property-no-missing-var-function/README.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.28.0...v2.0.0)

## [1.28.0] - 2021-09-18

### Changed

- [general] The minimum required Node.js version is v14 now
- [eslint] Updated `@typescript-eslint` from v4.31.0 to v4.31.1
- [eslint] Updated `eslint-import-resolver-typescript` from v2.4.0 to v2.5.0
- [eslint] Updated `eslint-plugin-jest` from v24.4.0 to v24.4.2
- [eslint] Updated `eslint-plugin-react` from v7.25.1 to v7.25.2
- [stylelint] Updated `stylelint-scss` from v3.20.1 to v3.21.0

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.27.0...v1.28.0)

## [1.27.0] - 2021-09-12

### Changed

- [eslint] Updated `@typescript-eslint` from v4.29.3 to v4.31.0
- [eslint] Updated `eslint-plugin-jsdoc` from v36.0.8 to v36.1.0
- [eslint] Updated `eslint-plugin-react` from v7.25.0 to v7.25.1
- [eslint] Updated `eslint-plugin-unicorn`from v35.0.0 to v36.0.0

### Added

- [eslint] Make use of [@typescript-eslint/no-meaningless-void-operator](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-meaningless-void-operator.md) rule
- [eslint] Reactivated [@typescript-eslint/dot-notation](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md) rule
- [eslint] Make use of [unicorn/no-useless-fallback-in-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md) rule
- [eslint] Make use of [unicorn/no-invalid-remove-event-listener](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.26.0...v1.27.0)

## [1.26.0] - 2021-08-29

### Changed

- [eslint] Updated `eslint-plugin-functional` from v3.6.0 to v3.7.0
- [eslint] Updated `eslint-plugin-react` from v7.24.0 to v7.25.0
- [eslint] Disabled [`functional/prefer-tacit`](https://github.com/jonaskello/eslint-plugin-functional/blob/master/docs/rules/prefer-tacit.md) because changes are recommended that could [lead to potential bugs](https://github.com/jonaskello/eslint-plugin-functional/issues/263)

### Added

- [eslint] Activated the `forms` option of the [`react/jsx-no-target-blank`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.25.2...v1.26.0)

## [1.25.2] - 2021-08-27

- [eslint] Disabled `@typescript-eslint/no-implicit-any-catch` because of false-positive with the new TypeScript 4.4 option "useUnknownInCatchVariables"

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.25.1...v1.25.2)

## [1.25.1] - 2021-08-25

### Fixed

- [eslint] Disabled `@typescript-eslint/dot-notation` because of [false-positive with optional chaining](https://github.com/typescript-eslint/typescript-eslint/issues/3510).

### Changed

- [eslint] Updated `eslint-plugin-import` from v2.24.1 to v2.24.2
- [eslint] Updated `eslint-plugin-jsdoc` from v36.0.7 to v36.0.8

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.25.0...v1.25.1)

## [1.25.0] - 2021-08-24

### Changed

- [eslint] Updated `@typescript-eslint` from v4.28.5 to v4.29.3
- [eslint] Updated `eslint` from v7.31.0 to v7.32.0
- [eslint] Updated `eslint-plugin-functional` from v3.3.0 to v3.6.0
- [eslint] Updated `eslint-plugin-import` from v2.23.4 to v2.24.1
- [eslint] Updated `eslint-plugin-jsdoc` from v36.0.6 to v36.0.7
- [eslint] Updated `eslint-plugin-unicorn` from v34.0.1 to v35.0.0

### Added

- [eslint] Activated `ignoreDeclarationMerge` of [`@typescript-eslint/no-redeclare`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md) rule
- [eslint] Make use of [`@typescript-eslint/prefer-return-this-type`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-return-this-type.md) rule
- [eslint] Make use of [`functional/prefer-tacit`](https://github.com/jonaskello/eslint-plugin-functional/blob/master/docs/rules/prefer-tacit.md) rule
- [eslint] Activated `ignoreTypeImports` of [`import/max-dependencies`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/max-dependencies.md) rule
- [eslint] Make use of [`unicorn/prefer-object-from-entries`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md) rule
- [eslint] Make use of [`unicorn/no-useless-length-check`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md) rule
- [eslint] Make use of [`unicorn/no-useless-spread`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md) rule
- [eslint] Activated `allowSimpleOperations` of [`unicorn/no-array-reduce`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.24.0...v1.25.0)

## [1.24.0] - 2021-07-28

### Changed

- [eslint] Updated `@typescript-eslint` from v4.26.1 to v4.28.5
- [eslint] Updated `eslint` from v7.28.0 to v7.31.0
- [eslint] Updated `eslint-plugin-functional` from v3.2.1 to v3.3.0
- [eslint] Updated `eslint-plugin-jest` from v24.3.6 to v24.4.0
- [eslint] Updated `eslint-plugin-jsdoc` from v35.2.0 to v36.0.6
- [eslint] Updated `eslint-plugin-unicorn` from v33.0.1 to v34.0.1
- [markdownlint] Updated `markdownlint-cli` from v0.27.1 to v0.28.1
- [stylelint] Updated `stylelint-declaration-block-no-ignored-properties` from v2.3.0 to v2.4.0
- [stylelint] Updated `stylelint-scss` from v3.19.0 to v3.20.1
- [stylelint] Updated `stylelint-use-logical-spec` from v3.2.0 to v3.2.2

### Added

- [stylelint] Added `overscroll-behavior` CSS property to `order/properties-order` plugin configuration after `overflow[-x/y]`
- [eslint] Make use of [`unicorn/no-array-method-this-argument`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md) rule
- [eslint] Make use of [`unicorn/prefer-top-level-await`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md) rule
- [eslint] Make use of [`jest/max-nested-describe`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-nested-describe.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.23.0...v1.24.0)

## [1.23.0] - 2021-06-14

### Changed

- [eslint/overrides-jest] Don't apply any of the rules for `.jsx` and `.tsx` files
- [eslint] Updated `eslint-plugin-jsdoc` from v35.1.3 to v35.2.0

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.3...v1.23.0)

## [1.22.3] - 2021-06-08

### Added

- [eslint] Re-added [`eslint-import-resolver-typescript`](https://www.npmjs.com/package/eslint-import-resolver-typescript) for configurations without `webpack.config.js`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.2...v1.22.3)

## [1.22.2] - 2021-06-08

### Changed

- [eslint] Updated `@typescript-eslint` from v4.26.0 to v4.26.1
- [eslint] Activated `allowComputed` of [`import/namespace`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/namespace.md) rule

### Fixed

- [eslint] Use [`eslint-import-resolver-webpack`](https://www.npmjs.com/package/eslint-import-resolver-webpack) package only if there is a `webpack.config.js` in the projects folder.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.1...v1.22.2)

## [1.22.1] - 2021-06-07

### Changed

- [eslint] Updated `eslint` from v7.27.0 to v7.28.0
- [eslint] Updated `eslint-plugin-jsdoc` from v35.1.2 to v35.1.3
- [eslint] Updated `eslint-plugin-unicorn` from v33.0.0 to v33.0.1
- [eslint] Make use of [`eslint-import-resolver-webpack`](https://www.npmjs.com/package/eslint-import-resolver-webpack) package

### Fixed

- [eslint] Disabled the `import/no-import-module-exports` rule because of false-positives

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.0...v1.22.1)

## [1.22.0] - 2021-06-02

### Changed

- [eslint] Updated `@typescript-eslint` from v4.25.0 to v4.26.0
- [eslint] Updated `eslint-plugin-import` from v2.23.3 to v2.23.4
- [eslint] Updated `eslint-plugin-jsdoc` from v35.0.0 to v35.1.2
- [eslint] Updated `eslint-plugin-react` from v7.23.2 to v7.24.0
- [eslint] Updated `eslint-plugin-unicorn` from v32.0.1 to v33.0.0
- [eslint] Make use of new [`unicorn/require-array-join-separator`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md) rule
- [eslint] Make use of new [`unicorn/require-number-to-fixed-digits-argument`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md) rule
- [eslint] Make use of new [`unicorn/prefer-prototype-methods`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md) rule
- [eslint] Make use of new [`unicorn/prefer-object-has-own`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-has-own.md) rule
- [eslint] Activated [`import/no-import-module-exports`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-import-module-exports.md) rule
- [eslint] Change `@typescript-eslint/method-signature-style` to `property`
- [eslint] Make use of [`eslint-import-resolver-typescript`](https://www.npmjs.com/package/eslint-import-resolver-typescript) package
- [eslint] Activated [`import/no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md) rule
- [eslint/overrides-react] Activate options `forbidDefaultForRequired` and `ignoreFunctionalComponents` of `react/require-default-props` rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.21.0...v1.22.0)

## [1.21.0] - 2021-05-27

### Changed

- [eslint] Updated `@typescript-eslint` from v4.24.0 to v4.25.0
- [eslint] Updated `eslint-plugin-jsdoc` from v34.8.2 to v35.0.0  
- [eslint] Activated `ignoreNonDOM` option for [`jsx-a11y/no-autofocus`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.20.0...v1.21.0)

## [1.20.0] - 2021-05-22

### Changed

- [audit] Use of `npx` to load [`better-npm-audit`](https://www.npmjs.com/package/better-npm-audit) or [`improved-yarn-audit`](https://www.npmjs.com/package/improved-yarn-audit) on demand. This reduces the bundle size and installation
- [eslint] Updated `eslint` from v7.26.0 to v7.27.0
- [eslint] Updated `eslint-plugin-import` from v2.22.1 to v2.23.3
- [eslint] Updated `eslint-plugin-jsdoc` from v34.7.0 to v34.8.2
- [eslint] Activated [`jsdoc/tag-lines`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-tag-lines) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.19.0...v1.20.0)

## [1.19.0] - 2021-05-18

### Changed

- [stylelint] Enforce the `all` property to be the first property in `import/order`.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.18.0...v1.19.0)

## [1.18.0] - 2021-05-17

### Added

- [eslint] Reactivate the rule `@typescript-eslint/dot-notation`, since it now supports the TypeScript compiler option `noPropertyAccessFromIndexSignature`
- [eslint/overrides-jsdoc] Set `noFinalLineText` to `false` for [jsdoc/multiline-blocks](https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/multiline-blocks.md)

### Changed

- [eslint] Downgraded `eslint-plugin-import` from v2.23.2 to v2.22.1 because of [this issue](https://github.com/import-js/eslint-plugin-import/issues/2070)
- [eslint] Updated `@typescript-eslint` from v4.23.0 to v4.24.0
- [eslint] Updated `eslint-plugin-jsdoc` from v34.6.0 to v34.7.0
- [audit] Updated `improved-yarn-audit` from v2.3.2 to v2.3.3

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.17.0...v1.18.0)

## [1.17.0] - 2021-05-15

### Added

- [eslint] Activated the [`import/no-relative-packages`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-relative-packages.md) rule
- [eslint] Make use of new [`jsdoc/multiline-blocks`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-multiline-blocks) rule
- [eslint] Make use of new [`jsdoc/no-multi-asterisks`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-multi-asterisks) rule
- [eslint] Added but disabled the [`jsdoc/tag-lines`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-tag-lines) rule
- [eslint] Added but disabled the [`import/no-import-module-exports`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-import-module-exports.md) rule
- [eslint/overrides-javascript(-lazy)] Added "args" to the [unicorn/prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v32.0.1/docs/rules/prevent-abbreviations.md) `ignore` list.

### Changed

- [audit] Updated `better-npm-audit` from v1.8.1 to v1.9.1
- [eslint] Updated `eslint-plugin-import` from v2.22.1 to v2.23.2
- [eslint] Updated `eslint-plugin-jsdoc` from v34.0.2 to v34.6.0
- [eslint] [eslint-comments/require-description](https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html) ignores "eslint-enable" now

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.16.0...v1.17.0)

## [1.16.0] - 2021-05-12

### Added

- [eslint] Activated the [`unicorn/no-document-cookie`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md) rule
- [audit] Make minimum severity level configurable using `--min-severity`

### Changed

- [eslint] Updated `@typescript-eslint` from v4.22.0 to v4.23.0
- [eslint] Updated `eslint` from v7.25.0 to v7.26.0
- [eslint] Updated `eslint-plugin-jsdoc` from v33.0.0 to v34.0.2
- [eslint] Updated `eslint-plugin-unicorn` from v31.0.0 to v32.0.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.15.1...v1.16.0)

## [1.15.1] - 2021-05-04

### Changed

- [eslint/overrides-javascript(-lazy)] The [`@typescript-eslint/no-unsafe-assignment`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md) rule has been disabled for JavaScript files due a
  [bug in typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/issues/1943)
- [stylelint] Updated `stylelint` from v13.13.0 to v13.13.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.15.0...v1.15.1)

## [1.15.0] - 2021-05-01

### Added

- [eslint] Make use of the [eslint-plugin-eslint-comments](https://www.npmjs.com/package/eslint-plugin-eslint-comments) plugin
- [eslint] Make use of the [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise) plugin

### Changed

- [eslint] Updated `eslint-plugin-jsdoc` from v32.3.2 to v33.0.0
- [eslint] Activated `allowDeclarations` options for [`@typescript-eslint/no-namespace`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.14.0...v1.15.0)

## [1.14.0] - 2021-04-27

### Added

- [stylelint] [`scss/at-function-named-arguments`](https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/at-function-named-arguments) now ignores "color.scale", beside "scale-color"
- [stylelint] Activated the [`no-invalid-position-at-import-rule`](https://github.com/stylelint/stylelint/tree/master/lib/rules/no-invalid-position-at-import-rule) rule
- [stylelint] Activated the [`no-irregular-whitespace`](https://github.com/stylelint/stylelint/tree/master/lib/rules/no-irregular-whitespace) rule

### Changed

- [eslint] Updated `eslint` from v7.24.0 to v7.25.0
- [eslint] Updated `eslint-plugin-jest` from v24.3.5 to v24.3.6
- [eslint] Updated `eslint-plugin-jsdoc` from v32.3.1 to v32.3.2
- [stylelint] Updated `stylelint` from v13.12.0 to v13.13.0
- [stylelint] Added but disabled new [`selector-disallowed-list`](https://github.com/stylelint/stylelint/tree/master/lib/rules/selector-disallowed-list) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.13.1...v1.14.0)

## [1.13.1] - 2021-04-23

### Changed

- [eslint] Disabled [`unicorn/no-useless-undefined`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md) option `checkArguments`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.13.0...v1.13.1)

## [1.13.0] - 2021-04-23

### Added

- [eslint] Activated the [`unicorn/no-useless-undefined`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md) rule

### Changed

- [eslint] Updated `eslint-plugin-unicorn` from v29.0.0 to v31.0.0
- [eslint] Make use of new [`unicorn/prefer-switch`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md) rule
- [eslint] Disabled new [`unicorn/prefer-node-protocol`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md) rule, till it's widely supported
- [eslint] Disabled new [`unicorn/prefer-module`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md) rule, till it's wider supported
- [eslint] Updated `stylelint-selector-tag-no-without-class` from v2.0.3 to v2.0.4
- [eslint] Updated `eslint-plugin-jsdoc` from v32.3.0 to v32.3.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.12.0...v1.13.0)

## [1.12.0] - 2021-04-18

### Added

- [stylelint] Disallow all tag selectors without class in CSS Modules, using the [stylelint-selector-tag-no-without-class](https://github.com/Moxio/stylelint-selector-tag-no-without-class) plugin (only `from`/`to` is allowed, because of
  [this issue](https://github.com/Moxio/stylelint-selector-tag-no-without-class/issues/5))
- [stylelint] Activated the [`order/order`](https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md) rule and enforce this order:
  - "dollar-variables"
  - `@extend`
  - `@include`
  - "custom-properties"
  - "declarations"
  - `@media`
  - "rules"
  - `@keyframes`

  (other at-rules can be used everywhere)
- [stylelint] Activated the [`scss/no-global-function-names`](https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md) rule

### Changed

- [stylelint] Restrict disallowed reserved ECMAScript keywords (added in v1.8.0) to CSS Modules
- [stylelint] Explicitly disable the `order/properties-alphabetical-order` rule (which was previously not configured)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.11.0...v1.12.0)

## [1.11.0] - 2021-04-16

### Changed

- [eslint] Disabled [`unicorn/prefer-spread`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md) because of false-positives for non-array objects (like non-iterables or typed arrays).
- [eslint/overrides-javascript-lazy] Disable [`@typescript-eslint/no-unsafe-argument`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-argument.md)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.10.0...v1.11.0)

## [1.10.0] - 2021-04-14

### Changed

- [tsc] Lazy peer dependency check for TypeScript, instead of forcing a specific version
- [eslint] Updated `eslint` from v7.22.0 to v4.24.0
- [eslint] Make use of `eslint` option "disallowTemplateShorthand" of [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion)
- [eslint] Updated `@typescript-eslint` from v4.19.0 to v4.22.0
- [eslint] Make use of new [`@typescript-eslint/no-unsafe-argument`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules/no-unsafe-argument.md) rule
- [eslint] Updated `eslint-plugin-jest` from v24.3.2 to v24.3.5
- [eslint] Updated `eslint-plugin-react` from v7.22.0 to v7.23.2
- [eslint] Make use of new [`react/no-unstable-nested-components`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md) rule
- [stylelint] Updated `stylelint-selector-no-empty` from v1.0.7 to v1.0.8
- [audit] Updated `better-npm-audit` from v1.0.7 to v1.0.8

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.9.0...v1.10.0)

## [1.9.0] - 2021-03-22

### Changed

- [eslint] Updated `@typescript-eslint` to v4.19.0
- [eslint] Updated `eslint-plugin-unicorn` to v29.0.0
- [eslint] Make use of `eslint-plugin-unicorn` [`no-static-only-class`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md) and [`prefer-array-flat`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.8.0...v1.9.0)

## [1.8.0] - 2021-03-20

### Changed

- [general] By default, the terminal output of the linters is printed only in case of failure to prevent unnecessary noise. Use `--verbose` to show their output even on success.
- [stylelint] Disallow reserved ECMAScript keywords (`abstract`, `arguments`, `await`, `boolean`, `break`, `byte`, `case`, `catch`, `char`, `class`, `const`, `continue`, `debugger`, `default`, `delete`, `do`, `double`, `else`, `enum`, `eval`, `export`, `extends`, `false`, `final`, `finally`,
  `float`, `for`, `function`, `goto`, `if`, `implements`, `import`, `in`, `Infinity`, `instanceof`, `int`, `interface`, `let`, `long`, `NaN`, `native`, `new`, `null`, `package`, `private`, `protected`, `public`, `return`, `short`, `static`, `super`, `switch`, `synchronized`, `this`, `throw`,
  `throws`, `transient`, `true`, `try`, `typeof`, `undefined`, `var`, `void`, `volatile`, `while`, `with`, and `yield`) as class names

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.7.0...v1.8.0)

## [1.7.0] - 2021-03-18

### Changed

- [general] Moved `check-outdated` dependency to devDependencies
- [eslint] Updated `"eslint-plugin-jest` to v24.3.2
- [markdownlint] [`MD024`](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md#md024---multiple-headings-with-the-same-content): Activate
  "siblings_only" option

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.6.0...v1.7.0)

## [1.6.0] - 2021-03-16

### Changed

- [eslint] Updated `@typescript-eslint` to v4.18.0
- [eslint] Updated `eslint-plugin-jest` to v24.3.1
- [eslint] Updated `eslint-plugin-jsdoc` to v32.3.0
- [stylelint] `order/properties-order`: Group of "Alignment" properties has been added, containing "align-content", "align-items", "align-self", "justify-content", "justify-items", "justify-self", "place-content", "place-items" and "place-self"
- [stylelint] `order/properties-order`: Group "Gap" has been moved before group "Dimension"

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.5.0...v1.6.0)

## [1.5.0] - 2021-03-13

### Changed

- [eslint] Updated `eslint` to v7.22.0
- [eslint/overrides-gatsby] `no-restricted-imports`: Added rule to ensure `navigate` from gatsby is used, instead of `useNavigate()` from `@reach/router`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.4.0...v1.5.0)

## [1.4.0] - 2021-03-11

### Added

- [general] Show a red "Problems detected" warning after each failed linting step
- [eslint/overrides-jsdoc] Introduced linting with `eslint-plugin-jsdoc` v32.2.0

### Changed

- [audit] Updated `better-npm-audit` to v1.8.0
- [eslint] Updated `eslint-plugin-jest` to v24.2.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.3.0...v1.4.0)

## [1.3.0] - 2021-03-09

### Changed

- [audit] Replaced `npm audit` and `yarn audit` by [`better-npm-audit`](https://www.npmjs.com/package/better-npm-audit) and [`improved-yarn-audit`](https://www.npmjs.com/package/improved-yarn-audit)

### Fixed

- [stylelint/markdownlint] Merged duplicated spaces in command line calls

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.2.0...v1.3.0)

## [1.2.0] - 2021-03-08

### Added

- [eslint/overrides-gatsby] New rule [`no-global-undefined-check`](./eslint/rules/no-global-undefined-check.md), which prevents `typeof window === 'undefined'` checks, which are often [the source of rehydration problems](https://www.joshwcomeau.com/react/the-perils-of-rehydration/) in Gatsby

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.1.0...v1.2.0)

### Changed

- [eslint] Updated `@typescript-eslint` to v4.17.0
- [eslint] Updated `eslint-plugin-jest` to v24.1.9

## [1.1.0] - 2021-03-07

### Added

- [audit] Added support for `yarn audit`
- [stylelint] Enabled the new stylelint rule `named-grid-areas-no-invalid`

### Changed

- [eslint] Updated `eslint-plugin-jest` to v24.1.7
- [stylelint] Updated `stylelint` to v13.12.0

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.0.1...v1.1.0)

## [1.0.1] - 2021-03-03

### Fixed

- [general] Show job title before finishing a task

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.0.0...v1.0.1)

## [1.0.0] - 2021-03-05

### Added

- [general] Run all linting tools in parallel to improve the performance

### Changed

- [general] Enforces `typescript` v4.2.3 as peer dependency
- [eslint/overrides-type-declarations] Don't disable `typescript-eslint/no-unused-vars` anymore

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.16.5...v1.0.0)

## [0.16.5] - 2021-03-03

### Changed

- [eslint] Updated `@typescript-eslint` to v4.16.1
- [eslint] Updated `eslint` to v7.21.0
- [markdownlint] Updated `markdownlint-cli` to v0.27.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.16.4...v0.16.5)

## [0.16.4] - 2021-02-27

### Fixed

- [tsc] Changed the way how TypeScript is resolved to prevent compatibility issues if multiple TypeScript versions are installed

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.16.3...v0.16.4)

## [0.16.3] - 2021-02-26

### Changed

- [eslint] Turned the rule `@typescript-eslint/dot-notation` off, because it conflicts with the "noPropertyAccessFromIndexSignature" option of TypeScript 4.2

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.16.2...v0.16.3)

## [0.16.2] - 2021-02-26

- [general] Updated `check-outdated` to v2.5.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.16.1...v0.16.2)

## [0.16.1] - 2021-02-25

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.16.0...v0.16.1)

## [0.16.0] - 2021-02-24

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.15.0...v0.16.0)

## [0.15.0] - 2021-02-24

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.14.0...v0.15.0)

## [0.14.0] - 2021-02-24

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.13.0...v0.14.0)

## [0.13.0] - 2021-02-24

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.12.1...v0.13.0)

## [0.12.1] - 2021-02-24

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.12.0...v0.12.1)

## [0.12.0] - 2021-02-24

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.11.0...v0.12.0)

## [0.11.0] - 2021-02-23

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.10.0...v0.11.0)

## [0.10.0] - 2021-02-15

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.9.0...v0.10.0)

## [0.9.0] - 2021-02-15

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.8.0...v0.9.0)

## [0.8.0] - 2021-02-11

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.7.0...v0.8.0)

## [0.7.0] - 2021-02-02

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.6.0...v0.7.0)

## [0.6.0] - 2021-02-02

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.5.2...v0.6.0)

## [0.5.2] - 2021-02-01

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.5.1...v0.5.2)

## [0.5.1] - 2021-02-01

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.5.0...v0.5.1)

## [0.5.0] - 2021-02-01

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.4.0...v0.5.0)

## [0.4.0] - 2021-01-29

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.3.0...v0.4.0)

## [0.3.0] - 2021-01-29

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.2.0...v0.3.0)

## [0.2.0] - 2021-01-27

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.14...v0.2.0)

## [0.1.14] - 2021-01-25

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.13...v0.1.14)

## [0.1.13] - 2021-01-23

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.12...v0.1.13)

## [0.1.12] - 2021-01-23

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.11...v0.1.12)

## [0.1.11] - 2021-01-13

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.10...v0.1.11)

## [0.1.10] - 2021-01-13

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.9...v0.1.10)

## [0.1.9] - 2021-01-11

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.8...v0.1.9)

## [0.1.8] - 2021-01-10

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.7...v0.1.8)

## [0.1.7] - 2021-01-10

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.6...v0.1.7)

## [0.1.6] - 2021-01-10

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.5...v0.1.6)

## [0.1.5] - 2021-01-10

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.4...v0.1.5)

## [0.1.4] - 2021-01-10

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.3...v0.1.4)

## [0.1.3] - 2021-01-09

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.2...v0.1.3)

## [0.1.2] - 2021-01-09

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.1...v0.1.2)

## [0.1.1] - 2021-01-09

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v0.1.0...v0.1.1)

## [0.1.0] - 2021-01-08

First Release
