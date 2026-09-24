import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

function json(data: unknown, status=200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type":"application/json","Cache-Control":"private, no-store"},
  });
}

Deno.serve(async (req: Request) => {
  if (req.method !== "GET") return json({error:"method_not_allowed"},405);

  const auth = req.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i,"");
  if (!token) return json({error:"unauthorized"},401);

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});

  const {data:{user},error:userError} = await admin.auth.getUser(token);
  if (userError || !user) return json({error:"unauthorized"},401);

  const {data:profile} = await admin.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if (profile?.role !== "admin") return json({error:"forbidden"},403);

  const {data:summary,error:summaryError} = await admin.schema("private").from("payment_ops_summary").select("*").single();
  if (summaryError) return json({error:"summary_unavailable"},500);

  const {data:unmatched} = await admin.from("unmatched_stripe_payments")
    .select("id,checkout_session_id,customer_email,amount_total,currency,programme_key,event_key,plan_key,payment_status,reason,created_at")
    .eq("status","unresolved").order("created_at",{ascending:false}).limit(50);

  const {data:failed} = await admin.from("stripe_webhook_events")
    .select("stripe_event_id,event_type,object_id,error_message,received_at")
    .eq("processing_status","failed").order("received_at",{ascending:false}).limit(50);

  return json({summary,unmatched:unmatched||[],failed_webhooks:failed||[]});
});
