import { OKINAWA_CAMP_LOGISTICS, OKINAWA_CAMP_LOGISTICS_COPY } from "@/lib/okinawa-camp-logistics";
import { OkinawaEarlyBird } from "@/components/okinawa-early-bird";
import { OkinawaResidentPrices } from "@/components/okinawa-resident-prices";
import { OkinawaCampPartner } from "@/components/okinawa-camp-partner";
import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { CAMP_JAPAN_CONTACT } from "@/lib/okinawa-camp-pricing";
import scheduleStyles from "./schedule.module.css";
import styles from "../kagoshima-clinic-2026-11-29/page.module.css";

const official = "https://okinawa.camp/";
const registration = "/ja/events/okinawa-international-camp-2026/apply";
const overseasEmail = "mailto:hi@spartans.com.tw?subject=Okinawa%20Camp%202026";
export const metadata: Metadata = {
  title: "沖縄国際ユースバスケットボールキャンプ｜2026年12月22〜24日・7〜18歳",
  description: "沖縄で世界の仲間と練習・ゲーム・共同生活。糸満青少年の家での開催は施設側の了承を得ています（RBA確認）。宿泊手続き・体育館の時間・集合解散時刻は調整中。沖縄県民割引：通い27,500円・宿泊39,600円（税込）。料金・早割・日程・申込方法と、送迎やスタッフの調整状況をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/events/okinawa-international-camp-2026" },
};

export default function Page() {
  return <SiteFrame locale="ja"><div className={styles.page}>
    <OkinawaEarlyBird/>
    <section className={styles.hero}>
      <div><a className={styles.back} href="/ja/schedule">← 開催予定</a><p className={styles.label}>OKINAWA / INTERNATIONAL YOUTH BASKETBALL CAMP</p><h1>沖縄で、<br/>世界の仲間と。</h1><p className={styles.lead}><strong>2026年12月22日（火）〜24日（木）</strong><br/>7〜18歳の選手対象・2泊3日</p><p>練習・ゲーム・食事・共同生活を通じて、国や言葉を越えてつながる国際ユースバスケットボールキャンプです。</p><a className={styles.primary} href="#okinawa-resident-discount">プランを選んで申込・決済へ ↓</a><p><a href="#okinawa-resident-discount"><strong>沖縄県民割引のご案内 ↓</strong></a></p><p><a href="#okinawa-domestic-prices"><strong>県外からの参加プラン ↓</strong></a></p><p><a href="#camp-coaches">キャンプコーチを紹介 ↓</a></p></div>
      <aside className={styles.card}><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={102} height={157}/><h2>糸満青少年の家</h2><p>{OKINAWA_CAMP_LOGISTICS_COPY.ja.summary}</p><p><strong>{OKINAWA_CAMP_LOGISTICS_COPY.ja.status}</strong><br/>{OKINAWA_CAMP_LOGISTICS.address}</p><p>{OKINAWA_CAMP_LOGISTICS_COPY.ja.departure}</p><a href="https://www.itoman.nikkei.okinawa/" target="_blank" rel="noopener noreferrer">施設の公式サイト ↗</a></aside>
    </section>
    <section className={styles.section} id="cancellation"><h2>キャンセル・中止・返金について</h2><p>申込直後から一律20％を差し引く規定や、20日前以降は一律返金しない規定は設けていません。主催者都合・不可抗力による開催前の中止は参加費を全額返金します。開始後の一部中止は未提供分を返金します。参加者都合の取消条件・返金方法は、下記をご確認ください。</p><a className={styles.primary} href="/ja/cancellation">キャンセル・返金規定を読む →</a><p>スタッフ配置と保険の詳細は確認後にご案内します。施設の賠償責任保険と、選手のけがに備える傷害保険は補償内容が異なります。</p></section>
    <OkinawaResidentPrices/><OkinawaResidentPrices residence="japan"/>
    <section className={styles.section} aria-labelledby="camp-coaches">
      <p className={styles.label}>CAMP COACHES / JAPAN × TAIWAN</p>
      <h2 id="camp-coaches">キャンプコーチの紹介</h2>
      <p>日本と台湾で育成年代の交流を重ねてきた、西尾優人とElton。子どもたちが一緒にプレーし、新しい仲間や考え方に出会う3日間をつくります。</p>
      <div className={styles.columns}>
        <article className={styles.card} aria-labelledby="coach-nishio">
          <p className={styles.label}>RIOT BASKETBALL ACADEMY / JAPAN</p>
          <h3 id="coach-nishio">西尾 優人 <span className={styles.small}>Masato Nishio</span></h3>
          <p><strong>Riot Basketball Academy 代表・ヘッドコーチ</strong></p>
          <p>ドイツのBVケムニッツ99での活動を経験し、現在は日本各地で育成年代の指導や指導者の学びを支えています。これまでに全国で4,000名以上の選手を指導。台湾のSPARTANSとも連携し、選手同士の交流やクリニックに取り組んでいます。</p>
          <p>大切にしているのは、状況を見て、自分で判断し、プレーすること。基本技術をゲームの中で使える力につなげ、年齢や経験に合った課題を通じて、一人ひとりの挑戦を支えます。</p>
          <p className={styles.small}><a href="https://rbaofficialnm2.wixsite.com/riot-rba/about-9" target="_blank" rel="noopener noreferrer">経歴・育成方針を見る ↗</a></p>
        </article>
        <article className={styles.card} aria-labelledby="coach-elton">
          <p className={styles.label}>SPARTANS / TAIWAN</p>
          <h3 id="coach-elton">Elton Chen <span className={styles.small}>エルトン・チェン</span></h3>
          <p><strong>SPARTANS（台湾）／日台バスケットボール交流</strong></p>
          <p>NBA Taiwanでの勤務経験を持ち、台湾のSPARTANSを通じて育成年代のバスケットボールと国際交流に携わっています。RBAとは2026年8月の沖縄での交流、同年10月の台湾での練習・親善試合・クリニックなどで連携してきました。</p>
          <p>海外の選手や指導者と出会う機会を、より多くの子どもたちに届けることを目指しています。バスケットボールを共通の言葉に、国や言葉の違いを越えて学び合う機会づくりに取り組んでいます。</p>
          <p className={styles.small}><a href="https://note.com/rba_official/n/nd7e845a1453c" target="_blank" rel="noopener noreferrer">RBAとEltonの日台交流の活動を読む ↗</a></p>
        </article>
      </div>
      <p><a href={registration}>料金を選んで、申込・決済へ →</a></p>
    </section>
    <OkinawaCampPartner locale="ja"/>
    <section className={styles.section} aria-labelledby="entry-desk"><p className={styles.label}>REGISTRATION / 参加窓口</p><h2 id="entry-desk">国内参加は、そのまま申込・決済へ。</h2><p>通い27,500円・宿泊39,600円（税込）。上のプランボタンから、選手情報・保護者の連絡先の入力とお支払いをまとめて行えます。事前のメール申込は不要です。県外からの国内参加は、通い30,250円・宿泊43,560円（税込）です。県外向けプランからも、そのまま申込・決済へ進めます。</p><a className={styles.primary} href="#okinawa-resident-discount">プランを選んで申込・決済へ ↑</a><p><a href="#okinawa-domestic-prices">県外からの国内参加プランはこちら</a></p><p>すでにお申し込み・お支払い済みの方は、重複して手続きせずRBAへご連絡ください。メールが開かない場合は、riot.training.base@gmail.comへ直接お送りいただくか、Instagramからご連絡ください。</p><p className={styles.email}>riot.training.base@gmail.com</p><p><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noopener noreferrer">メールが開かない場合：RBA公式InstagramからDMで相談 ↗</a></p><p className={styles.small}>海外参加者向けサイト「okinawa.camp」と掲載の米ドル料金は、海外から参加される方の案内です。日本国内の方は、上の国内向け日本円プランをご利用ください。</p></section>
    <section className={styles.section}><p className={styles.label}>CONNECT · LEARN · CHALLENGE</p><h2>バスケットボールの先にある経験を。</h2><div className={styles.columns}>
      <article className={styles.card}><h3>見て、判断して、プレーする</h3><p>西尾優人が指導し、基本技術、チームの攻防、ゲームを通じて学びます。技を覚えるだけでなく、状況を見て、判断し、自分で考えて挑戦することを大切にします。年齢や技術・経験に応じたグループ分けを予定しています。</p></article>
      <article className={styles.card}><h3>国や言葉を越えてつながる</h3><p>日本と海外の選手が、同じコートで練習し、ゲームで挑戦します。宿泊参加者は食事や共同生活も通じて、国や言葉を越えた交流を深めます。参加国・人数・組分けは申込状況に応じて調整します。</p></article>
    </div><h3>RBA 1対1チャンピオンシップ</h3><p>初日の予選、2日目の順位リーグ・決勝を予定。同じくらいのレベルの選手と対戦する機会をつくり、3日目の閉会時に表彰する計画です。進行は人数・施設利用時間に合わせて調整します。</p></section>
    <section className={styles.section} id="schedule" aria-labelledby="schedule-heading">
      <p className={styles.label}>3-DAY SCHEDULE / 日本時間</p><h2 id="schedule-heading">3日間の詳細スケジュール（予定）</h2>
      <div className={scheduleStyles.notice}><strong>現在調整中のスケジュールです。</strong><p>体育館を利用できる時間に合わせて、集合・解散や食事の時間を調整しています。最終日は15:00まで活動し、15:30に解散する予定で施設・共同主催者と相談中です。午後の活動や昼食、退室後の荷物の保管については、決まり次第お知らせします。航空券や送迎の手配・変更は、集合・解散時間と施設の正式受入条件の確定後にお願いいたします。返金不可の航空券を先に予約しないでください。</p></div>
      {[
        { date: "12月22日（火）", theme: "CONNECT｜出会い、基礎をつくる", note: "午前中に受付とオリエンテーションを行い、午後からコートでの活動を始める予定です。体育館の利用時間は14:00〜18:00で調整しています。", rows: [
          ["9:00〜11:00", "受付・健康確認（予定）"], ["11:00〜12:00", "オリエンテーション・仲間との顔合わせ"], ["12:00〜14:00", "昼食・休憩・練習の準備（食事の時間・手配は調整中）"], ["14:00〜15:15", "体の動かし方・ボールの扱い方・ゴール近くでのシュート練習"], ["15:15〜15:30", "休憩・給水"], ["15:30〜16:30", "1対1の練習・チャンピオンシップ予選"], ["16:30〜17:30", "チームに分かれて、少人数でのゲーム"], ["17:30〜18:00", "振り返り・片付け・通いで参加する選手のお迎え（予定）"], ["活動終了後", "宿泊参加者：夕食・入浴・交流・就寝準備（施設の生活時間に合わせて調整）"]
        ] },
        { date: "12月23日（水）", theme: "CHALLENGE｜判断し、仲間と挑む", note: "体育館の利用時間は9:00〜17:00で調整しています。", rows: [
          ["朝", "宿泊参加者：起床・健康確認・朝食"], ["8:30〜9:00", "通い参加者の受付・健康確認（予定）"], ["9:00〜10:15", "パス・味方との間隔の取り方・相手を見て判断する練習"], ["10:15〜10:30", "休憩・給水"], ["10:30〜11:45", "2対2・3対3で、練習したことを試す"], ["11:45〜13:00", "午前の片付け・昼食・休憩"], ["13:00〜14:15", "1対1チャンピオンシップ順位リーグ・決勝"], ["14:15〜14:45", "休憩・交流"], ["14:45〜16:15", "混合チームでの交流ゲーム"], ["16:15〜17:00", "振り返り・片付け・通いで参加する選手のお迎え（予定）"], ["活動終了後", "宿泊参加者：夕食・入浴・仲間と一日の振り返り・就寝準備"]
        ] },
        { date: "12月24日（木）", theme: "PERFORM｜成長を確かめ、次につなげる", note: "最終日も午後まで活動できるよう、施設と調整しています。以下は15:00に活動を終え、15:30に解散する場合の予定です。", rows: [
          ["朝", "朝食・荷物整理・清掃・部屋の退室（施設が指定する時間までに行います）"], ["8:30〜9:00", "通い参加者の受付・健康確認（予定）"], ["9:00〜10:15", "2日間で学んだことを確かめる練習"], ["10:15〜10:30", "休憩・給水"], ["10:30〜11:45", "チーム練習・交流ゲーム"], ["11:45〜13:00", "片付け・昼食・休憩（昼食の手配は確認中）"], ["13:00〜14:15", "最後の交流ゲーム（午後の利用が可能な場合）"], ["14:15〜14:30", "休憩"], ["14:30〜15:00", "振り返り・これからの目標づくり・表彰・閉会（午後の利用が可能な場合）"], ["15:00〜15:30", "片付け・お迎え・解散（時間は調整中）"]
        ] }
      ].map(day => <article key={day.date} className={scheduleStyles.day}><h3>{day.date}</h3><p><strong>{day.theme}</strong></p><p className={styles.small}>{day.note}</p><table className={scheduleStyles.table}><caption className={scheduleStyles.caption}>{day.date}の活動予定</caption><thead><tr><th scope="col">時間</th><th scope="col">内容</th></tr></thead><tbody>{day.rows.map(([time, activity]) => <tr key={time}><th scope="row">{time}</th><td>{activity}</td></tr>)}</tbody></table></article>)}
      <p className={styles.small}>2026年10月28日更新。年齢や経験に合わせてグループを分け、こまめに休憩や水分補給の時間を取ります。参加人数や子どもたちの体調、施設の利用状況により、時間や内容が変わる場合があります。通いで参加する方の食事・送迎は個別にご案内します。24日に午後の利用ができない場合は、ゲームや表彰を午前中に行う日程に変更します。BBQについても施設と相談中です。</p>
      <aside className={scheduleStyles.prizes}><p className={styles.label}>PARTNER SUPPORT</p><h3>スポンサーの皆さまからの景品も準備中です</h3><p>子どもたちの挑戦を応援してくださるスポンサーの皆さまと、景品の準備を進めています。どんな景品が届くか、誰にどのようにお渡しするかなど、詳しい内容は決まり次第、このページでお知らせします。</p></aside>
    </section>
    <section className={styles.section} id="entry"><p className={styles.label}>PRICING / USD</p><h2>海外参加者向け料金とお申し込み</h2><p>以下は海外からの参加者向け料金です。日本国内の参加者は、上の日本円プランから申込・決済へお進みください。</p><dl className={styles.facts}>
      <div><dt>宿泊・食事付き</dt><dd>通常 <strong>450米ドル／1名</strong><br/>早割20％：360米ドル<br/>早割＋2名以上の追加10％併用：<strong>324米ドル／1名</strong></dd></div>
      <div><dt>宿泊なし</dt><dd>通常 <strong>300米ドル／1名</strong><br/>早割20％：240米ドル<br/>早割＋2名以上の追加10％併用：<strong>216米ドル／1名</strong></dd></div>
      <div><dt>早割期間</dt><dd>早割継続中。新しい終了日は決まり次第ご案内します。適用条件・最終金額は申込画面でご確認ください。</dd></div>
      <div><dt>別途・要確認</dt><dd>航空券は別途手配。空港送迎の時間・条件・費用、宿泊なしプランの食事の扱いは、お支払い前にご確認ください。</dd></div>
    </dl><p>追加10％は早割後の金額に適用する計算です（450 × 0.8 × 0.9 = 324米ドル）。日本円の定額料金ではありません。</p>
    <div className={styles.columns}><article className={styles.card}><h3>参加窓口を選ぶ</h3><p>沖縄県民の方はプランを選ぶと申込・決済へ進めます。県外からの国内参加も、日本円で申込・決済へ進めます。海外参加者は宿泊・人数から海外向け料金を確認し、申込・決済へ進めます。海外フォームは1回2名まで。3名以上は個別相談です。</p><a className={styles.primary} href={registration}>国内・海外のお申し込みへ →</a><p className={styles.small}>申込情報と入金は主催者が照合します。支払い完了は参加の最終確定ではありません。</p></article><article className={styles.card}><h3>参加・送迎について相談する</h3><p>初日の受付時刻と最終日の解散時刻は調整中です。到着便から会場への移動や空港への帰路は、確定した集合・解散案内をご確認のうえご相談ください。</p><a className={styles.primary} href={CAMP_JAPAN_CONTACT}>RBAへ参加・送迎を相談する ↗</a><p className={styles.email}>RBA：riot.training.base@gmail.com</p><p><a href={overseasEmail}>海外参加者の窓口：SPARTANS ↗</a></p></article></div></section>
    <section className={styles.section}><h2>参加前に確認しておきたいこと</h2><h3>空港送迎・前泊</h3><p>那覇空港または指定場所からの送迎を希望する方は、事前にご相談ください。会場へ直接お越しいただく方法もあります。12月21日・22日それぞれの到着人数と便の情報を確認し、バス・バンの手配と費用を調整します。送迎付き・追加料金なしとは確定していません。12月21日の前泊は、施設側の承認がある場合を除き別途手配が必要です。</p><h3>スタッフ・宿泊中の見守り</h3><p>キャンプコーチは西尾優人とElton Chen。指導責任者はRBAの西尾優人です。追加の指導・引率スタッフや宿泊中の見守り体制は調整中で、確定後にご案内します。低学年・初心者のお子さんの参加、夜間の見守り、体調・食事面の配慮については個別にご確認ください。</p><h3>持ち物と施設ルール</h3><p>体育館用シューズ、運動着、飲み物用ボトル、帽子、タオル、洗面用品、スリッパなど。施設は全館禁煙で、寝室・体育館での飲食や外部からの食品持込みには制限があります。最終的な持ち物・ルールは参加案内をご確認ください。</p><p><a href={official} target="_blank" rel="noopener noreferrer">海外参加者向け特設サイト：okinawa.camp ↗</a></p></section>
    <p className={styles.bottom}><a href="/ja/schedule">← ほかの開催予定を見る</a></p>
  </div></SiteFrame>;
}
