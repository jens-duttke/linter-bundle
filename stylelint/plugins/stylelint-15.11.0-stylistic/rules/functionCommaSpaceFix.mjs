// @ts-nocheck

/**
 * @param {{
 *   div: import('postcss-value-parser').DivNode,
 *   index: number,
 *   nodes: import('postcss-value-parser').Node[],
 *   expectation: string,
 *   position: 'before' | 'after',
 *   symb: string,
 * }} parameters
 * @returns {boolean}
 */
export default function functionCommaSpaceFix (parameters) {
	const { div, index, nodes, expectation, position, symb } = parameters;

	if (expectation.startsWith('always')) {
		div[position] = symb;

		return true;
	}

	if (expectation.startsWith('never')) {
		div[position] = '';

		for (let i = index + 1; i < nodes.length; i++) {
			const node = nodes[i];

			if (node === undefined) {
				continue;
			}

			if (node.type === 'comment') {
				continue;
			}

			if (node.type === 'space') {
				node.value = '';
				continue;
			}

			break;
		}

		return true;
	}

	return false;
}
