"use client";

import { AtelierButton } from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

export default function FormPatternPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Form Pattern</h1>
      <p className={showcase.pageDescription}>
        A standard form layout composing native inputs with the AtelierButton
        primitive. Labels, hints, and accessible focus rings follow the design
        system conventions.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Contact Form</h2>
        <div className={showcase.preview}>
          <form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={styles.field}>
              <label htmlFor="form-name" className={styles.fieldLabel}>
                Name
              </label>
              <input
                id="form-name"
                type="text"
                className={styles.fieldInput}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="form-email" className={styles.fieldLabel}>
                Email
              </label>
              <input
                id="form-email"
                type="email"
                className={styles.fieldInput}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <span className={styles.fieldHint}>
                We will never share your email.
              </span>
            </div>

            <div className={styles.field}>
              <label htmlFor="form-message" className={styles.fieldLabel}>
                Message
              </label>
              <input
                id="form-message"
                type="text"
                className={styles.fieldInput}
                placeholder="How can we help?"
              />
            </div>

            <div className={styles.actions}>
              <AtelierButton type="submit">Send</AtelierButton>
              <AtelierButton type="reset" variant="outline">
                Reset
              </AtelierButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
