import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["atelier-design-system"],
  webpack: (config) => {
    const libSrc = path.resolve(__dirname, "src");

    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@atelier/primitives": path.resolve(libSrc, "components/index.ts"),
      "@atelier/hooks": path.resolve(libSrc, "hooks/index.ts"),
      "@/lib": path.resolve(libSrc, "lib"),
      "@/hooks": path.resolve(libSrc, "hooks"),
    };

    return config;
  },
};

export default nextConfig;
