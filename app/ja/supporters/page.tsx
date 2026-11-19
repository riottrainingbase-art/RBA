import type { Metadata } from "next";
import Link from "next/link";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { SiteFrame } from "@/components/site-frame";
import styles from "./supporters.module.css";

const noteJoinUrl = "https://note.com/rba_official/membership/join";

export const metadata: Metadata = {
  title: "日本の育成を、仕方ないで終わらせない｜RBA応援メンバー月500円から",
  description: "月500円からRBAの育成活動を継続して応援。月1,000円の育成記事プランも。子どもたちの学びと挑戦を支える参加方法をご案内します。",
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
            <h1 id="supporters-title">日本の育成を、<br />「仕方ない」で終わらせない。</h1>
            <p className={styles.intro}>
              試合に出る子も、出られない子も。誰もがバスケットボールを学び、挑戦できる環境を。
              月500円から、育成の選択肢を広げる活動の仲間になってください。
            </p>
            <a className={styles.primary} href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-note-join">
              月500円から応援する <span aria-hidden="true">↗</span>
            </a>
            <p className={styles.heroNote}>気軽な月500円の応援、学びを深める月1,000円。どちらも任意の月額プランです。入会・決済・更新・退会はnote側で管理されます。</p>
          </div>
        </section>

        <section className={styles.sectionAlt} aria-labelledby="supporters-purpose-title">
          <div className={styles.container}>
            <p className={styles.kicker}>WHY WE ASK</p>
            <h2 id="supporters-purpose-title">「勝つ」だけでなく、「育つ」を残したい。</h2>
            <p className={styles.lead}>出場機会、練習の量、選手の声、休むことへの理解。育成年代で見過ごしたくない課題があります。RBAは、選手・保護者・指導者が学び直し、地域を越えて挑戦できる環境を少しずつ形にしていきます。</p>
            <div className={styles.reasonGrid}>
              <article><span>01 / PLAYERS</span><h3>子どもたちの選択肢を増やす</h3><p>今いるチームだけが世界のすべてにならないよう、別の指導や環境と出会う機会を。</p></article>
              <article><span>02 / COACHES</span><h3>指導を問い直せる場をつくる</h3><p>経験則だけでなく、育成の根拠や練習設計を持ち寄り、よりよい指導を考える。</p></article>
              <article><span>03 / COMMUNITY</span><h3>挑戦を一度きりで終わらせない</h3><p>単発の企画で終えず、次の学びにつながる記録と対話を積み重ねる。</p></article>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="supporters-choose-title">
          <div className={styles.container}>
            <p className={styles.kicker}>CHOOSE YOUR WAY</p>
            <h2 id="supporters-choose-title">応援の形は、自分で選べる。</h2>
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
                <p>育成の機会を増やす活動を支えたい方へ。まずは月500円から、無理のない範囲で参加できます。特典や条件はnoteでご確認ください。</p>
                <a href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-500-note">月500円から応援する ↗</a>
              </article>
              <article className={styles.plan}>
                <span className={styles.planLabel}>03 / 育成記事プラン</span>
                <p className={styles.price}><strong>1,000</strong>円 <span>/ 月</span></p>
                <h3>育成を継続して学ぶ</h3>
                <p>保護者・指導者として継続的に育成を学びたい方へ。対象記事と特典の詳細は公式noteでご確認ください。</p>
                <a href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-1000-note">月1,000円で学びながら応援する ↗</a>
              </article>
            </div>
            <p className={styles.disclaimer}>価格と特典は変更される場合があります。実際のお申し込み画面に表示される内容を優先してください。月額プランと単品記事、スクール月謝、クリニック参加費は別です。</p>
          </div>
        </section>

        <section className={styles.sectionAlt} aria-labelledby="supporters-flow-title">
          <div className={styles.container}>
            <p className={styles.kicker}>FROM INTEREST TO SUPPORT</p>
            <h2 id="supporters-flow-title">知る。共感する。無理なく続ける。</h2>
            <div className={styles.flow}>
              <div><span>01</span><strong>知る</strong><p>育成記事や活動予定を無料で確認</p></div>
              <div><span>02</span><strong>選ぶ</strong><p>必要な活動・学び・応援方法を選択</p></div>
              <div><span>03</span><strong>続ける</strong><p>自分の意思で、活動の応援や学びを継続する</p></div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="supporters-trust-title">
          <div className={styles.container}>
            <p className={styles.kicker}>TRANSPARENCY</p>
            <h2 id="supporters-trust-title">応援に、説明責任を。</h2>
            <p className={styles.lead}>月額会費は、RBA全体の育成・指導者教育・地域交流・国際交流などの活動を継続するための収入です。特定の選手・地域への配分や成果を確約するものではありません。</p>
            <p className={styles.lead}>実際に行った活動と次に取り組む課題は、確認できた事実に基づいて発信します。未確認の会員数や使途実績は掲載しません。</p>
            <div className={styles.bottomActions}>
              <Link className={styles.outline} href="/ja/journal" data-growth-id="supporters-proof-journal">これまでの育成記事を見る →</Link>
              <a className={styles.primary} href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-trust-note">noteのプランを確認する <span aria-hidden="true">↗</span></a>
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
              <details><summary>会費は特定の選手・チームへの寄付ですか？</summary>
                <p>いいえ。RBA全体の活動を支える月額メンバーシップです。特定の選手・地域への配分や、税控除の対象となる寄付であることを約束するものではありません。</p>
              </details>
              <details><summary>支払い・更新・退会の手続きは？</summary>
                <p>月額プランの入会・決済・更新・解約はnoteで管理されます。加入前に請求日、更新・退会条件、特典をnoteの最新表示でご確認ください。</p>
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
