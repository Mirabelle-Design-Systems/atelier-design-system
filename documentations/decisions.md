# Atelier Primitives -- API Decision Log

## 1. Polymorphic `as` prop on Button, not a separate AtelierLink

**Decision:** AtelierButton accepts `as="a"` to render as an anchor element, rather than having a separate AtelierLink component.

**Why:** A link styled as a button and a button that navigates are the same visual component with different semantics. Splitting them creates two components with identical styling logic that must stay in sync. The `as` prop keeps the styling in one place and lets the consumer choose the semantics.

**Trade-off:** TypeScript cannot fully infer the props of the target element (e.g., `href` is not type-checked when `as="a"`). We explicitly added `href`, `target`, and `rel` to the props interface as the most common anchor attributes rather than using a complex generic type that would hurt readability. This is a deliberate constraint -- if you need full anchor semantics, you should compose AtelierButton's styles with a native `<a>` tag.

## 2. Compound components for Accordion and Dialog, not data-driven props

**Decision:** Accordion and Dialog use compound component APIs:

```tsx
<AtelierAccordion>
  <AtelierAccordionItem value="faq">
    <AtelierAccordionTrigger>Question</AtelierAccordionTrigger>
    <AtelierAccordionContent>Answer</AtelierAccordionContent>
  </AtelierAccordionItem>
</AtelierAccordion>
```

Instead of a data-driven API:

```tsx
<AtelierAccordion items={[{ title: "Question", content: "Answer" }]} />
```

**Why:** The data-driven approach locks consumers into a fixed content structure. What if a trigger needs an icon? What if content includes a form? The compound pattern gives consumers full control over markup while the parent manages state and keyboard behavior via Context.

**Trade-off:** More verbose JSX. Consumers write more code per instance. But they never hit a wall where the API cannot express what they need, which is more important for a design system primitive.

## 3. Switch uses `children` for label, not a `label` prop

**Decision:** The label is passed as children of AtelierSwitch, not as a `label` prop.

```tsx
<AtelierSwitch>Dark mode</AtelierSwitch>
```

**Why:** A `label` prop constrains the label to a plain string. With children, consumers can include icons, badges, or styled text. The component internally creates a `<label>` element with proper `htmlFor` and `id` wiring, so accessibility is handled regardless of what the children contain.

**Alternative considered:** A `label` string prop with a separate `labelSlot` for rich content. Rejected because two props for the same concept is confusing, and the simpler API covers both cases.

## 4. Variant maps instead of Class Variance Authority (CVA)

**Decision:** Button variants are defined as plain `Record<string, string>` objects with direct lookups, not using the CVA library.

```ts
const variantClasses: Record<AtelierButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground ...",
};
```

**Why:** CVA adds a dependency and an abstraction layer for what is fundamentally a string lookup. The plain object approach is immediately readable, fully type-safe via the `Record` type, and has zero runtime overhead. For a library demonstrating custom implementation, removing unnecessary abstractions is the point.

**When CVA makes sense:** In a large design system with many components that share variant patterns and need compound variant logic (e.g., "destructive + outline" produces a different style than either alone). Atelier primitives do not currently need compound variants.

## 5. CSS grid for animated height, not JavaScript measurement

**Decision:** Accordion content height animation uses `grid-template-rows: 0fr` to `1fr` transition, not JavaScript-based height measurement.

**Why:** The traditional approach measures the content height with JavaScript, sets an explicit pixel value, and transitions to it. This requires a ref, a ResizeObserver for dynamic content, and careful timing with React's render cycle. The CSS grid approach works with any content height, responds to content changes automatically, and requires zero JavaScript.

**Trade-off:** Slightly less browser support than explicit height transitions (CSS grid subgrid/fr units in animations). All modern browsers support this. IE11 does not, but IE11 is not a target.

## 6. Custom hooks over inline logic

**Decision:** Reusable behavior patterns are extracted into hooks (`useControllable`, `useFocusTrap`, `useScrollLock`) rather than being implemented inline in each component.

**Why:**
- **Testability.** Each hook can be tested independently of any component.
- **Consistency.** Every component that needs controlled/uncontrolled state uses the same implementation, not similar-but-slightly-different inline logic.
- **Documentation.** A named hook communicates intent. `useControllable` tells you what pattern is being used without reading the implementation.

**Rule:** A hook is extracted when the same logic appears (or would appear) in two or more components. Single-use logic stays inline.

## 7. `inert` attribute for background content, not `aria-hidden`

**Decision:** When AtelierDialog is open, sibling DOM nodes get the `inert` attribute, not `aria-hidden="true"`.

**Why:** `aria-hidden` only hides content from screen readers. Users can still Tab into hidden content and interact with it visually. `inert` makes content both invisible to assistive technology and non-interactive -- no tabbing, no clicking, no selecting. It is the correct semantic for "this content is behind a modal."

**Trade-off:** `inert` is newer and was not supported in Firefox before version 112 (March 2023). As of 2025, all major browsers support it. For legacy browser support, a polyfill exists.

## 8. CSS Modules + Style Dictionary, not Tailwind

**Decision:** Components are styled with CSS Modules (`.module.css` files) referencing CSS custom properties generated by Style Dictionary. Tailwind was removed entirely.

**Why:** Three reasons:

1. **Ownership.** A design system library should not depend on a utility framework for its internal styling. Tailwind is an application-level tool -- consumers may or may not use it. The library's styles should be self-contained.
2. **Token pipeline.** Style Dictionary transforms JSON token definitions into platform outputs (CSS, iOS, Android). This is real design system infrastructure. Defining tokens as Tailwind config values locks them into one platform.
3. **Clarity.** CSS Modules make the relationship between component and style explicit. Each component has a `.module.css` file with readable CSS that references semantic variables (`var(--color-primary)`). There is no abstraction layer between the design intent and the implementation.

**Trade-off:** More verbose than utility classes. A Tailwind button is one line of class names; a CSS Module button is 15 lines of CSS. But those 15 lines are readable, debuggable, and do not require knowledge of a framework's shorthand conventions.

## 9. AtelierCheckbox is APG-strict (Space only); AtelierSwitch accepts Space and Enter

**Decision:** AtelierCheckbox toggles only on Space, never on Enter. AtelierSwitch toggles on both Space and Enter.

**Why:** The two ARIA patterns have different keyboard contracts. The WAI-ARIA Authoring Practices specify Space as the only activation key for `role="checkbox"`, while `role="switch"` allows both Space and Enter. The divergence reflects how screen reader users actually interact with these controls -- experienced users have memorized that Enter does not toggle a checkbox.

To enforce APG-strict behavior, AtelierCheckbox calls `preventDefault()` on Enter inside its `onKeyDown` handler. This suppresses the native `<button>` activation that would otherwise fire on Enter. Without the suppression, the underlying button element would emit a click and the checkbox would toggle, contradicting the ARIA spec.

**Trade-off:** A consumer might find it surprising that Enter does nothing on the checkbox when the same key works on every other Atelier interactive element. The trade-off is correctness over consistency: the checkbox behaves the way assistive technology users expect from `role="checkbox"`, even at the cost of a visible inconsistency in the keyboard model across primitives.
