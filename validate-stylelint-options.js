/**
 * @file Ensures that stylelint options are valid by checking the `invalidOptionWarnings` property of the JSON response.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

const { runProcess } = require('./helper/run-process.js');

void (async () => {
	const temporaryPath = path.join(os.tmpdir(), 'linter-bundle-');

	const folder = fs.mkdtempSync(temporaryPath);

	const tempFilePath = path.join(folder, 'tmp.scss');

	fs.writeFileSync(tempFilePath, '* {\n\tborder: 1px solid var(--color);\n\n\tcolor: var(--color);\n}\n', 'utf8');

	const result = await runProcess(`stylelint -f json "${tempFilePath}"`);

	fs.unlinkSync(tempFilePath);

	if (result.stderr) {
		process.stderr.write(result.stderr);

		process.exitCode = 1;

		return;
	}

	/**
	 * @type {import('stylelint').LintResult}
	 */
	const { invalidOptionWarnings, warnings } = JSON.parse(result.stdout)[0];

	if (warnings.length > 0) {
		process.stderr.write(warnings.join('\n'));

		process.exitCode = 1;

		return;
	}

	if (invalidOptionWarnings.length > 0) {
		process.stderr.write(`Invalid stylelint configuration:\n\n- ${invalidOptionWarnings.map(({ text }) => text).join('\n- ')}`);

		process.exitCode = 1;

		return;
	}
})();
