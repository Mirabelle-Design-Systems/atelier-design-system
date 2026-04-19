import type { Meta, StoryObj } from "@storybook/react";
import styles from "./foundations.module.css";

const typeScale = [
  { token: "--font-size-xs", size: "0.75rem", label: "xs (12px)" },
  { token: "--font-size-sm", size: "0.875rem", label: "sm (14px)" },
  { token: "--font-size-base", size: "1rem", label: "base (16px)" },
  { token: "--font-size-lg", size: "1.125rem", label: "lg (18px)" },
  { token: "--font-size-xl", size: "1.25rem", label: "xl (20px)" },
];

const weights = [
  { token: "--font-weight-normal", value: "400", label: "Normal" },
  { token: "--font-weight-medium", value: "500", label: "Medium" },
  { token: "--font-weight-semibold", value: "600", label: "Semibold" },
  { token: "--font-weight-bold", value: "700", label: "Bold" },
];

function TypographyPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Typography</h1>
      <p className={styles.pageDescription}>
        Type tokens cover font families, sizes, weights, and line heights.
        All values are defined in tokens/base/typography.json and generated
        as CSS variables by Style Dictionary.
      </p>

      <h2 className={styles.sectionTitle}>Font Families</h2>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Sample</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--font-family-sans</code></td>
            <td>Inter, system-ui, sans-serif</td>
            <td style={{ fontFamily: "var(--font-family-sans)" }}>The quick brown fox jumps over the lazy dog</td>
          </tr>
          <tr>
            <td><code>--font-family-mono</code></td>
            <td>JetBrains Mono, monospace</td>
            <td style={{ fontFamily: "var(--font-family-mono)" }}>const x = 42;</td>
          </tr>
        </tbody>
      </table>

      <h2 className={styles.sectionTitle}>Type Scale</h2>
      {typeScale.map((t) => (
        <div key={t.token} className={styles.typeRow}>
          <span className={styles.typeLabel}>{t.label}</span>
          <span className={styles.typeSample} style={{ fontSize: t.size }}>
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      ))}

      <h2 className={styles.sectionTitle}>Font Weights</h2>
      {weights.map((w) => (
        <div key={w.token} className={styles.typeRow}>
          <span className={styles.typeLabel}>{w.label} ({w.value})</span>
          <span
            className={styles.typeSample}
            style={{ fontWeight: Number(w.value), fontSize: "var(--font-size-lg)" }}
          >
            Atelier Design System
          </span>
        </div>
      ))}

      <h2 className={styles.sectionTitle}>Line Heights</h2>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--font-line-height-tight</code></td>
            <td>1.25</td>
            <td>Headings, buttons, labels</td>
          </tr>
          <tr>
            <td><code>--font-line-height-normal</code></td>
            <td>1.5</td>
            <td>Body text, descriptions</td>
          </tr>
          <tr>
            <td><code>--font-line-height-relaxed</code></td>
            <td>1.625</td>
            <td>Long-form content</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Typography",
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <TypographyPage />,
};
