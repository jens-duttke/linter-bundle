#!/usr/bin/env node

/* eslint-disable node/no-process-exit */

const childProcess = require('child_process');

const jobs = getTasksToRun(process.argv.splice(2)).map(async ({ taskName, config }) => {
	switch (taskName) {
		case 'tsc':
			return runTask({
				taskName,
				config,
				command: [`node "${require.resolve('typescript/bin/tsc')}" --skipLibCheck --noEmit`, ...(config.tsconfig?.[0] ? [`--project ${config.tsconfig[0]}`] : [])].join(' ')
			});

		case 'ts':
			return runTask({
				taskName,
				command: `node "${require.resolve('eslint/bin/eslint.js')}" ${config.include?.[0] ?? '"./**/*.{js,jsx,ts,tsx}"'}${config.exclude?.map((exclude) => ` --ignore-pattern ${exclude}`).join(' ') ?? ''} --format unix --resolve-plugins-relative-to "${__dirname}"`,
				config,
				options: {
					env: {
						TIMING: 10,
						TSCONFIG: config.tsconfig?.[0]
					}
				}
			});

		case 'sass':
			return runTask({
				taskName,
				config,
				command: `node "${require.resolve('stylelint/bin/stylelint.js')}"  "src/**/*.scss" --formatter unix`
			});

		case 'md':
			return runTask({
				taskName,
				config,
				command: `node "${require.resolve('markdownlint-cli/markdownlint.js')}"  **/*.md --ignore node_modules`
			});

		case 'audit':
			return runTask({
				taskName,
				config,
				command: 'npm audit --production --audit-level=moderate'
			});

		default:
	}

	return Promise.reject(new Error(`"${taskName}" is not a valid task.`));
});

/*
void Promise.all(jobs)
	.then((results) => {
		process.exitCode = Math.max(
			...results.map(({ code, stdout, stderr }) => {
				if (stdout) {
					process.stdout.write(stdout);
				}

				if (stderr) {
					process.stderr.write(stderr);
				}

				return code;
			})
		);

		process.exit();
	});
*/

void (async () => {
	for (const job of jobs) {
		// eslint-disable-next-line no-await-in-loop -- Replace by `for await (const { ... } of jobs) {` as soon as Node.js supports it
		const { code, stdout, stderr } = await job;

		if (stdout) {
			process.stdout.write(stdout);
		}

		if (stderr) {
			process.stderr.write(stderr);
		}

		if (code > process.exitCode) {
			process.exitCode = code;
		}
	}
})();

/**
 * @param {string[]} argv
 * @returns {{ taskName: string; config: Partial<Record<string, (string | true)[]>>; }[]}
 */
function getTasksToRun (argv) {
	const TASKS = new Set(['tsc', 'ts', 'sass', 'md', 'audit']);
	const ARG_REGEXP = /^--([^=]+)(?:=(.+))?$/u;

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

		if (normalizedName in currentTask.config) {
			currentTask.config[normalizedName].push(value);
		}
		else {
			currentTask.config[normalizedName] = [value];
		}
	}

	return TasksToRun;
}

/**
 * @param {{ taskName: string; config: Record<string, (string | true)[]>; command: string; options?: import('child_process').ExecOptions; }} setup
 * @returns {Promise<{ code: number; stdout: string; stderr: string; }>} Exit code
 */
async function runTask (setup) {
	return new Promise((resolve) => {
		const additionalArgumentString = Object.entries(setup.config).map(([name, values]) => (Array.isArray(values) ? values.map((value) => (value === true ? `--${name}` : `--${name}="${value}"`)).join(' ') : '')).join(' ');

		const stdout = [`\n[lint ${setup.taskName}${(additionalArgumentString.length > 0 ? ` ${additionalArgumentString}` : '')}] ${setup.command}\n\n`];
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
	});
}
