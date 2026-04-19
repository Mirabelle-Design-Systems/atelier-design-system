"use client";

import { useState } from "react";
import {
  AtelierCheckbox,
  type AtelierCheckboxState,
} from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

export default function CheckboxPage() {
  const [controlled, setControlled] = useState<AtelierCheckboxState>(false);
  const [items, setItems] = useState({ a: true, b: false, c: false });
  const allChecked = items.a && items.b && items.c;
  const noneChecked = !items.a && !items.b && !items.c;
  const parentState: AtelierCheckboxState = allChecked
    ? true
    : noneChecked
      ? false
      : "indeterminate";

  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Checkbox</h1>
      <p className={showcase.pageDescription}>
        A tri-state checkbox following the WAI-ARIA checkbox pattern. Emits
        <code> aria-checked=&quot;mixed&quot;</code> for the indeterminate state, which
        cannot be represented declaratively by a native{" "}
        <code>&lt;input type=&quot;checkbox&quot;&gt;</code>. APG-strict keyboard:
        only Space toggles, Enter is suppressed.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Default</h2>
        <div className={showcase.preview}>
          <div className={styles.group}>
            <AtelierCheckbox>Accept terms and conditions</AtelierCheckbox>
            <AtelierCheckbox defaultChecked>
              Subscribe to the newsletter
            </AtelierCheckbox>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Controlled tri-state</h2>
        <div className={showcase.preview}>
          <div className={styles.group}>
            <AtelierCheckbox
              checked={controlled}
              onCheckedChange={setControlled}
            >
              State: {String(controlled)}
            </AtelierCheckbox>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={() => setControlled("indeterminate")}
            >
              Set to indeterminate
            </button>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Parent + child group</h2>
        <div className={showcase.preview}>
          <div className={styles.group}>
            <AtelierCheckbox
              checked={parentState}
              onCheckedChange={(next) => {
                const value = next === true;
                setItems({ a: value, b: value, c: value });
              }}
            >
              Select all
            </AtelierCheckbox>
            <div className={styles.nested}>
              {(["a", "b", "c"] as const).map((key) => (
                <AtelierCheckbox
                  key={key}
                  checked={items[key]}
                  onCheckedChange={(next) =>
                    setItems((s) => ({ ...s, [key]: next === true }))
                  }
                >
                  Item {key.toUpperCase()}
                </AtelierCheckbox>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Disabled</h2>
        <div className={showcase.preview}>
          <div className={styles.group}>
            <AtelierCheckbox disabled>Disabled (unchecked)</AtelierCheckbox>
            <AtelierCheckbox disabled defaultChecked>
              Disabled (checked)
            </AtelierCheckbox>
          </div>
        </div>
      </div>
    </div>
  );
}
