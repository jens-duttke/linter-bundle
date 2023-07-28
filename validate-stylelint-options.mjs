/**
 * @file Ensures that stylelint options are valid by checking the `invalidOptionWarnings` property of the JSON response.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { runProcess } from './helper/run-process.js';

process.exitCode = await (async () => {
	const temporaryPath = path.join(os.tmpdir(), 'linter-bundle-');

	const folder = fs.mkdtempSync(temporaryPath);

	const tempFilePath = path.join(folder, 'tmp.scss');

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
`, 'utf8');

	const result = await runProcess(`stylelint -f json "${tempFilePath}"`);

	fs.unlinkSync(tempFilePath);

	if (result.stderr) {
		process.stderr.write(result.stderr);

		return 1;
	}

	/**
	 * @type {import('stylelint').LintResult}
	 */
	const { invalidOptionWarnings, warnings } = JSON.parse(result.stdout)[0];

	if (warnings.length > 0) {
		process.stderr.write(`Warnings:\n\n- ${warnings.map(({ text, line }) => `[line ${line}] ${text}`).join('\n- ')}\n`);

		return 1;
	}

	if (invalidOptionWarnings.length > 0) {
		process.stderr.write(`Invalid stylelint configuration:\n\n- ${invalidOptionWarnings.map(({ text }) => text).join('\n- ')}\n`);

		return 1;
	}

	return 0;
})();
