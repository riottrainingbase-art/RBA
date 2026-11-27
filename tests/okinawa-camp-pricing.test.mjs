import assert from "node:assert/strict";
import { test } from "node:test";
import { campQuote, parseCampChoice, EARLY_BIRD_END, ONLINE_PAYMENT_END } from "../lib/okinawa-camp-pricing.ts";

const early = new Date("2026-10-24T00:00:00Z");
const normal = new Date("2026-11-01T00:00:00Z");
for (const [housing, amounts] of [[true, [450, 360, 405, 324]], [false, [300, 240, 270, 216]]]) {
  for (const [index, players, now] of [[0, 1, normal], [1, 1, early], [2, 2, normal], [3, 2, early]]) {
    test(`${housing ? "housing" : "day"}: ${players} players, ${now === early ? "early" : "normal"}`, () => {
      const q = campQuote({ housing, players, residence: "other" }, now);
      assert.equal(q.perPlayer, amounts[index]);
      assert.equal(q.total, amounts[index] * players);
      assert.equal(new URL(q.checkoutUrl).origin, "https://book.stripe.com");
      const form = new URL(q.registrationUrl);
      assert.equal(form.searchParams.get("housing"), String(housing));
      assert.equal(form.searchParams.get("people"), String(players));
    });
  }
}
test("Taiwan deadline is enforced at the exact millisecond boundary", () => {
  const choice = { housing: false, players: 2, residence: "other" };
  assert.equal(campQuote(choice, new Date(EARLY_BIRD_END)).total, 432);
  assert.equal(campQuote(choice, new Date(Date.parse(EARLY_BIRD_END) + 1)).total, 540);
});
test("overseas 3+ groups never receive a price or checkout link", () => {
  for (const choice of [{ housing: true, players: 3, residence: "other" }]) {
    const q = campQuote(choice, early);
    assert.equal(q.total, null); assert.equal(q.checkoutUrl, null); assert.equal(q.registrationUrl, null);
  }
});
test("payment closes when the published camp reception begins", () => {
  const q = campQuote({ housing: true, players: 1, residence: "other" }, new Date(ONLINE_PAYMENT_END));
  assert.equal(q.state, "closed"); assert.equal(q.checkoutUrl, null);
});
test("choice parser rejects coercion and unsupported values", () => {
  for (const invalid of [null, [], {}, { housing: true, players: "2", residence: "other" }, { housing: "false", players: 1, residence: "other" }, { housing: false, players: 9, residence: "other" }, { housing: true, players: 1, residence: "anything" }]) assert.equal(parseCampChoice(invalid), null);
});

test("domestic participants receive correct yen prices and no overseas checkout or registration URL", () => {
  for (const residence of ["japan", "okinawa"]) {
    for (const housing of [true, false]) {
      for (const players of [1, 2, 3]) {
        const parsed = parseCampChoice({ housing, players, residence });
        assert.ok(parsed);
        const q = campQuote(parsed, early);
        assert.equal(q.state, "local_review");
        assert.equal(q.perPlayer, residence === "okinawa" ? housing ? 39600 : 27500 : housing ? 43560 : 30250);
        assert.equal(q.total, players < 3 ? (residence === "okinawa" ? housing ? 39600 : 27500 : housing ? 43560 : 30250) * players : null);
        assert.equal(q.checkoutUrl, null);
        assert.equal(q.registrationUrl, null);
      }
    }
  }
});

test("domestic yen prices do not stack overseas discounts or expire at the early-bird deadline", () => {
  for (const residence of ["okinawa", "japan"]) for (const housing of [true, false]) for (const now of [early, normal]) {
    const q = campQuote({housing, players: 2, residence}, now);
    assert.equal(q.currency, "JPY"); assert.equal(q.early, false);
    assert.equal(q.total, (residence === "okinawa" ? housing ? 39600 : 27500 : housing ? 43560 : 30250) * 2);
    assert.equal(q.checkoutUrl, null); assert.equal(q.registrationUrl, null);
  }
});
test("resident prices close with the camp rather than showing a payable local quote", () => {
  const q = campQuote({housing: true, players: 1, residence: "okinawa"}, new Date(ONLINE_PAYMENT_END));
  assert.equal(q.state, "closed"); assert.equal(q.perPlayer, null); assert.equal(q.checkoutUrl, null);
});
