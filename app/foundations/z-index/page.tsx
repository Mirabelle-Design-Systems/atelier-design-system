import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const layers = [
  { name: "z-hide", variable: "--z-hide", value: "-1", usage: "Pushed behind the page (rare)" },
  { name: "z-base", variable: "--z-base", value: "0", usage: "Normal in-flow content" },
  { name: "z-dropdown", variable: "--z-dropdown", value: "1000", usage: "Select menus, dropdowns" },
  { name: "z-sticky", variable: "--z-sticky", value: "1100", usage: "Sticky headers, table headers" },
  { name: "z-overlay", variable: "--z-overlay", value: "1200", usage: "Dialog overlay backdrops" },
  { name: "z-modal", variable: "--z-modal", value: "1300", usage: "Dialogs, drawers" },
  { name: "z-popover", variable: "--z-popover", value: "1400", usage: "Popovers, context menus" },
  { name: "z-tooltip", variable: "--z-tooltip", value: "1500", usage: "Tooltips (always on top)" },
];

export default function ZIndexPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Z-index</h1>
      <p className={showcase.pageDescription}>
        Every stacked surface in Atelier resolves to one of eight named layers.
        Hard-coded z-index values are banned; components reference the semantic
        tokens so the stacking order stays coherent across the system.
      </p>

      <div className={styles.list}>
        {layers.map((token) => (
          <div key={token.name} className={styles.row}>
            <div className={styles.chip}>{token.value}</div>
            <div className={styles.info}>
              <div className={styles.name}>{token.name}</div>
              <div className={styles.variable}>{token.variable}</div>
              <div className={styles.usage}>{token.usage}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
