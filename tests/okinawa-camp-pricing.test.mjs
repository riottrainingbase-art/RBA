import assert from "node:assert/strict";
import { test } from "node:test";
import { campQuote, parseCampChoice, EARLY_BIRD_END, ONLINE_PAYMENT_END } from "../lib/okinawa-camp-pricing.ts";

const beforeOriginalDeadline = new Date("2026-10-24T00:00:00Z");
const afterOriginalDeadline = new Date("2026-11-06T00:00:00Z");
const lastDayBeforeClose = new Date(Date.parse(ONLINE_PAYMENT_END) - 1);

test("the overseas early bird continues after the originally announced 31 October deadline", () => {
  assert.equal(EARLY_BIRD_END, ONLINE_PAYMENT_END);
  for (const now of [beforeOriginalDeadline, afterOriginalDeadline, lastDayBeforeClose]) {
    for (const housing of [true, false]) for (const players of [1, 2]) {
      const q = campQuote({ housing, players, residence: "other" }, now);
      const unit = housing ? (players === 2 ? 324 : 360) : (players === 2 ? 216 : 240);
      assert.equal(q.state, "payable");
      assert.equal(q.early, true);
      assert.equal(q.perPlayer, unit);
      assert.equal(q.total, unit * players);
      assert.equal(new URL(q.checkoutUrl).origin, "https://book.stripe.com");
      const form = new URL(q.registrationUrl);
      assert.equal(form.searchParams.get("housing"), String(housing));
      assert.equal(form.searchParams.get("people"), String(players));
    }
  }
});
test("overseas 3+ group payments are withheld for individual review", () => {
  const q = campQuote({ housing: true, players: 3, residence: "other" }, afterOriginalDeadline);
  assert.equal(q.state, "group_review");
  assert.equal(q.total, null);
  assert.equal(q.checkoutUrl, null);
  assert.equal(q.registrationUrl, null);
});
test("payments stop at the advertised first-day reception start", () => {
  for (const residence of ["other", "japan", "okinawa"]) {
    const q = campQuote({ housing: true, players: 1, residence }, new Date(ONLINE_PAYMENT_END));
    assert.equal(q.state, "closed");
    assert.equal(q.checkoutUrl, null);
  }
});
test("choice parser rejects coercion and unsupported values", () => {
  for (const invalid of [
    null, [], {}, { housing: true, players: "2", residence: "other" },
    { housing: "false", players: 1, residence: "other" }, { housing: false, players: 9, residence: "other" },
    { housing: true, players: 1, residence: "anything" },
  ]) assert.equal(parseCampChoice(invalid), null);
});
test("domestic participants receive yen prices without overseas discounts or payment URLs", () => {
  for (const residence of ["japan", "okinawa"]) for (const housing of [true, false]) for (const players of [1, 2, 3]) {
    const choice = parseCampChoice({ housing, players, residence });
    assert.ok(choice);
    for (const now of [beforeOriginalDeadline, afterOriginalDeadline]) {
      const q = campQuote(choice, now);
      const unit = residence === "okinawa" ? housing ? 39600 : 27500 : housing ? 43560 : 30250;
      assert.equal(q.state, "local_review");
      assert.equal(q.currency, "JPY");
      assert.equal(q.early, false);
      assert.equal(q.perPlayer, unit);
      assert.equal(q.total, players < 3 ? unit * players : null);
      assert.equal(q.checkoutUrl, null);
      assert.equal(q.registrationUrl, null);
    }
  }
});
