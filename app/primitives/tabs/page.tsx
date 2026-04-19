"use client";

import {
  AtelierTabs,
  AtelierTabList,
  AtelierTab,
  AtelierTabPanel,
} from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

export default function TabsPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Tabs</h1>
      <p className={showcase.pageDescription}>
        A tabbed interface following the WAI-ARIA tabs pattern. Uses roving
        tabindex so only one tab is in the tab order at a time; arrow keys move
        the selection across siblings, Home and End jump to the ends, and the
        selected tab is automatically activated on focus.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Horizontal (default)</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
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
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Vertical orientation</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierTabs defaultValue="general" orientation="vertical">
              <AtelierTabList>
                <AtelierTab value="general">General</AtelierTab>
                <AtelierTab value="billing">Billing</AtelierTab>
                <AtelierTab value="team">Team</AtelierTab>
              </AtelierTabList>
              <AtelierTabPanel value="general">General settings.</AtelierTabPanel>
              <AtelierTabPanel value="billing">Billing details.</AtelierTabPanel>
              <AtelierTabPanel value="team">Team members.</AtelierTabPanel>
            </AtelierTabs>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Keyboard support</h2>
        <ul className={styles.shortcuts}>
          <li><kbd>Tab</kbd> — enter the tab list (single stop)</li>
          <li><kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd> — previous/next tab (horizontal)</li>
          <li><kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> — previous/next tab (vertical)</li>
          <li><kbd>Home</kbd> — first tab</li>
          <li><kbd>End</kbd> — last tab</li>
        </ul>
      </div>
    </div>
  );
}
