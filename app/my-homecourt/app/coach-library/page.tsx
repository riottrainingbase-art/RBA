import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { coachGroup, coachLoginPath } from "@/lib/coach-learning";
import { CoachLibrary } from "@/components/coach-library";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Coach Library | RBA ID", robots: { index: false, follow: false } };
export default async function Page({ searchParams }: { searchParams: Promise<{ group?: string }> }) {
  const group = coachGroup((await searchParams).group);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(coachLoginPath(group));
  return <CoachLibrary userId={user.id} group={group} />;
}
