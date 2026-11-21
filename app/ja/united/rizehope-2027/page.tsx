import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import styles from "./invitation.module.css";

const entryUrl = "https://form.jotform.com/263243952545057";

export const metadata: Metadata = {
  title: "東北の小学6年生へ｜RBA UNITED × RIZEHOPE JAPAN 2027 正式ご案内",
  description: "2027年2月27・28日、宮城県・柴田町総合体育館。RBA UNITEDの個人参加に関する無料希望登録。保護者からご連絡ください。参加・選考・費用は未確定で、申込のみで出場は確約されません。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/united/rizehope-2027" },
  openGraph: {
    title: "いつものチームを越えて。まだ知らない仲間と、次のコートへ。 | RBA UNITED",
    description: "東北の小学6年生と保護者へ。RIZEHOPE JAPAN 2027に向けたRBA UNITED無料参加意向登録。",
    type: "website",
    url: "https://riotbasketballacademy.com/ja/united/rizehope-2027",
    images: [{ url: "https://riotbasketballacademy.com/rba-logo-original.jpg", alt: "Riot Basketball Academy公式ロゴ" }],
  },
};

export default function RizehopeUnitedInvitation() {
  return (
    <SiteFrame locale="ja" languagePage="united">
      <main id="main-content" className={styles.page} lang="ja">
        <div className={styles.container}>
          <header className={styles.hero}>
            <div className={styles.topline}>
              <Link href="/ja" aria-label="RBA公式サイトへ戻る" className={styles.logo}>
                <Image src="/rba-logo-original.jpg" width={88} height={120} alt="Riot Basketball Academy 公式ロゴ" priority />
              </Link>
              <div><span className={styles.eyebrow}>RIOT BASKETBALL ACADEMY</span><span className={styles.tag}>OFFICIAL INVITATION / U12</span></div>
            </div>
            <p className={styles.region}>東北の小学6年生と、保護者の皆さまへ。</p>
            <h1>小学校最後のシーズンに、<br />いつもと違う仲間と<br /><span>バスケをしませんか。</span></h1>
            <p className={styles.english}>YOUR TEAM STAYS. NEW EXPERIENCES AWAIT.</p>
            <div className={styles.event}>
              <p className={styles.eventName}>RBA UNITED <span aria-hidden="true">×</span> RIZEHOPE JAPAN 2027</p>
              <div className={styles.eventFacts}>
                <div><span>開催日</span><strong>2027年2月27日（土）・28日（日）</strong></div>
                <div><span>会場</span><strong>宮城県・柴田町総合体育館</strong></div>
              </div>
            </div>
            <div className={styles.heroActions}>
              <a href={entryUrl} target="_blank" rel="noopener noreferrer" data-growth-id="united-rizehope-2027-guardian-interest" className={styles.primary}>保護者の方はこちら（無料） <span aria-hidden="true">↗</span></a>
              <a href="#details" className={styles.subtle}>参加までの流れを読む <span aria-hidden="true">↓</span></a>
            </div>
            <p className={styles.caution}>この募集は無料の参加意向調査です。選考・参加枠・個人参加費は未確定で、送信のみで出場は決まりません。</p>
          </header>

          <section id="details" className={styles.story}>
            <p className={styles.sectionIndex}>WHY THIS OPPORTUNITY</p>
            <h2>小学校最後のシーズンに、もうひとつの選択肢を。</h2>
            <p>今のチームでの活動を大切にしながら、普段は一緒にプレーする機会のない選手たちとコートに立つ。そんな経験があってもいいと思っています。</p>
            <p>東北の小学6年生には、中学校へ進む前に、いつもと違う相手や仲間とプレーする機会を知ってほしい。その思いから、ご家族の希望を伺うことにしました。参加対象やチーム編成は調整中ですので、登録いただいた方全員の出場が決まるものではありません。</p>
          </section>

          <section className={styles.stepBlock}>
            <p className={styles.sectionIndex}>HOW TO EXPRESS INTEREST</p>
            <h2>ご希望は、保護者の方からお聞かせください。</h2>
            <div className={styles.steps}>
              <article><span>01</span><h3>無料で希望を登録</h3><p>現在の学年、お住まいの地域、希望する参加日などを伺います。子どもの氏名や医療情報、学校名は必要ありません。</p></article>
              <article><span>02</span><h3>参加条件を確認</h3><p>大会側のU12年齢要件、編成、安全管理、指導体制、個人参加費などが整い次第、対象の保護者へご案内します。</p></article>
              <article><span>03</span><h3>納得して次を判断</h3><p>条件を確認してから正式な参加を検討できます。この無料登録に決済はなく、いまの所属チームを離れる必要もありません。</p></article>
            </div>
            <a href={entryUrl} target="_blank" rel="noopener noreferrer" data-growth-id="united-rizehope-2027-steps-interest" className={styles.primary}>無料の参加意向登録へ <span aria-hidden="true">↗</span></a>
          </section>

          <section className={styles.homecourt}>
            <div>
              <p className={styles.sectionIndex}>MY HOME COURT</p>
              <h2>RBAに参加したことがあるご家庭へ。</h2>
              <p>MY HOME COURTは、RBAの活動や次の育成機会を自分で確認できる場所です。無料のRBA IDから利用できます。まだ登録していない方も、この機会にご覧ください。</p>
              <p className={styles.note}>MY HOME COURTへの登録は任意です。登録済みの方は、今あるアカウントからログインしてください。無料の参加意向登録にRBA IDは必要ありません。</p>
            </div>
            <Link href="/ja/my-homecourt" className={styles.outline} data-growth-id="united-rizehope-2027-homecourt">無料RBA IDを見る →</Link>
          </section>

          <section className={styles.faq} aria-label="ご参加前の確認">
            <h2>ご案内する前に、確認しておきたいこと。</h2>
            <details><summary>小学6年生なら必ず出場できますか？</summary><p>学年だけでは出場資格や選考結果は決まりません。大会規定の年齢条件、編成、保護者同意、運営・安全条件を確認してから個別にご案内します。</p></details>
            <details><summary>参加費はいくらですか？</summary><p>RBA UNITED個人参加の費用はまだ確定していません。国内U12チーム単位の費用を、個人参加費としてご案内することはありません。無料希望登録に支払いは必要ありません。</p></details>
            <details><summary>今のクラブを辞める必要がありますか？</summary><p>必要ありません。RBA UNITEDは所属チームを置き換えるものではなく、企画ごとの新しい経験を提供することを目指しています。所属先との関係や各大会の規則は尊重します。</p></details>
          </section>

          <footer className={styles.footer}>
            <div className={styles.sign}><strong>Riot Basketball Academy</strong><span>代表　西尾 優人</span></div>
            <p>本ページはRBAによる公式の参加意向登録案内であり、大会出場承認通知・選考結果の通知ではありません。</p>
            <div className={styles.footerLinks}><Link href="/ja/united">RBA UNITED</Link><Link href="/ja/policies">個人情報・安全方針</Link><a href="mailto:riot.training.base@gmail.com">お問い合わせ</a></div>
          </footer>
        </div>
      </main>
    </SiteFrame>
  );
}
