"use client";

import { AtelierButton } from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const variants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

const sizes = ["sm", "md", "lg"] as const;

export default function ButtonPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Button</h1>
      <p className={showcase.pageDescription}>
        A versatile button primitive supporting multiple variants, sizes,
        loading states, and icon slots. Renders as a native button element by
        default but can be polymorphic via the as prop.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Variants</h2>
        <div className={showcase.preview}>
          <div className={styles.row}>
            {variants.map((v) => (
              <AtelierButton key={v} variant={v}>
                {v}
              </AtelierButton>
            ))}
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Sizes</h2>
        <div className={showcase.preview}>
          <div className={styles.row}>
            {sizes.map((s) => (
              <AtelierButton key={s} size={s}>
                {s}
              </AtelierButton>
            ))}
            <AtelierButton size="icon" aria-label="Settings">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </AtelierButton>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Loading State</h2>
        <div className={showcase.preview}>
          <div className={styles.row}>
            <AtelierButton loading>Saving...</AtelierButton>
            <AtelierButton variant="secondary" loading>
              Loading
            </AtelierButton>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Disabled State</h2>
        <div className={showcase.preview}>
          <div className={styles.row}>
            {variants.map((v) => (
              <AtelierButton key={v} variant={v} disabled>
                {v}
              </AtelierButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
