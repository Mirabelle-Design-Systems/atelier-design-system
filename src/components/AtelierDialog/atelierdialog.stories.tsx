import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AtelierDialog,
  AtelierDialogTrigger,
  AtelierDialogContent,
  AtelierDialogHeader,
  AtelierDialogFooter,
  AtelierDialogTitle,
  AtelierDialogDescription,
  AtelierDialogClose,
} from "./AtelierDialog";
import { AtelierButton } from "../AtelierButton";

/* Shared inline styles for story-only elements (not part of the component library) */
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
  fontWeight: "var(--font-weight-medium)" as never,
  cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
  height: "2.5rem",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-input)",
  backgroundColor: "var(--color-background)",
  padding: "0 0.75rem",
  fontSize: "var(--font-size-sm)",
  color: "var(--color-foreground)",
  width: "100%",
};

const meta: Meta<typeof AtelierDialog> = {
  title: "Primitives/AtelierDialog",
  component: AtelierDialog,
};

export default meta;
type Story = StoryObj<typeof AtelierDialog>;

export const Default: Story = {
  render: () => (
    <AtelierDialog>
      <AtelierDialogTrigger>
        <AtelierButton>Open Dialog</AtelierButton>
      </AtelierDialogTrigger>
      <AtelierDialogContent>
        <AtelierDialogHeader>
          <AtelierDialogTitle>Are you sure?</AtelierDialogTitle>
          <AtelierDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AtelierDialogDescription>
        </AtelierDialogHeader>
        <AtelierDialogFooter>
          <AtelierDialogClose style={cancelStyle}>Cancel</AtelierDialogClose>
          <AtelierButton variant="destructive">Delete Account</AtelierButton>
        </AtelierDialogFooter>
      </AtelierDialogContent>
    </AtelierDialog>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierDialog open={open} onOpenChange={setOpen}>
          <AtelierDialogTrigger>
            <AtelierButton>Open Controlled Dialog</AtelierButton>
          </AtelierDialogTrigger>
          <AtelierDialogContent>
            <AtelierDialogHeader>
              <AtelierDialogTitle>Controlled Dialog</AtelierDialogTitle>
              <AtelierDialogDescription>
                This dialog is controlled externally. The parent owns the open state.
              </AtelierDialogDescription>
            </AtelierDialogHeader>
            <AtelierDialogFooter>
              <AtelierDialogClose style={cancelStyle}>Close</AtelierDialogClose>
            </AtelierDialogFooter>
          </AtelierDialogContent>
        </AtelierDialog>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-muted-foreground)" }}>
          State: {open ? "open" : "closed"}
        </p>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => (
    <AtelierDialog>
      <AtelierDialogTrigger>
        <AtelierButton variant="outline">Edit Profile</AtelierButton>
      </AtelierDialogTrigger>
      <AtelierDialogContent>
        <AtelierDialogHeader>
          <AtelierDialogTitle>Edit Profile</AtelierDialogTitle>
          <AtelierDialogDescription>
            Make changes to your profile here. Click save when you are done.
          </AtelierDialogDescription>
        </AtelierDialogHeader>
        <form
          style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(e) => { e.preventDefault(); alert("Saved"); }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <label htmlFor="name" style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>Name</label>
            <input id="name" type="text" defaultValue="Mirabelle Doiron" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
            <label htmlFor="email" style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>Email</label>
            <input id="email" type="email" defaultValue="mirabelle@example.com" style={inputStyle} />
          </div>
          <AtelierDialogFooter>
            <AtelierDialogClose style={cancelStyle}>Cancel</AtelierDialogClose>
            <AtelierButton type="submit">Save changes</AtelierButton>
          </AtelierDialogFooter>
        </form>
      </AtelierDialogContent>
    </AtelierDialog>
  ),
  name: "With form (focus trap demo)",
};

export const FocusTrapDemo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-muted-foreground)" }}>
        Open the dialog, then try pressing Tab repeatedly. Focus stays trapped
        inside the dialog and cycles through the interactive elements.
      </p>
      <AtelierDialog>
        <AtelierDialogTrigger>
          <AtelierButton>Test Focus Trap</AtelierButton>
        </AtelierDialogTrigger>
        <AtelierDialogContent>
          <AtelierDialogHeader>
            <AtelierDialogTitle>Focus Trap Test</AtelierDialogTitle>
            <AtelierDialogDescription>
              Tab through these controls. Focus should cycle through the inputs,
              buttons, and close button, then wrap back to the first element.
            </AtelierDialogDescription>
          </AtelierDialogHeader>
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input placeholder="First input" style={inputStyle} />
            <input placeholder="Second input" style={inputStyle} />
          </div>
          <AtelierDialogFooter>
            <AtelierDialogClose style={cancelStyle}>Cancel</AtelierDialogClose>
            <AtelierButton>Confirm</AtelierButton>
          </AtelierDialogFooter>
        </AtelierDialogContent>
      </AtelierDialog>
    </div>
  ),
  name: "Focus trap demo",
};
