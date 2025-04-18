// @ts-nocheck

import uniteSets from 'stylelint/lib/utils/uniteSets.mjs';

import htmlTags from '../html-tags/index.mjs';

const deprecatedHtmlTypeSelectors = new Set([
	'acronym',
	'applet',
	'basefont',
	'big',
	'blink',
	'center',
	'content',
	'dir',
	'font',
	'frame',
	'frameset',
	'hgroup',
	'isindex',
	'keygen',
	'listing',
	'marquee',
	'nobr',
	'noembed',
	'plaintext',
	'spacer',
	'strike',
	'tt',
	'xmp'
]);

// typecasting htmlTags to be more generic; see https://github.com/stylelint/stylelint/pull/6013 for discussion
/** @type {Set<string>} */
const standardHtmlTypeSelectors = new Set(htmlTags);

export const htmlTypeSelectors = uniteSets(deprecatedHtmlTypeSelectors, standardHtmlTypeSelectors);

export const mixedCaseSvgTypeSelectors = new Set([
	'altGlyph',
	'altGlyphDef',
	'altGlyphItem',
	'animateColor',
	'animateMotion',
	'animateTransform',
	'clipPath',
	'feBlend',
	'feColorMatrix',
	'feComponentTransfer',
	'feComposite',
	'feConvolveMatrix',
	'feDiffuseLighting',
	'feDisplacementMap',
	'feDistantLight',
	'feDropShadow',
	'feFlood',
	'feFuncA',
	'feFuncB',
	'feFuncG',
	'feFuncR',
	'feGaussianBlur',
	'feImage',
	'feMerge',
	'feMergeNode',
	'feMorphology',
	'feOffset',
	'fePointLight',
	'feSpecularLighting',
	'feSpotLight',
	'feTile',
	'feTurbulence',
	'foreignObject',
	'glyphRef',
	'linearGradient',
	'radialGradient',
	'textPath'
]);

// These are the ones that can have single-colon notation
export const levelOneAndTwoPseudoElements = new Set(['before', 'after', 'first-line', 'first-letter']);

export const shadowTreePseudoElements = new Set(['part']);

export const webkitScrollbarPseudoElements = new Set([
	'-webkit-resizer',
	'-webkit-scrollbar',
	'-webkit-scrollbar-button',
	'-webkit-scrollbar-corner',
	'-webkit-scrollbar-thumb',
	'-webkit-scrollbar-track',
	'-webkit-scrollbar-track-piece'
]);

const vendorSpecificPseudoElements = uniteSets(webkitScrollbarPseudoElements, [
	'-moz-focus-inner',
	'-moz-focus-outer',
	'-moz-list-bullet',
	'-moz-meter-bar',
	'-moz-placeholder',
	'-moz-progress-bar',
	'-moz-range-progress',
	'-moz-range-thumb',
	'-moz-range-track',
	'-ms-browse',
	'-ms-check',
	'-ms-clear',
	'-ms-expand',
	'-ms-fill',
	'-ms-fill-lower',
	'-ms-fill-upper',
	'-ms-reveal',
	'-ms-thumb',
	'-ms-ticks-after',
	'-ms-ticks-before',
	'-ms-tooltip',
	'-ms-track',
	'-ms-value',
	'-webkit-color-swatch',
	'-webkit-color-swatch-wrapper',
	'-webkit-calendar-picker-indicator',
	'-webkit-clear-button',
	'-webkit-date-and-time-value',
	'-webkit-datetime-edit',
	'-webkit-datetime-edit-ampm-field',
	'-webkit-datetime-edit-day-field',
	'-webkit-datetime-edit-fields-wrapper',
	'-webkit-datetime-edit-hour-field',
	'-webkit-datetime-edit-millisecond-field',
	'-webkit-datetime-edit-minute-field',
	'-webkit-datetime-edit-month-field',
	'-webkit-datetime-edit-second-field',
	'-webkit-datetime-edit-text',
	'-webkit-datetime-edit-week-field',
	'-webkit-datetime-edit-year-field',
	'-webkit-details-marker',
	'-webkit-distributed',
	'-webkit-file-upload-button',
	'-webkit-input-placeholder',
	'-webkit-keygen-select',
	'-webkit-meter-bar',
	'-webkit-meter-even-less-good-value',
	'-webkit-meter-inner-element',
	'-webkit-meter-optimum-value',
	'-webkit-meter-suboptimum-value',
	'-webkit-progress-bar',
	'-webkit-progress-inner-element',
	'-webkit-progress-value',
	'-webkit-search-cancel-button',
	'-webkit-search-decoration',
	'-webkit-search-results-button',
	'-webkit-search-results-decoration',
	'-webkit-slider-runnable-track',
	'-webkit-slider-thumb',
	'-webkit-textfield-decoration-container',
	'-webkit-validation-bubble',
	'-webkit-validation-bubble-arrow',
	'-webkit-validation-bubble-arrow-clipper',
	'-webkit-validation-bubble-heading',
	'-webkit-validation-bubble-message',
	'-webkit-validation-bubble-text-block'
]);

export const pseudoElements = uniteSets(
	levelOneAndTwoPseudoElements,
	vendorSpecificPseudoElements,
	shadowTreePseudoElements,
	[
		'backdrop',
		'content',
		'cue',
		'file-selector-button',
		'grammar-error',
		'highlight',
		'marker',
		'placeholder',
		'selection',
		'shadow',
		'slotted',
		'spelling-error',
		'target-text',
		'view-transition',
		'view-transition-group',
		'view-transition-image-pair',
		'view-transition-new',
		'view-transition-old'
	]
);

export const aNPlusBNotationPseudoClasses = new Set([
	'nth-column',
	'nth-last-column',
	'nth-last-of-type',
	'nth-of-type'
]);

export const aNPlusBOfSNotationPseudoClasses = new Set(['nth-child', 'nth-last-child']);

export const atRulePagePseudoClasses = new Set(['first', 'right', 'left', 'blank']);

export const linguisticPseudoClasses = new Set(['dir', 'lang']);

export const logicalCombinationsPseudoClasses = new Set(['has', 'is', 'matches', 'not', 'where']);

const vendorSpecificPseudoClasses = new Set([
	'-khtml-drag',
	'-moz-any',
	'-moz-any-link',
	'-moz-broken',
	'-moz-drag-over',
	'-moz-first-node',
	'-moz-focusring',
	'-moz-full-screen',
	'-moz-full-screen-ancestor',
	'-moz-last-node',
	'-moz-loading',
	'-moz-meter-optimum',
	'-moz-meter-sub-optimum',
	'-moz-meter-sub-sub-optimum',
	'-moz-placeholder',
	'-moz-submit-invalid',
	'-moz-suppressed',
	'-moz-ui-invalid',
	'-moz-ui-valid',
	'-moz-user-disabled',
	'-moz-window-inactive',
	'-ms-fullscreen',
	'-ms-input-placeholder',
	'-webkit-drag',
	'-webkit-any',
	'-webkit-any-link',
	'-webkit-autofill',
	'-webkit-full-screen',
	'-webkit-full-screen-ancestor'
]);

// https://webkit.org/blog/363/styling-scrollbars/
export const webkitScrollbarPseudoClasses = new Set([
	'horizontal',
	'vertical',
	'decrement',
	'increment',
	'start',
	'end',
	'double-button',
	'single-button',
	'no-button',
	'corner-present',
	'window-inactive'
]);

export const pseudoClasses = uniteSets(
	aNPlusBNotationPseudoClasses,
	linguisticPseudoClasses,
	logicalCombinationsPseudoClasses,
	aNPlusBOfSNotationPseudoClasses,
	vendorSpecificPseudoClasses,
	[
		'active',
		'any-link',
		'autofill',
		'blank',
		'checked',
		'current',
		'default',
		'defined',
		'disabled',
		'empty',
		'enabled',
		'first-child',
		'first-of-type',
		'focus',
		'focus-within',
		'focus-visible',
		'fullscreen',
		'fullscreen-ancestor',
		'future',
		'host',
		'host-context',
		'hover',
		'indeterminate',
		'in-range',
		'invalid',
		'last-child',
		'last-of-type',
		'link',
		'modal',
		'only-child',
		'only-of-type',
		'optional',
		'out-of-range',
		'past',
		'placeholder-shown',
		'playing',
		'picture-in-picture',
		'paused',
		'read-only',
		'read-write',
		'required',
		'root',
		'scope',
		'state',
		'target',
		'unresolved',
		'user-invalid',
		'user-valid',
		'valid',
		'visited',
		'window-inactive' // for ::selection (chrome)
	]
);
