"use client";

import { useState } from "react";
import { AtelierTextField } from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

export default function TextFieldPage() {
  const [email, setEmail] = useState("not-an-email");
  const invalid = email.length > 0 && !email.includes("@");

  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>TextField</h1>
      <p className={showcase.pageDescription}>
        A compound input primitive whose Context wires every ARIA relationship
        automatically. Labels, descriptions, and error messages cannot be
        mis-associated because the compound parts register themselves into the
        root&apos;s context.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Default</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierTextField>
              <AtelierTextField.Label>Email</AtelierTextField.Label>
              <AtelierTextField.Input
                type="email"
                placeholder="name@example.com"
              />
            </AtelierTextField>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>With description</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierTextField>
              <AtelierTextField.Label>Email</AtelierTextField.Label>
              <AtelierTextField.Description>
                We will only use this for account recovery.
              </AtelierTextField.Description>
              <AtelierTextField.Input
                type="email"
                placeholder="name@example.com"
              />
            </AtelierTextField>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Invalid with error</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierTextField invalid={invalid}>
              <AtelierTextField.Label>Email</AtelierTextField.Label>
              <AtelierTextField.Description>
                Type a valid email to clear the error.
              </AtelierTextField.Description>
              <AtelierTextField.Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AtelierTextField.Error>
                Enter a valid email address.
              </AtelierTextField.Error>
            </AtelierTextField>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Sizes</h2>
        <div className={showcase.preview}>
          <div className={styles.sizes}>
            <AtelierTextField size="sm">
              <AtelierTextField.Label>Small</AtelierTextField.Label>
              <AtelierTextField.Input placeholder="sm" />
            </AtelierTextField>
            <AtelierTextField size="md">
              <AtelierTextField.Label>Medium</AtelierTextField.Label>
              <AtelierTextField.Input placeholder="md" />
            </AtelierTextField>
            <AtelierTextField size="lg">
              <AtelierTextField.Label>Large</AtelierTextField.Label>
              <AtelierTextField.Input placeholder="lg" />
            </AtelierTextField>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Disabled and read-only</h2>
        <div className={showcase.preview}>
          <div className={styles.wrapper}>
            <AtelierTextField disabled>
              <AtelierTextField.Label>Disabled</AtelierTextField.Label>
              <AtelierTextField.Input defaultValue="locked@example.com" />
            </AtelierTextField>
            <AtelierTextField>
              <AtelierTextField.Label>API key</AtelierTextField.Label>
              <AtelierTextField.Input readOnly defaultValue="sk_live_...c1" />
            </AtelierTextField>
          </div>
        </div>
      </div>
    </div>
  );
}
