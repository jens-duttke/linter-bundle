#!/usr/bin/env node

/**
 * @file Entry point of the linter-bundle.
 */

const path = require('node:path');
const tty = require('node:tty');

const micromatch = require('micromatch');

const config = require('./helper/config.js');
const { findMissingOverrides } = require('./helper/find-missing-overrides.js');
const { getGitFiles } = require('./helper/get-git-files.js');
const { getStylelintPath } = require('./helper/get-stylelint-path.js');
const { isNpmOrYarn } = require('./helper/is-npm-or-yarn.js');
const { runProcess } = require('./helper/run-process.js');
const { validatePackageOverrides } = require('./helper/validate-package-overrides.js');

/** @typedef {'files' | 'tsc' | 'ts' | 'sass' | 'md' | 'audit'} TaskNames */
/** @typedef {Partial<Record<string, (string | boolean)[]>>} TaskConfig */
/** @typedef {import('./helper/run-process').ProcessResult} ProcessResult */
/** @typedef {{ taskName: TaskNames; taskConfig: TaskConfig; }} TaskNameAndConfig */
/** @typedef {TaskNameAndConfig & { command: string; options?: import('child_process').ExecOptions; }} TaskSetup */
/** @typedef {{ jobTitle: string; taskSetup: TaskSetup; job: Promise<ProcessResult>; }} Job */

const isTerminal = tty.isatty(1);

const npmOrYarn = isNpmOrYarn();

void (async () => {
	if (!validateEnvironment()) {
		return;
	}

	/** @type {Job[]} */
	const jobs = await Promise.all(getTasksToRun(process.argv.splice(2)).map(async ({ taskName, taskConfig }) => {
		switch (taskName) {
			case 'files':
				return runFilesTask(taskName, taskConfig);

			case 'tsc':
				return runTypeScriptCompilerTask(taskName, taskConfig);

			case 'ts':
				return runESLintTask(taskName, taskConfig);

			case 'sass':
				return runStylelintTask(taskName, taskConfig);

			case 'md':
				return runMarkdownTask(taskName, taskConfig);

			case 'audit':
				return runAuditTask(taskName, taskConfig);

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

		if (code !== 0 || trimmedError !== '' || getConfigValue(taskSetup.taskName, taskSetup.taskConfig, 'verbose')?.[0]) {
			process.stdout.write('\n');

			if (stdout) {
				process.stdout.write(`${stdout.trim()}\n`);
			}

			if (stderr) {
				process.stderr.write(`${trimmedError}\n`);
			}
		}

		if (code !== 0 && getConfigValue(taskSetup.taskName, taskSetup.taskConfig, 'verbose')?.[0]) {
			if (isTerminal) {
				process.stderr.write(`\n[lint ${taskSetup.taskName}] \u001B[31mProblems detected\u001B[39m\n`);
			}
			else {
				process.stderr.write(`\n[lint ${taskSetup.taskName}] Problems detected\n`);
			}
		}

		if (getConfigValue(taskSetup.taskName, taskSetup.taskConfig, 'timing')?.[0]) {
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
 * Runs the `files` task.
 *
 * @param {TaskNameAndConfig['taskName']} taskName - Name of the task
 * @param {TaskNameAndConfig['taskConfig']} taskConfig - Configuration of the task
 * @returns {Promise<Job>} Job
 */
async function runFilesTask (taskName, taskConfig) {
	const newTaskConfig = {
		include: getConfigValue(taskName, taskConfig, 'include'),
		git: getConfigValue(taskName, taskConfig, 'git')
	};

	const includes = await getIncludes(newTaskConfig, '**');

	if (!includes) {
		return generateDummyJobOutput(taskName, newTaskConfig, {
			stderr: 'No relevant files changed.'
		});
	}

	return runTask({
		taskName,
		taskConfig: newTaskConfig,
		command: `node "${path.resolve(__dirname, './files/index.js')}" ${includes}`
	});
}

/**
 * Runs the `tsc` task.
 *
 * @param {TaskNames} taskName - Name of the task
 * @param {TaskNameAndConfig['taskConfig']} taskConfig - Configuration of the task
 * @returns {Promise<Job>} Job
 */
async function runTypeScriptCompilerTask (taskName, taskConfig) {
	const newTaskConfig = {
		tsconfig: getConfigValue(taskName, taskConfig, 'tsconfig'),
		verbose: getConfigValue(taskName, taskConfig, 'verbose')
	};

	return runTask({
		taskName,
		taskConfig: newTaskConfig,
		command: [
			'node',
			`"${require.resolve('typescript/bin/tsc')}"`,
			'--skipLibCheck',
			'--noEmit',
			(newTaskConfig.tsconfig?.[0] ? `--project ${newTaskConfig.tsconfig[0]}` : undefined),
			(newTaskConfig.verbose?.[0] ? '--verbose' : undefined)
		].filter((argument) => Boolean(argument)).join(' ')
	});
}

/**
 * Runs the `ts` task.
 *
 * @param {TaskNameAndConfig['taskName']} taskName - Name of the task
 * @param {TaskNameAndConfig['taskConfig']} taskConfig - Configuration of the task
 * @returns {Promise<Job>} Job
 */
async function runESLintTask (taskName, taskConfig) {
	const newTaskConfig = {
		tsconfig: getConfigValue(taskName, taskConfig, 'tsconfig'),
		include: getConfigValue(taskName, taskConfig, 'include'),
		exclude: getConfigValue(taskName, taskConfig, 'exclude'),
		git: getConfigValue(taskName, taskConfig, 'git')
	};

	const includes = await getIncludes(newTaskConfig, './**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}');

	if (!includes) {
		return generateDummyJobOutput(taskName, newTaskConfig, {
			stderr: 'No relevant files for ESLint changed.'
		});
	}

	return runTask({
		taskName,
		command: [
			'node',
			`"${path.join(path.dirname(require.resolve('eslint')), '../bin/eslint.js')}"`,
			includes,
			newTaskConfig.exclude?.map((exclude) => `--ignore-pattern ${exclude}`).join(' '),
			`--rulesdir "${path.resolve(__dirname, './eslint/rules/')}"`,
			'--format unix',
			`--resolve-plugins-relative-to "${__dirname}"`
		].filter((argument) => Boolean(argument)).join(' '),
		taskConfig: newTaskConfig,
		options: {
			env: {
				TIMING: '10',
				TSCONFIG: (typeof newTaskConfig.tsconfig?.[0] === 'string' ? newTaskConfig.tsconfig[0] : undefined)
			}
		}
	});
}

/**
 * Runs the `sass` task.
 *
 * @param {TaskNameAndConfig['taskName']} taskName - Name of the task
 * @param {TaskNameAndConfig['taskConfig']} taskConfig - Configuration of the task
 * @returns {Promise<Job>} Job
 */
async function runStylelintTask (taskName, taskConfig) {
	const newTaskConfig = {
		include: getConfigValue(taskName, taskConfig, 'include'),
		git: getConfigValue(taskName, taskConfig, 'git'),
		verbose: getConfigValue(taskName, taskConfig, 'verbose')
	};

	const includes = await getIncludes(newTaskConfig, 'src/**/*.scss');

	if (!includes) {
		return generateDummyJobOutput(taskName, newTaskConfig, {
			stderr: 'No relevant files for Stylelint changed.'
		});
	}

	const stylelintBinPath = getStylelintPath();

	if (stylelintBinPath === null) {
		return generateDummyJobOutput(taskName, newTaskConfig, {
			stderr: 'Stylelint CLI script not found.'
		});
	}

	return runTask({
		taskName,
		taskConfig: newTaskConfig,
		command: [
			'node',
			`"${stylelintBinPath}"`,
			includes,
			(newTaskConfig.verbose?.[0] ? '--verbose' : undefined),
			'--formatter unix'

		].filter((argument) => Boolean(argument)).join(' ')
	});
}

/**
 * Runs the `md` task.
 *
 * @param {TaskNameAndConfig['taskName']} taskName - Name of the task
 * @param {TaskNameAndConfig['taskConfig']} taskConfig - Configuration of the task
 * @returns {Promise<Job>} Job
 */
async function runMarkdownTask (taskName, taskConfig) {
	const newTaskConfig = {
		include: getConfigValue(taskName, taskConfig, 'include'),
		git: getConfigValue(taskName, taskConfig, 'git'),
		verbose: getConfigValue(taskName, taskConfig, 'verbose')
	};

	const includes = await getIncludes(newTaskConfig, '**/*.md');

	if (!includes) {
		return generateDummyJobOutput(taskName, newTaskConfig, {
			stderr: 'No relevant files for Markdownlint changed.'
		});
	}

	return runTask({
		taskName,
		taskConfig: newTaskConfig,
		command: [
			'node',
			`"${require.resolve('markdownlint-cli/markdownlint.js')}"`,
			includes,
			(newTaskConfig.verbose?.[0] ? '--verbose' : undefined),
			'--ignore node_modules'
		].filter((argument) => Boolean(argument)).join(' ')
	});
}

/**
 * Runs the `audit` task.
 *
 * @param {TaskNameAndConfig['taskName']} taskName - Name of the task
 * @param {TaskNameAndConfig['taskConfig']} taskConfig - Configuration of the task
 * @returns {Promise<Job>} Job
 */
async function runAuditTask (taskName, taskConfig) {
	const newTaskConfig = {
		minSeverity: getConfigValue(taskName, taskConfig, 'minSeverity'),
		exclude: getConfigValue(taskName, taskConfig, 'exclude')
	};

	switch (npmOrYarn) {
		case 'npm':
			return runTask({
				taskName,
				taskConfig: newTaskConfig,
				command: [
					'npx',
					'--yes',
					'--',
					'better-npm-audit@1.9.1',
					'audit',
					`-l ${newTaskConfig.minSeverity?.[0] ?? 'moderate'}`,
					'-p',
					newTaskConfig.exclude?.map((exclude) => `-i ${exclude}`).join(' ')
				].filter((argument) => Boolean(argument)).join(' ')
			});

		case 'yarn':
			return runTask({
				taskName,
				taskConfig: newTaskConfig,
				command: [
					'npx',
					'--yes',
					'--',
					'improved-yarn-audit@2.3.3',
					`--min-severity ${newTaskConfig.minSeverity?.[0] ?? 'moderate'}`,
					'--fail-on-missing-exclusions',
					'--ignore-dev-deps',
					newTaskConfig.exclude?.map((exclude) => `--exclude ${exclude}`).join(' ')
				].filter((argument) => Boolean(argument)).join(' ')
			});

		case 'both':
			return generateDummyJobOutput(taskName, newTaskConfig, {
				code: 1,
				stderr: 'A "package-lock.json" and "yarn.lock" have been found. Use only one package manager within the project to avoid potential conflicts.'
			});

		default:
			return generateDummyJobOutput(taskName, newTaskConfig, {
				code: 1,
				stderr: 'Neither a "package-lock.json" nor a "yarn.lock" have been found.'
			});
	}
}

/**
 * Ensures that the environment in which the linter is running has the correct versions of the required dependencies.
 *
 * @returns {boolean} Returns `true` if the environment is valid, otherwise `false` is returned.
 */
function validateEnvironment () {
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
			installCommand = 'npm install --no-package-lock';
			propertyName = 'overrides';
		}

		process.stderr.write(`The installed version of ${missingOverrides.length === 1 ? 'one dependency' : `${missingOverrides.length} dependencies`} does not match to the version required by the linter-bundle:\n`);
		process.stderr.write(`- ${missingOverrides.map((dependency) => `${dependency.name}: ${dependency.configuredVersion} is installed, but ${dependency.expectedVersion} is expected`).join('\n- ')}\n\n`);
		process.stderr.write(`This could be caused by forgetting to execute \`${installCommand}\` after changing a version number in the package.json, or by some other package shipping outdated versions of the ${missingOverrides.length === 1 ? 'dependency' : 'dependencies'}.\n`);
		process.stderr.write('If another package is causing this problem, you can fix it by adding the following entry to your package.json:\n');
		process.stderr.write(`{\n  "${propertyName}": {\n    ${missingOverrides.map((dependency) => `"${dependency.name}": "${dependency.expectedVersion}"`).join(',\n    ')}\n  }\n}\n\n`);

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
	const TASKS = new Set(['tsc', 'ts', 'sass', 'md', 'audit', 'files']);
	const ARG_REGEXP = /^--([^=]+)(?:=(.+))?$/u;

	/** @type {TaskNameAndConfig | null} */
	let currentTask = null;

	/** @type {TaskNameAndConfig[]} */
	const tasksToRun = [];

	/** @type {Record<string, (string | boolean)[]>} */
	const generalConfig = {};

	for (const argument of argv) {
		if (TASKS.has(argument)) {
			currentTask = {
				taskName: /** @type {TaskNames} */(argument),
				taskConfig: { ...generalConfig }
			};

			tasksToRun.push(currentTask);

			continue;
		}

		const [, name, value = true] = /** @type {[string | undefined, string | undefined, string | true | undefined]} */(/** @type {any} */(ARG_REGEXP.exec(argument)) ?? []);

		if (name === undefined) {
			throw new Error(`Unknown argument "${argument}"`);
		}

		// Converts e.g. "MIN-SEVERITY" into "minSeverity"
		const normalizedName = name.toLowerCase().replace(/-./gu, (match) => match[1].toUpperCase());

		if (currentTask === null) {
			if (!(normalizedName in generalConfig)) {
				generalConfig[normalizedName] = [];
			}

			generalConfig[normalizedName].push(value);
		}
		else {
			if (!(normalizedName in currentTask.taskConfig)) {
				currentTask.taskConfig[normalizedName] = [];
			}

			/** @type {(string | boolean)[]} */(currentTask.taskConfig[normalizedName]).push(value);
		}
	}

	return tasksToRun;
}

/**
 * Returns a list of changed files, based on the Git-diff result and the glob pattern to be used in the command-line.
 *
 * @param {TaskConfig} taskConfig - Linter configuration
 * @param {string} pattern - Glob pattern
 * @returns {Promise<string>} Space-separated file names in double-quotes to be used in the command-line, or an empty string if no file matches.
 */
async function getIncludes (taskConfig, pattern) {
	const include = taskConfig['include'];

	let includedFiles = (Array.isArray(include) && include.length > 0 ? /** @type {string[]} */(include.filter((item) => typeof item === 'string')) : [pattern]);

	if (taskConfig['git']?.[0]) {
		const gitFiles = await getGitFiles();

		includedFiles = micromatch(gitFiles, includedFiles);

		if (includedFiles.length === 0) {
			return '';
		}
	}

	return `"${includedFiles.join('" "')}"`;
}

/**
 * Executes a task asynchronously.
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
 * @param {TaskNames} taskName - The name of the task.
 * @param {TaskConfig} taskConfig - The configuration of the task.
 * @param {{ code?: number; stdout?: string; stderr?: string; }} output - The output which should be returned as result of the job.
 * @returns {Job} Job
 */
function generateDummyJobOutput (taskName, taskConfig, output) {
	return {
		jobTitle: getJobTitle({
			taskName,
			taskConfig,
			command: ''
		}),
		taskSetup: {
			taskName,
			taskConfig,
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
	const additionalArgumentString = Object.entries(setup.taskConfig).filter(([, values]) => values !== undefined).map(([name, values]) => (Array.isArray(values) ? values.map((value) => (value === true ? `--${name}` : `--${name}="${value}"`)).join(' ') : '')).join(' ');

	return `\n[lint ${setup.taskName}${(additionalArgumentString.length > 0 ? ` ${additionalArgumentString}` : '')}] ${setup.command}\n`;
}

/**
 * Returns a configuration option value based on the command line arguments and the `.linter-bundle.js` configuration.
 *
 * @param {TaskNames} taskName - Name of the task
 * @param {TaskConfig} taskConfig - Configuration of a task
 * @param {string} optionName - Configuration option name
 * @returns {(string | boolean)[] | undefined} Configuration option value
 */
function getConfigValue (taskName, taskConfig, optionName) {
	if (optionName in taskConfig) {
		return taskConfig[optionName];
	}

	if (taskName in config) {
		const specificConfig = config[/** @type {keyof typeof config} */(taskName)];

		if (typeof specificConfig === 'object' && optionName in specificConfig) {
			// eslint-disable-next-line jsdoc/no-undefined-types -- False positive "The type 'specificConfig' is undefined."
			const configValue = specificConfig[/** @type {keyof typeof specificConfig} */(optionName)];

			if (Array.isArray(configValue)) {
				return configValue;
			}
			else if (typeof configValue === 'boolean' || typeof configValue === 'string') {
				return [configValue];
			}
		}
	}

	if (optionName in config) {
		const configValue = config[/** @type {keyof typeof config} */(optionName)];

		if (Array.isArray(configValue)) {
			return configValue;
		}
		else if (typeof configValue === 'boolean' || typeof configValue === 'string') {
			return [configValue];
		}
	}

	return;
}
