import type { Metadata } from "next";
import { ArrowRight, BookOpen, Brain, CheckCircle2, Gamepad2, ShieldCheck, Target, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

const checkoutUrl = "https://buy.stripe.com/9B6bJ3gOP136bmZ50b7EQ0A";

export const metadata: Metadata = {
  title: "RBA COACHING GUIDE Vol.1｜U12で、本当に教えるべきこと",
  description: "FIBA/WABCの公開育成資料を参照し、RBAが日本のU12現場向けに独自解釈・再構成した指導教材。Game-Based Teaching、3x3/4x4、スペース、判断、練習設計まで。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/coaching-guide-u12" },
  openGraph: {
    title: "RBA COACHING GUIDE Vol.1｜U12で、本当に教えるべきこと",
    description: "育成を、感覚だけで終わらせない。U12指導を原則から組み直すRBAオリジナル教材。",
    url: "https://riotbasketballacademy.com/ja/coaching-guide-u12",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["/rba-court-hero.png"],
  },
};

const chapters = [
  ["01", "U12育成の目的を決め直す", "勝つための準備ではなく、次の年代で伸び続けるための土台を考えます。"],
  ["02", "発達段階を無視しない", "年齢だけで一律に教えず、経験・身体発達・理解度に合わせて課題を調整します。"],
  ["03", "「基礎」を技の型だけにしない", "見る・動く・選ぶ・実行するまでをFundamentalsとして整理します。"],
  ["04", "Game-Based Teaching", "ゲームをさせっぱなしにするのではなく、学習が起きる課題設計として理解します。"],
  ["05", "3x3・4x4を育成装置として使う", "触球数、判断機会、スペースを増やすSmall-Sided Gamesの使い方。"],
  ["06", "スペースと動き", "ボールに寄るだけではない、目的のあるオフボールを学びます。"],
  ["07", "技術をゲーム文脈につなげる", "フォーム練習から認知・判断・ゲームへ接続します。"],
  ["08", "問いかけで判断を育てる", "答えを先に言わず、選手が自分でゲームを読むための問いを整理します。"],
  ["09", "練習を設計する", "メニュー収集ではなく、テーマから逆算して90分を組みます。"],
  ["10", "RBA式 90分U12セッション", "ドライブ・スペース・判断をつなぐ具体的なセッション例。"],
  ["11", "よくある失敗と修正", "長い列、説明過多、上手い選手への依存などを構造で見直します。"],
  ["12", "コーチ用チェックリスト", "練習前・練習中・練習後に使える短い確認表。"],
] as const;

export default function Page() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja/coaches">← RBA FOR COACHES</a>
      <p className="section-index">RBA COACHING GUIDE / VOL.1</p>
      <h1>U12で、<br/>本当に教えるべきこと。</h1>
      <p>FIBA / WABCが公開している育成資料の原則を参照しながら、RBAが日本のU12現場で使える言葉・練習設計・問いかけに落とし込んだオリジナル教材です。</p>
      <div className="closing-actions">
        <a className="button button-orange" href={checkoutUrl} target="_blank" rel="noreferrer">3,300円（税込）で購入する<ArrowRight size={17}/></a>
        <a className="button button-dark" href="#contents">内容を見る<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">WHY THIS GUIDE</p>
      <div>
        <h2>技を増やす前に、<br/>育成の順番を整理する。</h2>
        <p>U12で難しい技を早く教えることが、育成の先進性ではありません。身体操作、認知、判断、スペース、タイミング。次の年代でも残る土台をどうつくるかを、原則から見直します。</p>
      </div>
    </section>

    <section className="access-grid section-pad">
      <article><Brain/><span>01</span><h2>見る・判断する</h2><p>技術だけでなく、キャッチ前の認知や選択までを練習の対象にします。</p></article>
      <article><Gamepad2/><span>02</span><h2>ゲームで学ぶ</h2><p>Game-Based Teachingを、放任ではなく課題設計として使います。</p></article>
      <article><Users/><span>03</span><h2>3x3 / 4x4</h2><p>少人数ゲームで、一人ひとりの触球数・判断・スペースを増やします。</p></article>
      <article><Target/><span>04</span><h2>練習を設計する</h2><p>メニューの寄せ集めではなく、最後のゲームから逆算して組み立てます。</p></article>
    </section>

    <section className="homecourt-product-preview section-pad" id="contents">
      <div className="section-head">
        <div><p className="section-index">18 PAGES / DIGITAL GUIDE</p><h2>収録内容</h2></div>
        <p>読むだけで終わらないよう、90分セッション例・チェックリスト・練習設計ワークシートまで収録しています。</p>
      </div>
      <div className="homecourt-preview-grid">
        {chapters.map(([n,title,body])=><article key={n}>
          <span>{n}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>)}
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">SOURCE / POSITION</p>
      <div>
        <h2>公式資料の「翻訳販売」ではありません。</h2>
        <p>本教材は、FIBA / WABCが無料公開しているMini-Basketball Coaches Manual、Start Coaching等を参照し、RBAが育成原則を独自に要約・解釈して、日本のU12現場向けに再構成したものです。FIBA / WABCの公式日本語訳・公式教材・監修商品ではありません。</p>
        <div className="closing-actions">
          <a className="text-link" href="https://about.fiba.basketball/en/wabc-documents" target="_blank" rel="noreferrer"><BookOpen size={16}/>FIBA / WABC公式資料を見る</a>
        </div>
      </div>
    </section>

    <section className="hosting-ready section-pad">
      <div><p className="section-index">WHAT YOU GET</p><h2>購入後すぐに学習を始められます。</h2></div>
      <ul>
        <li><span>01</span><div><strong>RBA COACHING GUIDE Vol.1</strong><p>U12育成の原則を18ページに整理したデジタル教材。</p></div><CheckCircle2/></li>
        <li><span>02</span><div><strong>90分セッション例</strong><p>Game-Based、3x3、スペース、判断を一つの練習につなげた例。</p></div><CheckCircle2/></li>
        <li><span>03</span><div><strong>コーチ用チェックリスト</strong><p>練習前3分・練習後3分で使える確認項目。</p></div><CheckCircle2/></li>
        <li><span>04</span><div><strong>練習設計ワークシート</strong><p>次回練習をその場で組み替えられる記入式テンプレート。</p></div><CheckCircle2/></li>
      </ul>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">RBA COACHING GUIDE VOL.1</p>
      <h2>育成を、<br/>感覚だけで終わらせない。</h2>
      <p>価格は3,300円（税込）。購入後、決済完了画面から購入者向け教材ページへ進めます。</p>
      <div className="closing-actions">
        <a className="button button-orange" href={checkoutUrl} target="_blank" rel="noreferrer">教材を購入する<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">TERMS</p>
      <div>
        <h2>個人学習・指導準備のための教材です。</h2>
        <p>購入者本人の学習および所属チーム内での指導準備に利用できます。教材そのものの無断転載、再配布、公開共有、転売は禁止します。公式資料の権利は各権利者に帰属します。</p>
        <a className="text-link" href="/ja/policies"><ShieldCheck size={16}/>RBAの規約・安全方針を見る</a>
      </div>
    </section>
  </SiteFrame>;
}
