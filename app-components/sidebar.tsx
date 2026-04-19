"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../app/layout.module.css";

const sections = [
  {
    title: "Start here",
    links: [
      { href: "/get-started", label: "Get started" },
    ],
  },
  {
    title: "Foundations",
    links: [
      { href: "/foundations/colors", label: "Colors" },
      { href: "/foundations/typography", label: "Typography" },
      { href: "/foundations/spacing", label: "Spacing" },
      { href: "/foundations/radius", label: "Radius" },
      { href: "/foundations/shadows", label: "Shadows" },
      { href: "/foundations/motion", label: "Motion" },
      { href: "/foundations/z-index", label: "Z-index" },
      { href: "/foundations/breakpoints", label: "Breakpoints" },
    ],
  },
  {
    title: "Primitives",
    links: [
      { href: "/primitives/button", label: "Button" },
      { href: "/primitives/switch", label: "Switch" },
      { href: "/primitives/checkbox", label: "Checkbox" },
      { href: "/primitives/text-field", label: "TextField" },
      { href: "/primitives/select", label: "Select" },
      { href: "/primitives/tabs", label: "Tabs" },
      { href: "/primitives/accordion", label: "Accordion" },
      { href: "/primitives/dialog", label: "Dialog" },
    ],
  },
  {
    title: "Patterns",
    links: [
      { href: "/patterns/form", label: "Form" },
      { href: "/patterns/settings", label: "Settings" },
      { href: "/patterns/confirmation", label: "Confirmation" },
    ],
  },
  {
    title: "Guidelines",
    links: [
      { href: "/guidelines/accessibility", label: "Accessibility" },
      { href: "/guidelines/principles", label: "Principles" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {sections.map((section) => (
        <div key={section.title} className={styles.sidebarSection}>
          <div className={styles.sidebarHeading}>{section.title}</div>
          {section.links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.sidebarLink}${isActive ? ` ${styles.sidebarLinkActive}` : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
