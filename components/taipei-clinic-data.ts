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
    pending: "天母・内湖・林口の3会場は予約済み。通常クラス以外の追加受入数、特別参加費、正式な申込・決済リンクはSPARTANSが確認中です。お問い合わせはSPARTANSへ。",
    team: "12/11（金）天母18:30〜20:00、12/12（土）内湖16:00〜18:00、12/13（日）林口14:00〜16:00。すべて台湾現地時間です。",
    teamCta: "SPARTANSへ参加相談する",
    details: "台北クリニックの日程を見る",
  },
  "zh-tw": {
    title: "台北籃球訓練營",
    dates: "2026 年 12 月 11–13 日",
    zone: "台灣時間（UTC+8）",
    place: "台灣・台北",
    pending: "天母、內湖及林口三個場館均已預訂。額外名額、特別活動費用與專用報名付款連結由 SPARTANS 確認中，請直接洽詢 SPARTANS。",
    team: "12/11（五）天母18:30–20:00、12/12（六）內湖16:00–18:00、12/13（日）林口14:00–16:00，全部為台灣時間。",
    teamCta: "向 SPARTANS 洽詢報名",
    details: "查看台北訓練營時程",
  },
  en: {
    title: "Taipei Basketball Clinic",
    dates: "11–13 December 2026",
    zone: "Taiwan time (UTC+8)",
    place: "Taipei, Taiwan",
    pending: "All three gyms are booked. Extra places, event fees and dedicated registration/payment links are being finalised by SPARTANS. Please contact SPARTANS for enquiries.",
    team: "Fri Dec 11 Tianmu 18:30–20:00; Sat Dec 12 Neihu 16:00–18:00; Sun Dec 13 Linkou 14:00–16:00. All times in Taipei.",
    teamCta: "Enquire with SPARTANS",
    details: "View the Taipei clinic schedule",
  },
  ko: {
    title: "타이베이 농구 클리닉",
    dates: "2026년 12월 11~13일",
    zone: "대만 현지 시간(UTC+8)",
    place: "대만 타이베이",
    pending: "톈무·네이후·린커우 3개 체육관 예약 완료. 추가 인원, 특별 참가비와 신청·결제 링크는 SPARTANS 확인 후 안내합니다. 문의는 SPARTANS에 해주세요.",
    team: "12/11(금) 톈무 18:30–20:00, 12/12(토) 네이후 16:00–18:00, 12/13(일) 린커우 14:00–16:00. 모든 시간은 타이베이 현지 시간입니다.",
    teamCta: "SPARTANS에 문의하기",
    details: "타이베이 클리닉 일정 보기",
  },
} satisfies Record<Locale, Record<string, string>>;

export const taipeiClinicPath = (locale: Locale) => locale === "ko" ? `${localePath(locale, "taiwan")}#taipei-clinic-december-2026` : `${locale === "en" ? "" : `/${locale}`}/events/taipei-development-clinic-2026`;

export function isTaipeiClinicUpcoming(now = new Date()) {
  const last = taipeiClinicSessions[taipeiClinicSessions.length - 1];
  return now.getTime() < Date.parse(`${last.date}T${last.end}:00+08:00`);
}
