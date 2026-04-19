import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const radiusTokens = [
  { token: "--radius-sm", value: "0.5rem" },
  { token: "--radius-md", value: "0.625rem" },
  { token: "--radius-lg", value: "0.75rem" },
  { token: "--radius-full", value: "9999px" },
];

export default function RadiusPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Border Radius</h1>
      <p className={showcase.pageDescription}>
        Border radius tokens control the rounding of corners across all
        interactive and container elements.
      </p>

      <div className={styles.grid}>
        {radiusTokens.map((r) => (
          <div key={r.token} className={styles.radiusItem}>
            <div
              className={styles.radiusBox}
              style={{ borderRadius: `var(${r.token})` }}
            />
            <div className={styles.radiusLabel}>{r.token}</div>
            <div className={styles.radiusValue}>{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
