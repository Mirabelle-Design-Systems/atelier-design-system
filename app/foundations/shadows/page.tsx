import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const shadows = [
  { name: "shadow-xs", variable: "--shadow-xs", usage: "Hairline lift (inputs, toggles)" },
  { name: "shadow-sm", variable: "--shadow-sm", usage: "Cards at rest" },
  { name: "shadow-md", variable: "--shadow-md", usage: "Popovers, dropdowns" },
  { name: "shadow-lg", variable: "--shadow-lg", usage: "Modals, command palettes" },
  { name: "shadow-xl", variable: "--shadow-xl", usage: "Heavy overlays, onboarding" },
];

export default function ShadowsPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Shadows</h1>
      <p className={showcase.pageDescription}>
        A five-step elevation scale. Each step expresses a different layer of
        hierarchy so a reader can tell at a glance how far a surface sits from
        the page.
      </p>

      <div className={styles.grid}>
        {shadows.map((token) => (
          <div key={token.name} className={styles.card}>
            <div
              className={styles.preview}
              style={{ boxShadow: `var(${token.variable})` }}
            />
            <div className={styles.info}>
              <div className={styles.name}>{token.name}</div>
              <div className={styles.value}>{token.variable}</div>
              <div className={styles.usage}>{token.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
