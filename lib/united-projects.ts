export const unitedEntryUrl = "https://form.jotform.com/262704343667057";
export const unitedLineUrl = "https://lin.ee/5l1YG8N";
export const unitedFee = "運営参加費 66,000円（税込）＋大会費用・渡航費等の実費。最終条件により変更の可能性があります。";
export const unitedProjects = [
  {
    slug: "rba-united-malaysia-mvpibc-2026",
    title: "RBA UNITED Malaysia 2026",
    tournament: "MVP International Basketball Championship",
    date: "U13・U11：2026年12月10〜13日／U15・U17：12月5〜8日／3x3：12月9日（カテゴリー確認中）",
    audience: "男女カテゴリーあり。主な募集対象はU13。U13：2013年以降生まれ／U11：2015年以降／U15：2011年以降／U17：2009年以降。資料の「high school student」表記との矛盾は確認中です。最終参加資格は主催者の判断を優先します。",
    place: "マレーシア・プチョン／SJKC Han Ming Puchong",
    summary: "海外の選手との対戦を通して、判断やプレー、文化の違いを経験し、所属チームでの毎日に持ち帰る国際大会参加企画です。",
    availability: null as number | null,
    endDate: "2026-12-13",
  },
  {
    slug: "rba-united-incheon-iyibs-2027",
    title: "RBA UNITED Korea 2027",
    tournament: "Incheon Youth International Basketball Series",
    date: "大会：2027年1月29〜31日（行程例では1月28日到着）",
    audience: "U12・U15・U17の男女。生年の基準は主催者へ確認中です。日本の学年だけで参加資格は確定しません。",
    place: "韓国・仁川",
    summary: "期間限定のチームで国際大会へ。異なるサイズやスピード、判断に触れ、新しい仲間と学ぶ経験を普段の環境へつなげます。",
    availability: null as number | null,
    endDate: "2027-01-31",
  },
];
export type UnitedProject = (typeof unitedProjects)[number];
export function openUnitedProjects(now = new Date()) {
  const today = now.toLocaleDateString("sv-SE", {timeZone: "Asia/Tokyo"});
  return unitedProjects.filter(project => project.endDate >= today);
}
