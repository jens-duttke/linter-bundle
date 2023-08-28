/**
 * @file Ensures that the installed dependencies of the project matches to the versions used by the linter-bundle.
 *
 * @see https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides
 * @see https://classic.yarnpkg.com/en/docs/selective-version-resolutions/
 */

const fs = require('node:fs');
const path = require('node:path');

/** @typedef {{ name: string; configuredVersion: string; expectedVersion: string; }} Dependency */

/**
 * Detects if installed versions of dependencies don't match to the required dependencies.
 *
 * @public
 * @returns {Dependency[]} An array of missing overrides (=wrong versions).
 */
function findMissingOverrides () {
	const linterBundleDependencies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')).dependencies;

	const result = [];

	for (const [name, expectedVersion] of Object.entries(linterBundleDependencies)) {
		let dependencyPackageJson;

		try {
			dependencyPackageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'node_modules', name, 'package.json'), 'utf8'));
		}
		catch {
			// If the file does not exist, we ignore it, because in this case it's most likely a linter-bundle-only dependency.
			continue;
		}

		if (dependencyPackageJson.version !== expectedVersion) {
			result.push({
				name,
				configuredVersion: dependencyPackageJson.version,
				expectedVersion
			});
		}
	}

	return result;
}

module.exports = {
	findMissingOverrides
};
