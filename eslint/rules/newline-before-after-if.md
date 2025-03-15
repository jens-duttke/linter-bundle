# Enforce Blank Lines Around `if` Statements (`linter-bundle/blank-lines-if`)

## Rule Details

This rule enforces the insertion of blank lines before and after `if` statements, with specific exceptions. It ensures that your code maintains a consistent layout and readability while avoiding unnecessary blank lines in certain situations.

### Exceptions

- **Before the `if` statement**:
  - If the `if` statement is the first statement in a block.
  - If the `if` statement is preceded by a comment.
  - If the `if` statement is preceded by an `else` keyword.
  - If the `if` statement is preceded by a `case` or `default` in a `switch` block.
    
- **After the `if` statement**:
  - If the `if` statement is the last statement in a block.
  - If the `if` statement is followed by an `else` keyword (i.e., part of an `else-if` chain).

### Examples of **incorrect** code for this rule

```js
function example() {
  
  if (foo) {
    // Some code
  }
  
  else if (bar) {
    // Some code
  }

  else {
    // Some code
  }
  if (baz) {
    // Some code
  }

}
```

### Examples of **correct** code for this rule

```js
function example() {
  if (foo) {
    // Some code
  }
  else if (bar) {
    // Some code
  }
  else {
    // Some code
  }

  if (baz) {
    // Some code
  }
}
```

## Fixable

The rule can automatically fix violations by adding the necessary blank lines.
