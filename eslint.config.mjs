import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored third-party Pyodide runtime, not our source.
    "public/pyodide/**",
    // Compiled curriculum used by the lab validator.
    ".labs-build/**",
    "public/pyodide-worker.js",
  ]),
]);

export default eslintConfig;
