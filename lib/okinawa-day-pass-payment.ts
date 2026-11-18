import { createClient } from "@supabase/supabase-js";

export const DAY_PASS_PROGRAM = "rba_okinawa_2026_day_pass";
export const DAY_PASS_TABLE = "okinawa_2026_day_pass_payments";
export const DAY_PASS_STRIPE_ACCOUNT = "acct_1UGdxZRXDnnSs6XN";
export const DAY_PASS_SITE_URL = "https://riotbasketballacademy.com";
export const DAY_PASS_LABELS = {
  dec22_day: "12月22日（火）午後参加（予定）",
  dec22_after: "12月22日（火）放課後交流",
  dec23_day: "12月23日（水）1日参加",
  dec23_after: "12月23日（水）放課後交流",
  dec24_day: "12月24日（木）短縮日帰り参加（午前〜午後、予定）",
  dec22_23_day: "12月22日午後＋23日の日帰り2日間",
  dec23_24_day: "12月23日＋24日の日帰り2日間",
  dec22_24_day: "12月22日午後＋24日の日帰り2日間",
} as const;
export type DayPassPlan = keyof typeof DAY_PASS_LABELS;

export type DayPassRecord = {
  id: string;
  program_code: string;
  application_ref: string;
  plan_code: string;
  guardian_email: string;
  guardian_name: string;
  amount_jpy: number;
  status: string;
  guardian_verified_at: string | null;
  venue_verified_at: string | null;
  terms_version: string | null;
  invite_token_sha256: string | null;
  invite_expires_at: string | null;
  checkout_session_id: string | null;
  paid_at: string | null;
};

export function dayPassAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    if (new URL(url).hostname !== "ctngdzzorhzpdxswahzl.supabase.co") return null;
  } catch { return null; }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function dayPassPaymentsEnabled() {
  return process.env.OKINAWA_2026_DAY_PASS_PAYMENTS_ENABLED === "true"
    && Boolean(process.env.OKINAWA_2026_DAY_PASS_WEBHOOK_SECRET)
    && Boolean(process.env.OKINAWA_2026_DAY_PASS_TERMS_VERSION)
    && Boolean(process.env.STRIPE_SECRET_KEY)
    && Boolean(dayPassAdmin());
}

export function approvedAmount(plan: string) {
  if (!Object.hasOwn(DAY_PASS_LABELS, plan)) return null;
  const raw = process.env.OKINAWA_2026_DAY_PASS_APPROVED_AMOUNTS_JPY;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const amount = parsed[plan];
    return typeof amount === "number" && Number.isInteger(amount) && amount >= 2000 && amount <= 40000
      ? amount : null;
  } catch { return null; }
}

export async function hashDayPassToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, "0")).join("");
}

export function dayPassInviteValid(row: DayPassRecord) {
  if (row.program_code !== DAY_PASS_PROGRAM || !Object.hasOwn(DAY_PASS_LABELS, row.plan_code)) return false;
  if (!row.guardian_verified_at || !row.venue_verified_at || !row.terms_version) return false;
  if (row.terms_version !== process.env.OKINAWA_2026_DAY_PASS_TERMS_VERSION) return false;
  if (!row.invite_expires_at || Date.parse(row.invite_expires_at) <= Date.now()) return false;
  if (approvedAmount(row.plan_code) !== row.amount_jpy) return false;
  // A two-day pass closes before the first included session; no partial retrospective sales.
  const closes: Record<DayPassPlan, string> = {
    dec22_day: "2026-12-22T14:00:00+09:00",
    dec22_after: "2026-12-22T16:15:00+09:00",
    dec23_day: "2026-12-23T09:00:00+09:00",
    dec23_after: "2026-12-23T15:30:00+09:00",
    dec24_day: "2026-12-24T09:00:00+09:00",
    dec22_23_day: "2026-12-22T14:00:00+09:00",
    dec23_24_day: "2026-12-23T09:00:00+09:00",
    dec22_24_day: "2026-12-22T14:00:00+09:00",
  };
  return Date.now() < Date.parse(closes[row.plan_code as DayPassPlan]);
}

export async function findDayPassInvite(token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const admin = dayPassAdmin();
  if (!admin) return null;
  const digest = await hashDayPassToken(token);
  const { data, error } = await admin.from(DAY_PASS_TABLE).select("*").eq("invite_token_sha256", digest).maybeSingle();
  if (error || !data) return null;
  return data as DayPassRecord;
}
