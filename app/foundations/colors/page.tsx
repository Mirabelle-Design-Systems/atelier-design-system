import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const colorTokens = [
  { name: "background", variable: "--color-background" },
  { name: "foreground", variable: "--color-foreground" },
  { name: "card", variable: "--color-card" },
  { name: "card-foreground", variable: "--color-card-foreground" },
  { name: "primary", variable: "--color-primary" },
  { name: "primary-foreground", variable: "--color-primary-foreground" },
  { name: "primary-hover", variable: "--color-primary-hover" },
  { name: "primary-light", variable: "--color-primary-light" },
  { name: "secondary", variable: "--color-secondary" },
  { name: "secondary-foreground", variable: "--color-secondary-foreground" },
  { name: "secondary-light", variable: "--color-secondary-light" },
  { name: "muted", variable: "--color-muted" },
  { name: "muted-foreground", variable: "--color-muted-foreground" },
  { name: "accent", variable: "--color-accent" },
  { name: "accent-foreground", variable: "--color-accent-foreground" },
  { name: "destructive", variable: "--color-destructive" },
  { name: "destructive-foreground", variable: "--color-destructive-foreground" },
  { name: "border", variable: "--color-border" },
  { name: "input", variable: "--color-input" },
  { name: "ring", variable: "--color-ring" },
  { name: "warning", variable: "--color-warning" },
  { name: "subtle", variable: "--color-subtle" },
  { name: "surface-elevated", variable: "--color-surface-elevated" },
  { name: "border-light", variable: "--color-border-light" },
];

export default function ColorsPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Colors</h1>
      <p className={showcase.pageDescription}>
        All color tokens exposed as CSS custom properties. Values update
        automatically when switching between themes and brands.
      </p>

      <div className={styles.grid}>
        {colorTokens.map((token) => (
          <div key={token.name} className={styles.swatch}>
            <div
              className={styles.swatchColor}
              style={{ backgroundColor: `var(${token.variable})` }}
            />
            <div className={styles.swatchInfo}>
              <div className={styles.swatchName}>{token.name}</div>
              <div className={styles.swatchValue}>{token.variable}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
