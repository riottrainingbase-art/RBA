import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fieldbookHtml } from "./fieldbook-html";

export const dynamic = "force-dynamic";

export async function GET() {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember%2Ffieldbook");

  const { data: allowed, error } = await client.rpc("has_dhub_coach_access");
  if (error || allowed !== true) redirect("/ja/d-hub/coaches/member");

  return new Response(fieldbookHtml, { headers: {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex, nofollow",
  } });
}
