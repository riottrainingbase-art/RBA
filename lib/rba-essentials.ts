// RBA ESSENTIALS / pre-launch collection. Do not add checkout URLs or publish offers
// until samples, pricing, production rights, delivery, tax and returns are approved.
export const ESSENTIALS_INTEREST_FORM = "https://form.jotform.com/262947168647069";
export const ESSENTIALS_MODEL_IMAGE = "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-model-concept-white-tee-black-set-20261116.png?v=1794836678";
export const ESSENTIALS_INSTAGRAM = "https://www.instagram.com/riot.basketball.academy/";
export const ESSENTIALS_HERO_IMAGE = "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essentials-editorial-2026.jpg?v=1794827351";

export const essentials = [
  {
    slug: "tee",
    number: "01",
    name: "ESSENTIAL TEE",
    title: "RBA Essential Tee",
    color: "WHITE",
    colorJa: "ホワイト",
    image: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essential-white-tee-concept.jpg?v=1794827358",
    alt: "RBAの白いTシャツのデザインイメージ。首元にブランド表示、右裾に小さなロゴワッペン。",
    statement: "何も足さない。その潔さを着る。",
    description: "白を主役に。胸も背中も無地のまま、裾にだけ小さくRBAのアイデンティティを刻む。練習の前も、街に出る日も。",
    details: ["ゆとりのあるシルエットを検討中", "胸・背面は無地", "裾に公式ロゴの小型織ワッペン", "首裏にRBAブランド表示"],
    shape: "Relaxed silhouette / minimal branding",
    sizeNote: "S / M / L / XL を候補として検討中。実寸表はサンプル確認後に公開します。",
    pagePath: "/ja/essentials/tee",
  },
  {
    slug: "setup",
    number: "02",
    name: "ESSENTIAL SETUP",
    title: "RBA Essential Setup",
    color: "BLACK",
    colorJa: "ブラック",
    image: "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-essential-black-setup-concept.jpg?v=1794827364",
    alt: "RBAの黒いオーバーサイズパーカーとワイドスウェットパンツの上下セットのデザインイメージ。",
    statement: "静かに、強く。",
    description: "厚みと落ち感で魅せるブラック。ドロップショルダーのフーディと、ゆとりを持たせたワイドパンツ。ロゴはあくまで控えめに。",
    details: ["プルオーバー型・ドロップショルダー", "身幅にゆとりのあるボックスシルエット", "ワイドストレートのスウェットパンツ", "上下共通の公式ロゴワッペン"],
    shape: "Boxy hoodie / wide straight trousers",
    sizeNote: "サイズ展開・着丈・股下・生地厚はサンプル確認後に公開します。",
    pagePath: "/ja/essentials/setup",
  },
] as const;
export type EssentialsProduct = (typeof essentials)[number];
