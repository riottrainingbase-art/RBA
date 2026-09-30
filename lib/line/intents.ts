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
  "acl",
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

const STAFF_KEYWORDS = [
  "返金",
  "二重決済",
  "決済エラー",
  "引き落とし",
  "未払い",
  "請求",
  "領収書",
  "退会",
  "解約",
  "キャンセル料",
  "クレーム",
  "苦情",
  "事故",
  "怪我",
  "けが",
  "痛み",
  "診断",
  "医師",
  "病院",
  "アレルギー",
  "個人情報",
  "カード番号",
  "パスワード",
];

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

const MENU_KEYWORDS = [
  "メニュー",
  "menu",
  "何ができる",
  "できること",
  "案内",
  "はじめまして",
  "初めまして",
];

function normalize(value: string) {
  return value.normalize("NFKC").toLowerCase().trim();
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function isMenuRequest(input: string): boolean {
  const text = normalize(input);
  return text.length === 0 || hasAny(text, MENU_KEYWORDS);
}

export function inferConciergeRoute(input: string): ConciergeRoute {
  const text = normalize(input);

  if (hasAny(text, STAFF_KEYWORDS)) return "staff";

  const rtb = hasAny(text, RTB_KEYWORDS);
  const rba = hasAny(text, RBA_KEYWORDS);

  if (rtb && rba) return "general";
  if (rtb) return "rtb";
  if (rba) return "rba";

  if (hasAny(text, AMBIGUOUS_KEYWORDS)) return "ambiguous";
  return "general";
}
