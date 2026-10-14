import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import "@/components/taiwan-official.css";

const formUrl = "https://form.jotform.com/262859034372058";
const pageUrl = "https://riotbasketballacademy.com/ja/taiwan/coach-interest";

export const metadata: Metadata = {
  title: "台北・新北｜バスケットボールの指導に興味がある方へ | RBA",
  description: "台湾でバスケットボールの指導を学ぶことに興味がある18歳以上の方へ。RBAが検討中のコーチ育成企画について、関心をお聞きしています。求人・採用募集ではありません。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "台北で、バスケットボールの指導に関わってみませんか？ | RBA",
    description: "日本人留学生、日本語を話せる台湾人学生、バスケ経験者の皆さまへ。まずは関心をお聞かせください。",
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
            <h1>台北で、バスケットボールの指導に関わってみませんか？</h1>
            <p className="rba-taiwan-lead">子どもたちがバスケットボールを楽しみ、成長できる環境を、日本と台湾の仲間と一緒につくっていきたい。RBAでは、台北・新北でのコーチ育成に向けて、指導に興味のある方の声を集めています。</p>
            <p className="rba-taiwan-credit">COACH DEVELOPMENT / EXPRESSION OF INTEREST · 企画検討中</p>
            <a className="rba-taiwan-btn" href={formUrl} target="_blank" rel="noopener noreferrer">関心登録フォームへ ↗</a>
            <p style={{fontSize:12,color:"#d0e2d9",lineHeight:1.8,marginTop:16}}>登録無料・18歳以上対象。正式な求人や採用募集ではありません。</p>
          </div>
        </div>
      </section>

      <section className="rba-taiwan-section">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">01 / WHO WE ARE LOOKING FOR</p>
          <h2>こんな方と出会いたいと考えています。</h2>
          <p className="rba-taiwan-intro">指導経験の有無だけで判断するのではなく、バスケットボールや子どもたちの成長に関心がある方とつながることを目的としています。</p>
          <div className="rba-taiwan-cards">
            <article><span>01</span><h3>台湾で学ぶ日本人学生</h3><p>台北・新北に住む大学生、交換留学生、語学留学生など。バスケットボールが好きで、指導にも興味がある方。</p></article>
            <article><span>02</span><h3>日本語で交流できる台湾の方</h3><p>日本語を学んでいる学生や、日台の交流に関心がある方。バスケットボールの経験がある方も歓迎します。</p></article>
            <article><span>03</span><h3>バスケットボール経験のある社会人</h3><p>競技経験を生かして、子どもたちの指導を学んでみたい方。コーチ経験は必須ではありません。</p></article>
          </div>
          <p className="rba-taiwan-small">対象は18歳以上の方です。台北・新北以外にお住まいの方も、関心があれば登録できます。</p>
        </div>
      </section>

      <section className="rba-taiwan-section rba-taiwan-muted">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">02 / OUR IDEA</p>
          <h2>目指しているのは、コーチが学び続けられる環境です。</h2>
          <p className="rba-taiwan-intro">シュートやドリブルを教えるだけではなく、選手自身が考え、判断し、挑戦できる練習をどうつくるか。台湾の育成現場と意見を交わしながら、将来的な指導者研修や子ども向けの活動を検討しています。</p>
          <div className="rba-taiwan-roles">
            <article><strong>指導を学ぶ</strong><p>子どもの発達や安全に配慮しながら、練習の組み立て方や声のかけ方を考えます。</p></article>
            <article><strong>現場を知る</strong><p>実施条件が整った場合には、見学や研修などから関わる方法を検討します。</p></article>
            <article><strong>日台をつなぐ</strong><p>日本語と中国語、それぞれの強みを生かした育成交流の可能性を探ります。</p></article>
          </div>
        </div>
      </section>

      <section className="rba-taiwan-section">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">03 / CURRENT STATUS</p>
          <h2>現在は、関心のある方を探している段階です。</h2>
          <p className="rba-taiwan-intro">このページは、今後のコーチ育成企画に興味がある方の声を聞くためのものです。現地の関係者と検討を進めていますが、研修の実施、採用、活動場所、日程、報酬、募集人数などは決まっていません。</p>
          <p className="rba-taiwan-intro">今後、有償の活動を行う場合は、台湾で必要な就労許可・在留資格などを確認します。子どもたちと関わる活動についても、研修、監督体制、安全管理、保険などの条件を整えてからご案内します。</p>
        </div>
      </section>

      <section className="rba-taiwan-section rba-taiwan-muted">
        <div className="rba-taiwan-inner">
          <p className="rba-taiwan-label">04 / HOW TO JOIN THE INTEREST LIST</p>
          <h2>まずは、興味があることを教えてください。</h2>
          <p className="rba-taiwan-intro">登録フォームでは、居住地域、使用できる言語、バスケットボール経験、指導への関心などをお聞きします。内容を確認し、具体的な活動をご案内できる段階になった場合に、必要に応じてRBAからご連絡します。</p>
          <a className="rba-taiwan-btn" href={formUrl} target="_blank" rel="noopener noreferrer">無料で関心を登録する ↗</a>
          <p className="rba-taiwan-small">登録は参加や採用を保証するものではありません。パスポート、学生証、正確な生年月日などの提出は求めません。</p>
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
          <h2>お問い合わせ・個人情報について</h2>
          <p className="rba-taiwan-intro">登録いただいた情報は、RBAが本企画の検討と必要な連絡のために使用します。追加の同意なく、台湾の協力先を含む第三者へ提供することはありません。情報の確認・訂正・削除をご希望の場合は、<a href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a> までご連絡ください。</p>
          <p className="rba-taiwan-small"><Link href="/ja/taiwan">RBA台湾の活動紹介へ戻る ↗</Link></p>
        </div>
      </section>
    </div>
  </SiteFrame>;
}
