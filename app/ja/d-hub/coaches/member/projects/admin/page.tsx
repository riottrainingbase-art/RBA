import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";
import { createProject, updateProjectApplicationStatus } from "../actions";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB PROJECT ADMIN | RBA"},robots:{index:false,follow:false}};

type Project={id:string;title:string;slug:string;status:string;category:string;region:string;application_deadline:string|null;roles_needed:number};
type Application={
  id:string;project_id:string;user_id:string;proposed_role:string;motivation:string;availability_note:string;member_note:string;admin_note:string;status:string;submitted_at:string;
};
type Profile={user_id:string;display_name:string;base_region:string;specialties:string[];age_groups:string[];credentials:string[];languages:string[];travel_ok:boolean;open_to_projects:boolean};

const categoryLabel:Record<string,string>={on_court:"オンコート",team_support:"チーム支援",regional:"地域開催",international:"国際交流",performance:"S&C / PERFORMANCE",operations:"運営",other:"その他"};
const statusLabel:Record<string,string>={draft:"準備中",open:"募集中",matching:"選考・調整中",filled:"担当決定",completed:"完了",cancelled:"中止"};
const applicationStatus:Record<string,string>={submitted:"応募済み",reviewing:"確認中",shortlisted:"候補",selected:"担当決定",not_selected:"見送り",withdrawn:"辞退",completed:"完了"};
const formatDate=(v:string|null)=>v?new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(v)):"—";

export default async function Page(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember%2Fprojects%2Fadmin");
  const {data:isAdmin}=await supabase.rpc("is_dhub_project_admin");
  if(!isAdmin)redirect("/ja/d-hub/coaches/member/projects");

  const [{data:projectRows},{data:applicationRows},{data:profileRows}]=await Promise.all([
    supabase.from("dhub_projects").select("id,title,slug,status,category,region,application_deadline,roles_needed").order("created_at",{ascending:false}),
    supabase.from("dhub_project_applications").select("id,project_id,user_id,proposed_role,motivation,availability_note,member_note,admin_note,status,submitted_at").order("submitted_at",{ascending:false}),
    supabase.from("dhub_project_profiles").select("user_id,display_name,base_region,specialties,age_groups,credentials,languages,travel_ok,open_to_projects"),
  ]);
  const projects=(projectRows||[]) as Project[];
  const applications=(applicationRows||[]) as Application[];
  const profiles=(profileRows||[]) as Profile[];
  const projectById=new Map(projects.map(p=>[p.id,p]));
  const profileById=new Map(profiles.map(p=>[p.user_id,p]));

  return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-member-page">
    <section className="dhub-member-hero section-pad">
      <BriefcaseBusiness size={42}/>
      <p className="section-index">D-HUB PROJECTS / ADMIN</p>
      <h1>案件を、条件から設計する。</h1>
      <p>公開前に、目的・役割・報酬・実費・安全条件・締切を揃えます。メンバーへの募集は、その条件を確認できた案件だけにします。</p>
      <Link className="button button-light" href="/ja/d-hub/coaches/member/projects"><ArrowLeft size={16}/> PROJECT BOARDへ戻る</Link>
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">CREATE PROJECT</p><h2>新しい案件を作成。</h2></div><p>最初はDRAFTで保存し、条件が揃ってからOPENにしてください。</p></div>
      <form action={createProject} className="dhub-profile-form">
        <label>案件名<input name="title" required maxLength={160}/></label>
        <label>slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="sendai-u15-assistant-2026"/></label>
        <label>概要<textarea name="summary" required maxLength={1500}/></label>
        <label>カテゴリー<select name="category" defaultValue="on_court"><option value="on_court">オンコート</option><option value="team_support">チーム支援</option><option value="regional">地域開催</option><option value="international">国際交流</option><option value="performance">S&C / PERFORMANCE</option><option value="operations">運営</option><option value="other">その他</option></select></label>
        <label>状態<select name="status" defaultValue="draft"><option value="draft">DRAFT</option><option value="open">OPEN</option><option value="matching">MATCHING</option><option value="filled">FILLED</option><option value="completed">COMPLETED</option><option value="cancelled">CANCELLED</option></select></label>
        <label>公開範囲<select name="visibility" defaultValue="members"><option value="members">D-HUBメンバー</option><option value="direct">個別招待のみ</option></select></label>
        <label>地域<input name="region" placeholder="例：宮城・仙台"/></label>
        <label>会場<input name="venue"/></label>
        <label>開始日時<input name="starts_at" type="datetime-local"/></label>
        <label>終了日時<input name="ends_at" type="datetime-local"/></label>
        <label>応募締切<input name="application_deadline" type="datetime-local"/></label>
        <label>募集人数<input name="roles_needed" type="number" min="1" max="100" defaultValue="1"/></label>
        <label>対象年代<textarea name="target_age_groups" placeholder="U12, U15"/></label>
        <label>担当内容<textarea name="responsibilities" placeholder="オンコート指導, 事前MTG, 振り返り"/></label>
        <label>必要経験<textarea name="required_experience"/></label>
        <label>必要資格<textarea name="required_credentials"/></label>
        <label>必要言語<textarea name="required_languages"/></label>
        <label>報酬種別<select name="compensation_type" defaultValue="paid"><option value="paid">有償</option><option value="expenses_only">実費支給のみ</option><option value="volunteer">無償協力</option></select></label>
        <label>報酬下限（円）<input name="compensation_jpy_min" type="number" min="0"/></label>
        <label>報酬上限（円）<input name="compensation_jpy_max" type="number" min="0"/></label>
        <label>交通・宿泊等<textarea name="expense_terms"/></label>
        <label>キャンセル条件<textarea name="cancellation_terms"/></label>
        <label>安全・未成年対応<textarea name="safeguarding_notes"/></label>
        <label>内部連絡メモ<textarea name="contact_notes"/></label>
        <button className="button button-member" type="submit">案件を作成 <ArrowRight size={16}/></button>
      </form>
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">PROJECTS</p><h2>{projects.length}件の案件。</h2></div></div>
      <div className="dhub-curriculum-groups">{projects.map(project=><section key={project.id}><header><span>{categoryLabel[project.category]||project.category} / {statusLabel[project.status]||project.status}</span><h3>{project.title}</h3></header><div><p>{project.region||"地域未定"} / 募集 {project.roles_needed}名 / 締切 {formatDate(project.application_deadline)}</p><p>応募 {applications.filter(a=>a.project_id===project.id).length}件</p></div></section>)}</div>
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">APPLICATIONS</p><h2>応募者を条件と実績で確認。</h2></div><p>年齢・性別など不要な属性で順位付けせず、案件に必要な経験・資格・地域・日程と役割適合を確認します。</p></div>
      {applications.length?<div className="dhub-curriculum-groups">{applications.map(application=>{
        const project=projectById.get(application.project_id);
        const profile=profileById.get(application.user_id);
        return <section key={application.id}><header><span>{applicationStatus[application.status]||application.status}</span><h3>{profile?.display_name||"D-HUB MEMBER"} → {project?.title||"PROJECT"}</h3></header><div>
          <p><strong>希望役割：</strong>{application.proposed_role||"未記入"}</p>
          <p><strong>応募理由：</strong>{application.motivation}</p>
          <p><strong>日程・移動：</strong>{application.availability_note||"記載なし"}</p>
          <p><strong>補足：</strong>{application.member_note||"記載なし"}</p>
          <p><strong>プロフィール：</strong>{profile?.base_region||"拠点未登録"} / 得意 {profile?.specialties?.join("・")||"未登録"} / 年代 {profile?.age_groups?.join("・")||"未登録"} / 言語 {profile?.languages?.join("・")||"未登録"}</p>
          <form action={updateProjectApplicationStatus} className="dhub-profile-form">
            <input type="hidden" name="application_id" value={application.id}/>
            <label>選考状態<select name="status" defaultValue={application.status}><option value="submitted">応募済み</option><option value="reviewing">確認中</option><option value="shortlisted">候補</option><option value="selected">担当決定</option><option value="not_selected">見送り</option><option value="withdrawn">辞退</option><option value="completed">完了</option></select></label>
            <label>内部メモ<textarea name="admin_note" defaultValue={application.admin_note}/></label>
            <button className="button button-dark" type="submit">状態を更新</button>
          </form>
        </div></section>
      })}</div>:<div className="dhub-next-card"><Users/><strong>まだ応募はありません。</strong><p>公開中案件への応募が入ると、ここに表示されます。</p></div>}
    </section>
  </main></SiteFrame>;
}
