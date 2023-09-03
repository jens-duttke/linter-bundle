/**
 * @file Handling of changed files from Git.
 */

import { runProcess } from './run-process.js';

/** @typedef {import('./run-process.js').ProcessResult} ProcessResult */

/** @type {{ diff: Promise<ProcessResult>; modified: Promise<ProcessResult>; deleted: Promise<ProcessResult>; } | undefined} */
let gitFilesProcessPromise;
/** @type {string[] | undefined} */
let gitFiles;

/**
 * Returns a list of changed files based on Git.
 *
 * @public
 * @returns {Promise<string[]>} The list of changed files.
 */
export async function getGitFiles () {
	if (!gitFilesProcessPromise) {
		gitFilesProcessPromise = {
			// Returns changed files, also stashed and committed
			diff: runProcess('git diff --name-only -z @{upstream}'),
			// Returns unstashed files (including deleted)
			modified: runProcess('git ls-files -o -m --exclude-standard --full-name --deduplicate -z'),
			// Returns unstashed, deleted files - @todo Is there a way to also get a list of deleted stashed/committed files?
			deleted: runProcess('git ls-files -d --exclude-standard --full-name --deduplicate -z')
		};
	}

	const gitProcessResult = {
		diff: await gitFilesProcessPromise.diff,
		modified: await gitFilesProcessPromise.modified,
		deleted: await gitFilesProcessPromise.deleted
	};

	if (!gitFiles) {
		const deletedFiles = gitProcessResult.deleted.stdout.trim().split('\0');

		gitFiles = [
			...gitProcessResult.diff.stdout.trim().split('\0'),
			...gitProcessResult.modified.stdout.trim().split('\0')
		].filter((file, index, self) => !deletedFiles.includes(file) && self.indexOf(file) === index);
	}

	return gitFiles;
}
