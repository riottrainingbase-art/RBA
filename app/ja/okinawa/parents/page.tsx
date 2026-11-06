import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import styles from "../page.module.css";

const EMAIL = "riot.training.base@gmail.com";
const MEMBER_EMAIL = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("GREAM OKINAWA｜参加中の活動・会費のご相談");
const JOIN_EMAIL = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("GREAM OKINAWA｜新規参加のご相談");

export const metadata: Metadata = {
  title: { absolute: "保護者の皆さまへ｜GREAM OKINAWA｜RBA" },
  description: "GREAM OKINAWAの活動確認、体験・新規参加、会費・振替、会場と安全管理、連絡方法、よくある質問。確認済みのことと調整中のことを分けてご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/okinawa/parents" },
  openGraph: {
    title: "保護者ガイド｜GREAM OKINAWA",
    description: "今参加しているご家庭も、これからの参加を考えるご家庭も。活動の確認と相談先をご案内します。",
    url: "https://riotbasketballacademy.com/ja/okinawa/parents", type: "article", locale: "ja_JP",
  },
};

const familyRoutes = [
  { code: "01", label: "ALREADY PARTICIPATING", title: "現在参加中のご家庭", body: "予定されている練習・大会の日時、会場、担当者の変更は、既にご案内している公式連絡経路で確認してください。分からない場合は、活動名と日付を本部までお知らせください。", action: "会員・保護者の相談", href: MEMBER_EMAIL },
  { code: "02", label: "FUTURE PARTICIPATION", title: "これから参加したいご家庭", body: "体験会の先行案内を希望する保護者の方から、無料で先行申込を受け付けています。開催日・会場・担当・料金・参加枠は未確定で、送信は正式予約や入団ではありません。", action: "体験会の先行申込（無料）", href: "/ja/okinawa/trial", internal: true },
  { code: "03", label: "SEPARATE EVENTS", title: "クリニック・キャンプ参加", body: "単発イベントは定期チームと別の参加条件です。会場、年齢、費用、宿泊、決済、キャンセル条件は各イベントの公式ページでご確認ください。", action: "活動一覧へ", href: "/ja/schedule", internal: true },
] as const;

const safePractices = [
  ["実施前の確認", "施設使用許可、現場の指導・安全責任者、保険や連絡体制など、必要な条件を確かめてから実施します。"],
  ["体調とケガ", "体調不良や負傷が疑われる場合は無理な参加を求めず、活動を調整し、必要に応じて救急・医療機関につなぎます。"],
  ["指導のあり方", "体罰、暴言、侮辱、ハラスメントによる指導を認めず、子どもが安心して学べる環境を目指します。"],
  ["変更時の連絡", "中止、会場変更、担当変更など参加に直接影響する内容は、対象の保護者に適切な連絡方法で案内します。"],
  ["写真・映像と情報", "本人・保護者の同意、利用目的、施設規約を確認し、写真・動画や個人情報を必要以上に公開・共有しません。"],
  ["保護者との対話", "会費、指導、参加機会に関する疑問は、事実と申込時の条件を確認して個別に対応します。"],
] as const;

const faq = [
  ["新しい定期練習はいつ始まりますか？", "新しい日程・会場・現地責任者・料金などが確認できてから案内します。現時点では正式な新規クラス開始日を確約していません。"],
  ["今通っている活動もすべて休止するのですか？", "いいえ。このページは現在の活動の一律休止を知らせるものではありません。すでに参加している活動の変更は、対象のご家庭へ個別に案内します。"],
  ["体験には申し込めますか？", "今は参加希望の相談を受け付けています。正式な体験予約ではありません。実施日、会場、担当者、参加条件が決定した活動から案内します。"],
  ["何歳から参加できますか？", "RBAが扱う育成年代はU8〜U15を含みますが、各活動で受け入れる年齢や学年は異なります。対象は募集時の個別条件をご確認ください。"],
  ["女子・男子、初心者でも相談できますか？", "はい。参加希望の相談は可能です。ただし、新しいカテゴリーの設置や定員・受け入れを保証するものではありません。"],
  ["現在の会費や月額は変更されますか？", "現行契約や既存会員への案内によって判断します。このページをもって会費の改定や契約変更を通知するものではありません。新しい活動の料金は確定後に公表します。"],
  ["休講、振替、返金はどうなりますか？", "申込時の規約、実際に提供された活動、決済・入金記録等に基づき個別に確認します。一律の返金や振替を本ページで約束するものではありません。"],
  ["練習会場は真壁小学校ですか？", "会場は活動ごとに確認が必要です。真壁小学校の利用を中止すると決定したわけではありませんが、今後の利用を無条件に保証したものでもありません。会場・時間は正式な連絡で確認してください。"],
  ["ケガや体調不良のときはどうすればよいですか？", "参加前の体調不良は活動担当に知らせてください。活動中の急病・けがは現場の救護と緊急連絡を優先します。生命の危険がある場合は119番へ連絡してください。"],
  ["保険はありますか？", "活動内容や加入契約により補償範囲が異なるため、参加する活動ごとに適用される保険や免責条件を確認して案内します。未確認の保障を一律に約束しません。"],
  ["コーチの指導資格は？", "担当する活動や大会に応じて必要な資格・経験を確認します。将来の新規活動については採用・安全審査の完了前に担当者を確定表示しません。"],
  ["試合の出場時間は全員同じですか？", "RBAは育成年代の学習機会を大切にします。ただし、一律の出場時間を保証するものではありません。大会規則、体調、人数、安全に配慮し、指導上の判断を説明できる運営を目指します。"],
  ["学校や現在のチームに所属したまま参加できますか？", "活動により登録資格・掛け持ちの条件が異なります。所属先の規則や大会登録条件を確認のうえご相談ください。"],
  ["選手の写真や動画が公開されますか？", "肖像・映像の掲載には、対象者と施設など必要な許諾を確認し、利用目的を限定します。公開に関する個別の不安は本部までご相談ください。"],
  ["相談メールには何を書けばよいですか？", "活動名、対象月・日付、確認したい事項を簡潔にお知らせください。最初から診断書、口座番号、クレジットカード情報、身分証などを添付する必要はありません。"],
  ["体験会の先行申込はどこからできますか？", "保護者専用の体験会先行申込ページから無料で申し込めます。開催条件の確認中のため、現時点では体験枠の予約や入団、費用の発生を意味しません。"],
] as const;

export default function OkinawaParentGuide() {
  return (
    <SiteFrame locale="ja">
      <div className={styles.page}>
        <section className={styles.detailHero}>
          <div className={styles.inner}>
            <Link className={styles.detailBack} href="/ja/okinawa">← GREAM OKINAWA トップ</Link>
            <p className={styles.eyebrow}>FAMILY GUIDE / GREAM OKINAWA</p>
            <h1>保護者の皆さまへ。<br /><span>確認できることを、正確に。</span></h1>
            <p className={styles.detailLead}>今通っている活動の連絡と、これからの新しい活動の案内は別です。安心して判断できるよう、確定したこと・準備中のこと・相談先を分けてご案内します。</p>
            <div className={styles.detailActions}>
              <a className={styles.primary} href={MEMBER_EMAIL}>現在の活動について相談する →</a>
              <Link className={styles.secondary} href="/ja/okinawa/trial">体験会の先行申込（無料） →</Link>
            </div>
            <p className={styles.detailHint}>本ページで会場・担当者・日時・会費の変更や、新しい入会・予約を確定することはありません。</p>
          </div>
        </section>

        <nav className={styles.teamSubnav} aria-label="保護者ガイド内の案内">
          <div className={styles.inner}>
            <a href="#routes">問い合わせ窓口</a><a href="#safety">安全への対応</a><a href="#faq">よくある質問</a><a href="#contact">連絡先</a>
          </div>
        </nav>

        <section className={styles.section} id="routes">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>THREE STARTING POINTS</p>
            <div className={styles.heading}><h2>知りたいことから、迷わず相談。</h2><p>問い合わせ先が分からないときは、RBA本部が確認をお手伝いします。緊急連絡は従来の現場経路を優先してください。</p></div>
            <div className={styles.statusGrid}>
              {familyRoutes.map((route) => (
                <article className={styles.statusCard} key={route.code}>
                  <p className={styles.mini}>{route.code} / {route.label}</p><h3>{route.title}</h3>
                  <p>{route.body}</p>
                  {("internal" in route && route.internal) ? <Link className={styles.textLink} href={route.href}>{route.action} →</Link> : <a className={styles.textLink} href={route.href}>{route.action} →</a>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.darkSection} id="safety">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>CARE, SAFETY & RESPONSIBILITY</p>
            <div className={styles.heading}><h2>安全と尊厳は、<br />指導の前提です。</h2><p className={styles.lightLead}>活動ごとに必要な条件を満たしているか確かめます。未確認の内容を、確定した安全体制として案内しません。</p></div>
            <div className={styles.commitmentGrid}>
              {safePractices.map(([title, body], i) => (
                <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>
              ))}
            </div>
            <p className={styles.emergency}>事故・急病などの緊急時はメールを待たず、現場の責任者による安全確保・救護・必要な119番通報と保護者連絡を優先してください。</p>
          </div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>FREQUENTLY ASKED QUESTIONS</p>
            <div className={styles.heading}><h2>よくあるご質問。</h2><p>活動の個別条件は規約と確定案内を優先します。こちらは一般的な案内です。</p></div>
            <div className={styles.accordionList}>
              {faq.map(([question, answer]) => (
                <details className={styles.accordionItem} key={question}>
                  <summary>{question}<span aria-hidden="true">＋</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            <p className={styles.disclaimer}>健康情報・個人情報については、必要に応じて安全な提出方法を個別に案内します。BAND等の複数人が閲覧できる連絡先には機密資料を投稿しないでください。</p>
          </div>
        </section>

        <section className={styles.softSection} id="contact">
          <div className={styles.inner}>
            <p className={styles.eyebrow}>CONTACT / RIOT BASKETBALL ACADEMY</p>
            <div className={styles.detailClosing}>
              <div>
                <h2>分からないままにしない。</h2>
                <p>まず活動名・日付と、何を確認したいかをお知らせください。参加者の安全、会員条件、決済など、必要な記録を照合して対応します。</p>
                <p><strong>{EMAIL}</strong></p>
              </div>
              <div className={styles.detailClosingActions}>
                <a className={styles.darkButton} href={MEMBER_EMAIL}>今の活動・会費について問い合わせる →</a>
                <Link className={styles.textLink} href="/ja/okinawa/trial">体験会・新規参加の先行申込 →</Link>
                <Link className={styles.textLink} href="/ja/policies">参加規約・安全・プライバシーについて →</Link>
                <Link className={styles.textLink} href="/ja/okinawa/development">育成方針と練習の考え方を見る →</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
