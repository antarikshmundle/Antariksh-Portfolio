// Verifies the vendored ThreeUI KageLandingPage files against their registered
// byte counts and SHA-256 hashes. Usage: node scripts/verify-threeui-kage.mjs
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../src/shaders/threeui-kage.manifest.json", import.meta.url), "utf8"));
let failed = 0;

for (const file of manifest.files) {
  let status;
  try {
    const bytes = readFileSync(new URL(`../${file.path}`, import.meta.url));
    const hash = createHash("sha256").update(bytes).digest("hex");
    status = hash === file.sha256 && bytes.length === file.bytes ? "OK" : `MISMATCH (${bytes.length} B, ${hash})`;
  } catch {
    status = "MISSING";
  }
  if (status !== "OK") failed++;
  console.log(`${status === "OK" ? "OK  " : "FAIL"}  ${file.path}${status === "OK" ? "" : `  ${status}`}`);
}

console.log(failed ? `${failed} of ${manifest.files.length} files failed` : `All ${manifest.files.length} files match their registered hashes`);
process.exit(failed ? 1 : 0);
