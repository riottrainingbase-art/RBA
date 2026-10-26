import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const path = "/ja/events/kagoshima-clinic-2026-11-29";
const title = "11/29 BASTET × RBA 鹿児島クリニック｜錦江湾高校体育館";
const description = "2026年11月29日（日）、錦江湾高校体育館で開催。小・中・高校生（男女）対象。午前9:30〜12:00／午後13:00〜15:30。通し4,000円・1部のみ3,000円。公式サイトから参加枠を選び、参加者情報の入力・オンライン決済までお手続きいただけます。";
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
        <h1>鹿児島で、<br/>一緒にバスケ。</h1>
        <p className={styles.lead}>BASTET CLINIC<br/><strong>2026年11月29日（日）</strong><br/>錦江湾高校体育館（鹿児島市）</p>
        <p>Riot Basketball Academyのクリニックを鹿児島で開催します。小・中・高校生の皆さん、コートでお会いしましょう。</p>
        <a className={styles.primary} href="#entry">参加枠を選んで申し込む ↓</a>
      </div>
      <Image className={styles.poster} src="/events/kagoshima-20261129/01.png" alt="RBA公式ロゴ入り BASTET × RBA 鹿児島クリニック開催案内" width={1254} height={1254} sizes="(max-width: 760px) 92vw, 480px" priority/>
    </section>

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
      <p>各部2時間30分。途中に休憩を入れながら実施します。</p>
    </section>

    <section className={styles.section} id="entry" aria-labelledby="application">
      <p className={styles.label}>APPLICATION / ONLINE PAYMENT</p><h2 id="application">参加枠を選んで、そのまま申し込み。</h2>
      <p className={styles.lead}>① 参加枠を選ぶ → ② 参加者・保護者情報を入力 → ③ 決済完了で受付確定</p>
      <p>保護者の方がお手続きください。1回の決済で参加者1名を受け付けます。きょうだいで参加する場合も、1名ずつお申し込みください。</p>
      <p className={styles.notice}><strong>すでにメール・DMで申し込んだ方へ：</strong>主催者からの支払案内を確認し、重複して申し込み・決済しないでください。支払済みの方は再決済不要です。</p>
      {afternoonClosed ? <p className={styles.notice}>オンライン受付は終了しました。お問い合わせはRBAへご連絡ください。</p> : null}
      <form action="/api/clinics/kagoshima-20261129/checkout" method="post" className={styles.entryForm}>
        <fieldset className={styles.consent}><legend>お申し込み前の確認</legend>
          <label><input type="checkbox" name="guardian" value="yes" required/> 保護者が、小学生・中学生・高校生の参加を申し込みます。</label>
          <label><input type="checkbox" name="terms" value="yes" required/> 下記のキャンセル条件と<a href="/ja/policies" target="_blank" rel="noopener noreferrer">RBA参加規約</a>を確認しました。</label>
          <p className={styles.small}>このページでは個人情報を送信しません。次のStripe決済画面で、参加者氏名・ふりがな、学年・性別、保護者氏名・メール・電話番号、保護者同意を入力します。お預かりした情報はRBAが受付・決済・当日連絡に使用します。主催者への共有が必要な場合は事前に確認します。</p>
        </fieldset>
        <div className={styles.plans}>
          <article className={styles.plan}><p className={styles.label}>MORNING</p><h3>午前の部</h3><p>9:30〜12:00</p><p className={styles.price}>3,000<span>円／1名</span></p><button type="submit" name="session" value="am" disabled={morningClosed}>午前を申し込む →</button></article>
          <article className={styles.plan}><p className={styles.label}>AFTERNOON</p><h3>午後の部</h3><p>13:00〜15:30</p><p className={styles.price}>3,000<span>円／1名</span></p><button type="submit" name="session" value="pm" disabled={afternoonClosed}>午後を申し込む →</button></article>
          <article className={styles.plan}><p className={styles.label}>FULL DAY</p><h3>午前・午後 通し</h3><p>9:30〜12:00／13:00〜15:30</p><p className={styles.price}>4,000<span>円／1名</span></p><button type="submit" name="session" value="full" disabled={morningClosed}>通しで申し込む →</button></article>
        </div>
        <p className={styles.small}>表示額はお支払い総額です。通し参加は、午前・午後を別々に決済せず「通し」を選んでください。支払方法は決済画面に表示されます。支払待ち・失敗の状態では受付確定になりません。</p>
      </form>
      <div className={styles.checklist}><h3>キャンセル・変更について</h3><ul><li>11月21日まで：参加費の100％を返金</li><li>11月22日〜25日：参加費の50％を返金</li><li>11月26日〜当日：原則返金なし</li></ul><p className={styles.small}>日本時間での連絡受領日が基準です。返還されない決済手数料・返金不能な外部実費を差し引く場合があります。RBA都合の中止は参加費を全額返金します。詳細は<a href="/ja/policies">参加規約・キャンセル方針</a>をご確認ください。</p><p>変更・キャンセル・決済状況の確認：<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>。参加者名・参加枠を添えてご連絡ください。結果が分からない場合も再決済せずお問い合わせください。</p></div>
      <details className={styles.checklist}><summary>メール・DMでの相談・申し込み</summary><p>オンライン手続きが難しい場合は、主催者メールまたはRBA公式Instagramへご連絡ください。オンライン・メール・DMの複数経路から重複申し込みをしないでください。</p><div className={styles.actions}><a href={applicationEmail("午前／午後／通し（選択してください）")}>主催者へメール ↗</a><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">RBA公式Instagram ↗</a></div><p className={styles.email}>主催者メール：wakuuzu@gmail.com</p></details>
    </section>

    <section className={styles.section} aria-labelledby="posters"><p className={styles.label}>BASTET × RBA</p><h2 id="posters">開催案内</h2><p className={styles.small}>案内画像のメール・DM受付に加え、このページからオンライン申し込み・決済をご利用いただけます。</p><div className={styles.gallery}>{["開催概要", "鹿児島で直接指導", "午前・午後の開催時間", "参加費", "メール・DMの申込方法"].map((alt, index) => <a key={alt} href={`/events/kagoshima-20261129/0${index + 1}.png`} target="_blank" rel="noopener noreferrer" aria-label={`${alt}の画像を開く`}><Image src={`/events/kagoshima-20261129/0${index + 1}.png`} alt={`RBA公式ロゴ入り：${alt}`} width={1254} height={1254} sizes="(max-width: 760px) 44vw, 220px"/></a>)}</div></section>
    <p className={styles.bottom}><a href="/ja/schedule">← ほかのクリニック・イベントを見る</a></p>
  </div></SiteFrame>;
}
