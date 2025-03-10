/**
 * @file Configuration used for linting the linter-bundle.
 */

import javascriptLazyConfig from './eslint/javascript-lazy.mjs';
import jsdocConfig from './eslint/jsdoc.mjs';
import eslintConfig from './eslint.mjs';

export default [
	...eslintConfig,
	...javascriptLazyConfig,
	...jsdocConfig,
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
