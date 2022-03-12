/**
 * @file Ensures that the "overrides" and "resolutions" of the project where linter-bundle is used, match to the versions used in the linter-bundle itself.
 *
 * @see https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides
 * @see https://classic.yarnpkg.com/en/docs/selective-version-resolutions/
 */

const fs = require('fs');
const path = require('path');

/** @typedef {{ name: string; configuredVersion: string; expectedVersion: string; }} Dependency */

/**
 * Detects outdated "overrides"/"resolutions" dependencies.
 *
 * @returns {{ overrides: Dependency[]; resolutions: Dependency[]; }} Either the input array, or an empty array, if the input array is not an array.
 */
function validatePackageOverrides () {
	const linterBundleDependencies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')).dependencies;
	const projectPackageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));

	const overrides = [];
	const resolutions = [];

	if (typeof projectPackageJson.overrides === 'object' && projectPackageJson.overrides !== null) {
		for (const [name, version] of Object.entries(projectPackageJson.overrides)) {
			if (!(name in linterBundleDependencies)) {
				continue;
			}

			if (version !== linterBundleDependencies[name]) {
				overrides.push({
					name,
					configuredVersion: version,
					expectedVersion: linterBundleDependencies[name]
				});
			}
		}
	}

	if (typeof projectPackageJson.resolutions === 'object' && projectPackageJson.resolutions !== null) {
		for (const [name, version] of Object.entries(projectPackageJson.resolutions)) {
			if (!(name in linterBundleDependencies)) {
				continue;
			}

			if (version !== linterBundleDependencies[name]) {
				resolutions.push({
					name,
					configuredVersion: version,
					expectedVersion: linterBundleDependencies[name]
				});
			}
		}
	}

	return { overrides, resolutions };
}

module.exports = {
	validatePackageOverrides
};
