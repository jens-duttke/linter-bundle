// @ts-nocheck

import { ConfigurationError } from 'stylelint/lib/utils/errors.mjs';
import isSingleLineString from 'stylelint/lib/utils/isSingleLineString.mjs';
import isWhitespace from 'stylelint/lib/utils/isWhitespace.mjs';
import { assertFunction, isNullish } from 'stylelint/lib/utils/validateTypes.mjs';

/**
 * @typedef {(message: string) => string} MessageFunction
 */

/**
 * @typedef {object} Messages
 * @property {MessageFunction} [expectedBefore]
 * @property {MessageFunction} [rejectedBefore]
 * @property {MessageFunction} [expectedAfter]
 * @property {MessageFunction} [rejectedAfter]
 * @property {MessageFunction} [expectedBeforeSingleLine]
 * @property {MessageFunction} [rejectedBeforeSingleLine]
 * @property {MessageFunction} [expectedBeforeMultiLine]
 * @property {MessageFunction} [rejectedBeforeMultiLine]
 * @property {MessageFunction} [expectedAfterSingleLine]
 * @property {MessageFunction} [rejectedAfterSingleLine]
 * @property {MessageFunction} [expectedAfterMultiLine]
 * @property {MessageFunction} [rejectedAfterMultiLine]
 */

/**
 * @typedef {object} WhitespaceCheckerArgs
 * @property {string} source - The source string
 * @property {number} index - The index of the character to check before
 * @property {(message: string) => void} err - If a problem is found, this callback
 * will be invoked with the relevant warning message.
 * Typically this callback will report() the problem.
 * @property {string} [errTarget] - If a problem is found, this string
 * will be sent to the relevant warning message.
 * @property {string} [lineCheckStr] - Single- and multi-line checkers
 * will use this string to determine whether they should proceed,
 * i.e. if this string is one line only, single-line checkers will check,
 * multi-line checkers will ignore.
 * If none is passed, they will use `source`.
 * @property {boolean} [onlyOneChar=false] - Only check *one* character before.
 * By default, "always-*" checks will look for the `targetWhitespace` one
 * before and then ensure there is no whitespace two before. This option
 * bypasses that second check.
 * @property {boolean} [allowIndentation=false] - Allow arbitrary indentation
 * between the `targetWhitespace` (almost definitely a newline) and the `index`.
 * With this option, the checker will see if a newline *begins* the whitespace before
 * the `index`.
 */

/**
 * @typedef {(args: WhitespaceCheckerArgs) => void} WhitespaceChecker
 */

/**
 * @typedef {{
 *   before: WhitespaceChecker,
 *   beforeAllowingIndentation: WhitespaceChecker,
 *   after: WhitespaceChecker,
 *   afterOneOnly: WhitespaceChecker,
 * }} WhitespaceCheckers
 */

/**
 * Create a whitespaceChecker, which exposes the following functions:
 * - `before()`
 * - `beforeAllowingIndentation()`
 * - `after()`
 * - `afterOneOnly()`
 *
 * @param {"space" | "newline"} targetWhitespace - This is a keyword instead
 * of the actual character (e.g. " ") in order to accommodate
 * different styles of newline ("\n" vs "\r\n")
 * @param {"always" | "never" | "always-single-line" | "always-multi-line" | "never-single-line" | "never-multi-line"} expectation
 * @param {Messages} messages - An object of message functions;
 * calling `before*()` or `after*()` and the `expectation` that is passed
 * determines which message functions are required
 *
 * @returns {WhitespaceCheckers} The checker, with its exposed checking functions
 */
export default function whitespaceChecker (targetWhitespace, expectation, messages) {
	// Keep track of active arguments in order to avoid passing
	// too much stuff around, making signatures long and confusing.
	// This variable gets reset anytime a checking function is called.
	/** @type {WhitespaceCheckerArgs} */
	let activeArgs;

	/**
	 * Check for whitespace *before* a character.
	 * @type {WhitespaceChecker}
	 */
	function before ({
		source,
		index,
		err,
		errTarget,
		lineCheckStr,
		onlyOneChar = false,
		allowIndentation = false
	}) {
		activeArgs = {
			source,
			index,
			err,
			errTarget,
			onlyOneChar,
			allowIndentation
		};

		switch (expectation) {
			case 'always':
				expectBefore();
				break;
			case 'never':
				rejectBefore();
				break;
			case 'always-single-line':
				if (!isSingleLineString(lineCheckStr || source)) {
					return;
				}

				expectBefore(messages.expectedBeforeSingleLine);
				break;
			case 'never-single-line':
				if (!isSingleLineString(lineCheckStr || source)) {
					return;
				}

				rejectBefore(messages.rejectedBeforeSingleLine);
				break;
			case 'always-multi-line':
				if (isSingleLineString(lineCheckStr || source)) {
					return;
				}

				expectBefore(messages.expectedBeforeMultiLine);
				break;
			case 'never-multi-line':
				if (isSingleLineString(lineCheckStr || source)) {
					return;
				}

				rejectBefore(messages.rejectedBeforeMultiLine);
				break;
			default:
				throw new ConfigurationError(`Unknown expectation "${expectation}"`);
		}
	}

	/**
	 * Check for whitespace *after* a character.
	 * @type {WhitespaceChecker}
	 */
	function after ({ source, index, err, errTarget, lineCheckStr, onlyOneChar = false }) {
		activeArgs = { source, index, err, errTarget, onlyOneChar };

		switch (expectation) {
			case 'always':
				expectAfter();
				break;
			case 'never':
				rejectAfter();
				break;
			case 'always-single-line':
				if (!isSingleLineString(lineCheckStr || source)) {
					return;
				}

				expectAfter(messages.expectedAfterSingleLine);
				break;
			case 'never-single-line':
				if (!isSingleLineString(lineCheckStr || source)) {
					return;
				}

				rejectAfter(messages.rejectedAfterSingleLine);
				break;
			case 'always-multi-line':
				if (isSingleLineString(lineCheckStr || source)) {
					return;
				}

				expectAfter(messages.expectedAfterMultiLine);
				break;
			case 'never-multi-line':
				if (isSingleLineString(lineCheckStr || source)) {
					return;
				}

				rejectAfter(messages.rejectedAfterMultiLine);
				break;
			default:
				throw new ConfigurationError(`Unknown expectation "${expectation}"`);
		}
	}

	/**
	 * @type {WhitespaceChecker}
	 */
	function beforeAllowingIndentation (obj) {
		before({ ...obj, allowIndentation: true });
	}

	/**
	 *
	 * @param messageFunction
	 */
	function expectBefore (messageFunction = messages.expectedBefore) {
		if (activeArgs.allowIndentation) {
			expectBeforeAllowingIndentation(messageFunction);

			return;
		}

		const _activeArgs = activeArgs;
		const source = _activeArgs.source;
		const index = _activeArgs.index;

		const oneCharBefore = source[index - 1];
		const twoCharsBefore = source[index - 2];

		if (isNullish(oneCharBefore)) {
			return;
		}

		if (
			targetWhitespace === 'space' &&
			oneCharBefore === ' ' &&
			(activeArgs.onlyOneChar || isNullish(twoCharsBefore) || !isWhitespace(twoCharsBefore))
		) {
			return;
		}

		assertFunction(messageFunction);
		activeArgs.err(messageFunction(activeArgs.errTarget || source.charAt(index)));
	}

	/**
	 *
	 * @param messageFunction
	 */
	function expectBeforeAllowingIndentation (messageFunction = messages.expectedBefore) {
		const _activeArgs2 = activeArgs;
		const source = _activeArgs2.source;
		const index = _activeArgs2.index;
		const error = _activeArgs2.err;

		const expectedChar = targetWhitespace === 'newline' ? '\n' : undefined;
		let i = index - 1;

		while (source[i] !== expectedChar) {
			if (source[i] === '\t' || source[i] === ' ') {
				i--;
				continue;
			}

			assertFunction(messageFunction);
			error(messageFunction(activeArgs.errTarget || source.charAt(index)));

			return;
		}
	}

	/**
	 *
	 * @param messageFunction
	 */
	function rejectBefore (messageFunction = messages.rejectedBefore) {
		const _activeArgs3 = activeArgs;
		const source = _activeArgs3.source;
		const index = _activeArgs3.index;

		const oneCharBefore = source[index - 1];

		if (!isNullish(oneCharBefore) && isWhitespace(oneCharBefore)) {
			assertFunction(messageFunction);
			activeArgs.err(messageFunction(activeArgs.errTarget || source.charAt(index)));
		}
	}

	/**
	 * @type {WhitespaceChecker}
	 */
	function afterOneOnly (obj) {
		after({ ...obj, onlyOneChar: true });
	}

	/**
	 *
	 * @param messageFunction
	 */
	function expectAfter (messageFunction = messages.expectedAfter) {
		const _activeArgs4 = activeArgs;
		const source = _activeArgs4.source;
		const index = _activeArgs4.index;

		const oneCharAfter = source[index + 1];
		const twoCharsAfter = source[index + 2];
		const threeCharsAfter = source[index + 3];

		if (isNullish(oneCharAfter)) {
			return;
		}

		if (targetWhitespace === 'newline') {
			// If index is followed by a Windows CR-LF ...
			if (
				oneCharAfter === '\r' &&
				twoCharsAfter === '\n' &&
				(activeArgs.onlyOneChar || isNullish(threeCharsAfter) || !isWhitespace(threeCharsAfter))
			) {
				return;
			}

			// If index is followed by a Unix LF ...
			if (
				oneCharAfter === '\n' &&
				(activeArgs.onlyOneChar || isNullish(twoCharsAfter) || !isWhitespace(twoCharsAfter))
			) {
				return;
			}
		}

		if (
			targetWhitespace === 'space' &&
			oneCharAfter === ' ' &&
			(activeArgs.onlyOneChar || isNullish(twoCharsAfter) || !isWhitespace(twoCharsAfter))
		) {
			return;
		}

		assertFunction(messageFunction);
		activeArgs.err(messageFunction(activeArgs.errTarget || source.charAt(index)));
	}

	/**
	 *
	 * @param messageFunction
	 */
	function rejectAfter (messageFunction = messages.rejectedAfter) {
		const _activeArgs5 = activeArgs;
		const source = _activeArgs5.source;
		const index = _activeArgs5.index;

		const oneCharAfter = source[index + 1];

		if (!isNullish(oneCharAfter) && isWhitespace(oneCharAfter)) {
			assertFunction(messageFunction);
			activeArgs.err(messageFunction(activeArgs.errTarget || source.charAt(index)));
		}
	}

	return {
		before,
		beforeAllowingIndentation,
		after,
		afterOneOnly
	};
}
