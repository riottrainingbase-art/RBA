export type PaymentOption = {
  label: string;
  amount: number;
  url: string;
};


export const eventPayments = {
  yaima: [{ label: "RBA参加費", amount: 25000, url: "https://book.stripe.com/7sYeVf567eTW8aN0JV7EQ0d" }],
  kawasaki: [],
  "saga-fukuoka": [{ label: "2日間・宿泊食事付", amount: 16500, url: "https://book.stripe.com/fZu7sN2XZ9zC9eRakv7EQ0e" }],
  yamagata: [{ label: "1DAY参加費", amount: 6600, url: "https://book.stripe.com/9B67sN4233be76Jakv7EQ0f" }],
  shizugawa: [{ label: "2日間参加費", amount: 25000, url: "https://book.stripe.com/00wdRbeGHh248aN0JV7EQ0i" }],
  kobe: [
    { label: "金曜夜のみ", amount: 3300, url: "https://book.stripe.com/aFa3cxcyz6nq62F50b7EQ06" },
    { label: "半日", amount: 6600, url: "https://book.stripe.com/8x2dRb2XZ4fi1MpeAL7EQ00" },
    { label: "半日＋金曜夜", amount: 9900, url: "https://book.stripe.com/00w00l5678vyezbakv7EQ0g" },
    { label: "1日・日帰り", amount: 11000, url: "https://book.stripe.com/aFa28t1TV5jm3UxeAL7EQ01" },
    { label: "1日＋金曜夜", amount: 14300, url: "https://book.stripe.com/00waEZ423bHKaiVeAL7EQ0h" },
    { label: "2日・通い", amount: 19800, url: "https://book.stripe.com/dRmbJ31TVdPS0IlfEP7EQ02" },
    { label: "2日通い＋金曜夜", amount: 23100, url: "https://book.stripe.com/dRmdRb7ef1364YB64f7EQ0j" },
    { label: "3日・通い", amount: 27500, url: "https://book.stripe.com/8x25kF7efdPS76J50b7EQ03" },
    { label: "3日通い＋金曜夜", amount: 30800, url: "https://book.stripe.com/bJe8wRgOPfY0cr3dwH7EQ0m" },
    { label: "2日1泊・食事付", amount: 33000, url: "https://book.stripe.com/4gM14paqr27aezb9gr7EQ04" },
    { label: "2日1泊＋金曜夜", amount: 36300, url: "https://book.stripe.com/cNi7sN5675jm62FeAL7EQ0l" },
    { label: "3日2泊・食事付", amount: 52800, url: "https://book.stripe.com/cNi00leGHcLOaiV3W77EQ05" },
    { label: "3日2泊＋金曜夜", amount: 56100, url: "https://book.stripe.com/bJe28tbuv8vydv764f7EQ0k" },
  ],
  torsten: [
    { label: "LIVE参加", amount: 3300, url: "https://book.stripe.com/aFa14p5678vy8aN8cn7EQ0b" },
    { label: "30日オンデマンド", amount: 4400, url: "https://book.stripe.com/bJebJ3dCD6nq9eR9gr7EQ0c" },
  ],
} satisfies Record<string, readonly PaymentOption[]>;


export const formatJPY = (amount: number) => `¥${amount.toLocaleString("ja-JP")}`;