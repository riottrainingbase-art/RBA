export const aichiClinic = {
  path: "/ja/events/aichi-clinic-2027",
  date: "2027-02-23",
  dateLabel: "2027年2月23日（火・祝）",
  time: "9:00〜17:00",
  place: "愛知県豊田市（会場は後日案内）",
  paymentPolicy: "事前決済制・早割あり",
  earlyDeadline: "2027-01-31T23:59:59+09:00",
  earlyDeadlineLabel: "2027年1月31日（日）23:59（日本時間）",
  fees: { half: { early: 6600, regular: 7700 }, full: { early: 11000, regular: 13200 } },
  title: "RBA 愛知 1DAY クリニック",
} as const;
export function isAichiClinicUpcoming(now=Date.now()){
  return now < Date.parse("2027-02-23T17:00:00+09:00");
}

export function aichiFee(plan:"half"|"full",now=Date.now()){
 return aichiClinic.fees[plan][now<Date.parse("2027-02-01T00:00:00+09:00")?"early":"regular"];
}
