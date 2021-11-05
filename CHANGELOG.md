# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed

- [eslint] [`eslint-plugin-promise`](https://www.npmjs.com/package/eslint-plugin-promise) has be removed, because it seems not to be regularly maintained anymore, which blocks us from updating to ESLint v8.
- [stylelint] [stylelint-use-nesting](https://www.npmjs.com/package/stylelint-use-nesting) has be removed, because it seems not to be regularly maintained anymore, which blocks us from updating to Stylelint v14.

### Changed

- [eslint] Update `@typescript-eslint` from v4.31.1 to v5.3.0
- [eslint] Update `eslint` from v7.32.0 to v8.1.0
- [eslint] Update `eslint-plugin-functional` from v3.7.0 to v4.0.2
- [eslint] Update `eslint-plugin-import` from v2.24.2 to v2.25.2
- [eslint] Update `eslint-plugin-jest` from v24.4.2 to v25.2.3
- [eslint] Update `eslint-plugin-jsdoc` from v36.1.0 to v37.0.3
- [eslint] Update `eslint-plugin-promise` from v5.1.0 to v5.1.1
- [eslint] Update `eslint-plugin-react` from v7.25.2 to v7.26.1
- [eslint] Update `eslint-plugin-unicorn` from v36.0.0 to v38.0.0
- [eslint] Update `eslint-import-resolver-webpack` from v0.13.1 to v0.13.2
- [eslint] Make use of `caseSensitiveStrict` option of [`import/no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md) rule
- [eslint] Remove deprecated `@typescript-eslint/no-unused-vars-experimental` rule
- [eslint] Remove deprecated `functional/prefer-type-literal` rule
- [eslint] Make use of [`no-unused-private-class-members`](https://github.com/eslint/eslint/blob/main/docs/rules/no-unused-private-class-members.md) rule
- [eslint] Make use of [`react/no-namespace`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-namespace.md) rule
- [eslint] Make use of [`react/jsx-max-props-per-line`}(https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md) rule
- [eslint] Make use of [`template-indent`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md) rule
- [eslint] Make use of [`@typescript-eslint/consistent-type-exports`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-exports.md) rule
- [eslint] Make use of [unicorn/no-empty-file](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-empty-file.md) rule
- [eslint] Make use of [unicorn/prefer-export-from](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md) rule
- [markdownlint] Update `markdownlint-cli` from v0.28.1 to v0.29.0
- [stylelint] Update `stylelint` from v13.13.1 to v14.0.1
- [stylelint] Update `stylelint-order` from v4.1.0 to v5.0.0
- [stylelint] Update `stylelint-scss` from v3.21.0 to v4.0.0
- [stylelint] Added but disabled [`color-hex-alpha`](https://github.com/stylelint/stylelint/blob/main/lib/rules/color-hex-alpha/README.md) rule, because of limited browser support
- [stylelint] Make use of [`custom-property-no-missing-var-function`](https://github.com/stylelint/stylelint/blob/main/lib/rules/custom-property-no-missing-var-function/README.md) rule
- [stylelint] Removed deprecated `function-calc-no-invalid` rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.28.0...HEAD)

## [1.28.0] - 2021.09.18

### Changed

- The minimum required Node.js version is v14 now
- [eslint] Update `@typescript-eslint` from v4.31.0 to v4.31.1
- [eslint] Update `eslint-import-resolver-typescript` from v2.4.0 to v2.5.0
- [eslint] Update `eslint-plugin-jest` from v24.4.0 to v24.4.2
- [eslint] Update `eslint-plugin-react` from v7.25.1 to v7.25.2
- [stylelint] Update `stylelint-scss` from v3.20.1 to v3.21.0

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.27.0...v1.28.0)

## [1.27.0] - 2021.09.12

### Changed

- [eslint] Update `@typescript-eslint` from v4.29.3 to v4.31.0
- [eslint] Update `eslint-plugin-jsdoc` from v36.0.8 to v36.1.0
- [eslint] Update `eslint-plugin-react` from v7.25.0 to v7.25.1
- [eslint] Update `eslint-plugin-unicorn`from v35.0.0 to v36.0.0
- [eslint] Make use of [@typescript-eslint/no-meaningless-void-operator](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-meaningless-void-operator.md) rule
- [eslint] Reactivate [@typescript-eslint/dot-notation](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md) rule
- [eslint] Make use of [unicorn/no-useless-fallback-in-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md) rule
- [eslint] Make use of [unicorn/no-invalid-remove-event-listener](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.26.0...v1.27.0)

## [1.26.0] - 2021.08.29

### Changed

- [eslint] Update `eslint-plugin-functional` from v3.6.0 to v3.7.0
- [eslint] Update `eslint-plugin-react` from v7.24.0 to v7.25.0
- [eslint] Disabled [`functional/prefer-tacit`](https://github.com/jonaskello/eslint-plugin-functional/blob/master/docs/rules/prefer-tacit.md) because changes are recommended that could [lead to potential bugs](https://github.com/jonaskello/eslint-plugin-functional/issues/263)
- [eslint] Activate the `forms` option of the [`react/jsx-no-target-blank`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.25.2...v1.26.0)

## [1.25.2] - 2021.08.27

- [eslint] Disabled `@typescript-eslint/no-implicit-any-catch` because of false-positive with the new TypeScript 4.4 option "useUnknownInCatchVariables"

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.25.1...v1.25.2)

## [1.25.1] - 2021.08.25

### Fixed

- [eslint] Disabled `@typescript-eslint/dot-notation` because of [false-positive with optional chaining](https://github.com/typescript-eslint/typescript-eslint/issues/3510).

### Changed

- [eslint] Update `eslint-plugin-import` from v2.24.1 to v2.24.2
- [eslint] Update `eslint-plugin-jsdoc` from v36.0.7 to v36.0.8

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.25.0...v1.25.1)

## [1.25.0] - 2021.08.24

### Changed

- [eslint] Update `@typescript-eslint` from v4.28.5 to v4.29.3
- [eslint] Update `eslint` from v7.31.0 to v7.32.0
- [eslint] Update `eslint-plugin-functional` from v3.3.0 to v3.6.0
- [eslint] Update `eslint-plugin-import` from v2.23.4 to v2.24.1
- [eslint] Update `eslint-plugin-jsdoc` from v36.0.6 to v36.0.7
- [eslint] Update `eslint-plugin-unicorn` from v34.0.1 to v35.0.0
- [eslint] Activate `ignoreDeclarationMerge` of [`@typescript-eslint/no-redeclare`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md) rule
- [eslint] Make use of [`@typescript-eslint/prefer-return-this-type`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-return-this-type.md) rule
- [eslint] Make use of [`functional/prefer-tacit`](https://github.com/jonaskello/eslint-plugin-functional/blob/master/docs/rules/prefer-tacit.md) rule
- [eslint] Activate `ignoreTypeImports` of [`import/max-dependencies`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/max-dependencies.md) rule
- [eslint] Make use of [`unicorn/prefer-object-from-entries`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md) rule
- [eslint] Make use of [`unicorn/no-useless-length-check`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md) rule
- [eslint] Make use of [`unicorn/no-useless-spread`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md) rule
- [eslint] Activate `allowSimpleOperations` of [`unicorn/no-array-reduce`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.24.0...v1.25.0)

## [1.24.0] - 2021.07.28

### Changed

- [stylelint] Add `overscroll-behavior` CSS property to `order/properties-order` plugin configuration after `overflow[-x/y]`
- [eslint] Make use of [`unicorn/no-array-method-this-argument`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md) rule
- [eslint] Make use of [`unicorn/prefer-top-level-await`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md) rule
- [eslint] Make use of [`jest/max-nested-describe`](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/max-nested-describe.md) rule
- [eslint] Update `@typescript-eslint` from v4.26.1 to v4.28.5
- [eslint] Update `eslint` from v7.28.0 to v7.31.0
- [eslint] Update `eslint-plugin-functional` from v3.2.1 to v3.3.0
- [eslint] Update `eslint-plugin-jest` from v24.3.6 to v24.4.0
- [eslint] Update `eslint-plugin-jsdoc` from v35.2.0 to v36.0.6
- [eslint] Update `eslint-plugin-unicorn` from v33.0.1 to v34.0.1
- [markdownlint] Update `markdownlint-cli` from v0.27.1 to v0.28.1
- [stylelint] Update `stylelint-declaration-block-no-ignored-properties` from v2.3.0 to v2.4.0
- [stylelint] Update `stylelint-scss` from v3.19.0 to v3.20.1
- [stylelint] Update `stylelint-use-logical-spec` from v3.2.0 to v3.2.2

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.23.0...v1.24.0)

## [1.23.0] - 2021.06.14

### Changed

- [eslint/overrides-jest] Don't apply any of the rules for `.jsx` and `.tsx` files
- [eslint] Update `eslint-plugin-jsdoc` from v35.1.3 to v35.2.0

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.3...v1.23.0)

## [1.22.3] - 2021.06.08

- [eslint] Re-add [`eslint-import-resolver-typescript`](https://www.npmjs.com/package/eslint-import-resolver-typescript) for configurations without `webpack.config.js`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.2...v1.22.3)

## [1.22.2] - 2021.06.08

### Changed

- [eslint] Updated `@typescript-eslint/eslint-plugin` from v4.26.0 to v4.26.1
- [eslint] Activate `allowComputed` of [`import/namespace`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/namespace.md) rule

### Fixed

- [eslint] Use [`eslint-import-resolver-webpack`](https://www.npmjs.com/package/eslint-import-resolver-webpack) package only if there is a `webpack.config.js` in the projects folder.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.1...v1.22.2)

## [1.22.1] - 2021.06.07

### Changed

- [eslint] Updated `eslint` from v7.27.0 to v7.28.0
- [eslint] Updated `eslint-plugin-jsdoc` from v35.1.2 to v35.1.3
- [eslint] Updated `eslint-plugin-unicorn` from v33.0.0 to v33.0.1
- [eslint] Make use of [`eslint-import-resolver-webpack`](https://www.npmjs.com/package/eslint-import-resolver-webpack) package

### Fixed

- [eslint] Disabled the `import/no-import-module-exports` rule because of false-positives

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.22.0...v1.22.1)

## [1.22.0] - 2021.06.02

### Changed

- [eslint] Updated `@typescript-eslint/eslint-plugin` from v4.25.0 to v4.26.0
- [eslint] Updated `eslint-plugin-import` from v2.23.3 to v2.23.4
- [eslint] Updated `eslint-plugin-jsdoc` from v35.0.0 to v35.1.2
- [eslint] Updated `eslint-plugin-react` from v7.23.2 to v7.24.0
- [eslint] Updated `eslint-plugin-unicorn` from v32.0.1 to v33.0.0
- [eslint] Make use of new [`unicorn/require-array-join-separator`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md) rule
- [eslint] Make use of new [`unicorn/require-number-to-fixed-digits-argument`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md) rule
- [eslint] Make use of new [`unicorn/prefer-prototype-methods`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md) rule
- [eslint] Make use of new [`unicorn/prefer-object-has-own`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-has-own.md) rule
- [eslint] Activate [`import/no-import-module-exports`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-import-module-exports.md) rule
- [eslint] Change `@typescript-eslint/method-signature-style` to `property`
- [eslint/overrides-react] Activate options `forbidDefaultForRequired` and `ignoreFunctionalComponents` of `react/require-default-props` rule
- [eslint] Make use of [`eslint-import-resolver-typescript`](https://www.npmjs.com/package/eslint-import-resolver-typescript) package
- [eslint] Activate [`import/no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.21.0...v1.22.0)

## [1.21.0] - 2021.05.27

### Changed

- [eslint] Updated `@typescript-eslint` from v4.24.0 to v4.25.0
- [eslint] Updated `eslint-plugin-jsdoc` from v34.8.2 to v35.0.0  
- [eslint] Active `ignoreNonDOM` option for `jsx-a11y/no-autofocus` rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.20.0...v1.21.0)

## [1.20.0] - 2021.05.22

### Changed

- [audit] Use of `npx` to load [`better-npm-audit`](https://www.npmjs.com/package/better-npm-audit) or [`improved-yarn-audit`](https://www.npmjs.com/package/improved-yarn-audit) on demand. This reduces the bundle size and installation
- [eslint] Updated `eslint` from v7.26.0 to v7.27.0
- [eslint] Updated `eslint-plugin-import` from v2.22.1 to v2.23.3
- [eslint] Updated `eslint-plugin-jsdoc` from v34.7.0 to v34.8.2
- [eslint] Activated [`jsdoc/tag-lines`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-tag-lines) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.19.0...v1.20.0)

## [1.19.0] - 2021.05.18

### Changed

- [styleint] Enforce the `all` property to be the first property in `import/order`.

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.18.0...v1.19.0)

## [1.18.0] - 2021.05.17

### Added

- [eslint] Reactivate the rule `@typescript-eslint/dot-notation`, since it now supports the TypeScript compiler option `noPropertyAccessFromIndexSignature`
- [eslint/overrides-jsdoc] Set `noFinalLineText` to `false` for [jsdoc/multiline-blocks](https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/multiline-blocks.md)

### Changed

- [eslint] Downgrade `eslint-plugin-import` from v2.23.2 to v2.22.1 because of [this issue](https://github.com/import-js/eslint-plugin-import/issues/2070)
- [eslint] Updated `@typescript-eslint` from v4.23.0 to v4.24.0
- [eslint] Updated `eslint-plugin-jsdoc` from v34.6.0 to v34.7.0
- [audit] Updated `improved-yarn-audit` from v2.3.2 to v2.3.3

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.17.0...v1.18.0)

## [1.17.0] - 2021.05.15

### Added

- [eslint] Activate the [`import/no-relative-packages`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-relative-packages.md) rule
- [eslint] Make use of new [`jsdoc/multiline-blocks`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-multiline-blocks) rule
- [eslint] Make use of new [`jsdoc/no-multi-asterisks`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-no-multi-asterisks) rule
- [eslint] Added but disabled the [`jsdoc/tag-lines`](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-tag-lines) rule
- [eslint] Added but disabled the [`import/no-import-module-exports`](https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/no-import-module-exports.md) rule
- [eslint/overrides-javascript(-lazy)] Added "args" the the [unicorn/prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v32.0.1/docs/rules/prevent-abbreviations.md) `allowList`.

### Changed

- [audit] Updated `better-npm-audit` from v1.8.1 to v1.9.1
- [eslint] Updated `eslint-plugin-import` from v2.22.1 to v2.23.2
- [eslint] Updated `eslint-plugin-jsdoc` from v34.0.2 to v34.6.0
- [eslint] [eslint-comments/require-description](https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html) ignores "eslint-enable" now

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.16.0...v1.17.0)

## [1.16.0] - 2021.05.12

### Added

- [eslint] Activate the [`unicorn/no-document-cookie`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md) rule
- [audit] Make minimum severity level configurable using `--min-severity`

### Changed

- [eslint] Updated `@typescript-eslint/parser` from v4.22.0 to v4.23.0
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
- [eslint] Activate `allowDeclarations` options for [`@typescript-eslint/no-namespace`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.14.0...v1.15.0)

## [1.14.0] - 2021-04-27

### Added

- [stylelint] [`scss/at-function-named-arguments`](https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/at-function-named-arguments) now ignores "color.scale", beside "scale-color"
- [stylelint] Activate the [`no-invalid-position-at-import-rule`](https://github.com/stylelint/stylelint/tree/master/lib/rules/no-invalid-position-at-import-rule) rule
- [stylelint] Activate the [`no-irregular-whitespace`](https://github.com/stylelint/stylelint/tree/master/lib/rules/no-irregular-whitespace) rule

### Changed

- [eslint] Updated `eslint` from v7.24.0 to v7.25.0
- [eslint] Updated `eslint-plugin-jest` from v24.3.5 to v24.3.6
- [eslint] Updated `eslint-plugin-jsdoc` from v32.3.1 to v32.3.2
- [stylelint] Updated `stylelint` from v13.12.0 to v13.13.0
- [stylelint] Added but disabled new [`selector-disallowed-list`](https://github.com/stylelint/stylelint/tree/master/lib/rules/selector-disallowed-list) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.13.1...v1.14.0)

## [1.13.1] - 2021-04-23

### Changed

- [eslint] Disable [`unicorn/no-useless-undefined`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md) option `checkArguments`

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.13.0...v1.13.1)

## [1.13.0] - 2021-04-23

### Added

- [eslint] Activate the [`unicorn/no-useless-undefined`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md) rule

### Changed

- [eslint] Updated `eslint-plugin-unicorn` from v29.0.0 to v31.0.0
- [eslint] Make use of new [`unicorn/prefer-switch`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md) rule
- [eslint] Disable new [`unicorn/prefer-node-protocol`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md) rule, till it's widely supported
- [eslint] Disable new [`unicorn/prefer-module`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md) rule, till it's wider supported
- [eslint] Updated `stylelint-selector-tag-no-without-class` from v2.0.3 to v2.0.4
- [eslint] Update `eslint-plugin-jsdoc` from v32.3.0 to v32.3.1

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.12.0...v1.13.0)

## [1.12.0] - 2021-04-18

### Added

- [stylelint] Disallow all tag selectors without class in CSS Modules, using the [stylelint-selector-tag-no-without-class](https://github.com/Moxio/stylelint-selector-tag-no-without-class) plugin (only `from`/`to` is allowed, because of
  [this issue](https://github.com/Moxio/stylelint-selector-tag-no-without-class/issues/5))
- [stylelint] Activate the [`order/order`](https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md) rule and enforce this order:
  - "dollar-variables"
  - `@extend`
  - `@include`
  - "custom-properties"
  - "declarations"
  - `@media`
  - "rules"
  - `@keyframes`

  (other at-rules can be used everywhere)
- [stylelint] Activate the [`scss/no-global-function-names`](https://github.com/kristerkari/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md) rule

### Changed

- [stylelint] Restrict disallowed reserved ECMAScript keywords (added in v1.8.0) to CSS Modules
- [stylelint] Explicitly disable the `order/properties-alphabetical-order` rule (which was previously not configured)

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/v1.11.0...v1.12.0)

## [1.11.0] - 2021-04-16

### Changed

- [eslint] Disable [`unicorn/prefer-spread`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md) because of false-positives for non-array objects (like non-iterables or typed arrays).
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
- [sass] Updated `stylelint-selector-no-empty` from v1.0.7 to v1.0.8
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
