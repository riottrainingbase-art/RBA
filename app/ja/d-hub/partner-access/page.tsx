import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";
import styles from "./partner-access.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "D-HUB PARTNER ACCESS | RBA DEVELOPMENT NETWORK" },
  robots: { index: false, follow: false },
};

const AGE_GROUPS = ["U8","U10","U12","U15","U18","一般"];
const ROLE_OPTIONS = ["代表","ヘッドコーチ","アシスタントコーチ","S&C","スタッフ","その他"];

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const q = await searchParams;
  const requestedSlug = typeof q.org === "string" ? q.org : "";
  const submitted = q.submitted === "1";
  const error = typeof q.error === "string" ? q.error : "";

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const next = "/ja/d-hub/partner-access" + (requestedSlug ? "?org="+encodeURIComponent(requestedSlug) : "");
    redirect("/ja/my-homecourt/login?next="+encodeURIComponent(next));
  }

  const [{data:organizations},{data:profile}] = await Promise.all([
    supabase.from("dhub_partner_organizations").select("id,slug,name,program_type").eq("status","active").order("name"),
    supabase.from("profiles").select("display_name").eq("id",user.id).maybeSingle(),
  ]);

  const orgs = organizations || [];
  const selected = orgs.find(org=>org.slug===requestedSlug) || orgs[0] || null;

  const {data:existing} = selected
    ? await supabase.from("dhub_partner_access")
      .select("id,status,display_name,role_title,age_groups,learning_goal,created_at,reviewed_at,dhub_partner_organizations(name,slug)")
      .eq("user_id",user.id)
      .eq("organization_id",selected.id)
      .maybeSingle()
    : {data:null};

  async function submit(formData:FormData){
    "use server";
    const s=await createClient();
    const {data:{user:currentUser}}=await s.auth.getUser();
    if(!currentUser)return;

    const organizationId=String(formData.get("organization_id")||"");
    const displayName=String(formData.get("display_name")||"").trim().slice(0,120);
    const roleTitle=String(formData.get("role_title")||"").trim().slice(0,120);
    const ageGroups=formData.getAll("age_groups").map(value=>String(value)).filter(value=>AGE_GROUPS.includes(value));
    const learningGoal=String(formData.get("learning_goal")||"").trim().slice(0,1200);
    const accepted=String(formData.get("terms")||"")==="accepted";

    const {data:org}=await s.from("dhub_partner_organizations").select("id,slug").eq("id",organizationId).eq("status","active").maybeSingle();
    if(!org)redirect("/ja/d-hub/partner-access?error=organization");
    if(!displayName||!roleTitle||!ageGroups.length||!accepted)redirect("/ja/d-hub/partner-access?org="+org.slug+"&error=required");

    const {data:current}=await s.from("dhub_partner_access").select("id,status").eq("user_id",currentUser.id).eq("organization_id",organizationId).maybeSingle();
    if(current?.status==="approved")redirect("/ja/d-hub/partner-access?org="+org.slug+"&status=approved");

    const payload={
      user_id:currentUser.id,
      organization_id:organizationId,
      rba_email:(currentUser.email||"").trim().toLowerCase(),
      display_name:displayName,
      role_title:roleTitle,
      age_groups:ageGroups,
      learning_goal:learningGoal,
      status:"pending",
      terms_accepted_at:new Date().toISOString(),
      reviewed_by:null,
      reviewed_at:null,
      revoked_at:null,
      updated_at:new Date().toISOString(),
    };

    if(current?.id)await s.from("dhub_partner_access").update(payload).eq("id",current.id);
    else await s.from("dhub_partner_access").insert(payload);

    revalidatePath("/ja/d-hub/partner-access");
    redirect("/ja/d-hub/partner-access?org="+org.slug+"&submitted=1");
  }

  return (
    <SiteFrame locale="ja" languagePage="d-hub">
      <main className={styles.page}>
        <header className={styles.hero}>
          <Link href="/ja/d-hub/partners" className="back-link"><ArrowLeft size={15}/> RBA DEVELOPMENT NETWORK</Link>
          <p className={styles.eyebrow}>D-HUB COACH LAB / PARTNER ACCESS</p>
          <ShieldCheck size={42}/>
          <h1>所属確認をして、<br/>自分のRBA IDで使う。</h1>
          <p>Gream仙台・Gream沖縄・DSMの指導スタッフ向け登録です。共有アカウントは使わず、一人ひとりの学習・実践・振り返りを本人のRBA IDに残します。</p>
        </header>

        <section className={styles.content}>
          <aside className={styles.guide}>
            <span>APPLICATION FLOW</span>
            <h2>申請 → 所属確認 → 開放</h2>
            <ol>
              <li><b>01</b><div><strong>所属と役割を登録</strong><p>担当年代と、今学びたいテーマも入力します。</p></div></li>
              <li><b>02</b><div><strong>RBAで所属確認</strong><p>対象組織のスタッフであることを確認します。</p></div></li>
              <li><b>03</b><div><strong>FULL ACCESS開放</strong><p>承認後は同じRBA IDでCOACH LABへ入れます。</p></div></li>
            </ol>
          </aside>

          <div className={styles.formCard}>
            {!selected ? <div className={styles.notice}>現在、申請可能なパートナー組織がありません。</div> : existing?.status==="approved" ? (
              <div className={styles.statusCard}>
                <CheckCircle2 size={34}/>
                <span>PARTNER ACCESS / APPROVED</span>
                <h2>{selected.name}</h2>
                <p>所属確認が完了しています。D-HUB COACH LAB FULL ACCESSをご利用いただけます。</p>
                <Link className="button button-member" href="/ja/d-hub/coaches/member">D-HUB COACH LABへ <ArrowRight size={16}/></Link>
              </div>
            ) : existing?.status==="pending" || submitted ? (
              <div className={styles.statusCard}>
                <Clock3 size={34}/>
                <span>PARTNER ACCESS / REVIEWING</span>
                <h2>{selected.name}</h2>
                <p>申請を受け付けています。RBAで所属確認後、このRBA IDにD-HUB COACH LABのアクセスを付与します。</p>
                <p className={styles.account}>RBA ID：{user.email}</p>
              </div>
            ) : (
              <form action={submit} className={styles.form}>
                <div className={styles.formHead}>
                  <span>PARTNER APPLICATION</span>
                  <h2>スタッフ登録</h2>
                  <p>対象者本人のRBA IDで申請してください。</p>
                </div>

                {error ? <div className={styles.error}>入力内容を確認してください。所属組織・氏名・役割・担当年代・利用条件への同意は必須です。</div> : null}

                <label>所属組織
                  <select name="organization_id" defaultValue={selected.id}>
                    {orgs.map(org=><option value={org.id} key={org.id}>{org.name}</option>)}
                  </select>
                </label>

                <label>氏名
                  <input name="display_name" defaultValue={existing?.display_name||profile?.display_name||""} required/>
                </label>

                <label>RBA ID
                  <input value={user.email||""} readOnly/>
                  <small>このメールアドレスのアカウントにアクセス権を付与します。</small>
                </label>

                <label>役割
                  <select name="role_title" defaultValue={existing?.role_title||""} required>
                    <option value="" disabled>選択してください</option>
                    {ROLE_OPTIONS.map(role=><option value={role} key={role}>{role}</option>)}
                  </select>
                </label>

                <fieldset>
                  <legend>主に担当している年代</legend>
                  <div className={styles.checkGrid}>
                    {AGE_GROUPS.map(group=><label key={group}><input type="checkbox" name="age_groups" value={group} defaultChecked={(existing?.age_groups||[]).includes(group)}/><span>{group}</span></label>)}
                  </div>
                </fieldset>

                <label>D-HUBで学びたいこと
                  <textarea name="learning_goal" rows={6} defaultValue={existing?.learning_goal||""} placeholder="例：U12で判断を奪わない練習設計、ゲーム中の問いかけ、S&Cの組み込み方など"/>
                </label>

                <label className={styles.terms}>
                  <input type="checkbox" name="terms" value="accepted" required/>
                  <span>本人用アカウントとして利用し、教材・会員限定コンテンツを組織外へ無断共有しません。RBAによる所属確認に同意します。</span>
                </label>

                <button className="button button-member" type="submit">所属確認を申請する <ArrowRight size={16}/></button>
              </form>
            )}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
