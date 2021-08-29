/**
 * @file Global ESLint settings
 */

/* eslint-disable max-lines -- The rules can be easier managed if they are all in one file */
/* eslint-disable node/no-process-env -- `process.env` is required to inject configuration adjustments */

const fs = require('fs');
const path = require('path');

const ensureType = require('../helper/ensure-type');

module.exports = {
	ignorePatterns: [
		'.cache/',
		'.vscode/',
		'coverage/',
		'node_modules/'
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'eslint-comments',
		'functional',
		'import',
		'jsx-a11y',
		'promise',
		'react-hooks',
		'react',
		'unicorn'
	],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		},
		project: [
			(process.env['TSCONFIG'] ?? './tsconfig.json'),
			'./jsconfig.json'
		].filter((fileName) => {
			const filePath = path.resolve(process.cwd(), fileName);

			return (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile());
		}),
		warnOnUnsupportedTypeScriptVersion: false
	},
	env: {
		browser: true,
		commonjs: true
	},
	globals: {
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

				return;
			})()
		},
		'react': {
			version: 'detect'
		}
	},
	reportUnusedDisableDirectives: true,
	rules: {
		/**
		 * eslint
		 *
		 * @see https://eslint.org/docs/rules/
		 */

		// Possible Errors
		'for-direction': 'error',
		'getter-return': 'error',
		'no-async-promise-executor': 'error',
		'no-await-in-loop': 'error',
		'no-compare-neg-zero': 'error',
		'no-cond-assign': 'error',
		'no-console': 'error',
		'no-constant-condition': 'error',
		'no-control-regex': 'off', // This rule does not make sense to me
		'no-debugger': 'error',
		'no-dupe-args': 'error',
		'no-dupe-else-if': 'error',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-empty': 'error',
		'no-empty-character-class': 'error',
		'no-ex-assign': 'error',
		'no-extra-boolean-cast': 'error',
		'no-extra-parens': 'off', // Covered by @typescript-eslint/no-extra-parens
		'no-extra-semi': 'off', // Covered by @typescript-eslint/no-extra-semi
		'no-func-assign': 'error',
		'no-import-assign': 'error',
		'no-inner-declarations': ['error', 'both'],
		'no-invalid-regexp': 'error',
		'no-irregular-whitespace': 'error',
		'no-misleading-character-class': 'error',
		'no-obj-calls': 'error',
		'no-promise-executor-return': 'error',
		'no-prototype-builtins': 'error',
		'no-regex-spaces': 'error',
		'no-setter-return': 'error',
		'no-sparse-arrays': 'error',
		'no-template-curly-in-string': 'error',
		'no-unexpected-multiline': 'error',
		'no-unreachable': 'error',
		'no-unreachable-loop': 'error',
		'no-unsafe-finally': 'error',
		'no-unsafe-negation': 'error',
		'no-unsafe-optional-chaining': 'error',
		'no-useless-backreference': 'error',
		'require-atomic-updates': 'error',
		'use-isnan': 'error',
		'valid-typeof': ['error', { requireStringLiterals: true }],

		// Best Practices
		'accessor-pairs': 'error',
		'array-callback-return': 'error',
		'block-scoped-var': 'error',
		'class-methods-use-this': ['error', { exceptMethods: ['componentDidMount', 'componentDidUpdate', 'componentWillUnmount', 'shouldComponentUpdate'] }],
		'complexity': ['error', { max: 20 }],
		'consistent-return': 'off', // Handled by TypeScript type annotations
		'curly': 'error',
		'default-case': 'error',
		'default-case-last': 'error',
		'default-param-last': 'off', // @todo It should be valid to have optional parameters after default parameters
		'dot-location': ['error', 'property'],
		'dot-notation': 'off', // Covered by @typescript-eslint/dot-notation
		'eqeqeq': 'error',
		'grouped-accessor-pairs': 'error',
		'guard-for-in': 'error',
		'max-classes-per-file': 'error',
		'no-alert': 'error',
		'no-caller': 'error',
		'no-case-declarations': 'error',
		'no-constructor-return': 'error',
		'no-div-regex': 'error',
		'no-else-return': 'error',
		'no-empty-function': 'off', // Covered by @typescript-eslint/no-empty-function
		'no-empty-pattern': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-fallthrough': 'error',
		'no-floating-decimal': 'error',
		'no-global-assign': 'error',
		'no-implicit-coercion': ['error', { disallowTemplateShorthand: true }],
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-invalid-this': 'off', // Covered by @typescript-eslint/no-invalid-this
		'no-iterator': 'error',
		'no-labels': ['error', { allowLoop: true }],
		'no-lone-blocks': 'error',
		'no-loop-func': 'off', // Covered by @typescript-eslint/no-loop-func
		'no-loss-of-precision': 'off', // Covered by @typescript-eslint/no-loss-of-precision
		'no-magic-numbers': 'off', // Covered by @typescript-eslint/no-magic-numbers
		'no-multi-spaces': 'error',
		'no-multi-str': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-nonoctal-decimal-escape': 'error',
		'no-octal': 'error',
		'no-octal-escape': 'error',
		'no-param-reassign': 'off', // Parameter reassignment used wisely makes the code more readable
		'no-proto': 'error',
		'no-redeclare': 'off', // Covered by @typescript-eslint/no-redeclare
		'no-return-assign': 'error',
		'no-return-await': 'off', // Covered by @typescript-eslint/return-await
		'no-script-url': 'error',
		'no-self-assign': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'off', // Covered by @typescript-eslint/no-throw-literal
		'no-unmodified-loop-condition': 'error',
		'no-unused-expressions': 'off', // Covered by @typescript-eslint/no-unused-expressions
		'no-unused-labels': 'error',
		'no-useless-call': 'off', // @todo Produces into false-positives for CharsetConverter → `internalMap.encoder.call(encoding, str.toLowerCase())`
		'no-useless-catch': 'error',
		'no-useless-concat': 'error',
		'no-useless-escape': 'error',
		'no-useless-return': 'off', // @todo Option to ignore switch-case blocks: In switch-case blocks it makes sense to keep all cases equal, instead of removing the 'return' from the last case, because this could produce bugs in later adjustments.
		'no-void': 'off', // This is in conflict with @typescript-eslint/no-floating-promises which expects either `await` or `void`
		'no-warning-comments': 'error',
		'no-with': 'error',
		'prefer-named-capture-group': 'off', // ES2018+, not supported in most browsers yet
		'prefer-promise-reject-errors': 'error',
		'prefer-regex-literals': 'error',
		'radix': 'error',
		'require-await': 'off', // Covered by @typescript-eslint/require-await
		'require-unicode-regexp': 'error',
		'vars-on-top': 'error',
		'wrap-iife': 'error',
		'yoda': 'error',

		// Strict Mode
		'strict': 'error',

		// Variables
		'init-declarations': 'off', // @todo It should be possible to ignore predefined consts like MAX_RADIX
		'no-delete-var': 'error',
		'no-label-var': 'error',
		'no-restricted-globals': [
			'error',
			{
				name: 'isNaN',
				message: 'Use Number.isNaN() instead, and ensure that the input value is of type number. isNaN(undefined) !== Number.isNaN(undefined)'
			},
			...ensureType.array(global.linterBundleSettings?.overrides?.general?.['no-restricted-globals']?.additionalRestictions)
		],
		'no-restricted-properties': [
			'error',
			...ensureType.array(global.linterBundleSettings?.overrides?.general?.['no-restricted-properties']?.additionalRestictions)
		],
		'no-restricted-syntax': [
			'error',
			...ensureType.array(global.linterBundleSettings?.overrides?.general?.['no-restricted-syntax']?.additionalRestictions)
		],
		'no-shadow': 'off', // Covered by @typescript-eslint/no-shadow
		'no-shadow-restricted-names': 'error',
		'no-undef': 'off', // Covered by TypeScript
		'no-undef-init': 'error',
		'no-undefined': 'off', // @todo "Using the void operator to generate the value of undefined if necessary." should be disableable
		'no-unused-vars': 'off', // Covered by @typescript-eslint/no-unused-vars
		'no-use-before-define': 'off', // Covered by @typescript-eslint/no-use-before-define

		// Stylistic Issues
		'array-bracket-newline': ['error', 'consistent'],
		'array-bracket-spacing': 'error',
		'array-element-newline': 'off', // Line breaks should be used in such a way that maximum readability is achieved. This cannot be represented by a fixed rule.
		'block-spacing': 'error',
		'brace-style': 'off', // Covered by @typescript-eslint/brace-style
		'camelcase': 'off', // Covered by @typescript-eslint/naming-convention
		'capitalized-comments': 'off',
		'comma-dangle': 'off', // Covered by @typescript-eslint/comma-dangle
		'comma-spacing': 'off', // Covered by @typescript-eslint/comma-spacing
		'comma-style': 'error',
		'computed-property-spacing': 'error',
		'consistent-this': 'error',
		'eol-last': 'error',
		'func-call-spacing': 'off', // Covered by @typescript-eslint/func-call-spacing
		'func-name-matching': 'error',
		'func-names': 'error',
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
		'function-call-argument-newline': 'off', // @todo Multiple multi-line object arguments are not allowed, so this option is not usable right now
		'function-paren-newline': ['error', 'multiline-arguments'],
		'id-denylist': 'error',
		'id-length': ['error', { exceptions: ['a', 'b', 'i', 'j', 'n', 'x', 'y', 'z'] }],
		'id-match': 'error',
		'implicit-arrow-linebreak': 'error',
		'indent': 'off', // Covered by @typescript-eslint/indent
		'jsx-quotes': 'error',
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'line-comment-position': 'off',
		'linebreak-style': 'error',
		'lines-around-comment': 'off', // Doesn't work with interfaces; sometimes doesn't make sense if the comment is related to the code above it
		'lines-between-class-members': 'off', // @todo Deactivated till we have a JSDoc description for all class members
		'max-depth': ['error', { max: 5 }],
		'max-len': ['error', {
			code: 300,
			tabWidth: 4,
			comments: 300,
			ignoreUrls: true
		}],
		'max-lines': ['error', { max: 500, skipBlankLines: true, skipComments: true }],
		'max-lines-per-function': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
		'max-nested-callbacks': 'error',
		'max-params': ['error', { max: 5 }],
		'max-statements': ['error', 50, { ignoreTopLevelFunctions: true }],
		'max-statements-per-line': ['error', { max: 3 }],
		'multiline-comment-style': 'off', // Comment style must be decided from case to case
		'multiline-ternary': 'off', // I would prefer this style: `(a === b ? (\ntrue\n) : {\notherwise: false\n})`, which means line-breaks should be only allowed, if the operand is wrapped into `(`, `{` or `[`.
		'new-cap': ['error', { properties: false }],
		'new-parens': 'error',
		'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
		'no-array-constructor': 'off', // Covered by @typescript-eslint/no-array-constructor
		'no-bitwise': ['error', { allow: ['^', '~', '<<', '>>', '>>>', '|=', '&=', '^=', '<<=', '>>=', '>>>='] }], // Disallow "&" and "|".
		'no-continue': 'off', // If it makes the code more readable, wer are using `continue`
		'no-inline-comments': 'off',
		'no-lonely-if': 'off', // Covered by unicorn/no-lonely-if
		'no-mixed-operators': 'error',
		'no-mixed-spaces-and-tabs': 'error',
		'no-multi-assign': 'error',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		'no-negated-condition': 'off',
		'no-nested-ternary': 'error',
		'no-new-object': 'error',
		'no-plusplus': 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-ternary': 'off',
		'no-trailing-spaces': 'error',
		'no-underscore-dangle': ['error', { allow: ['__DEV__'], allowAfterThis: true }],
		'no-unneeded-ternary': 'error',
		'no-whitespace-before-property': 'error',
		'nonblock-statement-body-position': 'error',
		'object-curly-newline': 'error',
		'object-curly-spacing': 'off', // Covered by @typescript-eslint/object-curly-spacing
		'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
		'one-var': ['error', { initialized: 'never', uninitialized: 'never' }],
		'one-var-declaration-per-line': 'error',
		'operator-assignment': 'error',
		'operator-linebreak': ['error', 'after', { overrides: { ':': 'ignore' } }],
		'padded-blocks': ['error', 'never'],
		'padding-line-between-statements': 'error',
		'prefer-exponentiation-operator': 'error',
		'prefer-object-spread': 'error',
		'quote-props': ['error', 'consistent-as-needed'],
		'quotes': 'off', // Covered by @typescript-eslint/quotes
		'semi': 'off', // Covered by @typescript-eslint/semi
		'semi-spacing': 'error',
		'semi-style': 'error',
		'sort-keys': 'off', // Keys should be grouped by their scope/category, not by their name
		'sort-vars': 'off', // Something like `for (let pos = 4 + addressLength, dataPos = 0; pos < length - 2; pos += 2, dataPos++) {` should be sorted by importanance
		'space-before-blocks': 'error',
		'space-before-function-paren': 'off', // Covered by @typescript-eslint/space-before-function-paren
		'space-in-parens': 'error',
		'space-infix-ops': 'error',
		'space-unary-ops': 'error',
		'spaced-comment': ['error', 'always', { markers: ['/'], block: { markers: ['!'], balanced: true } }],
		'switch-colon-spacing': 'error',
		'template-tag-spacing': 'error',
		'unicode-bom': 'error',
		'wrap-regex': 'error',

		// ECMAScript 6
		'arrow-body-style': 'error',
		'arrow-parens': 'error',
		'arrow-spacing': 'error',
		'constructor-super': 'error',
		'generator-star-spacing': 'error',
		'no-class-assign': 'error',
		'no-confusing-arrow': ['error', { allowParens: true }],
		'no-const-assign': 'error',
		'no-dupe-class-members': 'off', // Covered by @typescript-eslint/no-no-dupe-class-members
		'no-duplicate-imports': 'off', // Covered by @typescript-eslint/no-duplicate-imports / import/no-duplicates (see https://github.com/typescript-eslint/typescript-eslint/issues/2315)
		'no-new-symbol': 'error',
		'no-restricted-exports': 'error',
		'no-restricted-imports': 'error',
		'no-this-before-super': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-constructor': 'off', // Covered by @typescript-eslint/no-useless-constructor
		'no-useless-rename': 'error',
		'no-var': 'error',
		'object-shorthand': 'error',
		'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
		'prefer-const': 'error',
		'prefer-destructuring': 'off', // We don't prefer destructuring if a type is specified ['error', { VariableDeclarator: { array: true, object: true }, AssignmentExpression: { array: false, object: false } }],
		'prefer-numeric-literals': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'require-yield': 'error',
		'rest-spread-spacing': 'error',
		'sort-imports': 'off', // import/order
		'symbol-description': 'error',
		'template-curly-spacing': 'error',
		'yield-star-spacing': ['error', { before: true, after: false }],

		/**
		 * typescript-eslint
		 *
		 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
		 */
		'@typescript-eslint/adjacent-overload-signatures': 'error',
		'@typescript-eslint/array-type': 'error',
		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/ban-ts-comment': ['error', {
			'ts-expect-error': 'allow-with-description'
		}],
		'@typescript-eslint/ban-tslint-comment': 'error',
		'@typescript-eslint/ban-types': ['error', {
			types: {
				'Function': null,
				'JSX.ELement': {
					message: 'Use React.ReactNode instead.',
					fixWith: 'React.ReactNode'
				},
				'Object': {
					message: 'Use {} instead.',
					fixWith: '{}'
				}
			}
		}],
		'@typescript-eslint/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
		'@typescript-eslint/class-literal-property-style': 'error',
		'@typescript-eslint/comma-dangle': ['error', 'never'],
		'@typescript-eslint/comma-spacing': 'error',
		'@typescript-eslint/consistent-indexed-object-style': 'error',
		'@typescript-eslint/consistent-type-assertions': 'error',
		'@typescript-eslint/consistent-type-definitions': 'error',
		'@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
		'@typescript-eslint/dot-notation': 'off', // @todo Reactivate as soon as this issue is fixed: https://github.com/typescript-eslint/typescript-eslint/issues/3510
		'@typescript-eslint/explicit-function-return-type': 'off', // @todo Disabled till we can specify exceptions (React-default class methods, like render())
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
		'@typescript-eslint/func-call-spacing': 'error',
		'@typescript-eslint/indent': [
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
		'@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'semi', requireLast: true }, singleline: { delimiter: 'semi', requireLast: true } }],
		'@typescript-eslint/member-ordering': ['error', {
			default: [
				// Index signature
				'signature',

				// Fields
				'public-static-field',
				'protected-static-field',
				'private-static-field',

				'public-decorated-field',
				'protected-decorated-field',
				'private-decorated-field',

				'public-instance-field',
				'protected-instance-field',
				'private-instance-field',

				'public-abstract-field',
				'protected-abstract-field',
				'private-abstract-field',

				// Constructors
				'public-constructor',
				'protected-constructor',
				'private-constructor',

				// Methods
				'public-decorated-method',
				'public-instance-method',
				'public-static-method',
				'public-abstract-method',

				'protected-decorated-method',
				'protected-instance-method',
				'protected-static-method',
				'protected-abstract-method',

				'private-decorated-method',
				'private-instance-method',
				'private-static-method',
				'private-abstract-method'
			]
		}],
		'@typescript-eslint/method-signature-style': ['error', 'property'],
		'@typescript-eslint/naming-convention': [
			'error',

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

			// Function
			{ selector: 'function', format: ['camelCase', 'PascalCase'] },

			// Paramter
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
				filter: '^__html$',
				types: ['string'],
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

			// Type alias
			{ selector: 'typeAlias', format: ['PascalCase'] },

			// Enum
			{ selector: 'enum', format: ['PascalCase'] },

			// Type parameter
			{ selector: 'typeParameter', format: ['PascalCase'] }
		],
		'@typescript-eslint/no-array-constructor': 'error',
		'@typescript-eslint/no-base-to-string': 'error',
		'@typescript-eslint/no-confusing-non-null-assertion': 'error',
		'@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
		'@typescript-eslint/no-dupe-class-members': 'error',
		'@typescript-eslint/no-duplicate-imports': 'error',
		'@typescript-eslint/no-dynamic-delete': 'error',
		'@typescript-eslint/no-empty-function': 'error',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-extra-non-null-assertion': 'error',
		'@typescript-eslint/no-extra-parens': ['off', 'all', { nestedBinaryExpressions: true, enforceForArrowConditionals: true }], // @todo There should be a option to enforce parens for IIFs + This has to be activated if all other linting errors are resolved
		'@typescript-eslint/no-extra-semi': 'error',
		'@typescript-eslint/no-extraneous-class': 'error',
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/no-for-in-array': 'error',
		'@typescript-eslint/no-implicit-any-catch': 'off', // Results into false-positive with the TS4.4 option "useUnknownInCatchVariables"
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-invalid-this': 'error',
		'@typescript-eslint/no-invalid-void-type': ['error', { allowInGenericTypeArguments: true }],
		'@typescript-eslint/no-loop-func': 'error',
		'@typescript-eslint/no-loss-of-precision': 'error',
		'@typescript-eslint/no-magic-numbers': 'off', // @todo There should be an option that numbers in arrays are ok like `const MaxSizes = [4, 8, 16, 32, 64];`
		/* ['error', {
			ignore: [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 16, 24, 32, 60, 63, 64, 100, 128, 250, 255, 256, 500, 1000, 4_294_967_296],
			ignoreArrayIndexes: true,
			enforceConst: true,
			detectObjects: true
		}], */
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
		'@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
		'@typescript-eslint/no-non-null-assertion': 'error',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
		'@typescript-eslint/no-parameter-properties': 'error',
		'@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
		'@typescript-eslint/no-require-imports': 'error',
		'@typescript-eslint/no-shadow': 'error',
		'@typescript-eslint/no-this-alias': 'error',
		'@typescript-eslint/no-throw-literal': 'error',
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
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unnecessary-type-arguments': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-unnecessary-type-constraint': 'error',
		'@typescript-eslint/no-unsafe-argument': 'error',
		'@typescript-eslint/no-unsafe-assignment': 'error',
		'@typescript-eslint/no-unsafe-call': 'error',
		'@typescript-eslint/no-unsafe-member-access': 'error',
		'@typescript-eslint/no-unsafe-return': 'error',
		'@typescript-eslint/no-unused-expressions': 'error',
		'@typescript-eslint/no-unused-vars-experimental': 'error',
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
		'@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/no-var-requires': 'error',
		'@typescript-eslint/non-nullable-type-assertion-style': 'off', // Conflicts with `no-non-null-assertion`, which we prefer
		'@typescript-eslint/object-curly-spacing': ['error', 'always'],
		'@typescript-eslint/prefer-as-const': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'off',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-includes': 'error',
		'@typescript-eslint/prefer-literal-enum-member': 'error',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/prefer-nullish-coalescing': 'error',
		'@typescript-eslint/prefer-optional-chain': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/prefer-readonly-parameter-types': ['off', { ignoreInferredTypes: true }], // @todo An interface should ensure that it's properties are readonly, not every usage of it
		'@typescript-eslint/prefer-reduce-type-parameter': 'error',
		'@typescript-eslint/prefer-regexp-exec': 'error',
		'@typescript-eslint/prefer-return-this-type': 'error',
		'@typescript-eslint/prefer-string-starts-ends-with': 'error',
		'@typescript-eslint/prefer-ts-expect-error': 'error',
		'@typescript-eslint/promise-function-async': 'error',
		'@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
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
		'@typescript-eslint/semi': 'error',
		'@typescript-eslint/sort-type-union-intersection-members': 'off', // Types should be sorted and grouped by priority and their meaning, not alphabetically
		'@typescript-eslint/space-before-function-paren': 'error',
		'@typescript-eslint/strict-boolean-expressions': ['off', { allowNullable: true, allowSafe: true, ignoreRhs: true }], // @todo Doesn't work for specific code, check later after all linter warnings are fixed, maybe at some positions we can use '??'
		'@typescript-eslint/switch-exhaustiveness-check': 'error',
		'@typescript-eslint/triple-slash-reference': 'error',
		'@typescript-eslint/type-annotation-spacing': 'error',
		'@typescript-eslint/typedef': 'off', // We are using "noImplicitAny" in tsconfig.json instead
		'@typescript-eslint/unbound-method': 'off', // @todo This doesn't work with the Utils.bind decorator. Is it possible to work around that?
		'@typescript-eslint/unified-signatures': 'error',

		/**
		 * eslint-plugin-functional
		 *
		 * @see https://github.com/jonaskello/eslint-plugin-functional#supported-rules
		 */
		'functional/functional-parameters': 'off',
		'functional/immutable-data': 'off', // This rule would require a lot of additional code and workarounds, which would make the result much more illegible.
		'functional/no-class': 'off',
		'functional/no-conditional-statement': 'off',
		'functional/no-expression-statement': ['off', { ignoreVoid: true }], // Creates too much false-positives
		'functional/no-let': 'off', // This is better covered by the `prefer-const` rule
		'functional/no-loop-statement': 'off',
		'functional/no-method-signature': 'off', // Covered by @typescript-eslint/method-signature-style
		'functional/no-mixed-type': ['error', {
			checkInterfaces: false,
			checkTypeLiterals: true
		}],
		'functional/no-promise-reject': 'off',
		'functional/no-return-void': 'off',
		'functional/no-this-expression': 'off',
		'functional/no-throw-statement': 'off',
		'functional/no-try-statement': 'off',
		'functional/prefer-readonly-type': ['error', { ignoreClass: true, allowLocalMutation: true, ignoreCollections: true, ignoreInterface: true }],
		'functional/prefer-tacit': 'off', // @see https://github.com/jonaskello/eslint-plugin-functional/issues/263
		'functional/prefer-type-literal': 'off', // Deprecated in favor of @typescript-eslint/consistent-type-definitions

		/**
		 * eslint-plugin-import
		 *
		 * @see https://github.com/import-js/eslint-plugin-import
		 */
		'import/default': 'error',
		'import/dynamic-import-chunkname': ['off', { // Here an "ignore" option is missing, which allows to ignore "@json\/locales\/.+?\.json", because these are handled in the webpack configuration.
			webpackChunknameFormat: '[0-9a-zA-Z-_/.+]+'
		}],
		'import/export': 'error',
		'import/exports-last': 'off', // Exports should be declared first; helper functions last
		'import/extensions': 'off', // There is no check that it's really an extension or part of the file name. Misinterpretes 'JavaDateTime' as extension in 'DateTime.JavaDateTime' for 'DateTime.DOSDateTime.ts'. So, we disable this rule
		'import/first': 'error',
		'import/group-exports': 'off',
		'import/max-dependencies': ['error', { max: 20, ignoreTypeImports: true }],
		'import/named': 'error',
		'import/namespace': ['error', { allowComputed: true }],
		'import/newline-after-import': 'error',
		'import/no-absolute-path': 'error',
		'import/no-amd': 'error',
		'import/no-anonymous-default-export': 'error',
		'import/no-commonjs': 'error',
		'import/no-cycle': 'error',
		'import/no-default-export': 'error',
		'import/no-deprecated': 'error',
		'import/no-duplicates': 'error',
		'import/no-dynamic-require': 'error',
		'import/no-extraneous-dependencies': 'error',
		'import/no-internal-modules': ['off', { // @todo Throws an "Cannot read property 'value' of null" error in src/help/scss/help.scss.d.ts:2 since the update to v2.21.1. If this issue does not get fixed in the next releases, report it!
			allow: [
				'workbox-window/utils/WorkboxEvent'
			]
		}],
		'import/no-import-module-exports': 'off', // @todo The rule reports files, which don't use `exports`. This must be a bug, report it!
		'import/no-mutable-exports': 'error',
		'import/no-named-as-default-member': 'error',
		'import/no-named-as-default': 'error',
		'import/no-named-default': 'error',
		'import/no-named-export': 'off',
		'import/no-namespace': 'off', // @todo Enabling this produces a JavaScript error in the rule; anyhow - could that reduce the package size, because of improved tree-shaking/dead-code-elimination?
		'import/no-nodejs-modules': 'error',
		// 'import/no-relative-packages': 'error', -- Removed because of roll-back of eslint-plugin-import in version 1.18.0
		'import/no-relative-parent-imports': 'off', // @todo Disabled because of a bug on Windows, re-enable as soon as it's resolved: https://github.com/import-js/eslint-plugin-import/issues/1644
		'import/no-restricted-paths': 'error',
		'import/no-self-import': 'error',
		'import/no-unassigned-import': ['error', {
			allow: [
				'**/*.scss',
				'jest-extended'
			]
		}],
		'import/no-unresolved': 'error',
		'import/no-unused-modules': 'error',
		'import/no-useless-path-segments': 'error',
		'import/no-webpack-loader-syntax': 'off', // Indeed, you should avoid that, but if we do it, we have a reason for it
		'import/order': ['error', {
			'alphabetize': { order: 'asc', caseInsensitive: true },
			'groups': ['builtin', 'unknown', 'external', 'internal', 'parent', 'sibling', 'index'],
			'newlines-between': 'always',
			'pathGroupsExcludedImportTypes': [],
			'pathGroups': [
				...ensureType.array(global.linterBundleSettings?.overrides?.general?.['import/order']?.additionalExternalPatterns).map(
					/**
					 * Creates an "external" group using the additional external pattern configuration.
					 *
					 * @param {string} pattern - A given pattern
					 * @returns {{ pattern: string; group: 'external'; }} An "external" path configuration object
					 */
					(pattern) => ({ pattern, group: 'external' })
				),
				{ pattern: '@*', group: 'internal' },
				{ pattern: '@*/**', group: 'internal' },
				{ pattern: '*!*/**', group: 'internal', position: 'after' } // Webpack loaders, e.g. 'worker-ref-loader!@app/components/FileFormatIdentificationDialog/TypeDetection.worker'
			]
		}],
		'import/prefer-default-export': 'off',
		'import/unambiguous': 'off',

		/**
		 * eslint-plugin-jsx-a11y
		 *
		 * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
		 */
		'jsx-a11y/alt-text': 'error',
		'jsx-a11y/anchor-has-content': 'error',
		'jsx-a11y/anchor-is-valid': 'error',
		'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
		'jsx-a11y/aria-props': 'error',
		'jsx-a11y/aria-proptypes': 'error',
		'jsx-a11y/aria-role': 'error',
		'jsx-a11y/aria-unsupported-elements': 'error',
		'jsx-a11y/autocomplete-valid': 'error',
		'jsx-a11y/click-events-have-key-events': 'error',
		'jsx-a11y/heading-has-content': 'error',
		'jsx-a11y/html-has-lang': 'off', // <html> elements set by react-helmet automatically have a lang attribute set
		'jsx-a11y/iframe-has-title': 'error',
		'jsx-a11y/img-redundant-alt': 'error',
		'jsx-a11y/interactive-supports-focus': 'error',
		'jsx-a11y/label-has-associated-control': 'error',
		'jsx-a11y/media-has-caption': 'error',
		'jsx-a11y/mouse-events-have-key-events': 'error',
		'jsx-a11y/no-access-key': 'off', // If you explicitly specify an access key, you usually have a reason for this, so it should not be prevented by a rule
		'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],
		'jsx-a11y/no-distracting-elements': 'error',
		'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
		'jsx-a11y/no-noninteractive-element-interactions': 'error',
		'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
		'jsx-a11y/no-noninteractive-tabindex': 'error',
		'jsx-a11y/no-redundant-roles': 'error',
		'jsx-a11y/no-static-element-interactions': 'error',
		'jsx-a11y/role-has-required-aria-props': 'error',
		'jsx-a11y/role-supports-aria-props': 'error',
		'jsx-a11y/scope': 'error',
		'jsx-a11y/tabindex-no-positive': 'error',

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
		 *
		 * @see https://github.com/xjamundx/eslint-plugin-promise
		 */
		'promise/always-return': 'off', // If the result of an `.then()` is not used, there is no need to return something.
		'promise/avoid-new': 'off',
		'promise/catch-or-return': 'error',
		'promise/no-callback-in-promise': 'off',
		'promise/no-native': 'off',
		'promise/no-nesting': 'off',
		'promise/no-new-statics': 'error',
		'promise/no-promise-in-callback': 'off',
		'promise/no-return-in-finally': 'error',
		'promise/no-return-wrap': 'error',
		'promise/param-names': 'off', // @todo Disabled until this issue is fixed: https://github.com/xjamundx/eslint-plugin-promise/issues/206
		'promise/prefer-await-to-callbacks': 'off', // It's not always possible to use avoid callbacks.
		'promise/prefer-await-to-then': 'off', // Depending on the use-case `.then()`/`.catch()` might be easier to understand
		'promise/valid-params': 'off', // TypeScript ensures that

		/**
		 * eslint-plugin-unicorn
		 *
		 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
		 */
		'unicorn/better-regex': 'error',
		'unicorn/catch-error-name': 'error',
		'unicorn/consistent-destructuring': 'off', // Depending on the usage, it makes sense to destructure e.g. `props` only partial.
		'unicorn/consistent-function-scoping': 'error',
		'unicorn/custom-error-definition': 'off',
		'unicorn/empty-brace-spaces': 'error',
		'unicorn/error-message': 'error',
		'unicorn/escape-case': 'error',
		'unicorn/expiring-todo-comments': 'error',
		'unicorn/explicit-length-check': 'error',
		'unicorn/filename-case': ['error', {
			cases: {
				camelCase: true,
				pascalCase: true
			},
			ignore: [
				/([A-Za-z0-9]?[a-z0-9]+)*[A-Z]{2,4}([A-Za-z0-9]?[a-z0-9]+)*/u // Up to 4 Characters can be upper-case in a row (e.g. in `prepareDOM` or `SVGIcon`)
			]
		}],
		'unicorn/import-index': 'error',
		'unicorn/import-style': 'error',
		'unicorn/new-for-builtins': 'error',
		'unicorn/no-abusive-eslint-disable': 'error',
		'unicorn/no-array-callback-reference': 'off', // If I use functions, they are specially developed for this use-case
		'unicorn/no-array-for-each': 'error',
		'unicorn/no-array-method-this-argument': 'error',
		'unicorn/no-array-push-push': 'error',
		'unicorn/no-array-reduce': ['error', { allowSimpleOperations: true }],
		'unicorn/no-console-spaces': 'error',
		'unicorn/no-document-cookie': 'error',
		'unicorn/no-for-loop': 'off', // @typescript-eslint/prefer-for-of
		'unicorn/no-hex-escape': 'error',
		'unicorn/no-instanceof-array': 'error',
		'unicorn/no-keyword-prefix': 'off',
		'unicorn/no-lonely-if': 'off', // Sometimes the code is clearer if-conditions are not combined
		'unicorn/no-nested-ternary': 'off', // We prefer no-nested-ternary of ESlint
		'unicorn/no-new-array': 'off', // `new Array(length)` should be preferred over `Array.from({ length })` because it's much faster. @see https://jsben.ch/qTpYp
		'unicorn/no-new-buffer': 'error',
		'unicorn/no-null': 'off', // @todo Too much old native JavaScript functions are based on `null`. Maybe we can replace them later.
		'unicorn/no-object-as-default-parameter': 'error',
		'unicorn/no-process-exit': 'error',
		'unicorn/no-static-only-class': 'error',
		'unicorn/no-this-assignment': 'error',
		'unicorn/no-unreadable-array-destructuring': 'error',
		'unicorn/no-unsafe-regex': 'off',
		'unicorn/no-unused-properties': 'error',
		'unicorn/no-useless-length-check': 'error',
		'unicorn/no-useless-spread': 'error',
		'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
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
		'unicorn/prefer-date-now': 'error',
		'unicorn/prefer-default-parameters': 'error',
		'unicorn/prefer-dom-node-append': 'error',
		'unicorn/prefer-dom-node-dataset': 'off', // `setAttribute` is faster than `dataset`. See https://www.measurethat.net/Benchmarks/Show/7740/0/classname-vs-setattribute-vs-classlist-vs-dataset
		'unicorn/prefer-dom-node-remove': 'error',
		'unicorn/prefer-dom-node-text-content': 'error',
		'unicorn/prefer-includes': 'error',
		'unicorn/prefer-keyboard-event-key': 'error',
		'unicorn/prefer-math-trunc': 'error',
		'unicorn/prefer-modern-dom-apis': 'error',
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-negative-index': 'error',
		'unicorn/prefer-number-properties': 'error',
		'unicorn/prefer-object-has-own': 'error',
		'unicorn/prefer-object-from-entries': 'error',
		'unicorn/prefer-optional-catch-binding': 'error',
		'unicorn/prefer-prototype-methods': 'error',
		'unicorn/prefer-query-selector': 'off', // document.getElementById() is much faster
		'unicorn/prefer-reflect-apply': 'error',
		'unicorn/prefer-set-has': 'error',
		'unicorn/prefer-spread': 'off', // @todo Disabled till there a solution for the warning, that `slice()` on Typed-Arrays should be replaced (which is not possible). @see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1064
		'unicorn/prefer-string-replace-all': 'off',
		'unicorn/prefer-string-slice': 'off', // @todo As of today (2020.08.24) and since the last 9 years, substr() is three times faster than slice() in Firefox.
		'unicorn/prefer-string-starts-ends-with': 'error',
		'unicorn/prefer-string-trim-start-end': 'error',
		'unicorn/prefer-switch': 'error',
		'unicorn/prefer-ternary': 'off', // We prefer readability over saving a few chars
		'unicorn/prefer-top-level-await': 'error',
		'unicorn/prefer-regexp-test': 'error',
		'unicorn/prefer-type-error': 'error',
		'unicorn/prevent-abbreviations': ['error', { ignore: ['args', 'i', 'j', 'i18n', 'ref', 'Ref', 'params', 'props', 'Props'] }],
		'unicorn/require-array-join-separator': 'error',
		'unicorn/require-number-to-fixed-digits-argument': 'error',
		'unicorn/require-post-message-target-origin': 'off', // False-positive with Workers which don't support a `targetOrigin`
		'unicorn/string-content': ['error', {
			patterns: {
				'\\.\\.\\.': '…',
				// eslint-disable-next-line unicorn/string-content -- If not disabled, the rule would report it's own disable-patterns.
				'->': '→'
			}
		}],
		'unicorn/throw-new-error': 'error'
	}
};
