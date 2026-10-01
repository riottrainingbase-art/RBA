import type { Metadata } from "next";
import { ArrowRight, Brain, CheckCircle2, ClipboardList, Eye, Gamepad2, MessageSquare, Repeat2, ShieldCheck, Target, Users, Video } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

const intakeUrl = "https://form.jotform.com/262698980384072";

export const metadata: Metadata = {
  title: "RBA MINI BASKETBALL DEVELOPMENT SUPPORT｜ミニバス・U12チーム育成支援",
  description: "今いるチームを大切にしながら、練習設計、映像レビュー、指導者相談、オンコート支援まで。ミニバス・U12チームの普段の活動を外部から支援します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/minibasket-support" },
  openGraph: {
    title: "RBA MINI BASKETBALL DEVELOPMENT SUPPORT",
    description: "選手の移籍を目的とせず、今いるチームの練習や指導を外部から支援します。",
    url: "https://riotbasketballacademy.com/ja/minibasket-support",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["/rba-court-hero.png"],
  },
};

const challenges = [
  ["FUNDAMENTALS", "基礎を、ゲームで使える形にしたい", "ドリブルやパスの型だけで終わらず、見る・判断する・タイミングを含めて整理します。"],
  ["DECISION MAKING", "ベンチの指示を減らし、自分で判断させたい", "選手が状況を読み、選択し、失敗から学べる練習環境を設計します。"],
  ["SPACING / OFF-BALL", "ボールを持っていない選手も育てたい", "立ち位置、角度、カット、リロケートなど、5人でプレーするための土台を扱います。"],
  ["PLAYING OPPORTUNITY", "一部の選手だけでなく、全員の経験を増やしたい", "練習試合や日常練習で、役割や出場機会をどう設計するかを一緒に整理します。"],
  ["PRACTICE DESIGN", "練習がドリルの寄せ集めになっている", "その日のテーマ、観察点、問い、Small-Sided Game、振り返りまでを一つの流れにします。"],
  ["COACH DEVELOPMENT", "指導者同士で共通言語をつくりたい", "何を教えるかだけでなく、何を見るか・どう問いかけるかを共有できる形にします。"],
] as const;

const support = [
  {
    tag: "01 / DEVELOPMENT CHECK",
    title: "初回ヒアリング",
    body: "最初に、年代、人数、練習頻度、試合環境、指導者が困っていることを確認します。利用したいサービスが決まっていなくても大丈夫です。",
    items: ["チームの状況を確認", "優先して取り組むことを整理", "必要な支援方法をご提案"],
  },
  {
    tag: "02 / COACH SUPPORT",
    title: "指導者オンラインサポート",
    body: "練習の組み立て、選手への問いかけ、ゲームの見方などをオンラインで一緒に整理します。",
    items: ["練習設計の相談", "映像を使ったレビュー", "次回練習のテーマ整理"],
  },
  {
    tag: "03 / TEAM DEVELOPMENT",
    title: "継続的な練習設計サポート",
    body: "必要に応じて一定期間のテーマを決め、練習や試合を見ながら振り返りを続けます。",
    items: ["月次テーマ設計", "実施後レビュー", "練習と振り返りを記録"],
  },
  {
    tag: "04 / VISIT TRAINING",
    title: "RBAがチームの体育館へ",
    body: "必要に応じてRBAが現場へ伺い、普段の環境の中でオンコート指導と指導者フィードバックを行います。",
    items: ["90〜120分のチーム練習", "ゲーム観察", "指導者へのフィードバック"],
  },
] as const;

const flow = [
  ["01", "フォームで今の状況を共有", "チーム名、年代、人数、練習状況、困っていることを送ってください。フォーム送信だけで料金は発生しません。"],
  ["02", "RBAが状況を確認", "必要に応じて練習・試合映像や追加情報を確認し、優先して扱うテーマを絞ります。"],
  ["03", "支援方法を提案", "オンライン相談、映像レビュー、練習設計、TEAM TRAINING、VISIT TRAININGなどから必要な範囲だけを提案します。"],
  ["04", "実際の練習で試す", "資料だけで終わらせず、普段の練習やゲームの中で試し、選手の反応を見ます。"],
  ["05", "振り返って、次に試すことを決める", "うまくいったこと、次に確認したいことを残します。必要であれば継続支援やD-HUBもご案内します。"],
] as const;

export default function Page() {
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja/team">← RBA FOR TEAMS</a>
      <p className="section-index">RBA MINI BASKETBALL DEVELOPMENT SUPPORT</p>
      <h1>今いるチームで、<br/>できることを増やす。</h1>
      <p>RBAへの移籍を前提にした支援ではありません。今のチームで活動を続けながら、練習設計、ゲームの見方、指導者の関わり方、選手の経験をどう増やすかを一緒に考えます。</p>
      <div className="closing-actions">
        <a className="button button-orange" href={intakeUrl} target="_blank" rel="noreferrer">初回ヒアリングを始める<ArrowRight size={17}/></a>
        <a className="button button-dark" href="#support">支援内容を見る<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">THE QUESTION</p>
      <div>
        <h2>「何を教えるか」より、<br/>「どんな選手に育ってほしいか」から考える。</h2>
        <p>ミニバスの時間は、目の前の試合だけのためにあるわけではありません。見る、判断する、味方とつながる、失敗から修正する。U15、U18へ進んだときにも残る力を、今のチームの日常からどう育てるかを一緒に考えます。</p>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">COMMON QUESTIONS</p><h2>こんな悩みから始められます。</h2></div>
        <p>特別な問題が起きてから利用するものではありません。「今のやり方を一度外から見てほしい」という相談でも構いません。</p>
      </div>
      <div className="homecourt-preview-grid">
        {challenges.map(([tag,title,body],i)=><article key={tag}>
          <span>{String(i+1).padStart(2,"0")} / {tag}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>)}
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">RBA POSITION</p>
      <div>
        <h2>今いるチームを大切にしながら、<br/>外部の視点も取り入れる。</h2>
        <p>今いる指導者や所属環境を尊重しながら、普段の練習を一緒に見直します。移籍勧誘や選手獲得を目的とせず、年代、人数、練習時間、地域事情に合わせて、無理なく続けられる方法を考えます。</p>
      </div>
    </section>

    <section className="access-grid section-pad">
      <article><Eye/><span>01</span><h2>見る</h2><p>普段の練習・試合で、選手が何を見ているか、コーチが何を観察しているかを整理します。</p></article>
      <article><Brain/><span>02</span><h2>判断する</h2><p>答えを先に与えすぎず、選手自身が状況から選択できる練習条件をつくります。</p></article>
      <article><Gamepad2/><span>03</span><h2>ゲームへつなぐ</h2><p>技術を単独で終わらせず、2on2・3on3・4on4などから実際のゲームへつなげます。</p></article>
      <article><Repeat2/><span>04</span><h2>続ける</h2><p>一回のイベントではなく、次の練習で何を続けるかまで残します。</p></article>
    </section>

    <section className="homecourt-product-preview section-pad" id="support">
      <div className="section-head">
        <div><p className="section-index">SUPPORT ROUTES</p><h2>必要な内容だけ選べます。</h2></div>
        <p>最初から長期契約を前提にしません。初回ヒアリング後、チームの状況に合う支援だけをご提案します。</p>
      </div>
      <div className="homecourt-preview-grid">
        {support.map(item=><article key={item.tag}>
          <span>{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <ul>{item.items.map(x=><li key={x}>{x}</li>)}</ul>
        </article>)}
      </div>
    </section>

    <section className="hosting-roles section-pad">
      <div className="section-head"><div><p className="section-index inverse">WHAT RBA LOOKS AT</p><h2>勝敗だけでは見えない部分を、一緒に見る。</h2></div></div>
      <div className="role-grid">
        <article><Target aria-hidden="true"/><h3>選手の経験</h3><ul><li>見る・判断する回数</li><li>1on1とスペースの使い方</li><li>ボールを持たない時間の関わり</li><li>失敗後に修正する機会</li></ul></article>
        <article><ClipboardList aria-hidden="true"/><h3>練習の設計</h3><ul><li>テーマとメニューがつながっているか</li><li>待ち時間とプレー回数</li><li>問いかけと制約条件</li><li>ゲーム形式への移行</li></ul></article>
        <article><Users aria-hidden="true"/><h3>チーム環境</h3><ul><li>出場・役割の固定化</li><li>コーチ間の共通理解</li><li>保護者への説明</li><li>年代に合った負荷と安全</li></ul></article>
        <article><Video aria-hidden="true"/><h3>映像から確認</h3><ul><li>練習動画</li><li>ゲーム映像</li><li>タイムアウトやベンチの関わり</li><li>選手が自分で解決する時間</li></ul></article>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">U8 / U10 / U12</p>
      <div>
        <h2>同じ「ミニバス」でも、<br/>年代で必要な経験は違う。</h2>
        <p>低学年から高学年まで同じ練習を繰り返すのではなく、身体発達、理解度、プレー経験に合わせて課題を調整します。早く完成させることより、次の年代で学び続けられる土台を優先します。</p>
        <a className="text-link" href="/ja/approach">RBAの育成方針を見る<ArrowRight size={16}/></a>
      </div>
    </section>

    <section className="hosting-ready section-pad">
      <div><p className="section-index">HOW IT STARTS</p><h2>相談から実施まで、5段階。</h2></div>
      <ul>
        {flow.map(([n,title,body])=><li key={n}><span>{n}</span><div><strong>{title}</strong><p>{body}</p></div><CheckCircle2/></li>)}
      </ul>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">AFTER SUPPORT</p>
      <div>
        <h2>RBAがいない日も、<br/>同じ考え方で練習を続けられるように。</h2>
        <p>指導者はD-HUBで学び、TEAM TRAININGに練習計画や振り返りを残せます。RBAの訪問がない日も、チーム自身で考えながら練習を続けられる状態を目指します。</p>
        <a className="text-link" href="/ja/d-hub">D-HUBを見る<ArrowRight size={16}/></a>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div>
          <p className="section-index">RBA COACHING GUIDE Vol.1</p>
          <h2>U12で本当に教えるべきこと</h2>
        </div>
        <p>FIBA/WABCの公開コーチング資料を参照し、発達段階、Game-Based Teaching、Fundamentals、3x3・4x4、90分の練習設計までを日本のU12現場向けに整理したRBAオリジナル教材です。</p>
      </div>
      <div className="homecourt-preview-grid">
        <article>
          <span>DIGITAL GUIDE / ¥3,300</span>
          <h3>「何を教えるか」より、学ぶ順番から整理する。</h3>
          <p>読むだけで終わらないよう、4週間で試す内容と練習のチェックリストも収録しています。</p>
          <a className="text-link" href="/ja/materials/u12-fundamentals">教材の内容を見る<ArrowRight size={16}/></a>
        </article>
        <article>
          <span>NOT AN OFFICIAL TRANSLATION</span>
          <h3>公式資料の翻訳販売ではありません。</h3>
          <p>FIBA/WABCの公開資料を参照し、RBAが独自の解説・練習設計を加えて再構成しています。</p>
          <a className="text-link" href="/ja/materials">RBA COACHING MATERIALSを見る<ArrowRight size={16}/></a>
        </article>
      </div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">START WITH YOUR TEAM</p>
      <h2>必要なサービスが、<br/>決まっていなくても大丈夫です。</h2>
      <p>今のチームで困っていること、3〜6か月後に選手にできるようになってほしいことを教えてください。RBAで状況を確認し、必要な方法をご提案します。フォーム送信だけで料金は発生しません。</p>
      <div className="closing-actions">
        <a className="button button-orange" href={intakeUrl} target="_blank" rel="noreferrer">初回ヒアリングフォーム<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/team-visit-clinic">VISIT TRAININGを見る<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">SAFETY / TRUST</p>
      <div>
        <h2>子どもの成長と安全を、最優先に。</h2>
        <p>活動内容は対象年代とチーム状況に合わせて調整します。映像や個人情報を扱う場合も、必要な範囲だけを確認し、公開利用を前提にはしません。支援範囲、費用、訪問条件が必要な場合は、実施前に内容を整理して合意します。</p>
        <div className="closing-actions">
          <a className="text-link" href="/ja/policies"><ShieldCheck size={16}/>RBAの安全・参加規約を見る</a>
          <a className="text-link" href="/ja/team-training"><MessageSquare size={16}/>TEAM TRAININGを見る</a>
        </div>
      </div>
    </section>
  </SiteFrame>;
}
