/**
 * @file Extends `./javascript` but ignores unsafe types.
 */

import javascriptExtends from './javascript.mjs';

export default [
	...javascriptExtends,
	{
		files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
		rules: {
			/**
			 * typescript-eslint
			 *
			 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules
			 */
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off'
		}
	}
];
