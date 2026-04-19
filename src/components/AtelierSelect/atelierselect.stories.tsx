import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AtelierSelect,
  AtelierSelectTrigger,
  AtelierSelectContent,
  AtelierSelectItem,
  AtelierSelectValue,
} from "./AtelierSelect";

const meta: Meta<typeof AtelierSelect> = {
  title: "Primitives/AtelierSelect",
  component: AtelierSelect,
};

export default meta;
type Story = StoryObj<typeof AtelierSelect>;

export const Default: Story = {
  render: () => (
    <AtelierSelect>
      <AtelierSelectTrigger>
        <AtelierSelectValue placeholder="Choose a fruit" />
      </AtelierSelectTrigger>
      <AtelierSelectContent>
        <AtelierSelectItem value="apple">Apple</AtelierSelectItem>
        <AtelierSelectItem value="banana">Banana</AtelierSelectItem>
        <AtelierSelectItem value="cherry">Cherry</AtelierSelectItem>
        <AtelierSelectItem value="date">Date</AtelierSelectItem>
        <AtelierSelectItem value="elderberry">Elderberry</AtelierSelectItem>
      </AtelierSelectContent>
    </AtelierSelect>
  ),
};

export const WithPlaceholder: Story = {
  render: () => (
    <AtelierSelect placeholder="Select a color">
      <AtelierSelectTrigger>
        <AtelierSelectValue />
      </AtelierSelectTrigger>
      <AtelierSelectContent>
        <AtelierSelectItem value="red">Red</AtelierSelectItem>
        <AtelierSelectItem value="green">Green</AtelierSelectItem>
        <AtelierSelectItem value="blue">Blue</AtelierSelectItem>
        <AtelierSelectItem value="purple">Purple</AtelierSelectItem>
        <AtelierSelectItem value="orange">Orange</AtelierSelectItem>
      </AtelierSelectContent>
    </AtelierSelect>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("react");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierSelect value={value} onValueChange={setValue}>
          <AtelierSelectTrigger>
            <AtelierSelectValue placeholder="Pick a framework" />
          </AtelierSelectTrigger>
          <AtelierSelectContent>
            <AtelierSelectItem value="react">React</AtelierSelectItem>
            <AtelierSelectItem value="vue">Vue</AtelierSelectItem>
            <AtelierSelectItem value="svelte">Svelte</AtelierSelectItem>
            <AtelierSelectItem value="angular">Angular</AtelierSelectItem>
            <AtelierSelectItem value="solid">SolidJS</AtelierSelectItem>
          </AtelierSelectContent>
        </AtelierSelect>
        <p
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--color-muted-foreground)",
          }}
        >
          Selected value: <strong>{value || "(none)"}</strong>
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <AtelierSelect disabled defaultValue="locked">
      <AtelierSelectTrigger>
        <AtelierSelectValue placeholder="Cannot interact" />
      </AtelierSelectTrigger>
      <AtelierSelectContent>
        <AtelierSelectItem value="locked">Locked option</AtelierSelectItem>
        <AtelierSelectItem value="other">Other option</AtelierSelectItem>
      </AtelierSelectContent>
    </AtelierSelect>
  ),
};

export const DisabledOptions: Story = {
  render: () => (
    <AtelierSelect placeholder="Some options disabled">
      <AtelierSelectTrigger>
        <AtelierSelectValue />
      </AtelierSelectTrigger>
      <AtelierSelectContent>
        <AtelierSelectItem value="available-1">Available</AtelierSelectItem>
        <AtelierSelectItem value="unavailable-1" disabled>
          Unavailable (disabled)
        </AtelierSelectItem>
        <AtelierSelectItem value="available-2">Also available</AtelierSelectItem>
        <AtelierSelectItem value="unavailable-2" disabled>
          Also unavailable (disabled)
        </AtelierSelectItem>
        <AtelierSelectItem value="available-3">Still available</AtelierSelectItem>
      </AtelierSelectContent>
    </AtelierSelect>
  ),
};

export const ManyOptions: Story = {
  render: () => {
    const countries = [
      "Argentina",
      "Australia",
      "Brazil",
      "Canada",
      "Chile",
      "China",
      "Colombia",
      "Denmark",
      "Egypt",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "India",
      "Italy",
      "Japan",
      "Kenya",
      "Mexico",
      "Norway",
      "Peru",
      "Poland",
      "Portugal",
      "Spain",
      "Sweden",
      "Turkey",
    ];
    return (
      <AtelierSelect placeholder="Select a country">
        <AtelierSelectTrigger>
          <AtelierSelectValue />
        </AtelierSelectTrigger>
        <AtelierSelectContent>
          {countries.map((c) => (
            <AtelierSelectItem key={c.toLowerCase()} value={c.toLowerCase()}>
              {c}
            </AtelierSelectItem>
          ))}
        </AtelierSelectContent>
      </AtelierSelect>
    );
  },
  name: "Many options (scrolling)",
};

export const TypeaheadDemo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <p
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-muted-foreground)",
          maxWidth: "32rem",
        }}
      >
        Open the select, then type letters to jump to matching options. For
        example, type "c" to jump to "Cherry", then quickly type "ch" to refine.
        After a short pause the search buffer resets.
      </p>
      <AtelierSelect placeholder="Type to search">
        <AtelierSelectTrigger>
          <AtelierSelectValue />
        </AtelierSelectTrigger>
        <AtelierSelectContent>
          <AtelierSelectItem value="apple">Apple</AtelierSelectItem>
          <AtelierSelectItem value="apricot">Apricot</AtelierSelectItem>
          <AtelierSelectItem value="banana">Banana</AtelierSelectItem>
          <AtelierSelectItem value="blueberry">Blueberry</AtelierSelectItem>
          <AtelierSelectItem value="cherry">Cherry</AtelierSelectItem>
          <AtelierSelectItem value="cranberry">Cranberry</AtelierSelectItem>
          <AtelierSelectItem value="dragon-fruit">Dragon Fruit</AtelierSelectItem>
          <AtelierSelectItem value="elderberry">Elderberry</AtelierSelectItem>
          <AtelierSelectItem value="fig">Fig</AtelierSelectItem>
          <AtelierSelectItem value="grape">Grape</AtelierSelectItem>
        </AtelierSelectContent>
      </AtelierSelect>
    </div>
  ),
  name: "Typeahead demo",
};
