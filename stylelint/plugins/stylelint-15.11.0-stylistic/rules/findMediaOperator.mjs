// @ts-nocheck

import styleSearch from '../style-search/index.mjs';

const rangeOperators = ['>=', '<=', '>', '<', '='];

/** @typedef {import('style-search').StyleSearchMatch} StyleSearchMatch */

/**
 * @template {import('postcss').AtRule} T
 * @param {T} atRule
 * @param callback
 * @param {(match: StyleSearchMatch, params: string, atRule: T) => void} cb
 */
export default function findMediaOperator (atRule, callback) {
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
