"use client";

import {
  AtelierAccordion,
  AtelierAccordionItem,
  AtelierAccordionTrigger,
  AtelierAccordionContent,
} from "@atelier/primitives";
import styles from "./page.module.css";
import showcase from "../../../app-components/showcase.module.css";

const faqItems = [
  {
    value: "install",
    title: "How do I install Atelier Primitives?",
    content:
      "Install via npm with npm install atelier-design-system. Then import the components you need from the package entry point.",
  },
  {
    value: "theming",
    title: "Can I customise the theme?",
    content:
      "Yes. Override the CSS custom properties in your own stylesheet or use the data-brand attribute to switch brand presets.",
  },
  {
    value: "a11y",
    title: "Are the components accessible?",
    content:
      "Every component follows WAI-ARIA authoring practices. Keyboard navigation, focus management, and ARIA attributes are built in.",
  },
];

export default function AccordionPage() {
  return (
    <div className={showcase.page}>
      <h1 className={showcase.pageTitle}>Accordion</h1>
      <p className={showcase.pageDescription}>
        A vertically stacked set of collapsible sections. Supports single and
        multiple expansion modes, keyboard navigation (Arrow keys, Home, End),
        and animated open/close transitions.
      </p>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Single mode</h2>
        <div className={showcase.preview}>
          <div className={styles.accordionWrapper}>
            <AtelierAccordion type="single" defaultValue="install">
              {faqItems.map((item) => (
                <AtelierAccordionItem key={item.value} value={item.value}>
                  <AtelierAccordionTrigger>{item.title}</AtelierAccordionTrigger>
                  <AtelierAccordionContent>{item.content}</AtelierAccordionContent>
                </AtelierAccordionItem>
              ))}
            </AtelierAccordion>
          </div>
        </div>
      </div>

      <div className={showcase.section}>
        <h2 className={showcase.sectionTitle}>Multiple mode</h2>
        <div className={showcase.preview}>
          <div className={styles.accordionWrapper}>
            <AtelierAccordion type="multiple" defaultValue={["install", "a11y"]}>
              {faqItems.map((item) => (
                <AtelierAccordionItem key={item.value} value={item.value}>
                  <AtelierAccordionTrigger>{item.title}</AtelierAccordionTrigger>
                  <AtelierAccordionContent>{item.content}</AtelierAccordionContent>
                </AtelierAccordionItem>
              ))}
            </AtelierAccordion>
          </div>
        </div>
      </div>
    </div>
  );
}
