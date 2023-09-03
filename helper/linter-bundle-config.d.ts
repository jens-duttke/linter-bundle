/**
 * @file Type definition of `.linter-bundle.js` configuration.
 */

export interface LinterBundleConfig {
	verbose?: boolean;
	timing?: boolean;
	git?: boolean;
	files?: {
		restrictions: {
			basePath: string;
			allowed?: string[];
			disallowed?: string[];
		}[];
	};
	tsc?: {
		tsconfig?: string;
	};
	ts?: {
		tsconfig?: string;
		include?: string[];
		exclude?: string[];
		overrides?: {
			/* eslint-disable @typescript-eslint/naming-convention -- `overrides` should match the original rule names */
			general?: {
				'no-restricted-globals'?: { additionalRestrictions?: { name: string; message: string; }[]; };
				'no-restricted-properties'?: { additionalRestrictions?: { object: string; property: string; message: string; }[]; };
				'no-restricted-syntax'?: { additionalRestrictions?: { selector: string; message: string; }[]; };
				'import/order'?: { additionalExternalPatterns?: string[]; };
			};
			react?: {
				'react/forbid-component-props'?: { allowClassNameFor?: string[]; allowStyleFor?: string[]; };
			};
			/* eslint-enable @typescript-eslint/naming-convention */
		};
	};
	sass?: {
		patternPrefix?: string;
	};
	audit?: {
		minSeverity?: 'info' | 'low' | 'moderate' | 'high' | 'critical';
		exclude?: string[];
	};
}

export const linterBundleConfig: LinterBundleConfig;
