import assert from "node:assert/strict";
import test from "node:test";
import { buildStaffAlert } from "../lib/line/staff-alert.ts";

test("staff alerts contain no user message or raw LINE user ID", () => {
  const alert = buildStaffAlert({
    category: "billing",
    serviceHint: "RBA",
    webhookEventId: "01HXYZ",
  });

  assert.equal(alert.source, "riot-line");
  assert.equal(alert.kind, "staff-handoff");
  assert.equal(alert.category, "billing");
  assert.equal(alert.serviceHint, "RBA");
  assert.equal(alert.webhookEventId, "01HXYZ");
  assert.equal("userId" in alert, false);
  assert.equal("message" in alert, false);
  assert.equal(alert.text.includes("決済・返金"), true);
});

test("health staff alerts are labeled clearly", () => {
  const alert = buildStaffAlert({
    category: "health",
    serviceHint: "RTB",
  });
  assert.equal(alert.text.includes("怪我・体調"), true);
  assert.equal(alert.text.includes("RTB"), true);
});
