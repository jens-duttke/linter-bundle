#!/usr/bin/env node

/**
 * @file Entry point of the linter-bundle.
 */

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const tty = require('tty');

const isTerminal = tty.isatty(1);

/** @type {{ jobTitle: string; taskName: string; job: Promise<{ code: number; stdout: string; stderr: string; }>; }[]} */
const jobs = getTasksToRun(process.argv.splice(2)).map(({ taskName, config }) => {
	switch (taskName) {
		case 'tsc':
			return runTask({
				taskName,
				config,
				command: [`node "${require.resolve('typescript/bin/tsc')}" --skipLibCheck --noEmit`, ...(config['tsconfig']?.[0] ? [`--project ${config['tsconfig'][0]}`] : [])].join(' ')
			});

		case 'ts': {
			const tsconfig = config['tsconfig']?.[0];

			return runTask({
				taskName,
				command: [
					'node',
					`"${require.resolve('eslint/bin/eslint.js')}"`,
					config['include']?.[0] ?? '"./**/*.{js,jsx,ts,tsx}"',
					config['exclude']?.map((exclude) => `--ignore-pattern ${exclude}`).join(' '),
					`--rulesdir "${path.resolve(__dirname, './eslint/rules/')}"`,
					'--format unix',
					`--resolve-plugins-relative-to "${__dirname}"`
				].filter((argument) => Boolean(argument)).join(' '),
				config,
				options: {
					env: {
						TIMING: '10',
						TSCONFIG: (typeof tsconfig === 'string' ? tsconfig : undefined)
					}
				}
			});
		}

		case 'sass':
			return runTask({
				taskName,
				config,
				command: `node "${require.resolve('stylelint/bin/stylelint.js')}" "src/**/*.scss" --formatter unix`
			});

		case 'md':
			return runTask({
				taskName,
				config,
				command: `node "${require.resolve('markdownlint-cli/markdownlint.js')}" **/*.md --ignore node_modules`
			});

		case 'audit':
			if (fs.existsSync('package-lock.json')) {
				return runTask({
					taskName,
					config,
					command: [
						'node',
						`"${require.resolve('better-npm-audit')}"`,
						'audit',
						'-l moderate',
						'-p',
						config['exclude']?.map((exclude) => `-i ${exclude}`).join(' ')
					].filter((argument) => Boolean(argument)).join(' ')
				});
			}
			else if (fs.existsSync('yarn.lock')) {
				return runTask({
					taskName,
					config,
					command: [
						'node',
						`"${require.resolve('improved-yarn-audit')}"`,
						'--min-severity moderate',
						'--fail-on-missing-exclusions',
						'--ignore-dev-deps',
						config['exclude']?.map((exclude) => `--exclude ${exclude}`).join(' ')
					].filter((argument) => Boolean(argument)).join(' ')
				});
			}

			return {
				jobTitle: getJobTitle({
					taskName,
					config,
					command: ''
				}),
				taskName,
				job: Promise.resolve({
					code: 1,
					stdout: '',
					stderr: 'Neither a "package-lock.json" nor a "yarn.lock" have need found.\n\n'
				})
			};

		default:
	}

	throw new Error(`"${taskName}" is not a valid task.`);
});

void (async () => {
	for (const { jobTitle, taskName, job } of jobs) {
		process.stdout.write(jobTitle);

		// eslint-disable-next-line no-await-in-loop -- Replace by `for await (const { ... } of jobs) {` as soon as Node.js supports it
		const { code, stdout, stderr } = await job;

		if (stdout) {
			process.stdout.write(stdout);
		}

		if (stderr) {
			process.stderr.write(stderr);
		}

		if (code > 0) {
			if (isTerminal) {
				process.stderr.write(`\n[lint ${taskName}] \u001B[31mProblems detected\u001B[39m\n`);
			}
			else {
				process.stderr.write(`\n[lint ${taskName}] Problems detected`);
			}
		}

		if (process.exitCode === undefined || code > process.exitCode) {
			process.exitCode = code;
		}
	}

	process.stdout.write('\n');
})();

/**
 * Extracts the tasks which should be run from the command-line arguments passed in.
 *
 * @param {string[]} argv - Command-line arguments (usual `process.argv.splice(2)`)
 * @returns {{ taskName: string; config: Partial<Record<string, (string | true)[]>>; }[]} The task execution setup.
 * @throws {Error} If no task has be specified in the arguments.
 */
function getTasksToRun (argv) {
	const TASKS = new Set(['tsc', 'ts', 'sass', 'md', 'audit']);
	const ARG_REGEXP = /^--([^=]+)(?:=(.+))?$/u;

	/** @type {{ taskName: string; config: Record<string, (string | true)[]>; } | null} */
	let currentTask = null;
	const TasksToRun = [];

	for (const argument of argv) {
		if (TASKS.has(argument)) {
			currentTask = {
				taskName: argument,
				config: {}
			};

			TasksToRun.push(currentTask);

			continue;
		}

		const [, name, value = true] = ARG_REGEXP.exec(argument) ?? [];

		const normalizedName = name.toLowerCase();

		if (currentTask === null) {
			throw new Error(`No task specified for optional arguments "${argument}".`);
		}

		if (!(normalizedName in currentTask.config)) {
			currentTask.config[normalizedName] = [];
		}

		const config = currentTask.config[normalizedName];

		config.push(value);
	}

	return TasksToRun;
}

/**
 * Exectues a task asynchronously.
 *
 * @param {{ taskName: string; config: Partial<Record<string, (string | true)[]>>; command: string; options?: import('child_process').ExecOptions; }} setup - The task execution setup.
 * @returns {{ jobTitle: string; taskName: string, job: Promise<{ code: number; stdout: string; stderr: string; }>}} Exit code
 */
function runTask (setup) {
	return {
		jobTitle: getJobTitle(setup),
		taskName: setup.taskName,
		job: new Promise((resolve) => {
			/** @type {string[]} */
			const stdout = [];

			/** @type {string[]} */
			const stderr = [];

			const lintingProcess = childProcess.exec(setup.command, setup.options);

			lintingProcess.stdout?.on('data', (data) => {
				stdout.push(data);
			});

			lintingProcess.stderr?.on('data', (data) => {
				stderr.push(data);
			});

			lintingProcess.on('exit', (code) => resolve({
				code: code ?? 0,
				stdout: stdout.join(''),
				stderr: stderr.join('')
			}));
		})
	};
}

/**
 * Returns the title (command line string) of a specific job.
 *
 * @param {{ taskName: string; config: Partial<Record<string, (string | true)[]>>; command: string; options?: import('child_process').ExecOptions; }} setup - The task execution setup.
 * @returns {string} The title of the job with a leading line-break and two trailing line-breaks.
 */
function getJobTitle (setup) {
	/** @type {string} */
	const additionalArgumentString = Object.entries(setup.config).map(([name, values]) => (Array.isArray(values) ? values.map((value) => (value === true ? `--${name}` : `--${name}="${value}"`)).join(' ') : '')).join(' ');

	return `\n[lint ${setup.taskName}${(additionalArgumentString.length > 0 ? ` ${additionalArgumentString}` : '')}] ${setup.command}\n\n`;
}
