/** Only executed, approved advertising contracts belong here. Prospecting data stays private. */
export type SendaiPartner = {
  id: string;
  name: string;
  url: string;
  logoPath?: string;
  startsOn: string;
  endsOn: string;
  publicationApproved: boolean;
  contractConfirmed: boolean;
};

export const sendaiPartners: readonly SendaiPartner[] = [];

export function activeSendaiPartners(on = new Date().toISOString().slice(0, 10)) {
  return sendaiPartners.filter(p => p.contractConfirmed && p.publicationApproved && p.startsOn <= on && p.endsOn >= on);
}

export const sendaiPlans = [
  { name: "まちのお店パートナー", monthly: "3,300円", annual: "39,600円", description: "地域のお店から。公式サイトの社名・ロゴ・店舗リンク、月次の共同紹介、店頭掲示用データ。" },
  { name: "地域企業パートナー", monthly: "11,000円", annual: "132,000円", description: "公式サイトの企業紹介に加え、年4回の個別SNS紹介、採用・事業紹介リンク、年1回の取材記事。" },
] as const;

export const sendaiUniformOptions = [
  { place: "パンツ前面・右脚部", price: "年66,000円", capacity: "1社", limit: "100㎠以内" },
  { place: "シャツ背面", price: "年132,000円／社", capacity: "2社まで", limit: "2社合計で320㎠以内" },
  { place: "シャツ前面", price: "年264,000円", capacity: "1社", limit: "320㎠以内・1種" },
] as const;
