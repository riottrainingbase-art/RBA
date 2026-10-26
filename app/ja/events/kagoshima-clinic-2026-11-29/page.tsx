import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const path = "/ja/events/kagoshima-clinic-2026-11-29";
const title = "11/29 BASTET × RBA 鹿児島クリニック｜錦江湾高校体育館";
const description = "2026年11月29日（日）、錦江湾高校体育館で開催。小・中・高校生（男女）対象。午前9:30〜12:00／午後13:00〜15:30。通し4,000円・1部のみ3,000円。午前・午後・終日から選んで、オンラインでお申し込み・お支払いいただけます。";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: `https://riotbasketballacademy.com${path}` },
  openGraph: { title, description, url: `https://riotbasketballacademy.com${path}`, images: [{ url: "/events/kagoshima-20261129/01.png", width: 1254, height: 1254, alt: "BASTET × RBA 鹿児島クリニック開催案内" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/events/kagoshima-20261129/01.png"] },
};

function applicationEmail(session: string) {
  const body = `鹿児島クリニックへの参加を希望します。\n\n参加者のお名前：\n学年：\n性別：\n保護者のお名前：\n保護者の連絡先（電話番号またはメール）：\n参加希望：${session}\n`;
  return `mailto:wakuuzu@gmail.com?subject=${encodeURIComponent("11/29 鹿児島クリニック 参加申込")}&body=${encodeURIComponent(body)}`;
}

export default function Page() {
  const morningClosed = Date.now() >= Date.parse("2026-11-29T09:30:00+09:00");
  const afternoonClosed = Date.now() >= Date.parse("2026-11-29T13:00:00+09:00");
  return <SiteFrame locale="ja"><div className={styles.page}>
    <section className={styles.hero}>
      <div>
        <a className={styles.back} href="/ja/schedule">← クリニック・イベント日程</a>
        <p className={styles.label}>BASTET × RBA / KAGOSHIMA</p>
        <h1>鹿児島で、<br/>次の一歩を。</h1>
        <p className={styles.lead}>BASTET CLINIC<br/><strong>2026年11月29日（日）</strong><br/>錦江湾高校体育館（鹿児島市）</p>
        <p>BASTETとRBAが、鹿児島でクリニックを開催します。小学生から高校生まで、男女ともに参加できます。錦江湾高校のコートで、一緒にバスケットボールを楽しみましょう。</p>
        <a className={styles.primary} href="#entry">参加する時間を選んで申し込む ↓</a>
      </div>
      <Image className={styles.poster} src="/events/kagoshima-20261129/01.png" alt="RBA公式ロゴ入り BASTET × RBA 鹿児島クリニック開催案内" width={1254} height={1254} sizes="(max-width: 760px) 92vw, 480px" priority/>
    </section>

    <div className={styles.localBand}>
      <div><p>BASTET × RBA IN KAGOSHIMA</p><strong>鹿児島から、次の一歩を。</strong><span>2026.11.29 SUN ／ 錦江湾高校体育館</span></div>
      <svg className={styles.landscape} viewBox="0 0 620 180" aria-hidden="true" focusable="false"><path d="M0 134L74 129L123 113L165 102L206 74L244 69L267 42L294 51L318 44L350 76L386 82L430 110L487 121L543 130L620 134" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="M261 29Q249 8 268 1M282 30Q301 15 289 0" fill="none" stroke="currentColor" strokeWidth="2" opacity=".45"/><path d="M0 149Q78 139 155 149T310 149T465 149T620 149M0 166Q78 156 155 166T310 166T465 166T620 166" fill="none" stroke="currentColor" strokeWidth="2" opacity=".65"/></svg>
    </div>

    <section className={styles.section} aria-labelledby="overview">
      <p className={styles.label}>INFORMATION</p><h2 id="overview">開催概要</h2>
      <dl className={styles.facts}>
        <div><dt>開催日</dt><dd>2026年11月29日（日）</dd></div>
        <div><dt>会場</dt><dd>錦江湾高校体育館（鹿児島市）</dd></div>
        <div><dt>対象</dt><dd>小学生・中学生・高校生（男女）</dd></div>
        <div><dt>午前の部</dt><dd>9:30〜12:00</dd></div>
        <div><dt>午後の部</dt><dd>13:00〜15:30</dd></div>
        <div><dt>参加費</dt><dd>午前・午後通し <strong>4,000円</strong><br/>午前または午後のみ <strong>3,000円</strong></dd></div>
      </dl>
      <p>午前・午後ともに2時間30分。途中に休憩を挟みながら進めます。</p>
    </section>

    <section className={styles.section} id="entry" aria-labelledby="application">
      <p className={styles.label}>APPLICATION / ONLINE PAYMENT</p><h2 id="application">お申し込みはこちら</h2>
      <p className={styles.lead}>① 参加する時間を選ぶ → ② 必要事項を入力する → ③ 参加費を支払う</p>
      <p>保護者の方が、参加者1名ずつお手続きください。きょうだいで参加する場合は、お一人ずつお申し込みをお願いします。参加費のお支払いが完了すると、お申し込みが確定します。</p>
      <p className={styles.notice}><strong>すでにメール・DMで申し込んだ方へ：</strong>重複のお申し込みを避けるため、主催者からのお支払い案内をご確認ください。すでにお支払い済みの方は、再度のお手続きは不要です。</p>
      {afternoonClosed ? <p className={styles.notice}>オンラインでのお申し込みは終了しました。ご不明な点はRBAまでお問い合わせください。</p> : null}
      <form action="/api/clinics/kagoshima-20261129/checkout" method="post" className={styles.entryForm}>
        <fieldset className={styles.consent}><legend>お申し込みの前に</legend>
          <label><input type="checkbox" name="guardian" value="yes" required/> 参加者が小学生・中学生・高校生であることを確認し、保護者として申し込みます。</label>
          <label><input type="checkbox" name="terms" value="yes" required/> 下記のキャンセル条件と<a href="/ja/policies" target="_blank" rel="noopener noreferrer">RBA参加規約</a>を確認しました。</label>
          <p className={styles.small}>次の画面で、参加者のお名前・ふりがな・学年・性別と、保護者のお名前・メールアドレス・電話番号をご入力ください。お預かりした情報は、RBAが申し込みの受付、お支払いの確認、当日のご連絡に使用します。主催者への共有が必要な場合は、事前に保護者の方に確認します。</p>
        </fieldset>
        <div className={styles.plans}>
          <article className={styles.plan}><p className={styles.label}>MORNING</p><h3>午前の部</h3><p>9:30〜12:00</p><p className={styles.price}>3,000<span>円／1名</span></p><button type="submit" name="session" value="am" disabled={morningClosed}>午前の部に申し込む →</button></article>
          <article className={styles.plan}><p className={styles.label}>AFTERNOON</p><h3>午後の部</h3><p>13:00〜15:30</p><p className={styles.price}>3,000<span>円／1名</span></p><button type="submit" name="session" value="pm" disabled={afternoonClosed}>午後の部に申し込む →</button></article>
          <article className={styles.plan}><p className={styles.label}>FULL DAY</p><h3>午前・午後の両方</h3><p>9:30〜12:00／13:00〜15:30</p><p className={styles.price}>4,000<span>円／1名</span></p><button type="submit" name="session" value="full" disabled={morningClosed}>午前・午後の両方に申し込む →</button></article>
        </div>
        <p className={styles.small}>表示金額が参加者1名分のお支払い総額です。午前・午後の両方に参加する場合は、4,000円のコースをお選びください。お支払い方法は次の画面で確認できます。お支払いが完了していない場合、お申し込みは確定していません。</p>
      </form>
      <div className={styles.checklist}><h3>キャンセル・変更について</h3><ul><li>11月21日まで：参加費の100％を返金</li><li>11月22日〜25日：参加費の50％を返金</li><li>11月26日〜当日：原則返金なし</li></ul><p className={styles.small}>RBAがキャンセルのご連絡を受け取った日（日本時間）を基準に返金額を計算します。決済事業者から返還されない手数料や、すでに発生した返金できない実費を差し引く場合があります。RBAの都合で中止する場合は、参加費を全額返金します。詳細は<a href="/ja/policies">参加規約・キャンセル方針</a>をご確認ください。</p><p>変更・キャンセル、お支払いについてのお問い合わせ：<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>。参加者のお名前と、午前・午後・両方のいずれに申し込んだかをお知らせください。お支払いが完了したか分からない場合は、再度お支払いをせずにお問い合わせください。</p></div>
      <details className={styles.checklist}><summary>メール・DMでのお申し込み・ご相談</summary><p>オンラインでのお手続きが難しい場合は、主催者のメールアドレス、またはRBA公式InstagramのDMへご連絡ください。すでにお申し込み済みの場合は、その旨をお伝えください。</p><div className={styles.actions}><a href={applicationEmail("午前／午後／通し（選択してください）")}>主催者へメール ↗</a><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">RBA公式Instagram ↗</a></div><p className={styles.email}>主催者メール：wakuuzu@gmail.com</p></details>
    </section>

    <section className={styles.section} aria-labelledby="posters"><p className={styles.label}>BASTET × RBA</p><h2 id="posters">開催案内</h2><p className={styles.small}>下の画像ではメール・DMでのお申し込みをご案内していますが、現在はこちらのページからも、お申し込みとお支払いができます。</p><div className={styles.gallery}>{["開催概要", "鹿児島で直接指導", "午前・午後の開催時間", "参加費", "メール・DMの申込方法"].map((alt, index) => <a key={alt} href={`/events/kagoshima-20261129/0${index + 1}.png`} target="_blank" rel="noopener noreferrer" aria-label={`${alt}の画像を開く`}><Image src={`/events/kagoshima-20261129/0${index + 1}.png`} alt={`RBA公式ロゴ入り：${alt}`} width={1254} height={1254} sizes="(max-width: 760px) 44vw, 220px"/></a>)}</div></section>
    <p className={styles.bottom}><a href="/ja/schedule">← ほかのクリニック・イベントを見る</a></p>
  </div></SiteFrame>;
}
