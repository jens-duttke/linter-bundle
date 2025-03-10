/**
 * @file Settings for TypeScript-based Web workers (*.worker.ts) used by the `worker-loader` for Webpack.
 *
 * @example Header of a Webworker file
 * /// <reference lib="webworker" />
 *
 * // Hack to be able to use "import Worker from ..." with correct types
 * export default undefined as unknown as WebpackWorker;
 */

export default [
	{
		files: ['**/*.worker.ts'],
		rules: {
			/**
			 * eslint-plugin-import
			 *
			 * @see https://github.com/import-js/eslint-plugin-import
			 */
			'import/no-default-export': 'off'
		}
	}
];
