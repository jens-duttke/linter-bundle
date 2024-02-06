/**
 * @file Type definition of `.linter-bundle.js` configuration.
 */

interface NamingConventionOption {
	// format options
	format: ('camelCase' | 'strictCamelCase' | 'PascalCase' | 'StrictPascalCase' | 'snake_case' | 'UPPER_CASE')[] | null;
	custom?: {
		regex: string;
		match: boolean;
	};
	leadingUnderscore?: 'forbid' | 'require' | 'requireDouble' | 'allow' | 'allowDouble' | 'allowSingleOrDouble';
	trailingUnderscore?: 'forbid' | 'require' | 'requireDouble' | 'allow' | 'allowDouble' | 'allowSingleOrDouble';
	prefix?: string[];
	suffix?: string[];

	// selector options
	selector: string | string[];
	filter?: string | {
		regex: string;
		match: boolean;
	};
	// the allowed values for these are dependent on the selector - see below
	modifiers?: string[];
	types?: string[];
}

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
				'@typescript-eslint/naming-convention'?: { additionalOptions?: NamingConventionOption[]; };
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
