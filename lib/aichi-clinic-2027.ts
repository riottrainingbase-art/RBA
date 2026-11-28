export const aichiClinic = {
  path: "/ja/events/aichi-clinic-2027",
  date: "2027-02-23",
  dateLabel: "2027年2月23日（火・祝）",
  time: "9:00〜17:00",
  place: "愛知県内（会場調整中）",
  title: "RBA 愛知 1DAY クリニック",
} as const;
export function isAichiClinicUpcoming(now=Date.now()){
  return now < Date.parse("2027-02-23T17:00:00+09:00");
}
