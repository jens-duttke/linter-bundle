// @ts-nocheck

import hasBlock from 'stylelint/lib/utils/hasBlock.mjs';

/**
 * Check if a statement has an empty block.
 *
 * @param {import('postcss').Rule | import('postcss').AtRule} statement - postcss rule or at-rule node
 * @returns {boolean} True if the statement has a block and it is empty
 */
export default function hasEmptyBlock (statement) {
	return hasBlock(statement) && statement.nodes.length === 0;
}
