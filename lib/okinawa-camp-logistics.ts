// RBA organiser reported obtaining the facility's agreement on 2026-11-02. Written scope and operational details remain to be reconciled.
// Gym slots and reception/departure times remain requests, not confirmed bookings.
export const OKINAWA_CAMP_LOGISTICS = {
  updatedOn: "2026-11-02",
  accommodationConfirmed: false,
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
    status: "施設側から開催の了承を得ています（RBA確認）",
    summary: "RBAは12月22〜24日の開催について施設側から了承を得たことを確認しています。宿泊利用の正式手続き、体育館利用時間、安全な受入人数、集合解散時刻、食事・送迎・追加スタッフは調整中です。",
    departure: "最終日の午後までの活動を施設に相談しています。集合・解散時刻は確定後にご案内します。",
  },
  en: {
    status: "Venue agreement reported by RBA | details being finalized",
    summary: "RBA confirms it has received the facility's agreement to proceed with the December 22–24 event. Formal overnight-use paperwork, gym slots, safe capacity, arrival/departure times, meals, transfers and staffing are still being finalized.",
    departure: "Activities into the final afternoon have been requested. Confirmed arrival and departure times will follow.",
  },
  "zh-tw": {
    status: "主辦方確認已獲場地方同意｜細節協調中",
    summary: "RBA主辦方確認已取得場地方對12月22–24日活動的同意。住宿正式手續、體育館時段、安全接待人數、集合與解散時間、餐食、接駁與工作人員仍在協調中。",
    departure: "已向設施申請最後一天下午的活動時段，集合與解散時間確定後另行通知。",
  },
  ko: {
    status: "주최 측 시설 동의 확인 | 세부 조건 조율 중",
    summary: "RBA 주최 측은 12월 22–24일 행사 개최에 대해 시설 측 동의를 받았다고 확인했습니다. 숙박 이용 서류, 체육관 시간, 안전 수용 인원, 집합·해산 시각, 식사·교통편 및 추가 스태프는 조율 중입니다.",
    departure: "마지막 날 오후 활동 시간을 시설에 요청했습니다. 집합·해산 시각은 확정 후 안내합니다.",
  },
} as const;
