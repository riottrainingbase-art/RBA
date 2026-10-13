export type PaymentOption = {
  id: string;
  label: string;
  amount: number;
};


export const eventPayments = {
  yaima: [{ id: "yaima-rba", label: "RBA参加費", amount: 25000 }],
  kawasaki: [],
  "saga-fukuoka": [{ id: "saga-fukuoka-2day", label: "2日間・宿泊食事付", amount: 16500 }],
  yamagata: [{ id: "yamagata-1day", label: "1DAY参加費", amount: 6600 }],
  shizugawa: [{ id: "shizugawa-2day", label: "2日間参加費", amount: 25000 }],
  kobe: [
    { id: "kobe-half-friday", label: "半日＋金曜夜", amount: 9900 },
    { id: "kobe-1day-friday", label: "1日＋金曜夜", amount: 14300 },
    { id: "kobe-2day-friday", label: "2日通い＋金曜夜", amount: 23100 },
    { id: "kobe-3day-friday", label: "3日通い＋金曜夜", amount: 30800 },
    { id: "kobe-2day-stay-friday", label: "2日1泊＋金曜夜", amount: 36300 },
    { id: "kobe-3day-stay-friday", label: "全日程・宿泊食事付＋金曜夜", amount: 56100 },
  ],
  torsten: [
    { id: "torsten-live", label: "LIVE参加", amount: 3300 },
    { id: "torsten-ondemand", label: "30日オンデマンド", amount: 4400 },
  ],
} satisfies Record<string, readonly PaymentOption[]>;


export const formatJPY = (amount: number) => `¥${amount.toLocaleString("ja-JP")}`;
