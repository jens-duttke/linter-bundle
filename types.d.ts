/**
 *
 * As of TypeScript 4.3.5, assigning a property to `globalThis` is less intuitive.
 *
 * There are two ways, which all require to disable TSC-error reporting and a couple of linter warning.
 *
 * If the way below doesn't work anymore, this is an alternative:
 * export declare global {
 *
 * @see https://stackoverflow.com/a/68452689/4449804
 */

// @ts-expect-error -- False-positive
declare namespace globalThis {
	// eslint-disable-next-line no-inner-declarations, vars-on-top, no-var -- False-positives
	var linterBundleSettings: {
		readonly overrides?: {
			readonly general?: {
				readonly 'no-restricted-globals'?: {
					readonly additionalRestictions?: string[];
				};
				readonly 'no-restricted-properties'?: {
					readonly additionalRestictions?: string[];
				};
				readonly 'no-restricted-syntax'?: {
					readonly additionalRestictions?: string[];
				};
				readonly 'import/order'?: {
					readonly additionalExternalPatterns?: string[];
				};
			};
			readonly react?: {
				readonly 'react/forbid-component-props'?: {
					readonly allowClassNameFor?: string[];
					readonly allowStyleFor?: string[];
				};
			};
		};
		readonly patternPrefix?: string;
	} | undefined;
}
