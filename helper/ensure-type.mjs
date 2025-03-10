/**
 * @file Ensures that a value is of a specific type, if not it converts the value into that type.
 *
 * This module has to be CommonJS as it is only used by `eslint` which does not support ESModules.
 */

/**
 * Ensures that the input `value` is an array, otherwise an empty array is returned.
 *
 * @public
 * @template T
 * @param {T} value - The value which should be checked
 * @returns {T extends Array<any> ? T : []} Either the input array, or an empty array, if the input array is not an array
 */
export function array (value) {
	// @ts-expect-error -- Right now the type definition of `Array.isArray()` is incorrect since it uses `arg is any[]` instead of the correct type of `arg`.
	return (Array.isArray(value) ? value : []);
}
