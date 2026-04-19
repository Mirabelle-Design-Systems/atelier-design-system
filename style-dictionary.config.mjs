import StyleDictionary from "style-dictionary";

/* -------------------------------------------------------------------------
   Atelier Primitives — Style Dictionary Config

   Token pipeline:
     tokens/base/*.json          → shared tokens (radius, typography, spacing)
     tokens/brands/atelier/*.json → Atelier brand colors (light + dark)
     tokens/brands/neutral/*.json → Neutral brand colors (light + dark)

   Output:
     src/styles/tokens.css       → all CSS custom properties, scoped by
                                   :root (Atelier light), .dark, [data-brand]
   ------------------------------------------------------------------------- */

// Flatten nested token names with a dash separator
const CSS_VAR_PREFIX = "";

function buildSource(basePaths) {
  return basePaths;
}

// Custom format: outputs CSS variables under a given selector
StyleDictionary.registerFormat({
  name: "css/scoped-variables",
  format: ({ dictionary, options }) => {
    const selector = options.selector || ":root";
    const vars = dictionary.allTokens
      .map((token) => `  --${token.name}: ${token.value};`)
      .join("\n");
    return `${selector} {\n${vars}\n}`;
  },
});

// --- Build configs ---

const configs = [
  // 1. Base tokens (radius, typography, spacing, transitions) → :root
  {
    source: buildSource(["tokens/base/**/*.json"]),
    platforms: {
      css: {
        transformGroup: "css",
        prefix: CSS_VAR_PREFIX,
        buildPath: "src/styles/",
        files: [
          {
            destination: "_tokens-base.css",
            format: "css/scoped-variables",
            options: { selector: ":root" },
          },
        ],
      },
    },
  },

  // 2. Atelier light → :root (default brand + theme)
  {
    source: buildSource(["tokens/brands/atelier/color-light.json"]),
    platforms: {
      css: {
        transformGroup: "css",
        prefix: CSS_VAR_PREFIX,
        buildPath: "src/styles/",
        files: [
          {
            destination: "_tokens-atelier-light.css",
            format: "css/scoped-variables",
            options: { selector: ":root" },
          },
        ],
      },
    },
  },

  // 3. Atelier dark → :root.dark
  {
    source: buildSource(["tokens/brands/atelier/color-dark.json"]),
    platforms: {
      css: {
        transformGroup: "css",
        prefix: CSS_VAR_PREFIX,
        buildPath: "src/styles/",
        files: [
          {
            destination: "_tokens-atelier-dark.css",
            format: "css/scoped-variables",
            options: { selector: ":root.dark" },
          },
        ],
      },
    },
  },

  // 4. Neutral light → [data-brand="neutral"]
  {
    source: buildSource(["tokens/brands/neutral/color-light.json"]),
    platforms: {
      css: {
        transformGroup: "css",
        prefix: CSS_VAR_PREFIX,
        buildPath: "src/styles/",
        files: [
          {
            destination: "_tokens-neutral-light.css",
            format: "css/scoped-variables",
            options: { selector: '[data-brand="neutral"]' },
          },
        ],
      },
    },
  },

  // 5. Neutral dark → [data-brand="neutral"].dark
  {
    source: buildSource(["tokens/brands/neutral/color-dark.json"]),
    platforms: {
      css: {
        transformGroup: "css",
        prefix: CSS_VAR_PREFIX,
        buildPath: "src/styles/",
        files: [
          {
            destination: "_tokens-neutral-dark.css",
            format: "css/scoped-variables",
            options: { selector: '[data-brand="neutral"].dark' },
          },
        ],
      },
    },
  },
];

// Build all configs
for (const config of configs) {
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}

console.log("Tokens built successfully.");
