import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const transitions = [
  {
    name: "transition-fast",
    variable: "--transition-fast",
    value: "150ms ease",
    usage: "Hover state changes, icon swaps, focus rings",
  },
  {
    name: "transition-normal",
    variable: "--transition-normal",
    value: "200ms ease",
    usage: "Toggles, switches, small surface transitions",
  },
  {
    name: "transition-slow",
    variable: "--transition-slow",
    value: "300ms ease",
    usage: "Overlays, accordions, larger surface movement",
  },
];

export default function MotionPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Motion</h1>
      <p className={showcase.pageDescription}>
        Three transition durations cover every animation in the system. Each
        value is an easing-plus-duration shorthand so components can apply a
        single token.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Reduced motion</h2>
        <p className={showcase.sectionDescription}>
          All transitions respect the user&apos;s <code>prefers-reduced-motion</code>
          {" "}setting. When reduced motion is requested by the system, components
          fall back to instant state changes with no animation.
        </p>
      </div>

      <div className={styles.list}>
        {transitions.map((token) => (
          <div key={token.name} className={styles.row}>
            <div className={styles.info}>
              <div className={styles.name}>{token.name}</div>
              <div className={styles.value}>
                {token.variable} · {token.value}
              </div>
              <div className={styles.usage}>{token.usage}</div>
            </div>
            <div
              className={styles.demo}
              style={{ transition: `transform var(${token.variable})` }}
            />
          </div>
        ))}
      </div>

      <p className={showcase.sectionDescription}>
        Hover any row above to see the duration applied to a translating square.
      </p>
    </div>
  );
}
