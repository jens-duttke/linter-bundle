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
