import { memberAuthDestination } from "@/lib/member-auth-redirect";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MemberLogin } from "./member-login";
import type { Locale } from "./site-frame";

export async function MemberLoginEntry({ locale, authError, next, source }: {
  locale: Locale;
  next?: string;
  source?: string;
  authError?: boolean | "browser" | "expired";
}) {
  // Returning members should never be asked to sign in again while their session is still valid.
  const destination=memberAuthDestination(next||null);
  let hasSession=false;
  try {
    const supabase=await createClient();
    const {data:{user}}=await supabase.auth.getUser();
    hasSession=Boolean(user);
  } catch {
    // If session lookup fails, keep the normal sign-in/recovery experience available.
  }
  if(hasSession) redirect(destination);

  return <MemberLogin locale={locale} authError={authError} next={next} source={source} />;
}
