/**
 * @file Global ESLint settings
 */

import fs from 'node:fs';
import path from 'node:path';

import stylisticPlugin from '@stylistic/eslint-plugin';
// @ts-expect-error -- There are no type definitions for this plugin
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import functionalPlugin from 'eslint-plugin-functional';
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error -- There are no type definitions for this plugin
import jsxA11YPlugin from 'eslint-plugin-jsx-a11y';
// @ts-expect-error -- There are no type definitions for this plugin
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';
import * as typescriptEslint from 'typescript-eslint';

import * as ensureType from '../helper/ensure-type.mjs';
import { linterBundleConfig } from '../helper/linter-bundle-config.js';

import enforceLogicalExpressionParens from './rules/enforce-logical-expression-parens.mjs';
import enforceTernaryParensRule from './rules/enforce-ternary-parens.mjs';
import ensureLucideImportConsistencyRule from './rules/ensure-lucide-import-consistency.mjs';
import noExtraSpacesInGenericsRule from './rules/no-extra-spaces-in-generics.mjs';
import noTernaryReturnRule from './rules/no-ternary-return.mjs';
import noUnnecessaryTypeofRule from './rules/no-unnecessary-typeof.mjs';
import restrictedFilenamesRule from './rules/restricted-filenames.mjs';

export default [
	{
		ignores: [
			'.cache/',
			'.vscode/',
			'.yarn/',
			'coverage/',
			'fixtures/',
			'node_modules/'
		],
		plugins: {
			'eslint-comments': eslintCommentsPlugin,
			'functional': functionalPlugin,
			'import': importPlugin,
			'jsx-a11y': jsxA11YPlugin,
			'promise': promisePlugin,
			'unicorn': unicornPlugin,
			'@stylistic': stylisticPlugin,
			'@typescript-eslint': typescriptEslint.plugin,

			'linter-bundle': {
				rules: {
					'enforce-logical-expression-parens': enforceLogicalExpressionParens,
					'enforce-ternary-parens': enforceTernaryParensRule,
					'ensure-lucide-import-consistency': ensureLucideImportConsistencyRule,
					'no-extra-spaces-in-generics': noExtraSpacesInGenericsRule,
					'no-ternary-return': noTernaryReturnRule,
					'no-unnecessary-typeof': noUnnecessaryTypeofRule,
					'restricted-filenames': restrictedFilenamesRule
				}
			}
		},
		languageOptions: {
			parser: typescriptEslint.parser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				},
				project: [
					// eslint-disable-next-line n/no-process-env -- We need to read the environment variable here, because it may contain the configuration.
					(process.env['TSCONFIG'] ?? './tsconfig.json'),
					'./jsconfig.json'
				].filter((fileName) => {
					const filePath = path.resolve(process.cwd(), fileName);

					return (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile());
				}),
				tsconfigRootDir: process.cwd(),
				warnOnUnsupportedTypeScriptVersion: false
			},
			globals: {
				...globals.browser,
				...globals.node,

				ArrayBuffer: 'readonly',
				FileReaderSync: 'readonly',
				Float32Array: 'readonly',
				Float64Array: 'readonly',
				Int8Array: 'readonly',
				Int16Array: 'readonly',
				Int32Array: 'readonly',
				Map: 'readonly',
				Promise: 'readonly',
				Set: 'readonly',
				Uint8Array: 'readonly',
				Uint16Array: 'readonly',
				Uint32Array: 'readonly'
			}
		},
		linterOptions: {
			reportUnusedDisableDirectives: true,
			reportUnusedInlineConfigs: 'error'
		},
		settings: {
			'import/parsers': {
				'@typescript-eslint/parser': ['.ts', '.tsx']
			},
			'import/resolver': {
				typescript: { alwaysTryTypes: true },
				...(() => {
					const filePath = path.resolve(process.cwd(), 'webpack.config.js');

					if ((fs.existsSync(filePath) && fs.lstatSync(filePath).isFile())) {
						return {
							webpack: { config: filePath }
						};
					}

					return undefined;
				})()
			},
			'react': {
				version: 'detect'
			}
		}
	},
	{
		files: [
			'**/*.js',
			'**/*.ts',
			'**/*.mjs',
			'**/*.mts',
			'**/*.cjs',
			'**/*.cts',
			'**/*.jsx',
			'**/*.tsx'
		],
		rules: {
			/**
			 * ./rules
			 */
			'linter-bundle/enforce-logical-expression-parens': 'error',
			'linter-bundle/enforce-ternary-parens': 'error',
			'linter-bundle/no-extra-spaces-in-generics': 'error',
			'linter-bundle/no-ternary-return': 'error',
			'linter-bundle/no-unnecessary-typeof': 'error',

			/**
			 * eslint
			 * @see https://eslint.org/docs/rules/
			 */
			'accessor-pairs': 'error',
			'array-bracket-newline': ['error', 'consistent'],
			'array-bracket-spacing': 'error',
			'array-callback-return': 'error',
			'array-element-newline': 'off', // Line breaks should be used in such a way that maximum readability is achieved. This cannot be represented by a fixed rule.
			'arrow-body-style': 'error',
			'arrow-parens': 'error',
			'arrow-spacing': 'error',
			'block-scoped-var': 'error',
			'block-spacing': 'error',
			'brace-style': 'off', // Covered by @typescript-eslint/brace-style
			'camelcase': 'off', // Covered by @typescript-eslint/naming-convention
			'capitalized-comments': 'off',
			'class-methods-use-this': 'off', // Covered by @typescript-eslint/class-methods-use-this
			'comma-dangle': 'off', // Covered by @stylistic/comma-dangle
			'comma-spacing': 'off', // Covered by @stylistic/comma-spacing
			'comma-style': 'error',
			'complexity': ['error', { max: 20 }],
			'computed-property-spacing': 'error',
			'consistent-return': 'off', // Handled by TypeScript type annotations
			'consistent-this': 'error',
			'constructor-super': 'error',
			'curly': 'error',
			'default-case-last': 'error',
			'default-case': 'error',
			'default-param-last': 'off', // @todo It should be valid to have optional parameters after default parameters
			'dot-location': ['error', 'property'],
			'dot-notation': 'off', // Covered by @typescript-eslint/dot-notation
			'eol-last': 'error',
			'eqeqeq': 'error',
			'for-direction': 'error',
			'func-call-spacing': 'off', // Covered by @stylistic/func-call-spacing
			'func-name-matching': 'error',
			'func-names': 'error',
			'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
			'function-call-argument-newline': 'off', // @todo Multiple multi-line object arguments are not allowed, so this option is not usable right now
			'function-paren-newline': ['error', 'multiline-arguments'],
			'generator-star-spacing': 'error',
			'getter-return': 'error',
			'grouped-accessor-pairs': 'error',
			'guard-for-in': 'error',
			'id-denylist': 'error',
			'id-length': ['error', { exceptions: ['a', 'b', 'c', 'i', 'j', 'n', 'x', 'y', 'z', '_'] }],
			'id-match': 'error',
			'implicit-arrow-linebreak': 'error',
			'indent': 'off', // Covered by @stylistic/indent
			'init-declarations': 'off', // @todo It should be possible to ignore predefined consts like MAX_RADIX
			'jsx-quotes': 'error',
			'key-spacing': 'off', // Covered by @stylistic/key-spacing
			'keyword-spacing': 'error',
			'linebreak-style': 'error',
			'lines-around-comment': 'off', // Doesn't work with interfaces; sometimes doesn't make sense if the comment is related to the code above it
			'lines-between-class-members': 'off', // @todo Deactivated till we have a JSDoc description for all class members
			'logical-assignment-operators': ['error', 'always'],
			'max-classes-per-file': 'error',
			'max-depth': ['error', { max: 5 }],
			'max-len': ['error', {
				code: 300,
				tabWidth: 4,
				comments: 300,
				ignoreUrls: true
			}],
			'max-lines-per-function': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
			'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: true }],
			'max-nested-callbacks': 'error',
			'max-params': ['error', { max: 5 }],
			'max-statements-per-line': ['error', { max: 3 }],
			'max-statements': ['error', 50, { ignoreTopLevelFunctions: true }],
			'multiline-ternary': 'off', // I would prefer this style: `(a === b ? (\ntrue\n) : {\notherwise: false\n})`, which means line-breaks should be only allowed, if the operand is wrapped into `(`, `{` or `[`.
			'new-cap': ['error', { properties: false }],
			'new-parens': 'error',
			'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
			'no-alert': 'error',
			'no-array-constructor': 'off', // Covered by @typescript-eslint/no-array-constructor
			'no-async-promise-executor': 'error',
			'no-await-in-loop': 'error',
			'no-bitwise': ['error', { allow: ['^', '~', '<<', '>>', '>>>', '|=', '&=', '^=', '<<=', '>>=', '>>>='] }], // Disallow "&" and "|".
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-confusing-arrow': ['error', { allowParens: true }],
			'no-console': 'error',
			'no-const-assign': 'error',
			'no-constant-binary-expression': 'error',
			'no-constant-condition': 'error',
			'no-constructor-return': 'error',
			'no-continue': 'off', // If it makes the code more readable, wer are using `continue`
			'no-control-regex': 'off', // This rule does not make sense to me
			'no-debugger': 'error',
			'no-delete-var': 'error',
			'no-div-regex': 'error',
			'no-dupe-args': 'error',
			'no-dupe-class-members': 'off', // Covered by @typescript-eslint/no-dupe-class-members
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-duplicate-imports': 'off', // Covered by import/no-duplicates (see https://github.com/typescript-eslint/typescript-eslint/issues/2315)
			'no-else-return': 'error',
			'no-empty-character-class': 'error',
			'no-empty-function': 'off', // Covered by @typescript-eslint/no-empty-function
			'no-empty-pattern': 'error',
			'no-empty-static-block': 'error',
			'no-empty': 'error',
			'no-eq-null': 'error',
			'no-eval': 'error',
			'no-ex-assign': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-boolean-cast': 'error',
			'no-extra-label': 'error',
			'no-extra-parens': 'off', // Covered by @typescript-eslint/no-extra-parens
			'no-extra-semi': 'off', // Covered by @stylistic/no-extra-semi
			'no-fallthrough': ['error', { allowEmptyCase: true }],
			'no-floating-decimal': 'error',
			'no-func-assign': 'error',
			'no-global-assign': 'error',
			'no-implicit-coercion': ['error', { disallowTemplateShorthand: true }],
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-import-assign': 'error',
			'no-inline-comments': 'off',
			'no-inner-declarations': ['error', 'both'],
			'no-invalid-regexp': 'error',
			'no-invalid-this': 'off', // Covered by @typescript-eslint/no-invalid-this
			'no-irregular-whitespace': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-labels': ['error', { allowLoop: true }],
			'no-lone-blocks': 'error',
			'no-lonely-if': 'off', // Covered by unicorn/no-lonely-if
			'no-loop-func': 'off', // Covered by @typescript-eslint/no-loop-func
			'no-loss-of-precision': 'error',
			'no-magic-numbers': 'off', // Covered by @typescript-eslint/no-magic-numbers
			'no-misleading-character-class': 'error',
			'no-mixed-operators': 'error',
			'no-mixed-spaces-and-tabs': 'error',
			'no-multi-assign': 'error',
			'no-multi-spaces': 'error',
			'no-multi-str': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
			'no-negated-condition': 'off',
			'no-nested-ternary': 'error',
			'no-new-func': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-new-wrappers': 'error',
			'no-new': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-obj-calls': 'error',
			'no-object-constructor': 'error',
			'no-octal-escape': 'error',
			'no-octal': 'error',
			'no-param-reassign': 'off', // Parameter reassignment used wisely makes the code more readable
			'no-plusplus': 'off',
			'no-promise-executor-return': 'error',
			'no-proto': 'error',
			'no-prototype-builtins': 'error',
			'no-redeclare': 'off', // Covered by @typescript-eslint/no-redeclare
			'no-regex-spaces': 'error',
			'no-restricted-exports': 'error',
			'no-restricted-globals': [
				'error',
				{
					name: 'isNaN',
					message: 'Use Number.isNaN() instead, and ensure that the input value is of type number. isNaN(undefined) !== Number.isNaN(undefined)'
				},
				...ensureType.array(linterBundleConfig.ts?.overrides?.general?.['no-restricted-globals']?.additionalRestrictions)
			],
			'no-restricted-imports': 'off', // Covered by @typescript-eslint/no-restricted-imports
			'no-restricted-properties': [
				'error',
				...ensureType.array(linterBundleConfig.ts?.overrides?.general?.['no-restricted-properties']?.additionalRestrictions)
			],
			'no-restricted-syntax': [
				'error',
				...ensureType.array(linterBundleConfig.ts?.overrides?.general?.['no-restricted-syntax']?.additionalRestrictions)
			],
			'no-return-assign': 'error',
			'no-script-url': 'error',
			'no-self-assign': 'error',
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-setter-return': 'error',
			'no-shadow-restricted-names': 'error',
			'no-shadow': 'off', // Covered by @typescript-eslint/no-shadow
			'no-sparse-arrays': 'error',
			'no-tabs': ['error', { allowIndentationTabs: true }],
			'no-template-curly-in-string': 'error',
			'no-ternary': 'off',
			'no-this-before-super': 'error',
			'no-throw-literal': 'off', // Covered by @typescript-eslint/no-throw-literal
			'no-trailing-spaces': 'error',
			'no-unassigned-vars': 'error',
			'no-undef-init': 'error',
			'no-undef': 'off', // Covered by TypeScript
			'no-undefined': 'off', // @todo "Using the void operator to generate the value of undefined if necessary." should be disableable
			'no-underscore-dangle': ['error', { allow: ['__DEV__'], allowAfterThis: true }],
			'no-unexpected-multiline': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unneeded-ternary': 'error',
			'no-unreachable-loop': 'error',
			'no-unreachable': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-unsafe-optional-chaining': 'error',
			'no-unused-expressions': 'off', // Covered by @typescript-eslint/no-unused-expressions
			'no-unused-labels': 'error',
			'no-unused-private-class-members': 'error',
			'no-unused-vars': 'off', // Covered by @typescript-eslint/no-unused-vars
			'no-use-before-define': 'off', // Covered by @typescript-eslint/no-use-before-define
			'no-useless-assignment': 'error',
			'no-useless-backreference': 'error',
			'no-useless-call': 'off', // @todo Produces into false-positives for CharsetConverter → `internalMap.encoder.call(encoding, str.toLowerCase())`
			'no-useless-catch': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-constructor': 'off', // Covered by @typescript-eslint/no-useless-constructor
			'no-useless-escape': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'off', // @todo Option to ignore switch-case blocks: In switch-case blocks it makes sense to keep all cases equal, instead of removing the 'return' from the last case, because this could produce bugs in later adjustments.
			'no-var': 'error',
			'no-void': 'off', // This is in conflict with @typescript-eslint/no-floating-promises which expects either `await` or `void`
			'no-warning-comments': 'error',
			'no-whitespace-before-property': 'error',
			'no-with': 'error',
			'nonblock-statement-body-position': 'error',
			'object-curly-newline': 'error',
			'object-curly-spacing': 'off', // Covered by @stylistic/object-curly-spacing
			'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
			'object-shorthand': 'error',
			'one-var-declaration-per-line': 'error',
			'one-var': ['error', { initialized: 'never', uninitialized: 'never' }],
			'operator-assignment': 'error',
			'operator-linebreak': ['error', 'after', { overrides: { ':': 'ignore' } }],
			'padded-blocks': ['error', 'never'],
			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: ['return', 'throw', 'break', 'continue'] },
				{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
				{ blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
				{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
				{ blankLine: 'always', prev: '*', next: 'multiline-block-like' },
				{ blankLine: 'always', prev: 'multiline-block-like', next: '*' },
				{ blankLine: 'always', prev: '*', next: 'directive' },
				{ blankLine: 'always', prev: 'directive', next: '*' }
			],
			'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
			'prefer-const': 'error',
			'prefer-destructuring': 'off', // We don't prefer destructuring if a type is specified ['error', { VariableDeclarator: { array: true, object: true }, AssignmentExpression: { array: false, object: false } }],
			'prefer-exponentiation-operator': 'error',
			'prefer-named-capture-group': 'off', // ES2018+, not supported in most browsers yet
			'prefer-numeric-literals': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': 'off', // Covered by @typescript-eslint/prefer-promise-reject-errors
			'prefer-regex-literals': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			'preserve-caught-error': 'error',
			'quote-props': ['error', 'consistent-as-needed'],
			'quotes': 'off', // Covered by @stylistic/quotes
			'radix': 'error',
			'require-atomic-updates': 'error',
			'require-await': 'off', // Covered by @typescript-eslint/require-await
			'require-unicode-regexp': 'error',
			'require-yield': 'error',
			'rest-spread-spacing': 'error',
			'semi-spacing': 'error',
			'semi-style': 'error',
			'semi': 'off', // Covered by @stylistic/semi
			'sort-imports': 'off', // import/order
			'sort-keys': 'off', // Keys should be grouped by their scope/category, not by their name
			'sort-vars': 'off', // Something like `for (let pos = 4 + addressLength, dataPos = 0; pos < length - 2; pos += 2, dataPos++) {` should be sorted by importance
			'space-before-blocks': 'error',
			'space-before-function-paren': 'off', // Covered by @stylistic/space-before-function-paren
			'space-in-parens': 'error',
			'space-infix-ops': 'off', // Covered by @stylistic/space-infix-ops
			'space-unary-ops': 'error',
			'spaced-comment': ['error', 'always', { markers: ['/'], block: { markers: ['!'], balanced: true } }],
			'strict': 'error',
			'switch-colon-spacing': 'error',
			'symbol-description': 'error',
			'template-curly-spacing': 'error',
			'template-tag-spacing': 'error',
			'unicode-bom': 'error',
			'use-isnan': 'error',
			'valid-typeof': ['error', { requireStringLiterals: true }],
			'vars-on-top': 'error',
			'wrap-iife': 'error',
			'wrap-regex': 'error',
			'yield-star-spacing': ['error', { before: true, after: false }],
			'yoda': 'error',

			/**
			 * stylistic
			 * @see https://eslint.style/rules
			 */
			'@stylistic/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
			'@stylistic/comma-dangle': ['error', { generics: 'ignore' }],
			'@stylistic/comma-spacing': 'error',
			'@stylistic/function-call-spacing': 'error',
			'@stylistic/indent': [
				'error',
				'tab',
				{
					SwitchCase: 1,
					VariableDeclarator: 1,
					MemberExpression: 1,
					flatTernaryExpressions: true,
					ignoredNodes: ['ConditionalExpression']
				}
			],
			'@stylistic/jsx-props-style': 'off', // Experimental feature
			'@stylistic/key-spacing': 'error',
			'@stylistic/member-delimiter-style': ['error', { multiline: { delimiter: 'semi', requireLast: true }, singleline: { delimiter: 'semi', requireLast: true } }],
			'@stylistic/no-extra-semi': 'error',
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
			'@stylistic/semi': 'error',
			'@stylistic/space-before-function-paren': 'error',
			'@stylistic/space-infix-ops': 'error',
			'@stylistic/type-annotation-spacing': 'error',

			/**
			 * typescript-eslint
			 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
			 */
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/array-type': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/ban-ts-comment': ['error', {
				'ts-expect-error': 'allow-with-description'
			}],
			'@typescript-eslint/ban-tslint-comment': 'error',
			'@typescript-eslint/class-literal-property-style': 'error',
			'@typescript-eslint/class-methods-use-this': ['error', { exceptMethods: ['componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'shouldComponentUpdate'], ignoreOverrideMethods: true, ignoreClassesThatImplementAnInterface: true }],
			'@typescript-eslint/consistent-generic-constructors': 'error',
			'@typescript-eslint/consistent-indexed-object-style': 'error',
			'@typescript-eslint/consistent-return': 'error',
			'@typescript-eslint/consistent-type-assertions': 'error',
			'@typescript-eslint/consistent-type-definitions': 'error',
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
			'@typescript-eslint/dot-notation': 'error',
			'@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
			'@typescript-eslint/explicit-member-accessibility': ['error', {
				ignoredMethodNames: [
					'constructor',
					'getDerivedStateFromProps',
					'componentDidMount',
					'shouldComponentUpdate',
					'render',
					'getSnapshotBeforeUpdate',
					'componentDidUpdate',
					'componentWillUnmount',
					'getDerivedStateFromError',
					'componentDidCatch'
				]
			}],
			'@typescript-eslint/explicit-module-boundary-types': ['off', { // @todo There must be an option to specify argument names which shall be ignored (arguments starting with "_", "props")
				allowedNames: [
					'getDerivedStateFromProps',
					'componentDidMount',
					'shouldComponentUpdate',
					'render',
					'getSnapshotBeforeUpdate',
					'componentDidUpdate',
					'componentWillUnmount',
					'getDerivedStateFromError',
					'componentDidCatch'
				]
			}],
			'@typescript-eslint/member-ordering': ['error', {
				default: [
					// Index signature
					'signature',

					// Fields
					'public-static-field',
					'protected-static-field',
					'#private-static-field',
					'private-static-field',

					'public-decorated-field',
					'protected-decorated-field',
					'private-decorated-field',

					'public-instance-field',
					'protected-instance-field',
					'#private-instance-field',
					'private-instance-field',

					'public-abstract-field',
					'protected-abstract-field',

					// Constructors
					'public-constructor',
					'protected-constructor',
					'private-constructor',

					// Methods / Getters / Setters
					'public-decorated-set',
					'public-decorated-get',
					'public-decorated-method',
					'public-instance-set',
					'public-instance-get',
					'public-instance-method',
					'public-static-set',
					'public-static-get',
					'public-static-method',
					'public-abstract-get',
					'public-abstract-set',
					'public-abstract-method',

					'protected-decorated-set',
					'protected-decorated-get',
					'protected-decorated-method',
					'protected-instance-set',
					'protected-instance-get',
					'protected-instance-method',
					'protected-static-set',
					'protected-static-get',
					'protected-static-method',
					'protected-abstract-get',
					'protected-abstract-set',
					'protected-abstract-method',

					'private-decorated-set',
					'private-decorated-get',
					'private-decorated-method',
					'#private-instance-set',
					'#private-instance-get',
					'#private-instance-method',
					'private-instance-set',
					'private-instance-get',
					'private-instance-method',
					'#private-static-set',
					'#private-static-get',
					'#private-static-method',
					'private-static-set',
					'private-static-get',
					'private-static-method'
				]
			}],
			'@typescript-eslint/method-signature-style': ['error', 'property'],
			'@typescript-eslint/naming-convention': [
				'error',

				...ensureType.array(linterBundleConfig.ts?.overrides?.general?.['@typescript-eslint/naming-convention']?.additionalOptions),

				{ selector: 'default', format: ['camelCase'] },

				// Variable
				{ selector: 'variable', format: ['camelCase', 'PascalCase'] }, // @todo PascalCase only for objects
				{
					selector: 'variable',
					filter: '^(is|should|has|can|did|will)[A-Z]',
					types: ['boolean'],
					format: ['camelCase']
				},
				{
					selector: 'variable',
					modifiers: ['const'],
					format: ['camelCase', 'PascalCase', 'UPPER_CASE']
				},
				{
					selector: 'variable',
					types: ['number', 'string', 'array'],
					format: ['camelCase', 'UPPER_CASE']
				},
				{
					selector: 'variable',
					types: ['function'],
					format: ['camelCase', 'PascalCase']
				},

				// Allow constant names starting with "_" if they are unused
				{
					selector: ['variable'],
					filter: '^_',
					modifiers: ['unused'],
					format: null
				},

				// Function
				{ selector: 'function', format: ['camelCase', 'PascalCase'] },

				// Parameter
				{ selector: 'parameter', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },

				// Property
				{ selector: 'property', format: ['camelCase', 'PascalCase'] },
				{
					selector: 'property',
					types: ['number', 'string', 'array'],
					format: ['camelCase', 'PascalCase', 'UPPER_CASE']
				},
				{
					selector: 'property',
					modifiers: ['readonly'],
					format: ['camelCase', 'PascalCase', 'UPPER_CASE']
				},
				{
					selector: 'objectLiteralProperty',
					// `__html` is a property of React's `dangerouslySetInnerHTML` object
					filter: '^__html$',
					types: ['string'],
					format: null
				},
				{
					// Allow properties which only contain digits
					selector: 'objectLiteralProperty',
					filter: String.raw`^\d+$`,
					format: null
				},
				{
					// Allow empty or one-character properties
					selector: 'objectLiteralProperty',
					filter: '^.?$',
					format: null
				},
				{
					// Allow properties which which don't contain an underscore (to prevent usage of "UPPER_CASE") and contain at least 4 characters
					selector: 'objectLiteralProperty',
					filter: '^[^_]{4,}$',
					format: null
				},
				{ selector: 'typeProperty', format: ['camelCase', 'PascalCase'] },
				{
					selector: 'typeProperty',
					types: ['number', 'string', 'array'],
					format: ['camelCase', 'PascalCase', 'UPPER_CASE']
				},
				{
					selector: 'typeProperty',
					modifiers: ['readonly'],
					format: ['camelCase', 'PascalCase', 'UPPER_CASE']
				},

				// Parameter property
				{ selector: 'parameterProperty', format: ['camelCase'] },

				// Method
				{ selector: 'method', format: ['camelCase'] },

				// Accessor
				{ selector: 'accessor', format: ['camelCase'] },

				// Enum member
				{ selector: 'enumMember', format: ['UPPER_CASE'] },

				// Class
				{ selector: 'class', format: ['PascalCase'] },

				// Interface
				{ selector: 'interface', format: ['PascalCase'] },

				// Import
				{ selector: 'import', format: ['camelCase', 'PascalCase'] },

				// Type alias
				{ selector: 'typeAlias', format: ['PascalCase'] },

				// Enum
				{ selector: 'enum', format: ['PascalCase'] },

				// Type parameter
				{ selector: 'typeParameter', format: ['PascalCase'] }
			],
			'@typescript-eslint/no-array-constructor': 'error',
			'@typescript-eslint/no-array-delete': 'error',
			'@typescript-eslint/no-base-to-string': 'error',
			'@typescript-eslint/no-confusing-non-null-assertion': 'error',
			'@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
			'@typescript-eslint/no-dupe-class-members': 'error',
			'@typescript-eslint/no-duplicate-enum-values': 'error',
			'@typescript-eslint/no-duplicate-type-constituents': 'error',
			'@typescript-eslint/no-dynamic-delete': 'error',
			'@typescript-eslint/no-empty-function': 'error',
			'@typescript-eslint/no-empty-interface': 'off',
			'@typescript-eslint/no-empty-object-type': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-extra-non-null-assertion': 'error',
			'@typescript-eslint/no-extra-parens': ['off', 'all', { nestedBinaryExpressions: true, enforceForArrowConditionals: true }], // @todo There should be a option to enforce parens for IIFs + This has to be activated if all other linting errors are resolved
			'@typescript-eslint/no-extraneous-class': 'error',
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-for-in-array': 'error',
			'@typescript-eslint/no-implicit-any-catch': 'off', // Results into false-positive with the TS4.4 option "useUnknownInCatchVariables"
			'@typescript-eslint/no-import-type-side-effects': 'error',
			'@typescript-eslint/no-inferrable-types': 'off', // Sometimes an explicit type helps to understand the code better
			'@typescript-eslint/no-invalid-this': 'error',
			'@typescript-eslint/no-invalid-void-type': ['error', { allowInGenericTypeArguments: true }],
			'@typescript-eslint/no-loop-func': 'error',
			'@typescript-eslint/no-magic-numbers': 'off', // @todo There should be an option that numbers in arrays are ok like `const MaxSizes = [4, 8, 16, 32, 64];`
			/* ['error', {
				ignore: [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 16, 24, 32, 60, 63, 64, 100, 128, 250, 255, 256, 500, 1000, 4_294_967_296],
				ignoreArrayIndexes: true,
				ignoreClassFieldInitialValues: true,
				enforceConst: true,
				detectObjects: true
			}], */
			'@typescript-eslint/no-meaningless-void-operator': 'error',
			'@typescript-eslint/no-misused-new': 'error',
			'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
			'@typescript-eslint/no-mixed-enums': 'error',
			'@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
			'@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
			'@typescript-eslint/no-redundant-type-constituents': 'off', // False positive with Promise<... | never>
			'@typescript-eslint/no-require-imports': 'error',
			'@typescript-eslint/no-restricted-imports': 'error',
			'@typescript-eslint/no-shadow': 'error',
			'@typescript-eslint/no-this-alias': 'error',
			'@typescript-eslint/no-type-alias': ['off', { // @todo There should be an option like 'sub-in-unions-and-intersections', which allows `type A = (string | number)[];`
				allowAliases: 'always',
				allowCallbacks: 'always',
				allowConditionalTypes: 'always',
				allowConstructors: 'always',
				allowLiterals: 'in-unions-and-intersections',
				allowMappedTypes: 'always',
				allowTupleTypes: 'in-unions-and-intersections'
			}],
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
			'@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true, checkTypePredicates: true }],
			'@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
			'@typescript-eslint/no-unnecessary-qualifier': 'error',
			'@typescript-eslint/no-unnecessary-template-expression': 'error',
			'@typescript-eslint/no-unnecessary-type-arguments': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/no-unnecessary-type-constraint': 'error',
			'@typescript-eslint/no-unnecessary-type-conversion': 'error',
			'@typescript-eslint/no-unnecessary-type-parameters': 'error',
			'@typescript-eslint/no-unsafe-argument': 'error',
			'@typescript-eslint/no-unsafe-assignment': 'error',
			'@typescript-eslint/no-unsafe-call': 'error',
			'@typescript-eslint/no-unsafe-declaration-merging': 'error',
			'@typescript-eslint/no-unsafe-enum-comparison': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'@typescript-eslint/no-unsafe-return': 'error',
			'@typescript-eslint/no-unsafe-unary-minus': 'error',
			'@typescript-eslint/no-unused-expressions': 'error',
			'@typescript-eslint/no-unsafe-type-assertion': 'error',
			'@typescript-eslint/no-unused-private-class-members': 'error',
			'@typescript-eslint/no-unused-vars': ['error', {
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				ignoreRestSiblings: true
			}],
			'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
			'@typescript-eslint/no-useless-constructor': 'error',
			'@typescript-eslint/no-useless-default-assignment': 'error',
			'@typescript-eslint/no-useless-empty-export': 'error',
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/non-nullable-type-assertion-style': 'off', // Conflicts with `no-non-null-assertion`, which we prefer
			'@typescript-eslint/only-throw-error': 'error',
			'@typescript-eslint/prefer-as-const': 'error',
			'@typescript-eslint/prefer-enum-initializers': 'off',
			'@typescript-eslint/prefer-find': 'error',
			'@typescript-eslint/prefer-for-of': 'error',
			'@typescript-eslint/prefer-function-type': 'error',
			'@typescript-eslint/prefer-includes': 'error',
			'@typescript-eslint/prefer-literal-enum-member': 'error',
			'@typescript-eslint/prefer-namespace-keyword': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': ['error', { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: true }],
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/prefer-promise-reject-errors': 'error',
			'@typescript-eslint/prefer-readonly': 'error',
			'@typescript-eslint/prefer-readonly-parameter-types': ['off', { ignoreInferredTypes: true }], // @todo An interface should ensure that it's properties are readonly, not every usage of it
			'@typescript-eslint/prefer-reduce-type-parameter': 'error',
			'@typescript-eslint/prefer-regexp-exec': 'error',
			'@typescript-eslint/prefer-return-this-type': 'error',
			'@typescript-eslint/prefer-string-starts-ends-with': 'error',
			'@typescript-eslint/promise-function-async': 'error',
			'@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
			'@typescript-eslint/require-await': 'off', // Sometimes a function is marked as async to have a consistent interface with other functions in a class, even if this specific function does not contain async code (yet)
			'@typescript-eslint/restrict-plus-operands': 'error',
			'@typescript-eslint/restrict-template-expressions': ['off', { // @todo Activate later. Doesn't work well yet, see https://github.com/typescript-eslint/typescript-eslint/issues/1797 or https://github.com/typescript-eslint/typescript-eslint/issues/1660
				allowAny: true,
				allowBoolean: true,
				allowNullish: true,
				allowNumber: true
			}],
			'@typescript-eslint/return-await': 'error',
			'@typescript-eslint/sort-type-constituents': 'off', // Types should be sorted and grouped by priority and their meaning, not alphabetically
			'@typescript-eslint/sort-type-union-intersection-members': 'off', // Types should be sorted and grouped by priority and their meaning, not alphabetically
			'@typescript-eslint/strict-boolean-expressions': ['off', { allowNullable: true, allowSafe: true, ignoreRhs: true }], // @todo Doesn't work for specific code, check later after all linter warnings are fixed, maybe at some positions we can use '??'
			'@typescript-eslint/strict-void-return': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': ['error', { considerDefaultExhaustiveForUnions: true }],
			'@typescript-eslint/triple-slash-reference': 'error',
			'@typescript-eslint/typedef': 'off', // We are using "noImplicitAny" in tsconfig.json instead
			'@typescript-eslint/unbound-method': 'error',
			'@typescript-eslint/unified-signatures': 'error',
			'@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',

			/**
			 * eslint-plugin-functional
			 * @see https://github.com/jonaskello/eslint-plugin-functional#supported-rules
			 */
			'functional/functional-parameters': 'off',
			'functional/immutable-data': 'off', // This rule would require a lot of additional code and workarounds, which would make the result much more illegible // @todo is that resolved in v6.0.0?
			'functional/no-class-inheritance': 'off',
			'functional/no-classes': 'off',
			'functional/no-conditional-statements': 'off',
			'functional/no-expression-statements': ['off', { ignoreVoid: true }], // Creates too much false-positives // @todo is that resolved in v6.0.0?
			'functional/no-let': 'off', // This is better covered by the `prefer-const` rule
			'functional/no-loop-statements': 'off',
			'functional/no-mixed-types': ['error', {
				checkInterfaces: false,
				checkTypeLiterals: true
			}],
			'functional/no-promise-reject': 'off',
			'functional/no-return-void': 'off',
			'functional/no-this-expressions': 'off',
			'functional/no-throw-statements': 'off',
			'functional/no-try-statements': 'off',
			'functional/prefer-immutable-types': 'off',
			'functional/prefer-property-signatures': 'off', // Covered by @typescript-eslint/method-signature-style
			'functional/prefer-tacit': 'off', // @see https://github.com/jonaskello/eslint-plugin-functional/issues/263
			'functional/readonly-type': ['error', 'keyword'],
			'functional/type-declaration-immutability': 'off',

			/**
			 * eslint-plugin-import
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import/default': 'error',
			'import/dynamic-import-chunkname': ['error', {
				webpackChunknameFormat: '([0-9a-zA-Z-_/.+]*(\\[(?:index|request)\\])?)+'
			}],
			'import/export': 'error',
			'import/exports-last': 'off', // Exports should be declared first; helper functions last
			'import/extensions': 'off', // There is no check that it's really an extension or part of the file name. Misinterprets 'JavaDateTime' as extension in 'DateTime.JavaDateTime' for 'DateTime.DOSDateTime.ts'. So, we disable this rule
			'import/first': 'error',
			'import/group-exports': 'off',
			'import/max-dependencies': ['error', { max: 25, ignoreTypeImports: true }],
			'import/named': 'error',
			'import/namespace': ['error', { allowComputed: true }],
			'import/newline-after-import': ['error', { considerComments: false }],
			'import/no-absolute-path': 'error',
			'import/no-amd': 'error',
			'import/no-anonymous-default-export': 'error',
			'import/no-commonjs': 'error',
			'import/no-cycle': 'error',
			'import/no-default-export': 'error',
			'import/no-deprecated': 'error',
			'import/no-duplicates': 'error',
			'import/no-dynamic-require': 'error',
			'import/no-empty-named-blocks': 'error',
			'import/no-extraneous-dependencies': ['error', { includeTypes: true }],
			'import/no-internal-modules': ['off', { // @todo Throws an "Cannot read property 'value' of null" error in src/help/scss/help.scss.d.ts:2 since the update to v2.21.1. If this issue does not get fixed in the next releases, report it!
				allow: [
					'workbox-window/utils/WorkboxEvent'
				]
			}],
			'import/no-import-module-exports': 'off', // Activated only for JavaScript files
			'import/no-mutable-exports': 'error',
			'import/no-named-as-default-member': 'error',
			'import/no-named-as-default': 'error',
			'import/no-named-default': 'error',
			'import/no-named-export': 'off',
			'import/no-namespace': 'off', // @todo Enabling this produces a JavaScript error in the rule; anyhow - could that reduce the package size, because of improved tree-shaking/dead-code-elimination?
			'import/no-nodejs-modules': 'error',
			'import/no-relative-packages': 'error',
			'import/no-relative-parent-imports': 'off', // @todo Disabled because of a bug on Windows, re-enable as soon as it's resolved: https://github.com/import-js/eslint-plugin-import/issues/1644
			'import/no-restricted-paths': 'error',
			'import/no-self-import': 'error',
			'import/no-unassigned-import': ['error', {
				allow: [
					'**/*.css',
					'**/*.scss',
					'jest-extended'
				]
			}],
			'import/no-unresolved': ['error', { caseSensitiveStrict: true }],
			'import/no-unused-modules': ['off', { unusedExports: true }], // Disabled because of false-positive with `export type { ... }` + `import type { ... }`
			'import/no-useless-path-segments': 'error',
			'import/no-webpack-loader-syntax': 'off', // Indeed, you should avoid that, but if we do it, we have a reason for it
			'import/order': ['error', {
				'alphabetize': { order: 'asc', orderImportKind: 'asc', caseInsensitive: true },
				'groups': ['builtin', 'unknown', 'external', 'internal', 'parent', 'sibling', 'index'],
				'newlines-between': 'always',
				'pathGroupsExcludedImportTypes': [],
				'pathGroups': [
					...ensureType.array(linterBundleConfig.ts?.overrides?.general?.['import/order']?.additionalExternalPatterns).map(

						/**
						 * Creates an "external" group using the additional external pattern configuration.
						 * @param {string} pattern - A given pattern
						 * @returns {{ pattern: string; group: 'external'; }} An "external" path configuration object
						 */
						(pattern) => ({ pattern, group: 'external' })
					),
					{ pattern: '@*', group: 'internal' },
					{ pattern: '@*/**', group: 'internal' },
					{ pattern: '*!*/**', group: 'internal', position: 'after' } // Webpack loaders, e.g. 'worker-ref-loader!@app/components/FileFormatIdentificationDialog/TypeDetection.worker'
				],
				'distinctGroup': false
			}],
			'import/prefer-default-export': 'off',
			'import/unambiguous': 'off',

			/**
			 * eslint-plugin-eslint-comments
			 *
			 * @see https://mysticatea.github.io/eslint-plugin-eslint-comments/
			 */
			'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
			'eslint-comments/no-aggregating-enable': 'error',
			'eslint-comments/no-duplicate-disable': 'error',
			'eslint-comments/no-unlimited-disable': 'off', // Covered by `unicorn/no-abusive-eslint-disable`
			'eslint-comments/no-unused-disable': 'error', // @todo What's the benefit over the `reportUnusedDisableDirectives` option?
			'eslint-comments/no-unused-enable': 'error',
			'eslint-comments/no-restricted-disable': 'off',
			'eslint-comments/no-use': 'off',
			'eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],

			/**
			 * eslint-plugin-promise
			 * @see https://github.com/xjamundx/eslint-plugin-promise
			 */
			'promise/always-return': 'off', // If the result of an `.then()` is not used, there is no need to return something.
			'promise/avoid-new': 'off',
			'promise/catch-or-return': 'error',
			'promise/no-callback-in-promise': 'off',
			'promise/no-multiple-resolved': 'error',
			'promise/no-native': 'off',
			'promise/no-nesting': 'off',
			'promise/no-new-statics': 'error',
			'promise/no-promise-in-callback': 'off',
			'promise/no-return-in-finally': 'error',
			'promise/no-return-wrap': 'error',
			'promise/param-names': 'off', // @todo Disabled until this issue is fixed: https://github.com/xjamundx/eslint-plugin-promise/issues/206
			'promise/prefer-await-to-callbacks': 'off', // It's not always possible to use avoid callbacks.
			'promise/prefer-await-to-then': 'off', // Depending on the use-case `.then()`/`.catch()` might be easier to understand
			'promise/prefer-catch': 'error',
			'promise/valid-params': 'off', // TypeScript ensures that
			'promise/spec-only': 'error',

			/**
			 * eslint-plugin-unicorn
			 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
			 */
			'unicorn/better-regex': 'error',
			'unicorn/catch-error-name': 'error',
			'unicorn/consistent-assert': 'error',
			'unicorn/consistent-date-clone': 'error',
			'unicorn/consistent-destructuring': 'off', // Depending on the usage, it makes sense to destructure e.g. `props` only partial.
			'unicorn/consistent-empty-array-spread': 'error',
			'unicorn/consistent-existence-index-check': 'error',
			'unicorn/consistent-function-scoping': 'error',
			'unicorn/custom-error-definition': 'off',
			'unicorn/empty-brace-spaces': 'error',
			'unicorn/error-message': 'error',
			'unicorn/escape-case': 'error',
			'unicorn/expiring-todo-comments': 'error',
			'unicorn/explicit-length-check': 'error',
			'unicorn/filename-case': ['off', { // Disabled in favour of the linter-bundle `files` task
				cases: {
					camelCase: true,
					pascalCase: true
				},
				ignore: [
					/([A-Za-z0-9]?[a-z0-9]+)*[A-Z]{2,4}([A-Za-z0-9]?[a-z0-9]+)*/u // Up to 4 Characters can be upper-case in a row (e.g. in `prepareDOM` or `SVGIcon`)
				]
			}],
			'unicorn/import-style': ['error', {
				styles: {
					'lucide-react': {
						unassigned: false,
						default: false,
						namespace: false,
						named: true
					},
					'react': {
						unassigned: false,
						default: false,
						namespace: true,
						named: false
					},
					'./styles.module.css': {
						unassigned: false,
						default: false,
						namespace: true,
						named: false
					},
					'./styles.module.scss': {
						unassigned: false,
						default: false,
						namespace: true,
						named: false
					}
				}
			}],
			'unicorn/isolated-functions': 'error',
			'unicorn/new-for-builtins': 'error',
			'unicorn/no-abusive-eslint-disable': 'error',
			'unicorn/no-accessor-recursion': 'error',
			'unicorn/no-array-callback-reference': 'off', // If I use functions, they are the best option for this use-case
			'unicorn/no-array-for-each': 'error',
			'unicorn/no-array-method-this-argument': 'error',
			'unicorn/no-array-reduce': ['error', { allowSimpleOperations: true }],
			'unicorn/no-array-reverse': 'error',
			'unicorn/no-array-sort': 'error',
			'unicorn/no-await-expression-member': 'error',
			'unicorn/no-console-spaces': 'error',
			'unicorn/no-document-cookie': 'error',
			'unicorn/no-empty-file': 'error',
			'unicorn/no-for-loop': 'off', // @typescript-eslint/prefer-for-of
			'unicorn/no-hex-escape': 'error',
			'unicorn/no-immediate-mutation': 'error',
			'unicorn/no-instanceof-builtins': 'error',
			'unicorn/no-invalid-fetch-options': 'error',
			'unicorn/no-invalid-remove-event-listener': 'error',
			'unicorn/no-keyword-prefix': 'off',
			'unicorn/no-lonely-if': 'off', // Sometimes the code is clearer if-conditions are not combined
			'unicorn/no-magic-array-flat-depth': 'error',
			'unicorn/no-named-default': 'error',
			'unicorn/no-negated-condition': 'off',
			'unicorn/no-negation-in-equality-check': 'error',
			'unicorn/no-nested-ternary': 'off', // We prefer no-nested-ternary of ESlint
			'unicorn/no-new-array': 'off', // `new Array(length)` should be preferred over `Array.from({ length })` because it's much faster. @see https://jsben.ch/qTpYp
			'unicorn/no-new-buffer': 'error',
			'unicorn/no-null': 'off', // @todo Too much old native JavaScript functions are based on `null`. Maybe we can replace them later.
			'unicorn/no-object-as-default-parameter': 'error',
			'unicorn/no-process-exit': 'error',
			'unicorn/no-static-only-class': 'error',
			'unicorn/no-thenable': 'error',
			'unicorn/no-this-assignment': 'error',
			'unicorn/no-typeof-undefined': 'error',
			'unicorn/no-unnecessary-array-flat-depth': 'error',
			'unicorn/no-unnecessary-array-splice-count': 'error',
			'unicorn/no-unnecessary-await': 'error',
			'unicorn/no-unnecessary-polyfills': 'error',
			'unicorn/no-unnecessary-slice-end': 'error',
			'unicorn/no-unreadable-array-destructuring': 'error',
			'unicorn/no-unreadable-iife': 'error',
			'unicorn/no-unused-properties': 'error',
			'unicorn/no-useless-collection-argument': 'error',
			'unicorn/no-useless-error-capture-stack-trace': 'error',
			'unicorn/no-useless-fallback-in-spread': 'error',
			'unicorn/no-useless-promise-resolve-reject': 'error',
			'unicorn/no-useless-length-check': 'error',
			'unicorn/no-useless-spread': 'error',
			'unicorn/no-useless-switch-case': 'error',
			'unicorn/no-useless-undefined': 'off', // This rule conflicts with `@typescript-eslint/consistent-return`, which is preferred, as `return undefined` makes sense for a function which has the return type `undefined`.
			'unicorn/no-zero-fractions': 'error',
			'unicorn/number-literal-case': 'error',
			'unicorn/numeric-separators-style': 'error',
			'unicorn/prefer-add-event-listener': 'error',
			'unicorn/prefer-array-find': 'error',
			'unicorn/prefer-array-flat': 'error',
			'unicorn/prefer-array-flat-map': 'error',
			'unicorn/prefer-array-index-of': 'error',
			'unicorn/prefer-array-some': 'error',
			'unicorn/prefer-at': 'off', // @todo Disabled for now, since `at` is not supported by TypeScript type definitions yet.
			'unicorn/prefer-blob-reading-methods': 'off', // @todo Disabled for now, since it's only supported in Safari 14+. Activate in 2025
			'unicorn/prefer-bigint-literals': 'error',
			'unicorn/prefer-class-fields': 'error',
			'unicorn/prefer-classlist-toggle': 'error',
			'unicorn/prefer-code-point': 'error',
			'unicorn/prefer-date-now': 'error',
			'unicorn/prefer-default-parameters': 'error',
			'unicorn/prefer-dom-node-append': 'error',
			'unicorn/prefer-dom-node-dataset': 'off', // `setAttribute` is faster than `dataset`. See https://www.measurethat.net/Benchmarks/Show/7740/0/classname-vs-setattribute-vs-classlist-vs-dataset
			'unicorn/prefer-dom-node-remove': 'error',
			'unicorn/prefer-dom-node-text-content': 'error',
			'unicorn/prefer-event-target': 'error',
			'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],
			'unicorn/prefer-global-this': 'off', // This makes only sense if the same code may run on the server-side. Often the auto-fixing of this rule doesn't make sense
			'unicorn/prefer-import-meta-properties': 'off', // @todo Regarding `n/no-unsupported-features/node-builtins` it's still an experimental feature, so check back in 2026
			'unicorn/prefer-includes': 'error',
			'unicorn/prefer-json-parse-buffer': 'off', // TypeScript states that string needs to be used as of the ES specification. @see https://github.com/microsoft/TypeScript/issues/11842
			'unicorn/prefer-keyboard-event-key': 'error',
			'unicorn/prefer-logical-operator-over-ternary': 'error',
			'unicorn/prefer-math-min-max': 'error',
			'unicorn/prefer-math-trunc': 'error',
			'unicorn/prefer-modern-dom-apis': 'error',
			'unicorn/prefer-modern-math-apis': 'error',
			'unicorn/prefer-module': 'off',
			'unicorn/prefer-native-coercion-functions': 'off',
			'unicorn/prefer-negative-index': 'error',
			'unicorn/prefer-number-properties': 'error',
			'unicorn/prefer-object-from-entries': 'error',
			'unicorn/prefer-optional-catch-binding': 'error',
			'unicorn/prefer-prototype-methods': 'error',
			'unicorn/prefer-query-selector': 'off', // document.getElementById() is much faster
			'unicorn/prefer-reflect-apply': 'error',
			'unicorn/prefer-response-static-json': 'error',
			'unicorn/prefer-set-has': 'error',
			'unicorn/prefer-set-size': 'error',
			'unicorn/prefer-single-call': 'error',
			'unicorn/prefer-spread': 'off', // @todo Disabled till there a solution for the warning, that `slice()` on Typed-Arrays should be replaced (which is not possible). @see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1064
			'unicorn/prefer-string-raw': 'off', // The overhead of writing String.raw`...` is not worth the inconsistency in writing strings
			'unicorn/prefer-string-replace-all': 'off', // @todo Available since 2020 in browsers. Should this be preferred?
			'unicorn/prefer-string-slice': 'off', // @todo As of today (2020.08.24) and since the last 9 years, substr() is three times faster than slice() in Firefox.
			'unicorn/prefer-string-starts-ends-with': 'error',
			'unicorn/prefer-string-trim-start-end': 'error',
			'unicorn/prefer-structured-clone': 'error',
			'unicorn/prefer-switch': 'error',
			'unicorn/prefer-ternary': 'off', // We prefer readability over saving a few chars
			'unicorn/prefer-top-level-await': 'error',
			'unicorn/prefer-regexp-test': 'error',
			'unicorn/prefer-type-error': 'error',
			'unicorn/prevent-abbreviations': ['error', { ignore: ['args', 'i', 'j', 'i18n', /[Rr]ef/u, /[Pp]arams/u, /[Pp]rops/u] }],
			'unicorn/relative-url-style': 'error',
			'unicorn/require-array-join-separator': 'error',
			'unicorn/require-module-attributes': 'error',
			'unicorn/require-module-specifiers': 'error',
			'unicorn/require-number-to-fixed-digits-argument': 'error',
			'unicorn/require-post-message-target-origin': 'off', // False-positive with Workers which don't support a `targetOrigin`
			'unicorn/string-content': 'off', // Breaks code (e.g. imports with `...` in Next.js or GraphQL template strings),
			'unicorn/switch-case-braces': ['error', 'avoid'],
			'unicorn/template-indent': 'error',
			'unicorn/text-encoding-identifier-case': 'off',
			'unicorn/throw-new-error': 'error'
		}
	},
	{
		files: [
			'.linter-bundle.js',
			'*.config.js',
			'*.config.mjs'
		],
		rules: {
			// The configuration files needs to have default exports.
			'import/no-default-export': 'off',
			'import/no-anonymous-default-export': 'off'
		}
	}
];
