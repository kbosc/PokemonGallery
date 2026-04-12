import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- Turbopack (next dev) ---
  // Turbopack est le bundler ultra-rapide utilisé par défaut en dev.
  // Il a sa propre façon de configurer les loaders (pas webpack).
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // --- Webpack (next build) ---
  // En production, Next.js utilise encore webpack.
  // On configure le même loader SVGR pour que les imports SVG
  // fonctionnent aussi au build.
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
