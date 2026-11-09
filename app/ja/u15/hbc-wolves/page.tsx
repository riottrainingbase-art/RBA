import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import styles from "./hbc.module.css";

const canonical = "https://riotbasketballacademy.com/ja/u15/hbc-wolves";
const instagram = "https://www.instagram.com/hbcwolves/";
const website = "https://kozaki-hbc.jimdosite.com/";
const teamPage = "https://kozaki-hbc.jimdosite.com/チーム/";
const membershipPage = "https://kozaki-hbc.jimdosite.com/入会案内/";
// HBC WOLVESの公開公式サイトに掲載された狼・バスケットゴールのエンブレム。
// 第三者の類似WOLVESロゴを使用しない。画像は公式公開元から読み込む。
const logo = "https://storage.e.jimdo.com/cdn-cgi/image/quality=85%2Cfit=scale-down%2Cformat=auto%2Cwidth=566%2Cheight=800/image/552008710/9be4ed92-02fb-4c7b-884e-2c7c43b3437b.png";

export const metadata: Metadata = {
  title: "HBC WOLVES｜千葉県神崎町 U12・U15｜育成アドバイザー西尾優人｜RBA",
  description: "2018年創設、千葉県神崎町のHBC WOLVES。代表・周浦智美、育成アドバイザー・西尾優人（RBA代表）。小学生・中学生男女の練習日時、月謝、方針、体験・見学のご案内。",
  alternates: { canonical },
  openGraph: {
    title: "HBC WOLVES｜神崎町のU12・U15バスケットボールクラブ",
    description: "HBC WOLVES代表・周浦智美／育成アドバイザー・RBA代表 西尾優人。チーム紹介・練習・体験案内。",
    url: canonical,
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: logo, alt: "HBC WOLVES公式サイト掲載の狼とバスケットゴールのエンブレム" }],
  },
};

const pillars = [
  { number: "01", title: "心", text: "失敗を恐れず挑戦する姿勢と、仲間への敬意。" },
  { number: "02", title: "技", text: "シュート・ドリブル・パスの基礎から、実戦での判断へ。" },
  { number: "03", title: "体", text: "走る・止まる・跳ぶ。発育に合わせた身体の使い方。" },
  { number: "04", title: "睡眠", text: "練習と同じように、休息と回復を大切にする。" },
  { number: "05", title: "栄養", text: "成長期の身体を支える日々の食事を意識する。" },
];

const curriculum = [
  { code: "01", title: "MOVEMENT", subtitle: "身体操作", text: "競技の土台となる姿勢、バランス、加速・減速などの基本的な身体の使い方。" },
  { code: "02", title: "FUNDAMENTALS", subtitle: "基礎技術", text: "ドリブル・パス・シュートを身につけ、男女ともワンハンドシュートにつなげる指導。" },
  { code: "03", title: "GAME IQ", subtitle: "判断と実践", text: "1on1・2on2・3on3で相手・仲間・スペースを見て、次のプレーを自分で選ぶ経験。" },
];

export default function HbcWolvesPage() {
  return <SiteFrame locale="ja">
    <main className={styles.page} lang="ja">
      <section className={styles.hero} aria-labelledby="hbc-title">
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.kicker}>RBA / CHIBA DEVELOPMENT NETWORK</p>
              <p className={styles.overline}>INDEPENDENT PARTNER CLUB · KOZAKI</p>
              <h1 id="hbc-title">HBC <span>WOLVES</span></h1>
              <p className={styles.heroTitle}>育てたいのは、<br/>技術だけじゃない。</p>
              <p className={styles.lead}>千葉県神崎町のU12・U15バスケットボールクラブ。子どもたちが考え、判断し、挑戦する力を育むために、地域に根ざした指導と交流を続けています。</p>
              <div className={styles.roleStrip}><span>CLUB DIRECTOR / 周浦 智美</span><span>DEVELOPMENT ADVISOR / 西尾 優人（RBA）</span></div>
              <div className={styles.actions}>
                <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.primary} data-growth-id="hbc-wolves-trial-instagram">体験・見学を相談 ↗</a>
                <a href="#training" className={styles.secondary} data-growth-id="hbc-wolves-training">練習・月謝を見る ↓</a>
              </div>
            </div>
            <div className={styles.logoPanel}>
              <div className={styles.logoFrame}>
                {/* 画像はHBC公式サイトの公開エンブレムを参照。ロゴの再制作や改変はしていない。 */}
                <img src={logo} alt="HBC WOLVES公式サイト掲載の狼とバスケットゴールのチームエンブレム" width="566" height="800" className={styles.teamLogo} />
              </div>
              <div className={styles.logoCaption}><strong>HBC WOLVES</strong><span>KOZAKI · CHIBA · EST. 2018</span></div>
              <p className={styles.logoCredit}>エンブレム：HBC WOLVES公式ホームページ掲載画像</p>
            </div>
          </div>
          <p className={styles.heroNote}>HBCは独立した地域クラブです。チーム運営・入会受付・料金管理はHBCが行い、RBAは育成アドバイスと情報発信を通じて支えます。</p>
        </div>
      </section>
      <div className={styles.accentLine} aria-hidden="true" />

      <section className={styles.intro} aria-labelledby="hbc-story">
        <div className={styles.container}>
          <div className={styles.headingGrid}>
            <div>
              <p className={styles.sectionLabel}>OUR STORY / LOCAL ROOTS</p>
              <h2 id="hbc-story">神崎町で育まれた、<br/>バスケットボールの輪。</h2>
            </div>
            <div className={styles.storyCopy}>
              <p>HBCの原点は、2013年に地域で結成された大人のバスケットボールチーム「発酵娘」。保護者と一緒に子どもたちがコートに集まり、2018年4月に「神崎HBC」として育成活動がスタートしました。</p>
              <p>現在はHBC WOLVESとして、小学生から中学生まで、経験の有無を問わず、一人ひとりの成長と挑戦を支えています。</p>
            </div>
          </div>
          <div className={styles.quickFacts}>
            <div><small>FOUNDED</small><strong>2018.04</strong><span>旧 神崎HBC</span></div>
            <div><small>HOME</small><strong>神崎町</strong><span>千葉県香取郡</span></div>
            <div><small>PROGRAMS</small><strong>U12 / U15</strong><span>小学生・中学生男女</span></div>
            <div><small>CONTACT</small><strong>@hbcwolves</strong><span>公式Instagram DM</span></div>
          </div>
        </div>
      </section>

      <section className={styles.trainingSection} id="training" aria-labelledby="hbc-training">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>TRAINING & MEMBERSHIP</p>
          <h2 id="hbc-training">年齢に合わせた、2つの育成カテゴリー。</h2>
          <p className={styles.sectionLead}>以下はHBC公式サイト掲載の活動概要です。練習変更・体験受入・最新の金額はHBCへ直接ご確認ください。</p>
          <div className={styles.trainingGrid}>
            <article className={styles.trainingCard}>
              <span className={styles.cardEyebrow}>FOUNDATION / ELEMENTARY</span>
              <h3>U12 <small>小学生クラス</small></h3>
              <p>小学3年生以上の男女が対象。1・2年生は要相談。初心者も経験者も基礎から学びます。</p>
              <dl>
                <div><dt>曜日・時間</dt><dd>土曜・日曜 8:30–10:30</dd></div>
                <div><dt>会場</dt><dd>神崎小学校 体育館</dd></div>
                <div><dt>月謝</dt><dd><strong>4,000円</strong> / 月</dd></div>
              </dl>
              <a href={instagram} target="_blank" rel="noopener noreferrer" data-growth-id="hbc-u12-inquiry">U12の体験を相談 ↗</a>
            </article>
            <article className={styles.trainingCard}>
              <span className={styles.cardEyebrow}>DEVELOPMENT / JUNIOR HIGH</span>
              <h3>U15 <small>中学生クラス</small></h3>
              <p>中学生の男女が対象。基礎技術からゲームの判断まで、個々の目標と成長段階に合わせて取り組みます。</p>
              <dl>
                <div><dt>曜日・時間</dt><dd>水曜・土曜 19:00–21:00<br/>日曜 14:00–16:30</dd></div>
                <div><dt>会場</dt><dd>神崎中学校 体育館</dd></div>
                <div><dt>月謝</dt><dd><strong>6,000円</strong> / 月</dd></div>
              </dl>
              <a href={instagram} target="_blank" rel="noopener noreferrer" data-growth-id="hbc-u15-inquiry">U15の体験を相談 ↗</a>
            </article>
          </div>
          <p className={styles.smallNote}>入会金なし。月謝はHBCの月謝袋による現金払いです。RBAから月謝や入会費を請求することはありません。掲載内容は2026年11月9日にHBC公式公開情報を確認したものです。</p>
        </div>
      </section>

      <section className={styles.vision} aria-labelledby="hbc-vision">
        <div className={styles.container}>
          <div className={styles.headingGrid}>
            <div><p className={styles.sectionLabel}>DEVELOPMENT PHILOSOPHY</p><h2 id="hbc-vision">コートの中も、<br/>コートの外も。</h2></div>
            <p className={styles.storyCopy}>バスケットボールを上達させるだけでなく、子どもたちが健康的に成長していくための5つの視点を大切にしています。</p>
          </div>
          <div className={styles.pillarGrid}>
            {pillars.map(p => <article key={p.number}><span>{p.number}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}
          </div>
          <div className={styles.curriculumGrid}>
            {curriculum.map(p => <article key={p.code}><span>{p.code} / {p.title}</span><h3>{p.subtitle}</h3><p>{p.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className={styles.peopleSection} aria-labelledby="hbc-people">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>TEAM LEADERSHIP & ADVISORY</p>
          <h2 id="hbc-people">子どもたちの成長を支える、2つの役割。</h2>
          <div className={styles.peopleGrid}>
            <article className={styles.personCard}>
              <span>HBC WOLVES / CLUB DIRECTOR</span>
              <h3>周浦 智美 <small>代表・指導者</small></h3>
              <p>北海道で競技を始め、高校・実業団・Wリーグでの経験を経て、現在も競技を継続。20年以上にわたり育成年代の指導に関わり、コンディショニング指導やバスケットボール塾の運営も経験しています。</p>
              <p>HBCの日常の練習・運営・入会判断を担います。</p>
              <a href={teamPage} target="_blank" rel="noopener noreferrer">HBC公式プロフィールを見る ↗</a>
            </article>
            <article className={styles.personCard}>
              <span>RBA / DEVELOPMENT ADVISOR</span>
              <h3>西尾 優人 <small>育成アドバイザー</small></h3>
              <p>Riot Basketball Academy代表。国内外の育成クリニック、指導者向け学習機会、国際交流活動を企画・運営しています。</p>
              <p>HBCの独立運営を尊重しながら、育成方針や練習設計への助言、指導者との知見共有、交流・学習機会の接続を支えます。通常練習への毎回の参加や試合の指揮を約束するものではありません。</p>
              <a href="/ja/about" data-growth-id="hbc-advisor-rba">RBAについて知る →</a>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.activities} aria-labelledby="hbc-network">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>LOCAL ACTIVITY × GLOBAL PERSPECTIVE</p>
          <h2 id="hbc-network">地域で学び、外の世界とつながる。</h2>
          <p>HBCはBACKBONE千葉での3x3交流イベントをはじめ、RBAとの育成活動で連携してきました。台湾遠征など国際交流の経験もあり、地域での日々の活動と、外に出て学ぶ機会の両方を大切にしています。</p>
          <p className={styles.smallNote}>遠征や大会への今後の参加が決定しているという案内ではありません。開催日程・参加条件は各企画の確定後にご案内します。</p>
        </div>
      </section>

      <section className={styles.join} id="trial" aria-labelledby="hbc-join">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>TRY / VISIT / JOIN</p>
          <h2 id="hbc-join">最初の一歩は、体験・見学から。</h2>
          <p>体験・見学はHBC公式InstagramのDMで受け付けています。お子さまの学年、U12/U15の希望、参加したい日を添えてお問い合わせください。初めてバスケットボールに触れる方もご相談いただけます。</p>
          <div className={styles.actions}>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className={styles.primary} data-growth-id="hbc-wolves-contact-bottom">HBC公式Instagramへ ↗</a>
            <a href={membershipPage} target="_blank" rel="noopener noreferrer" className={styles.secondary} data-growth-id="hbc-wolves-membership-info">入会案内・会則を見る ↗</a>
          </div>
          <p className={styles.joinNote}>連絡先はHBCの公式窓口です。RBAでは入会受付・月謝収納・参加確約を行いません。</p>
        </div>
      </section>

      <section className={styles.related} aria-labelledby="hbc-related">
        <div className={styles.container}>
          <p className={styles.sectionLabel}>RBA / U15 NETWORK</p>
          <h2 id="hbc-related">独立したクラブを、育成でつなぐ。</h2>
          <p>HBC WOLVESはGREAM仙台・秋田・沖縄とは別の運営主体です。RBAは連携・育成アドバイザーとして活動を応援します。</p>
          <div className={styles.relatedLinks}>
            <a href={website} target="_blank" rel="noopener noreferrer">HBC公式ホームページ ↗</a>
            <a href="/ja/u15">RBA U15に戻る →</a>
            <a href="/ja/gream">GREAMチーム一覧 →</a>
          </div>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
