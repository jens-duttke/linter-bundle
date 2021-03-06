#!/usr/bin/env node

/**
 * @file Entry point of the linter-bundle.
 */

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const tty = require('tty');

/** @typedef {{ taskName: string; config: Partial<Record<string, (string | true)[]>>; }} TaskNameAndConfig */
/** @typedef {TaskNameAndConfig & { command: string; options?: import('child_process').ExecOptions; }} TaskSetup */
/** @typedef {{ jobTitle: string; taskSetup: TaskSetup; job: Promise<{ code: number; stdout: string; stderr: string; }>; }} Job */

const isTerminal = tty.isatty(1);

/** @type {Job[]} */
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
						'npx',
						'--yes',
						'--',
						'better-npm-audit@1.9.1',
						'audit',
						`-l ${config['min-severity'] ?? 'moderate'}`,
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
						'npx',
						'--yes',
						'--',
						'improved-yarn-audit@2.3.3',
						`--min-severity ${config['min-severity'] ?? 'moderate'}`,
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
				taskSetup: {
					taskName,
					config,
					command: ''
				},
				job: Promise.resolve({
					code: 1,
					stdout: '',
					stderr: 'Neither a "package-lock.json" nor a "yarn.lock" have need found.'
				})
			};

		default:
	}

	throw new Error(`"${taskName}" is not a valid task.`);
});

void (async () => {
	for (const { jobTitle, taskSetup, job } of jobs) {
		process.stdout.write(jobTitle);

		// eslint-disable-next-line no-await-in-loop -- Replace by `for await (const { ... } of jobs) {` as soon as Node.js supports it
		const { code, stdout, stderr } = await job;

		const trimmedError = stderr.trim();

		if (code !== 0 || trimmedError !== '' || taskSetup.config['verbose']) {
			process.stdout.write('\n');

			if (stdout) {
				process.stdout.write(`${stdout.trim()}\n`);
			}

			if (stderr) {
				process.stderr.write(`${trimmedError}\n`);
			}
		}

		if (code !== 0 && taskSetup.config['verbose']) {
			if (isTerminal) {
				process.stderr.write(`\n[lint ${taskSetup.taskName}] \u001B[31mProblems detected\u001B[39m\n`);
			}
			else {
				process.stderr.write(`\n[lint ${taskSetup.taskName}] Problems detected\n`);
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
 * @returns {TaskNameAndConfig[]} The task execution setup.
 * @throws {Error} If no task has be specified in the arguments.
 */
function getTasksToRun (argv) {
	const TASKS = new Set(['tsc', 'ts', 'sass', 'md', 'audit']);
	const ARG_REGEXP = /^--([^=]+)(?:=(.+))?$/u;

	/** @type {TaskNameAndConfig | null} */
	let currentTask = null;

	/** @type {TaskNameAndConfig[]} */
	const tasksToRun = [];

	/** @type {Record<string, (string | true)[]>} */
	const generalConfig = {};

	for (const argument of argv) {
		if (TASKS.has(argument)) {
			currentTask = {
				taskName: argument,
				config: { ...generalConfig }
			};

			tasksToRun.push(currentTask);

			continue;
		}

		const [, name, value = true] = /** @type {[string | undefined, string | undefined, string | true | undefined]} */(/** @type {any} */(ARG_REGEXP.exec(argument)) ?? []);

		if (name === undefined) {
			throw new Error(`Unknown argument "${argument}"`);
		}

		const normalizedName = name.toLowerCase();

		/** @type {(string | true)[]} */
		let config;

		if (currentTask === null) {
			if (!(normalizedName in generalConfig)) {
				generalConfig[normalizedName] = [];
			}

			config = generalConfig[normalizedName];
		}
		else {
			if (!(normalizedName in currentTask.config)) {
				currentTask.config[normalizedName] = [];
			}

			config = /** @type {(string | true)[]} */(currentTask.config[normalizedName]);
		}

		config.push(value);
	}

	return tasksToRun;
}

/**
 * Exectues a task asynchronously.
 *
 * @param {TaskSetup} setup - The task execution setup.
 * @returns {Job} Job
 */
function runTask (setup) {
	return {
		jobTitle: getJobTitle(setup),
		taskSetup: setup,
		job: new Promise((resolve) => {
			/** @type {string[]} */
			const stdout = [];

			/** @type {string[]} */
			const stderr = [];

			const lintingProcess = childProcess.exec(setup.command, setup.options);

			lintingProcess.stdout?.on('data', (/** @type {string} */data) => {
				stdout.push(data);
			});

			lintingProcess.stderr?.on('data', (/** @type {string} */data) => {
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
 * @param {TaskSetup} setup - The task execution setup.
 * @returns {string} The title of the job with a leading line-break and two trailing line-breaks.
 */
function getJobTitle (setup) {
	/** @type {string} */
	const additionalArgumentString = Object.entries(setup.config).map(([name, values]) => (Array.isArray(values) ? values.map((value) => (value === true ? `--${name}` : `--${name}="${value}"`)).join(' ') : '')).join(' ');

	return `\n[lint ${setup.taskName}${(additionalArgumentString.length > 0 ? ` ${additionalArgumentString}` : '')}] ${setup.command}\n`;
}
