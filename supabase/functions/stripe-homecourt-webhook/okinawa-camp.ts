// Called only after the shared webhook has verified the Stripe signature.
const RATES = {
  day: { amount: 27500, link: "plink_1UU7e5RXDnnSs6XNxPywTKYf" },
  housing: { amount: 39600, link: "plink_1UU7e6RXDnnSs6XNKNZseWJQ" },
} as const;
const id = (value: any) => typeof value === "string" ? value : value?.id || null;
const field = (session: any, key: string) => {
  const row = (session.custom_fields || []).find((f: any) => f.key === key);
  return row?.text?.value ?? row?.dropdown?.value ?? null;
};
export async function processOkinawaCampCheckout(db: any, event: any, session: any) {
  if (session.metadata?.program !== "okinawa_camp_resident") return false;
  const plan = session.metadata?.plan as keyof typeof RATES;
  const rate = RATES[plan];
  if (!rate || id(session.payment_link) !== rate.link || session.amount_total !== rate.amount || session.currency !== "jpy" || session.livemode !== true) throw new Error("okinawa_camp_payment_mismatch");
  const name = String(field(session, "playername") || "").trim();
  const details = String(field(session, "playerdetails") || "").trim();
  const email = session.customer_details?.email || session.customer_email;
  if (!name || !details || !email || field(session, "bookingconsent") !== "accepted") throw new Error("okinawa_camp_registration_missing");
  const paid = session.payment_status === "paid";
  if (event.type === "checkout.session.async_payment_succeeded" && !paid) throw new Error("okinawa_camp_async_not_paid");
  const { error } = await db.rpc("record_okinawa_camp_booking", { p_booking: {
    checkout_session_id: session.id, payment_intent_id: id(session.payment_intent), payment_link_id: rate.link,
    plan, amount_jpy: rate.amount, payment_status: paid ? "paid" : event.type === "checkout.session.async_payment_failed" ? "failed" : "pending",
    guardian_name: session.customer_details?.name || null, guardian_email: email,
    guardian_phone: session.customer_details?.phone || null, billing_address: session.customer_details?.address || null,
    player_name: name, player_details: details, consent_accepted: true,
    paid_at: paid ? new Date(event.created * 1000).toISOString() : null,
  }});
  if (error) throw error;
  return true;
}
export async function processOkinawaCampRefund(db: any, refund: any) {
  const pi = id(refund.payment_intent);
  if (!pi) return false;
  const { data, error: lookupError } = await db.from("okinawa_camp_bookings").select("checkout_session_id").eq("payment_intent_id", pi).maybeSingle();
  if (lookupError) throw lookupError;
  if (!data) return false;
  if (refund.currency !== "jpy") throw new Error("okinawa_camp_refund_currency");
  const { error } = await db.rpc("record_okinawa_camp_refund", {p_id: refund.id, p_payment_intent_id: pi, p_amount: refund.amount, p_status: refund.status || "pending"});
  if (error) throw error;
  return true;
}
