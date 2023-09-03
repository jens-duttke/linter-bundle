/**
 * @file CommonJS loader for `linter-bundle-config.js`.
 *
 * This module has to be CommonJS as it is only used by `eslint` which does not support ESModules.
 *
 * This workaround is necessary to load async ESModules in sync CommonJS code.
 */

const { Worker, isMainThread, parentPort } = require('node:worker_threads');

if (isMainThread) {
	const worker = new Worker(__filename);

	const sizeSharedArrayBuffer = new SharedArrayBuffer(4);
	const sizeInt32 = new Int32Array(sizeSharedArrayBuffer);

	worker.postMessage({ sizeInt32 });

	if (Atomics.wait(sizeInt32, 0, 0, 10_000) !== 'ok') {
		throw new Error('No size received');
	}

	const dataSharedArrayBuffer = new SharedArrayBuffer((Math.ceil(sizeInt32[0] / 4) << 2));
	const dataInt32 = new Int32Array(dataSharedArrayBuffer);

	worker.postMessage({ dataInt32 });

	if (Atomics.wait(dataInt32, 0, 0, 250) !== 'ok') {
		throw new Error('No data received');
	}

	void worker.terminate();

	const textDecoder = new TextDecoder('utf8');
	const content = textDecoder.decode(new Uint8Array(dataSharedArrayBuffer).slice(0, sizeInt32[0]));

	// @ts-expect-error TypeScript complains about the ESModule import, but correctly resolves it and applies the type.
	/** @type {import('./linter-bundle-config.js')} */
	module.exports = JSON.parse(content);
}
else {
	/** @type {Uint8Array} */
	let content;

	/**
	 * Handles requests from the main thread.
	 *
	 * @param {{ sizeInt32?: Int32Array; dataInt32?: Int32Array; }} data - Data received from the main thread
	 * @returns {Promise<void>}
	 */
	const onData = async (data) => {
		if (data.sizeInt32) {
			const json = JSON.stringify(await import('./linter-bundle-config.js'));

			const textEncoder = new TextEncoder();

			content = textEncoder.encode(json);

			Atomics.store(data.sizeInt32, 0, content.byteLength);
			Atomics.notify(data.sizeInt32, 0);
		}
		else if (data.dataInt32) {
			new Uint8Array(data.dataInt32.buffer).set(content);

			Atomics.notify(data.dataInt32, 0);
		}
	};

	parentPort?.on('message', onData);
}
