import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const path = "app/ja/services/page.tsx";
const source = fs.readFileSync(path, "utf8");
const home = fs.readFileSync("components/simple-japanese-home.tsx", "utf8");
const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");

test("four role-specific service routes use existing official pages", () => {
  for(const url of ["/ja/home-court","/ja/d-hub","/ja/clinic-request","/ja/support","/ja/partners"]){
    assert.ok(source.includes(url), "missing service destination "+url);
  }
  assert.equal((source.match(/eyebrow: "FOR /g)||[]).length,4);
});

test("paid event checkout, Stripe new links, invented sponsor claims not embedded", () => {
  for(const blocked of ["buy.stripe.com","payment_intent","KHM annual title confirmed","/ja/events/okinawa-international-camp-2026"]){
    assert.ok(!source.includes(blocked), "unsafe reference "+blocked);
  }
  assert.ok(source.includes("見積前の支払いは不要"));
  assert.ok(source.includes("参加資格を保証するものではありません"));
});

test("main home and sitemap link to the new service map", () => {
  assert.ok(home.includes('href="/ja/services"'));
  assert.ok(home.includes('data-growth-id="home-revenue-services"'));
  assert.ok(sitemap.includes('"/ja/services"'));
});

test("non-PII click tracking IDs for service calls", () => {
  const ids=[...source.matchAll(/tracking: "(growth-services-[a-z-]+)"/g)].map(x=>x[1]);
  assert.equal(ids.length,8);
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ids)assert.match(id,/^[a-z0-9-]{1,80}$/);
});