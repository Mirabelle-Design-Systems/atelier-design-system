import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const keyboardPatterns = [
  { component: "Button", keys: "Enter, Space", action: "Activate the button" },
  { component: "Switch", keys: "Enter, Space", action: "Toggle checked state" },
  {
    component: "Accordion",
    keys: "Enter, Space",
    action: "Expand or collapse section",
  },
  {
    component: "Accordion",
    keys: "Arrow Down / Up",
    action: "Move focus between triggers",
  },
  { component: "Accordion", keys: "Home / End", action: "Jump to first / last trigger" },
  { component: "Dialog", keys: "Escape", action: "Close the dialog" },
  { component: "Dialog", keys: "Tab", action: "Cycle focus within the dialog" },
];

const ariaUsage = [
  {
    component: "Button",
    attributes: "aria-disabled, aria-busy",
    notes: "Set when disabled or loading. Prevents interaction while staying in tab order when aria-disabled is used.",
  },
  {
    component: "Switch",
    attributes: "role=switch, aria-checked, aria-labelledby",
    notes: "Announces toggle state to screen readers. Label is associated via aria-labelledby.",
  },
  {
    component: "Accordion",
    attributes: "aria-expanded, aria-controls",
    notes: "Each trigger announces whether its panel is open. aria-controls links trigger to panel.",
  },
  {
    component: "Dialog",
    attributes: "role=dialog, aria-modal, aria-labelledby, aria-describedby",
    notes: "Modal dialog pattern. Title and description are linked by id.",
  },
];

export default function AccessibilityPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Accessibility</h1>
      <p className={showcase.pageDescription}>
        Every Atelier primitive is built to meet WCAG 2.2 AA. This page
        documents the keyboard interaction patterns, ARIA conventions, and
        common pitfalls.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Keyboard Patterns</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Key(s)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {keyboardPatterns.map((row, i) => (
              <tr key={i}>
                <td>{row.component}</td>
                <td>
                  {row.keys.split(", ").map((k, j) => (
                    <span key={j}>
                      {j > 0 && " "}
                      <kbd className={styles.kbd}>{k.trim()}</kbd>
                    </span>
                  ))}
                </td>
                <td>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>ARIA Usage</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Component</th>
              <th>Attributes</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {ariaUsage.map((row, i) => (
              <tr key={i}>
                <td>{row.component}</td>
                <td>
                  <code className={showcase.code}>{row.attributes}</code>
                </td>
                <td>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Do / Don't</h2>
        <div className={styles.doDont}>
          <div className={styles.doCard}>
            <div className={`${styles.cardLabel} ${styles.doLabel}`}>Do</div>
            <div className={styles.cardContent}>
              Use visible focus indicators on all interactive elements. The
              system provides a 2px ring via --color-ring on :focus-visible.
            </div>
          </div>
          <div className={styles.dontCard}>
            <div className={`${styles.cardLabel} ${styles.dontLabel}`}>
              Don't
            </div>
            <div className={styles.cardContent}>
              Remove outline styles or hide focus rings. Users who navigate
              with a keyboard lose track of their position on the page.
            </div>
          </div>
        </div>
        <div className={styles.doDont}>
          <div className={styles.doCard}>
            <div className={`${styles.cardLabel} ${styles.doLabel}`}>Do</div>
            <div className={styles.cardContent}>
              Provide meaningful aria-label or visible text for icon-only
              buttons. Screen readers cannot infer meaning from an SVG alone.
            </div>
          </div>
          <div className={styles.dontCard}>
            <div className={`${styles.cardLabel} ${styles.dontLabel}`}>
              Don't
            </div>
            <div className={styles.cardContent}>
              Rely on colour alone to convey state. Pair colour changes with
              text, icons, or ARIA attributes so the information is available
              to all users.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
