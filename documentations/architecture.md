# Atelier Primitives -- Architecture

## System Layers

```
 Token Source        Style Dictionary       CSS Modules         Product
 (JSON)          -->  (build pipeline)  -->  (components)  -->  (app UI)
                                                         
 tokens/base/        src/styles/            AtelierButton      Login page
 tokens/brands/      _tokens-*.css          AtelierDialog      Settings modal
                     (generated)            AtelierSwitch      Feature toggles
```

Each layer depends only on the layer to its left. Style Dictionary transforms JSON tokens into CSS variables. Components consume those variables through CSS Modules. Product pages compose components.

## Token Pipeline

### Source (JSON)

Tokens are defined as structured JSON in the `tokens/` directory:

```
tokens/
  base/                    # Shared across all brands
    radius.json            # Border radii
    typography.json        # Font families, sizes, weights, line heights
    spacing.json           # Spacing scale
    transition.json        # Animation timing
  brands/
    atelier/               # Atelier brand
      color-light.json     # Light theme colors
      color-dark.json      # Dark theme colors
    neutral/               # Neutral brand
      color-light.json     # Light theme colors
      color-dark.json      # Dark theme colors
```

### Build (Style Dictionary)

`style-dictionary.config.mjs` transforms JSON tokens into CSS custom properties. Running `npm run tokens` generates five CSS files:

| File | Selector | Contents |
|------|----------|----------|
| `_tokens-base.css` | `:root` | Radius, typography, spacing, transitions |
| `_tokens-atelier-light.css` | `:root` | Atelier light theme colors |
| `_tokens-atelier-dark.css` | `:root.dark` | Atelier dark theme colors |
| `_tokens-neutral-light.css` | `[data-brand="neutral"]` | Neutral light overrides |
| `_tokens-neutral-dark.css` | `[data-brand="neutral"].dark` | Neutral dark overrides |

### Consumption (CSS Modules)

Components reference tokens via `var(--token-name)` in their `.module.css` files:

```css
.button {
  background-color: var(--color-primary);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  transition: background-color var(--transition-fast);
}
```

No utility framework. No runtime CSS-in-JS. Plain CSS that references generated variables.

## Component Layer

Each primitive is a self-contained folder:

```
src/components/AtelierButton/
  AtelierButton.tsx          # Component implementation
  AtelierButton.module.css   # Scoped styles
  AtelierButton.test.tsx     # Unit + a11y tests
  AtelierButton.stories.tsx  # Storybook documentation
  index.ts                   # Barrel export
```

Primitives follow these rules:

1. **Zero UI library dependencies.** No Radix, no Headless UI. All ARIA attributes, keyboard handlers, and focus management are implemented from scratch.
2. **Token-driven styling.** CSS Modules reference design tokens via CSS variables. No hardcoded values.
3. **No utility CSS framework.** No Tailwind, no Bootstrap. Styles are written as plain CSS in module files, scoped to each component.
4. **Controlled + uncontrolled.** Every stateful component supports both patterns via the `useControllable` hook.
5. **Composable.** Complex components (Accordion, Dialog) use compound component patterns with React Context.
6. **Accessible by default.** ARIA roles, states, and properties are built into the component.

## Shared Hooks

| Hook | Purpose | Used by |
|------|---------|---------|
| `useControllable` | Controlled vs uncontrolled state | Switch, Accordion, Dialog |
| `useFocusTrap` | Tab cycling within a container | Dialog |
| `useScrollLock` | Prevents body scroll | Dialog |

## When to Create vs Extend

Create a new primitive when:
- It represents a distinct interaction pattern
- It maps to a recognized WAI-ARIA widget role
- It would require fundamentally different internal state management

Extend an existing primitive when:
- The change is visual (new variant, new size)
- The interaction pattern is the same
- The change can be expressed as a new prop value, not a new prop

## Preventing Drift

1. **Tokens are the constraint.** If a value is not in the JSON source, it does not exist. Components cannot invent new values because CSS Modules reference variables, not hardcoded strings.
2. **Style Dictionary is the single source of truth.** Token values are defined once in JSON and transformed into CSS. There is no second place where colors or spacing are defined.
3. **Tests enforce behavior.** Every ARIA attribute and keyboard interaction is tested.
4. **Stories document intent.** Each variant and state has a story.
5. **CSS Modules scope styles.** Component styles cannot leak or collide.

## Multi-Brand Strategy

Brands are applied via the `data-brand` attribute on the root element:

```html
<html data-brand="atelier">  <!-- default -->
<html data-brand="neutral">  <!-- alternate brand -->
```

Each brand has its own token JSON files. Style Dictionary generates CSS with the appropriate selector. Components automatically adopt the new values because they reference variables, not hardcoded colors.

Adding a new brand requires:
1. Create `tokens/brands/newbrand/color-light.json` and `color-dark.json`
2. Add a build config entry in `style-dictionary.config.mjs`
3. Run `npm run tokens`
4. Zero component changes
