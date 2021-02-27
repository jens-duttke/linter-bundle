/* eslint-disable @typescript-eslint/no-unused-vars */

namespace NodeJS {
	interface Global {
		linterBundleSettings?: {
			overrides?: {
				general?: {
					'no-restricted-globals'?: {
						additionalRestictions?: string[];
					};
					'no-restricted-properties'?: {
						additionalRestictions?: string[];
					};
					'no-restricted-syntax'?: {
						additionalRestictions?: string[];
					};
					'import/order'?: {
						additionalExternalPatterns?: string[];
					};
				};
				react?: {
					'react/forbid-component-props'?: {
						allowClassNameFor?: string[];
						allowStyleFor?: string[];
					};
				};
			};
			patternPrefix?: string;
		};
	}
}
