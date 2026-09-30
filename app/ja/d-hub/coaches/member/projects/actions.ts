"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const cleanList=(value:FormDataEntryValue|null,max=20)=>
  String(value||"").split(/[\n,、]/).map(v=>v.trim()).filter(Boolean).slice(0,max);

const profileSchema=z.object({
  display_name:z.string().trim().min(1).max(80),
  base_region:z.string().trim().max(120),
  bio:z.string().trim().max(1200),
  portfolio_url:z.union([z.literal(""),z.string().url().max(500)]),
  travel_ok:z.boolean(),
  open_to_projects:z.boolean(),
});

export async function saveProjectProfile(formData:FormData){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember%2Fprojects");
  const {data:hasAccess}=await supabase.rpc("has_dhub_coach_access");
  if(!hasAccess)throw new Error("D-HUB COACH LAB access required");

  const parsed=profileSchema.parse({
    display_name:String(formData.get("display_name")||""),
    base_region:String(formData.get("base_region")||""),
    bio:String(formData.get("bio")||""),
    portfolio_url:String(formData.get("portfolio_url")||""),
    travel_ok:formData.get("travel_ok")==="on",
    open_to_projects:formData.get("open_to_projects")==="on",
  });

  const {error}=await supabase.from("dhub_project_profiles").upsert({
    user_id:user.id,
    ...parsed,
    portfolio_url:parsed.portfolio_url||null,
    specialties:cleanList(formData.get("specialties")),
    age_groups:cleanList(formData.get("age_groups")),
    credentials:cleanList(formData.get("credentials")),
    languages:cleanList(formData.get("languages")),
    updated_at:new Date().toISOString(),
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
}

export async function applyToProject(formData:FormData){
  const projectId=String(formData.get("project_id")||"");
  const proposedRole=String(formData.get("proposed_role")||"").trim().slice(0,200);
  const motivation=String(formData.get("motivation")||"").trim().slice(0,4000);
  const availability=String(formData.get("availability_note")||"").trim().slice(0,2000);
  const memberNote=String(formData.get("member_note")||"").trim().slice(0,2000);
  if(!z.string().uuid().safeParse(projectId).success)throw new Error("Invalid project");
  if(!motivation)throw new Error("応募理由を入力してください");

  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_apply_to_project",{
    p_project_id:projectId,
    p_proposed_role:proposedRole,
    p_motivation:motivation,
    p_availability_note:availability,
    p_member_note:memberNote,
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
}

export async function withdrawProjectApplication(formData:FormData){
  const projectId=String(formData.get("project_id")||"");
  if(!z.string().uuid().safeParse(projectId).success)throw new Error("Invalid project");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_withdraw_project_application",{p_project_id:projectId});
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
}

const projectSchema=z.object({
  title:z.string().trim().min(3).max(160),
  slug:z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  summary:z.string().trim().min(10).max(1500),
  category:z.enum(["on_court","team_support","regional","international","performance","operations","other"]),
  status:z.enum(["draft","open","matching","filled","completed","cancelled"]),
  visibility:z.enum(["members","direct"]),
  region:z.string().trim().max(120),
  venue:z.string().trim().max(200),
  compensation_type:z.enum(["paid","expenses_only","volunteer"]),
  compensation_jpy_min:z.number().int().min(0).nullable(),
  compensation_jpy_max:z.number().int().min(0).nullable(),
  expense_terms:z.string().trim().max(1500),
  cancellation_terms:z.string().trim().max(1500),
  safeguarding_notes:z.string().trim().max(2000),
  contact_notes:z.string().trim().max(2000),
  roles_needed:z.number().int().min(1).max(100),
});

const toIso=(value:string)=>{
  if(!value)return null;
  const normalized=/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(value)?`${value}+09:00`:value;
  const d=new Date(normalized);
  return Number.isNaN(d.getTime())?null:d.toISOString();
};
const toMoney=(value:FormDataEntryValue|null)=>{
  const s=String(value||"").trim();
  if(!s)return null;
  const n=Number(s);
  return Number.isFinite(n)?Math.round(n):null;
};

export async function createProject(formData:FormData){
  const supabase=await createClient();
  const [{data:isAdmin},{data:{user}}]=await Promise.all([
    supabase.rpc("is_dhub_project_admin"),
    supabase.auth.getUser(),
  ]);
  if(!isAdmin||!user)throw new Error("Admin access required");

  const parsed=projectSchema.parse({
    title:String(formData.get("title")||""),
    slug:String(formData.get("slug")||""),
    summary:String(formData.get("summary")||""),
    category:String(formData.get("category")||"other"),
    status:String(formData.get("status")||"draft"),
    visibility:String(formData.get("visibility")||"members"),
    region:String(formData.get("region")||""),
    venue:String(formData.get("venue")||""),
    compensation_type:String(formData.get("compensation_type")||"paid"),
    compensation_jpy_min:toMoney(formData.get("compensation_jpy_min")),
    compensation_jpy_max:toMoney(formData.get("compensation_jpy_max")),
    expense_terms:String(formData.get("expense_terms")||""),
    cancellation_terms:String(formData.get("cancellation_terms")||""),
    safeguarding_notes:String(formData.get("safeguarding_notes")||""),
    contact_notes:String(formData.get("contact_notes")||""),
    roles_needed:Number(formData.get("roles_needed")||1),
  });

  if(parsed.compensation_jpy_min!==null&&parsed.compensation_jpy_max!==null&&parsed.compensation_jpy_max<parsed.compensation_jpy_min){
    throw new Error("報酬上限は下限以上にしてください");
  }

  const {error}=await supabase.from("dhub_projects").insert({
    ...parsed,
    venue:parsed.venue||null,
    target_age_groups:cleanList(formData.get("target_age_groups")),
    required_experience:cleanList(formData.get("required_experience")),
    required_credentials:cleanList(formData.get("required_credentials")),
    required_languages:cleanList(formData.get("required_languages")),
    responsibilities:cleanList(formData.get("responsibilities")),
    starts_at:toIso(String(formData.get("starts_at")||"")),
    ends_at:toIso(String(formData.get("ends_at")||"")),
    application_deadline:toIso(String(formData.get("application_deadline")||"")),
    published_at:parsed.status==="open"?new Date().toISOString():null,
    created_by:user.id,
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}

export async function updateProjectApplicationStatus(formData:FormData){
  const id=String(formData.get("application_id")||"");
  const status=String(formData.get("status")||"");
  const adminNote=String(formData.get("admin_note")||"").trim().slice(0,4000);
  if(!z.string().uuid().safeParse(id).success)throw new Error("Invalid application");
  if(!["submitted","reviewing","shortlisted","selected","not_selected","withdrawn","completed"].includes(status))throw new Error("Invalid status");

  const supabase=await createClient();
  const {data:isAdmin}=await supabase.rpc("is_dhub_project_admin");
  if(!isAdmin)throw new Error("Admin access required");
  const {error}=await supabase.rpc("dhub_admin_update_application_status",{
    p_application_id:id,
    p_status:status,
    p_admin_note:adminNote,
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}


export async function updateProject(formData:FormData){
  const id=String(formData.get("project_id")||"");
  if(!z.string().uuid().safeParse(id).success)throw new Error("Invalid project");

  const supabase=await createClient();
  const {data:isAdmin}=await supabase.rpc("is_dhub_project_admin");
  if(!isAdmin)throw new Error("Admin access required");

  const status=String(formData.get("status")||"draft");
  const rolesNeeded=Number(formData.get("roles_needed")||1);
  const compensationMin=toMoney(formData.get("compensation_jpy_min"));
  const compensationMax=toMoney(formData.get("compensation_jpy_max"));
  if(!["draft","open","matching","filled","completed","cancelled"].includes(status))throw new Error("Invalid status");
  if(!Number.isInteger(rolesNeeded)||rolesNeeded<1||rolesNeeded>100)throw new Error("募集人数を確認してください");
  if(compensationMin!==null&&compensationMax!==null&&compensationMax<compensationMin)throw new Error("報酬上限は下限以上にしてください");

  const {data:before,error:beforeError}=await supabase.from("dhub_projects").select("status").eq("id",id).single();
  if(beforeError)throw new Error(beforeError.message);

  const {error}=await supabase.from("dhub_projects").update({
    status,
    region:String(formData.get("region")||"").trim().slice(0,120),
    venue:String(formData.get("venue")||"").trim().slice(0,200)||null,
    application_deadline:toIso(String(formData.get("application_deadline")||"")),
    roles_needed:rolesNeeded,
    compensation_type:String(formData.get("compensation_type")||"paid"),
    compensation_jpy_min:compensationMin,
    compensation_jpy_max:compensationMax,
    expense_terms:String(formData.get("expense_terms")||"").trim().slice(0,1500),
    cancellation_terms:String(formData.get("cancellation_terms")||"").trim().slice(0,1500),
    safeguarding_notes:String(formData.get("safeguarding_notes")||"").trim().slice(0,2000),
    published_at:status==="open"&&before?.status!=="open"?new Date().toISOString():undefined,
    updated_at:new Date().toISOString(),
  }).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}


export async function updateProjectFinancials(formData:FormData){
  const projectId=String(formData.get("project_id")||"");
  if(!z.string().uuid().safeParse(projectId).success)throw new Error("Invalid project");

  const supabase=await createClient();
  const {data:isAdmin}=await supabase.rpc("is_dhub_project_admin");
  if(!isAdmin)throw new Error("Admin access required");

  const paymentStatus=String(formData.get("payment_status")||"unbilled");
  if(!["unbilled","invoiced","partially_paid","paid","refunded","cancelled"].includes(paymentStatus))throw new Error("Invalid payment status");

  const payload={
    project_id:projectId,
    client_fee_jpy:toMoney(formData.get("client_fee_jpy"))??0,
    member_compensation_jpy:toMoney(formData.get("member_compensation_jpy"))??0,
    travel_budget_jpy:toMoney(formData.get("travel_budget_jpy"))??0,
    other_direct_cost_jpy:toMoney(formData.get("other_direct_cost_jpy"))??0,
    payment_status:paymentStatus,
    invoice_reference:String(formData.get("invoice_reference")||"").trim().slice(0,300)||null,
    internal_notes:String(formData.get("internal_notes")||"").trim().slice(0,4000),
    updated_at:new Date().toISOString(),
  };

  const {error}=await supabase.from("dhub_project_financials").upsert(payload);
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}


export async function updateClientRequestStatus(formData:FormData){
  const id=String(formData.get("request_id")||"");
  const status=String(formData.get("status")||"new");
  if(!z.string().uuid().safeParse(id).success)throw new Error("Invalid request");
  if(!["new","reviewing","qualified","proposal","converted","declined","archived"].includes(status))throw new Error("Invalid request status");
  const supabase=await createClient();
  const {data:isAdmin}=await supabase.rpc("is_dhub_project_admin");
  if(!isAdmin)throw new Error("Admin access required");
  const {error}=await supabase.from("dhub_client_requests").update({status,updated_at:new Date().toISOString()}).eq("id",id);
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}

export async function convertClientRequest(formData:FormData){
  const requestId=String(formData.get("request_id")||"");
  const slug=String(formData.get("slug")||"").trim();
  const title=String(formData.get("title")||"").trim();
  if(!z.string().uuid().safeParse(requestId).success)throw new Error("Invalid request");
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))throw new Error("slugを確認してください");
  if(title.length<3||title.length>160)throw new Error("案件名を確認してください");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_admin_convert_client_request",{p_request_id:requestId,p_slug:slug,p_title:title});
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}

export async function inviteProjectMember(formData:FormData){
  const projectId=String(formData.get("project_id")||"");
  const userId=String(formData.get("user_id")||"");
  const roleTitle=String(formData.get("role_title")||"").trim().slice(0,200);
  const message=String(formData.get("message")||"").trim().slice(0,2000);
  const expiresAt=toIso(String(formData.get("expires_at")||""));
  if(!z.string().uuid().safeParse(projectId).success||!z.string().uuid().safeParse(userId).success)throw new Error("Invalid project/member");
  if(!roleTitle)throw new Error("役割を入力してください");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_admin_invite_member",{p_project_id:projectId,p_user_id:userId,p_role_title:roleTitle,p_message:message,p_expires_at:expiresAt});
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}

export async function respondProjectInvite(formData:FormData){
  const inviteId=String(formData.get("invite_id")||"");
  const response=String(formData.get("response")||"");
  if(!z.string().uuid().safeParse(inviteId).success)throw new Error("Invalid invite");
  if(!["accepted","declined"].includes(response))throw new Error("Invalid response");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_respond_project_invite",{p_invite_id:inviteId,p_response:response});
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
}

export async function offerProjectAssignment(formData:FormData){
  const projectId=String(formData.get("project_id")||"");
  const userId=String(formData.get("user_id")||"");
  const applicationId=String(formData.get("application_id")||"");
  const roleTitle=String(formData.get("role_title")||"").trim().slice(0,200);
  const scope=String(formData.get("scope_of_work")||"").trim().slice(0,5000);
  const compensation=toMoney(formData.get("compensation_jpy"))??0;
  const expenseTerms=String(formData.get("expense_terms")||"").trim().slice(0,2000);
  const expectedHoursRaw=String(formData.get("expected_hours")||"").trim();
  const expectedHours=expectedHoursRaw?Number(expectedHoursRaw):null;
  const paymentDueAt=toIso(String(formData.get("payment_due_at")||""));
  const cancellationTerms=String(formData.get("cancellation_terms")||"").trim().slice(0,2000);
  if(!z.string().uuid().safeParse(projectId).success||!z.string().uuid().safeParse(userId).success)throw new Error("Invalid assignment");
  if(applicationId&&!z.string().uuid().safeParse(applicationId).success)throw new Error("Invalid application");
  if(!roleTitle||!scope)throw new Error("役割と業務範囲を入力してください");
  if(expectedHours!==null&&(!Number.isFinite(expectedHours)||expectedHours<0))throw new Error("予定時間を確認してください");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_admin_offer_assignment",{
    p_project_id:projectId,p_user_id:userId,p_application_id:applicationId||null,p_role_title:roleTitle,
    p_scope_of_work:scope,p_compensation_jpy:compensation,p_expense_terms:expenseTerms,
    p_expected_hours:expectedHours,p_payment_due_at:paymentDueAt,p_cancellation_terms:cancellationTerms
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}

export async function respondAssignment(formData:FormData){
  const assignmentId=String(formData.get("assignment_id")||"");
  const response=String(formData.get("response")||"");
  if(!z.string().uuid().safeParse(assignmentId).success)throw new Error("Invalid assignment");
  if(!["accepted","declined"].includes(response))throw new Error("Invalid response");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_respond_assignment",{p_assignment_id:assignmentId,p_response:response});
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
}

export async function updateAssignmentSafety(formData:FormData){
  const assignmentId=String(formData.get("assignment_id")||"");
  if(!z.string().uuid().safeParse(assignmentId).success)throw new Error("Invalid assignment");
  const checked=(name:string)=>formData.get(name)==="on";
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_admin_update_safety_check",{
    p_assignment_id:assignmentId,
    p_minors_involved:checked("minors_involved"),
    p_identity_verified:checked("identity_verified"),
    p_credentials_verified:checked("credentials_verified"),
    p_supervision_confirmed:checked("supervision_confirmed"),
    p_emergency_process_confirmed:checked("emergency_process_confirmed"),
    p_media_policy_confirmed:checked("media_policy_confirmed"),
    p_transport_responsibility_confirmed:checked("transport_responsibility_confirmed"),
    p_overnight_responsibility_confirmed:checked("overnight_responsibility_confirmed"),
    p_medical_escalation_confirmed:checked("medical_escalation_confirmed"),
    p_communication_boundaries_confirmed:checked("communication_boundaries_confirmed"),
    p_notes:String(formData.get("notes")||"").trim().slice(0,4000),
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}

export async function markAssignmentReady(formData:FormData){
  const assignmentId=String(formData.get("assignment_id")||"");
  if(!z.string().uuid().safeParse(assignmentId).success)throw new Error("Invalid assignment");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_admin_mark_assignment_ready",{p_assignment_id:assignmentId});
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
  revalidatePath("/ja/d-hub/coaches/member/projects");
}

export async function setAssignmentStatus(formData:FormData){
  const assignmentId=String(formData.get("assignment_id")||"");
  const status=String(formData.get("status")||"");
  if(!z.string().uuid().safeParse(assignmentId).success)throw new Error("Invalid assignment");
  if(!["active","completed","cancelled"].includes(status))throw new Error("Invalid status");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_admin_set_assignment_status",{p_assignment_id:assignmentId,p_status:status});
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
  revalidatePath("/ja/d-hub/coaches/member/projects");
}

export async function submitMemberProjectReport(formData:FormData){
  const assignmentId=String(formData.get("assignment_id")||"");
  const hoursRaw=String(formData.get("actual_hours")||"").trim();
  const hours=hoursRaw?Number(hoursRaw):null;
  if(!z.string().uuid().safeParse(assignmentId).success)throw new Error("Invalid assignment");
  if(hours!==null&&(!Number.isFinite(hours)||hours<0))throw new Error("実働時間を確認してください");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_submit_member_project_report",{
    p_assignment_id:assignmentId,p_actual_hours:hours,
    p_delivery_summary:String(formData.get("delivery_summary")||"").trim().slice(0,5000),
    p_reflection:String(formData.get("reflection")||"").trim().slice(0,5000),
    p_issues:String(formData.get("issues")||"").trim().slice(0,5000),
    p_next_step:String(formData.get("next_step")||"").trim().slice(0,3000),
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects");
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
}

export async function closeProject(formData:FormData){
  const projectId=String(formData.get("project_id")||"");
  if(!z.string().uuid().safeParse(projectId).success)throw new Error("Invalid project");
  const participantRaw=String(formData.get("participant_count")||"").trim();
  const participantCount=participantRaw?Number(participantRaw):null;
  const incidentCount=Number(formData.get("incident_count")||0);
  if(participantCount!==null&&(!Number.isInteger(participantCount)||participantCount<0))throw new Error("参加人数を確認してください");
  if(!Number.isInteger(incidentCount)||incidentCount<0)throw new Error("インシデント件数を確認してください");
  const supabase=await createClient();
  const {error}=await supabase.rpc("dhub_admin_close_project",{
    p_project_id:projectId,p_participant_count:participantCount,
    p_client_confirmed:formData.get("client_confirmed")==="on",
    p_client_feedback:String(formData.get("client_feedback")||"").trim().slice(0,5000),
    p_incident_count:incidentCount,
    p_safeguarding_incident:formData.get("safeguarding_incident")==="on",
    p_delivery_summary:String(formData.get("delivery_summary")||"").trim().slice(0,5000),
    p_next_opportunity:String(formData.get("next_opportunity")||"").trim().slice(0,3000),
  });
  if(error)throw new Error(error.message);
  revalidatePath("/ja/d-hub/coaches/member/projects/admin");
  revalidatePath("/ja/d-hub/coaches/member/projects");
}
