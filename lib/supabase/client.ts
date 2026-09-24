import { createBrowserClient } from "@supabase/ssr";

export function createClient(){
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

/**
 * Supabase's hosted default email template cannot carry the PKCE token hash.
 * Use the supported implicit callback only for passwordless email sign-in so
 * the link also works when Gmail opens it in a different browser context.
 */
export function createEmailLinkClient(){
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {auth:{flowType:"implicit",detectSessionInUrl:true}},
  );
}
