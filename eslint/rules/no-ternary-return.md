# Disallow ternary expressions as return values (`linter-bundle/no-ternary-return`)

## Rule Details

To improve code readability, this rule disallows using ternary expressions directly as return values. Instead, it enforces using explicit `if` statements.

### Examples of **incorrect** code for this rule

```ts
function getValue(condition: boolean) {
  return condition ? "yes" : "no";
}
```

### Examples of **correct** code for this rule

```ts
function getValue(condition: boolean) {
  if (condition) { 
    return "yes";
  } 
  
  return "no"; 
}
```

## Fixable

This rule is **fixable**. The autofix will transform ternary return expressions into an `if` statement followed by a separate `return`.
