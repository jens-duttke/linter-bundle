// @ts-nocheck

/**
 * Remove empty lines before a node. Mutates the node.
 *
 * @template {import('postcss').Rule | import('postcss').AtRule} T
 * @param {T} node
 * @param {string} newline
 * @returns {T}
 */
export default function removeEmptyLinesAfter (node, newline) {
	node.raws.after = node.raws.after ? node.raws.after.replace(/(\r?\n\s*\n)+/gu, newline) : '';

	return node;
}
