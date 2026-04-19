import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AtelierSwitch } from "./AtelierSwitch";

const meta: Meta<typeof AtelierSwitch> = {
  title: "Primitives/AtelierSwitch",
  component: AtelierSwitch,
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AtelierSwitch>;

export const Default: Story = {
  args: { children: "Notifications" },
};

export const DefaultChecked: Story = {
  args: { defaultChecked: true, children: "Dark mode" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, children: "Disabled (on)" },
};

export const WithoutLabel: Story = {
  args: { "aria-label": "Toggle feature" },
  name: "Without visible label",
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierSwitch checked={checked} onCheckedChange={setChecked}>
          Airplane mode
        </AtelierSwitch>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-muted-foreground)" }}>
          State: {checked ? "ON" : "OFF"}
        </p>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        alert(`Form value: ${data.get("notifications")}`);
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <AtelierSwitch name="notifications" defaultChecked>
          Email notifications
        </AtelierSwitch>
        <button
          type="submit"
          style={{
            width: "fit-content",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-foreground)",
            border: "none",
            fontSize: "var(--font-size-sm)",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </form>
  ),
  name: "In a form",
};
