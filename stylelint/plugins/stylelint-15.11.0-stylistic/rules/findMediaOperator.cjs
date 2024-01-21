/* eslint-disable -- We want to keep as much of the original code as possible */
// @ts-nocheck

const styleSearch = require('../style-search/index.cjs');

const rangeOperators = ['>=', '<=', '>', '<', '='];

/** @typedef {import('style-search').StyleSearchMatch} StyleSearchMatch */

/**
 * @template {import('postcss').AtRule} T
 * @param {T} atRule
 * @param callback
 * @param {(match: StyleSearchMatch, params: string, atRule: T) => void} cb
 */
module.exports = function findMediaOperator (atRule, callback) {
	if (atRule.name.toLowerCase() !== 'media') {
		return;
	}

	const parameters = atRule.raws.params ? atRule.raws.params.raw : atRule.params;

	styleSearch({ source: parameters, target: rangeOperators }, (match) => {
		const before = parameters[match.startIndex - 1];

		if (before === '>' || before === '<') {
			return;
		}

		callback(match, parameters, atRule);
	});
};
