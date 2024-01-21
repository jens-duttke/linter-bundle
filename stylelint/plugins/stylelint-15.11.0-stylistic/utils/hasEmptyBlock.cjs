/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const hasBlock = require('stylelint/lib/utils/hasBlock.cjs');

/**
 * Check if a statement has an empty block.
 *
 * @param {import('postcss').Rule | import('postcss').AtRule} statement - postcss rule or at-rule node
 * @returns {boolean} True if the statement has a block and it is empty
 */
module.exports = function hasEmptyBlock (statement) {
	return hasBlock(statement) && statement.nodes.length === 0;
};
