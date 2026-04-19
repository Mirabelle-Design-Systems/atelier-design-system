# Roadmap

Extension plan for Atelier Primitives. Adds 7 hand-rolled primitives across 3 tiers, ordered so each one introduces a reusable hook that composes into the next.

## Current state

4 primitives shipped: `AtelierButton`, `AtelierSwitch`, `AtelierAccordion`, `AtelierDialog`.
3 hooks: `useControllable`, `useFocusTrap`, `useScrollLock`.
50 tests with vitest-axe, Storybook 8, Next.js 15 docs site, npm package.

## Proposed roadmap

### Tier A — fill the form gap (low risk, high coverage)

| Primitive | Why it matters | New hook |
|---|---|---|
| **AtelierTextField** | Label + description + error association is the most common a11y bug in the wild. Proves you know `aria-describedby`, `aria-invalid`, `aria-errormessage`. | — |
| **AtelierCheckbox** | Mirrors Switch but with indeterminate state. Proves `aria-checked="mixed"`. | — |
| **AtelierRadioGroup** | First introduction of roving tabindex. Small surface, canonical pattern. | `useRovingTabIndex` |

### Tier B — medium complexity, distinct a11y stories

| Primitive | Why it matters | New hook |
|---|---|---|
| **AtelierTabs** | Roving tabindex again (reuses hook), plus manual-vs-automatic activation decision. APG canonical. | reuses `useRovingTabIndex` |
| **AtelierTooltip** | WCAG 1.4.13 — dismissible/hoverable/persistent. Introduces floating positioning. | `useFloating` |
| **AtelierToast** | Live regions (`aria-live="polite"`), queue management, focus-safe. | `useLiveRegion` |

### Tier C — boss fight

| Primitive | Why it matters | Composes |
|---|---|---|
| **AtelierCombobox** | Listbox role, typeahead, virtual focus, floating positioning. Combines everything. | `useFloating` + `useRovingTabIndex` + new `useTypeahead` |

## Build order recommendation

Start with **AtelierRadioGroup**. Small surface, but it forces extraction of `useRovingTabIndex` as a clean reusable hook — which then unlocks Tabs and Combobox cheaply. Pairs naturally with TextField for a "form pattern" Storybook page, filling an obvious portfolio gap (Form pattern page exists, but no form input primitives yet).

**Tradeoff:** TextField is more visible in a portfolio screenshot, but it's hookless — less architectural signal.

## Per-primitive deliverables

Every primitive ships with the following before merge:

1. **Target map** — variant/state matrix, prop API sketch
2. **A11y acceptance list** — keyboard, ARIA, focus, contrast checks
3. **Hook design** (when applicable) — extracted before component code, since it's the reusable piece
4. **Component + tokens + tests + Storybook stories with `play()`**

## Branch naming

One PR per primitive:

- `feat/text-field`
- `feat/checkbox`
- `feat/radio-group`
- `feat/tabs`
- `feat/tooltip`
- `feat/toast`
- `feat/combobox`

## Why hand-rolled

### Hand-rolled does NOT mean no a11y

Hand-rolled means you build the a11y yourself instead of importing it. Atelier is already proof: 50 tests, vitest-axe, focus trap, scroll lock, return focus, inert. The a11y is fully there.

The risk being managed is the *risk profile*, not the outcome.

### Why hand-rolled signals senior

Anyone can run `npm install @radix-ui/react-dialog` and wrap it. That's a junior-to-mid task — a *consumer* of primitives.

Building a Dialog from scratch means:

- Reading the WAI-ARIA Authoring Practices for the dialog pattern
- Understanding why focus must be trapped, how Tab cycling works, what to do with Shift+Tab at the boundary
- Deciding between `inert` vs `aria-hidden` on siblings (Atelier picked `inert` — documented in `decisions.md`)
- Handling Escape, overlay click, return focus, scroll lock — and knowing *why* each one matters

That's an *author* skillset. It's what design system teams hire for, because consuming Radix is easy but extending, auditing, debugging, or replacing primitives requires understanding what Radix did under the hood. Hiring managers read the code and can tell which camp you're in.

### The "Radix safety net"

Think of Radix as a pre-wired electrical outlet:

- **Plug into Radix** → focus management, ARIA roles, keyboard handling already correct. Hard to ship a11y bugs because the Radix author solved it.
- **Hand-rolled** → you're the electrician. Done right, perfectly safe (Atelier is). Done sloppily, the bug ships silently because no library author stands between you and the user's screen reader.

So "no safety net" = personally responsible for catching a11y regressions. That's why Atelier has vitest-axe in CI — it's the safety net, hand-built.

### Net

Hand-rolled is more senior **because** the responsibility is taken on *and met*. Atelier already meets it. The roadmap keeps meeting it: every primitive ships with axe tests + Storybook a11y addon + keyboard `play()` interactions before merge. No primitive lands without that.
