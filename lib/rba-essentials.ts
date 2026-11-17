// RBA STORE public-facing collection / internal RBA ESSENTIALS IDs remain stable. Do not add checkout URLs or publish offers
// until samples, pricing, production rights, delivery, tax and returns are approved.
export const ESSENTIALS_INTEREST_FORM = "https://form.jotform.com/263193283498065";
export const ESSENTIALS_INSTAGRAM = "https://www.instagram.com/riot.basketball.academy/";
export const ESSENTIALS_HERO_IMAGE = "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-white-tee-official-design-reference-20261116.jpg?v=1794837114";
export const ESSENTIALS_SETUP_IMAGE = "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-black-hoodie-setup-official-design-reference-20261116.jpg?v=1794837122";

export const essentials = [
  {
    slug: "tee",
    number: "01",
    name: "WHITE TEE",
    title: "RBA White Tee",
    color: "WHITE",
    colorJa: "ホワイト",
    image: ESSENTIALS_HERO_IMAGE,
    alt: "RBAの白いTシャツのデザインイメージ。首元にブランド表示、右裾に小さなロゴワッペン。",
    statement: "特別な日だけじゃない。いつもの日にも、バスケットボールを。",
    description: "白を主役に。胸も背中も無地のまま、裾にだけ小さくRBAのアイデンティティを刻む。練習の前も、街に出る日も。",
    details: ["ゆとりのあるシルエットを検討中", "胸・背面は無地", "裾に公式ロゴの小型ロゴワッペン", "首裏にRBAブランド表示"],
    shape: "Relaxed silhouette / minimal branding",
    sizeNote: "S / M / L / XL を候補として検討中。実寸表はサンプル確認後に公開します。",
    pagePath: "/ja/essentials/tee",
  },
  {
    slug: "setup",
    number: "02",
    name: "BLACK SETUP",
    title: "RBA Black Setup",
    color: "BLACK",
    colorJa: "ブラック",
    image: ESSENTIALS_SETUP_IMAGE,
    alt: "RBAの黒いオーバーサイズパーカーとワイドスウェットパンツの上下セットのデザインイメージ。",
    statement: "コートを離れても、変わらないものがある。",
    description: "厚みと落ち感で魅せるブラック。ドロップショルダーのフーディと、ゆとりを持たせたワイドパンツ。ロゴはあくまで控えめに。",
    details: ["プルオーバー型・ドロップショルダー", "身幅にゆとりのあるボックスシルエット", "ワイドストレートのスウェットパンツ", "上下共通の公式ロゴワッペン"],
    shape: "Boxy hoodie / wide straight trousers",
    sizeNote: "サイズ展開・着丈・股下・生地厚はサンプル確認後に公開します。",
    pagePath: "/ja/essentials/setup",
  },
] as const;
export type EssentialsProduct = (typeof essentials)[number];
