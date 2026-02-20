# Dependency Update Process

A step-by-step guide for updating all dependencies in `linter-bundle`.

## Overview

| Step | Description | Automation potential |
|------|-------------|---------------------|
| 1 | Identify outdated dependencies | Fully automatable |
| 2 | Research release notes | Partially automatable (AI can fetch and summarize) |
| 3 | Update `package.json` and install | Fully automatable |
| 4 | Update configuration files | Partially automatable (requires human judgment for enable/disable) |
| 5 | Validate | Fully automatable |
| 6 | Update `CHANGELOG.md` | Partially automatable |
| 7 | Version bump and publish | Manual (uses `npm version minor/major`) |

---

## Step 1: Identify Outdated Dependencies

```sh
npm run check-outdated
```

This runs `check-outdated --ignore-pre-releases` and lists all packages with newer stable versions.

**Categorize each package by risk tier** to prioritize research effort:

| Tier | Packages | Why |
|------|----------|-----|
| **High risk** | `eslint`, `typescript-eslint`, `eslint-plugin-unicorn`, `eslint-plugin-jsdoc`, `stylelint`, `stylelint-scss`, `eslint-plugin-react-hooks` | Frequently add new rules, breaking API changes |
| **Medium risk** | Other ESLint/Stylelint plugins (`eslint-plugin-jest`, `eslint-plugin-n`, `@stylistic/eslint-plugin`, `eslint-plugin-functional`, `eslint-plugin-import`, `eslint-plugin-promise`, `stylelint-order`, etc.) | Occasional new rules |
| **Low risk** | `globals`, `micromatch`, `postcss-scss`, `eslint-formatter-unix`, `eslint-import-resolver-*`, `markdownlint-cli`, type definitions | Rarely affect linter configuration |

---

## Step 2: Research Release Notes

For each **high-risk** and **medium-risk** package, check the release notes between the current and target version.

### Where to find release notes

| Source | URL pattern |
|--------|-------------|
| GitHub Releases | `https://github.com/{org}/{repo}/releases` |
| CHANGELOG.md | `https://github.com/{org}/{repo}/blob/main/CHANGELOG.md` |
| npm | `https://www.npmjs.com/package/{package}?activeTab=versions` |

### What to look for

1. **New rules** — Need to be added to the config as enabled or disabled
2. **Removed or renamed rules** — Need config adjustment
3. **Breaking changes** — API changes, dropped Node.js versions, changed defaults
4. **Changed rule options** — New required options, removed options, changed defaults
5. **Plugin compatibility** — Does the plugin support the current version of its host tool (ESLint/Stylelint)?

### Tips for efficient research

- Start with the CHANGELOG or release page, not individual commits.
- For high-churn packages (e.g. `eslint-plugin-jsdoc`), focus on "New rules" sections rather than reading every fix.
- Search for "BREAKING" or "breaking" in the release notes.
- Check `peerDependencies` in the package's `package.json` to verify compatibility.
- If a package has a major version bump, expect breaking changes and read the migration guide.

---

## Step 3: Update `package.json` and Install

1. Update all version numbers in `package.json` to their latest stable versions. This project uses **exact versions** (no `^` or `~` prefixes).

2. If a dependency has been replaced (e.g. a package was forked or superseded), swap the package name and version.

3. Check `engines.node` — if any updated dependency raises its minimum Node.js version, update the `engines` field accordingly.

4. Run `npm install`.

5. Verify installation succeeds without errors. Watch for:

   - **Peer dependency conflicts** — May require `--legacy-peer-deps` temporarily, but ideally resolve the conflict.
   - **Deprecated package warnings** — Consider whether a replacement exists.

6. **Never run `npm audit fix --force`**. It will downgrade packages to ancient,
   incompatible versions and break the entire dependency tree. Audit vulnerabilities
   in this project are typically in transitive dependencies of ESLint/Stylelint plugins
   and can only be resolved when those plugins release updates. To recover from an
   accidental `--force`, restore `package.json` and `package-lock.json` from git
   and run `npm install`.

---

## Step 4: Update Configuration Files

### Files to check

| File | Content |
|------|---------|
| `eslint/index.mjs` | Core ESLint, `@stylistic`, `typescript-eslint`, `eslint-plugin-functional`, `eslint-plugin-import`, `eslint-plugin-eslint-comments`, `eslint-plugin-promise`, `eslint-plugin-unicorn` rules |
| `eslint/jsdoc.mjs` | `eslint-plugin-jsdoc` rules |
| `eslint/jest.mjs` | `eslint-plugin-jest` rules |
| `eslint/react.mjs` | `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react-hooks` rules |
| `eslint/javascript.mjs` | `eslint-plugin-n` (Node.js) rules |
| `stylelint/index.mjs` | Stylelint core + SCSS rules |
| `markdownlint/base.json` | Markdownlint rules |

### Conventions for new rules

- **Enable** rules that enforce best practices or catch real bugs → `'rule-name': 'error'`
- **Disable** rules that are too opinionated, conflict with existing rules, or don't fit the bundle's philosophy → `'rule-name': 'off'` (ESLint) or `'rule-name': null` (Stylelint)
- Place rules **alphabetically** within their plugin section, matching existing ordering.
- For disabled rules, no inline comment is needed (the CHANGELOG entry explains the reason).

### Conventions for renamed rules

- Replace the old name with the new name in the config file.
- Document the rename in the CHANGELOG.

### Conventions for removed rules

- Remove the rule entry from the config file entirely.
- Document the removal in the CHANGELOG if it affects users.

### Forked/custom plugins

This project includes forked Stylelint plugins in `stylelint/plugins/`. When upgrading Stylelint across major versions, check if the forked plugins use internal APIs that changed:

- `parseSelector` — Changed from callback-based to return-value-based in Stylelint 17.
- `isStandardSyntaxRule`, `isStandardSyntaxSelector`, `matchesStringOrRegExp` — Import paths may change between major versions.

### What requires human judgment

- **Enable vs. disable** for each new rule — consider whether it catches real bugs vs. being overly prescriptive.
- **Stylelint `order/properties-order`** — New CSS properties need manual placement in the correct order.
- **Breaking changes** that affect downstream consumers — determine if this warrants a major version bump.

---

## Step 5: Validate

Run validation in this order (fast-to-slow, to catch issues early):

### 5.1: Stylelint validation

```sh
npm run _test-stylelint
```

Catches invalid Stylelint options and plugin errors quickly.

### 5.2: Stylelint rule coverage

```sh
npm run _stylelint-find-rules
```

Detects rules provided by Stylelint or plugins that are not configured. Every rule must be explicitly enabled or disabled.

### 5.3: Full lint pipeline

```sh
npm run lint
```

This runs: `_test-stylelint` → `_stylelint-find-rules` → ESLint (`files`) → TypeScript (`tsc`) → TypeScript strict (`ts`) → Markdownlint (`md`) → npm audit (`audit`).

### Common issues and fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Unknown rule" | Rule was removed in new version | Remove from config |
| "Invalid option" | Rule options changed | Check new rule documentation |
| Plugin crash | Internal API changed | Update forked plugin code |
| TypeScript error in custom rules | `@types/eslint` changed | Adapt types (e.g. removed `category` from `RulesMetaDocs`) |
| New lint errors in project files | New rule enabled catches existing code | Fix the code or disable the rule if too opinionated |

---

## Step 6: Update `CHANGELOG.md`

### Format

Follow the [Keep a Changelog](https://keepachangelog.com/) format established in this project:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Breaking changes

- [general] Description of breaking change
- [eslint] Description of breaking change

### Changed

- [eslint] Updated `package-name` from `old` to `new`
- [stylelint] Updated `package-name` from `old` to `new`
- [markdown] Updated `package-name` from `old` to `new`
- [eslint] Make use of new [`rule-name`](url) rule
- [eslint] Added but disabled [`rule-name`](url) rule
- [stylelint] Make use of new [`rule-name`](url) rule
- [stylelint] Added but disabled [`rule-name`](url) rule

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/vOLD...vNEW)
```

### Ordering rules

1. **Breaking changes** section comes before **Changed** (only if there are breaking changes).
2. Within **Changed**, list items in this order:
   1. Version updates, grouped by prefix: `[eslint]`, `[stylelint]`, `[markdown]`, `[audit]`, `[general]`
   2. New enabled rules ("Make use of new")
   3. New disabled rules ("Added but disabled")
   4. Other configuration changes
3. **Prefixes**: `[eslint]`, `[stylelint]`, `[markdown]`, `[audit]`, `[general]` — match the section of the config the change belongs to.

### Phrasing conventions

| Action | Phrasing |
|--------|----------|
| Rule enabled | `Make use of new [\`rule-name\`](url) rule` |
| Rule disabled | `Added but disabled [\`rule-name\`](url) rule` |
| Rule renamed | `Renamed \`old-name\` rule to \`new-name\`` |
| Package updated | `Updated \`package-name\` from \`old\` to \`new\`` |
| Package replaced | `Replaced \`old-package\` with [\`new-package\`](url)` |

### Unreleased section

Always keep an `[Unreleased]` section at the top with a comparison link:

```markdown
## [Unreleased]

[Show all code changes](https://github.com/jens-duttke/linter-bundle/compare/vLATEST...HEAD)
```

---

## Step 7: Version Bump and Publish

After all changes are validated and committed:

```sh
# Minor version (new rules, non-breaking updates):
npm run publish:minor

# Major version (breaking changes for downstream consumers):
npm run publish:major

# Patch version (bug fixes only):
npm run publish:patch
```

This triggers `preversion` (runs check-outdated + lint), bumps the version, commits, pushes, and publishes to npm (configured in `postversion`).

### Version bump decision

- **Patch**: Only bug fixes, no config changes.
- **Minor**: New rules added (enabled or disabled), dependency updates without breaking changes to consumers.
- **Major**: Breaking changes that require action from consumers (e.g. replaced plugin with different rule name, dropped Node.js version support, removed rules).

---

## Known Ecosystem Issues

Document any known compatibility issues here so future updates can reference them:

- **ESLint 10** (as of February 2026): Removed `context.getSourceCode()` and `context.parserOptions`. Several plugins don't support it yet: `eslint-plugin-import`, `eslint-plugin-eslint-comments`, `eslint-plugin-react`. Monitor their issue trackers before attempting the upgrade.
- **Stylelint 17**: Dropped CommonJS support, changed `parseSelector` from callback-based to return-value-based. All forked plugins in `stylelint/plugins/` need adaptation.
- **stylelint-use-logical-spec**: Abandoned, replaced with `stylelint-use-logical` from csstools (rule name changed from `liberty/use-logical-spec` to `csstools/use-logical`).
