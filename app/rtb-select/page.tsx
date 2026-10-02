
import type { Metadata } from "next";
import styles from "./rtb-select.module.css";
import { DocumentLanguage } from "@/components/document-language";
import { RtbSelectTrackedLink } from "@/components/rtb-select-tracked-link";

const consumerForm = "https://form.jotform.com/262738772653065";
const partnerForm = "https://form.jotform.com/262738687005061";

export const metadata: Metadata = {
  title: { absolute: "RTB SELECT｜TRAIN / RECOVER / WEAR" },
  authors: [{ name: "Riot Training Base" }],
  keywords: ["Riot Training Base","RTB SELECT","仙台 パーソナルトレーニング","トレーニングウェア","スポーツ リカバリー","仙台 スポーツ用品"],
  description: "Riot Training Baseが仙台から始める、トレーニング・アパレル・リカバリーの小型セレクト。大量仕入れではなく、予約・受注・小ロットから必要なものだけを扱います。",
  alternates: { canonical: "https://riotbasketballacademy.com/rtb-select" },
  openGraph: {
    title: "RTB SELECT｜TRAIN / RECOVER / WEAR",
    description: "トレーニング施設で試し、必要なものだけを選ぶ。RTBの小型セレクトプロジェクト。",
    url: "https://riotbasketballacademy.com/rtb-select",
    siteName: "Riot Training Base",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "RTB SELECT｜TRAIN / RECOVER / WEAR",
    description: "必要なものだけを、必要な人へ。RTBの小型セレクトプロジェクト。",
  },
  robots: { index: false, follow: false },
};

const categories = [
  {
    n:"01",
    title:"TRAIN",
    body:"トレーニングTシャツ、ショーツ、ソックス。動きやすさ、耐久性、着心地を基準に、実際に使う理由があるものを選びます。",
    foot:"APPAREL / SOCKS / TRAINING",
  },
  {
    n:"02",
    title:"RECOVER",
    body:"セルフケア、コンディショニング、リカバリー用品。RTBで使い方まで説明できるものを中心に検討します。",
    foot:"CARE / RECOVERY / BODY",
  },
  {
    n:"03",
    title:"WEAR / COURT",
    body:"日常でも着られるウェアと、RBAにつながるバスケットボールカテゴリー。競技専用に閉じず、生活の中で使えるものまで。",
    foot:"LIFESTYLE / BASKETBALL",
  },
];

const steps = [
  ["01 / REQUEST","欲しいものを聞く","カテゴリー、ブランド、価格帯、サイズを先に集めます。"],
  ["02 / SELECT","少量で試す","サンプル、委託、小ロット、予約販売から始めます。"],
  ["03 / ORDER","売れてから発注","大量在庫を持たず、注文が見えたものから仕入れます。"],
  ["04 / SCALE","売れ筋だけ伸ばす","数字が出たカテゴリーのみ再発注・別注・OEMへ進めます。"],
];

export default function Page(){
  return <><DocumentLanguage language="ja"/><main className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="#top" aria-label="RTB SELECT">
          <span className={styles.brandMark}>RTB</span>
          <span className={styles.brandText}><strong>RIOT TRAINING BASE</strong><span>PERFORMANCE / LIFESTYLE · SENDAI</span></span>
        </a>
        <nav className={styles.toplinks} aria-label="RTB SELECT navigation">
          <a href="/rtb-revenue">RTB</a>
          <a href="#concept">Concept</a>
          <a href="#brands">For brands</a>
          <RtbSelectTrackedLink eventName="rtb_select_consumer_form_click" eventLocation="header" href={consumerForm} target="_blank" rel="noreferrer">Early access ↗</RtbSelectTrackedLink>
        </nav>
      </header>

      <section id="top" className={styles.hero}>
        <div>
          <p className={styles.kicker}>RTB SELECT / PILOT 00</p>
          <h1><span>TRAIN.</span><span>RECOVER.</span><span>WEAR.</span></h1>
          <p className={styles.heroLead}>必要なものだけを、必要な人へ。トレーニング施設から始める、小さなセレクトプロジェクト。</p>
        </div>
        <aside className={styles.heroAside}>
          <p>RTBの入口を「商品を大量に並べる店」にはしません。実際に試し、用途を理解し、必要なら注文する。予約・受注・小ロットを中心に、在庫リスクを抑えて始めます。</p>
          <RtbSelectTrackedLink className={styles.primary} eventName="rtb_select_consumer_form_click" eventLocation="hero" href={consumerForm} target="_blank" rel="noreferrer">先行案内・取扱希望を登録 ↗</RtbSelectTrackedLink>
          <p className={styles.note}>登録だけで注文・決済は確定しません。</p>
        </aside>
      </section>
    </div>

    <div className={styles.band}>
      <div className={styles.shell+" "+styles.bandInner}>
        <strong>NO MASS STOCK / NO RANDOM PRODUCTS</strong>
        <span>需要を先に確認し、売れたものだけを伸ばします。</span>
      </div>
    </div>

    <section id="concept" className={styles.section+" "+styles.shell}>
      <div className={styles.sectionHead}>
        <div><p className={styles.sectionIndex}>01 / CONCEPT</p><h2>スポーツショップではなく、選ぶ理由がある売場。</h2></div>
        <p>RTBの強みは「商品数」ではなく、トレーニングの現場があること。身体を動かす人に、使う場面まで説明できる商品だけを扱います。RBAはバスケットボールカテゴリーと全国の接点としてつなぎます。</p>
      </div>
      <div className={styles.grid3}>
        {categories.map(item=><article className={styles.card} key={item.n}>
          <span className={styles.cardNum}>{item.n}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <strong>{item.foot}</strong>
        </article>)}
      </div>
    </section>

    <section className={styles.section+" "+styles.shell}>
      <div className={styles.sectionHead}>
        <div><p className={styles.sectionIndex}>02 / ZERO-INVENTORY MODEL</p><h2>先に売る。あとから仕入れる。</h2></div>
        <p>初期費用をかけないため、最初から在庫を積みません。希望を集め、条件の合うブランドと小さく試し、数字が出た商品だけを残します。</p>
      </div>
      <div className={styles.steps}>
        {steps.map(([n,t,b])=><article className={styles.step} key={n}><span>{n}</span><h3>{t}</h3><p>{b}</p></article>)}
      </div>
    </section>

    <section className={styles.section+" "+styles.drop}>
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionIndex}>DROP 00 / REQUEST</p><h2>最初に、何が欲しいかを教えてください。</h2></div>
          <p>欲しいカテゴリー、ブランド、予算、サイズ、店頭受取か配送か。最初の仕入れを勘で決めないための需要調査です。回答数と希望が集まったものから取扱交渉を進めます。</p>
        </div>
        <div className={styles.dropActions}>
          <RtbSelectTrackedLink className={styles.primary} eventName="rtb_select_consumer_form_click" eventLocation="request_section" href={consumerForm} target="_blank" rel="noreferrer">先行案内・取扱希望を登録 ↗</RtbSelectTrackedLink>
          <a className={styles.secondary} href="/rtb-revenue">RTBのサービスを見る</a>
        </div>
      </div>
    </section>

    <section id="brands" className={styles.section+" "+styles.brandSection}>
      <div className={styles.shell}>
        <div className={styles.sectionHead}>
          <div><p className={styles.sectionIndex}>FOR BRANDS / DISTRIBUTORS</p><h2>大量仕入れ以外の売り方から、相談できます。</h2></div>
          <p>仙台のRTB店頭を入口に、必要に応じてRBAのイベントやコミュニティにも接続できます。新興ブランド、小規模メーカー、国内代理店とのテスト販売を歓迎します。</p>
        </div>
        <div className={styles.partnerGrid}>
          <div className={styles.partnerList}>
            <div><strong>CONSIGNMENT</strong><p>委託販売。売れた分だけ精算する形から。</p></div>
            <div><strong>PRE-ORDER</strong><p>受注後に発注。サイズ・カラー在庫を抑える。</p></div>
            <div><strong>SAMPLE</strong><p>サンプル展示・試着・使用体験から注文につなげる。</p></div>
            <div><strong>POP-UP</strong><p>短期間の店頭展開やイベント連動で需要を検証。</p></div>
            <div><strong>TEAM SALES</strong><p>クラブ、チーム、RBAイベント向けのまとまった受注。</p></div>
            <div><strong>OEM / COLLAB</strong><p>売れ筋が見えた後に、別注・共同企画を検討。</p></div>
          </div>
          <aside className={styles.partnerCta}>
            <h3>取扱・販売テストのご相談</h3>
            <p>掛率、最低発注、委託条件、サンプル貸与、EC可否、イベント販売など、可能な条件から相談します。</p>
            <RtbSelectTrackedLink className={styles.primary} eventName="rtb_select_partner_form_click" eventLocation="brand_section" href={partnerForm} target="_blank" rel="noreferrer">ブランド・代理店向けフォーム ↗</RtbSelectTrackedLink>
            <div style={{height:10}} />
            <a className={styles.secondary} href="mailto:riot.training.base@gmail.com?subject=RTB%20SELECT%20%E5%8F%96%E6%89%B1%E3%83%BB%E6%8F%90%E6%90%BA%E3%81%AE%E3%81%94%E7%9B%B8%E8%AB%87">メールで商談する</a>
          </aside>
        </div>
      </div>
    </section>

    <footer className={styles.footer}>
      <div className={styles.shell+" "+styles.footerInner}>
        <div><strong>RIOT TRAINING BASE / SENDAI</strong><p>TRAINING · PERFORMANCE · LIFESTYLE</p></div>
        <RtbSelectTrackedLink eventName="rtb_select_consumer_form_click" eventLocation="footer" href={consumerForm} target="_blank" rel="noreferrer">RTB SELECT 先行案内 ↗</RtbSelectTrackedLink>
      </div>
    </footer>
  </main></>;
}
