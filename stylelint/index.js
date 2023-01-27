/**
 * @file Global Stylelint settings
 */

/* eslint-disable max-lines -- The rules can be easier managed if they are all in one file  */

const path = require('path');

module.exports = {
	reportNeedlessDisables: true,
	reportInvalidScopeDisables: true,
	reportDescriptionlessDisables: true,
	customSyntax: 'postcss-scss',
	plugins: [
		'stylelint-declaration-block-no-ignored-properties',
		'stylelint-order',
		'stylelint-scss',
		'stylelint-selector-no-empty',
		'stylelint-use-logical-spec',
		path.join(__dirname, '/plugins/stylelint-high-performance-animation.js'),
		path.join(__dirname, '/plugins/stylelint-selector-tag-no-without-class.js')
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
		'at-rule-name-case': 'lower',
		'at-rule-name-newline-after': null,
		'at-rule-name-space-after': 'always-single-line',
		'at-rule-no-unknown': null, // scss/at-rule-no-unknown
		'at-rule-no-vendor-prefix': true,
		'at-rule-property-required-list': [{
			'font-face': ['font-family', 'font-style', 'font-weight', 'src']
		}],
		'at-rule-semicolon-newline-after': 'always',
		'at-rule-semicolon-space-before': 'never',
		'block-closing-brace-empty-line-before': 'never',
		'block-closing-brace-newline-after': 'always',
		'block-closing-brace-newline-before': 'always-multi-line',
		'block-closing-brace-space-after': null,
		'block-closing-brace-space-before': 'always-single-line',
		'block-no-empty': true,
		'block-opening-brace-newline-after': 'always-multi-line',
		'block-opening-brace-newline-before': null,
		'block-opening-brace-space-after': 'always-single-line',
		'block-opening-brace-space-before': 'always',
		'color-function-notation': null, // @todo Doesn't work with variables like: hsl(var(--xyz)). Create issue. Later change that to 'modern'.
		'color-hex-alpha': null, // @todo Not widely supported yet. Activate in 2024.
		'color-hex-case': 'lower',
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
		'custom-media-pattern': (global.linterBundleSettings?.patternPrefix ? `${global.linterBundleSettings.patternPrefix}-[a-z][a-zA-Z]+(-[a-z][a-zA-Z]+\\d*)+` : null),
		'custom-property-empty-line-before': null, // Empty lines between custom properties are optional
		'custom-property-no-missing-var-function': true,
		'custom-property-pattern': (global.linterBundleSettings?.patternPrefix ? `${global.linterBundleSettings.patternPrefix}-[a-z][a-zA-Z]+(-[a-z][a-zA-Z]+\\d*)*` : null),
		'declaration-bang-space-after': 'never',
		'declaration-bang-space-before': 'always',
		'declaration-block-no-duplicate-custom-properties': true,
		'declaration-block-no-duplicate-properties': [
			true,
			{
				ignore: ['consecutive-duplicates-with-different-values']
			}
		],
		'declaration-block-no-redundant-longhand-properties': [true, { ignoreShorthands: [/^grid-template/u] }],
		'declaration-block-no-shorthand-property-overrides': true,
		'declaration-block-semicolon-newline-after': 'always-multi-line',
		'declaration-block-semicolon-newline-before': 'never-multi-line',
		'declaration-block-semicolon-space-after': 'always-single-line',
		'declaration-block-semicolon-space-before': 'never',
		'declaration-block-single-line-max-declarations': 1,
		'declaration-block-trailing-semicolon': 'always',
		'declaration-colon-newline-after': 'always-multi-line',
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
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
		'declaration-property-max-values': null, // { '/.*/': 4 }, @todo disabled because of false-positive with `padding-inline-start: #{24px + $i * 16px};` and `transition: transform, background-color, color, border-color, box-shadow;`
		'declaration-no-important': [true, {
			severity: 'warning'
		}],
		'declaration-property-unit-allowed-list': [{
			'font-size': ['px', 'em'],
			'line-height': ['px', 'em'],
			'transition': ['ms'],
			'/^animation/': ['ms']
		}],
		'declaration-property-unit-disallowed-list': null,
		'declaration-property-value-allowed-list': null,
		'declaration-property-value-disallowed-list': null,
		'font-family-name-quotes': 'always-where-recommended',
		'font-family-no-duplicate-names': true,
		'font-family-no-missing-generic-family-keyword': true,
		'font-weight-notation': 'numeric',
		'function-allowed-list': null,
		'function-calc-no-unspaced-operator': true,
		'function-comma-newline-after': 'always-multi-line',
		'function-comma-newline-before': 'never-multi-line',
		'function-comma-space-after': 'always-single-line',
		'function-comma-space-before': 'never',
		'function-disallowed-list': null,
		'function-linear-gradient-no-nonstandard-direction': true,
		'function-max-empty-lines': 0,
		'function-name-case': 'lower',
		'function-no-unknown': null, // Implemented by scss/function-no-unknown
		'function-parentheses-newline-inside': 'always-multi-line',
		'function-parentheses-space-inside': 'never-single-line',
		'function-url-no-scheme-relative': true,
		'function-url-quotes': 'always',
		'function-url-scheme-disallowed-list': null,
		'function-url-scheme-allowed-list': null,
		'function-whitespace-after': 'always',
		'hue-degree-notation': 'number', // @todo change that to 'angle'?
		'import-notation': null, // This rule, does not make sense. `node_modules` dependencies need to use `url("css_bundle")`, while project files are using only a string.
		'indentation': 'tab',
		'keyframe-block-no-duplicate-selectors': true,
		'keyframe-declaration-no-important': true,
		'keyframe-selector-notation': 'percentage',
		'keyframes-name-pattern': '^[a-z]+(-[a-z]+)*\\d*$',
		'length-zero-no-unit': true,
		'linebreaks': 'unix',
		'max-empty-lines': 1,
		'max-line-length': 160,
		'max-nesting-depth': 6,
		'media-feature-colon-space-after': 'always',
		'media-feature-colon-space-before': 'never',
		'media-feature-name-allowed-list': null,
		'media-feature-name-case': 'lower',
		'media-feature-name-disallowed-list': null,
		'media-feature-name-no-unknown': true,
		'media-feature-name-no-vendor-prefix': null, // For Safari, we still need "-webkit-min-device-pixel-ratio": https://caniuse.com/css-media-resolution
		'media-feature-name-value-allowed-list': null,
		'media-feature-parentheses-space-inside': 'never',
		'media-feature-range-notation': 'prefix',
		'media-feature-range-operator-space-after': 'always',
		'media-feature-range-operator-space-before': 'always',
		'media-query-list-comma-newline-after': 'always-multi-line',
		'media-query-list-comma-newline-before': 'never-multi-line',
		'media-query-list-comma-space-after': 'always-single-line',
		'media-query-list-comma-space-before': 'never',
		'named-grid-areas-no-invalid': true,
		'no-descending-specificity': null, // doesn't work in many cases (e.g. while using the SCSS :global()-pseudo-class)
		'no-duplicate-at-import-rules': true,
		'no-duplicate-selectors': true,
		'no-empty-first-line': true,
		'no-empty-source': true,
		'no-eol-whitespace': true,
		'no-extra-semicolons': true,
		'no-invalid-double-slash-comments': true,
		'no-invalid-position-at-import-rule': true,
		'no-irregular-whitespace': true,
		'no-missing-end-of-source-newline': true,
		'no-unknown-animations': true,
		'number-leading-zero': 'always',
		'number-max-precision': 5,
		'number-no-trailing-zeros': true,
		'property-allowed-list': null,
		'property-case': 'lower',
		'property-disallowed-list': [
			'font', // Shorthand property is to complex
			'grid-gap', // @deprecated Use gap.
			'padding-inline', // That's not widely supported and there is no fallback. @see https://caniuse.com/mdn-css_properties_padding-inline
			'margin-inline', // That's not widely supported and there is no fallback. @see https://caniuse.com/mdn-css_properties_margin-inline
			'inset-inline', // That's not widely supported and there is no fallback. @see https://caniuse.com/mdn-css_properties_inset-inline
			'inset-inline-start', // That's not widely supported and there is no fallback. @see https://caniuse.com/mdn-css_properties_inset-inline-start
			'inset-inline-end' // That's not widely supported and there is no fallback. @see https://caniuse.com/mdn-css_properties_inset-inline-end
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
		'selector-attribute-brackets-space-inside': 'never',
		'selector-attribute-name-disallowed-list': null,
		'selector-attribute-operator-allowed-list': null,
		'selector-attribute-operator-disallowed-list': null,
		'selector-attribute-operator-space-after': 'never',
		'selector-attribute-operator-space-before': 'never',
		'selector-attribute-quotes': 'always',
		'selector-class-pattern': null,
		'selector-combinator-allowed-list': null,
		'selector-combinator-disallowed-list': null,
		'selector-combinator-space-after': 'always',
		'selector-combinator-space-before': 'always',
		'selector-descendant-combinator-no-non-space': true,
		'selector-disallowed-list': null,
		'selector-id-pattern': '^[a-z]+(-[a-z]+)*$',
		'selector-list-comma-newline-after': 'always',
		'selector-list-comma-newline-before': 'never-multi-line',
		'selector-list-comma-space-after': 'always-single-line',
		'selector-list-comma-space-before': 'never',
		'selector-max-attribute': 1,
		'selector-max-class': 5,
		'selector-max-combinators': 5,
		'selector-max-compound-selectors': 5,
		'selector-max-empty-lines': 0,
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
		'selector-not-notation': null, // 'complex', @todo Reactivate in 2024. Disabled for now, because it depends on the project if modern Selectors Level 4 CSS can be used.
		'selector-pseudo-class-allowed-list': null,
		'selector-pseudo-class-case': 'lower',
		'selector-pseudo-class-disallowed-list': null,
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
		'selector-pseudo-class-parentheses-space-inside': 'never',
		'selector-pseudo-element-allowed-list': null,
		'selector-pseudo-element-case': 'lower',
		'selector-pseudo-element-disallowed-list': null,
		'selector-pseudo-element-colon-notation': 'double',
		'selector-pseudo-element-no-unknown': true,
		'selector-type-case': 'lower',
		'selector-type-no-unknown': true,
		'shorthand-property-no-redundant-values': true,
		'string-no-newline': true,
		'string-quotes': 'double',
		'time-min-milliseconds': 40, // @todo For the delay of transitions 40ms should be the minimum, for the duration 150ms should be the minimum (change it, as soon as https://github.com/stylelint/stylelint/issues/4552 got implemented)
		'unicode-bom': 'never',
		'unit-allowed-list': null,
		'unit-case': 'lower',
		'unit-disallowed-list': null,
		'unit-no-unknown': true,
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true
			}
		],
		'value-list-comma-newline-after': 'always-multi-line',
		'value-list-comma-newline-before': 'never-multi-line',
		'value-list-comma-space-after': 'always-single-line',
		'value-list-comma-space-before': 'never',
		'value-list-max-empty-lines': 0,
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
						'top',
						'right',
						'bottom',
						'left',

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
		'scss/at-each-key-value-single-line': true,
		'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
		'scss/at-else-closing-brace-space-after': 'never-intermediate',
		'scss/at-else-empty-line-before': 'never',
		'scss/at-else-if-parentheses-space-before': 'always',
		'scss/at-extend-no-missing-placeholder': true,
		'scss/at-function-named-arguments': ['never', { ignoreFunctions: ['scale-color', 'color.scale'] }],
		'scss/at-function-parentheses-space-before': 'always',
		'scss/at-function-pattern': '^[a-z]+(-[a-z]+)*$',
		'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
		'scss/at-if-closing-brace-space-after': 'never-intermediate',
		'scss/at-if-no-null': true,
		'scss/at-import-no-partial-leading-underscore': null,
		'scss/at-import-partial-extension-blacklist': null,
		'scss/at-import-partial-extension-whitelist': null,
		'scss/at-import-partial-extension': 'always',
		'scss/at-mixin-argumentless-call-parentheses': 'never',
		'scss/at-mixin-named-arguments': ['always', { ignore: ['single-argument'] }],
		'scss/at-mixin-parentheses-space-before': 'always',
		'scss/at-mixin-pattern': '^[a-z]+(-[a-z]+)*$',
		'scss/at-rule-conditional-no-parentheses': true,
		'scss/at-rule-no-unknown': true,
		'scss/at-use-no-unnamespaced': true,
		'scss/comment-no-empty': true,
		'scss/comment-no-loud': true,
		'scss/declaration-nested-properties-no-divided-groups': true,
		'scss/declaration-nested-properties': 'never',
		'scss/dimension-no-non-numeric-values': true,
		'scss/dollar-variable-colon-newline-after': null,
		'scss/dollar-variable-colon-space-after': 'always',
		'scss/dollar-variable-colon-space-before': 'never',
		'scss/dollar-variable-default': null,
		'scss/dollar-variable-empty-line-before': [
			'always',
			{
				except: ['first-nested', 'after-comment', 'after-dollar-variable']
			}
		],
		'scss/dollar-variable-empty-line-after': [
			'always',
			{
				except: ['last-nested', 'before-dollar-variable']
			}
		],
		'scss/dollar-variable-first-in-block': [true, { ignore: ['comments', 'imports'] }],
		'scss/dollar-variable-no-missing-interpolation': true,
		'scss/dollar-variable-no-namespaced-assignment': true,
		'scss/dollar-variable-pattern': '^[a-z]+(-[a-z]+)*$',
		'scss/double-slash-comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['between-comments', 'stylelint-commands']
			}
		],
		'scss/double-slash-comment-inline': null,
		'scss/double-slash-comment-whitespace-inside': 'always',
		'scss/function-color-relative': true,
		'scss/function-no-unknown': true,
		'scss/function-quote-no-quoted-strings-inside': true,
		'scss/function-unquote-no-unquoted-strings-inside': true,
		'scss/map-keys-quotes': 'always',
		'scss/media-feature-value-dollar-variable': 'never',
		'scss/no-dollar-variables': null,
		'scss/no-duplicate-dollar-variables': true,
		'scss/no-duplicate-mixins': true,
		'scss/no-global-function-names': true,
		'scss/operator-no-newline-after': true,
		'scss/operator-no-newline-before': true,
		'scss/operator-no-unspaced': true,
		'scss/partial-no-import': null,
		'scss/percent-placeholder-pattern': '^[a-z]+(-[a-z]+)*$',
		'scss/selector-nest-combinators': null, // Sometimes nesting does not make sense
		'scss/selector-no-redundant-nesting-selector': true,
		'scss/selector-no-union-class-name': true,

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

			'left', // "inset-inline" is not supported by any browser, expect Firefox. @see https://caniuse.com/mdn-css_properties_inset-inline
			'right', // "inset-inline-end" is not supported by any browser, expect Firefox. @see https://caniuse.com/mdn-css_properties_inset-inline

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
