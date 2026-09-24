import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@22.4.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe("sk_webhook_verification_only", { apiVersion: "2026-08-26.preview" as never });
const HOMECOURT_PRICE_ID = "price_1UHNz5RXDnnSs6XNPrBsJvEq";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function db() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

function currentPeriodEnd(subscription: Stripe.Subscription) {
  const periods = subscription.items.data
    .map((item) => item.current_period_end)
    .filter((value): value is number => Number.isFinite(value));
  return periods.length ? new Date(Math.max(...periods) * 1000).toISOString() : null;
}

function subscriptionStatus(status: Stripe.Subscription.Status) {
  if (status === "canceled") return "cancelled";
  return ["active", "trialing", "past_due", "unpaid"].includes(status) ? status : "inactive";
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing Stripe signature", { status: 400 });

  const supabase = db();
  const secretResult = await supabase.rpc("get_integration_secret", { secret_name: "stripe_homecourt_webhook" });
  if (secretResult.error || !secretResult.data) return new Response("Webhook secret is not configured", { status: 503 });

  const body = await request.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      String(secretResult.data),
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object;
      const userId = session.client_reference_id && uuidPattern.test(session.client_reference_id) ? session.client_reference_id : null;
      const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
      const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

      if (userId && subscriptionId) {
        const write = await supabase.from("subscriptions").upsert({
          user_id: userId,
          provider: "stripe",
          provider_customer_id: customerId || null,
          provider_subscription_id: subscriptionId,
          status: "active",
          plan_key: "homecourt_monthly",
          updated_at: new Date().toISOString(),
        }, { onConflict: "provider_subscription_id" });
        if (write.error) throw write.error;
      }
    }

    if (event.type.startsWith("customer.subscription.")) {
      const subscription = event.data.object as Stripe.Subscription;
      if (subscription.items.data.some((item) => item.price?.id === HOMECOURT_PRICE_ID)) {
        const write = await supabase.from("subscriptions").update({
          status: subscriptionStatus(subscription.status),
          current_period_end: currentPeriodEnd(subscription),
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        }).eq("provider_subscription_id", subscription.id);
        if (write.error) throw write.error;
      }
    }

    return Response.json({ received: true });
  } catch {
    return new Response("Webhook processing failed", { status: 500 });
  }
});