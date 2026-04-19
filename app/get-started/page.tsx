import styles from "./page.module.css";
import showcase from "../../app-components/showcase.module.css";

export default function GetStartedPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Get started</h1>
      <p className={showcase.pageDescription}>
        Atelier Primitives is a hand-rolled React component library. Zero Radix,
        zero Tailwind, full WAI-ARIA compliance. This page walks through
        installation, theming, and a first component.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>1. Install</h2>
        <pre className={styles.code}>
          <code>npm install atelier-design-system</code>
        </pre>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>2. Import the stylesheet</h2>
        <p className={showcase.sectionDescription}>
          One stylesheet covers all primitives, both brands, and both themes.
          Import it once at your app entry point.
        </p>
        <pre className={styles.code}>
          <code>{`import "atelier-design-system/style.css";`}</code>
        </pre>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>3. Set the brand and theme</h2>
        <p className={showcase.sectionDescription}>
          Wrap any element with <code>data-brand</code> and toggle a{" "}
          <code>.dark</code> class to switch themes. Both cascade through the
          subtree.
        </p>
        <pre className={styles.code}>
          <code>{`<html data-brand="atelier" class="dark">
  {/* components inherit brand + theme */}
</html>`}</code>
        </pre>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>4. Use a component</h2>
        <pre className={styles.code}>
          <code>{`import { AtelierButton } from "atelier-design-system";

export function Example() {
  return <AtelierButton variant="primary">Save</AtelierButton>;
}`}</code>
        </pre>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>What to read next</h2>
        <ul className={styles.links}>
          <li>
            <strong>Foundations</strong> — tokens, colors, typography, spacing,
            motion. Every visual value in the system.
          </li>
          <li>
            <strong>Primitives</strong> — each component page covers the API,
            keyboard behavior, and live examples.
          </li>
          <li>
            <strong>Patterns</strong> — real-world compositions: forms,
            settings screens, confirmation flows.
          </li>
          <li>
            <strong>Guidelines / Accessibility</strong> — the a11y expectations
            every primitive meets.
          </li>
        </ul>
      </div>
    </div>
  );
}
