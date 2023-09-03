/**
 * @file Ensures that only files which match given glob patterns are part of the project.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import micromatch from 'micromatch';

import { linterBundleConfig } from '../helper/linter-bundle-config.js';

const restrictions = linterBundleConfig.files?.restrictions;
const matcherOptions = { dot: true };

if (Array.isArray(restrictions)) {
	let noOfDisallowedFiles = 0;

	const argFiles = process.argv.splice(2).map((filePath) => path.join(process.cwd(), filePath));

	/**
	 * Reports the error to the `console` and increase the error counter.
	 *
	 * @param {string} filePath - Path to the file which is not allowed
	 * @returns {void}
	 */
	const report = (filePath) => {
		process.stderr.write(`Disallowed filename "${filePath}"\n`);

		noOfDisallowedFiles++;
	};

	/**
	 * Reports the error to the `console` and increase the error counter.
	 *
	 * @param {[string, (str: string) => boolean][]} matchers - Array of micromatch matchers
	 * @param {string} filePath - Path to the file to check
	 * @returns {string | undefined} On match returns the matching pattern, otherwise `undefined`
	 */
	const isMatch = (matchers, filePath) => {
		for (const [pattern, matcher] of matchers) {
			if (matcher(filePath)) {
				return pattern;
			}
		}

		return;
	};

	for (const { basePath, allowed, disallowed } of restrictions) {
		const absoluteBasePath = path.join(process.cwd(), basePath);

		const files = (argFiles.length > 0 ? argFiles.filter((filePath) => !path.relative(absoluteBasePath, filePath).startsWith('..')) : getFiles(absoluteBasePath));

		const allowedMatchers = allowed?.map((pattern) => /** @type {[string, (str: string) => boolean]} */([pattern, micromatch.matcher(pattern, matcherOptions)]));
		const disallowedMatchers = disallowed?.map((pattern) => /** @type {[string, (str: string) => boolean]} */([pattern, micromatch.matcher(pattern, matcherOptions)]));

		const unmatchedAllowedPatterns = new Set(allowed);

		for (const filePath of files) {
			const normalizedFilePath = path.relative(absoluteBasePath, filePath);

			if (allowedMatchers && !disallowedMatchers) {
				const pattern = isMatch(allowedMatchers, normalizedFilePath);

				if (pattern) {
					unmatchedAllowedPatterns.delete(pattern);
				}
				else {
					report(normalizedFilePath);
				}
			}
			else if (!allowedMatchers && disallowedMatchers) {
				if (isMatch(disallowedMatchers, normalizedFilePath)) {
					report(normalizedFilePath);
				}
			}
			else if (allowedMatchers && disallowedMatchers) {
				const pattern = isMatch(allowedMatchers, normalizedFilePath);

				if (pattern) {
					unmatchedAllowedPatterns.delete(pattern);
				}
				else if (isMatch(disallowedMatchers, normalizedFilePath)) {
					report(normalizedFilePath);
				}
			}
		}

		if (unmatchedAllowedPatterns.size > 0) {
			for (const [pattern] of unmatchedAllowedPatterns.entries()) {
				process.stderr.write(`Unmatched "allowed" pattern: "${pattern}"\n`);
			}
		}
	}

	if (noOfDisallowedFiles > 0) {
		process.stderr.write(`\nFound ${noOfDisallowedFiles} disallowed file${(noOfDisallowedFiles !== 0 ? 's' : '')}\n`);

		process.exitCode = -1;
	}
}
else {
	process.stderr.write('No file restrictions found\n');

	process.exitCode = -1;
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
