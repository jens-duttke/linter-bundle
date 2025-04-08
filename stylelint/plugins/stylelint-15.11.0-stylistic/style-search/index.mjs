// @ts-nocheck

const SKIP = 'skip';
const CHECK = 'check';
const ONLY = 'only';

export default function (options, callback) {
	const source = options.source;
	const target = options.target;

	const skipComments = (options.comments) ? options.comments === SKIP : true;
	const skipStrings = (options.strings) ? options.strings === SKIP : true;
	const skipFunctionNames = (options.functionNames) ? options.functionNames === SKIP : true;
	const skipFunctionArguments = options.functionArguments === SKIP;
	const skipParentheticals = options.parentheticals === SKIP;

	let onceOptionUsed = false;
	for (const key of Object.keys(options)) {
		if (options[key] !== ONLY) { continue; }
		if (!onceOptionUsed) {
			onceOptionUsed = true;
		}
		else {
			throw new Error('Only one syntax feature option can be the "only" one to check');
		}
	}

	const onlyComments = options.comments === ONLY;
	const onlyStrings = options.strings === ONLY;
	const onlyFunctionNames = options.functionNames === ONLY;
	const onlyFunctionArguments = options.functionArguments === ONLY;
	const onlyParentheticals = options.parentheticals === ONLY;

	let insideString = false;
	let insideComment = false;
	let insideSingleLineComment = false;
	let insideParens = false;
	let insideFunctionArguments = false;
	let openingParenCount = 0;
	let matchCount = 0;
	let openingQuote;

	const targetIsArray = Array.isArray(target);

	// If the target is just a string, it is easy to check whether
	// some index of the source matches it.
	// If the target is an array of strings, though, we have to
	// check whether some index of the source matches *any* of
	// those target strings (stopping after the first match).
	const getMatch = (function () {
		if (!targetIsArray) {
			return getMatchBase.bind(null, target);
		}
		return function (index) {
			for (let ti = 0, tl = target.length; ti < tl; ti++) {
				const checkResult = getMatchBase(target[ti], index);
				if (checkResult) { return checkResult; }
			}
			return false;
		};
	}());

	/**
	 *
	 * @param targetString
	 * @param index
	 */
	function getMatchBase (targetString, index) {
		const targetStringLength = targetString.length;

		// Target is a single character
		if (targetStringLength === 1 && source[index] !== targetString) { return false; }

		// Target is multiple characters
		if (source.substr(index, targetStringLength) !== targetString) { return false; }

		return {
			insideParens,
			insideFunctionArguments,
			insideComment,
			insideString,
			startIndex: index,
			endIndex: index + targetStringLength,
			target: targetString
		};
	}

	for (let i = 0, l = source.length; i < l; i++) {
		const currentChar = source[i];

		// Register the beginning of a comment
		if (
			!insideString && !insideComment &&
      currentChar === '/' &&
      source[i - 1] !== '\\' // escaping
		) {
			// standard comments
			if (source[i + 1] === '*') {
				insideComment = true;
				continue;
			}
			// single-line comments
			if (source[i + 1] === '/') {
				insideComment = true;
				insideSingleLineComment = true;
				continue;
			}
		}

		if (insideComment) {
			// Register the end of a standard comment
			if (
				!insideSingleLineComment &&
        currentChar === '*' &&
        source[i - 1] !== '\\' && // escaping
        source[i + 1] === '/' &&
        source[i - 1] !== '/' // don't end if it's /*/
			) {
				insideComment = false;
				continue;
			}

			// Register the end of a single-line comment
			if (
				insideSingleLineComment &&
        currentChar === '\n'
			) {
				insideComment = false;
				insideSingleLineComment = false;
			}

			if (skipComments) { continue; }
		}

		// Register the beginning of a string
		if (!insideComment && !insideString && (currentChar === '"' || currentChar === "'")) {
			if (source[i - 1] === '\\') { continue; } // escaping

			openingQuote = currentChar;
			insideString = true;

			// For string-quotes rule
			if (target === currentChar) { handleMatch(getMatch(i)); }
			continue;
		}

		if (insideString) {
			// Register the end of a string
			if (currentChar === openingQuote) {
				if (source[i - 1] === '\\') { continue; } // escaping
				insideString = false;
				continue;
			}

			if (skipStrings) { continue; }
		}

		// Register the beginning of parens/functions
		if (!insideString && !insideComment && currentChar === '(') {
			// Keep track of opening parentheticals so that we
			// know when the outermost function (possibly
			// containing nested functions) is closing
			openingParenCount++;

			insideParens = true;
			// Only inside a function if there is a function name
			// before the opening paren
			if ((/[A-Za-z]/u).test(source[i - 1])) {
				insideFunctionArguments = true;
			}

			if (target === '(') { handleMatch(getMatch(i)); }
			continue;
		}

		if (insideParens) {
			// Register the end of a function
			if (currentChar === ')') {
				openingParenCount--;
				// Do this here so the match is still technically inside a function
				if (target === ')') { handleMatch(getMatch(i)); }
				if (openingParenCount === 0) {
					insideParens = false;
					insideFunctionArguments = false;
				}
				continue;
			}
		}

		const isFunctionName = (/^[A-Za-z]*\(/u).test(source.slice(i));
		if (skipFunctionNames && isFunctionName) { continue; }
		if (onlyFunctionNames && !isFunctionName) { continue; }

		const match = getMatch(i);

		if (!match) { continue; }
		handleMatch(match);
		if (options.once) { return; }
	}

	/**
	 *
	 * @param match
	 */
	function handleMatch (match) {
		if (onlyParentheticals && !insideParens) { return; }
		if (skipParentheticals && insideParens) { return; }
		if (onlyFunctionArguments && !insideFunctionArguments) { return; }
		if (skipFunctionArguments && insideFunctionArguments) { return; }
		if (onlyStrings && !insideString) { return; }
		if (onlyComments && !insideComment) { return; }
		matchCount++;
		callback(match, matchCount);
	}
}
