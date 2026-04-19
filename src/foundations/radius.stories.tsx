import type { Meta, StoryObj } from "@storybook/react";
import styles from "./foundations.module.css";

const radii = [
  { token: "--radius-sm", value: "0.5rem", label: "sm" },
  { token: "--radius-md", value: "0.625rem", label: "md" },
  { token: "--radius-lg", value: "0.75rem", label: "lg" },
  { token: "--radius-full", value: "9999px", label: "full" },
];

function RadiusPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Border Radius</h1>
      <p className={styles.pageDescription}>
        A constrained radius scale ensures visual consistency. Components
        reference these tokens rather than arbitrary values. Defined in
        tokens/base/radius.json.
      </p>

      <h2 className={styles.sectionTitle}>Scale</h2>
      <div className={styles.radiusGrid}>
        {radii.map((r) => (
          <div key={r.token} className={styles.radiusItem}>
            <div
              className={styles.radiusBox}
              style={{ borderRadius: r.value }}
            />
            <span className={styles.radiusLabel}>
              {r.label}
              <br />
              {r.value}
            </span>
          </div>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>Usage</h2>
      <table className={styles.tokenTable}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Component</th>
            <th>Context</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>--radius-sm</code></td>
            <td>AtelierButton (sm size), close buttons</td>
            <td>Subtle rounding for small interactive elements</td>
          </tr>
          <tr>
            <td><code>--radius-md</code></td>
            <td>AtelierButton (sm/md), inputs</td>
            <td>Default rounding for most controls</td>
          </tr>
          <tr>
            <td><code>--radius-lg</code></td>
            <td>AtelierButton (md/lg), AtelierDialog, cards</td>
            <td>Prominent rounding for containers and primary actions</td>
          </tr>
          <tr>
            <td><code>--radius-full</code></td>
            <td>AtelierSwitch track and thumb</td>
            <td>Fully rounded / pill shape</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Border Radius",
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <RadiusPage />,
};
