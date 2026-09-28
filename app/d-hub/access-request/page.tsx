import type {Metadata} from "next";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import Link from "next/link";
import {ArrowLeft,CheckCircle2} from "lucide-react";
import {SiteFrame} from "@/components/site-frame";
import {createClient} from "@/lib/supabase/server";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB ACCESS CHECK | RBA"},robots:{index:false,follow:false}};

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const q=await searchParams;
  const program=q.program==="players"?"players":"coach_lab";
  const label=program==="players"?"D-HUB PLAYERS":"D-HUB COACH LAB";
  const publicPath=program==="players"?"/d-hub/players":"/d-hub";
  const memberPath=program==="players"?"/d-hub/players/member":"/d-hub";
  const rpc=program==="players"?"has_dhub_player_access":"has_dhub_coach_access";

  const s=await createClient();
  const {data:{user}}=await s.auth.getUser();
  if(!user)redirect("/my-homecourt/login?next="+encodeURIComponent("/d-hub/access-request?program="+program));
  const {data:ok}=await s.rpc(rpc);
  if(ok)redirect(memberPath);

  async function submit(fd:FormData){
    "use server";
    const x=await createClient();
    const {data:{user:u}}=await x.auth.getUser();
    if(!u)return;
    const square=String(fd.get("square_email")||"").trim().toLowerCase().slice(0,320);
    const invoice=String(fd.get("square_invoice_no")||"").trim().slice(0,120);
    const note=String(fd.get("note")||"").trim().slice(0,1500);
    const {data:existing}=await x.from("dhub_access_requests").select("id").eq("user_id",u.id).eq("program_type",program).eq("status","pending").limit(1);
    const payload={program_type:program,rba_email:(u.email||"").toLowerCase(),square_email:square||null,square_invoice_no:invoice||null,note:note||null,updated_at:new Date().toISOString()};
    if(existing?.length)await x.from("dhub_access_requests").update(payload).eq("id",existing[0].id);
    else await x.from("dhub_access_requests").insert({...payload,user_id:u.id});
    revalidatePath("/d-hub/access-request");
  }

  const {data:reqs}=await s.from("dhub_access_requests").select("id,status,square_email,square_invoice_no,created_at").eq("user_id",user.id).eq("program_type",program).order("created_at",{ascending:false}).limit(5);
  const pending=reqs?.find(x=>x.status==="pending");

  return <SiteFrame locale="en" languagePage="d-hub">
    <main className="dhub-access-page">
      <header className="dhub-access-hero section-pad">
        <Link className="back-link" href={publicPath}><ArrowLeft size={15}/> {label}</Link>
        <p className="section-index">{label} / SQUARE ACCESS CHECK</p>
        <h1>Already paid but cannot access the member page?</h1>
        <p>COACH LAB and PLAYERS are verified separately. A subscription for one program does not unlock the other.</p>
      </header>

      <section className="dhub-access-grid section-pad">
        <div>
          <p className="section-index">PROGRAM</p>
          <h2>{label}</h2>
          <p>RBA ID: {user.email}</p>
          <p>Enter the email address or invoice number used for this program's Square recurring subscription.</p>
        </div>
        <form action={submit} className="dhub-access-form">
          <label>Square payment email<input name="square_email" type="email" defaultValue={pending?.square_email||""}/></label>
          <label>Square invoice number<input name="square_invoice_no" defaultValue={pending?.square_invoice_no||""}/></label>
          <label>Notes<textarea name="note" rows={5}/></label>
          <button className="button button-member">Request access check</button>
          {pending?<p className="dhub-access-pending"><CheckCircle2 size={16}/> Your access check request has been received.</p>:null}
        </form>
      </section>
    </main>
  </SiteFrame>;
}
