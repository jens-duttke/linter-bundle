/**
 * @file Executes a process asynchronously.
 */

import * as childProcess from 'node:child_process';
import * as os from 'node:os';

/** @typedef {{ code: number; stdout: string; stderr: string; runtime: number; }} ProcessResult */

/**
 * Executes a process asynchronously.
 *
 * @public
 * @param {string} command - The process to execute
 * @param {childProcess.ExecOptions | undefined} [options] - The options of the `childProcess.exec()` method
 * @returns {Promise<ProcessResult>} An object containing the result of the process execution
 */
export async function runProcess (command, options) {
	return new Promise((resolve) => {
		const startTimestamp = performance.now();

		/** @type {string[]} */
		const stdout = [];

		/** @type {string[]} */
		const stderr = [];

		const lintingProcess = childProcess.exec(command, {
			...options,
			env: {
				// eslint-disable-next-line n/no-process-env -- We need to access `process.env`, because this is the default value if `env` is not set.
				...process.env,
				...options?.env,
				LINTER_BUNDLE: '1'
			},
			shell: os.userInfo().shell ?? undefined
		});

		lintingProcess.stdout?.on('data', (/** @type {string} */data) => {
			stdout.push(data);
		});

		lintingProcess.stderr?.on('data', (/** @type {string} */data) => {
			stderr.push(data);
		});

		lintingProcess.on('exit', (code) => resolve({
			code: code ?? 0,
			stdout: stdout.join(''),
			stderr: stderr.join(''),
			runtime: performance.now() - startTimestamp
		}));
	});
}
