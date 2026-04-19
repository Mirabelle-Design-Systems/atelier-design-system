import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AtelierAccordion,
  AtelierAccordionItem,
  AtelierAccordionTrigger,
  AtelierAccordionContent,
} from "./AtelierAccordion";

const meta: Meta<typeof AtelierAccordion> = {
  title: "Primitives/AtelierAccordion",
  component: AtelierAccordion,
};

export default meta;
type Story = StoryObj<typeof AtelierAccordion>;

const items = [
  {
    value: "accessibility",
    title: "Is it accessible?",
    content:
      "Yes. This accordion follows the WAI-ARIA Accordion Pattern with full keyboard navigation, proper ARIA attributes, and screen reader announcements.",
  },
  {
    value: "custom",
    title: "Is it built from scratch?",
    content:
      "Yes. Zero Radix imports. Every ARIA attribute, keyboard handler, and focus behavior is hand-written. You own the DOM.",
  },
  {
    value: "animated",
    title: "How is the height animated?",
    content:
      "Using the CSS grid trick: grid-template-rows transitions from 0fr to 1fr. No JavaScript height measurement needed, and it works with dynamic content.",
  },
];

export const Single: Story = {
  render: () => (
    <AtelierAccordion type="single" defaultValue="accessibility" className="accordion-demo">
      {items.map((item) => (
        <AtelierAccordionItem key={item.value} value={item.value}>
          <AtelierAccordionTrigger>{item.title}</AtelierAccordionTrigger>
          <AtelierAccordionContent>{item.content}</AtelierAccordionContent>
        </AtelierAccordionItem>
      ))}
    </AtelierAccordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <AtelierAccordion
      type="multiple"
      defaultValue={["accessibility", "custom"]}
          >
      {items.map((item) => (
        <AtelierAccordionItem key={item.value} value={item.value}>
          <AtelierAccordionTrigger>{item.title}</AtelierAccordionTrigger>
          <AtelierAccordionContent>{item.content}</AtelierAccordionContent>
        </AtelierAccordionItem>
      ))}
    </AtelierAccordion>
  ),
};

export const AllClosed: Story = {
  render: () => (
    <AtelierAccordion type="single" className="accordion-demo">
      {items.map((item) => (
        <AtelierAccordionItem key={item.value} value={item.value}>
          <AtelierAccordionTrigger>{item.title}</AtelierAccordionTrigger>
          <AtelierAccordionContent>{item.content}</AtelierAccordionContent>
        </AtelierAccordionItem>
      ))}
    </AtelierAccordion>
  ),
  name: "All closed (single)",
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("custom");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierAccordion
          type="single"
          value={value}
          onValueChange={setValue}
                  >
          {items.map((item) => (
            <AtelierAccordionItem key={item.value} value={item.value}>
              <AtelierAccordionTrigger>{item.title}</AtelierAccordionTrigger>
              <AtelierAccordionContent>{item.content}</AtelierAccordionContent>
            </AtelierAccordionItem>
          ))}
        </AtelierAccordion>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-muted-foreground)" }}>
          Open: {value || "(none)"}
        </p>
      </div>
    );
  },
};
