import type { Meta, StoryObj } from "@storybook/react";
import { AtelierButton } from "../components/AtelierButton";
import {
  AtelierDialog,
  AtelierDialogTrigger,
  AtelierDialogContent,
  AtelierDialogHeader,
  AtelierDialogFooter,
  AtelierDialogTitle,
  AtelierDialogDescription,
  AtelierDialogClose,
} from "../components/AtelierDialog";
import styles from "./patterns.module.css";

const cancelStyle: React.CSSProperties = {
  display: "inline-flex",
  height: "2.5rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "var(--radius-lg)",
  border: "1px solid var(--color-border)",
  backgroundColor: "var(--color-background)",
  padding: "0 1rem",
  fontSize: "var(--font-size-sm)",
  fontWeight: 500,
  cursor: "pointer",
};

function ConfirmationPatternPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Confirmation Pattern</h1>
      <p className={styles.pageDescription}>
        Confirmations use the Dialog primitive to interrupt the user before
        a destructive or irreversible action. The dialog traps focus, locks
        scroll, and marks background content as inert. The destructive action
        button uses the destructive variant to signal risk.
      </p>

      <h2 className={styles.sectionTitle}>Destructive Confirmation</h2>
      <div className={styles.preview}>
        <div className={styles.previewLabel}>Example: Delete Account</div>
        <AtelierDialog>
          <AtelierDialogTrigger>
            <AtelierButton variant="destructive">Delete account</AtelierButton>
          </AtelierDialogTrigger>
          <AtelierDialogContent>
            <AtelierDialogHeader>
              <AtelierDialogTitle>Delete account</AtelierDialogTitle>
              <AtelierDialogDescription>
                This will permanently delete your account and all associated
                data. This action cannot be undone.
              </AtelierDialogDescription>
            </AtelierDialogHeader>
            <AtelierDialogFooter>
              <AtelierDialogClose style={cancelStyle}>Cancel</AtelierDialogClose>
              <AtelierButton variant="destructive">Yes, delete my account</AtelierButton>
            </AtelierDialogFooter>
          </AtelierDialogContent>
        </AtelierDialog>
      </div>

      <h2 className={styles.sectionTitle}>Non-Destructive Confirmation</h2>
      <div className={styles.preview}>
        <div className={styles.previewLabel}>Example: Publish Changes</div>
        <AtelierDialog>
          <AtelierDialogTrigger>
            <AtelierButton>Publish changes</AtelierButton>
          </AtelierDialogTrigger>
          <AtelierDialogContent>
            <AtelierDialogHeader>
              <AtelierDialogTitle>Publish changes</AtelierDialogTitle>
              <AtelierDialogDescription>
                This will make your changes visible to all users. You can
                revert changes later from the version history.
              </AtelierDialogDescription>
            </AtelierDialogHeader>
            <AtelierDialogFooter>
              <AtelierDialogClose style={cancelStyle}>Cancel</AtelierDialogClose>
              <AtelierButton>Publish</AtelierButton>
            </AtelierDialogFooter>
          </AtelierDialogContent>
        </AtelierDialog>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Patterns/Confirmation",
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <ConfirmationPatternPage />,
};
