import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AtelierTabs,
  AtelierTabList,
  AtelierTab,
  AtelierTabPanel,
} from "./AtelierTabs";

const meta: Meta<typeof AtelierTabs> = {
  title: "Primitives/AtelierTabs",
  component: AtelierTabs,
};

export default meta;
type Story = StoryObj<typeof AtelierTabs>;

export const Default: Story = {
  render: () => (
    <AtelierTabs defaultValue="account">
      <AtelierTabList>
        <AtelierTab value="account">Account</AtelierTab>
        <AtelierTab value="password">Password</AtelierTab>
        <AtelierTab value="notifications">Notifications</AtelierTab>
      </AtelierTabList>
      <AtelierTabPanel value="account">
        <p>Manage your account settings and preferences.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="password">
        <p>Update your password and security options.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="notifications">
        <p>Configure how you receive notifications.</p>
      </AtelierTabPanel>
    </AtelierTabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("profile");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AtelierTabs value={value} defaultValue="profile" onValueChange={setValue}>
          <AtelierTabList>
            <AtelierTab value="profile">Profile</AtelierTab>
            <AtelierTab value="billing">Billing</AtelierTab>
            <AtelierTab value="team">Team</AtelierTab>
          </AtelierTabList>
          <AtelierTabPanel value="profile">
            <p>Your profile information and avatar.</p>
          </AtelierTabPanel>
          <AtelierTabPanel value="billing">
            <p>Payment methods and billing history.</p>
          </AtelierTabPanel>
          <AtelierTabPanel value="team">
            <p>Invite and manage team members.</p>
          </AtelierTabPanel>
        </AtelierTabs>
        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-muted-foreground)" }}>
          Active tab: {value}
        </p>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => (
    <AtelierTabs defaultValue="general" orientation="vertical">
      <AtelierTabList>
        <AtelierTab value="general">General</AtelierTab>
        <AtelierTab value="appearance">Appearance</AtelierTab>
        <AtelierTab value="integrations">Integrations</AtelierTab>
      </AtelierTabList>
      <AtelierTabPanel value="general">
        <p>General application settings.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="appearance">
        <p>Customize the look and feel.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="integrations">
        <p>Connect third-party services.</p>
      </AtelierTabPanel>
    </AtelierTabs>
  ),
};

export const DisabledTab: Story = {
  render: () => (
    <AtelierTabs defaultValue="overview">
      <AtelierTabList>
        <AtelierTab value="overview">Overview</AtelierTab>
        <AtelierTab value="analytics" disabled>Analytics</AtelierTab>
        <AtelierTab value="reports">Reports</AtelierTab>
      </AtelierTabList>
      <AtelierTabPanel value="overview">
        <p>Dashboard overview with key metrics.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="analytics">
        <p>Detailed analytics data.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="reports">
        <p>Download and schedule reports.</p>
      </AtelierTabPanel>
    </AtelierTabs>
  ),
  name: "Disabled tab",
};

export const ManyTabs: Story = {
  render: () => (
    <AtelierTabs defaultValue="tab1">
      <AtelierTabList>
        <AtelierTab value="tab1">Dashboard</AtelierTab>
        <AtelierTab value="tab2">Analytics</AtelierTab>
        <AtelierTab value="tab3">Customers</AtelierTab>
        <AtelierTab value="tab4">Products</AtelierTab>
        <AtelierTab value="tab5">Invoices</AtelierTab>
        <AtelierTab value="tab6">Settings</AtelierTab>
        <AtelierTab value="tab7">Integrations</AtelierTab>
        <AtelierTab value="tab8">Support</AtelierTab>
      </AtelierTabList>
      <AtelierTabPanel value="tab1">
        <p>Main dashboard view.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="tab2">
        <p>Traffic and engagement analytics.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="tab3">
        <p>Customer management and CRM.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="tab4">
        <p>Product catalog and inventory.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="tab5">
        <p>Billing and invoice history.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="tab6">
        <p>Application configuration.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="tab7">
        <p>Third-party service connections.</p>
      </AtelierTabPanel>
      <AtelierTabPanel value="tab8">
        <p>Help center and support tickets.</p>
      </AtelierTabPanel>
    </AtelierTabs>
  ),
  name: "Many tabs",
};
