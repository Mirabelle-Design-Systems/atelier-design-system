import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const spacingTokens = [
  { token: "--spacing-0", value: "0" },
  { token: "--spacing-1", value: "0.25rem" },
  { token: "--spacing-1-5", value: "0.375rem" },
  { token: "--spacing-2", value: "0.5rem" },
  { token: "--spacing-3", value: "0.75rem" },
  { token: "--spacing-4", value: "1rem" },
  { token: "--spacing-5", value: "1.25rem" },
  { token: "--spacing-6", value: "1.5rem" },
  { token: "--spacing-8", value: "2rem" },
  { token: "--spacing-10", value: "2.5rem" },
  { token: "--spacing-12", value: "3rem" },
];

export default function SpacingPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Spacing</h1>
      <p className={showcase.pageDescription}>
        A consistent spacing scale used for padding, margins, and gaps
        throughout every component and layout.
      </p>

      <div className={showcase.section}>
        <div className={styles.scale}>
          {spacingTokens.map((s) => (
            <div key={s.token} className={styles.row}>
              <span className={styles.tokenLabel}>{s.token}</span>
              <div
                className={styles.bar}
                style={{ width: `var(${s.token})`, minWidth: s.value === "0" ? "2px" : undefined }}
              />
              <span className={styles.valueLabel}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
