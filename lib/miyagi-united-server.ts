import "server-only";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export const miyagiAccount="acct_1UGdxZRXDnnSs6XN";
export const miyagiOrigin="https://riotbasketballacademy.com";
export function miyagiAdmin(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)return null;
 try{if(new URL(url).hostname!=="ctngdzzorhzpdxswahzl.supabase.co")return null;}catch{return null;}
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
export function miyagiStripe(){const key=process.env.STRIPE_SECRET_KEY;return key?new Stripe(key):null;}
