/**
 * Ensures that the input value is an array, otherwise an empty array is returned.
 *
 * @param {any} setting
 * @returns {unknown[]}
 */
function array (value) {
	return (Array.isArray(value) ? value : []);
}

module.exports = {
	array
};
