import type { Meta, StoryObj } from "@storybook/react";
import { AtelierSwitch } from "../components/AtelierSwitch";
import styles from "./patterns.module.css";

const settingsItems = [
  {
    label: "Email notifications",
    hint: "Receive emails about account activity",
    defaultChecked: true,
    name: "email",
  },
  {
    label: "Push notifications",
    hint: "Receive push notifications on your device",
    defaultChecked: true,
    name: "push",
  },
  {
    label: "Marketing emails",
    hint: "Receive emails about new features and updates",
    defaultChecked: false,
    name: "marketing",
  },
  {
    label: "Two-factor authentication",
    hint: "Add an extra layer of security to your account",
    defaultChecked: false,
    name: "2fa",
  },
];

function SettingsPatternPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Settings Pattern</h1>
      <p className={styles.pageDescription}>
        Settings compose switches with labels and descriptions in a card layout.
        Each row is a self-contained toggle with clear labeling for accessibility.
        The switch's label is wired via aria-labelledby automatically.
      </p>

      <div className={styles.preview}>
        <div className={styles.previewLabel}>Example: Notification Preferences</div>
        <div className={styles.settingsCard}>
          {settingsItems.map((item) => (
            <div key={item.name} className={styles.settingsRow}>
              <div className={styles.settingsInfo}>
                <span className={styles.settingsLabel}>{item.label}</span>
                <span className={styles.settingsHint}>{item.hint}</span>
              </div>
              <AtelierSwitch name={item.name} defaultChecked={item.defaultChecked} aria-label={item.label} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Patterns/Settings",
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <SettingsPatternPage />,
};
