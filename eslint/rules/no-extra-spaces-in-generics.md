# Disallow spaces in TypeScript generics (`linter-bundle/no-spaces-in-generics`)

## Rule Details

This rule disallows spaces after the `<` and before the `>` in TypeScript generics. Ensuring that no unnecessary spaces are used around generics helps maintain consistency and readability in your code.

Examples of **incorrect** code for this rule:

```ts
declare function foo< T>(x: T): T;  // Space after '<'

function bar<U >(): U {             // Space before '>'
    return null as U;
}
```

Examples of **correct** code for this rule:

```ts
declare function foo<T>(x: T): T;

function bar<U>(): U {
    return null as U;
}
```
