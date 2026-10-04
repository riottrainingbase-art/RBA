import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, MapPinned, ShieldCheck, UserRoundCog, UsersRound } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { NetworkMaps } from "@/components/network-maps";
import { japanPoints, plannedJapanPoints } from "@/components/network-data";

export const metadata: Metadata = {
  title: { absolute: "RBA全国活動マップ｜バスケットボール育成クリニック・キャンプ・地域拠点" },
  description:
    "Riot Basketball Academy（RBA）の全国活動マップ。国土地理院の地理院タイルを背景に、これまでの活動地域、今後の開催予定、地域ごとの詳細ページ、確認済みの地域責任者情報を一つの地図から確認できます。",
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
    title: "RBA全国活動マップ｜地域から育成機会を探す",
    description: "活動実績、開催予定、地域ごとの詳細情報を全国地図から確認できるRBAの地域ネットワーク。",
    url: "https://riotbasketballacademy.com/ja/regions",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBA全国活動マップ",
    description: "地域からRBAの育成機会を探す。",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const steps = [
  ["01", "地図から探す", "番号または地域名を選ぶと、その場所の活動内容、都道府県・市区町村などの地域情報、地図上の代表地点を確認できます。"],
  ["02", "地域ページへ進む", "継続して開催している地域から、順次専用ページを整備します。これまでの活動、次回予定、地域で大切にする育成方針を一つにまとめます。"],
  ["03", "責任者を明確にする", "地域責任者が正式に決まった拠点から、氏名と役割を掲載します。役割が確認できていない段階では、推測で名前を載せません。"],
  ["04", "地域から次の機会へ", "地域のクリニックだけで終わらず、Development Camp、RBA UNITED、指導者向けの学び、Japan × Asiaへと選択肢を広げます。"],
] as const;

export default function RegionsPage() {
  const stats = {
    activity: japanPoints.length,
    planned: plannedJapanPoints.length,
  };

  const pageJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RBA全国活動マップ",
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
            「どこで活動しているのか」「次はどこで参加できるのか」「その地域の詳しい情報はどこで見られるのか」を、
            一つの地図から探せるようにしました。背景地図には国土地理院の地理院タイルを使用し、
            地図上の位置は各地域の代表地点をもとに表示しています。
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
              <h2>活動実績と開催予定を、分けて表示。</h2>
            </div>
            <p>
              これまでに開催した地域と、これから開催を予定している地域は明確に分けて表示します。
              どこまでが実績で、どこからが予定なのかが一目で分かるようにしています。
            </p>
          </div>
          <div className="homecourt-preview-grid">
            <article><MapPinned /><span>ACTIVITY RECORD</span><h3>{stats.activity}</h3><p>現在、活動実績として掲載している地域・地点です。</p></article>
            <article><Compass /><span>PLANNED</span><h3>{stats.planned}</h3><p>今後の開催予定として、活動実績とは分けて掲載している地域・地点です。</p></article>
            <article><UsersRound /><span>REGIONAL PAGE</span><h3>EXPANDING</h3><p>佐賀を最初の専用地域ページとして公開し、継続して開催している地域へ順次広げます。</p></article>
            <article><UserRoundCog /><span>REGIONAL LEAD</span><h3>READY</h3><p>地域責任者が正式に決まった地域から、確認できた氏名と役割を掲載します。</p></article>
          </div>
        </section>

        <NetworkMaps locale="ja" japanOnly />

        <section className="journal-evidence-standard section-pad">
          <div className="section-head">
            <div>
              <p className="section-index">HOW THE NETWORK GROWS</p>
              <h2>
                全国に広がっても、<br />
                情報の基準は揃える。
              </h2>
            </div>
            <p>
              拠点数だけを増やすのではなく、場所、活動実績、次回予定、地域責任者、詳細ページを同じ基準で整理して公開します。
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
              地域責任者は、<br />
              確認できた情報だけを掲載する。
            </h2>
            <p>
              各拠点には「地域責任者」の情報欄を用意しています。
              氏名と役割が正式に確認できるまでは「確認後に掲載」とし、候補者や未確認の名前は公開しません。
            </p>
          </div>
          <div className="homecourt-plan-grid">
            <article className="homecourt-plan-card">
              <UserRoundCog />
              <span>WHEN CONFIRMED</span>
              <h3>確認できた氏名・役割を掲載</h3>
              <p>地域責任者や開催コーディネーターなど、正式な役割が確認できた時点で掲載します。</p>
            </article>
            <article className="homecourt-plan-card">
              <ShieldCheck />
              <span>BEFORE CONFIRMATION</span>
              <h3>未確認の名前は載せない</h3>
              <p>本人同意や役割の確認が取れていない段階では、名前を公開せず「確認後に掲載」とします。</p>
            </article>
          </div>
        </section>

        <section className="network-release section-pad">
          <MapPinned />
          <div>
            <p className="section-index">BUILD A REGIONAL HUB</p>
            <h2>
              あなたの地域にも、<br />
              継続できる育成機会を。
            </h2>
            <p>
              体育館、地域のチーム、指導者、企業・団体などと連携し、一度きりで終わらない開催の形をつくります。
              開催候補地は活動実績と分けて管理し、確定した情報から順に公開します。
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
