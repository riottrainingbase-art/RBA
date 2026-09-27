import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import Link from "next/link";
import {ArrowLeft,CheckCircle2,Link2,ShieldCheck,TriangleAlert} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB ADMIN | RBA"},robots:{index:false,follow:false}};

export default async function Page(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fadmin");
  const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).maybeSingle();
  if(profile?.role!=="admin")notFound();

  const [{data:members},{count:lessonCount}]=await Promise.all([
    supabase.from("dhub_memberships").select("member_name,email_normalized,alternate_emails,linked_user_id,provider,status,amount_jpy,last_payment_at,access_until,source_reference").order("last_payment_at",{ascending:false}),
    supabase.from("dhub_lessons").select("id",{count:"exact",head:true}).eq("published",true)
  ]);
  const rows=members||[];
  const linked=rows.filter(r=>r.linked_user_id).length;
  const active=rows.filter(r=>r.status==="active"||r.status==="grace").length;
  const soon=rows.filter(r=>r.access_until&&new Date(r.access_until).getTime()-Date.now()<7*86400000).length;

  return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-admin-page">
    <header className="dhub-admin-hero section-pad"><Link href="/ja/d-hub/member" className="back-link"><ArrowLeft size={15}/> MEMBER HOME</Link><ShieldCheck size={38}/><p className="section-index">D-HUB / ADMIN</p><h1>Square会員とRBA IDを、分けずに管理する。</h1><p>Squareの決済事実を基準に、サイト側ではD-HUBアクセス権だけを管理します。StripeのHOMECOURT購読とは分離しています。</p></header>
    <section className="dhub-admin-stats section-pad">
      <div><span>ACTIVE / GRACE</span><strong>{active}</strong><small>PAID MEMBERS</small></div>
      <div><span>RBA ID LINKED</span><strong>{linked}</strong><small>OF {rows.length}</small></div>
      <div><span>ACCESS REVIEW</span><strong>{soon}</strong><small>WITHIN 7 DAYS</small></div>
      <div><span>CURRICULUM</span><strong>{lessonCount||0}</strong><small>PAID LESSONS</small></div>
    </section>
    <section className="dhub-admin-table-wrap section-pad">
      <div className="section-head"><div><p className="section-index">MEMBERSHIP LEDGER</p><h2>現在のD-HUBアクセス台帳。</h2></div><p>決済元はSquare。RBA IDとの照合結果だけをサイトに持ちます。</p></div>
      <div className="dhub-admin-table"><div className="dhub-admin-row head"><span>MEMBER</span><span>STATUS</span><span>RBA ID</span><span>LAST PAYMENT</span><span>ACCESS UNTIL</span></div>
      {rows.map(row=><div className="dhub-admin-row" key={row.email_normalized}>
        <span><strong>{row.member_name||"—"}</strong><small>{row.email_normalized}</small>{row.alternate_emails?.length?<small>ALT: {row.alternate_emails.join(", ")}</small>:null}</span>
        <span>{row.status==="active"||row.status==="grace"?<CheckCircle2 size={15}/>:<TriangleAlert size={15}/>} {row.status.toUpperCase()}</span>
        <span>{row.linked_user_id?<><Link2 size={15}/> LINKED</>:<>— NOT LINKED</>}</span>
        <span>{row.last_payment_at?new Date(row.last_payment_at).toLocaleDateString("ja-JP"):"—"}</span>
        <span>{row.access_until?new Date(row.access_until).toLocaleDateString("ja-JP"):"—"}</span>
      </div>)}</div>
    </section>
  </main></SiteFrame>;
}
