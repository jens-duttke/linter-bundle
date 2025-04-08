/**
 * @file Configuration used for linting the linter-bundle.
 */

import gatsbyConfig from './eslint/gatsby.mjs';
import javascriptLazyConfig from './eslint/javascript-lazy.mjs';
import javascriptConfig from './eslint/javascript.mjs';
import jestConfig from './eslint/jest.mjs';
import jsdocConfig from './eslint/jsdoc.mjs';
import reactConfig from './eslint/react.mjs';
import storybookConfig from './eslint/storybook.mjs';
import typeDeclarationsConfig from './eslint/type-declarations.mjs';
import workerConfig from './eslint/worker.mjs';
import eslintConfig from './eslint.mjs';

export default [
	...eslintConfig,
	...gatsbyConfig,
	...javascriptConfig,
	...javascriptLazyConfig,
	...jestConfig,
	...jsdocConfig,
	...reactConfig,
	...storybookConfig,
	...typeDeclarationsConfig,
	...workerConfig,
	{
		// We want to keep as much of the original code as possible
		files: [
			'stylelint/plugins/**/*.mjs',
			'stylelint/plugins/**/*.js'
		],
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/consistent-return': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			'@typescript-eslint/no-confusing-void-expression': 'off',
			'@typescript-eslint/no-loop-func': 'off',
			'@typescript-eslint/no-shadow': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/prefer-optional-chain': 'off',
			'@typescript-eslint/switch-exhaustiveness-check': 'off',
			'@typescript-eslint/unbound-method': 'off',
			'complexity': 'off',
			'default-case': 'off',
			'eqeqeq': 'off',
			'func-names': 'off',
			'id-length': 'off',
			'import/no-anonymous-default-export': 'off',
			'import/no-default-export': 'off',
			'import/no-extraneous-dependencies': 'off',
			'jsdoc/informative-docs': 'off',
			'jsdoc/lines-before-block': 'off',
			'jsdoc/match-description': 'off',
			'jsdoc/require-description': 'off',
			'jsdoc/require-file-overview': 'off',
			'jsdoc/require-jsdoc': 'off',
			'jsdoc/require-param-description': 'off',
			'jsdoc/require-param-type': 'off',
			'jsdoc/require-returns-description': 'off',
			'jsdoc/require-returns': 'off',
			'jsdoc/require-throws': 'off',
			'linter-bundle/enforce-logical-expression-parens': 'off',
			'linter-bundle/enforce-ternary-parens': 'off',
			'linter-bundle/no-ternary-return': 'off',
			'logical-assignment-operators': 'off',
			'n/callback-return': 'off',
			'n/no-extraneous-import': 'off',
			'no-eq-null': 'off',
			'no-nested-ternary': 'off',
			'no-underscore-dangle': 'off',
			'no-useless-assignment': 'off',
			'padding-line-between-statements': 'off',
			'prefer-template': 'off',
			'unicorn/consistent-existence-index-check': 'off',
			'unicorn/consistent-function-scoping': 'off',
			'unicorn/explicit-length-check': 'off',
			'unicorn/no-unreadable-array-destructuring': 'off',
			'unicorn/prefer-logical-operator-over-ternary': 'off',
			'unicorn/prefer-math-min-max': 'off',
			'unicorn/prevent-abbreviations': 'off'
		}
	},
	{
		files: [
			'eslint.mjs',
			'eslint/*.mjs',
			'eslint/rules/*.mjs',
			'stylelint.mjs',
			'stylelint/index.mjs',
			'stylelint/plugins/*.js'
		],
		rules: {
			// The configuration files needs to have default exports
			'import/no-default-export': 'off',
			'import/no-anonymous-default-export': 'off',

			// Configuration files can become very large
			'max-lines': 'off',

			// As we are using a lot of separate plugins, the number of dependencies can exceed
			'import/max-dependencies': 'off'
		}
	}
];
