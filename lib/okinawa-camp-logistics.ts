// Accommodation confirmation: organiser report, 2026-10-27.
// Gym slots and reception/departure times remain requests, not confirmed bookings.
export const OKINAWA_CAMP_LOGISTICS = {
  updatedOn: "2026-10-27",
  accommodationConfirmed: true,
  accommodation: "糸満青少年の家",
  address: "沖縄県糸満市賀数347番地",
  startDate: "2026-12-22",
  endDate: "2026-12-24",
  nights: 2,
  gymConfirmed: false,
  requestedGymSlots: [
    { date: "2026-12-22", hours: "14:00〜18:00" },
    { date: "2026-12-23", hours: "9:00〜17:00" },
    { date: "2026-12-24", hours: "9:00〜15:00" },
  ],
} as const;

export const OKINAWA_CAMP_LOGISTICS_COPY = {
  ja: {
    status: "宿泊先確保済み｜糸満青少年の家",
    summary: "12月22〜24日の2泊3日、糸満青少年の家での宿泊を確保しました。体育館の利用時間、集合・解散時刻、食事・送迎・追加スタッフの詳細は調整中です。",
    departure: "最終日の午後までの活動を施設に相談しています。集合・解散時刻は確定後にご案内します。",
  },
  en: {
    status: "Accommodation secured | Itoman Youth Center",
    summary: "Accommodation at Itoman Youth Center has been secured for two nights, December 22–24. Gym slots, arrival and departure times, meals, transfers and additional staffing are still being arranged.",
    departure: "Activities into the final afternoon have been requested. Confirmed arrival and departure times will follow.",
  },
  "zh-tw": {
    status: "住宿已安排｜糸滿青少年之家",
    summary: "已安排12月22–24日於糸滿青少年之家住宿，三天兩夜。體育館時段、集合與解散時間、餐食、接駁及其他工作人員細節仍在協調。",
    departure: "已向設施申請最後一天下午的活動時段，集合與解散時間確定後另行通知。",
  },
  ko: {
    status: "숙소 확보 완료 | 이토만 청소년의 집",
    summary: "12월 22–24일 2박 3일 이토만 청소년의 집 숙소를 확보했습니다. 체육관 시간, 집합·해산 시각, 식사·교통편·추가 스태프는 조율 중입니다.",
    departure: "마지막 날 오후 활동 시간을 시설에 요청했습니다. 집합·해산 시각은 확정 후 안내합니다.",
  },
} as const;
