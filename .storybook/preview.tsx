import React, { useEffect } from "react";
import type { Decorator, Preview } from "@storybook/react";
import "../src/index.css";

type Brand = "atelier" | "neutral";
type Theme = "light" | "dark";

const withBrandAndTheme: Decorator = (Story, context) => {
  const { brand, theme } = context.globals as { brand: Brand; theme: Theme };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    if (brand === "neutral") root.setAttribute("data-brand", "neutral");
    else root.removeAttribute("data-brand");
  }, [brand, theme]);

  return <Story />;
};

const preview: Preview = {
  decorators: [withBrandAndTheme],
  initialGlobals: {
    brand: "atelier",
    theme: "light",
  },
  globalTypes: {
    brand: {
      description: "Brand tokens",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "atelier", title: "Atelier" },
          { value: "neutral", title: "Neutral" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: "Light / dark",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {},
      options: {},
    },
    backgrounds: { disable: true },
  },
};

export default preview;
