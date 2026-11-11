import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const migration=readFileSync("supabase/migrations/20261112010500_homecourt_match_verified_pilot.sql","utf8");
const match=readFileSync("components/member-match-board.tsx","utf8");
const entry=readFileSync("components/member-entry-desk.tsx","utf8");
const member=readFileSync("components/member-app.tsx","utf8");
const redirect=readFileSync("lib/member-auth-redirect.ts","utf8");
const rules=readFileSync("lib/homecourt-match.ts","utf8");
const matchStyles=readFileSync("components/member-match-board.module.css","utf8");
const entryStyles=readFileSync("components/member-entry-desk.module.css","utf8");

test("MATCH requires RBA verified organisations and approved adult coaches at database layer",()=>{
  assert.match(migration,/rba_match_entity_approval_guard/);
  assert.match(migration,/new.verification_status is distinct from old.verification_status/);
  assert.match(migration,/new.status not in \('draft','pending_review'\)/);
  assert.match(migration,/private\.is_approved_coach\(\)/);
  assert.match(migration,/e\.status = 'active'/);
  assert.match(migration,/e\.verification_status = 'verified'/);
  assert.match(migration,/homecourt_exchange_posts/);
  assert.match(migration,/homecourt_exchange_interests/);
  assert.match(migration,/post_id is distinct from old.post_id/);
  assert.match(migration,/Only the host can accept or decline/);
  assert.match(migration,/Only verified club representatives can request a match/);
});

test("MATCH uses existing RBA HOMECOURT tables with no direct adult-to-child contacts",()=>{
  for(const t of ["platform_entities","homecourt_exchange_posts","homecourt_exchange_interests"])
    assert.ok(match.includes('from("'+t+'")')||match.includes('from(table)'),"missing "+t);
  assert.match(match,/申請しただけでは認証・加盟とはなりません/);
  assert.match(match,/団体代表者の確認が必要/);
  assert.match(match,/未成年者への自由なDM/);
  assert.match(match,/status:"pending_review"/);
  assert.match(match,/status:"requested"/);
  assert.doesNotMatch(match,/Stripe|Square|checkout|mailto:|wa\.me/);
  assert.match(rules,/MATCH_AGE_GROUPS/);
  assert.match(rules,/todayTokyo/);
});

test("ENTRY separates intake, payments, check-ins and does not read youth PII",()=>{
  for(const name of ["events","clinic_registrations","program_applications","platform_orders","event_checkins"])
    assert.match(entry,new RegExp('from\\("'+name+'"\\)'));
  assert.match(entry,/status==="paid" && Boolean\(x\.paid_at\)/);
  assert.match(entry,/checked_in_at/);
  assert.match(entry,/別々に表示しています/);
  assert.match(entry,/自動残枠：算出しません/);
  for(const restricted of ["participant_name","contact_email","emergency_phone","guardian_name","media_consent"])
    assert.ok(!entry.includes(restricted),"ENTRY must not fetch "+restricted);
  assert.match(entry,/csvEscape/);
  assert.doesNotMatch(entry,/service_role|SUPABASE_SECRET|NEXT_PUBLIC_SERVICE_ROLE/);
});

test("new sections are reachable by logged-in users while protected by role",()=>{
  assert.match(member,/MemberMatchBoard/);
  assert.match(member,/MemberEntryDesk/);
  assert.match(member,/data\.profile\.role==="admin"\?<MemberEntryDesk/);
  assert.match(member,/isCoach\?<MemberMatchBoard/);
  assert.match(member,/const navSections=\[[^\]]*"match","entry"/);
  assert.match(redirect,/calendar\|team\|match\|entry\|notifications/);
  assert.match(matchStyles,/@media\(max-width:720px\)/);
  assert.match(entryStyles,/@media\(max-width:820px\)/);
});


test("ORGANIZER and STORE reuse existing products without false checkout promises",()=>{
  const organizer=readFileSync("definitive-content/ja/organizer.html","utf8");
  const store=readFileSync("app/ja/store/page.tsx","utf8");
  assert.match(organizer,/MY HOMECOURT \/ MATCH/);
  assert.match(organizer,/RBA主催イベントでは申込・決済・参加管理を運用/);
  assert.match(organizer,/href="\/ja\/my-homecourt\/app\/match"/);
  assert.match(organizer,/他団体への受付・決済システム提供は試験運用前/);
  assert.match(store,/現在、注文・予約・お支払いは受け付けていません/);
  assert.match(store,/https:\/\/form.jotform.com\/262947168647069/);
  assert.match(store,/ご回答は無料・購入予約ではありません/);
  assert.doesNotMatch(store,/buy\.stripe\.com|checkout\.shopify\.com/);
});
