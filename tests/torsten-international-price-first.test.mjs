import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const landing=readFileSync(new URL("../components/torsten-international.tsx", import.meta.url),"utf8");
const css=readFileSync(new URL("../components/torsten-international.css", import.meta.url),"utf8");
const links=readFileSync(new URL("../components/torsten-usd-data.ts", import.meta.url),"utf8");

test("international first-screen offers only verified USD price paths",()=>{
  assert.match(landing,/tg-fast-options/);
  assert.match(landing,/LIVE · US\$29/);
  assert.match(landing,/RECORDING · US\$29/);
  assert.match(landing,/href=\{torstenUsdLive\}/);
  assert.match(landing,/href=\{torstenUsdRecording\}/);
  assert.match(landing,/LIVE does not include recording/);
  assert.match(landing,/No separate Google Form is required/);
  assert.match(landing,/In Japan\? Use the separate JPY registration/);
  assert.match(links,/buy\.stripe\.com/);
  assert.doesNotMatch(landing,/price=0|Free admission|Discount code/);
});
test("mobile offers are legible and stack without horizontal overflow",()=>{
  assert.match(css,/\.tg-fast-options\{display:grid/);
  assert.match(css,/\.tg-fast-options\{grid-template-columns:1fr\}/);
  assert.match(css,/\.tg-fast-option:focus-visible/);
  assert.match(css,/min-width:0/);
});
