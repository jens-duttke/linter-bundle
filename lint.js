#!/usr/bin/env node

/* eslint-disable node/no-process-exit */

const childProcess = require('child_process');

const ARG_REGEXP = /^--([^=]+)(?:=(.+))?$/u;

const taskName = process.argv[2];

const additionalArgs = Object.fromEntries(process.argv.splice(3).map((argument) => {
	const [, name, value = true] = ARG_REGEXP.exec(argument) ?? [];

	return [name.toLowerCase(), value];
}));

const TASKS = {
	tsc: {
		command: ['tsc --skipLibCheck --noEmit', ...(additionalArgs.tsconfig ? [`--project ${additionalArgs.tsconfig}`] : [])].join(' ')
	},
	ts: {
		command: `node "${require.resolve('eslint/bin/eslint.js')}" . --ext .ts,.tsx,.js --format unix --cache --resolve-plugins-relative-to "${__dirname}"`,
		options: {
			env: {
				TIMING: 10,
				TSCONFIG: additionalArgs.tsconfig
			}
		}
	},
	sass: {
		command: `node "${require.resolve('stylelint/bin/stylelint.js')}"  "src/**/*.scss" --formatter unix`
	},
	md: {
		command: `node "${require.resolve('markdownlint-cli/markdownlint.js')}"  **/*.md --ignore node_modules`
	},
	audit: {
		command: 'npm audit --production --audit-level=moderate'
	}
};

if (!(taskName in TASKS)) {
	throw new Error(`"${taskName}" is not a valid task.`);
}

/** @type {{ command: string; options: { env: Record<string, unknown>; }; }} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { command, options } = TASKS[taskName];

process.stdout.write(`\n[lint ${taskName}] ${command}\n\n`);

const lintingProcess = childProcess.exec(command, options);
lintingProcess.stdout.pipe(process.stdout);
lintingProcess.stderr.pipe(process.stderr);
lintingProcess.on('exit', (code) => process.exit(code));
