import { localePath, type Locale } from "./site-frame";

export const taipeiClinicSessions = [
  { date: "2026-12-11", start: "18:30", end: "20:00", weekday: { ja: "金", en: "Fri", "zh-tw": "五", ko: "금" } },
  { date: "2026-12-12", start: "16:00", end: "18:00", weekday: { ja: "土", en: "Sat", "zh-tw": "六", ko: "토" } },
  { date: "2026-12-13", start: "14:00", end: "16:00", weekday: { ja: "日", en: "Sun", "zh-tw": "日", ko: "일" } },
] as const;

export const taipeiClinicCopy = {
  ja: {
    title: "台北バスケットボールクリニック",
    dates: "2026年12月11日〜13日",
    zone: "台湾時間（UTC+8）",
    place: "台湾・台北",
    pending: "会場は12月11日（金）が天母、12日（土）が内湖、13日（日）が林口です。時刻はすべて台湾現地時間の予定です。参加をご希望の方は、最新の日程と空き状況、申込方法を現地主催のSPARTANSにご確認ください。",
    team: "学校やクラブ単位の練習をご希望の方は、選手の年代・おおよその人数・希望日時を添えてご相談ください。",
    teamCta: "チーム専用クリニックを相談する",
    details: "台北クリニックの日程を見る",
  },
  "zh-tw": {
    title: "台北籃球訓練營",
    dates: "2026 年 12 月 11–13 日",
    zone: "台灣時間（UTC+8）",
    place: "台灣・台北",
    pending: "週五在天母、週六在內湖、週日在林口。以上為預定時段，最終時間、名額及報名方式請向 SPARTANS 確認。",
    team: "公開場次以外，也可洽詢球隊專班。歡迎教練或領隊提供球員年齡、人數和希望的時段。",
    teamCta: "洽詢球隊專班",
    details: "查看台北訓練營時程",
  },
  en: {
    title: "Taipei Basketball Clinic",
    dates: "11–13 December 2026",
    zone: "Taiwan time (UTC+8)",
    place: "Taipei, Taiwan",
    pending: "Friday at Tianmu, Saturday at Neihu and Sunday at Linkou. Times are provisional. Please check final times, available places and registration with SPARTANS.",
    team: "Coaches and team leads can enquire about team sessions outside the public clinic times. Please share the players’ ages, group size and preferred time.",
    teamCta: "Enquire about a team clinic",
    details: "View the Taipei clinic schedule",
  },
  ko: {
    title: "타이베이 농구 클리닉",
    dates: "2026년 12월 11~13일",
    zone: "대만 현지 시간(UTC+8)",
    place: "대만 타이베이",
    pending: "금요일 톈무, 토요일 네이후, 일요일 린커우에서 열릴 예정입니다. 최종 시간과 잔여 정원, 신청 방법은 SPARTANS에 확인해 주세요.",
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
