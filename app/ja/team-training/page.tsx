import type { Metadata } from "next";
import { ArrowRight, Brain, CheckCircle2, ClipboardList, Eye, Gamepad2, Repeat2, ShieldCheck, Target, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: "RBA TEAM TRAINING｜チーム練習設計と訪問トレーニング",
  description: "RBAのTEAM TRAININGは、練習テーマ、認知・判断、ゲーム形式、振り返りまでを一つの流れで設計するチーム向け育成機能です。必要に応じてRBAが現場へ伺うVISIT TRAININGにもつなげられます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/team-training" },
  openGraph: {
    title: "RBA TEAM TRAINING｜練習を、選手の学びが残る時間に。",
    description: "練習メニューを並べるだけではなく、何を見て、どう判断し、何を試すかまで設計する。",
    url: "https://riotbasketballacademy.com/ja/team-training",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["/rba-court-hero.png"],
  },
};

const principles = [
  ["SEE", "何を見るかを決める", "ボールだけでなく、味方・相手・スペース・時間を見る課題をつくります。"],
  ["DECIDE", "自分で選ぶ時間をつくる", "答えを先に与えず、状況から選ぶ回数を練習の中に確保します。"],
  ["EXECUTE", "技術を状況の中で使う", "パス、ドライブ、シュート、フィニッシュを、判断と切り離さず扱います。"],
  ["CONNECT", "仲間とつながる", "スペーシング、タイミング、声、オフボールの動きまで含めてチームで学びます。"],
  ["COMPETE", "ゲームで確かめる", "2on2・3on3・4on4などのSmall-Sided Gameで、テーマが実際に使えるか確認します。"],
  ["REFLECT", "次の練習へ残す", "できた・できないだけで終わらず、次に何を続けるかを言葉にします。"],
] as const;

const sample = [
  ["00–10", "ARRIVE / READY", "身体を温めながら、今日見るもの・意識するものを共有する。"],
  ["10–25", "FUNDAMENTALS IN CONTEXT", "技術を単独で反復せず、見る・判断する条件を加えて行う。"],
  ["25–45", "SMALL-SIDED GAME", "2on2・3on3でスペース、数的優位、タイミングを経験する。"],
  ["45–65", "TEAM CONCEPT", "その日のテーマを5on5やチーム状況へつなげる。"],
  ["65–80", "COMPETE", "制約を減らし、実際のゲームに近い中で選手自身に解決させる。"],
  ["80–90", "REFLECT", "何が見えたか、何を選んだか、次に何を試すかを整理する。"],
] as const;

export default function Page(){
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja">← RBA</a>
      <p className="section-index">RBA TEAM TRAINING</p>
      <h1>練習を、<br/>選手の学びが残る時間に。</h1>
      <p>TEAM TRAININGは、メニューを並べるための機能ではありません。何を見て、どう判断し、どんなプレーを試し、次の練習へ何を残すかまでを一つの流れで設計します。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/my-homecourt">MY HOME COURTを見る<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/team-visit-clinic">訪問トレーニングを見る<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">WHY TEAM TRAINING</p>
      <div>
        <h2>「何をやるか」より先に、<br/>「何を学ばせるか」を決める。</h2>
        <p>同じドリルでも、目的が違えば選手の学びは変わります。RBAでは、技術・判断・スペーシング・ゲーム理解・身体づくりを別々に扱わず、その日のテーマに合わせてつなげます。</p>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">RBA TEAM TRAINING MODEL</p><h2>6つの視点で、練習を設計する。</h2></div>
        <p>全部を毎回入れる必要はありません。年代、人数、コート数、チームの課題に合わせて必要なものを選びます。</p>
      </div>
      <div className="homecourt-preview-grid">
        {principles.map(([tag,title,body],i)=><article key={tag}>
          <span>{String(i+1).padStart(2,"0")} / {tag}</span>
          <h3>{title}</h3>
          <p>{body}</p>
        </article>)}
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">IN MY HOME COURT</p>
      <div>
        <h2>TEAM HOMEの練習計画とつながります。</h2>
        <p>指導者は、練習テーマ、目的、メニュー、参加人数、コート数、必要物品、コーチメモを保存できます。練習後の気づきは次回の計画へ残し、単発のメニュー集ではなく、チームの学習履歴として積み上げます。</p>
      </div>
    </section>

    <section className="access-grid section-pad">
      <article><Target/><span>01</span><h2>テーマを決める</h2><p>「シュート」ではなく「いつ打つか」「どこで優位性をつくるか」まで具体化します。</p></article>
      <article><Eye/><span>02</span><h2>観察点を決める</h2><p>選手の成功回数だけでなく、見る回数、判断、スペースの使い方を観察します。</p></article>
      <article><Brain/><span>03</span><h2>問いと制約を設計</h2><p>コーチが答えを言い続けるのではなく、選手自身が解決する状況をつくります。</p></article>
      <article><Gamepad2/><span>04</span><h2>ゲームで確かめる</h2><p>Small-Sided Gameから5on5へつなぎ、実際の試合に近い状況でテーマを確認します。</p></article>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">90-MIN SAMPLE</p><h2>90分なら、こう組めます。</h2></div>
        <p>これは固定メニューではなく一例です。選手数、年代、テーマ、施設条件に合わせて変えます。</p>
      </div>
      <div className="homecourt-preview-grid">
        {sample.map(([time,title,body])=><article key={time}><span>{time}</span><h3>{title}</h3><p>{body}</p></article>)}
      </div>
    </section>

    <section className="hosting-roles section-pad">
      <div className="section-head"><div><p className="section-index inverse">COACH → PLAYER → TEAM</p><h2>指導者の設計と、選手の振り返りをつなぐ。</h2></div></div>
      <div className="role-grid">
        <article><ClipboardList/><h3>指導者</h3><ul><li>練習テーマと目的を明確にする</li><li>観察する行動を決める</li><li>次回に続ける課題を残す</li></ul></article>
        <article><Users/><h3>選手</h3><ul><li>今日のテーマを理解する</li><li>自分で見て判断する</li><li>次に試すことを言葉にする</li></ul></article>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">VISIT TRAINING</p>
      <div>
        <h2>設計だけで終わらない。<br/>必要なら、RBAが現場へ行きます。</h2>
        <p>HOMECOURTで整理したチームの課題をもとに、RBAが普段の体育館へ伺い、練習観察、オンコート指導、ゲーム観察、指導者フィードバックまで行えます。チームのいつもの環境だからこそ見える課題を扱います。</p>
        <a className="text-link" href="/ja/team-visit-clinic">RBA VISIT TRAININGを見る<ArrowRight size={16}/></a>
      </div>
    </section>

    <section className="hosting-ready section-pad">
      <div><p className="section-index">TEAM TRAINING CHECK</p><h2>毎回、最低限この6点を残す。</h2></div>
      <ul>
        {["今日のテーマ","選手に見てほしいもの","実際に試す行動","使うゲーム形式","コーチが観察するポイント","次回に続けること"].map((item,i)=><li key={item}><span>{String(i+1).padStart(2,"0")}</span><strong>{item}</strong><CheckCircle2/></li>)}
      </ul>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">RBA TEAM TRAINING / VISIT TRAINING</p>
      <h2>チームの日常に、<br/>育成の仕組みを入れる。</h2>
      <p>自分たちでTEAM TRAININGを使うことも、RBAを現場へ呼ぶこともできます。今のチームを変えるのではなく、今いる環境の中に新しい学び方を加えます。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="/ja/my-homecourt">MY HOME COURTを開く<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/clinic-request">訪問トレーニングを相談する<ArrowRight size={17}/></a>
      </div>
    </section>
  </SiteFrame>;
}
