/**
 * Ensures that the input value is an array, otherwise an empty array is returned.
 *
 * @param {any} value
 * @returns {unknown[]}
 */
function array (value) {
	return (Array.isArray(value) ? value : []);
}

module.exports = {
	array
};
