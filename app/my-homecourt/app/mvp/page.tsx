import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { mvpLoginPath } from "@/lib/mvp-partner";
import { PartnerHeader } from "@/components/mvp/partner-header";
import { PartnerRoom } from "@/components/mvp/partner-room";
import styles from "@/components/mvp/partner.module.css";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "MVP Coach Room | RBA", robots: { index: false, follow: false } };
export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(mvpLoginPath);
  return <main className={styles.shell}><div className={styles.wrap}><PartnerHeader /><PartnerRoom userId={user.id} /><footer className={styles.footer}><p>RBA × MVP · Partner coaching space</p><p>Discussions are shared with approved MVP and RBA coaches. Keep player details anonymous and share only material you have permission to use.</p><a href="/policies">Terms & privacy</a></footer></div></main>;
}
