/**
 * @file Global Stylelint settings
 */

const { linterBundleConfig } = await import('../helper/linter-bundle-config.js');

linterBundleConfig.css = (linterBundleConfig.sass ?? linterBundleConfig.css ?? {});

export default {
	reportNeedlessDisables: true,
	reportInvalidScopeDisables: true,
	reportDescriptionlessDisables: true,
	reportUnscopedDisables: true,
	customSyntax: 'postcss-scss',
	plugins: [
		'stylelint-declaration-block-no-ignored-properties',
		'stylelint-order',
		'stylelint-scss',
		'stylelint-use-logical-spec',
		'stylelint-high-performance-animation',
		await import('./plugins/stylelint-selector-no-empty.js'),
		await import('./plugins/stylelint-selector-tag-no-without-class.js'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/at-rule-name-case/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/at-rule-name-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/at-rule-semicolon-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/at-rule-semicolon-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/block-closing-brace-empty-line-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/block-closing-brace-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/block-closing-brace-newline-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/block-closing-brace-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/block-opening-brace-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/block-opening-brace-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/block-opening-brace-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/color-hex-case/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-bang-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-bang-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-block-semicolon-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-block-semicolon-newline-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-block-semicolon-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-block-semicolon-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-block-trailing-semicolon/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-colon-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-colon-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/declaration-colon-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-comma-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-comma-newline-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-comma-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-comma-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-max-empty-lines/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-parentheses-newline-inside/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-parentheses-space-inside/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/function-whitespace-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/indentation/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/max-empty-lines/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/max-line-length/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-feature-colon-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-feature-colon-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-feature-name-case/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-feature-parentheses-space-inside/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-feature-range-operator-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-feature-range-operator-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-query-list-comma-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-query-list-comma-newline-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-query-list-comma-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/media-query-list-comma-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/no-empty-first-line/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/no-eol-whitespace/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/no-extra-semicolons/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/no-missing-end-of-source-newline/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/number-leading-zero/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/number-no-trailing-zeros/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/property-case/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-attribute-brackets-space-inside/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-attribute-operator-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-attribute-operator-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-combinator-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-combinator-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-descendant-combinator-no-non-space/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-list-comma-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-list-comma-newline-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-list-comma-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-list-comma-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-max-empty-lines/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-pseudo-class-case/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-pseudo-class-parentheses-space-inside/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/selector-pseudo-element-case/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/string-quotes/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/unicode-bom/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/unit-case/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/value-list-comma-newline-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/value-list-comma-newline-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/value-list-comma-space-after/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/value-list-comma-space-before/index.mjs'),
		await import('./plugins/stylelint-15.11.0-stylistic/rules/value-list-max-empty-lines/index.mjs')
	],
	overrides: [
		{
			files: ['**/*.module.*'],
			rules: {
				/**
				 * stylelint
				 *
				 * @see https://github.com/stylelint/stylelint/tree/master/lib/rules
				 */
				'selector-class-pattern': `^(?!(${[
					// Disallowed reserved JavaScript keywords
					'abstract',
					'arguments', 'await',
					'boolean', 'break', 'byte',
					'case', 'catch', 'char', 'class', 'const', 'continue',
					'debugger', 'default', 'delete', 'do', 'double',
					'else', 'enum', 'eval', 'export', 'extends',
					'false', 'final', 'finally', 'float', 'for', 'function',
					'goto',
					'if', 'implements', 'import', 'in', 'Infinity', 'instanceof', 'int', 'interface',
					'let', 'long',
					'NaN', 'native', 'new', 'null',
					'package', 'private', 'protected', 'public',
					'return',
					'short', 'static', 'super', 'switch', 'synchronized',
					'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof',
					'undefined',
					'var', 'void', 'volatile',
					'while', 'with',
					'yield'
				].join('|')})$).+`,

				/**
				 * stylelint-selector-tag-no-without-class
				 *
				 * @see https://github.com/Moxio/stylelint-selector-tag-no-without-class
				 */
				'plugin/selector-tag-no-without-class': ['/./']
			}
		},
		{
			files: ['**/*.scss'],
			rules: {
				/**
				 * stylelint
				 *
				 * @see https://github.com/stylelint/stylelint/tree/master/lib/rules
				 */
				'at-rule-no-unknown': null, // scss/at-rule-no-unknown
				'declaration-property-value-no-unknown': null, // Covered by scss/declaration-property-value-no-unknown
				'function-no-unknown': null, // Implemented by scss/function-no-unknown
				'property-no-unknown': null, // Covered by scss/property-no-unknown

				/**
				 * stylelint-scss
				 *
				 * @see https://www.npmjs.com/package/stylelint-scss
				 */
				'scss/at-each-key-value-single-line': true,
				'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
				'scss/at-else-closing-brace-space-after': 'never-intermediate',
				'scss/at-else-empty-line-before': 'never',
				'scss/at-else-if-parentheses-space-before': 'always',
				'scss/at-extend-no-missing-placeholder': true,
				'scss/function-calculation-no-interpolation': true,
				'scss/at-function-named-arguments': ['never', { ignoreFunctions: ['scale-color', 'color.scale'] }],
				'scss/at-function-parentheses-space-before': 'always',
				'scss/at-function-pattern': '^[a-z]+(-[a-z]+)*$',
				'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
				'scss/at-if-closing-brace-space-after': 'never-intermediate',
				'scss/at-if-no-null': true,
				'scss/at-mixin-argumentless-call-parentheses': 'never',
				'scss/at-mixin-named-arguments': ['always', { ignore: ['single-argument'] }],
				'scss/at-mixin-no-risky-nesting-selector': true,
				'scss/at-mixin-parentheses-space-before': 'always',
				'scss/at-mixin-pattern': '^[a-z]+(-[a-z]+)*$',
				'scss/at-root-no-redundant': true,
				'scss/at-rule-conditional-no-parentheses': true,
				'scss/at-rule-no-unknown': true,
				'scss/at-use-no-unnamespaced': true,
				'scss/comment-no-loud': true,
				'scss/declaration-nested-properties-no-divided-groups': true,
				'scss/declaration-nested-properties': 'never',
				'scss/declaration-property-value-no-unknown': [
					true,
					{
						ignoreProperties: {
							'initial-value': /.+/u,
							'grid-template-areas': /^\([^\u0000]+\)$/u, // Whole block wrapped in parentheses.
							'/.+/': /((^|\s)\$[a-z])|/ui // SCSS variables
						}
					}
				],
				'scss/dimension-no-non-numeric-values': true,
				'scss/dollar-variable-colon-space-after': 'always',
				'scss/dollar-variable-colon-space-before': 'never',
				'scss/dollar-variable-empty-line-before': [
					'always',
					{
						except: ['first-nested', 'after-comment', 'after-dollar-variable']
					}
				],
				'scss/dollar-variable-empty-line-after': [
					'always',
					{
						except: ['last-nested', 'before-dollar-variable'],
						ignore: ['before-comment', 'inside-single-line-block']
					}
				],
				'scss/dollar-variable-first-in-block': [true, { ignore: ['comments', 'imports'] }],
				'scss/dollar-variable-no-missing-interpolation': true,
				'scss/dollar-variable-no-namespaced-assignment': true,
				'scss/dollar-variable-pattern': '^[a-z]+(-[a-z]+)*$',
				'scss/function-color-channel': true,
				'scss/function-color-relative': true,
				'scss/function-no-unknown': [true, { ignoreFunctions: [/^custom-/u] }],
				'scss/function-quote-no-quoted-strings-inside': true,
				'scss/function-unquote-no-unquoted-strings-inside': true,
				'scss/load-partial-extension': 'always',
				'scss/map-keys-quotes': 'always',
				'scss/media-feature-value-dollar-variable': 'never',
				'scss/no-duplicate-dollar-variables': true,
				'scss/no-duplicate-mixins': true,
				'scss/no-global-function-names': true,
				'scss/no-unused-private-members': true,
				'scss/percent-placeholder-pattern': '^[a-z]+(-[a-z]+)*$',
				'scss/selector-no-union-class-name': true
			}
		}
	],
	rules: {
		/**
		 * stylelint
		 *
		 * @see https://github.com/stylelint/stylelint/tree/master/lib/rules
		 */
		'alpha-value-notation': 'number', // @todo change that to 'percentage'?
		'annotation-no-unknown': [true, { ignoreAnnotations: 'default' }],
		'at-rule-allowed-list': null,
		'at-rule-descriptor-no-unknown': true,
		'at-rule-descriptor-value-no-unknown': true,
		'at-rule-disallowed-list': null,
		'at-rule-empty-line-before': [
			'always',
			{
				except: [
					'first-nested'
				],
				ignore: [
					'after-comment',
					'blockless-after-same-name-blockless'
				]
			}
		],
		'at-rule-no-deprecated': true,
		'at-rule-no-unknown': true,
		'at-rule-no-vendor-prefix': true,
		'at-rule-prelude-no-invalid': true,
		'at-rule-property-required-list': [{
			'font-face': ['font-family', 'font-style', 'font-weight', 'src']
		}],
		'block-no-empty': true,
		'color-function-alias-notation': 'without-alpha',
		'color-function-notation': [
			'modern', {
				ignore: ['with-var-inside']
			}
		],
		'color-hex-alpha': null, // Alpha values should only be used if necessary
		'color-hex-length': 'short',
		'color-named': 'never',
		'color-no-hex': true,
		'color-no-invalid-hex': true,
		'comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['stylelint-commands']
			}
		],
		'comment-no-empty': true,
		'comment-pattern': /^[^\s].+[^\s]$/u,
		'comment-whitespace-inside': 'always',
		'comment-word-disallowed-list': null,
		'container-name-pattern': (linterBundleConfig.css.patternPrefix ? `${linterBundleConfig.css.patternPrefix}-[a-z][a-zA-Z]+(-[a-z][a-zA-Z]+\\d*)+` : null),
		'custom-media-pattern': (linterBundleConfig.css.patternPrefix ? `${linterBundleConfig.css.patternPrefix}-[a-z][a-zA-Z]+(-[a-z][a-zA-Z]+\\d*)+` : null),
		'custom-property-empty-line-before': null, // Empty lines between custom properties are optional
		'custom-property-no-missing-var-function': true,
		'custom-property-pattern': (linterBundleConfig.css.patternPrefix ? `${linterBundleConfig.css.patternPrefix}-[a-z][a-zA-Z]+(-[a-z][a-zA-Z]+\\d*)*` : null),
		'declaration-block-no-duplicate-custom-properties': true,
		'declaration-block-no-duplicate-properties': [
			true,
			{
				ignore: ['consecutive-duplicates-with-different-values']
			}
		],
		'declaration-block-no-redundant-longhand-properties': [true, { ignoreShorthands: [/^grid-template/u] }],
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-block-single-line-max-declarations': 1,
		'declaration-empty-line-before': [
			'always',
			{
				except: [
					'first-nested'
				],
				ignore: [
					'after-comment',
					'after-declaration',
					'inside-single-line-block'
				]
			}
		],
		'declaration-no-important': [true, {
			severity: 'warning'
		}],
		'declaration-property-max-values': null, // { '/.*/': 4 }, @todo disabled because of false-positive with `padding-inline-start: #{24px + $i * 16px};` and `transition: transform, background-color, color, border-color, box-shadow;`
		'declaration-property-unit-allowed-list': [{
			'font-size': ['px', 'em'],
			'line-height': ['px', 'em'],
			'transition': ['ms'],
			'/^animation/': ['ms']
		}],
		'declaration-property-unit-disallowed-list': null,
		'declaration-property-value-allowed-list': null,
		'declaration-property-value-disallowed-list': null,
		'declaration-property-value-keyword-no-deprecated': true,
		'declaration-property-value-no-unknown': true,
		'font-family-name-quotes': 'always-where-recommended',
		'font-family-no-duplicate-names': true,
		'font-family-no-missing-generic-family-keyword': true,
		'font-weight-notation': 'numeric',
		'function-allowed-list': null,
		'function-calc-no-unspaced-operator': true,
		'function-disallowed-list': null,
		'function-linear-gradient-no-nonstandard-direction': true,
		'function-name-case': 'lower',
		'function-no-unknown': true,
		'function-url-no-scheme-relative': true,
		'function-url-quotes': 'always',
		'function-url-scheme-disallowed-list': null,
		'function-url-scheme-allowed-list': null,
		'hue-degree-notation': 'number', // @todo change that to 'angle'?
		'import-notation': null, // This rule, does not make sense. `node_modules` dependencies need to use `url("css_bundle")`, while project files are using only a string.
		'lightness-notation': 'percentage',
		'keyframe-block-no-duplicate-selectors': true,
		'keyframe-declaration-no-important': true,
		'keyframe-selector-notation': 'percentage',
		'keyframes-name-pattern': String.raw`^[a-z]+(-[a-z]+)*\d*$`,
		'layer-name-pattern': (linterBundleConfig.css.patternPrefix ? `${linterBundleConfig.css.patternPrefix}-[a-z][a-zA-Z]+(-[a-z][a-zA-Z]+\\d*)+` : null),
		'length-zero-no-unit': true,
		'max-nesting-depth': 6,
		'media-feature-name-allowed-list': null,
		'media-feature-name-disallowed-list': null,
		'media-feature-name-no-unknown': true,
		'media-feature-name-no-vendor-prefix': null, // For Safari, we still need "-webkit-min-device-pixel-ratio": https://caniuse.com/css-media-resolution
		'media-feature-name-unit-allowed-list': null,
		'media-feature-name-value-allowed-list': null,
		'media-feature-name-value-no-unknown': true,
		'media-feature-range-notation': 'prefix',
		'media-query-no-invalid': true,
		'named-grid-areas-no-invalid': true,
		'no-descending-specificity': null, // doesn't work in many cases (e.g. while using the SCSS :global()-pseudo-class)
		'no-duplicate-at-import-rules': true,
		'no-duplicate-selectors': true,
		'no-empty-source': true,
		'no-invalid-double-slash-comments': true,
		'no-invalid-position-at-import-rule': true,
		'no-irregular-whitespace': true,
		'no-unknown-animations': true,
		'no-unknown-custom-media': true,
		'no-unknown-custom-properties': null, // @todo Activate in 2025 as Firefox currently does not support "@property" and there is no way to specify which custom properties are available
		'number-max-precision': 5,
		'property-allowed-list': null,
		'property-disallowed-list': [
			'font', // Shorthand property is to complex
			'grid-gap' // @deprecated Use gap.
		],
		'property-no-unknown': true,
		'property-no-vendor-prefix': true,
		'rule-selector-property-disallowed-list': null,
		'rule-empty-line-before': [
			'always-multi-line',
			{
				except: ['first-nested'],
				ignore: ['after-comment']
			}
		],
		'selector-anb-no-unmatchable': true,
		'selector-attribute-name-disallowed-list': null,
		'selector-attribute-operator-allowed-list': null,
		'selector-attribute-operator-disallowed-list': null,
		'selector-attribute-quotes': 'always',
		'selector-class-pattern': null,
		'selector-combinator-allowed-list': null,
		'selector-combinator-disallowed-list': null,
		'selector-disallowed-list': null,
		'selector-id-pattern': '^[a-z]+(-[a-z]+)*$',
		'selector-max-attribute': 1,
		'selector-max-class': 5,
		'selector-max-combinators': 5,
		'selector-max-compound-selectors': 5,
		'selector-max-id': 1,
		'selector-max-pseudo-class': 3,
		'selector-max-specificity': [
			'1,4,2',
			{
				ignoreSelectors: [':global', '#root', '[dir="rtl"]', '[dir="ltr"]']
			}
		],
		'selector-max-type': 6,
		'selector-max-universal': [1, { ignoreAfterCombinators: ['>', '+'] }],
		'selector-nested-pattern': null,
		'selector-no-qualifying-type': [true, { ignore: ['attribute', 'class'] }],
		'selector-no-vendor-prefix': true,
		'selector-not-notation': 'complex',
		'selector-pseudo-class-allowed-list': null,
		'selector-pseudo-class-disallowed-list': null,
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
		'selector-pseudo-element-allowed-list': null,
		'selector-pseudo-element-disallowed-list': null,
		'selector-pseudo-element-colon-notation': 'double',
		'selector-pseudo-element-no-unknown': true,
		'selector-type-case': 'lower',
		'selector-type-no-unknown': true,
		'shorthand-property-no-redundant-values': true,
		'string-no-newline': true,
		'syntax-string-no-invalid': true,
		'time-min-milliseconds': 40, // @todo For the delay of transitions 40ms should be the minimum, for the duration 150ms should be the minimum (change it, as soon as https://github.com/stylelint/stylelint/issues/4552 got implemented)
		'unit-allowed-list': null,
		'unit-disallowed-list': null,
		'unit-no-unknown': true,
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true
			}
		],
		'value-no-vendor-prefix': true,

		/**
		 * stylelint-declaration-block-no-ignored-properties
		 *
		 * @see https://www.npmjs.com/package/stylelint-declaration-block-no-ignored-properties
		 */
		'plugin/declaration-block-no-ignored-properties': true,

		/**
		 * stylelint-high-performance-animation
		 *
		 * @see https://github.com/kristerkari/stylelint-high-performance-animation
		 */
		'plugin/no-low-performance-animation-properties': [true, {
			ignore: 'paint-properties',
			severity: 'warning'
		}],

		/**
		 * stylelint-15.11.0-stylistic rules
		 */
		/*
		'plugin/at-rule-name-newline-after': null,
		'plugin/block-closing-brace-space-after': null,
		'plugin/block-opening-brace-newline-before': null,
		*/
		'plugin/at-rule-name-case': 'lower',
		'plugin/at-rule-name-space-after': 'always-single-line',
		'plugin/at-rule-semicolon-newline-after': 'always',
		'plugin/at-rule-semicolon-space-before': 'never',
		'plugin/block-closing-brace-empty-line-before': 'never',
		'plugin/block-closing-brace-newline-after': 'always',
		'plugin/block-closing-brace-newline-before': 'always-multi-line',
		'plugin/block-closing-brace-space-before': 'always-single-line',
		'plugin/block-opening-brace-newline-after': 'always-multi-line',
		'plugin/block-opening-brace-space-after': 'always-single-line',
		'plugin/block-opening-brace-space-before': 'always',
		'plugin/color-hex-case': 'lower',
		'plugin/declaration-bang-space-after': 'never',
		'plugin/declaration-bang-space-before': 'always',
		'plugin/declaration-block-semicolon-newline-after': 'always-multi-line',
		'plugin/declaration-block-semicolon-newline-before': 'never-multi-line',
		'plugin/declaration-block-semicolon-space-after': 'always-single-line',
		'plugin/declaration-block-semicolon-space-before': 'never',
		'plugin/declaration-block-trailing-semicolon': 'always',
		'plugin/declaration-colon-newline-after': 'always-multi-line',
		'plugin/declaration-colon-space-after': 'always-single-line',
		'plugin/declaration-colon-space-before': 'never',
		'plugin/function-comma-newline-after': 'always-multi-line',
		'plugin/function-comma-newline-before': 'never-multi-line',
		'plugin/function-comma-space-after': 'always-single-line',
		'plugin/function-comma-space-before': 'never',
		'plugin/function-max-empty-lines': 0,
		'plugin/function-parentheses-newline-inside': 'always-multi-line',
		'plugin/function-parentheses-space-inside': 'never-single-line',
		'plugin/function-whitespace-after': 'always',
		'plugin/indentation': 'tab',
		'plugin/max-empty-lines': 1,
		'plugin/max-line-length': 160,
		'plugin/media-feature-colon-space-after': 'always',
		'plugin/media-feature-colon-space-before': 'never',
		'plugin/media-feature-name-case': 'lower',
		'plugin/media-feature-parentheses-space-inside': 'never',
		'plugin/media-feature-range-operator-space-after': 'always',
		'plugin/media-feature-range-operator-space-before': 'always',
		'plugin/media-query-list-comma-newline-after': 'always-multi-line',
		'plugin/media-query-list-comma-newline-before': 'never-multi-line',
		'plugin/media-query-list-comma-space-after': 'always-single-line',
		'plugin/media-query-list-comma-space-before': 'never',
		'plugin/no-empty-first-line': true,
		'plugin/no-eol-whitespace': true,
		'plugin/no-extra-semicolons': true,
		'plugin/no-missing-end-of-source-newline': true,
		'plugin/number-leading-zero': 'always',
		'plugin/number-no-trailing-zeros': true,
		'plugin/property-case': 'lower',
		'plugin/selector-attribute-brackets-space-inside': 'never',
		'plugin/selector-attribute-operator-space-after': 'never',
		'plugin/selector-attribute-operator-space-before': 'never',
		'plugin/selector-combinator-space-after': 'always',
		'plugin/selector-combinator-space-before': 'always',
		'plugin/selector-descendant-combinator-no-non-space': true,
		'plugin/selector-list-comma-newline-after': 'always',
		'plugin/selector-list-comma-newline-before': 'never-multi-line',
		'plugin/selector-list-comma-space-after': 'always-single-line',
		'plugin/selector-list-comma-space-before': 'never',
		'plugin/selector-max-empty-lines': 0,
		'plugin/selector-pseudo-class-case': 'lower',
		'plugin/selector-pseudo-class-parentheses-space-inside': 'never',
		'plugin/selector-pseudo-element-case': 'lower',
		'plugin/string-quotes': 'double',
		'plugin/unicode-bom': 'never',
		'plugin/unit-case': 'lower',
		'plugin/value-list-comma-newline-after': 'always-multi-line',
		'plugin/value-list-comma-newline-before': 'never-multi-line',
		'plugin/value-list-comma-space-after': 'always-single-line',
		'plugin/value-list-comma-space-before': 'never',
		'plugin/value-list-max-empty-lines': 0,

		/**
		 * stylelint-order
		 *
		 * @see https://www.npmjs.com/package/stylelint-order
		 */
		'order/order': [
			'dollar-variables',
			'at-variables',
			{
				type: 'at-rule',
				name: 'extend'
			},
			{
				type: 'at-rule',
				name: 'include'
			},
			'custom-properties',
			'declarations',
			{
				type: 'at-rule',
				name: 'media'
			},
			'rules',
			{
				type: 'at-rule',
				name: 'keyframes'
			}
		],
		'order/properties-alphabetical-order': null,
		'order/properties-order': [
			[
				{
					groupName: 'Reset',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'all'
					]
				},

				{
					groupName: 'Performance Optimizations',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'contain',
						'content-visibility',
						'contain-intrinsic-size',
						'will-change'
					]
				},
				{
					groupName: 'Heading',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'content',
						'quotes'
					]
				},
				{
					groupName: 'Box',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'display',
						'visibility',

						'appearance',

						'position',
						'z-index'
					]
				},
				{
					groupName: 'Position',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'inset',
						'top',
						'right',
						'bottom',
						'left',

						'inset-block',
						'inset-block-start',
						'inset-block-end',
						'inset-inline',
						'inset-inline-start',
						'inset-inline-end',

						'box-sizing'
					]
				},
				{
					groupName: 'Grid',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'grid',
						'grid-after',
						'grid-area',
						'grid-auto-columns',
						'grid-auto-flow',
						'grid-auto-rows',
						'grid-before',
						'grid-column',
						'grid-column-end',
						'grid-column-gap',
						'grid-column-start',
						'grid-columns',
						'grid-end',
						'grid-row',
						'grid-row-end',
						'grid-row-gap',
						'grid-row-start',
						'grid-rows',
						'grid-start',
						'grid-template',
						'grid-template-areas',
						'grid-template-columns',
						'grid-template-rows'
					]
				},
				{
					groupName: 'Flex',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'flex',
						'flex-basis',
						'flex-direction',
						'flex-flow',
						'flex-grow',
						'flex-shrink',
						'flex-wrap',
						'order'
					]
				},
				{
					groupName: 'Gap',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'gap',
						'row-gap',
						'column-gap'
					]
				},
				{
					groupName: 'Alignment',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'align-content',
						'align-items',
						'align-self',
						'justify-content',
						'justify-items',
						'justify-self',
						'place-content',
						'place-items',
						'place-self'
					]
				},
				{
					groupName: 'Dimension',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'width',
						'min-width',
						'max-width',
						'height',
						'min-height',
						'max-height'
					]
				},
				{
					groupName: 'Margin',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'margin',
						'margin-top',
						'margin-right',
						'margin-bottom',
						'margin-left',

						'margin-block',
						'margin-block-start',
						'margin-block-end',
						'margin-inline',
						'margin-inline-start',
						'margin-inline-end'
					]
				},
				{
					groupName: 'Padding',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'padding',
						'padding-top',
						'padding-right',
						'padding-bottom',
						'padding-left',

						'padding-block',
						'padding-block-start',
						'padding-block-end',
						'padding-inline',
						'padding-inline-start',
						'padding-inline-end'
					]
				},
				{
					groupName: 'Float',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'float',
						'clear'
					]
				},
				{
					groupName: 'Overflow',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'overflow',
						'overflow-x',
						'overflow-y',
						'overscroll-behavior'
					]
				},
				{
					groupName: 'Clip / Zoom',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'clip',
						'zoom'
					]
				},
				{
					groupName: 'Columns',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'columns',
						'column-fill',
						'column-rule',
						'column-span',
						'column-count',
						'column-width',
						'widows',
						'orphans'
					]
				},
				{
					groupName: 'Table / List',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'table-layout',
						'empty-cells',
						'caption-side',
						'border-spacing',
						'border-collapse',
						'list-style',
						'list-style-position',
						'list-style-type',
						'list-style-image'
					]
				},
				{
					groupName: 'Transform',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'transform',
						'transform-origin',
						'transform-style',
						'backface-visibility',
						'perspective',
						'perspective-origin'
					]
				},
				{
					groupName: 'Transition',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'transition',
						'transition-property',
						'transition-duration',
						'transition-timing-function',
						'transition-delay'
					]
				},
				{
					groupName: 'Animation',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'animation',
						'animation-name',
						'animation-duration',
						'animation-play-state',
						'animation-timing-function',
						'animation-delay',
						'animation-iteration-count',
						'animation-direction',
						'animation-fill-mode'
					]
				},
				{
					groupName: 'Border General',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'border',
						'border-top',
						'border-right',
						'border-bottom',
						'border-left',
						'border-width',
						'border-top-width',
						'border-right-width',
						'border-bottom-width',
						'border-left-width',
						'border-inline-start-width',
						'border-inline-end-width',

						'border-style',
						'border-top-style',
						'border-right-style',
						'border-bottom-style',
						'border-left-style',
						'border-inline-start-style',
						'border-inline-end-style',

						'border-radius',
						'border-top-left-radius',
						'border-top-right-radius',
						'border-bottom-left-radius',
						'border-bottom-right-radius',

						'border-color',
						'border-top-color',
						'border-right-color',
						'border-bottom-color',
						'border-left-color',
						'border-inline-start-color',
						'border-inline-end-color'
					]
				},
				{
					groupName: 'Outline',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'outline',
						'outline-color',
						'outline-offset',
						'outline-style',
						'outline-width'
					]
				},
				{
					groupName: 'Stroke',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'stroke-width',
						'stroke-linecap',
						'stroke-dasharray',
						'stroke-dashoffset',
						'stroke'
					]
				},
				{
					groupName: 'Opacity',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'opacity'
					]
				},
				{
					groupName: 'Background',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'background',
						'background-color',
						'background-image',
						'background-repeat',
						'background-position',
						'background-size',
						'box-shadow',
						'fill'
					]
				},
				{
					groupName: 'Text Color',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'color',
						'caret-color'
					]
				},
				{
					groupName: 'Font',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'font',
						'font-family',
						'font-size',
						'font-size-adjust',
						'font-stretch',
						'font-effect',
						'font-style',
						'font-variant',
						'font-weight',
						'font-smoothing',
						'font-display',

						'font-emphasize',
						'font-emphasize-position',
						'font-emphasize-style'
					]
				},
				{
					groupName: 'Text',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'letter-spacing',
						'line-height',
						'word-spacing',

						'text-align',
						'text-align-last',
						'text-decoration',
						'text-indent',
						'text-justify',
						'text-overflow',
						'text-overflow-ellipsis',
						'text-overflow-mode',
						'text-rendering',
						'text-outline',
						'text-shadow',
						'text-transform',
						'text-wrap',
						'word-wrap',
						'overflow-wrap',
						'word-break',

						'text-emphasis',
						'text-emphasis-color',
						'text-emphasis-style',
						'text-emphasis-position',

						'vertical-align',
						'white-space',
						'word-spacing',
						'hyphens',
						'hyphenate-character',

						'src'
					]
				},
				{
					groupName: 'Other',
					emptyLineBefore: 'always',
					noEmptyLineBetween: true,
					properties: [
						'tab-size',
						'counter-reset',
						'counter-increment',
						'resize',
						'cursor',
						'pointer-events',
						'speak',
						'user-select',
						'touch-callout',
						'nav-index',
						'nav-up',
						'nav-right',
						'nav-down',
						'nav-left'
					]
				}
			],
			{
				unspecified: 'bottom',
				emptyLineBeforeUnspecified: 'always',
				emptyLineMinimumPropertyThreshold: 0
			}
		],

		/**
		 * stylelint-scss
		 *
		 * @see https://www.npmjs.com/package/stylelint-scss
		 */
		'scss/at-each-key-value-single-line': null,
		'scss/at-else-closing-brace-newline-after': null,
		'scss/at-else-closing-brace-space-after': null,
		'scss/at-else-empty-line-before': null,
		'scss/at-else-if-parentheses-space-before': null,
		'scss/at-extend-no-missing-placeholder': null,
		'scss/function-calculation-no-interpolation': null,
		'scss/at-function-named-arguments': null,
		'scss/at-function-parentheses-space-before': null,
		'scss/at-function-pattern': null,
		'scss/at-if-closing-brace-newline-after': null,
		'scss/at-if-closing-brace-space-after': null,
		'scss/at-if-no-null': null,
		'scss/at-import-partial-extension-allowed-list': null,
		'scss/at-import-partial-extension-disallowed-list': null,
		'scss/at-mixin-argumentless-call-parentheses': null,
		'scss/at-mixin-named-arguments': null,
		'scss/at-mixin-no-risky-nesting-selector': null,
		'scss/at-mixin-parentheses-space-before': null,
		'scss/at-mixin-pattern': null,
		'scss/at-root-no-redundant': null,
		'scss/at-rule-conditional-no-parentheses': null,
		'scss/at-rule-no-unknown': null,
		'scss/at-use-no-unnamespaced': null,
		'scss/at-use-no-redundant-alias': null,
		'scss/block-no-redundant-nesting': null,
		'scss/comment-no-empty': true,
		'scss/comment-no-loud': null,
		'scss/declaration-nested-properties-no-divided-groups': null,
		'scss/declaration-nested-properties': null,
		'scss/declaration-property-value-no-unknown': [
			true,
			{
				ignoreProperties: {
					'initial-value': /.+/u,
					'grid-template-areas': /^\([^\u0000]+\)$/u // Whole block wrapped in parentheses.
				}
			}
		],
		'scss/dimension-no-non-numeric-values': null,
		'scss/dollar-variable-colon-newline-after': null,
		'scss/dollar-variable-colon-space-after': null,
		'scss/dollar-variable-colon-space-before': null,
		'scss/dollar-variable-default': null,
		'scss/dollar-variable-empty-line-before': null,
		'scss/dollar-variable-empty-line-after': null,
		'scss/dollar-variable-first-in-block': null,
		'scss/dollar-variable-no-missing-interpolation': null,
		'scss/dollar-variable-no-namespaced-assignment': null,
		'scss/dollar-variable-pattern': null,
		'scss/double-slash-comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['between-comments', 'stylelint-commands']
			}
		],
		'scss/double-slash-comment-inline': null,
		'scss/double-slash-comment-whitespace-inside': 'always',
		'scss/function-color-channel': null,
		'scss/function-color-relative': null,
		'scss/function-disallowed-list': null,
		'scss/function-no-unknown': null,
		'scss/function-quote-no-quoted-strings-inside': null,
		'scss/function-unquote-no-unquoted-strings-inside': null,
		'scss/load-no-partial-leading-underscore': null,
		'scss/load-partial-extension': null,
		'scss/map-keys-quotes': null,
		'scss/media-feature-value-dollar-variable': null,
		'scss/no-dollar-variables': null,
		'scss/no-duplicate-dollar-variables': null,
		'scss/no-duplicate-load-rules': true,
		'scss/no-duplicate-mixins': null,
		'scss/no-global-function-names': null,
		'scss/no-unused-private-members': null,
		'scss/operator-no-newline-after': true,
		'scss/operator-no-newline-before': true,
		'scss/operator-no-unspaced': true,
		'scss/partial-no-import': null,
		'scss/percent-placeholder-pattern': null,
		'scss/property-no-unknown': true,
		'scss/selector-nest-combinators': null, // Sometimes nesting does not make sense
		'scss/selector-no-redundant-nesting-selector': true,
		'scss/selector-no-union-class-name': null,

		/**
		 * stylelint-selector-no-empty
		 *
		 * @see https://github.com/ssivanatarajan/stylelint-selector-no-empty
		 */
		'plugin/stylelint-selector-no-empty': true,

		/**
		 * stylelint-selector-tag-no-without-class
		 *
		 * @see https://github.com/Moxio/stylelint-selector-tag-no-without-class
		 */
		'plugin/selector-tag-no-without-class': null,

		/**
		 * stylelint-use-logical-spec
		 *
		 * @see https://github.com/Jordan-Hall/stylelint-use-logical-spec
		 */
		'liberty/use-logical-spec': ['always', { except: [
			'float',

			'inset',
			'top',
			'bottom',

			'border-top', // "border-block-start" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-block-start
			'border-top-color', // "border-block-start-color" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-block-start-color
			'border-top-left-radius', // "border-start-start-radius" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-start-start-radius
			'border-top-right-radius', // "border-start-end-radius" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-start-end-radius
			'border-top-width', // "border-block-start-width" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-block-start-width
			'border-bottom', // "border-block-end" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-block-end
			'border-bottom-color', // "border-block-end-color" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-block-end-color
			'border-bottom-left-radius', // "border-end-start-radius" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-bottom-left-radius
			'border-bottom-right-radius', // "border-end-end-radius" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-end-end-radius
			'border-bottom-width', // "border-block-end-width" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-block-end-width
			'border-left', // "border-inline-start" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-inline-start
			'border-left-color', // "border-inline-start-color" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-inline-start-color
			'border-right', // "border-inline-end" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-inline-end
			'border-right-color', // "border-inline-end-color" is new and should not be used before 2022. @see https://caniuse.com/mdn-css_properties_border-inline-end-color

			'margin',
			'margin-top',
			'margin-bottom',

			'padding',
			'padding-top',
			'padding-bottom',

			'left',
			'right',

			'text-align', // @todo Should only be disabled for "right", since numbers should be always aligned right, for any direction.

			'width', // "inline-size" is very rarely needed. I'm not aware of any use-case.
			'height', // "block-size" is very rarely needed. I'm not aware of any use-case.
			'min-width', // "min-inline-size" is very rarely needed. I'm not aware of any use-case.
			'min-height', // "min-block-size" is very rarely needed. I'm not aware of any use-case.
			'max-width', // "max-inline-size" is very rarely needed. I'm not aware of any use-case.
			'max-height' // "max-block-size" is very rarely needed. I'm not aware of any use-case.
		] }]
	}
};
