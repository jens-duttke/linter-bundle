# Restrict file and path names

## Rule Details

In projects in which several developers or even teams work together, it is important that files are not simply stored anywhere. This rule ensures that defined path/file name schemes are adhered to.

Example configuration for this rule:

```js
'linter-bundle/restricted-filenames': ['error', {
  basePath: './src',
  allowed: [
    'components/**/index.tsx',
    'utils/{index.ts,lib/[a-z]+([a-zA-Z])?(.spec).ts}'
  ],
  disallowed: [
    'components/NotAllowed/index.tsx'
  ]
}]
```

Examples of **valid** file paths:

- components/MyComponent/index.tsx
- utils/index.ts
- utils/lib/myFunction.ts
- utils/lib/myFunction.spec.ts

Examples of **invalid** file paths:

- components/myComponent/index.tsx
- components/myComponent/index.ts
- components/MyComponent/subfolder/index.tsx
- components/NotAllowed/index.tsx
- utils/index.tsx
- utils/helper.ts
- utils/helper/index.ts
- utils/lib/MyFunction.ts
- utils/lib/my-function.ts
- utils/lib/myFunction.js
- utils/lib/myFunction.test.ts

### Priority of `allowed` and `disallowed`

If only `allowed` is set, all unspecified files are disallowed.

If only `disallowed` is set, all unspecified files are allowed.

If both are set, `disallowed` wins over `allowed` and all unspecified files are disallowed.

## Useful reusable code snippets in Glob patterns

| Name | Example | Glob pattern |
|-|-|-|
| Lower case | DONUTS | `[a-z]*([a-z0-9])` |
| Upper case | donuts | `[A-Z]*([A-Z0-9])` |
| Snake case | number_of_donuts | `[a-z]*(*([a-z0-9]-)+([a-z0-9]))` |
| Screaming snake case | NUMBER_OF_DONUTS | `[A-Z]*(*([A-Z0-9]_)+([A-Z0-9]))` |
| Kebab case | number-of-donuts | `[a-z]*(*([a-z0-9]-)+([a-z0-9]))` |
| Camel case | numberOfDonuts | `[a-z]*([a-zA-Z0-9])` |
| Pascal case | NumberOfDonuts | `[A-Z]*([a-zA-Z0-9])` |

## Glob pattern templates

Instead of defining the same complex patterns over and over again, e.g. for casing, you can write them into a variable and use them within the pattern, for example by using template strings.

Example of `eslint.config.mjs`:

```js
const snippets = {
  lowerCase: '[a-z]*([a-z0-9])',
  upperCase: '[A-Z]*([A-Z0-9])',
  snakeCase: '[a-z]*(*([a-z0-9]_)+([a-z0-9]))',
  screamingSnakeCase: '[A-Z]*(*([A-Z0-9]_)+([A-Z0-9]))',
  kebabCase: '[a-z]*(*([a-z0-9]-)+([a-z0-9]))',
  camelCase: '[a-z]*([a-zA-Z0-9])',
  pascalCase: '[A-Z]*([a-zA-Z0-9])'
};

export default {
  rules: {
    'linter-bundle/restricted-filenames': ['error', {
      basePath: './src',
      allowed: [
        `components/${snippets.pascalCase}/index.tsx`,
        `utils/{index.ts,lib/${snippets.camelCase}?(.spec).ts}`
      ]
    }]
  }
};
```

## Further Reading

See [Glob Tool - Test globs against sets of test strings quickly and easily online](https://www.digitalocean.com/community/tools/glob)  
See [micromatch - The used Glob matching library](https://www.npmjs.com/package/micromatch)
