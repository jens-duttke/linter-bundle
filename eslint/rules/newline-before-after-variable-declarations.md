# Enforce newlines before and after variable declarations (`newline-before-after-variable-declarations`)

## Rule Details

This rule enforces the addition of a newline **before and after** variable declarations (`const`, `let`, and `var`), ensuring that they are visually separated from other code. This enhances readability and maintains clear separation between variable declarations and the surrounding code.

### Examples of **incorrect** code for this rule

```js
blah++;
const foo = 42;
let bar = 'hello';
var baz = true;
console.log(baz);
```

In the example above, there are no newlines around the `const`, `let`, and `var` declarations, violating the rule. The variable declarations are not visually separated from the surrounding code.

### Correct code

```js
blah++;

const foo = 42;
let bar = 'hello';
var baz = true;

console.log(baz);
```

In the correct code, newlines are added before and after the variable declarations, ensuring they are visually separated from the other code.

## Fixable

This rule is **fixable**.
