import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "RBA公式サービス案内｜選手・指導者・チーム・企業",
  description: "Riot Basketball Academyの継続育成、指導者教育、チーム訪問、企業広告・企画協賛。料金と契約条件を混同せず、目的に合った公式窓口へご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/services" },
  openGraph: {
    title: "RBAの学びと連携｜公式サービス案内",
    description: "選手・保護者、指導者、地域チーム、企業のためのRBA公式サービス。",
    url: "https://riotbasketballacademy.com/ja/services",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: ["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
};

const plans = [
  {
    id: "families",
    eyebrow: "FOR PLAYERS & FAMILIES / 01",
    title: "選手・保護者",
    subtitle: "一度の練習で終わらない育成",
    fee: "月額3,300円",
    feeNote: "HOMECOURT 月額プランの登録台帳上の料金。税込・適用期間を含む最新の正式条件は申込画面で確認してください。無料で知る導線もあります。",
    body: "日々の目標・振り返り、育成の記事、必要な機会を自分のペースで探す。スクール・クラブ・遠征への参加費とは別です。",
    primary: { label: "HOMECOURTを確認する", href: "/ja/home-court", tracking: "growth-services-homecourt" },
    secondary: { label: "仙台スクール・体験を探す", href: "/ja/sendai-school", tracking: "growth-services-school" },
  },
  {
    id: "coaches",
    eyebrow: "FOR COACHES / 02",
    title: "指導者の学び",
    subtitle: "現場で試し、振り返る",
    fee: "月額3,300円",
    feeNote: "D-HUB COACH LABの登録料金。講師招聘・単発オンライン講習等は別料金です。",
    body: "指導課題・練習設計・ゲームでの判断・長期育成を扱う継続プログラム。単なる動画視聴の販売ではありません。",
    primary: { label: "D-HUBの内容を確認する", href: "/ja/d-hub", tracking: "growth-services-dhub" },
    secondary: { label: "指導者向け情報を見る", href: "/ja/coaches", tracking: "growth-services-coaches" },
  },
  {
    id: "teams",
    eyebrow: "FOR CLUBS & ORGANISERS / 03",
    title: "チーム・地域主催者",
    subtitle: "現場で指導する。課題から設計する。",
    fee: "3時間 33,000円〜",
    feeNote: "登録済み参考価格：半日55,000円／終日88,000円。施設費・移動費・税区分・最終提供内容は個別確認。見積前の支払いは不要です。",
    body: "既存チームの課題、対象年代、人数、体育館、指導者配置を伺い、技術・判断・ゲーム理解を結び付けたクリニックをご提案します。",
    primary: { label: "無料で開催を相談する", href: "/ja/clinic-request", tracking: "growth-services-team-enquiry" },
    secondary: { label: "TEAM TRAININGを見る", href: "/ja/team-training", tracking: "growth-services-team-info" },
  },
  {
    id: "corporate",
    eyebrow: "FOR BUSINESSES / 04",
    title: "企業・地域パートナー",
    subtitle: "子どもの学びを、事業として支える。",
    fee: "月額11,000円",
    feeNote: "企業広告1口（税込）。協賛・単発支援・年間冠事業とは別の契約。既存契約の重複決済は不要です。",
    body: "月額広告は公式ページと活動レポートへの掲出。育成企画の協賛や地域連携は、期間・権利・支援の形を協議して決めます。",
    primary: { label: "企業広告の条件を見る", href: "/ja/support", tracking: "growth-services-corporate-ad" },
    secondary: { label: "企画協賛を相談する", href: "/ja/partners", tracking: "growth-services-sponsor-enquiry" },
  },
] as const;

export default function ServicesPage() {
  return (
    <SiteFrame locale="ja">
      <main className={styles.page}>
        <GrowthClickTracking />
        <section className={styles.hero}>
          <div className={styles.wrap}>
            <a className={styles.back} href="/ja">← RBAトップページ</a>
            <div className={styles.brand}>
              <Image src="/rba-logo-original.jpg" width={48} height={68} alt="RBA公式ロゴ" priority />
              <span>RIOT BASKETBALL ACADEMY / OFFICIAL SERVICES</span>
            </div>
            <p className={styles.kicker}>CHOOSE THE RIGHT NEXT STEP</p>
            <h1>学びも、協力も。<br/><span>あなたに合う入口から。</span></h1>
            <p className={styles.lead}>RBAのサービスは、用途や契約がそれぞれ異なります。料金・対象・申込先をひとつのページで比較し、必要なものだけを選べるよう整理しました。</p>
            <nav className={styles.heroActions} aria-label="サービス対象別の案内">
              <a href="#families">選手・保護者</a>
              <a href="#coaches">指導者</a>
              <a href="#teams">チーム・主催者</a>
              <a href="#corporate">企業</a>
            </nav>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={styles.sectionIntro}>
              <p className={styles.kicker}>4 TYPES OF SUPPORT</p>
              <h2>売るものを増やす前に、<br/>選びやすい状態をつくる。</h2>
              <p>イベントの参加費、月額プログラム、訪問指導、企業広告をひとつの決済商品として扱いません。それぞれ既存の正規窓口・規約でお申し込みください。</p>
            </div>
            <div className={styles.cards}>
              {plans.map(plan => (
                <article key={plan.id} id={plan.id} className={styles.card}>
                  <div className={styles.cardMeta}>{plan.eyebrow}</div>
                  <div className={styles.cardHeading}>
                    <div><h3>{plan.title}</h3><p className={styles.subtitle}>{plan.subtitle}</p></div>
                    <span className={styles.fee}>{plan.fee}</span>
                  </div>
                  <p className={styles.body}>{plan.body}</p>
                  <p className={styles.feeNote}>{plan.feeNote}</p>
                  <div className={styles.cardActions}>
                    <a data-growth-id={plan.primary.tracking} href={plan.primary.href} className={styles.primary}>{plan.primary.label} <span aria-hidden="true">→</span></a>
                    <a data-growth-id={plan.secondary.tracking} href={plan.secondary.href} className={styles.secondary}>{plan.secondary.label} <span aria-hidden="true">→</span></a>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.advancedCallout}>
              <div><span>RBA ADVANCED SERVICES</span><strong>より深い育成・個別サポートへ。</strong><p>現行の月額会員・チーム訪問の提供範囲と、新たな個別メンタリング・継続支援・企業研修の相談窓口をまとめました。新しい個別サービスはまだ有料申込ではなく、無料相談・見積のみです。</p></div>
              <a data-growth-id="growth-services-advanced" href="/ja/services/advanced">有料サービス詳細と個別相談へ →</a>
            </div>
          </div>
        </section>
        <section className={styles.flow}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>TRANSPARENT PROCESS</p>
            <h2>誤って申し込まないために。</h2>
            <div className={styles.steps}>
              <div><b>01</b><h3>目的を選ぶ</h3><p>年齢、現在のチーム、指導上の課題、企業の支援目的から適切な入口を確認。</p></div>
              <div><b>02</b><h3>条件を確認</h3><p>実施日、会場、対象、追加経費、権利、キャンセル条件が確定しているかを確認。</p></div>
              <div><b>03</b><h3>正式に申し込む</h3><p>正規フォーム・決済を利用。予約未確定の事業は希望登録と有料申込を分けます。</p></div>
              <div><b>04</b><h3>学びを続ける</h3><p>参加・活動報告・振り返りへ。継続課金は各プランの契約条件に従います。</p></div>
            </div>
            <p className={styles.footnote}>本ページは各サービスへの公式案内です。予約、在庫、入金、参加資格を保証するものではありません。特に海外・宿泊・未成年者の遠征は別途安全・施設条件を確認します。2026年11月23日確認の料金を参考表示しています。条件の更新時は各申込画面・個別見積を優先してください。</p>
          </div>
        </section>
        <section className={styles.closer}>
          <div className={styles.wrap}>
            <h2>まずは、相談から。</h2>
            <p>「何を申し込めばいいか分からない」という段階でも大丈夫です。参加希望と正式な申込・請求を混同せず、ご案内します。</p>
            <a href="/ja/contact" data-growth-id="growth-services-general-contact">RBAに問い合わせる →</a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
