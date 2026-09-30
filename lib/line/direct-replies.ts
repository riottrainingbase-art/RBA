import {
  isProgrammeActive,
  programmeById,
  programmes,
  type Programme,
  type ProgrammeId,
} from "@/components/programme-data";
import { OFFICIAL_LINKS } from "@/lib/line/knowledge";

const PROGRAMME_ALIASES: Record<ProgrammeId, string[]> = {
  "sendai-u15": ["仙台u15", "u15仙台", "skill up", "スキルアップ", "u15スクール", "u15"],
  "yaima": ["やいま", "yaima", "石垣"],
  "kawasaki": ["川崎", "kawasaki"],
  "saga-fukuoka": ["佐賀福岡", "佐賀 福岡", "佐賀×福岡", "佐賀 × 福岡", "saga", "fukuoka"],
  "yamagata": ["山形", "yamagata"],
  "shizugawa": ["志津川", "南三陸", "shizugawa"],
  "kobe": ["神戸", "kobe"],
  "torsten": ["トーステン", "ロイブル", "torsten", "loibl"],
};

function normalize(value: string) {
  return value.normalize("NFKC").toLowerCase().trim();
}

function japaneseDateKey(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function programmeDetailUrl(programme: Programme) {
  if (programme.detailPath) {
    return `https://riotbasketballacademy.com/ja/${programme.detailPath}`;
  }
  if (programme.id === "sendai-u15") {
    return "https://riotbasketballacademy.com/ja/u15-skill-up";
  }
  if (programme.pathway === "development-camp") {
    return "https://riotbasketballacademy.com/ja/camp";
  }
  return "https://riotbasketballacademy.com/ja/opportunities";
}

function programmeStatus(programme: Programme, now: Date) {
  if (programme.registrationClosed) return "受付終了";
  if (programme.ongoing) return "受付中";
  const end = programme.endDate ?? programme.startDate;
  return end >= japaneseDateKey(now) ? "受付中" : "終了";
}

function formatProgramme(programme: Programme, now: Date) {
  const status = programmeStatus(programme, now);
  const application =
    status === "受付中"
      ? `申込：${programme.applicationUrl}`
      : "申込：現在は受付していません";

  return [
    `【${programme.title[1]}】`,
    `状態：${status}`,
    `日程：${programme.date[1]}`,
    `場所：${programme.place[1]}`,
    `対象：${programme.audience[1]}`,
    `料金：${programme.price[1]}`,
    application,
    `詳細：${programmeDetailUrl(programme)}`,
  ].join("\n");
}

function matchProgramme(text: string): Programme | null {
  const normalized = normalize(text);

  const matches = programmes.filter((programme) =>
    PROGRAMME_ALIASES[programme.id].some((alias) =>
      normalized.includes(normalize(alias)),
    ),
  );

  if (matches.length === 1) return matches[0];

  // "U15" alone should resolve to Sendai U15 only when the user is clearly
  // asking about the school/programme rather than general U15 development.
  if (
    matches.some((p) => p.id === "sendai-u15") &&
    (normalized.includes("スクール") ||
      normalized.includes("料金") ||
      normalized.includes("申込") ||
      normalized.includes("申し込") ||
      normalized.includes("仙台") ||
      normalized.includes("木曜"))
  ) {
    return programmeById["sendai-u15"];
  }

  return null;
}

function wantsUpcomingList(text: string) {
  const normalized = normalize(text);
  const rbaContext =
    normalized.includes("rba") ||
    normalized.includes("イベント") ||
    normalized.includes("クリニック") ||
    normalized.includes("キャンプ") ||
    normalized.includes("活動") ||
    normalized.includes("大会");

  const futureIntent =
    normalized.includes("次") ||
    normalized.includes("今後") ||
    normalized.includes("予定") ||
    normalized.includes("日程") ||
    normalized.includes("一覧") ||
    normalized.includes("何がある");

  return rbaContext && futureIntent;
}

function formatUpcoming(now: Date) {
  const active = programmes
    .filter((programme) => isProgrammeActive(programme, now))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  if (active.length === 0) {
    return [
      "現在、RBA公式データ上で受付中のプログラムはありません。",
      `最新情報：${OFFICIAL_LINKS.rbaWebsite}`,
    ].join("\n");
  }

  const lines = active.map(
    (programme) =>
      `・${programme.date[1]}｜${programme.title[1]}｜${programme.place[1]}`,
  );

  return [
    "現在のRBA受付中プログラムです。",
    "",
    ...lines,
    "",
    `詳細・申込：${OFFICIAL_LINKS.rbaWebsite}`,
    "※残席数や個別の申込状況はスタッフ確認が必要です。",
  ].join("\n");
}

function directOfficialLinkReply(text: string) {
  const normalized = normalize(text);

  if (
    normalized.includes("my home court") ||
    normalized.includes("my homecourt") ||
    normalized.includes("ホームコート")
  ) {
    return `MY HOME COURTはこちらです。\n${OFFICIAL_LINKS.myHomeCourt}`;
  }

  if (
    (normalized.includes("rba") && normalized.includes("サイト")) ||
    normalized.includes("rbaホームページ")
  ) {
    return `RBA公式サイトはこちらです。\n${OFFICIAL_LINKS.rbaWebsite}`;
  }

  if (
    (normalized.includes("rtb") && normalized.includes("サイト")) ||
    normalized.includes("rtbホームページ") ||
    normalized.includes("rtbのurl")
  ) {
    return `RTBの案内はこちらです。\n${OFFICIAL_LINKS.rtbLinktree}`;
  }

  return null;
}

export function deterministicLineReply(
  userText: string,
  now = new Date(),
): string | null {
  const officialLink = directOfficialLinkReply(userText);
  if (officialLink) return officialLink;

  const programme = matchProgramme(userText);
  if (programme) return formatProgramme(programme, now);

  if (wantsUpcomingList(userText)) return formatUpcoming(now);

  return null;
}
