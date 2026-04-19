## AI in This Project

### How AI Was Used

I used AI as a pair-programming partner throughout the development of `atelier-design-system`. I treated it as a tool for speeding up repetitive implementation work, not as a substitute for judgment. The parts that required interpretation, accessibility rigor, API trade-offs, and visual review stayed with me.

### What AI handled

- **Boilerplate scaffolding.** AI helped generate project setup code like Vite, TypeScript, Tailwind, Storybook configuration, barrel exports, and initial file structure. This was mostly mechanical work with established patterns.
- **Documentation drafting.** AI helped draft parts of `architecture.md` and `decisions.md` based on decisions already made in the implementation.
- **Starting points for component code.** AI produced initial component skeletons as a first pass, which I then reviewed, refined, and completed manually.
- **Test drafting.** AI drafted an initial set of tests for rendering, ARIA attributes, keyboard interaction, and axe audits, which I then validated and adjusted against the real component behavior.

### What was done manually

- **ARIA spec compliance.** I verified every `role`, `aria-*` attribute, and keyboard interaction against the WAI-ARIA Authoring Practices guidance. For example, I manually checked Accordion keyboard behavior like `ArrowUp`, `ArrowDown`, `Home`, `End`, and wrapping behavior, as well as Dialog focus management, including trapping focus, inert behavior, and returning focus correctly.
- **API design decisions.** I made the final decisions about component APIs, including trade-offs like compound components vs. data props, `children` vs. a `label` prop, and whether an `as` prop made sense. Those decisions were intentional and are documented in `decisions.md`.
- **Token values.** The color values, spacing scale, and typography choices came from the existing Atelier Design System. Those are design decisions, not something I delegated to AI.
- **Token conversion verification.** After using a script to convert 35+ design token values from HSL to hex, I manually spot-checked the results against the source tokens and expected colors.
- **Visual review.** I manually reviewed each component in Storybook across variants, states, themes, and brands.
- **Focus trap behavior.** I manually tested the `useFocusTrap` hook with keyboard navigation, including edge cases like zero focusable elements, nested focusable elements, and dynamically added elements.
- **Component structure refinement.** Where AI generated an initial skeleton, I reviewed and adjusted the final imports, `forwardRef` usage, prop interfaces, and JSX structure by hand.
- **Test review and completion.** I reviewed, corrected, and expanded the generated tests to make sure they matched the actual implementation and accessibility behavior.

### Why I Used AI

I used AI to reduce time spent on repetitive, convention-driven work so I could spend more time on the parts that actually required judgment: accessibility compliance, API design, system architecture, testing decisions, and visual QA.

### Impact

- Project setup that would normally take 1-2 hours was completed much faster.
- An initial suite of roughly 50 tests was drafted in a single session and then refined through manual review.
- I had more time to spend on accessibility verification and API design decisions.
- Documentation was written alongside the implementation instead of being left until the end.
