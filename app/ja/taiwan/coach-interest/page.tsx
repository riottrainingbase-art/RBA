import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import "@/components/taiwan-official.css";

const formUrl = "https://form.jotform.com/262859034372058";
const pageUrl = "https://riotbasketballacademy.com/ja/taiwan/coach-interest";

export const metadata: Metadata = {
  title: "台湾でバスケットボールの指導に興味がある方へ | RBA",
  description: "台北・新北を中心に、子どもたちへのバスケットボール指導に興味がある18歳以上の方を探しています。現在は企画を検討している段階で、正式な求人ではありません。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "台湾で、子どもたちにバスケットボールを教えてみませんか？ | RBA",
    description: "日本人留学生や日本語を話せる台湾の方、バスケットボール経験者の皆さんへ。指導への興味を聞かせてください。",
    url: pageUrl,
    siteName: "Riot Basketball Academy",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function TaipeiCoachInterestPage() {
  return <SiteFrame locale="ja" languagePage="taiwan">
    <div className="rba-taiwan">
      <section className="rba-taiwan-hero">
        <div className="rba-taiwan-inner">
          <div className="rba-taiwan-top">
            <p>RBA / JAPAN × TAIWAN</p>
            <nav aria-label="ページ内の言語"><a href="#ja" aria-current="page">日本語</a><a href="#zh">繁體中文</a></nav>
          </div>
          <div className="rba-taiwan-partner">
            <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy ロゴ" width={56} height={78} className="rba-taiwan-brand-mark" />
            <div className="rba-taiwan-partner-wordmark"><span>RIOT BASKETBALL ACADEMY</span><span className="rba-taiwan-times">×</span><span>TAIPEI COACH DEVELOPMENT</span></div>
          </div>
          <div id="ja">
            <h1>台湾で、子どもたちにバスケットボールを教えてみませんか？</h1>
            <p className="rba-taiwan-lead">RBAでは、台湾の仲間と一緒に、子どもたちがバスケットボールを楽しみながら成長できる環境をつくりたいと考えています。その第一歩として、台北・新北を中心に、コーチングを学んでみたい方を探しています。</p>
            <p className="rba-taiwan-credit">COACH DEVELOPMENT / EXPRESSION OF INTEREST · 企画検討中</p>
            <a className="rba-taiwan-btn" href={formUrl} target="_blank" rel="noopener noreferrer">興味がある方はこちら ↗</a>
            <p style={{fontSize:12,color:"#d0e2d9",lineHeight:1.8,marginTop:16}}>18歳以上の方が対象です。登録は無料です。現時点では採用募集ではありません。</p>
          </div>
        </div>
      </section>

      <section className="rba-taiwan-section">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">01 / WHO WE ARE LOOKING FOR</p>
          <h2>こんな方を探しています。</h2>
          <p className="rba-taiwan-intro">コーチの経験がなくても大丈夫です。バスケットボールが好きで、子どもたちに教えることに興味がある方の声を聞かせてください。</p>
          <div className="rba-taiwan-cards">
            <article><span>01</span><h3>台湾に住む日本人学生</h3><p>台北・新北の大学生や交換留学生、語学留学生など。バスケットボールの経験を、子どもたちのために生かしてみたい方。</p></article>
            <article><span>02</span><h3>日本語を話せる台湾の方</h3><p>日本語を学んでいる学生や、日本と台湾の交流に興味がある方。バスケットボールが好きな方も歓迎します。</p></article>
            <article><span>03</span><h3>バスケ経験のある社会人</h3><p>プレーしてきた経験を生かし、今度は教える側にも挑戦してみたい方。指導経験は問いません。</p></article>
          </div>
          <p className="rba-taiwan-small">18歳以上であれば、台北・新北以外にお住まいの方も登録できます。</p>
        </div>
      </section>

      <section className="rba-taiwan-section rba-taiwan-muted">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">02 / OUR IDEA</p>
          <h2>子どもたちと一緒に、コーチも成長できる場所を。</h2>
          <p className="rba-taiwan-intro">技術を教えるだけでなく、子どもたちが自分で考え、判断し、挑戦できる練習を大切にしたい。台湾の指導者と学び合いながら、コーチ向けの研修や子どもたちが参加できる活動を検討しています。</p>
          <div className="rba-taiwan-roles">
            <article><strong>指導を学ぶ</strong><p>子どもの成長段階に合わせた練習の組み立て方や、声のかけ方を学ぶ機会を考えています。</p></article>
            <article><strong>現場を知る</strong><p>企画が具体化した際には、まず練習の見学や研修から参加できる形を検討します。</p></article>
            <article><strong>日台をつなぐ</strong><p>言葉や文化の違いを越えて、日本と台湾の指導者が学び合う機会をつくりたいと考えています。</p></article>
          </div>
        </div>
      </section>

      <section className="rba-taiwan-section">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">03 / CURRENT STATUS</p>
          <h2>まだ企画を検討している段階です。</h2>
          <p className="rba-taiwan-intro">今は、指導に興味がある方がどれくらいいるのかを知るために登録を受け付けています。現地の関係者と話し合いを進めていますが、研修の開催や採用は決まっていません。活動場所、日程、報酬、受け入れ人数も未定です。</p>
          <p className="rba-taiwan-intro">将来、報酬が発生する活動を行う場合は、台湾の就労許可や在留資格などを確認します。また、子どもたちが安心して参加できるよう、指導者の研修や安全管理、保険などの体制を整えたうえでご案内します。</p>
        </div>
      </section>

      <section className="rba-taiwan-section rba-taiwan-muted">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">04 / HOW TO JOIN THE INTEREST LIST</p>
          <h2>興味があれば、まずは登録してください。</h2>
          <p className="rba-taiwan-intro">フォームでは、お住まいの地域、話せる言語、バスケットボール経験、興味を持った理由などをお聞きします。企画が具体化し、ご案内できることがあれば、RBAからご連絡します。</p>
          <a className="rba-taiwan-btn" href={formUrl} target="_blank" rel="noopener noreferrer">無料で登録する ↗</a>
          <p className="rba-taiwan-small">登録しても参加や採用が決まるわけではありません。パスポートや学生証、生年月日の詳細はお聞きしません。</p>
        </div>
      </section>

      <section className="rba-taiwan-section" id="zh" lang="zh-Hant-TW">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">05 / 繁體中文</p>
          <h2>對青少年籃球教學有興趣嗎？歡迎先和我們聊聊。</h2>
          <p className="rba-taiwan-intro">Riot Basketball Academy（RBA）正在了解台北與新北地區，有哪些朋友希望學習籃球教學，未來有機會參與青少年籃球活動。歡迎年滿18歲的日本留學生、會說日文的台灣學生，以及對籃球教學有興趣的社會人士填寫意向表單。沒有教練經驗也可以登記。</p>
          <p className="rba-taiwan-intro">目前仍在與台灣在地相關人士討論規劃，尚未確定培訓、工作機會、活動地點、時間、名額或酬勞。這不是正式的徵才公告，也不保證錄取或參與。若未來涉及有酬工作，將先確認工作許可、居留資格與兒少安全相關安排。</p>
          <a className="rba-taiwan-outline" href={formUrl} target="_blank" rel="noopener noreferrer">填寫免費意向登記表 ↗</a>
          <p className="rba-taiwan-small">個人資料僅供RBA評估本計畫及必要聯繫使用，未經另行同意，不會提供給包括台灣合作夥伴在內的第三方。</p>
        </div>
      </section>

      <section className="rba-taiwan-section rba-taiwan-muted">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">06 / PRIVACY & CONTACT</p>
          <h2>お問い合わせと個人情報の取扱い</h2>
          <p className="rba-taiwan-intro">登録された情報は、この企画の検討とご連絡のためにRBAが管理します。ご本人の同意なく、台湾の協力先を含む第三者に提供することはありません。登録内容の確認・修正・削除をご希望の場合は、<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a> までご連絡ください。</p>
          <p className="rba-taiwan-small"><Link href="/ja/taiwan">RBAの台湾での活動を見る ↗</Link></p>
        </div>
      </section>
    </div>
  </SiteFrame>;
}
