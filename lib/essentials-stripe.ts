import { RBA_ESSENTIALS_STRIPE_ACCOUNT } from "@/lib/essentials-commerce";

/** Verify this deployment's secret really belongs to RBA, not another connected company. */
export async function verifyEssentialsStripeAccount(secret: string): Promise<boolean> {
  if(!secret.startsWith("sk_live_")&&!secret.startsWith("rk_live_"))return false;
  try{
    const result=await fetch("https://api.stripe.com/v1/account",{
      headers:{Authorization:`Bearer ${secret}`},
      cache:"no-store",
      signal:AbortSignal.timeout(8000),
    });
    if(!result.ok)return false;
    const account=(await result.json()) as {id?:string};
    return account.id===RBA_ESSENTIALS_STRIPE_ACCOUNT;
  }catch{return false;}
}


/**
 * Extra independent protection for *creating new* Stripe checkouts.
 * Existing paid-session webhooks must continue to reconcile even if the
 * merchant has temporarily misconfigured the public account profile.
 * Avoid any disclosure of settings or API response to the browser.
 */
export async function verifyEssentialsStripePublicBranding(secret: string): Promise<boolean> {
  if (!secret.startsWith("sk_live_") && !secret.startsWith("rk_live_")) return false;
  try {
    const response=await fetch("https://api.stripe.com/v1/account",{
      headers:{Authorization:`Bearer ${secret}`},
      cache:"no-store",
      signal:AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const account=(await response.json()) as {
      id?:string;
      business_profile?:{name?:string|null;url?:string|null};
      settings?:{payments?:{statement_descriptor?:string|null}};
    };
    if (account.id!==RBA_ESSENTIALS_STRIPE_ACCOUNT) return false;
    const rawUrl=account.business_profile?.url?.trim()||"";
    let website:URL;
    try {website=new URL(rawUrl);} catch {return false;}
    const domain=website.hostname.toLowerCase();
    const siteVerified=website.protocol==="https:" &&
      (domain==="riotbasketballacademy.com" || domain==="www.riotbasketballacademy.com") &&
      !website.username && !website.password;
    const descriptor=(account.settings?.payments?.statement_descriptor||"").trim().toUpperCase();
    const descriptorVerified=descriptor.startsWith("RBA") || descriptor.startsWith("RIOT");
    const name=(account.business_profile?.name||"").trim().toLowerCase();
    return siteVerified && descriptorVerified && name.includes("riot basketball academy");
  } catch {return false;}
}


/**
 * Read-only check: both webhook routes must exist on this exact RBA domain
 * and listen for the paid Checkout events. A configured environment flag alone
 * is not evidence that Stripe will deliver paid orders to our ledger.
 * This must never be used to reject an already-paid webhook delivery.
 */
export async function verifyEssentialsStripeWebhookDestinations(secret:string):Promise<boolean>{
  if(!secret.startsWith("sk_live_")&&!secret.startsWith("rk_live_"))return false;
  try{
    const response=await fetch("https://api.stripe.com/v1/webhook_endpoints?limit=100",{
      headers:{Authorization:`Bearer ${secret}`},
      cache:"no-store",
      signal:AbortSignal.timeout(8000),
    });
    if(!response.ok)return false;
    const result=(await response.json()) as {data?:Array<{url?:string;status?:string;enabled_events?:string[]}>;has_more?:boolean};
    if(result.has_more||!Array.isArray(result.data))return false;
    const required=[
      "https://riotbasketballacademy.com/api/commerce/essentials-preorder-webhook",
      "https://riotbasketballacademy.com/api/commerce/essentials-payment-link-webhook",
    ];
    return required.every(url=>result.data?.some(endpoint=>
      endpoint.status==="enabled" && endpoint.url===url &&
      (endpoint.enabled_events?.includes("*")||
       (endpoint.enabled_events?.includes("checkout.session.completed") &&
        endpoint.enabled_events?.includes("checkout.session.async_payment_succeeded")))
    ));
  }catch{return false;}
}
