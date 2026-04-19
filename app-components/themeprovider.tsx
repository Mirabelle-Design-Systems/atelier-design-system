"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
type Brand = "atelier" | "neutral";

interface ThemeContextValue {
  theme: Theme;
  brand: Brand;
  toggleTheme: () => void;
  setBrand: (brand: Brand) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [brand, setBrand] = useState<Brand>("atelier");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (brand === "neutral") {
      root.setAttribute("data-brand", "neutral");
    } else {
      root.removeAttribute("data-brand");
    }
  }, [brand]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, brand, toggleTheme, setBrand }}>
      {children}
    </ThemeContext.Provider>
  );
}
