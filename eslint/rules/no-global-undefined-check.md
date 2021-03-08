# Disallow check if `globalThis`/`window`/`self` is `undefined` (`no-global-undefined-check`)

## Rule Details

Rendering different output, depending on whether it is SSR or CSR, can lead to hard-to-debug rehydration problems in Gatsby.

Examples of **incorrect** code for this rule:

```ts
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

See [The Perils of Rehydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)
