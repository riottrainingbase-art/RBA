export const sagaWinterOffers = {
  am: { label: "第1部（9:00〜12:00）", amount: 5500, starts: "2026-12-28T09:00:00+09:00" },
  pm: { label: "第2部（13:00〜16:00）", amount: 5500, starts: "2026-12-28T13:00:00+09:00" },
  evening: { label: "第3部（17:00〜19:00）", amount: 4400, starts: "2026-12-28T17:00:00+09:00" },
  daytime: { label: "第1部＋第2部（9:00〜16:00・休憩あり）", amount: 9900, starts: "2026-12-28T09:00:00+09:00" },
  full: { label: "全3部（9:00〜19:00・休憩あり）", amount: 12100, starts: "2026-12-28T09:00:00+09:00" },
} as const;
export const sagaWinterGrades = ["小1","小2","小3","小4","小5","小6","中1","中2","中3"] as const;
export const sagaEarlybird = { code: "SAGA1000", amount: 1000, endExclusive: "2026-12-21T00:00:00+09:00" } as const;
export const isSagaEarlybirdOpen = (now = Date.now()) => now < Date.parse(sagaEarlybird.endExclusive);
