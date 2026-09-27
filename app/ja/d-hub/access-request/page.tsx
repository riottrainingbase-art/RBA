import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import Link from "next/link";
import {ArrowLeft,CheckCircle2,Mail,ReceiptText,ShieldCheck} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB ACCESS CHECK | RBA"},robots:{index:false,follow:false}};

export default async function Page(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Faccess-request");

  const {data:alreadyAllowed}=await supabase.rpc("has_dhub_access");
  if(alreadyAllowed)redirect("/ja/d-hub/member");

  async function submitRequest(formData:FormData){
    "use server";
    const s=await createClient();
    const {data:{user:currentUser}}=await s.auth.getUser();
    if(!currentUser)return;
    const squareEmail=String(formData.get("square_email")||"").trim().toLowerCase().slice(0,320);
    const invoice=String(formData.get("square_invoice_no")||"").trim().slice(0,120);
    const note=String(formData.get("note")||"").trim().slice(0,1500);
    const rbaEmail=(currentUser.email||"").trim().toLowerCase();
    if(!rbaEmail)return;
    const {data:existing}=await s.from("dhub_access_requests").select("id").eq("user_id",currentUser.id).eq("status","pending").order("created_at",{ascending:false}).limit(1);
    if(existing?.length){
      await s.from("dhub_access_requests").update({
        rba_email:rbaEmail,
        square_email:squareEmail||null,
        square_invoice_no:invoice||null,
        note:note||null,
        updated_at:new Date().toISOString()
      }).eq("id",existing[0].id);
    }else{
      await s.from("dhub_access_requests").insert({
        user_id:currentUser.id,
        rba_email:rbaEmail,
        square_email:squareEmail||null,
        square_invoice_no:invoice||null,
        note:note||null
      });
    }
    revalidatePath("/ja/d-hub/access-request");
  }

  const {data:requests}=await supabase.from("dhub_access_requests")
    .select("id,status,square_email,square_invoice_no,created_at,reviewed_at")
    .eq("user_id",user.id).order("created_at",{ascending:false}).limit(5);
  const pending=requests?.find(r=>r.status==="pending");

  return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-access-page">
    <header className="dhub-access-hero section-pad">
      <Link className="back-link" href="/ja/d-hub/member"><ArrowLeft size={15}/> D-HUB MEMBER</Link>
      <ShieldCheck size={40}/>
      <p className="section-index">D-HUB / SQUARE ACCESS CHECK</p>
      <h1>決済済みなのに入れない方へ。</h1>
      <p>Squareの毎月購読とRBA IDのメールアドレスが違う場合、こちらから照合を依頼できます。追加決済は不要です。</p>
    </header>

    <section className="dhub-access-grid section-pad">
      <div className="dhub-access-copy">
        <p className="section-index">WHY THIS HAPPENS</p>
        <h2>SquareとRBA IDを、正しく結びます。</h2>
        <div><Mail/><p><strong>RBA ID</strong><span>{user.email||"ログイン中"}</span></p></div>
        <div><ReceiptText/><p><strong>Square</strong><span>毎月購読で使用しているメールアドレス、または請求書番号を入力してください。</span></p></div>
        <p className="muted">照合できるのは、RBA側でSquareの継続決済を確認できた会員のみです。未決済の申込を有料会員として扱うことはありません。</p>
      </div>

      <form action={submitRequest} className="dhub-access-form">
        <label htmlFor="square_email">Square決済に使っているメールアドレス</label>
        <input id="square_email" name="square_email" type="email" defaultValue={pending?.square_email||""} placeholder="example@email.com"/>
        <label htmlFor="square_invoice_no">Square請求書番号（分かる場合）</label>
        <input id="square_invoice_no" name="square_invoice_no" type="text" defaultValue={pending?.square_invoice_no||""} placeholder="例：002600"/>
        <label htmlFor="note">補足</label>
        <textarea id="note" name="note" rows={5} placeholder="申込時の氏名、決済名義が異なる場合など"/>
        <button className="button button-member" type="submit">照合を依頼する</button>
        {pending?<p className="dhub-access-pending"><CheckCircle2 size={16}/> 照合依頼を受付済みです。確認後、このRBA IDへD-HUBアクセスを紐づけます。</p>:null}
      </form>
    </section>

    {requests?.length?<section className="dhub-access-history section-pad">
      <div className="section-head"><div><p className="section-index">REQUEST HISTORY</p><h2>照合履歴</h2></div></div>
      <div>{requests.map(r=><article key={r.id}><span>{new Date(r.created_at).toLocaleDateString("ja-JP")}</span><strong>{r.status.toUpperCase()}</strong><small>{r.square_invoice_no?"Square #"+r.square_invoice_no:(r.square_email||"照合情報あり")}</small></article>)}</div>
    </section>:null}
  </main></SiteFrame>;
}
