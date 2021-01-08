#!/usr/bin/env node

const childProcess = require('child_process');
const { sync: resolveBin } = require('resolve-bin');

let lintingProcess;
const taskName = process.argv[2];

process.stdout.write(`\n> lint ${taskName}\n\n`);

switch (taskName) {
	case 'tsc':
		lintingProcess = childProcess.exec('tsc --skipLibCheck');
		break;

	case 'ts':
		lintingProcess = childProcess.exec(`node "${resolveBin('eslint')}" . --ext .ts,.tsx,.js --format unix`, {
			env: {
				TIMING: 10
			}
		});
		break;

	case 'sass':
		lintingProcess = childProcess.exec(`node "${resolveBin('stylelint')}"  "src/**/*.scss" --formatter unix --report-needless-disables --report-invalid-scope-disables --report-descriptionless-disables`);
		break;

	case 'md':
		lintingProcess = childProcess.exec(`node "${resolveBin('markdownlint-cli', { executable: 'markdownlint' })}"  **/*.md --ignore node_modules`);
		break;

	case 'audit':
		lintingProcess = childProcess.exec('npm audit --production --audit-level=moderate');
		break;

	default:
		throw new Error(`"${taskName}" is not a valid task.`)
}

lintingProcess.stdout.pipe(process.stdout);
lintingProcess.stderr.pipe(process.stderr);
lintingProcess.on('exit', (code) => process.exit(code));
