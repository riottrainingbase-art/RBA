import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { coachTopics, coachResources } from "@/lib/coach-learning";
import styles from "@/components/coach-learning.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Coach Learning Insights", robots: { index: false, follow: false } };
type Activity = { user_id: string; event_name: string; item_type: string; item_key: string; occurred_at: string; metadata: { group?: string } };
export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/my-homecourt/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") redirect("/my-homecourt/app/coach-library");
  const { data, error } = await supabase.from("analytics_events").select("user_id,event_name,item_type,item_key,occurred_at,metadata").in("item_type", ["coach_interest", "coach_resource"]).order("occurred_at", { ascending: false }).limit(5000);
  const rows = (data || []) as Activity[];
  const latest = new Map<string, Activity>();
  for (const row of rows) {
    if (row.item_type !== "coach_interest") continue;
    const key = `${row.user_id}:${row.item_key}`;
    if (!latest.has(key)) latest.set(key, row);
  }
  return <main className={styles.shell}><div className={styles.wrap}>
    <Link href="/my-homecourt/app/admin">← RBA管理画面</Link><section className={styles.hero}><p className={styles.eyebrow}>ADMIN / MALAYSIA COACH LEARNING</p><h1>指導者の関心と資料へのアクセス</h1><p className={styles.lead}>選択された学習テーマと、資料を開いた記録を確認できます。リンクのクリック数を読了者数として扱いません。</p></section>
    {error ? <p role="alert">取得できませんでした。時間をおいて再読み込みしてください。</p> : <>
      <p>{rows.length}件の最新記録を集計。{rows.length === 5000 ? "表示上限に達しているため全期間の合計ではありません。" : "記録がない場合は0件で表示します。"}</p>
      <section className={styles.section}><h2>現在選択されているテーマ</h2><div className={styles.grid}>{coachTopics.map(topic => { const matches = [...latest.values()].filter(row => row.item_key === topic.id && row.event_name === "save"); return <article className={styles.card} key={topic.id}><h3>{topic.title}</h3><p>{matches.length}名</p><small>Penang: {matches.filter(row => row.metadata?.group === "penang").length} / Kuala Lumpur: {matches.filter(row => row.metadata?.group === "kuala-lumpur").length} / その他: {matches.filter(row => !["penang", "kuala-lumpur"].includes(row.metadata?.group || "")).length}</small></article>; })}</div></section>
      <section className={styles.section}><h2>資料を開いた回数</h2><div className={styles.grid}>{coachResources.map(resource => { const matches = rows.filter(row => row.item_type === "coach_resource" && row.item_key === resource.id && row.event_name === "learn_open"); return <article className={styles.card} key={resource.id}><h3>{resource.title}</h3><p>{matches.length}回 / {new Set(matches.map(row => row.user_id)).size}名</p></article>; })}</div></section>
      <p className={styles.subtle}>地域は共有リンクで選ばれた入口です。本人の居住地や所属を確認したものではありません。同じRBA IDで入口を変えると地域別の内訳も変わります。</p>
    </>}
  </div></main>;
}
