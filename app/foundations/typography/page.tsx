import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const sizeScale = [
  { token: "--font-size-xs", value: "0.75rem", label: "xs" },
  { token: "--font-size-sm", value: "0.875rem", label: "sm" },
  { token: "--font-size-base", value: "1rem", label: "base" },
  { token: "--font-size-lg", value: "1.125rem", label: "lg" },
  { token: "--font-size-xl", value: "1.25rem", label: "xl" },
];

const weights = [
  { token: "--font-weight-normal", value: "400", label: "Normal" },
  { token: "--font-weight-medium", value: "500", label: "Medium" },
  { token: "--font-weight-semibold", value: "600", label: "Semibold" },
  { token: "--font-weight-bold", value: "700", label: "Bold" },
];

const lineHeights = [
  { token: "--font-line-height-tight", value: "1.25rem" },
  { token: "--font-line-height-normal", value: "1.5rem" },
  { token: "--font-line-height-relaxed", value: "1.625rem" },
];

export default function TypographyPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Typography</h1>
      <p className={showcase.pageDescription}>
        Type scale, font families, weights, and line heights used throughout
        the design system.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Font Families</h2>
        <div className={styles.fontPreview}>
          <div>
            <div className={styles.fontLabel}>Sans (--font-family-sans)</div>
            <div className={styles.fontSans}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
          <div>
            <div className={styles.fontLabel}>Mono (--font-family-mono)</div>
            <div className={styles.fontMono}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Size Scale</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Size</th>
              <th>Sample</th>
            </tr>
          </thead>
          <tbody>
            {sizeScale.map((s) => (
              <tr key={s.token}>
                <td className={styles.tokenName}>{s.token}</td>
                <td className={styles.tokenName}>{s.value}</td>
                <td
                  className={styles.sample}
                  style={{ fontSize: `var(${s.token})` }}
                >
                  {s.label} -- The quick brown fox
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Weights</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Sample</th>
            </tr>
          </thead>
          <tbody>
            {weights.map((w) => (
              <tr key={w.token}>
                <td className={styles.tokenName}>{w.token}</td>
                <td className={styles.tokenName}>{w.value}</td>
                <td
                  className={styles.sample}
                  style={{ fontWeight: `var(${w.token})` }}
                >
                  {w.label}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Line Heights</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {lineHeights.map((lh) => (
              <tr key={lh.token}>
                <td className={styles.tokenName}>{lh.token}</td>
                <td className={styles.tokenName}>{lh.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
