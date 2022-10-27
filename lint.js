#!/usr/bin/env node

/**
 * @file Entry point of the linter-bundle.
 */

const path = require('path');
const tty = require('tty');

const micromatch = require('micromatch');

const { findMissingOverrides } = require('./helper/find-missing-overrides.js');
const { isNpmOrYarn } = require('./helper/is-npm-or-yarn.js');
const { runProcess } = require('./helper/run-process.js');
const { validatePackageOverrides } = require('./helper/validate-package-overrides.js');

/** @typedef {import('./helper/run-process').ProcessResult} ProcessResult */
/** @typedef {{ taskName: string; config: Partial<Record<string, (string | true)[]>>; }} TaskNameAndConfig */
/** @typedef {TaskNameAndConfig & { command: string; options?: import('child_process').ExecOptions; }} TaskSetup */
/** @typedef {{ jobTitle: string; taskSetup: TaskSetup; job: Promise<ProcessResult>; }} Job */

const isTerminal = tty.isatty(1);

void (async () => {
	const npmOrYarn = isNpmOrYarn();

	if (!validateEnvironment(npmOrYarn)) {
		return;
	}

	/** @type {{ diff: Promise<ProcessResult>; modified: Promise<ProcessResult>; deleted: Promise<ProcessResult>; } | undefined} */
	let gitFilesProcessPromise;
	/** @type {string[] | undefined} */
	let gitFiles;

	/** @type {Job[]} */
	const jobs = await Promise.all(getTasksToRun(process.argv.splice(2)).map(async ({ taskName, config }) => {
		if (config['git']) {
			if (!gitFilesProcessPromise) {
				gitFilesProcessPromise = {
					// Returns changed files, also stashed and commited
					diff: runProcess('git diff --name-only -z @{upstream}'),
					// Returns unstashed files (including deleted)
					modified: runProcess('git ls-files -o -m --exclude-standard --full-name --deduplicate -z'),
					// Returns unstashed, deleted files - @todo Is there a way to also get a list of deleted stashed/commited files?
					deleted: runProcess('git ls-files -d --exclude-standard --full-name --deduplicate -z')
				};
			}

			const gitProcessResult = {
				diff: await gitFilesProcessPromise.diff,
				modified: await gitFilesProcessPromise.modified,
				deleted: await gitFilesProcessPromise.deleted
			};

			if (!gitFiles) {
				const deletedFiles = gitProcessResult.deleted.stdout.trim().split('\0');

				gitFiles = [
					...gitProcessResult.diff.stdout.trim().split('\0'),
					...gitProcessResult.modified.stdout.trim().split('\0')
				].filter((file, index, self) => !deletedFiles.includes(file) && self.indexOf(file) === index);
			}
		}

		switch (taskName) {
			case 'tsc':
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- This is not a valid `tsc` property, so  we need to remove it.
				delete config['git'];

				return runTask({
					taskName,
					config,
					command: [`node "${require.resolve('typescript/bin/tsc')}" --skipLibCheck --noEmit`, ...(config['tsconfig']?.[0] ? [`--project ${config['tsconfig'][0]}`] : [])].join(' ')
				});

			case 'ts': {
				const tsconfig = config['tsconfig']?.[0];

				const includes = getIncludes(gitFiles, './**/*.{js,jsx,ts,tsx}', config);

				if (!includes) {
					return generateDummyJobOutput(taskName, config, {
						stderr: 'No relevant files for ESLint changed.'
					});
				}

				return runTask({
					taskName,
					command: [
						'node',
						`"${path.join(path.dirname(require.resolve('eslint')), '../bin/eslint.js')}"`,
						includes,
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

			case 'sass': {
				const includes = getIncludes(gitFiles, 'src/**/*.scss', config);

				if (!includes) {
					return generateDummyJobOutput(taskName, config, {
						stderr: 'No relevant files for Stylelint changed.'
					});
				}

				return runTask({
					taskName,
					config,
					command: `node "${require.resolve('stylelint/bin/stylelint.js')}" ${includes} --formatter unix`
				});
			}

			case 'md': {
				const includes = getIncludes(gitFiles, '**/*.md', config);

				if (!includes) {
					return generateDummyJobOutput(taskName, config, {
						stderr: 'No relevant files for Markdownlint changed.'
					});
				}

				return runTask({
					taskName,
					config,
					command: `node "${require.resolve('markdownlint-cli/markdownlint.js')}" ${includes} --ignore node_modules`
				});
			}

			case 'audit':
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- This is not a valid `audit` property, so  we need to remove it.
				delete config['git'];

				if (npmOrYarn === 'npm') {
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
				else if (npmOrYarn === 'yarn') {
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

				return generateDummyJobOutput(taskName, config, {
					code: 1,
					stderr: 'Neither a "package-lock.json" nor a "yarn.lock" have need found.'
				});

			default:
		}

		throw new Error(`"${taskName}" is not a valid task.`);
	}));

	const totalStartTimestamp = performance.now();
	let showTimingForAllJobs = true;

	for (const { jobTitle, taskSetup, job } of jobs) {
		process.stdout.write(jobTitle);

		// eslint-disable-next-line no-await-in-loop -- Replace by `for await (const { ... } of jobs) {` as soon as Node.js supports it
		const { code, stdout, stderr, runtime } = await job;

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

		if (taskSetup.config['timing']) {
			process.stdout.write(`\nJob finished after ${((runtime) / 1000).toFixed(1)}s\n`);
		}
		else {
			showTimingForAllJobs = false;
		}

		if (process.exitCode === undefined || code > process.exitCode) {
			process.exitCode = code;
		}
	}

	if (showTimingForAllJobs) {
		process.stdout.write(`\nTask finished after ${((performance.now() - totalStartTimestamp) / 1000).toFixed(1)}s\n`);
	}

	process.stdout.write('\n');
})();

/**
 * Ensures that the environment in which the linter is running has the correct versions of the required dependencies.
 *
 * @param {ReturnType<isNpmOrYarn>} npmOrYarn - This should be the return value of `isNpmOrYarn()`.
 * @returns {boolean} Returns `true` if the environment is valid, otherwise `false` is returned.
 */
function validateEnvironment (npmOrYarn) {
	const outdatedOverrides = validatePackageOverrides();

	if (outdatedOverrides.overrides.length > 0 || outdatedOverrides.resolutions.length > 0) {
		if (outdatedOverrides.overrides.length > 0) {
			process.stderr.write(`Outdated "overrides" in package.json detected:\n- ${outdatedOverrides.overrides.map((dependency) => `${dependency.name}: ${dependency.configuredVersion} is configured, but ${dependency.expectedVersion} is expected`).join('\n- ')}\n\n`);
		}

		if (outdatedOverrides.resolutions.length > 0) {
			process.stderr.write(`Outdated "resolutions" in package.json detected:\n- ${outdatedOverrides.resolutions.map((dependency) => `${dependency.name}: ${dependency.configuredVersion} is configured, but ${dependency.expectedVersion} is expected`).join('\n- ')}\n\n`);
		}

		process.exitCode = 1;

		return false;
	}

	const missingOverrides = findMissingOverrides().filter(({ name }) => !(npmOrYarn === 'npm' && outdatedOverrides.overrides.some((override) => name === override.name)) && !(npmOrYarn === 'yarn' && outdatedOverrides.resolutions.some((override) => name === override.name)));

	if (missingOverrides.length > 0) {
		let installCommand;
		let propertyName;

		if (npmOrYarn === 'yarn') {
			installCommand = 'yarn install';
			propertyName = 'resolutions';
		}
		else {
			installCommand = 'npm install';
			propertyName = 'overrides';
		}

		process.stderr.write(`The installed version of ${missingOverrides.length === 1 ? 'one dependency' : `${missingOverrides.length} dependencies`} does not match to the version required by the linter-bundle:\n`);
		process.stderr.write(`- ${missingOverrides.map((dependency) => `${dependency.name}: ${dependency.configuredVersion} is installed, but ${dependency.expectedVersion} is expected`).join('\n- ')}\n\n`);
		process.stderr.write(`This could be caused by forgetting to execute \`${installCommand}\` after changing a version number in the package.json, or by some other package shipping outdated versions of the ${missingOverrides.length === 1 ? 'dependency' : 'dependencies'}.\n`);
		process.stderr.write('If another package is causing this problem, you can fix it by adding the following entry to your package.json:\n');
		process.stderr.write(`{\n  "${propertyName}: {\n    ${missingOverrides.map((dependency) => `"${dependency.name}": "${dependency.expectedVersion}"`).join(',\n    ')}\n  }\n}\n\n`);

		process.exitCode = 1;

		return false;
	}

	return true;
}

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
 * Returns a list of changed files, based on the Git-diff result and the glob pattern to be used in the command-line.
 *
 * @param {string[] | undefined} list - File list
 * @param {string} pattern - Glob pattern
 * @param {Partial<Record<string, (string | true)[]>>} config - Linter configuration
 * @returns {string} Space-separated file names in double-quotes to be used in the command-line, or an empty string if no file matches.
 */
function getIncludes (list, pattern, config) {
	const include = config['include']?.[0];

	let includedFiles = [typeof include === 'string' ? include : pattern];

	if (config['git'] && list) {
		includedFiles = micromatch(list, includedFiles);

		if (includedFiles.length === 0) {
			return '';
		}
	}

	return `"${includedFiles.join('" "')}"`;
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
		job: runProcess(setup.command, setup.options)
	};
}

/**
 * Returns a job configuration which does not run any task, but just returns the given `output`.
 *
 * @param {string} taskName - The name of the task.
 * @param {Partial<Record<string, (string | true)[]>>} config - The configuratino of the task.
 * @param {{ code?: number; stdout?: string; stderr?: string; }} output - The output which should be returned as result of the job.
 * @returns {Job} Job
 */
function generateDummyJobOutput (taskName, config, output) {
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
			code: 0,
			stdout: '',
			stderr: '',
			runtime: 0,
			...output
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
