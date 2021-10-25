/**
 * @file Settings for React code in TypeScript (TSX) files.
 */

const ensureType = require('../helper/ensure-type');

module.exports = {
	overrides: [
		{
			files: ['*.tsx'],
			rules: {
				/**
				 * typescript-eslint
				 *
				 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
				 */
				'@typescript-eslint/member-ordering': 'off', // For React components we are using react/sort-comp

				/**
				 * eslint-plugin-react-hooks
				 *
				 * @see https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks
				 * @see https://reactjs.org/docs/hooks-rules.html
				 */
				'react-hooks/rules-of-hooks': 'error',
				'react-hooks/exhaustive-deps': 'error',

				/**
				 * eslint-plugin-react
				 *
				 * @see https://github.com/yannickcr/eslint-plugin-react
				 */
				'react/boolean-prop-naming': 'error',
				'react/button-has-type': 'error',
				'react/default-props-match-prop-types': 'error',
				'react/destructuring-assignment': 'off', // Sometimes destructuring makes sense, sometimes it doesn't - that depends on the context.
				'react/display-name': 'error',
				'react/forbid-component-props': ['error', { forbid: [
					{
						propName: 'className',
						allowedFor: ensureType.array(global.linterBundleSettings?.overrides?.react?.['react/forbid-component-props']?.allowClassNameFor)
					},
					{
						propName: 'style',
						allowedFor: ensureType.array(global.linterBundleSettings?.overrides?.react?.['react/forbid-component-props']?.allowStyleFor)
					}
				] }],
				'react/forbid-dom-props': 'error',
				'react/forbid-elements': 'error',
				'react/forbid-prop-types': 'error',
				'react/forbid-foreign-prop-types': 'error',
				'react/function-component-definition': ['off', { // @todo Doesn't work with Component-Factories, which shall return named components `return function MyComponent () {}`, while in modules, `const MyComponent = () => {}` shall be used
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function'
				}],
				'react/no-access-state-in-setstate': 'error',
				'react/no-array-index-key': 'error',
				'react/no-children-prop': 'error',
				'react/no-danger': 'off',
				'react/no-danger-with-children': 'error',
				'react/no-deprecated': 'error',
				'react/no-did-mount-set-state': 'error',
				'react/no-did-update-set-state': 'error',
				'react/no-direct-mutation-state': 'error',
				'react/no-find-dom-node': 'error',
				'react/no-is-mounted': 'error',
				'react/no-multi-comp': 'error',
				'react/no-namespace': 'error',
				'react/no-redundant-should-component-update': 'error',
				'react/no-render-return-value': 'error',
				'react/no-set-state': 'off',
				'react/no-typos': 'error',
				'react/no-string-refs': 'error',
				'react/no-this-in-sfc': 'error',
				'react/no-unescaped-entities': 'error',
				'react/no-unknown-property': 'error',
				'react/no-unsafe': 'error',
				'react/no-unstable-nested-components': 'error',
				'react/no-unused-prop-types': 'error',
				'react/no-unused-state': 'error',
				'react/no-will-update-set-state': 'error',
				'react/prefer-es6-class': 'error',
				'react/prefer-exact-props': 'off', // With TypeScript interfaces, this rule is not required
				'react/prefer-read-only-props': 'error',
				'react/prefer-stateless-function': 'error',
				'react/prop-types': 'off',
				'react/react-in-jsx-scope': 'error',
				'react/require-default-props': ['error', { forbidDefaultForRequired: true, ignoreFunctionalComponents: true }], // @see https://medium.com/@matanbobi/react-defaultprops-is-dying-whos-the-contender-443c19d9e7f1
				'react/require-optimization': 'error',
				'react/require-render-return': 'error',
				'react/self-closing-comp': 'error',
				'react/sort-comp': ['error', {
					order: [
						'type-annotations',
						'static-variables',
						'instance-variables',
						'getters',
						'setters',
						'lifecycle',
						'render',
						'/^render.+$/',
						'/^handle.+$/',
						'everything-else',
						'instance-methods',
						'static-methods'
					]
				}],
				'react/sort-prop-types': 'error',
				'react/state-in-constructor': 'error',
				'react/static-property-placement': 'error',
				'react/style-prop-object': 'error',
				'react/void-dom-elements-no-children': 'error',

				// JSX-specific rules
				'react/jsx-boolean-value': ['error', 'always'],
				'react/jsx-child-element-spacing': 'off', // @todo Why is this disabled? Could it be, that the faulty behaviour is fixed in the meantime?
				'react/jsx-closing-bracket-location': 'error',
				'react/jsx-closing-tag-location': 'error',
				'react/jsx-curly-newline': 'off',
				'react/jsx-curly-spacing': 'error',
				'react/jsx-equals-spacing': 'error',
				'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
				'react/jsx-first-prop-new-line': 'error',
				'react/jsx-handler-names': 'off', // @todo There should be an option which checks if the function is used multiple times in a class (like this.closeTooltip()) - in that case, the 'handle' prefix should not be mandatory
				'react/jsx-indent': ['error', 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
				'react/jsx-indent-props': ['error', 'tab'],
				'react/jsx-key': ['error', { checkKeyMustBeforeSpread: true }],
				'react/jsx-max-depth': ['error', { max: 8 }],
				'react/jsx-max-props-per-line': ['error', { maximum: { single: 5, multi: 1 } }],
				'react/no-adjacent-inline-elements': 'off', // @todo There is an issue if inline and block elements are mixed. Simple example: `<span>Text</span><br />` here, the space between the SPAN and BR should not be forced, because a space at the end of a line does not make sense.
				'react/jsx-newline': 'off',
				'react/jsx-no-bind': ['error', { ignoreDOMComponents: true }],
				'react/jsx-no-comment-textnodes': 'error',
				'react/jsx-no-constructed-context-values': 'error',
				'react/jsx-no-duplicate-props': 'error',
				'react/jsx-no-literals': 'off',
				'react/jsx-no-script-url': 'error',
				'react/jsx-no-target-blank': ['error', { allowReferrer: true, forms: true }],
				'react/jsx-no-undef': 'error',
				'react/jsx-no-useless-fragment': 'error',
				'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }], // @todo Doesn't work with something like "Text <a href="...">Link</a> More Text", which should be valid
				'react/jsx-curly-brace-presence': 'error',
				'react/jsx-fragments': ['error', 'element'],
				'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
				'react/jsx-props-no-multi-spaces': 'error',
				'react/jsx-props-no-spreading': 'off',
				'react/jsx-sort-default-props': 'error',
				'react/jsx-sort-props': ['error', {
					ignoreCase: true,
					callbacksLast: true,
					shorthandFirst: true,
					shorthandLast: false,
					noSortAlphabetically: true,
					reservedFirst: true
				}],
				'react/jsx-tag-spacing': 'error',
				'react/jsx-uses-react': 'error',
				'react/jsx-uses-vars': 'error',
				'react/jsx-wrap-multilines': 'error'
			}
		}
	]
};
