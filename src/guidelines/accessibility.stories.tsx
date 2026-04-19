import type { Meta, StoryObj } from "@storybook/react";
import styles from "./guidelines.module.css";

function AccessibilityPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Accessibility</h1>
      <p className={styles.pageDescription}>
        Every Atelier primitive is built to be accessible by default. This page
        documents the ARIA patterns, keyboard behaviors, and principles applied
        across the system.
      </p>

      <h2 className={styles.sectionTitle}>Principles</h2>
      <ul className={styles.list}>
        <li>Semantic HTML first. ARIA only when native elements cannot express the pattern.</li>
        <li>Every interactive element is keyboard accessible.</li>
        <li>Focus indicators are always visible (never <span className={styles.code}>outline: none</span> without a replacement).</li>
        <li>Color is never the sole indicator of state or meaning.</li>
        <li>All components are tested with axe-core for automated violations.</li>
      </ul>

      <h2 className={styles.sectionTitle}>Keyboard Patterns by Component</h2>

      <div className={styles.card}>
        <div className={styles.cardTitle}>AtelierButton</div>
        <ul className={styles.list}>
          <li><span className={styles.code}>Enter</span> / <span className={styles.code}>Space</span> -- activates the button</li>
          <li><span className={styles.code}>Tab</span> -- moves focus to the next focusable element</li>
          <li>Loading state sets <span className={styles.code}>aria-busy="true"</span> and disables interaction</li>
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>AtelierSwitch</div>
        <ul className={styles.list}>
          <li><span className={styles.code}>Space</span> / <span className={styles.code}>Enter</span> -- toggles the switch</li>
          <li>Uses <span className={styles.code}>role="switch"</span> with <span className={styles.code}>aria-checked</span></li>
          <li>Label is wired via <span className={styles.code}>aria-labelledby</span> pointing to a <span className={styles.code}>&lt;label&gt;</span> element</li>
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>AtelierAccordion</div>
        <ul className={styles.list}>
          <li><span className={styles.code}>Enter</span> / <span className={styles.code}>Space</span> -- toggles the focused section</li>
          <li><span className={styles.code}>Arrow Down</span> -- moves focus to next trigger (wraps)</li>
          <li><span className={styles.code}>Arrow Up</span> -- moves focus to previous trigger (wraps)</li>
          <li><span className={styles.code}>Home</span> -- moves focus to first trigger</li>
          <li><span className={styles.code}>End</span> -- moves focus to last trigger</li>
          <li>Each trigger has <span className={styles.code}>aria-expanded</span> and <span className={styles.code}>aria-controls</span></li>
          <li>Each panel has <span className={styles.code}>role="region"</span> with <span className={styles.code}>aria-labelledby</span></li>
        </ul>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>AtelierDialog</div>
        <ul className={styles.list}>
          <li><span className={styles.code}>Escape</span> -- closes the dialog</li>
          <li><span className={styles.code}>Tab</span> / <span className={styles.code}>Shift+Tab</span> -- cycles focus within the dialog (focus trap)</li>
          <li>Background content is marked <span className={styles.code}>inert</span> (not just aria-hidden)</li>
          <li>Focus auto-moves to the first focusable element on open</li>
          <li>Focus returns to the trigger element on close</li>
          <li>Body scroll is locked while open</li>
          <li><span className={styles.code}>aria-modal="true"</span> with <span className={styles.code}>role="dialog"</span></li>
          <li>Title and description linked via <span className={styles.code}>aria-labelledby</span> / <span className={styles.code}>aria-describedby</span></li>
        </ul>
      </div>

      <h2 className={styles.sectionTitle}>Semantic HTML vs ARIA</h2>
      <div className={styles.grid}>
        <div className={styles.do}>
          <div className={styles.doLabel}>Do</div>
          <p className={styles.body}>
            Use native <span className={styles.code}>&lt;button&gt;</span> elements for interactive
            controls. They provide focus, keyboard activation, and disabled
            state for free.
          </p>
        </div>
        <div className={styles.dont}>
          <div className={styles.dontLabel}>Don't</div>
          <p className={styles.body}>
            Use <span className={styles.code}>&lt;div onClick&gt;</span> with <span className={styles.code}>role="button"</span>.
            You would need to manually add tabindex, keydown handlers for
            Space and Enter, and disabled logic.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.do}>
          <div className={styles.doLabel}>Do</div>
          <p className={styles.body}>
            Use <span className={styles.code}>&lt;h3&gt;</span> around accordion triggers to give
            screen readers heading structure within the accordion.
          </p>
        </div>
        <div className={styles.dont}>
          <div className={styles.dontLabel}>Don't</div>
          <p className={styles.body}>
            Wrap triggers in <span className={styles.code}>&lt;div role="heading"&gt;</span>. The
            native heading element is simpler and universally supported.
          </p>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Testing</h2>
      <p className={styles.body}>
        Every component has automated axe-core tests via vitest-axe. Run the
        full suite with <span className={styles.code}>npm test</span>. The Storybook a11y addon
        provides real-time audits in the Accessibility panel for every story.
      </p>
    </div>
  );
}

const meta: Meta = {
  title: "Guidelines/Accessibility",
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <AccessibilityPage />,
};
