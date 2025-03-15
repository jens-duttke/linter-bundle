# Enforce parentheses around logical operations (`linter-bundle/enforce-logical-expression-parens`)

## Rule Details

This rule ensures that logical operations (using `&&`, `||`, etc.) are always enclosed in parentheses unless they are already part of an existing expression. This improves readability and prevents potential issues with operator precedence.

Examples of **incorrect** code for this rule:

```ts
return foo !== null && foo.bar === 42 && baz === 84;
```

The logical operations in the above code are not enclosed in parentheses. The rule will automatically add parentheses to make the code clearer and ensure proper precedence.

Corrected code would look like this:

```ts
return (foo !== null && foo.bar === 42 && baz === 84);
```

### When the rule will not apply

If the logical operations are already inside parentheses, no changes will be made:

```ts
if (foo !== null && foo.bar === 42 && baz === 84) {
  // code
}
```

In this case, the code is already correctly wrapped in parentheses, so no further modifications are necessary.
