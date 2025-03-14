# Enforces using Lucide prefix for lucide-react imports and their usage (`linter-bundle/ensure-lucide-import-consistency`)

## Rule Details

This rule ensures that components imported from `lucide-react` are used with a `Lucide` prefix. It checks both the import statements and the JSX or JavaScript usage of these components.
If a component does not follow this convention, it will be automatically fixed by replacing the component name with the properly prefixed name (`Lucide`).

### Correct Usage

When importing components from `lucide-react`, the component name should start with the `Lucide` prefix.

#### Correct Code Example

```ts
import { LucideHome } from 'lucide-react';

<LucideHome />
```

#### Incorrect Code Example

```ts
import { Home } from 'lucide-react';

<Home />
```

### Rule Behavior

- **Import Declarations**: If a component from `lucide-react` is imported without the `Lucide` prefix, the rule will automatically rename it to add the `Lucide` prefix.
  
- **JSX Usage**: In JSX, if a component is used without the `Lucide` prefix (even if correctly imported), it will be reported and fixed.

- **JavaScript Usage**: For non-JSX usage (e.g., when components are referenced via `React.createElement` or directly as identifiers), the rule will also ensure the correct `Lucide` prefix is applied.

## Options

This rule does not take any options.

## Fixable

This rule is fixable. It will automatically rename components and their usages to ensure they follow the `Lucide` prefix convention.
