"use client";

import { AtelierSwitch } from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const settings = [
  {
    id: "notifications",
    title: "Push notifications",
    description: "Receive alerts on your device when something happens.",
  },
  {
    id: "marketing",
    title: "Marketing emails",
    description: "Receive promotional emails and product updates.",
  },
  {
    id: "analytics",
    title: "Usage analytics",
    description: "Help us improve by sharing anonymous usage data.",
  },
];

export default function SettingsPatternPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Settings Pattern</h1>
      <p className={showcase.pageDescription}>
        A common settings panel layout where each row pairs a label and
        description with an AtelierSwitch toggle.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Preferences</h2>
        <div className={showcase.preview}>
          <div className={styles.settingsPanel}>
            {settings.map((s) => (
              <div key={s.id} className={styles.settingsRow}>
                <div className={styles.settingsLabel}>
                  <span className={styles.settingsTitle}>{s.title}</span>
                  <span className={styles.settingsDescription}>
                    {s.description}
                  </span>
                </div>
                <AtelierSwitch
                  aria-label={s.title}
                  defaultChecked={s.id === "notifications"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
