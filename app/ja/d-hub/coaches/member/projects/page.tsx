import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BadgeJapaneseYen, BriefcaseBusiness, CalendarDays, ExternalLink, Handshake, MapPin, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";
import { applyToProject, saveProjectProfile, withdrawProjectApplication } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "D-HUB PROJECTS | COACH LAB MEMBER" },
  robots: { index: false, follow: false },
};

const BAND_URL="https://band.us/n/aaa2bdj9xcJ1o";
const LINE_URL="https://lin.ee/5l1YG8N";

type Project={
  id:string;slug:string;title:string;summary:string;category:string;status:string;region:string;venue:string|null;
  starts_at:string|null;ends_at:string|null;application_deadline:string|null;roles_needed:number;target_age_groups:string[];
  required_experience:string[];required_credentials:string[];required_languages:string[];responsibilities:string[];
  compensation_type:string;compensation_jpy_min:number|null;compensation_jpy_max:number|null;
  expense_terms:string;cancellation_terms:string;safeguarding_notes:string;contact_notes:string;
};
type Application={id:string;project_id:string;status:string;proposed_role:string;submitted_at:string};
type ProjectProfile={
  display_name:string;base_region:string;travel_ok:boolean;specialties:string[];age_groups:string[];
  credentials:string[];languages:string[];bio:string;portfolio_url:string|null;open_to_projects:boolean;
};

const categoryLabel:Record<string,string>={
  on_court:"オンコート",team_support:"チーム支援",regional:"地域開催",international:"国際交流",
  performance:"S&C / PERFORMANCE",operations:"運営",other:"その他"
};
const statusLabel:Record<string,string>={
  open:"募集中",matching:"選考・調整中",filled:"担当決定",completed:"完了",cancelled:"中止",draft:"準備中"
};
const applicationStatusLabel:Record<string,string>={
  submitted:"応募済み",reviewing:"確認中",shortlisted:"候補",selected:"担当決定",not_selected:"今回は見送り",withdrawn:"辞退",completed:"完了"
};
const formatDate=(value:string|null,withTime=false)=>{
  if(!value)return "未定";
  const d=new Date(value);
  return new Intl.DateTimeFormat("ja-JP",withTime?{timeZone:"Asia/Tokyo",year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}:{timeZone:"Asia/Tokyo",year:"numeric",month:"numeric",day:"numeric"}).format(d);
};
const compensation=(p:Project)=>{
  if(p.compensation_type==="expenses_only")return "実費支給";
  if(p.compensation_type==="volunteer")return "無償協力（条件確認必須）";
  if(p.compensation_jpy_min!==null&&p.compensation_jpy_max!==null)return `¥${p.compensation_jpy_min.toLocaleString()}〜¥${p.compensation_jpy_max.toLocaleString()}`;
  if(p.compensation_jpy_min!==null)return `¥${p.compensation_jpy_min.toLocaleString()}〜`;
  if(p.compensation_jpy_max!==null)return `〜¥${p.compensation_jpy_max.toLocaleString()}`;
  return "案件ごとに提示";
};
const join=(items:string[])=>items?.length?items.join(" / "):"指定なし";

export default async function Page(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember%2Fprojects");
  const {data:hasAccess}=await supabase.rpc("has_dhub_coach_access");
  if(!hasAccess)redirect("/ja/d-hub/coaches/member");

  const [{data:projectRows},{data:applicationRows},{data:profileRow},{data:isAdmin}]=await Promise.all([
    supabase.from("dhub_projects").select("id,slug,title,summary,category,status,region,venue,starts_at,ends_at,application_deadline,roles_needed,target_age_groups,required_experience,required_credentials,required_languages,responsibilities,compensation_type,compensation_jpy_min,compensation_jpy_max,expense_terms,cancellation_terms,safeguarding_notes,contact_notes").in("status",["open","matching","filled","completed"]).order("application_deadline",{ascending:true,nullsFirst:false}).order("starts_at",{ascending:true,nullsFirst:false}),
    supabase.from("dhub_project_applications").select("id,project_id,status,proposed_role,submitted_at").eq("user_id",user.id),
    supabase.from("dhub_project_profiles").select("display_name,base_region,travel_ok,specialties,age_groups,credentials,languages,bio,portfolio_url,open_to_projects").eq("user_id",user.id).maybeSingle(),
    supabase.rpc("is_dhub_project_admin"),
  ]);

  const projects=(projectRows||[]) as Project[];
  const applications=(applicationRows||[]) as Application[];
  const profile=(profileRow||null) as ProjectProfile|null;
  const applicationByProject=new Map(applications.map(item=>[item.project_id,item]));
  const openProjects=projects.filter(p=>p.status==="open");
  const activeApplications=applications.filter(a=>!["withdrawn","not_selected","completed"].includes(a.status));

  return <SiteFrame locale="ja" languagePage="d-hub">
    <main className="dhub-member-page">
      <section className="dhub-member-hero section-pad">
        <BriefcaseBusiness size={42}/>
        <p className="section-index">D-HUB COACH LAB / PROJECTS</p>
        <h1>学びを、<br/>実際の現場へつなぐ。</h1>
        <p>D-HUB PROJECTSは、RBAに届くクリニック、チーム支援、地域開催、国際交流などの依頼を、条件の合うCOACH LABメンバーへつなぐメンバー専用ボードです。D-HUB加入による案件・収入の保証はありません。</p>
        <div className="dhub-member-actions">
          <a className="button button-member" href="#project-board">現在の案件を見る <ArrowRight size={16}/></a>
          <a className="button button-light" href={BAND_URL} target="_blank" rel="noreferrer">BANDを開く <ExternalLink size={16}/></a>
          {isAdmin?<Link className="button button-dark" href="/ja/d-hub/coaches/member/projects/admin">PROJECT ADMIN <ArrowRight size={16}/></Link>:null}
        </div>
      </section>

      <section className="dhub-progress-strip section-pad">
        <div><span>OPEN PROJECTS</span><strong>{openProjects.length}</strong><small>現在募集中</small></div>
        <div><span>YOUR APPLICATIONS</span><strong>{applications.length}</strong><small>累計応募</small></div>
        <div><span>ACTIVE</span><strong>{activeApplications.length}</strong><small>進行中</small></div>
        <div className="dhub-progress-next"><span>PROFILE</span><strong>{profile?.open_to_projects?"OPEN":"—"}</strong><small>{profile?"登録済み":"未登録"}</small></div>
      </section>

      <section className="dhub-member-section section-pad">
        <div className="section-head"><div><p className="section-index">PROJECT PROFILE</p><h2>案件マッチング用プロフィール。</h2></div><p>公開プロフィールではありません。RBAが案件との適合を判断するために使います。資格は自己申告だけで確定扱いせず、必要な案件では別途確認します。</p></div>
        <form action={saveProjectProfile} className="dhub-profile-form">
          <label>表示名<input name="display_name" required maxLength={80} defaultValue={profile?.display_name||""}/></label>
          <label>活動拠点<input name="base_region" maxLength={120} placeholder="例：宮城県仙台市" defaultValue={profile?.base_region||""}/></label>
          <label>得意領域<textarea name="specialties" placeholder="例：U12, Practice Design, 3x3, S&C" defaultValue={(profile?.specialties||[]).join(", ")}/></label>
          <label>対応年代<textarea name="age_groups" placeholder="例：U10, U12, U15" defaultValue={(profile?.age_groups||[]).join(", ")}/></label>
          <label>資格・研修<textarea name="credentials" placeholder="保有資格や修了研修。必要時に確認をお願いする場合があります。" defaultValue={(profile?.credentials||[]).join(", ")}/></label>
          <label>言語<textarea name="languages" placeholder="例：日本語, English" defaultValue={(profile?.languages||[]).join(", ")}/></label>
          <label>自己紹介・できること<textarea name="bio" maxLength={1200} defaultValue={profile?.bio||""}/></label>
          <label>参考URL<input name="portfolio_url" type="url" placeholder="https://" defaultValue={profile?.portfolio_url||""}/></label>
          <label><input name="travel_ok" type="checkbox" defaultChecked={profile?.travel_ok||false}/> 遠征・地域外案件も相談可能</label>
          <label><input name="open_to_projects" type="checkbox" defaultChecked={profile?.open_to_projects??true}/> 現在、案件相談を受け取る</label>
          <button className="button button-member" type="submit">プロフィールを保存 <ArrowRight size={16}/></button>
        </form>
      </section>

      <section className="dhub-member-section section-pad" id="project-board">
        <div className="section-head"><div><p className="section-index">PROJECT BOARD</p><h2>現在のD-HUB案件。</h2></div><p>案件がない時は、無理に募集を作りません。RBA側で条件を確認できた案件だけを掲載します。</p></div>
        {projects.length?<div className="dhub-curriculum-groups">{projects.map(project=>{
          const application=applicationByProject.get(project.id);
          const deadlineOpen=!project.application_deadline||new Date(project.application_deadline)>new Date();
          const canApply=project.status==="open"&&deadlineOpen;
          return <section key={project.id}>
            <header>
              <span>{categoryLabel[project.category]||project.category} / {statusLabel[project.status]||project.status}</span>
              <h3>{project.title}</h3>
            </header>
            <div>
              <p>{project.summary}</p>
              <div className="dhub-member-value">
                <div><MapPin/><span>REGION</span><strong>{project.region||"未定"}</strong><p>{project.venue||"会場詳細は担当候補へ案内"}</p></div>
                <div><CalendarDays/><span>SCHEDULE</span><strong>{formatDate(project.starts_at)}</strong><p>{project.ends_at&&project.ends_at!==project.starts_at?`〜 ${formatDate(project.ends_at)}`:""} / 締切 {formatDate(project.application_deadline,true)}</p></div>
                <div><BadgeJapaneseYen/><span>TERMS</span><strong>{compensation(project)}</strong><p>{project.expense_terms||"実費条件は案件詳細で確認"}</p></div>
                <div><Users/><span>ROLES</span><strong>{project.roles_needed}名程度</strong><p>対象：{join(project.target_age_groups)}</p></div>
              </div>
              <details>
                <summary>条件・役割を確認する</summary>
                <div className="homecourt-plan-grid">
                  <article className="homecourt-plan-card"><span>ROLE</span><h3>担当内容</h3><p>{join(project.responsibilities)}</p></article>
                  <article className="homecourt-plan-card"><span>EXPERIENCE</span><h3>経験</h3><p>{join(project.required_experience)}</p></article>
                  <article className="homecourt-plan-card"><span>CREDENTIALS / LANGUAGE</span><h3>資格・言語</h3><p>{join([...project.required_credentials,...project.required_languages])}</p></article>
                  <article className="homecourt-plan-card"><span>SAFETY / CANCELLATION</span><h3>安全・キャンセル</h3><p>{project.safeguarding_notes||"案件ごとに確認"}{project.cancellation_terms?` / ${project.cancellation_terms}`:""}</p></article>
                </div>
              </details>
              {application?<div className="dhub-next-card">
                <span>YOUR APPLICATION</span>
                <strong>{applicationStatusLabel[application.status]||application.status}</strong>
                <p>{application.proposed_role||"役割はRBAと調整"} / {formatDate(application.submitted_at,true)}</p>
                {["submitted","reviewing","shortlisted"].includes(application.status)?<form action={withdrawProjectApplication}><input type="hidden" name="project_id" value={project.id}/><button className="button button-light" type="submit">応募を辞退する</button></form>:null}
              </div>:canApply?<details className="dhub-next-card">
                <summary>この案件に応募する</summary>
                <form action={applyToProject} className="dhub-profile-form">
                  <input type="hidden" name="project_id" value={project.id}/>
                  <label>希望する役割<input name="proposed_role" maxLength={200} placeholder="例：オンコートアシスタント"/></label>
                  <label>応募理由・活かせる経験<textarea name="motivation" required maxLength={4000}/></label>
                  <label>日程・移動について<textarea name="availability_note" maxLength={2000} placeholder="参加可能時間、前泊可否、移動条件など"/></label>
                  <label>RBAへの補足<textarea name="member_note" maxLength={2000}/></label>
                  <button className="button button-member" type="submit">応募する <ArrowRight size={16}/></button>
                </form>
              </details>:<p>現在、この案件の新規応募受付は終了しています。</p>}
            </div>
          </section>
        })}</div>:<div className="dhub-next-card"><span>NO OPEN PROJECT</span><h3>現在、掲載中の案件はありません。</h3><p>案件を作るために募集を水増ししません。新しい依頼の条件が整い次第、BANDとこのページで共有します。</p></div>}
      </section>

      <section className="dhub-member-section dhub-member-dark section-pad">
        <div className="section-head"><div><p className="section-index inverse">HOW PROJECTS MOVE</p><h2>依頼 → 条件整理 → マッチング → 実施。</h2></div><p>「経験になるから無償で」といった曖昧な募集を標準にしません。</p></div>
        <div className="dhub-member-value">
          <div><Handshake/><span>01 / REQUEST</span><strong>依頼を整理</strong><p>目的、年代、場所、日程、役割、予算を確認。</p></div>
          <div><BadgeJapaneseYen/><span>02 / TERMS</span><strong>条件を提示</strong><p>報酬、実費、時間、キャンセル条件を確認。</p></div>
          <div><Users/><span>03 / MATCH</span><strong>適性で調整</strong><p>経験、専門性、地域、安全面から担当候補を検討。</p></div>
          <div><ShieldCheck/><span>04 / REVIEW</span><strong>実施と振り返り</strong><p>役割を明確にし、終了後も次の改善へ。</p></div>
        </div>
      </section>

      <section className="homecourt-plan-separation section-pad">
        <div className="homecourt-plan-intro"><p className="section-index">OPERATING RULES</p><h2>案件紹介をエサに、会費を売らない。</h2><p>D-HUB会費は仕事紹介料ではありません。案件数・収入・採用を保証せず、仕事のための追加課金も設けません。</p></div>
        <div className="homecourt-plan-grid">
          <article className="homecourt-plan-card"><span>NO GUARANTEE</span><h3>案件・収入を保証しない</h3><p>加入しているだけで仕事が発生する仕組みではありません。</p></article>
          <article className="homecourt-plan-card"><span>NO PAY-TO-WORK</span><h3>応募権を売らない</h3><p>案件応募や優先順位を、有料オプションとして販売しません。</p></article>
          <article className="homecourt-plan-card"><span>SAFEGUARDING</span><h3>子どもの安全を優先</h3><p>未成年に関わる役割は、必要な本人確認、経験、資格、安全方針を個別に確認します。</p></article>
          <article className="homecourt-plan-card"><span>TRANSPARENT TERMS</span><h3>条件を先に共有</h3><p>報酬・実費・時間・業務内容を担当決定前に確認します。</p></article>
        </div>
      </section>

      <section className="dhub-next-lesson section-pad">
        <div><p className="section-index">BRING A PROJECT</p><h2>メンバー側から案件を持ち込むこともできます。</h2><p>自チームで研修したい、地域でCampを開きたい、指導者講習を企画したい。現場で見つけたニーズをRBAと一緒に整理します。</p></div>
        <div className="dhub-next-card"><span>RBA / CONSULT</span><p>案件化できるか、誰が担当するか、予算・安全・役割を確認してから進めます。</p><a className="button button-dark" href={LINE_URL} target="_blank" rel="noreferrer"><MessageCircle size={16}/>案件をRBAに相談</a><Link className="text-link" href="/ja/work-with-rba">RBAの実施メニューを見る <ArrowRight size={16}/></Link></div>
      </section>
    </main>
  </SiteFrame>;
}
