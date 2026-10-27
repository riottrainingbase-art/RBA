import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
const path = "/ja/events/shizugawa-development-camp-2026";
const form = "https://form.jotform.com/262498430063054";
const contact = `mailto:riot.training.base@gmail.com?subject=${encodeURIComponent("志津川キャンプ参加希望")}&body=${encodeURIComponent("お子さまの学年：\n参加希望人数：\n保護者のお名前：\nご質問・ご相談：\n")}`;
export const metadata: Metadata = {
  title: "志津川育成キャンプ｜11/7–8・南三陸で学ぶ攻守の切り替え｜RBA",
  description: "2026年11月7〜8日、宮城県志津川自然の家で1泊2日。小学3年〜中学3年対象、参加費25,000円。攻守が変わった瞬間に、見て、選び、動き出す学び。外部参加は受入枠・条件を確認してご案内します。",
  alternates: { canonical: `https://riotbasketballacademy.com${path}` },
  openGraph: { title: "海と森の志津川で、次のプレーへ。｜RBA育成キャンプ", description: "11/7–8｜宮城県志津川自然の家｜1泊2日・25,000円。外部参加のご相談受付。", url: `https://riotbasketballacademy.com${path}`, images: ["/rba-logo-original.jpg"] },
};

const themes = [
  { n: "01", en: "ATTACK → DEFEND", title: "ボールを失った。\nその瞬間、何を見る？", body: "取り返しに行く？ 先に戻る？ ゴールと相手と仲間の位置を見て、次の行動を選ぶ。「早く戻れ」の先にある判断を学びます。" },
  { n: "02", en: "DEFEND → ATTACK", title: "守った後こそ、\nチャンスがある。", body: "リバウンドを取った、その次は？ 前へ運ぶ、パスを出す、広がって受ける。相手が整う前に、攻める場所を見つけます。" },
  { n: "03", en: "NOTICE → CHOOSE → PLAY", title: "速く走るだけでなく、\n速く気づく。", body: "毎回、同じ正解があるわけではありません。目の前の状況を見て選び、試し、振り返る。練習した技術を、次のプレーにつなげます。" },
];

export default function Page() {
  const closed = Date.now() >= Date.parse("2026-11-07T09:00:00+09:00");
  return <SiteFrame locale="ja"><div className={styles.page}>
    <section className={styles.hero}>
      <a className={styles.back} href="/ja/schedule">← 開催日程へ</a>
      <div className={styles.brand}><Image src="/rba-logo-original.jpg" alt="RBA公式ロゴ" width={53} height={76}/><span>RBA DEVELOPMENT CAMP<br/><small>SHIZUGAWA / MINAMISANRIKU</small></span></div>
      <p className={styles.eyebrow}>MIYAGI · 2026.11.07–08</p>
      <h1>海と森の志津川で、<br/>次のプレーへ。</h1>
      <p className={styles.heroLead}>攻めて終わり。守って終わり。その先へ。<br/>攻守が変わった瞬間に、見て、選んで、動き出す。</p>
      <div className={styles.heroFacts}><strong>11.7<span> SAT</span> — 8<span> SUN</span></strong><p>宮城県志津川自然の家<br/>小学3年〜中学3年 ／ 1泊2日</p></div>
      <a className={styles.primary} href="#entry">{closed ? "開催・お問い合わせの案内を見る" : "参加方法・条件を確認する"} <span aria-hidden="true">↗</span></a>
      <svg className={styles.coast} viewBox="0 0 1200 280" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 126 80 95 145 115 224 55 305 87 385 61 465 113 560 96 640 145 715 107 800 131 880 62 980 99 1070 50 1200 100V280H0Z" fill="#184b46"/><path d="M0 170Q160 125 320 180T640 180T960 180T1280 180V280H0Z" fill="#0b3542"/><path d="M0 211Q150 177 300 216T600 216T900 216T1200 216M0 249Q150 215 300 254T600 254T900 254T1200 254" stroke="#e6f0e9" strokeWidth="2" fill="none" opacity=".4"/></svg>
    </section>
    <div className={styles.ribbon}><span>SHIZUGAWA</span><strong>いつもの自分に、新しい選択肢を。</strong><span>COURT / LEARNING / STAY</span></div>

    <section className={styles.section} aria-labelledby="learning"><p className={styles.eyebrow}>THE NEXT PLAY</p><h2 id="learning">切り替えは、<br/>走る速さだけじゃない。</h2><p className={styles.intro}>ボールを失った後、立ち止まってしまう。守った後、次の攻めに関われない。そんな場面を、考えて動けるきっかけに。今回のテーマは、現代バスケットボールの攻守の切り替えです。</p>
      <div className={styles.themes}>{themes.map(t=><article key={t.n}><p className={styles.eyebrow}>{t.n} / {t.en}</p><h3>{t.title.split("\n").map((line,i)=><span key={line}>{i>0?<br/>:null}{line}</span>)}</h3><p>{t.body}</p></article>)}</div>
    </section>

    <section className={styles.place} aria-labelledby="place"><div><p className={styles.eyebrow}>A LITTLE AWAY FROM EVERYDAY</p><h2 id="place">海のそばで、<br/>仲間と過ごす2日間。</h2><p>里海と里山に囲まれた南三陸・志津川。いつもの練習場所を離れ、コートで挑戦し、夜の研修で振り返る。仲間と過ごす1泊2日を、次の練習へつながる時間にします。</p><a href="https://www.pref.miyagi.jp/soshiki/sz-seinen/" target="_blank" rel="noopener noreferrer">会場の公式案内を見る ↗</a></div><div className={styles.placeNote}><span>MINAMISANRIKU</span><strong>志津川</strong><p>宮城県志津川自然の家<br/>宮城県本吉郡南三陸町戸倉字坂本88-1</p><small>このキャンプはバスケットボールの実技・研修を予定しています。海洋体験や観光の実施案内ではありません。</small></div></section>

    <section className={styles.section} aria-labelledby="days"><p className={styles.eyebrow}>TWO DAYS / ONE NEXT STEP</p><h2 id="days">試す。振り返る。<br/>また、試す。</h2><div className={styles.days}><article><p className={styles.eyebrow}>DAY 01 / 11.7 SAT</p><h3>コートで挑戦。<br/>夜は、学びを整理。</h3><dl><div><dt>9:00</dt><dd>入所・オリエンテーション</dd></div><div><dt>10:00頃〜</dt><dd>実技研修</dd></div><div><dt>夜</dt><dd>研修室での振り返り・学び</dd></div></dl></article><article><p className={styles.eyebrow}>DAY 02 / 11.8 SUN</p><h3>気づきを、<br/>次のプレーへ。</h3><dl><div><dt>午前・午後</dt><dd>体育館での実技研修</dd></div><div><dt>活動後</dt><dd>退所式</dd></div><div><dt>15:30</dt><dd>退所予定</dd></div></dl></article></div><p className={styles.small}>進行・練習メニューは調整のうえ、参加者へ最終案内します。休憩を挟みながら実施します。</p></section>

    <section className={styles.overview} aria-labelledby="overview"><p className={styles.eyebrow}>CAMP INFORMATION</p><h2 id="overview">参加の前に、ここを確認。</h2><dl className={styles.facts}><div><dt>開催日</dt><dd>2026年11月7日（土）〜8日（日）・1泊2日</dd></div><div><dt>対象</dt><dd>小学3年生〜中学3年生<br/><small>外部参加は学年・受入枠・宿泊条件を確認してご案内します。</small></dd></div><div><dt>参加費</dt><dd><strong>25,000円／1名</strong><br/><small>費用に含まれる範囲・移動方法は、お申し込み前にRBAへご確認ください。</small></dd></div><div><dt>会場</dt><dd>宮城県志津川自然の家<br/><small>施設の使用許可を受領済みです。</small></dd></div><div><dt>引率</dt><dd>西尾優人・高橋優作</dd></div><div><dt>食事</dt><dd>初日昼・夕／2日目朝・昼の4食を申請。<br/><small>食物アレルギーは事前確認が必要です。施設では微量混入への対応を行っていません。個別の安全条件を確認してから参加をご判断ください。</small></dd></div></dl></section>

    <section className={styles.section} id="entry" aria-labelledby="entry-title"><p className={styles.eyebrow}>YOUR NEXT COURT</p><h2 id="entry-title">その一歩を、<br/>志津川から。</h2>{closed?<p className={styles.notice}>この日程への新規参加受付は終了しました。開催に関するお問い合わせはRBAまでご連絡ください。</p>:<><p className={styles.intro}>外部からの参加も、まずはご相談ください。お子さまの学年・参加希望人数・保護者のお名前を添えて「志津川キャンプ参加希望」とお知らせください。</p><ol className={styles.steps}><li><strong>01 参加条件を相談</strong><span>学年・受入枠・宿泊・食事の条件を確認します。</span></li><li><strong>02 申込フォームに入力</strong><span>RBAから参加可能の案内を受けてから、保護者の方がお手続きください。</span></li><li><strong>03 個別案内に沿って支払い</strong><span>費用とキャンセル条件を確認してから。相談・フォーム送信だけで参加確定にはなりません。</span></li></ol><div className={styles.actions}><a className={styles.primary} href={contact}>メールで参加相談する ↗</a><a className={styles.secondary} href={form} target="_blank" rel="noopener noreferrer">RBAから案内済みの方：申込フォーム ↗</a></div></>}
      <p className={styles.small}>InstagramのRBA公式アカウントへのDMでもご相談いただけます。メール：<a href={contact}>riot.training.base@gmail.com</a></p><p className={styles.notice}>すでに申し込み・支払いを済ませた方は、重複して手続きしないでください。集合場所・持ち物などは最終案内をご確認ください。<a href="/ja/policies#cancellation">参加規約・キャンセル方針</a>と、申込時に提示される個別条件をご確認ください。</p>
    </section>
  </div></SiteFrame>;
}
