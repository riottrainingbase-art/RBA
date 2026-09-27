import type {Metadata} from "next";
import {notFound,redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import Link from "next/link";
import {ArrowLeft,CheckCircle2,Link2,ShieldCheck,TriangleAlert,UserCheck} from "lucide-react";
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

  async function approveRequest(formData:FormData){
    "use server";
    const s=await createClient();
    const {data:{user:adminUser}}=await s.auth.getUser();
    if(!adminUser)return;
    const {data:adminProfile}=await s.from("profiles").select("role").eq("id",adminUser.id).maybeSingle();
    if(adminProfile?.role!=="admin")return;

    const requestId=String(formData.get("request_id")||"");
    const {data:req}=await s.from("dhub_access_requests").select("id,user_id,square_email,status").eq("id",requestId).maybeSingle();
    if(!req||req.status!=="pending")return;
    const email=String(req.square_email||"").trim().toLowerCase();
    if(!email)return;

    const orFilter="email_normalized.eq."+email+",alternate_emails.cs.{"+email+"}";
    const {data:members}=await s.from("dhub_memberships").select("id,status").or(orFilter).in("status",["active","grace"]).limit(1);
    const match=members?.[0];
    if(!match)return;

    await s.from("dhub_memberships").update({linked_user_id:req.user_id,updated_at:new Date().toISOString()}).eq("id",match.id);
    await s.from("dhub_access_requests").update({
      status:"approved",reviewed_by:adminUser.id,reviewed_at:new Date().toISOString(),updated_at:new Date().toISOString()
    }).eq("id",req.id);
    revalidatePath("/ja/d-hub/admin");
  }

  const [{data:members},{count:lessonCount},{data:accessRequests}]=await Promise.all([
    supabase.from("dhub_memberships").select("member_name,email_normalized,alternate_emails,linked_user_id,provider,status,amount_jpy,last_payment_at,access_until,source_reference").order("last_payment_at",{ascending:false}),
    supabase.from("dhub_lessons").select("id",{count:"exact",head:true}).eq("published",true),
    supabase.from("dhub_access_requests").select("id,user_id,rba_email,square_email,square_invoice_no,note,status,created_at").eq("status","pending").order("created_at",{ascending:true})
  ]);

  const rows=members||[];
  const pendingRequests=accessRequests||[];
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

    {pendingRequests.length?<section className="dhub-admin-requests section-pad">
      <div className="section-head"><div><p className="section-index">ACCESS MATCHING</p><h2>決済済み会員の照合依頼。</h2></div><p>Square側のメールと既存の有料会員台帳が一致する場合だけ、RBA IDへアクセスを紐づけます。</p></div>
      <div className="dhub-admin-request-list">{pendingRequests.map(req=><article key={req.id}>
        <div><span>RBA ID</span><strong>{req.rba_email}</strong></div>
        <div><span>SQUARE</span><strong>{req.square_email||"—"}</strong><small>{req.square_invoice_no?"請求書 #"+req.square_invoice_no:"請求書番号なし"}</small></div>
        <div><span>NOTE</span><p>{req.note||"補足なし"}</p></div>
        <form action={approveRequest}><input type="hidden" name="request_id" value={req.id}/><button className="button button-member" type="submit"><UserCheck size={15}/> Square会員と照合して承認</button></form>
      </article>)}</div>
    </section>:null}

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
