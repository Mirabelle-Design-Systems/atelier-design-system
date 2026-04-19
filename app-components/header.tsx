"use client";

import Link from "next/link";
import { useTheme } from "./themeprovider";
import styles from "../app/layout.module.css";

export function Header() {
  const { theme, brand, toggleTheme, setBrand } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link href="/" className={styles.logo}>
          Atelier
        </Link>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.headerControl}>
          <span>Brand:</span>
          <button
            type="button"
            className={styles.headerButton}
            onClick={() => setBrand(brand === "atelier" ? "neutral" : "atelier")}
          >
            {brand === "atelier" ? "Atelier" : "Neutral"}
          </button>
        </div>
        <button
          type="button"
          className={styles.headerButton}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </div>
    </header>
  );
}
