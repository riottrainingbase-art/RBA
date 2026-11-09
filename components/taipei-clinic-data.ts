import { localePath, type Locale } from "./site-frame";

export const taipeiClinicSessions = [
  { date: "2026-12-11", start: "16:00", end: "18:00", weekday: { ja: "金", en: "Fri", "zh-tw": "五", ko: "금" } },
  { date: "2026-12-12", start: "10:00", end: "12:00", weekday: { ja: "土", en: "Sat", "zh-tw": "六", ko: "토" } },
  { date: "2026-12-13", start: "14:00", end: "16:00", weekday: { ja: "日", en: "Sun", "zh-tw": "日", ko: "일" } },
] as const;

export const taipeiClinicCopy = {
  ja: {
    title: "台北バスケットボールクリニック",
    dates: "2026年12月11日〜13日",
    zone: "台湾時間（UTC+8）",
    place: "台湾・台北",
    pending: "会場の詳細、対象、参加費、申込方法は後日ご案内します。現在、参加申込・決済は受け付けていません。",
    team: "公開枠以外の時間帯もチーム単位でご相談いただけます。指導者・チーム代表の方は、選手の年代・人数・希望日時をお知らせください。",
    teamCta: "チーム専用クリニックを相談する",
    details: "台北クリニックの日程を見る",
  },
  "zh-tw": {
    title: "台北籃球訓練營",
    dates: "2026 年 12 月 11–13 日",
    zone: "台灣時間（UTC+8）",
    place: "台灣・台北",
    pending: "場館、參加對象、費用與報名方式將另行公布，目前尚未開放報名及付款。",
    team: "公開場次以外，也可洽詢球隊專班。歡迎教練或領隊提供球員年齡、人數和希望的時段。",
    teamCta: "洽詢球隊專班",
    details: "查看台北訓練營時程",
  },
  en: {
    title: "Taipei Basketball Clinic",
    dates: "11–13 December 2026",
    zone: "Taiwan time (UTC+8)",
    place: "Taipei, Taiwan",
    pending: "Venue details, eligibility, fees and registration will be announced separately. Registration and payment are currently closed.",
    team: "Coaches and team leads can enquire about team sessions outside the public clinic times. Please share the players’ ages, group size and preferred time.",
    teamCta: "Enquire about a team clinic",
    details: "View the Taipei clinic schedule",
  },
  ko: {
    title: "타이베이 농구 클리닉",
    dates: "2026년 12월 11~13일",
    zone: "대만 현지 시간(UTC+8)",
    place: "대만 타이베이",
    pending: "장소, 참가 대상, 참가비와 신청 방법은 추후 안내합니다. 아직 신청과 결제를 받지 않습니다.",
    team: "공개 일정 외에도 팀 단위 클리닉을 문의할 수 있습니다. 지도자 또는 팀 대표가 선수 연령, 인원과 희망 시간을 알려 주세요.",
    teamCta: "팀 클리닉 문의",
    details: "타이베이 클리닉 일정 보기",
  },
} satisfies Record<Locale, Record<string, string>>;

export const taipeiClinicPath = (locale: Locale) => `${localePath(locale, "taiwan")}#taipei-clinic-december-2026`;

export function isTaipeiClinicUpcoming(now = new Date()) {
  const last = taipeiClinicSessions[taipeiClinicSessions.length - 1];
  return now.getTime() < Date.parse(`${last.date}T${last.end}:00+08:00`);
}
