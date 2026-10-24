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
    // Vendored ThreeUI KageLandingPage files, kept byte-exact (see
    // src/shaders/threeui-kage.manifest.json); they are not ours to reformat.
    "src/shaders/**",
    "public/landing-pages/**",
  ]),
]);

export default eslintConfig;
