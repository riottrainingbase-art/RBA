import type { Metadata } from "next";
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, LockKeyhole, RefreshCw } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { getDigitalMaterial, type DigitalMaterialRecord, U12_MATERIAL_SLUG, U12_OFFER_OPTION } from "@/lib/digital-material-access";

export const metadata: Metadata = {
  title: "U12で本当に教えるべきこと｜RBA COACHING GUIDE Vol.1",
  description: "FIBA/WABCの育成原則を参照し、日本のU12現場向けにRBAが独自解説・再構成した指導者向けデジタル教材。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/materials/u12-fundamentals" },
};

type HeadingBody = { heading:string; body:string };
type FrameworkItem = { step:string; ja:string; body:string };
type SampleGame = { title:string; purpose:string; rule:string };
type TimelineItem = { time:string; title:string; body:string };
type WeekItem = { week:string; theme:string; focus:string; game:string };

type MaterialChapter = {
  no:string;
  basis:string;
  title:string;
  lead?:string;
  points?:HeadingBody[];
  coachingQuestions?:string[];
  practiceIdeas?:string[];
  framework?:FrameworkItem[];
  redFlags?:string[];
  sampleGames?:SampleGame[];
  do?:string[];
  avoid?:string[];
  timeline?:TimelineItem[];
  weeks?:WeekItem[];
  checklist?:string[];
  finalPrompt?:string;
};

type MaterialContent = {
  version?: string;
  audience?: string;
  notice?: string;
  howToUse?: string[];
  chapters?: MaterialChapter[];
  sources?: Array<{ title:string; url:string; note?:string }>;
  nextSteps?: Array<{ title:string; body:string; href:string }>;
};

function SalesPage({ paymentPending=false }: { paymentPending?: boolean }) {
  return <>
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja/materials">← RBA COACHING MATERIALS</a>
      <p className="section-index">RBA COACHING GUIDE Vol.1</p>
      <h1>U12で本当に<br/>教えるべきこと。</h1>
      <p>「難しい技を早く教える」ことと、「次の年代でも学び続けられる選手を育てる」ことは同じではありません。発達段階、Game-Based Teaching、Fundamentals、3x3・4x4、練習設計を一本につなげて整理します。</p>
      <div className="closing-actions">
        <a className="button button-orange" href={`/api/commerce/checkout/${U12_OFFER_OPTION}?locale=ja`}>3,300円（税込）で購入<ArrowRight size={17}/></a>
        <a className="button button-dark" href="#contents">内容を見る<ArrowRight size={17}/></a>
      </div>
    </section>

    {paymentPending ? <section className="access-promise section-pad">
      <RefreshCw aria-hidden="true"/>
      <div>
        <h2>決済ありがとうございます。</h2>
        <p>Stripeの決済情報をRBA IDへ反映しています。通常はすぐに完了します。まだ教材が表示されない場合は、このページを数秒後に再読み込みしてください。</p>
      </div>
    </section> : null}

    <section className="statement section-pad">
      <p className="section-index">THE PROBLEM</p>
      <div>
        <h2>技を増やす前に、<br/>学ぶ順番を整理する。</h2>
        <p>ドリブル技の種類、シュートフォーム、戦術の形だけを増やしても、選手が状況を見て判断できなければゲームではつながりません。この教材では「何を教えるか」より先に、「今の年代で、どんな経験を積ませるか」を整理します。</p>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad" id="contents">
      <div className="section-head">
        <div><p className="section-index">WHAT YOU GET</p><h2>読むだけで終わらない10章。</h2></div>
        <p>考え方だけでなく、90分練習テンプレート、4週間の実践プラン、練習評価チェックリストまで入れています。</p>
      </div>
      <div className="homecourt-preview-grid">
        {[
          ["01","発達段階","U12育成は「早く完成させる競争」ではない"],
          ["02","個別化","年齢だけでなく、今のスキルレベルを見る"],
          ["03","身体操作","身体を使う力もFundamentals"],
          ["04","GAME-BASED","ゲームから必要な技術へ戻る"],
          ["05","FUNDAMENTALS","見る→判断→実行→修正"],
          ["06","3x3 / 4x4","Small-Sided Gamesを学習量に変える"],
          ["07","COACHING","教えすぎない。でも放っておかない"],
          ["08","90 MIN","RBAオリジナル練習テンプレート"],
          ["09","4 WEEKS","4週間の実践プラン"],
          ["10","CHECK","練習を見る10項目"],
        ].map(([n,k,t])=><article key={n}><span>{n} / {k}</span><h3>{t}</h3></article>)}
      </div>
    </section>

    <section className="access-promise section-pad">
      <LockKeyhole aria-hidden="true"/>
      <div>
        <h2>購入後はRBA IDでいつでも閲覧。</h2>
        <p>購入前にRBA IDへログインします。決済後は同じRBA IDで教材ページを開くだけです。月額契約ではなく、Vol.1単品の買い切りです。</p>
        <div className="closing-actions">
          <a className="button button-orange" href={`/api/commerce/checkout/${U12_OFFER_OPTION}?locale=ja`}>購入して読む<ArrowRight size={17}/></a>
        </div>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">IMPORTANT</p>
      <div>
        <h2>FIBA/WABC公式翻訳ではありません。</h2>
        <p>FIBA/WABCが公開している資料を参照し、Riot Basketball Academyが日本のU12現場向けに独自の解説、練習設計、チェックリストを加えて再構成した教材です。公式資料そのものを日本語化して販売するものではありません。</p>
      </div>
    </section>
  </>;
}

function PaidGuide({ material }:{ material:DigitalMaterialRecord }) {
  const c=(material.content||{}) as MaterialContent;
  const chapters:MaterialChapter[]=Array.isArray(c.chapters)?c.chapters:[];

  return <>
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja/materials">← RBA COACHING MATERIALS</a>
      <p className="section-index">PURCHASED / RBA COACHING GUIDE Vol.1</p>
      <h1>{material.title}</h1>
      <p>{material.subtitle}</p>
      <div className="closing-actions">
        <a className="button button-dark" href="#chapter-01">教材を読む<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="access-promise section-pad">
      <BookOpen aria-hidden="true"/>
      <div>
        <h2>この教材の使い方</h2>
        <p>{c.audience ? `対象：${c.audience}` : ""}</p>
        <ul>{(c.howToUse||[]).map((x,i)=><li key={i}>{x}</li>)}</ul>
      </div>
    </section>

    {chapters.map((chapter,index)=><section className={index%2===0?"homecourt-product-preview section-pad":"statement section-pad"} id={`chapter-${chapter.no}`} key={chapter.no}>
      {index%2!==0 ? <p className="section-index">{chapter.no} / {chapter.basis}</p> : null}
      <div className={index%2===0?"section-head":undefined}>
        <div>
          {index%2===0 ? <p className="section-index">{chapter.no} / {chapter.basis}</p> : null}
          <h2>{chapter.title}</h2>
        </div>
        <p>{chapter.lead}</p>
      </div>

      {Array.isArray(chapter.points) ? <div className="homecourt-preview-grid">
        {chapter.points.map((p,i)=><article key={i}><span>{String(i+1).padStart(2,"0")}</span><h3>{p.heading}</h3><p>{p.body}</p></article>)}
      </div> : null}

      {Array.isArray(chapter.framework) ? <div className="homecourt-preview-grid">
        {chapter.framework.map((p)=><article key={p.step}><span>{p.step}</span><h3>{p.ja}</h3><p>{p.body}</p></article>)}
      </div> : null}

      {Array.isArray(chapter.sampleGames) ? <div className="homecourt-preview-grid">
        {chapter.sampleGames.map((g,i)=><article key={i}><span>GAME {String(i+1).padStart(2,"0")}</span><h3>{g.title}</h3><p><strong>目的：</strong>{g.purpose}</p><p><strong>ルール：</strong>{g.rule}</p></article>)}
      </div> : null}

      {Array.isArray(chapter.timeline) ? <div className="hosting-ready"><ul>
        {chapter.timeline.map((x)=><li key={x.time}><span>{x.time}</span><div><strong>{x.title}</strong><p>{x.body}</p></div><CheckCircle2/></li>)}
      </ul></div> : null}

      {Array.isArray(chapter.weeks) ? <div className="homecourt-preview-grid">
        {chapter.weeks.map((w)=><article key={w.week}><span>{w.week} / {w.theme}</span><h3>{w.focus}</h3><p>{w.game}</p></article>)}
      </div> : null}

      {Array.isArray(chapter.coachingQuestions) ? <div className="homecourt-private-note"><div><strong>COACHING QUESTIONS</strong><ul>{chapter.coachingQuestions.map((x,i)=><li key={i}>{x}</li>)}</ul></div></div> : null}
      {Array.isArray(chapter.practiceIdeas) ? <div className="homecourt-private-note"><div><strong>PRACTICE IDEAS</strong><ul>{chapter.practiceIdeas.map((x,i)=><li key={i}>{x}</li>)}</ul></div></div> : null}
      {Array.isArray(chapter.redFlags) ? <div className="homecourt-private-note"><div><strong>RED FLAGS</strong><ul>{chapter.redFlags.map((x,i)=><li key={i}>{x}</li>)}</ul></div></div> : null}

      {Array.isArray(chapter.do) || Array.isArray(chapter.avoid) ? <div className="homecourt-preview-grid">
        <article><span>DO</span><h3>増やしたい関わり</h3><ul>{(chapter.do||[]).map((x,i)=><li key={i}>{x}</li>)}</ul></article>
        <article><span>AVOID</span><h3>減らしたい関わり</h3><ul>{(chapter.avoid||[]).map((x,i)=><li key={i}>{x}</li>)}</ul></article>
      </div> : null}

      {Array.isArray(chapter.checklist) ? <div className="hosting-ready"><ul>
        {chapter.checklist.map((x,i)=><li key={i}><span>{String(i+1).padStart(2,"0")}</span><div><strong>{x}</strong></div><CheckCircle2/></li>)}
      </ul>{chapter.finalPrompt?<p>{chapter.finalPrompt}</p>:null}</div> : null}
    </section>)}

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">OFFICIAL SOURCES</p><h2>参照したFIBA/WABC公開資料</h2></div><p>原典も無料で確認できます。RBA教材と原典を行き来しながら読むことを推奨します。</p></div>
      <div className="homecourt-preview-grid">
        {(c.sources||[]).map((s,i)=><article key={s.url}><span>SOURCE {String(i+1).padStart(2,"0")}</span><h3>{s.title}</h3><p>{s.note}</p><a className="text-link" href={s.url} target="_blank" rel="noreferrer">公式資料を開く<ExternalLink size={15}/></a></article>)}
      </div>
    </section>

    <section className="access-promise section-pad">
      <p className="section-index">COPYRIGHT / POSITION</p>
      <div>
        <h2>RBAオリジナル教材としての位置づけ</h2>
        <p>{c.notice}</p>
      </div>
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">NEXT STEP</p>
      <h2>読むだけで終わらせず、<br/>次の練習へ。</h2>
      <p>必要なら、D-HUBで学びを継続したり、チーム支援で実際の練習へ落とし込むこともできます。</p>
      <div className="closing-actions">
        {(c.nextSteps||[]).map(n=><a key={n.href} className="button button-dark" href={n.href}>{n.title}<ArrowRight size={17}/></a>)}
      </div>
    </section>
  </>;
}

export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) {
  const query=await searchParams;
  const paymentPending=query.payment==="success";
  const { hasAccess, material } = await getDigitalMaterial(U12_MATERIAL_SLUG);

  return <SiteFrame locale="ja">
    {hasAccess && material ? <PaidGuide material={material}/> : <SalesPage paymentPending={paymentPending}/>}
  </SiteFrame>;
}
