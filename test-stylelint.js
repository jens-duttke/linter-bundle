/**
 * @file Ensures that the Stylelint configuration is valid.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { runProcess } from './helper/run-process.js';

process.exitCode = (await runTest() ? 0 : 1);

/**
 * Run some tests against the Stylelint configuration, to ensure that everything works as expected.
 *
 * Beside that it ensures that stylelint options are valid by checking the `invalidOptionWarnings` property of the JSON response.
 *
 * @returns {Promise<boolean>} `true` if everything works as expected, `false` if an error occurred
 */
async function runTest () {
	const temporaryPath = path.join(os.tmpdir(), 'linter-bundle-');

	const folder = fs.mkdtempSync(temporaryPath);

	const tempFilePath = path.join(folder, 'tmp.scss');
	const tempModuleFilePath = path.join(folder, 'tmp.module.scss');

	fs.writeFileSync(tempFilePath, `// Some test code
$box-shadow-color: #fff; // stylelint-disable-line color-no-hex -- The initial value must be a hex-color
$border-bottom: 10px;
$box-shadow-size: 2px;

@function custom-makelongshadow ($color, $size) {
	$val: 5px 0 0 $size $color !default;

	@for $i from 6 through 2 {
		$val: #{$val}, ($i * 1px) 0 0 $size #{$color};
	}

	@return $val;
}

@property --color {
	syntax: "<color>";
	inherits: false;
	initial-value: #f00; // stylelint-disable-line color-no-hex -- The initial value must be a hex-color
}

.test, { // stylelint-disable-line plugin/stylelint-selector-no-empty -- Ensure this throws an error which can be suppressed here.
	grid-template-areas:
		(
			"a1"
			"a2"
			"a3"
		);

	border: 1px solid var(--color);
	border-bottom: 1px dotted $border-bottom;

	box-shadow: custom-makelongshadow($box-shadow-color, $box-shadow-size);

	color: var(--color);
}

.test {
	&,
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
}
`, 'utf8');

	fs.writeFileSync(tempModuleFilePath, `// Some test code for CSS modules
.img {
	> a,
	+ a,
	~ a {
		font-weight: 700;
	}

	span { // stylelint-disable-line plugin/selector-tag-no-without-class -- Ensure this throws an error which can be suppressed here.
		font-weight: 400;
	}
}

div > span { // stylelint-disable-line plugin/selector-tag-no-without-class -- Ensure this throws an error which can be suppressed here.
	font-weight: 300;
}
`, 'utf8');

	const result = await runProcess(`stylelint -f json "${tempFilePath}" "${tempModuleFilePath}"`);

	fs.unlinkSync(tempFilePath);
	fs.unlinkSync(tempModuleFilePath);

	try {
		/**
		 * @type {import('stylelint').LintResult[]}
		 */
		const lintResults = JSON.parse(result.stderr);

		const warningMessages = [];
		const optionWarningMessages = [];

		for (const lintResult of lintResults) {
			const { invalidOptionWarnings, source, warnings } = lintResult;

			for (const warning of warnings) {
				warningMessages.push(`[${(source ?? 'unknown')} line ${warning.line}] ${warning.text}`);
			}

			for (const invalidOptionWarning of invalidOptionWarnings) {
				optionWarningMessages.push(invalidOptionWarning.text);
			}
		}

		if (warningMessages.length > 0) {
			process.stderr.write(`Warnings:\n\n- ${warningMessages.join('\n- ')}\n`);

			return false;
		}

		if (optionWarningMessages.length > 0) {
			process.stderr.write(`Invalid stylelint configuration:\n\n- ${optionWarningMessages.join('\n- ')}\n`);

			return false;
		}
	}
	catch {
		process.stdout.write(result.stdout);
		process.stderr.write(result.stderr);

		return false;
	}

	return true;
}
