import type { Meta, StoryObj } from "@storybook/react";
import { AtelierButton } from "../components/AtelierButton";
import styles from "./patterns.module.css";

function FormPatternPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Form Pattern</h1>
      <p className={styles.pageDescription}>
        Forms compose inputs, labels, hints, and buttons into a consistent
        structure. All interactive elements use design tokens for spacing,
        color, and radius. Focus states use the ring token for visual consistency.
      </p>

      <div className={styles.preview}>
        <div className={styles.previewLabel}>Example: Contact Form</div>
        <form
          className={styles.form}
          onSubmit={(e) => { e.preventDefault(); alert("Submitted"); }}
        >
          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label htmlFor="firstName" className={styles.label}>First name</label>
              <input id="firstName" type="text" className={styles.input} placeholder="Jane" />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="lastName" className={styles.label}>Last name</label>
              <input id="lastName" type="text" className={styles.input} placeholder="Doe" />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input id="email" type="email" className={styles.input} placeholder="jane@example.com" />
            <span className={styles.hint}>We will never share your email.</span>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea id="message" className={styles.textarea} placeholder="How can we help?" />
          </div>

          <div className={styles.formActions}>
            <AtelierButton variant="outline" type="button">Cancel</AtelierButton>
            <AtelierButton type="submit">Send message</AtelierButton>
          </div>
        </form>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Patterns/Form",
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <FormPatternPage />,
};
