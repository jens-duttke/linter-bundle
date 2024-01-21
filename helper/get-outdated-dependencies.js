/**
 * @file Ensures that the installed dependencies of the project matches to the versions used by the linter-bundle.
 *
 * @see https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides
 * @see https://classic.yarnpkg.com/en/docs/selective-version-resolutions/
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** @typedef {{ name: string; configuredVersion: string; expectedVersion: string; }} Dependency */

/**
 * Detects if installed versions of dependencies don't match to the required dependencies.
 *
 * @public
 * @returns {Promise<Dependency[]>} An array of missing overrides (=wrong versions)
 */
export async function getOutdatedDependencies () {
	const linterBundleDependencies = JSON.parse(await fs.readFile(path.resolve(dirname, '../package.json'), 'utf8')).dependencies;

	const outdatedDependencies = await Promise.all(Object.entries(linterBundleDependencies).map(async ([name, expectedVersion]) => {
		let dependencyPackageJson;

		try {
			dependencyPackageJson = JSON.parse(await fs.readFile(path.join(process.cwd(), 'node_modules', name, 'package.json'), 'utf8'));
		}
		catch {
			// If the file does not exist, we ignore it, because in this case it's most likely a linter-bundle-only dependency.
			return;
		}

		if (dependencyPackageJson.version !== expectedVersion) {
			return {
				name,
				configuredVersion: dependencyPackageJson.version,
				expectedVersion
			};
		}

		return;
	}));

	return /** @type {Dependency[]} */(outdatedDependencies.filter((dependency) => dependency !== undefined));
}
