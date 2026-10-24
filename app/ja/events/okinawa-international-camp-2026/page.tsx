import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { CAMP_JAPAN_CONTACT } from "@/lib/okinawa-camp-pricing";
import styles from "../kagoshima-clinic-2026-11-29/page.module.css";

const official = "https://okinawa.camp/";
const registration = "/ja/events/okinawa-international-camp-2026/apply";
const email = "mailto:hi@spartans.com.tw?cc=riot.training.base%40gmail.com&subject=Okinawa%20Camp%202026";
export const metadata: Metadata = {
  title: "沖縄国際ユースバスケットボールキャンプ｜2026年12月22〜24日・7〜18歳",
  description: "沖縄で世界の仲間と練習・ゲーム・共同生活。2泊3日、12月24日正午までの退所予定。料金・早割・日程・申込方法と、送迎やスタッフの調整状況をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026" },
};

export default function Page() {
  return <SiteFrame locale="ja"><div className={styles.page}>
    <section className={styles.hero}>
      <div><a className={styles.back} href="/ja/schedule">← 開催予定</a><p className={styles.label}>OKINAWA / INTERNATIONAL YOUTH BASKETBALL CAMP</p><h1>沖縄で、<br/>世界の仲間と。</h1><p className={styles.lead}><strong>2026年12月22日（火）〜24日（木）</strong><br/>7〜18歳の選手対象・2泊3日</p><p>練習・ゲーム・食事・共同生活を通じて、国や言葉を越えてつながる国際ユースバスケットボールキャンプです。</p><a className={styles.primary} href="#entry">料金・申込方法を見る ↓</a></div>
      <aside className={styles.card}><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={102} height={157}/><h2>糸満青少年の家</h2><p>会場候補：沖縄県糸満市。体育館・宿泊・食事を同じ施設で行う計画です。施設の利用枠・体育館の時間は最終調整中です。</p><p><strong>12月24日は正午までの退所を予定。</strong></p><a href="https://www.itoman.nikkei.okinawa/" target="_blank" rel="noopener noreferrer">施設の公式サイト ↗</a></aside>
    </section>
    <section className={styles.section} aria-labelledby="entry-desk"><p className={styles.label}>REGISTRATION / 参加窓口</p><h2 id="entry-desk">日本国内からの参加は、RBAへ。</h2><p>沖縄県内・県外を問わず、日本国内の参加者はRBAが窓口です。氏名・学年（年齢）・性別・連絡先・参加人数・宿泊希望を添えてお問い合わせください。国内料金・現地割引の条件と申込方法を、確認後に個別にご案内します。</p><a className={styles.primary} href={CAMP_JAPAN_CONTACT}>RBAへ国内参加を問い合わせる ↗</a><p className={styles.small}>海外参加者向けサイト「okinawa.camp」と掲載の米ドル料金は、海外から参加される方の案内です。日本国内の方は、海外向けフォームでの申込・決済前にRBAへご相談ください。</p></section>
    <section className={styles.section}><p className={styles.label}>CONNECT · LEARN · CHALLENGE</p><h2>バスケットボールの先にある経験を。</h2><div className={styles.columns}>
      <article className={styles.card}><h3>見て、判断して、プレーする</h3><p>西尾優人が指導し、基本技術、チームの攻防、ゲームを通じて学びます。技を覚えるだけでなく、状況を見て、判断し、自分で考えて挑戦することを大切にします。年齢や技術・経験に応じたグループ分けを予定しています。</p></article>
      <article className={styles.card}><h3>国や言葉を越えてつながる</h3><p>日本と海外の選手が、同じコートで練習し、ゲームで挑戦します。宿泊参加者は食事や共同生活も通じて、国や言葉を越えた交流を深めます。参加国・人数・組分けは申込状況に応じて調整します。</p></article>
    </div><h3>RBA 1対1チャンピオンシップ</h3><p>初日の予選、2日目の順位リーグ・決勝を予定。同じくらいのレベルの選手と対戦する機会をつくり、3日目の閉会時に表彰する計画です。進行は人数・施設利用時間に合わせて調整します。</p></section>
    <section className={styles.section}><p className={styles.label}>3-DAY PLAN</p><h2>3日間の予定</h2><dl className={styles.facts}>
      <div><dt>12/22（火）</dt><dd><strong>CONNECT｜出会い、基礎をつくる</strong><br/>9:00〜11:00 受付<br/>11:00〜12:00 オリエンテーション<br/>12:00以降は従来の予定どおり。基本練習、1対1予選、チーム活動、振り返り。</dd></div>
      <div><dt>12/23（水）</dt><dd><strong>CHALLENGE｜判断し、仲間と挑む</strong><br/>練習、1対1順位リーグ・決勝、3対3、映像や対話による振り返り。BBQは施設へ相談中です。</dd></div>
      <div><dt>12/24（木）</dt><dd><strong>PERFORM｜成長を試し、持ち帰る</strong><br/>最終ゲーム、表彰・閉会、片付け。正午までの退所予定。</dd></div>
    </dl><p className={styles.small}>2026年10月24日更新。初日午前は主催者Eltonからの最新案内を反映しています。時刻はすべて日本時間です。体育館の利用時間・研修室・活動内容は調整中です。集合・解散の最終案内をご確認ください。</p></section>
    <section className={styles.section} id="entry"><p className={styles.label}>PRICING / USD</p><h2>海外参加者向け料金とお申し込み</h2><p>以下は海外からの参加者向け料金です。日本国内の参加者には、RBAから国内料金・申込方法を個別にご案内します。</p><dl className={styles.facts}>
      <div><dt>宿泊・食事付き</dt><dd>通常 <strong>450米ドル／1名</strong><br/>早割20％：360米ドル<br/>早割＋2名以上の追加10％併用：<strong>324米ドル／1名</strong></dd></div>
      <div><dt>宿泊なし</dt><dd>通常 <strong>300米ドル／1名</strong><br/>早割20％：240米ドル<br/>早割＋2名以上の追加10％併用：<strong>216米ドル／1名</strong></dd></div>
      <div><dt>早割期限</dt><dd>公式サイト案内：10月31日まで。適用条件・最終金額は申込画面でご確認ください。</dd></div>
      <div><dt>別途・要確認</dt><dd>航空券は別途手配。空港送迎の時間・条件・費用、宿泊なしプランの食事の扱いは、お支払い前にご確認ください。</dd></div>
    </dl><p>追加10％は早割後の金額に適用する計算です（450 × 0.8 × 0.9 = 324米ドル）。日本円の定額料金ではありません。</p>
    <div className={styles.columns}><article className={styles.card}><h3>参加窓口を選ぶ</h3><p>日本国内の参加はRBAへの問い合わせをご案内します。海外参加者は宿泊・人数から海外向け料金を確認し、申込・決済へ進めます。海外フォームは1回2名まで。3名以上は個別相談です。</p><a className={styles.primary} href={registration}>国内参加の問い合わせ・海外申込へ →</a><p className={styles.small}>申込情報と入金は主催者が照合します。支払い完了は参加の最終確定ではありません。</p></article><article className={styles.card}><h3>参加・送迎について相談する</h3><p>初日朝に到着する便から受付・オリエンテーションへの移動や、最終日の空港への移動など、不明点は予約前にご相談ください。</p><a className={styles.primary} href={email}>メールで問い合わせる ↗</a><p className={styles.email}>hi@spartans.com.tw<br/>RBA：riot.training.base@gmail.com</p></article></div></section>
    <section className={styles.section}><h2>参加前に確認しておきたいこと</h2><h3>空港送迎・前泊</h3><p>那覇空港または指定場所からの送迎を希望する方は、事前にご相談ください。会場へ直接お越しいただく方法もあります。12月21日・22日それぞれの到着人数と便の情報を確認し、バス・バンの手配と費用を調整します。送迎付き・追加料金なしとは確定していません。12月21日の前泊は、施設側の承認がある場合を除き別途手配が必要です。</p><h3>スタッフ・宿泊中の見守り</h3><p>指導責任者はRBAの西尾優人。追加の指導・引率スタッフは手配中で、確定後に案内予定です。低学年・初心者のお子さんの参加、夜間の見守り、体調・食事面の配慮については個別にご確認ください。</p><h3>持ち物と施設ルール</h3><p>体育館用シューズ、運動着、飲み物用ボトル、帽子、タオル、洗面用品、スリッパなど。施設は全館禁煙で、寝室・体育館での飲食や外部からの食品持込みには制限があります。最終的な持ち物・ルールは参加案内をご確認ください。</p><p><a href={official} target="_blank" rel="noopener noreferrer">海外参加者向け特設サイト：okinawa.camp ↗</a></p></section>
    <p className={styles.bottom}><a href="/ja/schedule">← ほかの開催予定を見る</a></p>
  </div></SiteFrame>;
}
