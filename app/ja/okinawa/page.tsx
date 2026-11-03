import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

const email = "riot.training.base@gmail.com";
const memberEmail = `mailto:${email}?subject=${encodeURIComponent("沖縄の活動・会員相談")}`;

export const metadata: Metadata = {
  title: { absolute: "RBA沖縄｜活動案内・会員相談" },
  description: "沖縄のRBA活動を探す方、参加中の会員・保護者、指導・運営への協力を希望する方の案内ページ。参加条件、問い合わせ先、安全方針を確認できます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/okinawa" },
};

const questions = [
  ["参加中の活動について相談したい", "通常練習の予定や当日の連絡は、現在ご案内している連絡先をご利用ください。会費、支払状況、参加内容などの個別相談は、RBA本部へメールでお知らせください。"],
  ["新しい定期活動には申し込めますか？", "開催日時、会場、指導体制、対象、料金などを確認できた活動から、個別の募集ページでご案内します。コーチ募集の掲載だけで、新しい定期活動への参加受付を開始したことにはなりません。"],
  ["担当や予定が変わる場合、どこで確認できますか？", "参加中の活動に関する変更は、対象の会員・保護者への個別案内でご確認ください。ご案内の内容が分からない場合は、対象の活動名を添えてRBA本部へお問い合わせください。"],
  ["会費・返金・振替について確認したい", "対象の活動、対象月や開催日、確認したい内容をメールでお知らせください。申込時の条件、実際の参加・提供状況、決済記録を確認して個別にご案内します。"],
] as const;

export default function OkinawaPage() {
  return (
    <SiteFrame locale="ja">
      <div className="journal-hub journal-cms">
        <section className="journal-cms-hero section-pad">
          <p className="section-index">RBA OKINAWA / INFORMATION &amp; CONTACT</p>
          <h1>沖縄の活動と、<br />相談先をここから。</h1>
          <p>参加したい方、すでに活動に参加している方、指導・運営への協力を考えている方へ。目的に合う案内を選べます。</p>
          <div className="homecourt-launch-actions">
            <Link className="button button-dark" href="#members">会員・保護者の相談</Link>
            <Link className="button button-light" href="#activities">参加できる活動を探す</Link>
          </div>
        </section>

        <section id="members" className="access-promise section-pad">
          <p className="section-index">MEMBERS / FAMILIES</p>
          <div>
            <h2>参加中の活動について、確認したいとき。</h2>
            <p>練習日程や当日の現場連絡は、現在ご案内している連絡先へ。会費・支払状況・参加内容などの個別相談は、RBA本部がメールで受け付けます。</p>
            <a className="button button-dark" href={memberEmail}>RBA本部へメールで相談する</a>
            <p>{email}</p>
            <p>成人のご担当者名、対象の活動・月・開催日、相談の要点をお知らせください。最初のご連絡に、子どもの医療情報、本人確認書類、口座・カード情報、グループの会話画像を添付する必要はありません。追加情報が必要な場合は、確認方法をご案内します。</p>
            <p>事故や急病など、急ぎの安全対応はメールの返信を待たず、現場の責任者・保護者への連絡と、必要な救護・救急要請を優先してください。</p>
          </div>
        </section>

        <section id="activities" className={`homecourt-product-preview section-pad ${styles.activities}`}>
          <div className="section-head">
            <div><p className="section-index">FIND YOUR NEXT COURT</p><h2>参加・協力の目的から選ぶ。</h2></div>
            <p>対象年代、費用、会場、申込条件は、それぞれの活動ページでご確認ください。</p>
          </div>
          <div className={`homecourt-preview-grid ${styles.cards}`}>
            <article>
              <span>PLAY / LEARN</span><h3>クリニック・キャンプに参加する</h3>
              <p>沖縄でのクリニックや国際キャンプの案内をご覧いただけます。募集状況と申込条件は、各ページでご確認ください。</p>
              <p><Link className="text-link" href="/ja/events/okinawa-clinic-2026-11-14">沖縄クリニックの案内 →</Link></p>
              <p><Link className="text-link" href="/ja/events/okinawa-international-camp-2026">沖縄国際ユースキャンプの案内 →</Link></p>
            </article>
            <article>
              <span>COACH / SUPPORT</span><h3>沖縄で指導に関わる</h3>
              <p>育成年代の指導、アシスタント、身体づくりのサポートなど。担当内容、報酬、資格・安全面の条件を開始前に確認します。</p>
              <Link className="text-link" href="/ja/okinawa-coach">沖縄コーチ募集を見る →</Link>
            </article>
            <article>
              <span>HOST / PARTNER</span><h3>地域での開催に協力する</h3>
              <p>施設、地域のチーム、企業・団体からの開催相談を受け付けています。希望地域・対象・時期・協力できる内容をお知らせください。</p>
              <Link className="text-link" href="/ja/clinic-request">開催について相談する →</Link>
            </article>
          </div>
        </section>

        <section className="access-promise section-pad">
          <p className="section-index">BEFORE YOU APPLY</p>
          <div><h2>日時・会場・費用を確認してから参加へ。</h2>
            <p>活動ごとの開催案内と、申込時に示された条件をご確認ください。募集ページだけで分からない点があれば、決済前にお問い合わせください。</p>
            <Link className="text-link" href="/ja/policies">参加規約・安全・キャンセル方針を確認する →</Link>
          </div>
        </section>

        <section className="homecourt-product-preview section-pad">
          <div className="section-head"><div><p className="section-index">QUESTIONS</p><h2>迷ったときの確認先。</h2></div></div>
          <div className="access-grid">{questions.map(([question, answer]) => (
            <article key={question}><h3>{question}</h3><p>{answer}</p></article>
          ))}</div>
        </section>

        <section className="closing-cta section-pad">
          <p className="eyebrow">RIOT BASKETBALL ACADEMY</p>
          <h2>分からないままにせず、<br />まず確認から。</h2>
          <p>参加中の活動についても、新しい機会についても、対象の活動名を添えてご相談ください。</p>
          <div className="closing-actions"><a className="button button-orange" href={memberEmail}>メールで相談する</a><Link className="button button-dark" href="/ja/regions">全国の活動地域を見る</Link></div>
        </section>
      </div>
    </SiteFrame>
  );
}
