import type { Meta, StoryObj } from "@storybook/react";
import { AtelierButton } from "./AtelierButton";

const meta: Meta<typeof AtelierButton> = {
  title: "Primitives/AtelierButton",
  component: AtelierButton,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Atelier Button",
    variant: "primary",
    size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof AtelierButton>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const Link: Story = {
  args: { variant: "link" },
};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const Loading: Story = {
  args: { loading: true, children: "Saving..." },
};

export const LoadingNoLabel: Story = {
  args: { loading: true, children: undefined, size: "icon" },
  name: "Loading (icon only)",
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    children: "Add item",
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    children: "Continue",
  },
};

export const AsAnchor: Story = {
  render: () => (
    <AtelierButton as="a" href="#" variant="link">
      I am an anchor tag
    </AtelierButton>
  ),
  name: "Polymorphic (as <a>)",
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
      <AtelierButton variant="primary">Primary</AtelierButton>
      <AtelierButton variant="secondary">Secondary</AtelierButton>
      <AtelierButton variant="outline">Outline</AtelierButton>
      <AtelierButton variant="ghost">Ghost</AtelierButton>
      <AtelierButton variant="destructive">Destructive</AtelierButton>
      <AtelierButton variant="link">Link</AtelierButton>
    </div>
  ),
  name: "All Variants",
};
