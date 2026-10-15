import type { Metadata } from "next";
export const metadata: Metadata = {
 title:"RBA育成指導指針｜U8〜U15の育成と成長の捉え方 | RBA JOURNAL",
 description:"RBAが現場指導者へ共有する育成の基本方針。U8〜U15の年代ごとの指導の考え方、判断力を育てる練習、成長の捉え方、年間計画と4週間の練習計画の立て方を解説します。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/youth-coaching-guidelines"},
};
const ageData=[
 {label:"U8",focus:"バスケットボールを好きになるための土台",experience:"走る、止まる、方向を変える、投げる、捕る、相手を避ける、空いている場所を見つける。遊びの中で多様な動きとボールに親しむ。",practice:"追いかけっこを伴うボール遊び、1対1の簡単な攻防、短いゲーム。説明より体験を多くする。",watch:"活動に参加できるか。相手や空間に気づいたか。失敗後にももう一度挑戦できたか。"},
 {label:"U10",focus:"相手を見て、自分で選び始める",experience:"1対1の攻防、基本的なパスとキャッチ、2対1で数的優位を使う経験。成功・失敗の理由を自分の言葉で確かめる。",practice:"守備者がいる1対1、2対1、少人数ゲーム。守備の開始位置やスペースを変える。",watch:"ボールだけでなく守備者を見られたか。パス・ドライブの選択理由を説明できるか。"},
 {label:"U12",focus:"判断と技術を、ゲームの中で結びつける",experience:"2対1、2対2、3対3でのパス、ドライブ、シュート、スペースの利用。オフボールで仲間を助ける動き。",practice:"数的優位から同数のゲームへ進める。プレー後に短い問いかけを行い、すぐ再挑戦できる時間を確保する。",watch:"選択が状況に合っていたか。選択した技術を実行できたか。ボールを持たない時の動きはどうだったか。"},
 {label:"U15",focus:"複数の選択肢から判断し、振り返って修正する",experience:"守備の変化や時間・点差に応じた選択。チームの原則を理解しながら、自分たちで状況に適応する経験。",practice:"3対3〜5対5、人数の有利・不利や時間制限を設けた課題。映像や簡易記録を用いた短い振り返り。",watch:"守備の変化への対応、オフボールの役割、プレー中の修正、次の行動を自分で決められるか。"}
];
const refs=[
 {author:"Bergeron et al. (2015)",title:"International Olympic Committee consensus statement on youth athletic development",url:"https://doi.org/10.1136/bjsports-2015-094962",note:"発達・成熟の個人差、健康、継続的な参加に配慮した育成の専門家声明。"},
 {author:"Renshaw et al. (2019)",title:"The Constraints-Led Approach: Principles for Sports Coaching and Practice Design",url:"https://www.routledge.com/The-Constraints-Led-Approach-Principles-for-Sports-Coaching-and-Practice/p/book/9781138104068",note:"個人・環境・課題の条件を調整する練習設計の考え方。"},
 {author:"Oslin, Mitchell & Griffin (1998)",title:"The Game Performance Assessment Instrument (GPAI): Development and Preliminary Validation",url:"https://doi.org/10.1123/jtpe.17.2.231",note:"ゲーム中の判断、技能の実行、サポートなどを分けて観察する評価方法の原著。"},
 {author:"Clemente et al. (2021)",title:"Effects of Small-Sided Game Interventions on the Technical Execution and Tactical Behaviors of Young and Youth Team Sports Players",url:"https://doi.org/10.3389/fpsyg.2021.667041",note:"少人数ゲームによる技術面への影響を扱うレビュー。戦術判断への効果を無条件に保証するものではない。"}
];
const H=({children}:{children:React.ReactNode})=><h2 style={{fontFamily:"'Yu Mincho','Hiragino Mincho ProN',serif",fontSize:26,letterSpacing:".02em",lineHeight:1.6,fontWeight:600,margin:"0 0 20px"}}>{children}</h2>;
const S=({children,id}:{children:React.ReactNode,id:string})=><section id={id} style={{borderTop:"1px solid #b8b8b3",paddingTop:30,marginTop:65}}>{children}</section>;
export default function Page(){return <main style={{maxWidth:910,margin:"0 auto",padding:"48px 22px 110px",lineHeight:2,color:"#252525",fontFamily:"'Yu Gothic',Meiryo,sans-serif",fontSize:16}}>
 <style>{`@media(max-width:680px){table.rba-mobile-table{min-width:0!important;width:100%!important;display:block}table.rba-mobile-table thead{display:none}table.rba-mobile-table tbody,table.rba-mobile-table tr{display:block;width:100%}table.rba-mobile-table tr{border-top:1px solid #aaa;padding:10px 0 16px}table.rba-mobile-table td{display:grid;grid-template-columns:minmax(78px,29%) minmax(0,1fr);column-gap:10px;width:100%;padding:8px 0!important;border-bottom:1px solid #eee!important;white-space:normal;overflow-wrap:anywhere;line-height:1.75}table.rba-mobile-table td::before{content:attr(data-label);font-weight:700;color:#4a4a4a}}`}</style>
 <header style={{borderBottom:"1px solid #aaa",paddingBottom:17,fontSize:12,letterSpacing:1.2}}>RIOT BASKETBALL ACADEMY　/　JOURNAL</header>
 <p style={{fontSize:12,marginTop:43,letterSpacing:2}}>COACHING GUIDELINES · 2026</p>
 <h1 style={{fontFamily:"'Yu Mincho','Hiragino Mincho ProN',serif",fontSize:"clamp(29px,4.6vw,45px)",fontWeight:600,lineHeight:1.52,margin:"14px 0 28px"}}>RBA育成指導指針<br/>U8〜U15の育成と成長の捉え方</h1>
 <p style={{fontSize:19,lineHeight:1.85}}>私たちは、子どもたちに何を経験してほしいのか。その経験を、どのような練習で支え、どのような変化を成長として捉えるのか。</p>
 <p>本稿では、育成年代の指導に共通する考え方を、年代別の課題例や練習中の観察方法とあわせて紹介します。指導者が目の前の選手に合わせて練習を組み立て、振り返る際の手がかりとなることを目指しています。</p>
 <p style={{borderLeft:"2px solid #555",paddingLeft:20,marginTop:28}}>大切なのは、すべての年代に同じ正解を当てはめることではありません。指導の目的を明確にしたうえで、選手の状況に合わせて計画を立て、実践を通じて見直し続けることです。</p>
 <nav aria-label="目次" style={{padding:"22px 0",marginTop:35,borderTop:"1px solid #ddd",borderBottom:"1px solid #ddd",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:7,fontSize:14}}>
 { [["方針","育成方針"],["発達","発達段階"],["年代","年代別指針"],["判断","判断力の育て方"],["評価","成長の評価"],["計画","年間・4週間計画"],["実践","指導を振り返る視点"],["文献","参考文献"]].map(([id,title],i)=><a key={id} href={"#"+id} style={{color:"#333",textDecoration:"none"}}>{String(i+1).padStart(2,"0")}　{title}</a>)}
 </nav>
 <S id="方針"><H>01　RBAが大切にする育成の考え方</H>
 <p>勝利を目指すことと、選手の成長を大切にすることは対立しません。ただし、試合の勝敗だけでは、練習で何を学び、どのような判断ができるようになったかは見えません。</p>
 <p>指導者は、①安全に参加できること、②挑戦する機会があること、③自分で状況を見て選ぶ経験があること、④振り返りを次の練習につなげられることを、計画の中で確保します。試合でプレーする機会も、選手にとって大切な学びの場です。出場時間だけで育成の質を測ることはできませんが、試合で挑戦する機会が極端に限られていないかは検討する必要があります。</p>
 </S>
 <S id="発達"><H>02　発達段階をどう捉えるか</H>
 <p>U8やU12といった区分は、指導計画を考えるための目安です。同じ学年でも、身体の成長、競技歴、理解度、運動への自信は異なります。年齢ごとに「できなければならないこと」を一律に決めるのではなく、今できることと次に挑戦できそうなことを把握します。</p>
 <p>身体の成長が早い選手を才能があると決めつけたり、成長が遅い選手の可能性を低く見積もったりしないことも重要です。接触や運動負荷、休息については個人差と健康状態を考慮します。</p>
 </S>
 <S id="年代"><H>03　U8〜U15の育成指針</H>
 <p style={{fontSize:13,color:"#646464"}}>下記はRBAの指導設計例です。年代ごとの指導内容に、研究で確立された唯一の正解があるわけではありません。</p>
 {ageData.map(d=><article key={d.label} style={{borderBottom:"1px solid #deded9",padding:"18px 0 23px"}}>
 <h3 style={{fontSize:21,fontWeight:650,margin:"0 0 8px"}}>{d.label}　{d.focus}</h3>
 <p><strong>用意する経験：</strong>{d.experience}</p><p><strong>練習例：</strong>{d.practice}</p><p><strong>観察すること：</strong>{d.watch}</p>
 </article>)}</S>
 <S id="判断"><H>04　判断力を育てる練習をどうつくるか</H>
 <p>判断力は、指導者から正解を聞いて覚えることだけで身につくものではありません。守備者、味方、スペース、時間といった情報を見ながら、何をするか選ぶ場面が必要です。</p>
 <h3>U12・2対1の実践例</h3>
 <p><strong>狙い：</strong>守備者の位置や動きを見て、パスを出すか自分で攻めるかを選ぶ。</p>
 <p><strong>進め方：</strong>攻撃2人・守備1人で、最初は広めのスペースを設ける。慣れてきたら守備者の開始位置を変える。攻撃側が守備の反応によって選択を変えたか観察する。</p>
 <p><strong>問いかけ：</strong>「パスを出したとき、守備者はどこにいた？」「もう一度やるなら、何を見る？」など、短く具体的に問いかける。答えを聞いたら、もう一度プレーする時間を確保する。</p>
 <p><strong>難易度調整：</strong>選択が難しすぎる場合はスペースを広げる。簡単すぎる場合は守備者の開始位置や制限時間を変更する。一度に多くの条件を変えない。</p>
 <p>1対1や3対3も同じ考え方です。「何を身につけたいか」を先に決め、狙った判断が実際に必要になる状況を用意します。</p>
 </S>
 <S id="評価"><H>05　選手の成長を何によって確かめるか</H>
 <p>得点、勝敗、シュート成功率は参考になります。ただし、指導者が見たいのは結果だけではありません。<strong>状況に応じた判断・選んだプレーの実行・ボールを持たないときの動き</strong>を分けて観察します。</p>
 <div style={{overflowX:"auto",maxWidth:"100%"}}><table className="rba-mobile-table" style={{borderCollapse:"collapse",width:"100%",minWidth:620,fontSize:14}}><thead><tr>{["項目","何を見るか","記録例（架空）","次の練習"].map(x=><th key={x} style={{textAlign:"left",padding:12,borderBottom:"1px solid #777",borderTop:"1px solid #777"}}>{x}</th>)}</tr></thead><tbody>{[
 ["判断","守備の動きを見て選べたか","6機会中4回","守備者の位置を変える"],
 ["技術の実行","選んだパスやシュートを実行できたか","適切な選択4回中2回成功","パスの正確さを高める練習を加える"],
 ["サポート","ボールを持たず味方を助けたか","5機会中2回","スペースの取り方を確認"]
 ].map(row=><tr key={row[0]}>{row.map((x,i)=><td key={i} data-label={["項目","観察内容","記録例","次の練習"][i]} style={{padding:12,borderBottom:"1px solid #d1d1ce",verticalAlign:"top"}}>{x}</td>)}</tr>)}</tbody></table></div>
 <p style={{fontSize:13,color:"#666"}}>この観察表はGPAIの考え方を参考にした簡易例であり、正式なGPAIの採点法ではありません。数回のプレーだけで能力を決めつけず、別の日や別の条件でも確認します。</p>
 <p>評価の目的は、選手に順位をつけることではありません。「判断はできているがパスが安定しない」なら技術練習を、「技術はあるが守備を見られていない」なら対人課題を増やすなど、次の練習の内容を決めるために使います。</p>
 </S>
 <S id="計画"><H>06　年間計画と直近4週間の計画</H>
 <h3>年間計画の基本項目</h3><p>各年代の計画には、①今年経験させたいゲーム状況、②月ごとの重点課題、③練習で用いる主な課題、④何を観察して見直すかを記載します。試合や大会の予定も組み込みますが、日程表だけで終わらせません。</p>
 <h3>直近4週間の進め方</h3>
 <p><strong>第1週：</strong>試合形式の中で現状を観察する。<br/><strong>第2週：</strong>課題に合わせて人数・スペース・ルールのうち一つを変更する。<br/><strong>第3週：</strong>同じ観察項目で判断と実行を記録する。<br/><strong>第4週：</strong>できるだけ同じ条件で再確認し、次月の課題を決める。</p>
 <p>練習後は「意図した場面が生まれたか」「選手は何を見て選んだか」「次回は何を変えるか」を簡潔に記録します。計画どおり進まなかった場合も、その理由が次の改善材料になります。</p>
 </S>
 <S id="実践"><H>07　指導を振り返るための問い</H>
 <p>指導計画を振り返るときは、「選手が経験した場面」と「指導者が身につけてほしいと考えたこと」が一致していたかを確かめます。たとえば、判断力を育てるつもりの練習で守備者がほとんど動かず、選手がいつも同じプレーを選んでいるなら、課題の条件を見直す必要があります。</p>
 <p>練習後には、次の三つを短く記録すると役立ちます。</p>
 <p><strong>① どんな判断の場面があったか。</strong>　守備者や味方の動きによって複数の選択肢が生まれていたか。</p>
 <p><strong>② 選手は何を見て、どう行動したか。</strong>　プレーの成功・失敗だけでなく、判断の過程を確かめられたか。</p>
 <p><strong>③ 次の練習で何を変えるか。</strong>　課題を簡単にするのか、守備の条件を変えるのか、選手が再挑戦する時間を増やすのか。</p>
 <p>育成計画は、選手を予定どおりに動かすためのものではありません。選手の変化を見逃さず、必要な経験を継続して用意するためのものです。</p>
 </S>
 <S id="文献"><H>08　参考文献</H>
 <p>以下は基本方針を考えるために参照した資料です。研究で確認された知見と、RBAが提案する練習例は区別して読んでください。</p>
 {refs.map((r,i)=><div key={r.title} style={{padding:"14px 0",borderBottom:"1px solid #ddd"}}><p style={{fontSize:13,color:"#666",marginBottom:2}}>参考文献 {i+1}　{r.author}</p><p style={{fontWeight:600,margin:"4px 0"}}>{r.title}</p><p style={{fontSize:14,margin:"4px 0 10px"}}>{r.note}</p><a style={{color:"#333",overflowWrap:"anywhere",fontSize:14}} target="_blank" rel="noopener noreferrer" href={r.url}>原典・出版社のページを開く ↗</a></div>)}
 <p style={{marginTop:22}}>論文の要旨・方法・結果・限界の読み方や、各文献の解説は、<a href="/ja/journal/okinawa-coaching-references#how-to-read" style={{color:"#333",textDecoration:"underline"}}>参考文献の読み方・現場への応用ガイド</a>で詳しく紹介しています。</p>
 <p>年間の指導方針を具体的な練習計画につなげたい方は、<a href="/ja/journal/gream-okinawa-u13-annual-development-programme-2026" style={{color:"#333",textDecoration:"underline"}}>試合から逆算して考える年間育成計画</a>も参考になります。実際の選手の記録に基づく完成計画ではなく、大会日程などを仮定した年間計画の例としてご覧ください。</p>
 </S>
 <footer style={{borderTop:"1px solid #aaa",marginTop:70,paddingTop:25,fontSize:13,color:"#666"}}>RBA JOURNAL　|　2026年10月15日<br/><a href="/ja/journal" style={{color:"#444"}}>ジャーナル一覧に戻る</a></footer>
 </main>}
