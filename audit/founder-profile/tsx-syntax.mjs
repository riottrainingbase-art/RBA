import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require(process.env.RBA_TYPESCRIPT_PATH || "/tmp/rba-founder-typescript/node_modules/typescript/lib/typescript.js");

const files = [
  "components/simple-japanese-home.tsx",
  "components/founder-profile.tsx",
  "components/site-frame.tsx",
  "app/page.tsx",
  "app/ja/page.tsx",
  "app/about/page.tsx",
  "app/ja/about/page.tsx",
  "app/zh-tw/about/page.tsx",
  "app/ko/about/page.tsx",
];

for (const file of files) {
  assert.ok(fs.existsSync(file), `Missing page source: ${file}`);
  const source = fs.readFileSync(file, "utf8");
  const result = ts.transpileModule(source, {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      isolatedModules: true,
      skipLibCheck: true,
    },
  });
  const errors = (result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error);
  if (errors.length) {
    console.error(ts.formatDiagnosticsWithColorAndContext(errors, {
      getCurrentDirectory: () => process.cwd(),
      getCanonicalFileName: path => path,
      getNewLine: () => "\n",
    }));
    process.exitCode = 1;
  } else {
    console.log(`TSX parse OK: ${file}`);
  }
}
if (process.exitCode) process.exit(process.exitCode);
console.log("Note: TSX parse verifies syntax only. Full Next.js build/typecheck and preview E2E remain release gates.");
