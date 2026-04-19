import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const breakpoints = [
  { name: "sm", min: "640px", description: "Large phones, compact tablets in portrait" },
  { name: "md", min: "768px", description: "Tablets, small laptops" },
  { name: "lg", min: "1024px", description: "Laptops, desktops" },
  { name: "xl", min: "1280px", description: "Wide desktops" },
  { name: "2xl", min: "1536px", description: "Large desktop monitors" },
];

export default function BreakpointsPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Breakpoints</h1>
      <p className={showcase.pageDescription}>
        Atelier uses a mobile-first responsive strategy. Components are built to
        render correctly at any viewport; breakpoints are where layout
        compositions shift, not where components break.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>The scale</h2>
        <div className={styles.list}>
          {breakpoints.map((bp) => (
            <div key={bp.name} className={styles.row}>
              <div className={styles.name}>{bp.name}</div>
              <div className={styles.min}>min-width: {bp.min}</div>
              <div className={styles.description}>{bp.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Philosophy</h2>
        <p className={showcase.sectionDescription}>
          Components do not watch breakpoints. They express themselves in
          intrinsic units (em, rem, ch) and container queries when supported,
          so a component behaves correctly regardless of whether the surrounding
          page is wide or narrow.
        </p>
        <p className={showcase.sectionDescription}>
          Breakpoints govern <strong>composition</strong> — when a two-column
          layout becomes stacked, when a sidebar becomes a drawer, when a table
          becomes a card list. A Dialog or a Button looks and behaves the same
          on every device.
        </p>
      </div>
    </div>
  );
}
