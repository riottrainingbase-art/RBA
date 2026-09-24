export const HOMECOURT_PRICE_JPY = 3300;
export const homecourtFreeRegistrationUrl = (locale:"en"|"ja"|"zh-tw"|"ko") => `${locale==="en"?"":`/${locale}`}/my-homecourt/login`;
export const PARENT_COMMUNITY_URL = "https://tinyurl.com/2nhmh545";
export const COACH_COMMUNITY_URL = "https://tinyurl.com/5n7a9sjx";

export type HomecourtRole = "players" | "families" | "coaches";

export const homecourtRoles: Record<HomecourtRole, {
  label: string;
  shortLabel: string;
  description: string;
  items: string[];
}> = {
  players: {
    label: "選手の方へ",
    shortLabel: "PLAYER",
    description: "次に参加できる活動や、成長につながる学びを見つけるためのページです。",
    items: ["募集中のクリニック・キャンプ", "練習や試合に生かす育成コンテンツ", "参加後の振り返りと次の挑戦"],
  },
  families: {
    label: "保護者の方へ",
    shortLabel: "PARENT",
    description: "対象年代、費用、安全面、申込・決済の流れをまとめて確認できるページです。",
    items: ["申込状況と次に必要な手続き", "参加規約・安全方針・キャンセル条件", "保護者向けのお知らせとサポート"],
  },
  coaches: {
    label: "コーチ・指導者の方へ",
    shortLabel: "COACH",
    description: "指導者講習、RBAプログラムの開催、地域連携について確認できるページです。",
    items: ["指導者向け講習・育成記事", "クリニック開催の相談", "開催・連携パートナーの案内"],
  },
};