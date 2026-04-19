"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const SelectDemos = dynamic(() => import("./demos").then((m) => m.SelectDemos), {
  ssr: false,
});

export default function SelectPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Select</h1>
      <p className={showcase.pageDescription}>
        A single-value picker following the WAI-ARIA listbox pattern. Opens as a
        portaled popover, supports keyboard typeahead (start typing to jump),
        arrow keys to highlight, Enter or Space to select, and Escape to close.
      </p>

      <SelectDemos />

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Keyboard support</h2>
        <ul className={styles.shortcuts}>
          <li><kbd>Space</kbd> / <kbd>Enter</kbd> — open the listbox</li>
          <li><kbd>ArrowDown</kbd> / <kbd>ArrowUp</kbd> — highlight next/previous option</li>
          <li><kbd>Home</kbd> / <kbd>End</kbd> — jump to first/last option</li>
          <li>Printable character — typeahead jump to matching option</li>
          <li><kbd>Enter</kbd> — select highlighted option</li>
          <li><kbd>Escape</kbd> — close without selecting</li>
        </ul>
      </div>
    </div>
  );
}
