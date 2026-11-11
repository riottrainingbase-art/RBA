import type { Metadata } from "next";
import Link from "next/link";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { SiteFrame } from "@/components/site-frame";
import styles from "./supporters.module.css";

const noteJoinUrl = "https://note.com/rba_official/membership/join";

export const metadata: Metadata = {
  title: "RBA応援メンバー｜月500円から育成活動を支える",
  description: "Riot Basketball Academyの応援会員。月500円の活動応援と月1,000円の育成記事プランを整理。特典・更新・退会条件は公式noteでご確認ください。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/supporters" },
  openGraph: {
    title: "RBA応援メンバー｜次の育成機会を、ともに",
    description: "育成活動の応援は月500円から。無料で読む、月額で支える、学びを続ける。違いがわかる公式案内です。",
    url: "https://riotbasketballacademy.com/ja/supporters",
    type: "website",
  },
};

export default function SupportersPage() {
  return (
    <SiteFrame locale="ja">
      <GrowthClickTracking />
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="supporters-title">
          <div className={styles.container}>
            <Link className={styles.back} href="/ja">← RBAトップへ</Link>
            <p className={styles.kicker}>RIOT BASKETBALL ACADEMY / SUPPORTERS</p>
            <h1 id="supporters-title">育つチャンスを、<br />一緒につくる。</h1>
            <p className={styles.intro}>
              子どもたちの練習、挑戦、学びが続くように。
              RBAの活動を見守り、必要なときに支えてくださる方のためのご案内です。
            </p>
            <a className={styles.primary} href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-note-join">
              note公式メンバーシップを見る <span aria-hidden="true">↗</span>
            </a>
            <p className={styles.heroNote}>入会・決済は外部サービス「note」で行います。加入前に最新の特典・月額料金・更新条件をご確認ください。</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="supporters-choose-title">
          <div className={styles.container}>
            <p className={styles.kicker}>CHOOSE YOUR WAY</p>
            <h2 id="supporters-choose-title">まずは、無理のない関わり方から。</h2>
            <div className={styles.planGrid}>
              <article className={styles.plan}>
                <span className={styles.planLabel}>01 / 無料</span>
                <h3>RBAの育成記事を読む</h3>
                <p>子どもの成長、出場機会、練習の考え方。まずは無料のRBA JOURNALから知ってください。</p>
                <Link href="/ja/journal" data-growth-id="supporters-free-journal">無料記事を見る →</Link>
              </article>
              <article className={styles.plan}>
                <span className={styles.planLabel}>02 / 応援メンバー</span>
                <p className={styles.price}><strong>500</strong>円 <span>/ 月</span></p>
                <h3>RBAの活動を応援する</h3>
                <p>育成の機会を継続して支えたい方向け。正式な特典と提供条件はnoteの該当プランをご確認ください。</p>
                <a href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-500-note">月500円プランを確認 ↗</a>
              </article>
              <article className={styles.plan}>
                <span className={styles.planLabel}>03 / 育成記事プラン</span>
                <p className={styles.price}><strong>1,000</strong>円 <span>/ 月</span></p>
                <h3>育成を継続して学ぶ</h3>
                <p>指導者・保護者向けの育成記事をより深く読みたい方へ。閲覧できる記事と条件はnoteで確認できます。</p>
                <a href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-1000-note">月1,000円プランを確認 ↗</a>
              </article>
            </div>
            <p className={styles.disclaimer}>価格と特典は変更される場合があります。実際のお申し込み画面に表示される内容を優先してください。月額プランと単品記事、スクール月謝、クリニック参加費は別です。</p>
          </div>
        </section>

        <section className={styles.sectionAlt} aria-labelledby="supporters-flow-title">
          <div className={styles.container}>
            <p className={styles.kicker}>FROM INTEREST TO SUPPORT</p>
            <h2 id="supporters-flow-title">RBAとのつながり方</h2>
            <div className={styles.flow}>
              <div><span>01</span><strong>知る</strong><p>育成記事や活動予定を無料で確認</p></div>
              <div><span>02</span><strong>選ぶ</strong><p>必要な活動・学び・応援方法を選択</p></div>
              <div><span>03</span><strong>続ける</strong><p>無理のない形で活動と学びに関わる</p></div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="supporters-faq-title">
          <div className={styles.container}>
            <p className={styles.kicker}>BEFORE YOU JOIN</p>
            <h2 id="supporters-faq-title">入会前によくある質問</h2>
            <div className={styles.faq}>
              <details><summary>月額会員になると、クリニックにも無料で参加できますか？</summary>
                <p>いいえ。クリニック・キャンプの参加条件や費用は、各企画の公式案内をご確認ください。会員資格のみで参加を確約するものではありません。</p>
              </details>
              <details><summary>会員向けの交流会はありますか？</summary>
                <p>クリニックに合わせた交流企画を検討しています。開催の有無、日時、場所、参加条件は決まり次第案内します。すべての回で実施することは確約していません。</p>
              </details>
              <details><summary>月500円と月1,000円の違いは？</summary>
                <p>月500円はRBAの活動を応援する入口、月1,000円は育成記事をより深く読みたい方向けの案内です。実際の閲覧権限や特典はnoteでのプラン説明を優先してください。</p>
              </details>
              <details><summary>支払い・更新・退会の手続きは？</summary>
                <p>月額プランの申込・更新・解約はnote側で管理されます。加入前に、noteの最新の規約と各プランの条件をご確認ください。</p>
              </details>
            </div>
            <div className={styles.bottomActions}>
              <a className={styles.primary} href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-final-note">公式noteでプランを確認 <span aria-hidden="true">↗</span></a>
              <Link className={styles.outline} href="/ja/opportunities" data-growth-id="supporters-programmes">募集中の活動を見る →</Link>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
