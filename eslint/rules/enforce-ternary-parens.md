# Enforce parentheses around ternary expressions (`linter-bundle/enforce-ternary-parens`)

## Rule Details

This rule enforces that ternary expressions are always wrapped in parentheses to improve readability and maintain consistency in code formatting.

### Examples of **incorrect** code for this rule

```ts
const foo = bar ? 1 : 2;
const value = condition ? 'yes' : 'no';
```

### Examples of **correct** code for this rule

```ts
const foo = (bar ? 1 : 2);
const value = (condition ? 'yes' : 'no');
```

## Why is this rule useful?

- **Improved readability**: Wrapping ternary expressions in parentheses makes it clear that the entire expression is evaluated together.
- **Consistency**: Ensures a uniform style when using the ternary operator.
- **Avoids ambiguity**: Helps prevent misunderstandings in complex expressions.

## Fixable

This rule is fixable. It will automatically wrap ternary expressions in parentheses.
