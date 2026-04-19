"use client";

import { useState } from "react";
import {
  AtelierSelect,
  AtelierSelectTrigger,
  AtelierSelectValue,
  AtelierSelectContent,
  AtelierSelectItem,
} from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const colors = [
  { value: "red", label: "Red" },
  { value: "teal", label: "Teal" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "amber", label: "Amber" },
  { value: "violet", label: "Violet" },
];

export function SelectDemos() {
  const [picked, setPicked] = useState("teal");

  return (
    <>
      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Default</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierSelect defaultValue="teal" placeholder="Pick a color">
              <AtelierSelectTrigger>
                <AtelierSelectValue />
              </AtelierSelectTrigger>
              <AtelierSelectContent>
                {colors.map((color) => (
                  <AtelierSelectItem key={color.value} value={color.value}>
                    {color.label}
                  </AtelierSelectItem>
                ))}
              </AtelierSelectContent>
            </AtelierSelect>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Controlled</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierSelect
              value={picked}
              onValueChange={setPicked}
              placeholder="Pick one"
            >
              <AtelierSelectTrigger>
                <AtelierSelectValue />
              </AtelierSelectTrigger>
              <AtelierSelectContent>
                {colors.map((color) => (
                  <AtelierSelectItem key={color.value} value={color.value}>
                    {color.label}
                  </AtelierSelectItem>
                ))}
              </AtelierSelectContent>
            </AtelierSelect>
            <p className={styles.state}>Value: {picked}</p>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Disabled options</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierSelect placeholder="Pick a tier">
              <AtelierSelectTrigger>
                <AtelierSelectValue />
              </AtelierSelectTrigger>
              <AtelierSelectContent>
                <AtelierSelectItem value="free">Free</AtelierSelectItem>
                <AtelierSelectItem value="pro">Pro</AtelierSelectItem>
                <AtelierSelectItem value="enterprise" disabled>
                  Enterprise (coming soon)
                </AtelierSelectItem>
              </AtelierSelectContent>
            </AtelierSelect>
          </div>
        </div>
      </div>
    </>
  );
}
