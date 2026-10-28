export const EARLY_BIRD_END = "2026-10-31T23:59:59.999+08:00";
// Online payment stops when the published first-day reception begins.
export const ONLINE_PAYMENT_END = "2026-12-22T09:00:00+09:00";
export const CAMP_CONTACT = "mailto:hi@spartans.com.tw?cc=riot.training.base%40gmail.com&subject=Okinawa%20Camp%202026%20-%20local%20rate%20or%20group%20inquiry";
export const OKINAWA_DOMESTIC_PRICES = { day: 30250, housing: 43560 } as const;
export const OKINAWA_RESIDENT_PRICES = { day: 27500, housing: 39600 } as const;
export const CAMP_OKINAWA_CONTACT = "mailto:riot.training.base@gmail.com?subject=" + encodeURIComponent("沖縄キャンプ2026｜沖縄県民割引の参加相談") + "&body=" + encodeURIComponent("沖縄県民割引の参加相談\n希望プラン（通い27,500円／宿泊39,600円・各1名税込）：\n参加者氏名：\n学年・年齢：\n性別：\n連絡先：\nお住まいの市町村：\n参加人数：\n宿泊希望：\nご質問：\n");
export const CAMP_JAPAN_CONTACT = "mailto:riot.training.base@gmail.com?subject=Okinawa%20Camp%202026%20-%20Japan%20entry&body=" + encodeURIComponent("沖縄キャンプ国内参加の問い合わせ\n参加者氏名：\n学年・年齢：\n性別：\n連絡先：\nお住まいの都道府県：\n参加人数：\n宿泊希望：\n送迎希望：\nご質問：\n");
export type CampChoice = { housing: boolean; players: 1 | 2 | 3; residence: "japan" | "okinawa" | "other" };
const payments = {
  housing: {
    standard: [450, "https://book.stripe.com/28EeVfgOPaDG3UxeAL7EQ0Z"],
    early: [360, "https://book.stripe.com/7sY00ldCD9zC3Ux64f7EQ10"],
    group: [405, "https://book.stripe.com/4gM8wR6abaDGgHj64f7EQ11"],
    early_group: [324, "https://book.stripe.com/bJe3cxbuvh2462Fboz7EQ12"],
  },
  day: {
    standard: [300, "https://book.stripe.com/28E5kFdCDh24cr378j7EQ13"],
    early: [240, "https://book.stripe.com/28E00l4237ru76J0JV7EQ14"],
    group: [270, "https://book.stripe.com/dRm14p1TVbHKfDfeAL7EQ15"],
    early_group: [216, "https://book.stripe.com/aFa6oJdCD8vydv7eAL7EQ16"],
  },
} as const;

export function parseCampChoice(input: unknown): CampChoice | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const b = input as Record<string, unknown>;
  if (typeof b.housing !== "boolean" || ![1, 2, 3].includes(b.players as number) || !["japan", "okinawa", "other"].includes(String(b.residence))) return null;
  return { housing: b.housing, players: b.players as 1 | 2 | 3, residence: b.residence as CampChoice["residence"] };
}

export function campQuote(choice: CampChoice, now = new Date()) {
  const early = now.getTime() <= Date.parse(EARLY_BIRD_END);
  const state = now.getTime() >= Date.parse(ONLINE_PAYMENT_END) ? "closed" : choice.residence !== "other" ? "local_review" : choice.players === 3 ? "group_review" : "payable";
  const rate = early ? choice.players === 2 ? "early_group" : "early" : choice.players === 2 ? "group" : "standard";
  const [unit, checkoutUrl] = payments[choice.housing ? "housing" : "day"][rate];
  const registration = new URL("https://okinawa.camp/register");
  registration.searchParams.set("housing", String(choice.housing));
  registration.searchParams.set("people", String(Math.min(choice.players, 2)));
  const domestic = choice.residence !== "other" && state !== "closed";
  const domesticUnit = (choice.residence === "okinawa" ? OKINAWA_RESIDENT_PRICES : OKINAWA_DOMESTIC_PRICES)[choice.housing ? "housing" : "day"];
  return {
    state, early: domestic ? false : early, rateKey: domestic ? `${choice.housing ? "housing" : "day"}_${choice.residence}` : `${choice.housing ? "housing" : "day"}_${rate}`,
    perPlayer: domestic ? domesticUnit : state === "payable" ? unit : null,
    total: domestic && choice.players < 3 ? domesticUnit * choice.players : state === "payable" ? unit * choice.players : null,
    currency: domestic ? "JPY" : "USD", players: choice.players,
    registrationUrl: state === "payable" ? registration.href : null,
    checkoutUrl: state === "payable" ? checkoutUrl : null,
    earlyBirdEnd: EARLY_BIRD_END,
  };
}
