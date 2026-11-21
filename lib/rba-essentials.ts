// RBA STORE public-facing collection / internal RBA ESSENTIALS IDs remain stable. Do not add checkout URLs or publish offers
// until samples, pricing, production rights, delivery, tax and returns are approved.
export const ESSENTIALS_INTEREST_FORM = "https://form.jotform.com/263193283498065";
export const ESSENTIALS_INSTAGRAM = "https://www.instagram.com/riot.basketball.academy/";
export const ESSENTIALS_COLLECTION_GALLERY = [
  {src:"https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-collection-001-group-flatlay-concept-20261120.jpg?v=1795103039",alt:"RBA COLLECTION 001 白Tシャツ、黒フーディー、黒パンツの3点。デザイン検討用イメージ。",label:"COLLECTION 001 / LINEUP"},
  {src:"https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-collection-001-group-editorial-concept-20261120.jpg?v=1795103061",alt:"RBA WHITE TEEとBLACK SETUPのレイアウト提案。実物商品写真ではありません。",label:"COLLECTION 001 / STYLING"}
] as const;

export const ESSENTIALS_HERO_IMAGE = "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-white-tee-concept-detail-20261120.jpg?v=1795103081";
export const ESSENTIALS_SETUP_IMAGE = "https://cdn.shopify.com/s/files/1/0841/4098/2529/files/rba-black-setup-concept-detail-20261120.jpg?v=1795103099";

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
    description: "WHITE TEE / 7.1oz・綿100％。United Athle 4252-01の厚手コットンボディを使用する仕様です。胸と背中は無地、裾と首元にRBAの小さなブランド表現を入れます。",
    details: ["生地：United Athle 4252-01 ／ 7.1オンス ／ 綿100％・オープンエンド糸", "ホワイトボディ・胸／背面は無地", "右裾の小型RBAワッペン／正式版下を使用", "首裏にRBAブランド表示／加工耐久性は量産前に検品"],
    shape: "Relaxed silhouette / minimal branding",
    sizeNote: "S / M / L / XLのサイズ選択を想定しています。メーカー実寸表と実際の加工後寸法はサンプル確認後に公開します。",
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
    alt: "RBA BLACK SETUPのデザインイメージ。CGのパンツはワイド型だが、採用予定のUnited Athle 5765-01は裾が絞られた仕様で、実物商品写真ではありません。",
    statement: "コートを離れても、変わらないものがある。",
    description: "BLACK SETUP / 12.0oz裏起毛。United Athle 5763-01フーディーと5765-01パンツを揃える上下セット。綿75％・ポリエステル25％（ブラック）、控えめなRBAワッペンのデザインです。",
    details: ["フーディ：United Athle 5763-01／12.0オンス裏起毛／綿75％・ポリエステル25％", "パンツ：United Athle 5765-01／同じ12.0オンス裏起毛・混用率", "メーカー5765-01の裾はシャーリング仕様。CGのワイドストレート裾とは形状が異なります", "上下に小型RBAワッペン。フーディとパンツのサイズを個別に選択"],
    shape: "12oz fleece hoodie / gathered-hem sweat trousers",
    sizeNote: "メーカー参考サイズはフーディS〜XXL／パンツM〜XL。上下は別々にサイズを指定できます。加工後の実寸表はサンプル確認後に公開します。",
    pagePath: "/ja/essentials/setup",
  },
] as const;
export type EssentialsProduct = (typeof essentials)[number];
