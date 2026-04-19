import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { AtelierCheckbox, type AtelierCheckboxState } from "./AtelierCheckbox";

const meta: Meta<typeof AtelierCheckbox> = {
  title: "Primitives/AtelierCheckbox",
  component: AtelierCheckbox,
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AtelierCheckbox>;

export const Default: Story = {
  args: { children: "Accept terms and conditions" },
};

export const DefaultChecked: Story = {
  args: { defaultChecked: true, children: "Subscribe to newsletter" },
};

export const Indeterminate: Story = {
  render: () => {
    const [state, setState] = useState<AtelierCheckboxState>("indeterminate");
    return (
      <AtelierCheckbox checked={state} onCheckedChange={setState}>
        Mixed selection
      </AtelierCheckbox>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled (off)" },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, children: "Disabled (on)" },
};

export const WithoutLabel: Story = {
  args: { "aria-label": "Toggle option" },
  name: "Without visible label",
};

export const Controlled: Story = {
  render: () => {
    const [state, setState] = useState<AtelierCheckboxState>(false);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierCheckbox checked={state} onCheckedChange={setState}>
          Controlled checkbox
        </AtelierCheckbox>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-muted-foreground)" }}>
          State: {String(state)}
        </p>
      </div>
    );
  },
};

export const ParentChild: Story = {
  name: "Parent + child group (indeterminate driver)",
  render: () => {
    const [items, setItems] = useState({ a: true, b: false, c: false });
    const allChecked = items.a && items.b && items.c;
    const noneChecked = !items.a && !items.b && !items.c;
    const parentState: AtelierCheckboxState = allChecked
      ? true
      : noneChecked
        ? false
        : "indeterminate";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <AtelierCheckbox
          checked={parentState}
          onCheckedChange={(next) => {
            const value = next === true;
            setItems({ a: value, b: value, c: value });
          }}
        >
          Select all
        </AtelierCheckbox>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", paddingLeft: "1.75rem" }}>
          {(["a", "b", "c"] as const).map((key) => (
            <AtelierCheckbox
              key={key}
              checked={items[key]}
              onCheckedChange={(next) => setItems((s) => ({ ...s, [key]: next === true }))}
            >
              Item {key.toUpperCase()}
            </AtelierCheckbox>
          ))}
        </div>
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
        alert(`marketing=${data.get("marketing") ?? "(off)"}`);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <AtelierCheckbox name="marketing" value="yes">
        Send me product updates
      </AtelierCheckbox>
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

export const KeyboardSpace: Story = {
  name: "Play: Space toggles, Enter does NOT",
  render: () => <AtelierCheckbox>Press Space</AtelierCheckbox>,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const cb = canvas.getByRole("checkbox");

    await step("Tab focuses the checkbox", async () => {
      await userEvent.tab();
      await expect(cb).toHaveFocus();
    });

    await step("Enter does not toggle (APG checkbox = Space only)", async () => {
      await userEvent.keyboard("{Enter}");
      await expect(cb).toHaveAttribute("aria-checked", "false");
    });

    await step("Space toggles to checked", async () => {
      await userEvent.keyboard(" ");
      await expect(cb).toHaveAttribute("aria-checked", "true");
    });

    await step("Space again toggles to unchecked", async () => {
      await userEvent.keyboard(" ");
      await expect(cb).toHaveAttribute("aria-checked", "false");
    });
  },
};

export const IndeterminateClickTransitions: Story = {
  name: "Play: indeterminate -> checked on click",
  render: () => {
    const [state, setState] = useState<AtelierCheckboxState>("indeterminate");
    return (
      <AtelierCheckbox checked={state} onCheckedChange={setState}>
        Mixed
      </AtelierCheckbox>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const cb = canvas.getByRole("checkbox");

    await step("Initial state is mixed", async () => {
      await expect(cb).toHaveAttribute("aria-checked", "mixed");
    });

    await step("Click transitions to checked", async () => {
      await userEvent.click(cb);
      await expect(cb).toHaveAttribute("aria-checked", "true");
    });
  },
};

