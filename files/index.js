/**
 * @file Ensures that only files which match given glob patterns are part of the project.
 */

/* eslint-disable no-console -- We are using `console.error` to log errors into the terminal. */

const fs = require('node:fs');
const path = require('node:path');

const micromatch = require('micromatch');

const config = require('../helper/config.js');

const restrictions = config.files?.restrictions;

if (Array.isArray(restrictions)) {
	let noOfErrors = 0;

	const argFiles = process.argv.splice(2).map((filePath) => path.join(process.cwd(), filePath));

	/**
	 * Reports the error to the `console` and increase the error counter.
	 *
	 * @param {string} filePath - Path to the file which is not allowed
	 * @returns {void}
	 */
	const report = (filePath) => {
		console.error(`Disallowed filename "${filePath}"`);

		noOfErrors++;
	};

	for (const { basePath, allowed, disallowed } of restrictions) {
		const absoluteBasePath = path.join(process.cwd(), basePath);

		const files = (argFiles.length > 0 ? argFiles.filter((filePath) => !path.relative(absoluteBasePath, filePath).startsWith('..')) : getFiles(absoluteBasePath));

		for (const filePath of files) {
			const normalizedFilePath = path.relative(absoluteBasePath, filePath);

			if (allowed && !disallowed) {
				if (!micromatch.isMatch(normalizedFilePath, allowed, { dot: true })) {
					report(normalizedFilePath);

					continue;
				}
			}
			else if (!allowed && disallowed) {
				if (micromatch.isMatch(normalizedFilePath, disallowed, { dot: true })) {
					report(normalizedFilePath);

					continue;
				}
			}
			else if (allowed && disallowed) {
				if (
					micromatch.isMatch(normalizedFilePath, disallowed, { dot: true }) ||
					!micromatch.isMatch(normalizedFilePath, allowed, { dot: true })
				) {
					report(normalizedFilePath);

					continue;
				}
			}
		}
	}

	if (noOfErrors > 0) {
		console.error(`\nFound ${noOfErrors} disallowed file${(noOfErrors !== 0 ? 's' : '')}`);

		process.exitCode = -1;
	}
}

/**
 * Returns a list of all files within a given directory.
 *
 * @param {string} directory - Base directory for the file search
 * @param {string[]} [files] - List of files which are already found (is this parameter unset for the initial call)
 * @returns {string[]} List of files which have been found
 */
function getFiles (directory, files = []) {
	const fileList = fs.readdirSync(directory);

	for (const file of fileList) {
		const name = `${directory}/${file}`;

		if (fs.statSync(name).isDirectory()) {
			getFiles(name, files);
		}
		else {
			files.push(name);
		}
	}

	return files;
}
