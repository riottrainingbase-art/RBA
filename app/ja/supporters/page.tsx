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
                <p>RBAの活動を気軽に応援する入口。公式noteでは月1回の活動・使途・次の計画の報告が案内されています。提供条件はnoteでご確認ください。</p>
                <a href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-500-note">月500円から応援する ↗</a>
              </article>
              <article className={styles.plan}>
                <span className={styles.planLabel}>03 / 育成記事プラン</span>
                <p className={styles.price}><strong>1,000</strong>円 <span>/ 月</span></p>
                <h3>育成を継続して学ぶ</h3>
                <p>活動を応援しながら、保護者・指導者として学ぶプラン。公式noteでは活動報告に加えて月2本の育成・見守り方の記事が案内されています。</p>
                <a href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-1000-note">月1,000円で学びながら応援する ↗</a>
              </article>
            </div>
            <p className={styles.disclaimer}>価格と特典は変更される場合があります。実際のお申し込み画面に表示される内容を優先してください。月額プランと単品記事、スクール月謝、クリニック参加費は別です。</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="supporters-learning-title">
          <div className={styles.container}>
            <p className={styles.kicker}>FROM QUESTION TO PRACTICE</p>
            <h2 id="supporters-learning-title">読んで終わりではなく、次の練習を変える。</h2>
            <p className={styles.lead}>たとえば「練習ではシュートが入るのに、試合では打たない」。そこで「もっと自信を持て」と言う前に、RBAでは原因をひとつに決めつけず、次の4つを見ます。</p>
            <div className={styles.learningGrid}>
              <div><span>01 / SKILL</span><strong>技術</strong><p>守備のいない状態でも、動作やリズムは安定しているか。</p></div>
              <div><span>02 / PERCEPTION</span><strong>知覚</strong><p>打てる時間やスペースに気づけていたか。</p></div>
              <div><span>03 / DECISION</span><strong>判断</strong><p>打つ、抜く、パスの選択肢を比べられたか。</p></div>
              <div><span>04 / ENVIRONMENT</span><strong>環境</strong><p>普段の練習にも、相手や味方を見て選ぶ機会があるか。</p></div>
            </div>
            <p className={styles.learningFoot}>無料のRBA JOURNALでは育成の問いと根拠を共有します。月1,000円プランでは、観察方法や練習設計まで深める実践記事を案内しています。公開済みの閲覧対象はnoteのプラン画面が優先されます。</p>
            <div className={styles.bottomActions}>
              <Link className={styles.outline} href="/ja/journal" data-growth-id="supporters-learning-free">まず無料で読む →</Link>
              <a className={styles.primary} href={noteJoinUrl} target="_blank" rel="noopener noreferrer" data-growth-id="supporters-learning-1000">月1,000円の学びを確認 <span aria-hidden="true">↗</span></a>
            </div>
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
            <p className={styles.learningFoot}>RBAの確定した活動と準備中の企画は、<Link href="/ja/updates" data-growth-id="supporters-updates">公式の活動・運営状況</Link>で確認できます。活動状況の公開は、会費の個別使途を証明する資料ではありません。</p>
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
                <p>月500円は活動応援と活動・使途報告、月1,000円はそれに加えて育成記事を学びたい方向けです。公開済みの案内内容を記載していますが、実際の閲覧権限・提供条件はnoteの最新プラン説明が優先されます。</p>
              </details>
              <details><summary>会費は特定の選手・チームへの寄付ですか？</summary>
                <p>いいえ。RBA全体の活動を支える月額メンバーシップです。特定の選手・地域への配分や、税控除の対象となる寄付であることを約束するものではありません。</p>
              </details>
              <details><summary>すでにnote会員です。もう一度申し込む必要がありますか？</summary>
                <p>いいえ。重複した加入・課金を避けるため、まずnoteにログインし、現在の加入プランと請求状況をご確認ください。プランの変更が必要な場合もnoteの案内に従ってください。</p>
              </details>
              <details><summary>スマートフォンから参加できますか？</summary>
                <p>スマートフォンのSafariやChromeなどのブラウザーで公式noteを開き、ログインして手続きしてください。noteアプリ内では参加設定ができない場合があります。</p>
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
