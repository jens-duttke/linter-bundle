# Disallow check if `globalThis`/`window`/`self` is `undefined` (`no-global-undefined-check`)

## Rule Details

Rendering different output, depending on whether it is SSR or CSR, can lead to hard-to-debug rehydration problems in Gatsby.

Examples of **incorrect** code for this rule:

```js
if ('undefined' === typeof window) {}
if ('undefined' == typeof window) {}
if (typeof window !== 'undefined') {}
if (typeof window != 'undefined') {}

if (typeof window != "undefined") {}
if (typeof window != `undefined`) {}
if (typeof window !== `undefined`) {}

if (typeof globalThis !== `undefined`) {}
if (typeof self !== `undefined`) {}

const a = typeof window !== 'undefined' ? 1 : 2;
const b = (typeof window !== 'undefined' ? 1 : 2);

(typeof window !== 'undefined' && window.innerWidth <= 1024);
```

## When Not To Use It

If you've ensured that your check does not produce a different DOM structure for SSR and CSR, and that there is no other way to do it.

## Further Reading

See [The Perils of Rehydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)
