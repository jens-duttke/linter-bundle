# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.18.0...HEAD)

## [1.18.0] - 2021.05.17

### Added

- [eslint] Reactivate the rule `@typescript-eslint/dot-notation`, since it now supports the TypeScript compiler option `noPropertyAccessFromIndexSignature`
- [eslint/overrides-jsdoc] Set `noFinalLineText` to `false` for [jsdoc/multiline-blocks](https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/multiline-blocks.md)

### Changed

- [eslint] Downgrade `eslint-plugin-import` from v2.23.2 to v2.22.1 because of [this issue](https://github.com/benmosher/eslint-plugin-import/issues/2070)
- [eslint] Updated `@typescript-eslint` from v4.23.0 to v4.24.0
- [eslint] Updated `eslint-plugin-jsdoc` from v34.6.0 to v34.7.0
- [audit] Updated `improved-yarn-audit` from v2.3.2 to v2.3.3

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.17.0...v1.18.0)

## [1.17.0] - 2021.05.15

### Added

- [eslint] Activate the "[import/no-relative-packages](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-relative-packages.md)" rule
- [eslint] Make use of new "[jsdoc/multiline-blocks](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-multiline-blocks)" rule
- [eslint] Make use of new "[jsdoc/no-multi-asterisks](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-multi-asterisks)" rule
- [eslint] Added but disabled the "[jsdoc/tag-lines](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-tag-lines)" rule
- [eslint] Added but disabled the "[import/no-import-module-exports](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-import-module-exports.md)" rule
- [eslint/overrides-javascript(-lazy)] Added "args" the the [unicorn/prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v32.0.1/docs/rules/prevent-abbreviations.md) `allowList`.

### Changed

- [audit] Updated `better-npm-audit` from v1.8.1 to v1.9.1
- [eslint] Updated `eslint-plugin-import` from v2.22.1 to v2.23.2
- [eslint] Updated `eslint-plugin-jsdoc` from v34.0.2 to v34.6.0
- [eslint] [eslint-comments/require-description](https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html) ignores "eslint-enable" now

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.16.0...v1.17.0)

## [1.16.0] - 2021.05.12

### Added

- [eslint] Activate the "[unicorn/no-document-cookie](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md)" rule
- [audit] Make minimum severity level configurable using `--min-severity`

### Changed

- [eslint] Updated `@typescript-eslint/parser` from v4.22.0 to v4.23.0
- [eslint] Updated `eslint` from v7.25.0 to v7.26.0
- [eslint] Updated `eslint-plugin-jsdoc` from v33.0.0 to v34.0.2
- [eslint] Updated `eslint-plugin-unicorn` from v31.0.0 to v32.0.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.15.1...v1.16.0)

## [1.15.1] - 2021-05-04

### Changed

- [eslint/overrides-javascript(-lazy)] The "[@typescript-eslint/no-unsafe-assignment](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md)" rule has been disabled for JavaScript files due a
  [bug in typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/issues/1943)
- [stylelint] Updated `stylelint` from v13.13.0 to v13.13.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.15.0...v1.15.1)

## [1.15.0] - 2021-05-01

### Added

- [eslint] Make use of the [eslint-plugin-eslint-comments](https://www.npmjs.com/package/eslint-plugin-eslint-comments) plugin
- [eslint] Make use of the [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise) plugin

### Changed

- [eslint] Updated `eslint-plugin-jsdoc` from v32.3.2 to v33.0.0
- [eslint] Activate `allowDeclarations` options for "[@typescript-eslint/no-namespace](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md)" rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.14.0...v1.15.0)

## [1.14.0] - 2021-04-27

### Added

- [stylelint] "[scss/at-function-named-arguments](https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/at-function-named-arguments) now ignores "color.scale", beside "scale-color"
- [stylelint] Activate the "[no-invalid-position-at-import-rule](https://github.com/stylelint/stylelint/tree/master/lib/rules/no-invalid-position-at-import-rule)" rule
- [stylelint] Activate the "[no-irregular-whitespace](https://github.com/stylelint/stylelint/tree/master/lib/rules/no-irregular-whitespace)" rule

### Changed

- [eslint] Updated `eslint` from v7.24.0 to v7.25.0
- [eslint] Updated `eslint-plugin-jest` from v24.3.5 to v24.3.6
- [eslint] Updated `eslint-plugin-jsdoc` from v32.3.1 to v32.3.2
- [stylelint] Updated `stylelint` from v13.12.0 to v13.13.0
- [stylelint] Added but disabled new "[selector-disallowed-list](https://github.com/stylelint/stylelint/tree/master/lib/rules/selector-disallowed-list)" rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.13.1...v1.14.0)

## [1.13.1] - 2021-04-23

### Changed

- [eslint] Disable "[unicorn/no-useless-undefined](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md)" option `checkArguments`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.13.0...v1.13.1)

## [1.13.0] - 2021-04-23

### Added

- [eslint] Activate the "[unicorn/no-useless-undefined](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md)" rule

### Changed

- [eslint] Updated `eslint-plugin-unicorn` from v29.0.0 to v31.0.0
- [eslint] Make use of new "[unicorn/prefer-switch](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md)" rule
- [eslint] Disable new "[unicorn/prefer-node-protocol](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md)" rule, till it's widely supported
- [eslint] Disable new "[unicorn/prefer-module](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md)" rule, till it's wider supported
- [eslint] Updated `stylelint-selector-tag-no-without-class` from v2.0.3 to v2.0.4
- [eslint] Update `eslint-plugin-jsdoc` from v32.3.0 to v32.3.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.12.0...v1.13.0)

## [1.12.0] - 2021-04-18

### Added

- [stylelint] Disallow all tag selectors without class in CSS Modules, using the [stylelint-selector-tag-no-without-class](https://github.com/Moxio/stylelint-selector-tag-no-without-class) plugin (only `from`/`to` is allowed, because of
  [this issue](https://github.com/Moxio/stylelint-selector-tag-no-without-class/issues/5))
- [stylelint] Activate the "[order/order](https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md)" rule and enforce this order:
  - "dollar-variables"
  - `@extend`
  - `@include`
  - "custom-properties"
  - "declarations"
  - `@media`
  - "rules"
  - `@keyframes`

  (other at-rules can be used everywhere)
- [stylelint] Activate the "[scss/no-global-function-names](https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md)" rule

### Changed

- [stylelint] Restrict disallowed reserved ECMAScript keywords (added in v1.8.0) to CSS Modules
- [stylelint] Explicitly disable the `order/properties-alphabetical-order` rule (which was previously not configured)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.11.0...v1.12.0)

## [1.11.0] - 2021-04-16

### Changed

- [eslint] Disable "[unicorn/prefer-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md)" because of false-positives for non-array objects (like non-iterables or typed arrays).
- [eslint/overrides-javascript-lazy] Disable "[@typescript-eslint/no-unsafe-argument](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-argument.md)"

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.10.0...v1.11.0)

## [1.10.0] - 2021-04-14

### Changed

- [tsc] Lazy peer dependency check for TypeScript, instead of forcing a specific version
- [eslint] Updated `eslint` from v7.22.0 to v4.24.0
- [eslint] Make use of `eslint` option "disallowTemplateShorthand" of "[no-implicit-coercion](https://eslint.org/docs/rules/no-implicit-coercion)"
- [eslint] Updated `@typescript-eslint` from v4.19.0 to v4.22.0
- [eslint] Make use of new "[@typescript-eslint/no-unsafe-argument](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules/no-unsafe-argument.md)" rule
- [eslint] Updated `eslint-plugin-jest` from v24.3.2 to v24.3.5
- [eslint] Updated `eslint-plugin-react` from v7.22.0 to v7.23.2
- [eslint] Make use of new "[react/no-unstable-nested-components](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md)" rule
- [sass] Updated `stylelint-selector-no-empty` from v1.0.7 to v1.0.8
- [audit] Updated `better-npm-audit` from v1.0.7 to v1.0.8

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.9.0...v1.10.0)

## [1.9.0] - 2021-03-22

### Changed

- [eslint] Updated `@typescript-eslint` to v4.19.0
- [eslint] Updated `eslint-plugin-unicorn` to v29.0.0
- [eslint] Make use of `eslint-plugin-unicorn` "[no-static-only-class](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md)" and "[prefer-array-flat](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md)" rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.8.0...v1.9.0)

## [1.8.0] - 2021-03-20

### Changed

- By default, the terminal output of the linters is printed only in case of failure to prevent unnecessary noise. Use `--verbose` to show their output even on success.
- [stylelint] Disallow reserved ECMAScript keywords (`abstract`, `arguments`, `await`, `boolean`, `break`, `byte`, `case`, `catch`, `char`, `class`, `const`, `continue`, `debugger`, `default`, `delete`, `do`, `double`, `else`, `enum`, `eval`, `export`, `extends`, `false`, `final`, `finally`,
  `float`, `for`, `function`, `goto`, `if`, `implements`, `import`, `in`, `Infinity`, `instanceof`, `int`, `interface`, `let`, `long`, `NaN`, `native`, `new`, `null`, `package`, `private`, `protected`, `public`, `return`, `short`, `static`, `super`, `switch`, `synchronized`, `this`, `throw`,
  `throws`, `transient`, `true`, `try`, `typeof`, `undefined`, `var`, `void`, `volatile`, `while`, `with`, and `yield`) as class names

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.7.0...v1.8.0)

## [1.7.0] - 2021-03-18

### Changed

- [general] Move `check-outdated` dependency to devDependencies
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

- [gatsby/overrides-gatsby] New rule `no-global-undefined-check`, which prevents `typeof window === 'undefined'` checks, which are often [the source of rehydration problems](https://www.joshwcomeau.com/react/the-perils-of-rehydration/) in Gatsby

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

- [general] Enforces `typescript` v4.2.3 as peer dependency.
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

- [tsc] Changed the way how TypeScript is resolved to prevent compatility issues if multiple TypeScript versions are installed

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
