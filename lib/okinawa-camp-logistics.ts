// Facility recorded a provisional booking, but written acceptance for paid overnight camp is not verified as of 2026-11-02.
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
    status: "宿泊仮受付・最終承認待ち｜糸満青少年の家",
    summary: "12月22〜24日の2泊3日について糸満青少年の家で仮受付中です。有料宿泊研修としての正式受入・体育館利用時間・集合解散時刻・食事・送迎・追加スタッフは最終確認待ちです。",
    departure: "最終日の午後までの活動を施設に相談しています。集合・解散時刻は確定後にご案内します。",
  },
  en: {
    status: "Provisional booking | final approval pending",
    summary: "The December 22–24 overnight program is provisionally held at Itoman Youth Center. Final written approval for the paid overnight program, gym slots, timing, meals, transfers and staffing remains pending.",
    departure: "Activities into the final afternoon have been requested. Confirmed arrival and departure times will follow.",
  },
  "zh-tw": {
    status: "住宿暫時受理｜等待最終核准",
    summary: "12月22–24日於糸滿青少年之家的三天兩夜住宿目前僅為暫時受理；付費住宿活動的最終書面許可、體育館時段、集合與解散時間、餐食、接駁及工作人員安排仍待確認。",
    departure: "已向設施申請最後一天下午的活動時段，集合與解散時間確定後另行通知。",
  },
  ko: {
    status: "숙박 가접수 | 최종 승인 대기",
    summary: "12월 22–24일 2박 3일 이토만 청소년의 집 이용은 현재 가접수 상태입니다. 유료 숙박 연수에 대한 최종 서면 승인, 체육관 시간, 집합·해산 시각, 식사·교통편·추가 스태프는 확인 중입니다.",
    departure: "마지막 날 오후 활동 시간을 시설에 요청했습니다. 집합·해산 시각은 확정 후 안내합니다.",
  },
} as const;
