// vitest.config.ts — config dédiée pour les tests.
// Vitest utilise esbuild en interne pour transformer le code.
// On configure esbuild pour transformer le JSX avec le runtime
// automatique de React (pas besoin de "import React" partout).
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    globals: true,
    // jsdom simule un navigateur en mémoire : document, window,
    // localStorage, etc. Sans ça, les tests React ne fonctionnent pas.
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
