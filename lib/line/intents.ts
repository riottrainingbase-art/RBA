import type { ConciergeRoute } from "@/lib/line/knowledge";

const RTB_KEYWORDS = [
  "rtb",
  "riot training base",
  "パーソナル",
  "パーソナルトレーニング",
  "ジム",
  "筋トレ",
  "筋力",
  "ウエイト",
  "ウェイト",
  "s&c",
  "strength",
  "conditioning",
  "フィジカル",
  "トレーナー",
  "acl予防",
  "怪我予防",
  "ケガ予防",
  "ジャンプ",
  "スプリント",
  "基礎筋力",
];

const RBA_KEYWORDS = [
  "rba",
  "riot basketball academy",
  "バスケ",
  "バスケット",
  "クリニック",
  "clinic",
  "キャンプ",
  "camp",
  "u12",
  "u15",
  "my home court",
  "my homecourt",
  "home court",
  "d-hub",
  "d hub",
  "coach journal",
  "指導者",
  "コーチ",
  "rba united",
  "team training",
  "チームトレーニング",
  "遠征",
  "国際交流",
  "海外交流",
  "3x3",
  "スクール",
  "クラブ",
];

const BILLING_KEYWORDS = [
  "返金",
  "二重決済",
  "決済エラー",
  "引き落とし",
  "支払い",
  "振込",
  "未払い",
  "請求",
  "領収書",
];

const SCHEDULE_KEYWORDS = [
  "退会",
  "解約",
  "キャンセル",
  "予約変更",
  "日程変更",
  "欠席",
  "遅刻",
];

const HEALTH_KEYWORDS = [
  "事故",
  "怪我",
  "けが",
  "腰痛",
  "膝痛",
  "肩痛",
  "痛み",
  "痛い",
  "疼痛",
  "違和感",
  "腫れ",
  "しびれ",
  "診断",
  "医師",
  "病院",
  "手術",
  "術後",
  "断裂",
  "損傷",
  "リハビリ",
  "リウマチ",
  "半月板",
  "アレルギー",
];

const HUMAN_KEYWORDS = [
  "スタッフ",
  "担当者",
  "人に相談",
  "直接相談",
  "クレーム",
  "苦情",
  "個人情報",
  "カード番号",
  "パスワード",
];

const STAFF_KEYWORDS = [
  ...BILLING_KEYWORDS,
  ...SCHEDULE_KEYWORDS,
  ...HEALTH_KEYWORDS,
  ...HUMAN_KEYWORDS,
];

export type StaffCategory = "billing" | "health" | "schedule" | "human";

const AMBIGUOUS_KEYWORDS = [
  "予約",
  "料金",
  "費用",
  "値段",
  "申し込み",
  "申込み",
  "申込",
  "見学",
  "体験",
  "場所",
  "営業時間",
  "空き",
  "空いて",
  "問い合わせ",
];

const EXACT_MENU_REQUESTS = new Set([
  "メニュー",
  "menu",
  "案内",
  "お問い合わせ",
  "問い合わせ",
  "はじめまして",
  "初めまして",
  "こんにちは",
  "こんばんは",
  "おはよう",
  "おはようございます",
]);

const MENU_PHRASES = [
  "何ができる",
  "できること",
  "メニューを見たい",
  "案内を見たい",
];

function normalize(value: string) {
  return value.normalize("NFKC").toLowerCase().trim();
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function isMenuRequest(input: string): boolean {
  const text = normalize(input);
  return text.length === 0 || EXACT_MENU_REQUESTS.has(text) || hasAny(text, MENU_PHRASES);
}

export function inferStaffCategory(input: string): StaffCategory {
  const text = normalize(input);
  if (hasAny(text, BILLING_KEYWORDS)) return "billing";
  if (hasAny(text, HEALTH_KEYWORDS)) return "health";
  if (
    hasAny(text, SCHEDULE_KEYWORDS) ||
    ((text.includes("予約") || text.includes("日程")) &&
      (text.includes("変更") || text.includes("ずら") || text.includes("振替") || text.includes("振り替え")))
  ) {
    return "schedule";
  }
  return "human";
}

export function inferConciergeRoute(input: string): ConciergeRoute {
  const text = normalize(input);

  const preventionInquiry =
    text.includes("予防") &&
    (text.includes("怪我") || text.includes("けが") || text.includes("ケガ") || text.includes("acl"));

  const scheduleChangeInquiry =
    (text.includes("予約") || text.includes("日程")) &&
    (text.includes("変更") || text.includes("ずら") || text.includes("振替") || text.includes("振り替え"));

  // Staff-required topics take precedence, except clearly preventive training questions.
  if (!preventionInquiry && (hasAny(text, STAFF_KEYWORDS) || scheduleChangeInquiry)) return "staff";

  const rtb = hasAny(text, RTB_KEYWORDS);
  const rba = hasAny(text, RBA_KEYWORDS);

  if (rtb && rba) return "general";
  if (rtb) return "rtb";
  if (rba) return "rba";

  if (hasAny(text, AMBIGUOUS_KEYWORDS)) return "ambiguous";
  return "general";
}
