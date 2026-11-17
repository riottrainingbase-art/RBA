import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Verify there is at least one individually authorized and active maker.
 * A configuration flag alone is not a valid identity/fulfillment handoff.
 * Never reveal maker identity, user IDs, or personal data to customers.
 */
export async function essentialsFulfillmentCanAcceptOrders(): Promise<boolean> {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!secret)return false;
  try{
    const u=new URL(url);
    if(u.protocol!=="https:"||u.hostname!=="ctngdzzorhzpdxswahzl.supabase.co"||u.username||u.password)return false;
    const db=createClient(url,secret,{auth:{persistSession:false,autoRefreshToken:false}});
    const {count,error}=await db.from("rba_essentials_fulfillment_agents")
      .select("user_id",{head:true,count:"exact"})
      .eq("active",true)
      .eq("access_role","production");
    return !error && (count??0)>0;
  }catch{return false;}
}
