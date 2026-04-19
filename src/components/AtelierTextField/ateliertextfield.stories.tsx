import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { AtelierTextField } from "./AtelierTextField";

const meta: Meta<typeof AtelierTextField> = {
  title: "Primitives/AtelierTextField",
  component: AtelierTextField,
  argTypes: {
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "20rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AtelierTextField>;

export const Default: Story = {
  render: (args) => (
    <AtelierTextField {...args}>
      <AtelierTextField.Label>Email</AtelierTextField.Label>
      <AtelierTextField.Input type="email" placeholder="name@example.com" />
    </AtelierTextField>
  ),
};

export const WithDescription: Story = {
  render: (args) => (
    <AtelierTextField {...args}>
      <AtelierTextField.Label>Email</AtelierTextField.Label>
      <AtelierTextField.Description>
        We will only use this for account recovery.
      </AtelierTextField.Description>
      <AtelierTextField.Input type="email" placeholder="name@example.com" />
    </AtelierTextField>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <AtelierTextField {...args} invalid>
      <AtelierTextField.Label>Email</AtelierTextField.Label>
      <AtelierTextField.Input
        type="email"
        defaultValue="not-an-email"
      />
      <AtelierTextField.Error>Enter a valid email address.</AtelierTextField.Error>
    </AtelierTextField>
  ),
};

export const InvalidWithDescription: Story = {
  name: "Invalid + Description",
  render: (args) => (
    <AtelierTextField {...args} invalid>
      <AtelierTextField.Label>Email</AtelierTextField.Label>
      <AtelierTextField.Description>Work address only.</AtelierTextField.Description>
      <AtelierTextField.Input type="email" defaultValue="not-an-email" />
      <AtelierTextField.Error>Enter a valid email address.</AtelierTextField.Error>
    </AtelierTextField>
  ),
};

export const Required: Story = {
  render: (args) => (
    <AtelierTextField {...args} required>
      <AtelierTextField.Label>Full name</AtelierTextField.Label>
      <AtelierTextField.Input placeholder="Jane Doe" />
    </AtelierTextField>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <AtelierTextField {...args} disabled>
      <AtelierTextField.Label>Email</AtelierTextField.Label>
      <AtelierTextField.Input type="email" defaultValue="locked@example.com" />
    </AtelierTextField>
  ),
};

export const ReadOnly: Story = {
  render: (args) => (
    <AtelierTextField {...args}>
      <AtelierTextField.Label>API key</AtelierTextField.Label>
      <AtelierTextField.Input readOnly defaultValue="sk_live_4f...c1" />
    </AtelierTextField>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <AtelierTextField size="sm">
        <AtelierTextField.Label>Small</AtelierTextField.Label>
        <AtelierTextField.Input placeholder="sm" />
      </AtelierTextField>
      <AtelierTextField size="md">
        <AtelierTextField.Label>Medium</AtelierTextField.Label>
        <AtelierTextField.Input placeholder="md" />
      </AtelierTextField>
      <AtelierTextField size="lg">
        <AtelierTextField.Label>Large</AtelierTextField.Label>
        <AtelierTextField.Input placeholder="lg" />
      </AtelierTextField>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierTextField>
          <AtelierTextField.Label>Username</AtelierTextField.Label>
          <AtelierTextField.Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="username"
          />
        </AtelierTextField>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-muted-foreground)" }}>
          Value: {value || "(empty)"}
        </p>
      </div>
    );
  },
};

export const InAForm: Story = {
  name: "In a form",
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        alert(`Submitted: ${data.get("email")}`);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <AtelierTextField required>
        <AtelierTextField.Label>Email</AtelierTextField.Label>
        <AtelierTextField.Description>
          We will send a confirmation link.
        </AtelierTextField.Description>
        <AtelierTextField.Input
          type="email"
          name="email"
          placeholder="name@example.com"
        />
      </AtelierTextField>
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
    </form>
  ),
};

/* ------- Interaction tests via play() ------- */

export const KeyboardFocus: Story = {
  name: "Play: keyboard focus + label click",
  render: () => (
    <AtelierTextField>
      <AtelierTextField.Label>Email</AtelierTextField.Label>
      <AtelierTextField.Input placeholder="type here" />
    </AtelierTextField>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");

    await step("Tab focuses the input", async () => {
      await userEvent.tab();
      await expect(input).toHaveFocus();
    });

    await step("Typing updates value", async () => {
      await userEvent.type(input, "hello@world.com");
      await expect(input).toHaveValue("hello@world.com");
    });

    await step("Clicking label re-focuses input", async () => {
      await userEvent.click(canvas.getByText("Email"));
      await expect(input).toHaveFocus();
    });
  },
};

export const ErrorAnnouncement: Story = {
  name: "Play: error appears with role=alert",
  render: () => {
    const [invalid, setInvalid] = useState(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierTextField invalid={invalid}>
          <AtelierTextField.Label>Email</AtelierTextField.Label>
          <AtelierTextField.Input defaultValue="bad" />
          <AtelierTextField.Error>Enter a valid email address.</AtelierTextField.Error>
        </AtelierTextField>
        <button
          type="button"
          onClick={() => setInvalid(true)}
          style={{
            alignSelf: "flex-start",
            padding: "0.375rem 0.75rem",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-primary-foreground)",
            border: "none",
            fontSize: "var(--font-size-sm)",
            cursor: "pointer",
          }}
        >
          Validate
        </button>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Error is not in the DOM initially", async () => {
      await expect(canvas.queryByRole("alert")).toBeNull();
    });

    await step("Clicking Validate reveals an alert", async () => {
      await userEvent.click(canvas.getByRole("button", { name: /validate/i }));
      const alert = await canvas.findByRole("alert");
      await expect(alert).toHaveTextContent(/valid email/i);
    });

    await step("Input is marked aria-invalid", async () => {
      const input = canvas.getByLabelText("Email");
      await expect(input).toHaveAttribute("aria-invalid", "true");
    });
  },
};
