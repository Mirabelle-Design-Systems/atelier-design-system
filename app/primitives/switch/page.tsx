"use client";

import { useState } from "react";
import { AtelierSwitch } from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

export default function SwitchPage() {
  const [checked, setChecked] = useState(false);

  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Switch</h1>
      <p className={showcase.pageDescription}>
        A toggle switch that follows the WAI-ARIA switch role pattern. Supports
        both controlled and uncontrolled usage, keyboard operation, and an
        associated label.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Default (uncontrolled)</h2>
        <div className={showcase.preview}>
          <div className={styles.demos}>
            <AtelierSwitch>Enable notifications</AtelierSwitch>
            <AtelierSwitch defaultChecked>Dark mode</AtelierSwitch>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Controlled</h2>
        <div className={showcase.preview}>
          <div className={styles.demos}>
            <AtelierSwitch
              checked={checked}
              onCheckedChange={setChecked}
            >
              Controlled: {checked ? "On" : "Off"}
            </AtelierSwitch>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Disabled</h2>
        <div className={showcase.preview}>
          <div className={styles.demos}>
            <AtelierSwitch disabled>Disabled off</AtelierSwitch>
            <AtelierSwitch disabled defaultChecked>
              Disabled on
            </AtelierSwitch>
          </div>
        </div>
      </div>
    </div>
  );
}
