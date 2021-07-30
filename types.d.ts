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
