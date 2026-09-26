import { ArrowRight } from "lucide-react";

export function VisitTrainingObservation(){
  return <>
    <section className="homecourt-product-preview section-pad">
      <div className="section-head">
        <div><p className="section-index">WHAT WE OBSERVE</p><h2>普段の練習だからこそ、見えるものがあります。</h2></div>
        <p>技術の結果だけでなく、選手が何を見ているか、誰が判断しているか、練習の構造がどんな行動を引き出しているかを確認します。</p>
      </div>
      <div className="homecourt-preview-grid">
        <article><span>01 / SEE</span><h3>何を見ているか</h3><p>ボールだけでなく、味方、相手、スペース、ヘルプまで見えているかを観察します。</p></article>
        <article><span>02 / DECIDE</span><h3>誰が判断しているか</h3><p>外からの指示だけで動くのではなく、選手自身が状況から選べているかを確認します。</p></article>
        <article><span>03 / SPACE</span><h3>コートをどう使っているか</h3><p>間隔、角度、カット、リロケート、数的優位が自然に生まれているかを見ます。</p></article>
        <article><span>04 / LOAD</span><h3>練習負荷は適切か</h3><p>待ち時間、運動量、反復回数を見ながら、年代と目的に合う負荷かを確認します。</p></article>
        <article><span>05 / COACHING</span><h3>問いとフィードバック</h3><p>説明量、問いかけ、制約条件、フィードバックのタイミングを整理します。</p></article>
        <article><span>06 / TRANSFER</span><h3>試合につながっているか</h3><p>練習した技術が、実際のゲーム状況で使える形になっているかを確認します。</p></article>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">TEAM TRAINING × VISIT TRAINING</p>
      <div>
        <h2>訪問して終わりではなく、<br/>次のチーム練習へつなげます。</h2>
        <p>チームの指導者と観察点を共有し、その日の内容だけでなく、次回の練習で何を見るかまで整理します。HOMECOURTのTEAM TRAININGと組み合わせれば、訪問後も同じテーマをチーム内で継続できます。</p>
        <a className="text-link" href="/ja/team-training">TEAM TRAININGを見る<ArrowRight size={16}/></a>
      </div>
    </section>
  </>;
}
