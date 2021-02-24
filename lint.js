#!/usr/bin/env node

/* eslint-disable node/no-process-exit */

const childProcess = require('child_process');

const ARG_REGEXP = /^--([^=]+)(?:=(.+))?$/u;

const taskName = process.argv[2];

/** @type {Record<string, (string | true)[] | undefined>} */
const additionalArguments = {};

for (const argument of process.argv.splice(3)) {
	const [, name, value = true] = ARG_REGEXP.exec(argument) ?? [];

	const normalizedName = name.toLowerCase();

	if (normalizedName in additionalArguments) {
		additionalArguments[normalizedName].push(value);
	}
	else {
		additionalArguments[normalizedName] = [value];
	}
}

const TASKS = {
	tsc: {
		command: ['tsc --skipLibCheck --noEmit', ...(additionalArguments.tsconfig?.[0] ? [`--project ${additionalArguments.tsconfig[0]}`] : [])].join(' ')
	},
	ts: {
		command: `node "${require.resolve('eslint/bin/eslint.js')}" ${additionalArguments.include?.[0] ?? '"./**/*.{js,jsx,ts,tsx}"'}${additionalArguments.exclude?.map((exclude) => ` --ignore-pattern ${exclude}`).join(' ') ?? ''} --format unix --cache --resolve-plugins-relative-to "${__dirname}"`,
		options: {
			env: {
				TIMING: 10,
				TSCONFIG: additionalArguments.tsconfig?.[0]
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

process.stdout.write(`\n[lint ${taskName}${(additionalArguments.length > 0 ? ` ${Object.entries(additionalArguments).map(([name, values]) => values.map((value) => (value === true ? `--${name}` : `--${name}="${value}"`)).join(' ')).join(' ')}` : '')}] ${command}\n\n`);

const lintingProcess = childProcess.exec(command, options);
lintingProcess.stdout.pipe(process.stdout);
lintingProcess.stderr.pipe(process.stderr);
lintingProcess.on('exit', (code) => process.exit(code));
