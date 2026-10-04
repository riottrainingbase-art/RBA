import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, MapPinned, ShieldCheck, UserRoundCog, UsersRound } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { NetworkMaps } from "@/components/network-maps";
import { japanPoints, plannedJapanPoints } from "@/components/network-data";

export const metadata: Metadata = {
  title: { absolute: "RBA 全国活動マップ｜バスケットボール育成クリニック・キャンプ・地域拠点" },
  description:
    "Riot Basketball Academy（RBA）の全国活動マップ。国土地理院の地理院タイルを背景に、これまでの活動地域、開催予定、地域詳細ページ、今後掲載する地域責任者情報を一つの地図から確認できます。",
  keywords: [
    "RBA 全国",
    "バスケットボール クリニック 全国",
    "ミニバス クリニック",
    "U12 バスケ クリニック",
    "U15 バスケ クリニック",
    "バスケットボール キャンプ",
    "Riot Basketball Academy",
  ],
  alternates: { canonical: "https://riotbasketballacademy.com/ja/regions" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "RBA 全国活動マップ｜地域から育成機会を探す",
    description: "活動実績、開催予定、地域詳細、地域責任者を全国地図から確認できるRBAの地域ネットワーク。",
    url: "https://riotbasketballacademy.com/ja/regions",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA 全国活動マップ",
    description: "地域からRBAの育成機会を探す。",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const steps = [
  ["01", "地図から探す", "番号または地域一覧を押すと、その場所の活動内容、都道府県・市地域、代表座標、地域責任者欄が表示されます。"],
  ["02", "地域ページへ進む", "継続開催地域は、順次専用ページを整備。過去の活動、次回予定、地域の育成方針を一つにまとめます。"],
  ["03", "責任者を明確にする", "地域責任者が正式に決まった拠点から、氏名・役割を掲載できるデータ構造にしています。未確定の段階では推測で名前を載せません。"],
  ["04", "全国から次の機会へ", "地域のクリニックだけで終わらず、Development Camp、RBA UNITED、指導者学習、Japan × Asiaへつなげます。"],
] as const;

export default function RegionsPage() {
  const stats = {
    activity: japanPoints.length,
    planned: plannedJapanPoints.length,
  };

  const pageJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RBA 全国活動マップ",
    url: "https://riotbasketballacademy.com/ja/regions",
    inLanguage: "ja",
    dateModified: "2026-10-04",
    isPartOf: {
      "@type": "WebSite",
      name: "Riot Basketball Academy",
      url: "https://riotbasketballacademy.com/",
    },
    about: ["日本 バスケットボール クリニック", "ミニバス", "U12", "U15", "育成キャンプ", "地域育成"],
  };

  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "RBA", item: "https://riotbasketballacademy.com/ja" },
      { "@type": "ListItem", position: 2, name: "全国活動マップ", item: "https://riotbasketballacademy.com/ja/regions" },
    ],
  };

  return (
    <SiteFrame locale="ja">
      <div className="journal-hub journal-cms regions-hub">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }} />

        <section className="journal-cms-hero section-pad">
          <p className="section-index">RBA JAPAN / NATIONAL NETWORK</p>
          <h1>
            全国の活動を、<br />
            一枚の地図から。
          </h1>
          <p>
            「どこで活動しているのか」「次はどこで参加できるのか」「その地域では誰が窓口なのか」を、
            地域ごとに探せる全国ネットワークへ。地図の背景には国土地理院の地理院タイルを使用し、
            各拠点は代表地点の緯度・経度から配置しています。
          </p>
          <div className="homecourt-launch-actions">
            <Link className="button button-dark" href="#network">
              全国地図を見る <MapPinned size={17} />
            </Link>
            <Link className="button button-light" href="/ja/opportunities">
              募集中の活動を見る <ArrowRight size={17} />
            </Link>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">CURRENT NETWORK</p>
              <h2>実績と予定を、分けて表示。</h2>
            </div>
            <p>
              開催した地域と、これから開催する予定の地域を同じ扱いにはしません。
              地図上のステータスを分け、実績を予定のように見せたり、予定を実績のように見せたりしない設計です。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            <article><MapPinned /><span>ACTIVITY RECORD</span><h3>{stats.activity}</h3><p>現在のデータ上で活動実績として登録している地域・地点。</p></article>
            <article><Compass /><span>PLANNED</span><h3>{stats.planned}</h3><p>開催予定として分離して表示している地域・地点。</p></article>
            <article><UsersRound /><span>REGIONAL PAGE</span><h3>EXPANDING</h3><p>佐賀から専用地域ページを開始。継続開催地域へ順次広げます。</p></article>
            <article><UserRoundCog /><span>REGIONAL LEAD</span><h3>READY</h3><p>責任者名と役割を後から安全に追加できる構造を実装しています。</p></article>
          </div>
        </section>

        <NetworkMaps locale="ja" japanOnly />

        <section className="journal-evidence-standard section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">HOW THE NETWORK GROWS</p>
              <h2>
                全国展開しても、<br />
                情報を雑に増やさない。
              </h2>
            </div>
            <p>
              拠点数だけを増やすのではなく、場所、活動実績、次回予定、地域責任者、詳細ページを同じルールで管理します。
            </p>
          </div>
          <div className="journal-evidence-grid">
            {steps.map(([n, title, body]) => (
              <article key={n}>
                <span>{n} / NETWORK STANDARD</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="homecourt-plan-separation section-pad">
          <div className="homecourt-plan-intro">
            <p className="section-index">REGIONAL LEAD / FUTURE READY</p>
            <h2>
              地域責任者を、<br />
              後から正式に掲載できる。
            </h2>
            <p>
              現在の地図データには、各拠点ごとに「地域責任者」の情報欄を用意しています。
              氏名・役割が正式に決まるまでは「後日掲載」と表示し、候補者や未確認の名前は公開しません。
            </p>
          </div>
          <div className="homecourt-plan-grid">
            <article className="homecourt-plan-card">
              <UserRoundCog />
              <span>WHEN CONFIRMED</span>
              <h3>氏名・役割を追加</h3>
              <p>地域責任者、開催コーディネーターなど、正式な役割が確定した時点で掲載できます。</p>
            </article>
            <article className="homecourt-plan-card">
              <ShieldCheck />
              <span>BEFORE CONFIRMATION</span>
              <h3>推測で載せない</h3>
              <p>本人同意や役割確認が取れていない段階では、名前を公開せず「後日掲載」とします。</p>
            </article>
          </div>
        </section>

        <section className="network-release section-pad">
          <MapPinned />
          <div>
            <p className="section-index">BUILD A REGIONAL HUB</p>
            <h2>
              あなたの地域にも、<br />
              継続する育成機会を。
            </h2>
            <p>
              体育館、地域チーム、指導者、企業・団体などと連携し、一度きりではない開催モデルをつくります。
              開催候補地は「実績」と分けて管理し、決まった情報から順に公開します。
            </p>
          </div>
          <div>
            <Link className="button button-member" href="/ja/regional-host">
              地域開催について見る <ArrowRight size={16} />
            </Link>
            <Link className="text-link" href="/ja/contact">
              RBAに相談する <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
