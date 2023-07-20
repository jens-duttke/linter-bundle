/**
 * @file Executes a process asynchronously.
 */

/** @typedef {{ code: number; stdout: string; stderr: string; runtime: number; }} ProcessResult */

const childProcess = require('child_process');

/**
 * Executes a process asynchronously.
 *
 * @public
 * @param {string} command - The process to execute.
 * @param {childProcess.ExecOptions | undefined} [options] - The options of the `childProcess.exec()` method.
 * @returns {Promise<ProcessResult>} An object containing the result of the process execution
 */
async function runProcess (command, options) {
	return new Promise((resolve) => {
		const startTimestamp = performance.now();

		/** @type {string[]} */
		const stdout = [];

		/** @type {string[]} */
		const stderr = [];

		const lintingProcess = childProcess.exec(command, options);

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

module.exports = {
	runProcess
};
