import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

const path = "/ja/events/kagoshima-clinic-2026-11-29";
const title = "11/29 BASTET × RBA 鹿児島クリニック｜錦江湾高校体育館";
const description = "2026年11月29日（日）、錦江湾高校体育館で開催。小・中・高校生（男女）対象。午前9:30〜12:00／午後13:00〜15:30。通し4,000円・1部のみ3,000円。メール・InstagramのDMでお申し込みいただけます。";
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
  return <SiteFrame locale="ja"><div className={styles.page}>
    <section className={styles.hero}>
      <div>
        <a className={styles.back} href="/ja/schedule">← クリニック・イベント日程</a>
        <p className={styles.label}>BASTET × RBA / KAGOSHIMA</p>
        <h1>鹿児島で、<br/>一緒にバスケ。</h1>
        <p className={styles.lead}>BASTET CLINIC<br/><strong>2026年11月29日（日）</strong><br/>錦江湾高校体育館（鹿児島市）</p>
        <p>Riot Basketball Academyのクリニックを鹿児島で開催します。小・中・高校生の皆さん、コートでお会いしましょう。</p>
        <a className={styles.primary} href="#entry">メール・DMで申し込む ↓</a>
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
      <p className={styles.label}>APPLICATION</p><h2 id="application">お申し込みは、メール・DMで。</h2>
      <div className={styles.columns}>
        <article className={styles.card}><h3>主催者へメールで申し込む</h3><p>参加希望の部を選ぶと、必要事項が入ったメールを開けます。内容を入力し、メールアプリから送信してください。</p>
          <div className={styles.actions}>{["午前", "午後", "通し"].map(session => <a key={session} href={applicationEmail(session)}>{session}で申し込む ↗</a>)}</div>
          <p className={styles.email}><a href={applicationEmail("午前／午後／通し（選択してください）")}>wakuuzu@gmail.com</a></p>
        </article>
        <article className={styles.card}><h3>InstagramのDMで申し込む</h3><p>RBA公式Instagramのプロフィールを開き、「メッセージ」から以下の必要事項をお送りください。</p><a className={styles.primary} href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">RBA公式Instagramを開く ↗</a><p className={styles.small}>Instagramへのログインが必要な場合があります。メール・DMのどちらか一方からお申し込みください。</p></article>
      </div>
      <div className={styles.checklist}><h3>お送りいただく内容</h3><ol><li>参加者のお名前</li><li>学年・性別</li><li>保護者のお名前・連絡先（電話番号またはメール）</li><li>参加希望：午前／午後／通し</li></ol><p><strong>受付後、詳細をご案内します。</strong></p><p className={styles.small}>支払方法、集合・持ち物・駐車場、キャンセルの取り扱いは、受付後の案内でご確認ください。連絡先は公開コメントに書かず、メールまたはDMでお送りください。</p></div>
    </section>

    <section className={styles.section} aria-labelledby="posters"><p className={styles.label}>BASTET × RBA</p><h2 id="posters">開催案内</h2><div className={styles.gallery}>{["開催概要", "鹿児島で直接指導", "午前・午後の開催時間", "参加費", "メール・DMの申込方法"].map((alt, index) => <a key={alt} href={`/events/kagoshima-20261129/0${index + 1}.png`} target="_blank" rel="noopener noreferrer" aria-label={`${alt}の画像を開く`}><Image src={`/events/kagoshima-20261129/0${index + 1}.png`} alt={`RBA公式ロゴ入り：${alt}`} width={1254} height={1254} sizes="(max-width: 760px) 44vw, 220px"/></a>)}</div></section>
    <p className={styles.bottom}><a href="/ja/schedule">← ほかのクリニック・イベントを見る</a></p>
  </div></SiteFrame>;
}
