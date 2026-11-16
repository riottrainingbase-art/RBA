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
