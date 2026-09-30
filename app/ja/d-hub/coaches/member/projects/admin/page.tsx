import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";
import {
  closeProject,
  convertClientRequest,
  createProject,
  inviteProjectMember,
  markAssignmentReady,
  offerProjectAssignment,
  setAssignmentStatus,
  updateAssignmentSafety,
  updateClientRequestStatus,
  updateProject,
  updateProjectApplicationStatus,
  updateProjectFinancials,
} from "../actions";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:{absolute:"D-HUB PROJECT ADMIN | RBA"},robots:{index:false,follow:false}};

type Project={
  id:string;title:string;slug:string;status:string;category:string;visibility:string;region:string;venue:string|null;
  application_deadline:string|null;roles_needed:number;compensation_type:string;compensation_jpy_min:number|null;
  compensation_jpy_max:number|null;expense_terms:string;cancellation_terms:string;safeguarding_notes:string;
};
type Application={
  id:string;project_id:string;user_id:string;proposed_role:string;motivation:string;availability_note:string;
  member_note:string;admin_note:string;status:string;submitted_at:string;
};
type Financial={
  project_id:string;client_fee_jpy:number;member_compensation_jpy:number;travel_budget_jpy:number;
  other_direct_cost_jpy:number;payment_status:string;invoice_reference:string|null;internal_notes:string;
};
type Profile={
  user_id:string;display_name:string;base_region:string;specialties:string[];age_groups:string[];
  credentials:string[];languages:string[];travel_ok:boolean;open_to_projects:boolean;
};
type ClientRequest={
  id:string;organization_name:string;contact_name:string;email:string;phone:string;request_type:string;age_groups:string[];
  region_venue:string;preferred_schedule:string;participant_count:number|null;objective:string;roles_requested:string;
  budget_range:string;transport_support:string;accommodation_support:string;required_qualifications:string;
  safeguarding_notes:string;other_notes:string;status:string;converted_project_id:string|null;created_at:string;
};
type Assignment={
  id:string;project_id:string;application_id:string|null;user_id:string;role_title:string;scope_of_work:string;
  compensation_jpy:number;expense_terms:string;expected_hours:number|null;payment_due_at:string|null;
  cancellation_terms:string;terms_status:string;offered_at:string|null;accepted_at:string|null;ready_at:string|null;
};
type Safety={
  assignment_id:string;minors_involved:boolean;identity_verified:boolean;credentials_verified:boolean;
  supervision_confirmed:boolean;emergency_process_confirmed:boolean;media_policy_confirmed:boolean;
  transport_responsibility_confirmed:boolean;overnight_responsibility_confirmed:boolean;
  medical_escalation_confirmed:boolean;communication_boundaries_confirmed:boolean;notes:string;checked_at:string|null;
};
type MemberReport={
  assignment_id:string;actual_hours:number|null;delivery_summary:string;reflection:string;issues:string;next_step:string;submitted_at:string|null;
};
type Closeout={
  project_id:string;participant_count:number|null;client_confirmed:boolean;client_feedback:string;incident_count:number;
  safeguarding_incident:boolean;delivery_summary:string;next_opportunity:string;completed_at:string|null;
};
type Candidate={user_id:string;name:string};

const categoryLabel:Record<string,string>={on_court:"オンコート",team_support:"チーム支援",regional:"地域開催",international:"国際交流",performance:"S&C / PERFORMANCE",operations:"運営",other:"その他"};
const statusLabel:Record<string,string>={draft:"準備中",open:"募集中",matching:"選考・調整中",filled:"担当決定",completed:"完了",cancelled:"中止"};
const applicationStatus:Record<string,string>={submitted:"応募済み",reviewing:"確認中",shortlisted:"候補",selected:"担当決定",not_selected:"見送り",withdrawn:"辞退",completed:"完了"};
const requestStatus:Record<string,string>={new:"新規",reviewing:"確認中",qualified:"案件化候補",proposal:"提案中",converted:"案件化済み",declined:"見送り",archived:"保管"};
const assignmentStatus:Record<string,string>={draft:"下書き",offered:"条件提示中",accepted:"受諾済み",declined:"辞退",ready:"実施準備完了",active:"実施中",completed:"完了",cancelled:"中止"};
const formatDate=(v:string|null)=>v?new Intl.DateTimeFormat("ja-JP",{timeZone:"Asia/Tokyo",year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(v)):"—";
const jstDateTimeLocal=(v:string|null)=>{
  if(!v)return "";
  const parts=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Tokyo",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date(v));
  const get=(type:string)=>parts.find(part=>part.type===type)?.value||"";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
};
const safetyComplete=(s:Safety|undefined)=>{
  if(!s)return false;
  if(!s.minors_involved)return true;
  return s.identity_verified&&s.credentials_verified&&s.supervision_confirmed&&s.emergency_process_confirmed&&
    s.media_policy_confirmed&&s.transport_responsibility_confirmed&&s.overnight_responsibility_confirmed&&
    s.medical_escalation_confirmed&&s.communication_boundaries_confirmed;
};

export default async function Page(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember%2Fprojects%2Fadmin");
  const {data:isAdmin}=await supabase.rpc("is_dhub_project_admin");
  if(!isAdmin)redirect("/ja/d-hub/coaches/member/projects");

  const [
    {data:projectRows},{data:applicationRows},{data:profileRows},{data:financialRows},{data:requestRows},
    {data:assignmentRows},{data:safetyRows},{data:reportRows},{data:closeoutRows},{data:membershipRows},{data:personRows}
  ]=await Promise.all([
    supabase.from("dhub_projects").select("id,title,slug,status,category,visibility,region,venue,application_deadline,roles_needed,compensation_type,compensation_jpy_min,compensation_jpy_max,expense_terms,cancellation_terms,safeguarding_notes").order("created_at",{ascending:false}),
    supabase.from("dhub_project_applications").select("id,project_id,user_id,proposed_role,motivation,availability_note,member_note,admin_note,status,submitted_at").order("submitted_at",{ascending:false}),
    supabase.from("dhub_project_profiles").select("user_id,display_name,base_region,specialties,age_groups,credentials,languages,travel_ok,open_to_projects"),
    supabase.from("dhub_project_financials").select("project_id,client_fee_jpy,member_compensation_jpy,travel_budget_jpy,other_direct_cost_jpy,payment_status,invoice_reference,internal_notes"),
    supabase.from("dhub_client_requests").select("id,organization_name,contact_name,email,phone,request_type,age_groups,region_venue,preferred_schedule,participant_count,objective,roles_requested,budget_range,transport_support,accommodation_support,required_qualifications,safeguarding_notes,other_notes,status,converted_project_id,created_at").order("created_at",{ascending:false}).limit(100),
    supabase.from("dhub_project_assignments").select("id,project_id,application_id,user_id,role_title,scope_of_work,compensation_jpy,expense_terms,expected_hours,payment_due_at,cancellation_terms,terms_status,offered_at,accepted_at,ready_at").order("created_at",{ascending:false}),
    supabase.from("dhub_project_safety_checks").select("assignment_id,minors_involved,identity_verified,credentials_verified,supervision_confirmed,emergency_process_confirmed,media_policy_confirmed,transport_responsibility_confirmed,overnight_responsibility_confirmed,medical_escalation_confirmed,communication_boundaries_confirmed,notes,checked_at"),
    supabase.from("dhub_project_member_reports").select("assignment_id,actual_hours,delivery_summary,reflection,issues,next_step,submitted_at"),
    supabase.from("dhub_project_closeouts").select("project_id,participant_count,client_confirmed,client_feedback,incident_count,safeguarding_incident,delivery_summary,next_opportunity,completed_at"),
    supabase.from("dhub_memberships").select("linked_user_id,member_name,status,program_type").eq("program_type","coach_lab").in("status",["active","grace"]).not("linked_user_id","is",null),
    supabase.from("profiles").select("id,display_name").in("role",["coach","admin"]),
  ]);

  const projects=(projectRows||[]) as Project[];
  const applications=(applicationRows||[]) as Application[];
  const profiles=(profileRows||[]) as Profile[];
  const financials=(financialRows||[]) as Financial[];
  const requests=(requestRows||[]) as ClientRequest[];
  const assignments=(assignmentRows||[]) as Assignment[];
  const safeties=(safetyRows||[]) as Safety[];
  const reports=(reportRows||[]) as MemberReport[];
  const closeouts=(closeoutRows||[]) as Closeout[];

  const projectById=new Map(projects.map(p=>[p.id,p]));
  const profileById=new Map(profiles.map(p=>[p.user_id,p]));
  const financialByProject=new Map(financials.map(item=>[item.project_id,item]));
  const safetyByAssignment=new Map(safeties.map(item=>[item.assignment_id,item]));
  const reportByAssignment=new Map(reports.map(item=>[item.assignment_id,item]));
  const closeoutByProject=new Map(closeouts.map(item=>[item.project_id,item]));
  const personName=new Map((personRows||[]).map((item:{id:string;display_name:string|null})=>[item.id,item.display_name||""]));
  const candidates:Candidate[]=Array.from(new Map((membershipRows||[]).map((item:{linked_user_id:string;member_name:string|null})=>[
    item.linked_user_id,{user_id:item.linked_user_id,name:profileById.get(item.linked_user_id)?.display_name||personName.get(item.linked_user_id)||item.member_name||"D-HUB MEMBER"}
  ])).values());

  const totalClientFees=financials.reduce((sum,item)=>sum+item.client_fee_jpy,0);
  const totalDirectCosts=financials.reduce((sum,item)=>sum+item.member_compensation_jpy+item.travel_budget_jpy+item.other_direct_cost_jpy,0);
  const totalGrossMargin=totalClientFees-totalDirectCosts;
  const unresolvedRequests=requests.filter(r=>!["converted","declined","archived"].includes(r.status)).length;
  const unresolvedAssignments=assignments.filter(a=>["offered","accepted","ready","active"].includes(a.terms_status)).length;

  return <SiteFrame locale="ja" languagePage="d-hub"><main className="dhub-member-page">
    <section className="dhub-member-hero section-pad">
      <BriefcaseBusiness size={42}/>
      <p className="section-index">D-HUB PROJECTS / ADMIN</p>
      <h1>依頼から精算・実績まで、<br/>一つの案件として管理する。</h1>
      <p>依頼をそのまま人へ流しません。要件整理、報酬、安全確認、担当条件の同意、実施レポート、収支、完了記録までを一つのワークフローで管理します。</p>
      <Link className="button button-light" href="/ja/d-hub/coaches/member/projects"><ArrowLeft size={16}/> PROJECT BOARDへ戻る</Link>
    </section>

    <section className="dhub-progress-strip section-pad">
      <div><span>NEW REQUESTS</span><strong>{unresolvedRequests}</strong><small>要対応の案件相談</small></div>
      <div><span>OPEN PROJECTS</span><strong>{projects.filter(p=>p.status==="open").length}</strong><small>メンバー募集中</small></div>
      <div><span>ACTIVE ASSIGNMENTS</span><strong>{unresolvedAssignments}</strong><small>条件提示〜実施中</small></div>
      <div className="dhub-progress-next"><span>GROSS MARGIN</span><strong>¥{totalGrossMargin.toLocaleString()}</strong><small>管理前粗利</small></div>
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">CLIENT REQUEST PIPELINE</p><h2>依頼フォームから案件化する。</h2></div><p>Jotformから受け取った依頼を確認し、実施可能性・予算・安全条件を整理してからDRAFT案件へ変換します。フォーム送信＝受注ではありません。</p></div>
      {requests.length?<div className="dhub-curriculum-groups">{requests.map(request=><section key={request.id}>
        <header><span>{requestStatus[request.status]||request.status} / {categoryLabel[request.request_type]||request.request_type}</span><h3>{request.organization_name||"組織名未取得"}</h3></header>
        <div>
          <p><strong>担当：</strong>{request.contact_name||"—"} / {request.email||"—"} / {request.phone||"—"}</p>
          <p><strong>地域・日時：</strong>{request.region_venue||"—"} / {request.preferred_schedule||"—"}</p>
          <p><strong>対象：</strong>{request.age_groups.join(" / ")||"—"} / {request.participant_count??"人数未定"}名</p>
          <p><strong>目的・必要役割：</strong>{request.objective||request.roles_requested||"—"}</p>
          <p><strong>予算：</strong>{request.budget_range||"未定"} / 交通 {request.transport_support||"—"} / 宿泊 {request.accommodation_support||"—"}</p>
          <p><strong>資格・安全：</strong>{request.required_qualifications||"指定なし"} / {request.safeguarding_notes||"特記事項なし"}</p>
          {request.other_notes?<p><strong>補足：</strong>{request.other_notes}</p>:null}
          <div className="dhub-member-actions">
            <form action={updateClientRequestStatus}>
              <input type="hidden" name="request_id" value={request.id}/>
              <select name="status" defaultValue={request.status}><option value="new">NEW</option><option value="reviewing">REVIEWING</option><option value="qualified">QUALIFIED</option><option value="proposal">PROPOSAL</option><option value="converted">CONVERTED</option><option value="declined">DECLINED</option><option value="archived">ARCHIVED</option></select>
              <button className="button button-light" type="submit">状態を更新</button>
            </form>
          </div>
          {!request.converted_project_id?<details className="dhub-next-card">
            <summary>この依頼からDRAFT案件を作る</summary>
            <form action={convertClientRequest} className="dhub-profile-form">
              <input type="hidden" name="request_id" value={request.id}/>
              <label>案件名<input name="title" required maxLength={160} defaultValue={request.organization_name?`${request.organization_name}｜D-HUB PROJECT`:"D-HUB PROJECT"}/></label>
              <label>slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="sendai-team-support-2026"/></label>
              <button className="button button-member" type="submit">DRAFT案件へ変換 <ArrowRight size={16}/></button>
            </form>
          </details>:<p><CheckCircle2 size={16}/> 案件化済み：{projectById.get(request.converted_project_id)?.title||request.converted_project_id}</p>}
        </div>
      </section>)}</div>:<div className="dhub-next-card"><span>NO REQUESTS</span><strong>まだ案件相談はありません。</strong><p>依頼フォームから新しい相談が届くとここへ自動で入る設計です。</p></div>}
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">CREATE PROJECT</p><h2>RBAから直接案件を作る。</h2></div><p>依頼フォームを経由しない既存取引・RBA主催企画も、最初はDRAFTで条件を揃えます。</p></div>
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

    <section className="dhub-progress-strip section-pad">
      <div><span>CLIENT FEES</span><strong>¥{totalClientFees.toLocaleString()}</strong><small>登録済み案件売上</small></div>
      <div><span>DIRECT COSTS</span><strong>¥{totalDirectCosts.toLocaleString()}</strong><small>報酬・交通・直接費</small></div>
      <div><span>GROSS MARGIN</span><strong>¥{totalGrossMargin.toLocaleString()}</strong><small>管理前粗利</small></div>
      <div className="dhub-progress-next"><span>PAID</span><strong>{financials.filter(item=>item.payment_status==="paid").length}</strong><small>入金済み案件</small></div>
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">PROJECTS</p><h2>{projects.length}件の案件。</h2></div><p>クライアント売上とメンバー報酬は別管理し、内部粗利はメンバー側に表示しません。</p></div>
      <div className="dhub-curriculum-groups">{projects.map(project=>{
        const financial=financialByProject.get(project.id);
        const directCosts=(financial?.member_compensation_jpy||0)+(financial?.travel_budget_jpy||0)+(financial?.other_direct_cost_jpy||0);
        const gross=(financial?.client_fee_jpy||0)-directCosts;
        const closeout=closeoutByProject.get(project.id);
        return <section key={project.id}><header><span>{categoryLabel[project.category]||project.category} / {statusLabel[project.status]||project.status} / {project.visibility.toUpperCase()}</span><h3>{project.title}</h3></header><div>
          <p>{project.region||"地域未定"} / 募集 {project.roles_needed}名 / 締切 {formatDate(project.application_deadline)} / 応募 {applications.filter(a=>a.project_id===project.id).length}件</p>
          <form action={updateProject} className="dhub-profile-form">
            <input type="hidden" name="project_id" value={project.id}/>
            <label>状態<select name="status" defaultValue={project.status}><option value="draft">DRAFT</option><option value="open">OPEN</option><option value="matching">MATCHING</option><option value="filled">FILLED</option><option value="completed">COMPLETED</option><option value="cancelled">CANCELLED</option></select></label>
            <label>地域<input name="region" defaultValue={project.region}/></label>
            <label>会場<input name="venue" defaultValue={project.venue||""}/></label>
            <label>応募締切<input name="application_deadline" type="datetime-local" defaultValue={jstDateTimeLocal(project.application_deadline)}/></label>
            <label>募集人数<input name="roles_needed" type="number" min="1" max="100" defaultValue={project.roles_needed}/></label>
            <label>報酬種別<select name="compensation_type" defaultValue={project.compensation_type}><option value="paid">有償</option><option value="expenses_only">実費支給のみ</option><option value="volunteer">無償協力</option></select></label>
            <label>報酬下限（円）<input name="compensation_jpy_min" type="number" min="0" defaultValue={project.compensation_jpy_min??""}/></label>
            <label>報酬上限（円）<input name="compensation_jpy_max" type="number" min="0" defaultValue={project.compensation_jpy_max??""}/></label>
            <label>交通・宿泊等<textarea name="expense_terms" defaultValue={project.expense_terms}/></label>
            <label>キャンセル条件<textarea name="cancellation_terms" defaultValue={project.cancellation_terms}/></label>
            <label>安全・未成年対応<textarea name="safeguarding_notes" defaultValue={project.safeguarding_notes}/></label>
            <button className="button button-dark" type="submit">案件条件を更新</button>
          </form>

          {project.visibility==="direct"?<details className="dhub-next-card">
            <summary>メンバーへ個別相談を送る</summary>
            <form action={inviteProjectMember} className="dhub-profile-form">
              <input type="hidden" name="project_id" value={project.id}/>
              <label>メンバー<select name="user_id" required defaultValue=""><option value="" disabled>選択してください</option>{candidates.map(candidate=><option key={candidate.user_id} value={candidate.user_id}>{candidate.name}</option>)}</select></label>
              <label>相談する役割<input name="role_title" required/></label>
              <label>メッセージ<textarea name="message" maxLength={2000}/></label>
              <label>回答期限<input name="expires_at" type="datetime-local"/></label>
              <button className="button button-member" type="submit">個別相談を送る</button>
            </form>
          </details>:null}

          <div className="dhub-next-card">
            <span>PROJECT ECONOMICS / ADMIN ONLY</span>
            <strong>売上 ¥{(financial?.client_fee_jpy||0).toLocaleString()} / 直接費 ¥{directCosts.toLocaleString()} / 粗利 ¥{gross.toLocaleString()}</strong>
            <form action={updateProjectFinancials} className="dhub-profile-form">
              <input type="hidden" name="project_id" value={project.id}/>
              <label>クライアント請求額（円）<input name="client_fee_jpy" type="number" min="0" defaultValue={financial?.client_fee_jpy||0}/></label>
              <label>メンバー報酬予算（円）<input name="member_compensation_jpy" type="number" min="0" defaultValue={financial?.member_compensation_jpy||0}/></label>
              <label>交通・宿泊予算（円）<input name="travel_budget_jpy" type="number" min="0" defaultValue={financial?.travel_budget_jpy||0}/></label>
              <label>その他直接費（円）<input name="other_direct_cost_jpy" type="number" min="0" defaultValue={financial?.other_direct_cost_jpy||0}/></label>
              <label>入金状態<select name="payment_status" defaultValue={financial?.payment_status||"unbilled"}><option value="unbilled">未請求</option><option value="invoiced">請求済み</option><option value="partially_paid">一部入金</option><option value="paid">入金済み</option><option value="refunded">返金済み</option><option value="cancelled">キャンセル</option></select></label>
              <label>請求・決済参照<input name="invoice_reference" defaultValue={financial?.invoice_reference||""}/></label>
              <label>内部収支メモ<textarea name="internal_notes" defaultValue={financial?.internal_notes||""}/></label>
              <button className="button button-member" type="submit">収支を更新</button>
            </form>
          </div>

          {closeout?<div className="dhub-next-card"><span>CLOSEOUT</span><strong>{formatDate(closeout.completed_at)}</strong><p>参加 {closeout.participant_count??"—"}名 / インシデント {closeout.incident_count}件 / クライアント確認 {closeout.client_confirmed?"済":"未"}</p><p>{closeout.delivery_summary}</p></div>:project.status!=="cancelled"?<details className="dhub-next-card">
            <summary>案件を完了・実績化する</summary>
            <form action={closeProject} className="dhub-profile-form">
              <input type="hidden" name="project_id" value={project.id}/>
              <label>実参加人数<input name="participant_count" type="number" min="0"/></label>
              <label><input type="checkbox" name="client_confirmed"/> クライアントへ実施内容を確認済み</label>
              <label>クライアントフィードバック<textarea name="client_feedback"/></label>
              <label>インシデント件数<input name="incident_count" type="number" min="0" defaultValue="0"/></label>
              <label><input type="checkbox" name="safeguarding_incident"/> Safeguarding上のインシデントあり</label>
              <label>実施概要<textarea name="delivery_summary" required/></label>
              <label>次の提案・継続機会<textarea name="next_opportunity"/></label>
              <button className="button button-dark" type="submit">案件をCLOSEする</button>
            </form>
          </details>:null}
        </div></section>;
      })}</div>
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">APPLICATIONS</p><h2>応募者を条件と実績で確認。</h2></div><p>年齢・性別など不要な属性で順位付けせず、案件に必要な経験・資格・地域・日程と役割適合を確認します。</p></div>
      {applications.length?<div className="dhub-curriculum-groups">{applications.map(application=>{
        const project=projectById.get(application.project_id);
        const profile=profileById.get(application.user_id);
        return <section key={application.id}><header><span>{applicationStatus[application.status]||application.status}</span><h3>{profile?.display_name||personName.get(application.user_id)||"D-HUB MEMBER"} → {project?.title||"PROJECT"}</h3></header><div>
          <p><strong>希望役割：</strong>{application.proposed_role||"未記入"}</p>
          <p><strong>応募理由：</strong>{application.motivation}</p>
          <p><strong>日程・移動：</strong>{application.availability_note||"記載なし"}</p>
          <p><strong>補足：</strong>{application.member_note||"記載なし"}</p>
          <p><strong>プロフィール：</strong>{profile?.base_region||"拠点未登録"} / 得意 {profile?.specialties?.join("・")||"未登録"} / 年代 {profile?.age_groups?.join("・")||"未登録"} / 言語 {profile?.languages?.join("・")||"未登録"}</p>
          <form action={updateProjectApplicationStatus} className="dhub-profile-form">
            <input type="hidden" name="application_id" value={application.id}/>
            <label>選考状態<select name="status" defaultValue={application.status}><option value="submitted">応募済み</option><option value="reviewing">確認中</option><option value="shortlisted">候補</option><option value="selected">担当決定</option><option value="not_selected">見送り</option><option value="withdrawn">辞退</option><option value="completed">完了</option></select></label>
            <label>内部メモ<textarea name="admin_note" defaultValue={application.admin_note}/></label>
            <button className="button button-light" type="submit">選考状態を更新</button>
          </form>
          {project&&["shortlisted","selected"].includes(application.status)?<details className="dhub-next-card">
            <summary>正式な担当条件を提示する</summary>
            <form action={offerProjectAssignment} className="dhub-profile-form">
              <input type="hidden" name="project_id" value={project.id}/>
              <input type="hidden" name="user_id" value={application.user_id}/>
              <input type="hidden" name="application_id" value={application.id}/>
              <label>役割<input name="role_title" required defaultValue={application.proposed_role}/></label>
              <label>業務範囲<textarea name="scope_of_work" required placeholder="事前MTG、オンコート、終了後レビュー等"/></label>
              <label>本人への報酬（円）<input name="compensation_jpy" type="number" min="0" required/></label>
              <label>実費条件<textarea name="expense_terms" defaultValue={project.expense_terms}/></label>
              <label>予定拘束時間<input name="expected_hours" type="number" min="0" step="0.25"/></label>
              <label>支払予定日<input name="payment_due_at" type="datetime-local"/></label>
              <label>キャンセル条件<textarea name="cancellation_terms" defaultValue={project.cancellation_terms}/></label>
              <button className="button button-member" type="submit">担当条件を提示する</button>
            </form>
          </details>:null}
        </div></section>;
      })}</div>:<div className="dhub-next-card"><Users/><strong>まだ応募はありません。</strong><p>公開中案件への応募が入ると、管理者通知とここに表示されます。</p></div>}
    </section>

    <section className="dhub-member-section section-pad">
      <div className="section-head"><div><p className="section-index">ASSIGNMENTS / SAFETY</p><h2>条件同意と安全確認を通してから現場へ。</h2></div><p>SELECTEDだけでは実施可能にしません。本人の条件受諾と必要なSafeguarding確認が揃ったときだけREADYにします。</p></div>
      {assignments.length?<div className="dhub-curriculum-groups">{assignments.map(assignment=>{
        const project=projectById.get(assignment.project_id);
        const profile=profileById.get(assignment.user_id);
        const safety=safetyByAssignment.get(assignment.id);
        const report=reportByAssignment.get(assignment.id);
        const safe=safetyComplete(safety);
        return <section key={assignment.id}><header><span>{assignmentStatus[assignment.terms_status]||assignment.terms_status}</span><h3>{profile?.display_name||personName.get(assignment.user_id)||"D-HUB MEMBER"}｜{project?.title||"PROJECT"}</h3></header><div>
          <p><strong>役割：</strong>{assignment.role_title}</p>
          <p><strong>報酬：</strong>¥{assignment.compensation_jpy.toLocaleString()} / <strong>予定：</strong>{assignment.expected_hours??"—"}h / <strong>支払：</strong>{formatDate(assignment.payment_due_at)}</p>
          <p><strong>業務範囲：</strong>{assignment.scope_of_work}</p>
          <p><strong>実費：</strong>{assignment.expense_terms||"—"} / <strong>キャンセル：</strong>{assignment.cancellation_terms||"—"}</p>

          <div className="dhub-next-card">
            <ShieldCheck size={20}/><span>SAFEGUARDING GATE</span><strong>{safe?"CHECK COMPLETE":"CHECK REQUIRED"}</strong>
            <form action={updateAssignmentSafety} className="dhub-profile-form">
              <input type="hidden" name="assignment_id" value={assignment.id}/>
              <label><input type="checkbox" name="minors_involved" defaultChecked={safety?.minors_involved??true}/> 未成年が関わる案件</label>
              <label><input type="checkbox" name="identity_verified" defaultChecked={safety?.identity_verified||false}/> 本人確認</label>
              <label><input type="checkbox" name="credentials_verified" defaultChecked={safety?.credentials_verified||false}/> 必要資格・経験確認</label>
              <label><input type="checkbox" name="supervision_confirmed" defaultChecked={safety?.supervision_confirmed||false}/> 監督責任を確認</label>
              <label><input type="checkbox" name="emergency_process_confirmed" defaultChecked={safety?.emergency_process_confirmed||false}/> 緊急連絡経路</label>
              <label><input type="checkbox" name="media_policy_confirmed" defaultChecked={safety?.media_policy_confirmed||false}/> 写真・動画方針</label>
              <label><input type="checkbox" name="transport_responsibility_confirmed" defaultChecked={safety?.transport_responsibility_confirmed||false}/> 移動責任</label>
              <label><input type="checkbox" name="overnight_responsibility_confirmed" defaultChecked={safety?.overnight_responsibility_confirmed||false}/> 宿泊責任</label>
              <label><input type="checkbox" name="medical_escalation_confirmed" defaultChecked={safety?.medical_escalation_confirmed||false}/> 医療・怪我のエスカレーション</label>
              <label><input type="checkbox" name="communication_boundaries_confirmed" defaultChecked={safety?.communication_boundaries_confirmed||false}/> 成人・未成年の連絡境界</label>
              <label>安全管理メモ<textarea name="notes" defaultValue={safety?.notes||""}/></label>
              <button className="button button-light" type="submit">安全確認を保存</button>
            </form>
          </div>

          {assignment.terms_status==="accepted"?<form action={markAssignmentReady}>
            <input type="hidden" name="assignment_id" value={assignment.id}/>
            <button className="button button-member" type="submit" disabled={!safe}>READYにする</button>
          </form>:null}
          {assignment.terms_status==="ready"?<form action={setAssignmentStatus}>
            <input type="hidden" name="assignment_id" value={assignment.id}/><input type="hidden" name="status" value="active"/>
            <button className="button button-member" type="submit">実施開始 / ACTIVE</button>
          </form>:null}
          {["ready","active"].includes(assignment.terms_status)?<form action={setAssignmentStatus}>
            <input type="hidden" name="assignment_id" value={assignment.id}/><input type="hidden" name="status" value="completed"/>
            <button className="button button-dark" type="submit" disabled={!report?.submitted_at}>レポート確認後 COMPLETED</button>
          </form>:null}
          {["offered","accepted","ready","active"].includes(assignment.terms_status)?<form action={setAssignmentStatus}>
            <input type="hidden" name="assignment_id" value={assignment.id}/><input type="hidden" name="status" value="cancelled"/>
            <button className="button button-light" type="submit">担当をキャンセル</button>
          </form>:null}

          {report?<div className="dhub-next-card"><span>MEMBER REPORT</span><strong>提出 {formatDate(report.submitted_at)}</strong><p><strong>実働：</strong>{report.actual_hours??"—"}h</p><p><strong>実施：</strong>{report.delivery_summary||"—"}</p><p><strong>振り返り：</strong>{report.reflection||"—"}</p><p><strong>問題：</strong>{report.issues||"なし"}</p><p><strong>次：</strong>{report.next_step||"—"}</p></div>:null}
        </div></section>;
      })}</div>:<div className="dhub-next-card"><span>NO ASSIGNMENTS</span><strong>まだ正式な担当条件はありません。</strong><p>候補者へAssignment Termsを提示するとここで安全確認まで管理できます。</p></div>}
    </section>
  </main></SiteFrame>;
}
