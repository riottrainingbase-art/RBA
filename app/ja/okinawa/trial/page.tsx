import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import styles from "../page.module.css";

const TRIAL_FORM_URL = "https://form.jotform.com/263092580756060";

export const metadata: Metadata = {
  title: { absolute: "体験会先行申込・新規メンバー参加相談｜GREAM OKINAWA" },
  description: "GREAM OKINAWAの体験会先行案内・新規参加相談を保護者から無料受付。沖縄県南部の育成年代対象。開催日時・体育館・担当指導者・費用・参加枠は調整中で、フォーム送信は参加確定ではありません。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/okinawa/trial" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "GREAM OKINAWA｜体験会の先行案内申込",
    description: "この島で、次の学びを。保護者向けの無料先行受付。正式な体験日時や参加枠の確定ではありません。",
    url: "https://riotbasketballacademy.com/ja/okinawa/trial",
    locale: "ja_JP",
    type: "website",
  },
};

const participationSteps = [
  { number: "01", title: "無料で先行申込", body: "保護者の方が連絡先、希望する年代・地域・曜日をご入力ください。申込時の支払いはありません。" },
  { number: "02", title: "RBAから個別にご案内", body: "会場・指導担当・安全管理・参加条件・体験日時が確定した場合に、申込内容に応じてご案内します。" },
  { number: "03", title: "条件を確認して判断", body: "日程、対象年齢、会場、参加費、規約などを確認したうえで参加するか選択できます。" },
] as const;

const questions = [
  ["このフォームで体験予約は確定しますか？", "いいえ。これは先行案内希望の受付です。練習日時・場所・指導体制・参加条件・募集枠が確定してから、正式な申込方法をご案内します。"],
  ["申込や体験会に料金はかかりますか？", "今回の先行申込は無料で、送信によって料金や契約は発生しません。実際の体験会の参加費は未定です。決定した場合、参加の判断前に案内します。"],
  ["いつ、どこで開催されますか？", "新しい体験会の開催日は未確定です。活動拠点は沖縄県南部を中心に検討中ですが、体育館の利用許可・日時・担当を確認してから案内します。"],
  ["現在参加しているGREAMの活動は中止になりますか？", "このフォームは既存会員への活動変更や休止の通知ではありません。現在参加中の活動については、これまでの公式連絡経路とRBA本部への相談をご利用ください。"],
  ["子どもの名前や病歴は必要ですか？", "先行受付では選手氏名、生年月日、学校名、診断書、健康情報、住所、画像などの提出を求めません。必要な確認は、正式な活動条件と安全な提出方法を整えてから行います。"],
  ["年齢や経験によって参加できないことはありますか？", "U8〜U15を中心とする育成年代の参加希望を受け付けます。実際の対象カテゴリーや定員は募集する活動ごとに異なります。初心者のご相談も歓迎します。"],
] as const;

export default function OkinawaTrialInterestPage() {
  return (
    <SiteFrame locale="ja" languagePage="okinawa">
      <div className={styles.page}>
        <section className={styles.detailHero}>
          <div className={styles.inner}>
            <Link className={styles.detailBack} href="/ja/okinawa">← GREAM OKINAWA トップ</Link>
            <p className={styles.eyebrow}>GREAM OKINAWA / TRIAL ENQUIRY</p>
            <h1>沖縄の子どもたちへ。<br /><span>体験会の先行案内、受付中。</span></h1>
            <p className={styles.detailLead}>
              初めてのバスケットボールも、次の成長を探している選手も。
              新たな体験会・チーム活動の案内を希望する保護者の方から、無料で先行申込を受け付けています。
            </p>
            <div className={styles.detailActions}>
              <a className={styles.primary} href="#application">先行申込フォームへ <span aria-hidden="true">→</span></a>
              <a className={styles.secondary} href={TRIAL_FORM_URL} target="_blank" rel="noopener noreferrer">フォームを別画面で開く ↗</a>
            </div>
            <p className={styles.detailHint}>重要：開催日・会場・担当コーチ・参加費・募集枠は未確定です。先行申込は体験参加・入団・予約の確定ではありません。</p>
          </div>
        </section>

        <nav className={styles.teamSubnav} aria-label="体験会の先行受付に関する案内">
          <div className={styles.inner}>
            <a href="#overview">先行申込について</a><a href="#how-it-works">申込の流れ</a><a href="#application">申込フォーム</a><a href="#faq">よくあるご質問</a>
          </div>
        </nav>

        <section className={styles.section} id="overview">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>FIRST STEP / OKINAWA</p>
            <div className={styles.heading}>
              <h2>まずは「参加してみたい」を教えてください。</h2>
              <p>豊見城・糸満・八重瀬などの沖縄南部を中心に、地域の育成活動のあり方を検討しています。今は安全に開催できる条件を整えている段階です。</p>
            </div>
            <div className={styles.statusGrid}>
              <article className={styles.statusCard}>
                <p className={styles.mini}>OPEN / FREE ENQUIRY</p>
                <h3>先行申込は受付中</h3>
                <p>保護者の方から、新しい体験会の案内希望やチーム・スクールについての相談を受け付けています。</p>
                <p className={styles.state}>送信無料・決済なし</p>
              </article>
              <article className={styles.statusCard}>
                <p className={styles.mini}>UNDER REVIEW</p>
                <h3>体験会の日時は調整中</h3>
                <p>施設許可、担当指導者、安全責任者、対象年代、人数、参加費等が確定した活動から正式にご案内します。</p>
                <p className={styles.state}>開催日・会場は未確定</p>
              </article>
              <article className={styles.statusCard}>
                <p className={styles.mini}>NO AUTO-BOOKING</p>
                <h3>入団や参加の自動確定なし</h3>
                <p>先行申込の送信は正式な体験予約や新規会員契約にはなりません。募集条件を確認してから判断できます。</p>
                <p className={styles.state}>既存活動の変更通知ではありません</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.softSection} id="how-it-works">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>HOW TO JOIN THE INTEREST LIST</p>
            <div className={styles.heading}><h2>先行申込から体験会まで。</h2><p>最初の段階で無理な決定を求めず、条件が整った活動について正確に案内します。</p></div>
            <div className={styles.trialSteps}>
              {participationSteps.map(({number,title,body}) => (
                <article key={number} className={styles.trialStep}>
                  <span>{number}</span><h3>{title}</h3><p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="application" aria-labelledby="trial-form-heading">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>OFFICIAL FORM / PARENT OR GUARDIAN ONLY</p>
            <div className={styles.heading}>
              <h2 id="trial-form-heading">体験会の先行申込フォーム。</h2>
              <p>18歳以上の保護者または法定代理人の方が入力してください。選手本人の個人情報は必要最小限の項目にとどめています。</p>
            </div>
            <div className={styles.trialFormNotice}>
              <strong>体験会の開催・参加はまだ確定しません。</strong>
              <p>日時、会場、料金、担当者、安全体制などは確認中です。この先行申込は無料で、決済や参加契約は発生しません。個別の先行案内を希望する方の受付です。</p>
            </div>
            <div className={styles.trialFormLayout}>
              <div className={styles.trialEmbed}>
                <iframe
                  src={TRIAL_FORM_URL}
                  title="GREAM OKINAWA 体験会先行申込・保護者専用フォーム"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="geolocation 'none'; microphone 'none'; camera 'none'"
                />
              </div>
              <aside className={styles.trialSidebar} aria-label="申込に関する注意事項">
                <p className={styles.mini}>BEFORE YOU SUBMIT</p>
                <h3>フォームが開かない場合</h3>
                <p>端末やブラウザによって画面内表示が難しいときは、Jotformの公式画面から同じフォームへアクセスできます。</p>
                <a className={styles.darkButton} href={TRIAL_FORM_URL} target="_blank" rel="noopener noreferrer">先行申込フォームを開く ↗</a>
                <h3>個人情報について</h3>
                <p>この段階で選手の氏名、生年月日、学校名、住所、健康情報、身分証、画像・動画、カード情報を送る必要はありません。</p>
                <Link className={styles.textLink} href="/ja/policies">プライバシー・参加規約を見る →</Link>
                <h3>既存会員の方へ</h3>
                <p>今通っている活動の変更・会費・安全等の連絡は、既存の公式連絡経路またはRBA本部へお願いします。</p>
                <Link className={styles.textLink} href="/ja/okinawa/parents">保護者向けガイド →</Link>
              </aside>
            </div>
            <p className={styles.disclaimer}>先行申込後のご連絡は開催・体制が整った場合に行います。申し込み順での参加枠・入団・優先権を保証するものではありません。</p>
          </div>
        </section>

        <section className={styles.softSection} id="faq">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>FREQUENT QUESTIONS</p>
            <div className={styles.heading}><h2>体験会の前によくあるご質問。</h2><p>決まっていない条件を、決定済みのようには説明しません。</p></div>
            <div className={styles.accordionList}>
              {questions.map(([question,answer])=>(
                <details key={question} className={styles.accordionItem}>
                  <summary>{question}<span aria-hidden="true">＋</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <p className={styles.disclaimer}>新しい定期活動に関するお問い合わせと、11月の単発クリニック・12月の国際キャンプは別の申込です。各イベントは個別の公式ページでご確認ください。</p>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
