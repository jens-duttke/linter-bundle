/**
 * @file Settings for React code in TypeScript (TSX) files.
 */

import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import stylisticJSXPlugin from '@stylistic/eslint-plugin-jsx';

import * as ensureType from '../helper/ensure-type.mjs';
import { linterBundleConfig } from '../helper/linter-bundle-config.js';

export default [
	{
		plugins: {
			'react-hooks': reactHooksPlugin,
			'react': reactPlugin,
			'@stylistic/jsx': stylisticJSXPlugin
		}
	},
	{
		files: ['**/*.tsx'],
		rules: {
			/**
			 * typescript-eslint
			 *
			 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
			 */
			'@typescript-eslint/member-ordering': 'off', // For React components we are using react/sort-comp
			'@typescript-eslint/explicit-function-return-type': ['error', {
				allowedNames: [
					'componentDidCatch',
					'componentDidMount',
					'componentDidUpdate',
					'componentWillUnmount',
					'getDerivedStateFromError',
					'getDerivedStateFromProps',
					'getSnapshotBeforeUpdate',
					'render',
					'shouldComponentUpdate'
				]
			}],

			/**
			 * eslint-plugin-jsx-a11y
			 *
			 * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
			 */
			'jsx-a11y/alt-text': 'error',
			'jsx-a11y/anchor-ambiguous-text': 'off',
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
			'jsx-a11y/no-aria-hidden-on-focusable': 'error',
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
			'react/checked-requires-onchange-or-readonly': 'error',
			'react/default-props-match-prop-types': 'error',
			'react/destructuring-assignment': 'off', // Sometimes destructuring makes sense, sometimes it doesn't - that depends on the context.
			'react/display-name': ['error', { ignoreTranspilerName: true }],
			'react/forbid-component-props': ['error', { forbid: [
				{
					propName: 'className',
					allowedFor: ensureType.array(linterBundleConfig.ts?.overrides?.react?.['react/forbid-component-props']?.allowClassNameFor)
				},
				{
					propName: 'style',
					allowedFor: ensureType.array(linterBundleConfig.ts?.overrides?.react?.['react/forbid-component-props']?.allowStyleFor)
				}
			] }],
			'react/forbid-dom-props': 'error',
			'react/forbid-elements': 'error',
			'react/forbid-foreign-prop-types': 'error',
			'react/forbid-prop-types': 'error',
			'react/function-component-definition': ['off', { // @todo Doesn't work with Component-Factories, which shall return named components `return function MyComponent () {}`, while in modules, `const MyComponent = () => {}` shall be used
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function'
			}],
			'react/hook-use-state': ['error', { allowDestructuredState: true }],
			'react/jsx-boolean-value': ['error', 'always'],
			'react/jsx-child-element-spacing': 'off', // @todo Why is this disabled? Could it be, that the faulty behavior is fixed in the meantime?
			'react/jsx-closing-bracket-location': 'error',
			'react/jsx-closing-tag-location': 'error',
			'react/jsx-curly-brace-presence': ['error', { propElementValues: 'always' }],
			'react/jsx-curly-newline': 'off',
			'react/jsx-curly-spacing': 'error',
			'react/jsx-equals-spacing': 'error',
			'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
			'react/jsx-first-prop-new-line': 'error',
			'react/forward-ref-uses-ref': 'error',
			'react/jsx-fragments': ['error', 'element'],
			'react/jsx-handler-names': 'off', // @todo There should be an option which checks if the function is used multiple times in a class (like this.closeTooltip()) - in that case, the 'handle' prefix should not be mandatory
			'react/jsx-indent-props': ['error', 'tab'],
			'react/jsx-indent': ['error', 'tab', { checkAttributes: true, indentLogicalExpressions: true }],
			'react/jsx-key': ['error', { checkKeyMustBeforeSpread: true, warnOnDuplicates: true }],
			'react/jsx-max-depth': ['error', { max: 8 }],
			'react/jsx-max-props-per-line': ['error', { maximum: { single: 5, multi: 1 } }],
			'react/jsx-newline': 'off', // @todo Why is this rule deactivated?
			'react/jsx-no-bind': ['error', { ignoreDOMComponents: true }],
			'react/jsx-no-comment-textnodes': 'error',
			'react/jsx-no-constructed-context-values': 'error',
			'react/jsx-no-duplicate-props': 'error',
			'react/jsx-no-leaked-render': 'off', // Should be covered by boolean-types in TypeScript, otherwise unnecessary type-castings from boolean to boolean would be required
			'react/jsx-no-literals': 'off',
			'react/jsx-no-script-url': 'error',
			'react/jsx-no-target-blank': ['error', { allowReferrer: true, forms: true }],
			'react/jsx-no-undef': 'error',
			'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
			'react/jsx-one-expression-per-line': ['off', { allow: 'single-child' }], // @todo Doesn't work with something like "Text <a href="...">Link</a> More Text", which should be valid
			'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
			'react/jsx-props-no-multi-spaces': 'error',
			'react/jsx-props-no-spread-multi': 'error',
			'react/jsx-props-no-spreading': 'off',
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
			'react/jsx-wrap-multilines': 'error',
			'react/no-access-state-in-setstate': 'error',
			'react/no-adjacent-inline-elements': 'off', // @todo There is an issue if inline and block elements are mixed. Simple example: `<span>Text</span><br />` here, the space between the SPAN and BR should not be forced, because a space at the end of a line does not make sense.
			'react/no-array-index-key': 'error',
			'react/no-arrow-function-lifecycle': 'error',
			'react/no-children-prop': 'error',
			'react/no-danger-with-children': 'error',
			'react/no-danger': 'off',
			'react/no-deprecated': 'error',
			'react/no-did-mount-set-state': 'error',
			'react/no-did-update-set-state': 'error',
			'react/no-direct-mutation-state': 'error',
			'react/no-find-dom-node': 'error',
			'react/no-invalid-html-attribute': 'error',
			'react/no-is-mounted': 'error',
			'react/no-multi-comp': 'error',
			'react/no-namespace': 'error',
			'react/no-object-type-as-default-prop': 'error',
			'react/no-redundant-should-component-update': 'error',
			'react/no-render-return-value': 'error',
			'react/no-set-state': 'off',
			'react/no-string-refs': 'error',
			'react/no-this-in-sfc': 'error',
			'react/no-typos': 'error',
			'react/no-unescaped-entities': 'error',
			'react/no-unknown-property': 'error',
			'react/no-unsafe': 'error',
			'react/no-unstable-nested-components': 'error',
			'react/no-unused-class-component-methods': 'off', // @todo False-positives with public methods.
			'react/no-unused-prop-types': 'error',
			'react/no-unused-state': 'error',
			'react/no-will-update-set-state': 'error',
			'react/prefer-es6-class': 'error',
			'react/prefer-exact-props': 'off', // With TypeScript interfaces, this rule is not required
			'react/prefer-read-only-props': 'error',
			'react/prefer-stateless-function': 'error',
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'error',
			'react/require-default-props': ['off', { forbidDefaultForRequired: true, ignoreFunctionalComponents: true }], // @see https://medium.com/@matanbobi/react-defaultprops-is-dying-whos-the-contender-443c19d9e7f1 @todo Also disabled because of false-positive with React.forwardRef(), create bug report?
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
			'react/sort-default-props': 'error',
			'react/sort-prop-types': 'error',
			'react/state-in-constructor': 'error',
			'react/static-property-placement': 'error',
			'react/style-prop-object': 'error',
			'react/void-dom-elements-no-children': 'error'
		}
	}
];
