import type { Meta, StoryObj } from "@storybook/react";
import styles from "./foundations.module.css";

const spacingScale = [
  { token: "--spacing-0", value: "0", px: "0px" },
  { token: "--spacing-1", value: "0.25rem", px: "4px" },
  { token: "--spacing-1-5", value: "0.375rem", px: "6px" },
  { token: "--spacing-2", value: "0.5rem", px: "8px" },
  { token: "--spacing-3", value: "0.75rem", px: "12px" },
  { token: "--spacing-4", value: "1rem", px: "16px" },
  { token: "--spacing-5", value: "1.25rem", px: "20px" },
  { token: "--spacing-6", value: "1.5rem", px: "24px" },
  { token: "--spacing-8", value: "2rem", px: "32px" },
  { token: "--spacing-10", value: "2.5rem", px: "40px" },
  { token: "--spacing-12", value: "3rem", px: "48px" },
];

function SpacingPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Spacing</h1>
      <p className={styles.pageDescription}>
        A consistent spacing scale based on a 4px grid. Used for padding,
        margins, and gaps throughout all components. Defined in
        tokens/base/spacing.json.
      </p>

      <h2 className={styles.sectionTitle}>Scale</h2>
      {spacingScale.map((s) => (
        <div key={s.token} className={styles.spacingRow}>
          <span className={styles.spacingLabel}>{s.token.replace("--spacing-", "")}</span>
          <div className={styles.spacingBar} style={{ width: s.value === "0" ? "2px" : s.value }} />
          <span className={styles.spacingValue}>{s.value} ({s.px})</span>
        </div>
      ))}

      <h2 className={styles.sectionTitle}>Usage</h2>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Context</th>
            <th>Token</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tight inline gap</td>
            <td><code>--spacing-1-5</code></td>
            <td>Icon-to-label gap in buttons</td>
          </tr>
          <tr>
            <td>Component padding</td>
            <td><code>--spacing-3</code> to <code>--spacing-4</code></td>
            <td>Button horizontal padding, card padding</td>
          </tr>
          <tr>
            <td>Section spacing</td>
            <td><code>--spacing-6</code> to <code>--spacing-8</code></td>
            <td>Dialog footer margin, form group gaps</td>
          </tr>
          <tr>
            <td>Page-level spacing</td>
            <td><code>--spacing-10</code> to <code>--spacing-12</code></td>
            <td>Section separators, layout gutters</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Spacing",
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <SpacingPage />,
};
