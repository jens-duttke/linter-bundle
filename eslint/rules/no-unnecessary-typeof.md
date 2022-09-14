# Disallow unnecessary `typeof` checks (`no-unnecessary-typeof`)

## Rule Details

If a `typeof` operant has only one type in TypeScript, it's unnecessary to check it's type at runtime.

Examples of **incorrect** code for this rule:

```ts
declare var myString: string;

if (typeof myString === 'string') {}
if (typeof myString === 'boolean') {}

declare var myBoolean: (boolean | string) & (boolean | number);

if (typeof myBoolean === 'boolean') {}
```
