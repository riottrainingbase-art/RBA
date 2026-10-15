import type { Metadata } from "next";
export const metadata: Metadata = { title:"育成を考えるための参考文献と現場への応用 | RBA JOURNAL",description:"沖縄スタッフ向け。発達段階・判断力・成長評価を研究の知見と実践提案に分けて解説。",alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/okinawa-coaching-references"}};
const refs=[
["Bergeron et al. (2015)","International Olympic Committee consensus statement on youth athletic development","https://doi.org/10.1136/bjsports-2015-094962","発達や成熟の個人差を尊重し、健康と長期的な参加を重視する専門家声明。年代別の特定メニューの効果を検証した実験ではありません。"],
["Renshaw et al. (2019)","The Constraints-Led Approach: Principles for Sports Coaching and Practice Design","https://www.routledge.com/The-Constraints-Led-Approach-Principles-for-Sports-Coaching-and-Practice/p/book/9781138104068","個人・環境・課題の制約を調整して学習機会を設計する理論。2対1の特定ドリルの効果を保証するものではありません。"],
["Oslin, Mitchell & Griffin (1998)","The Game Performance Assessment Instrument (GPAI): Development and Preliminary Validation","https://doi.org/10.1123/jtpe.17.2.231","意思決定・技能実行・サポート等を区別するゲーム評価の枠組み。下記の簡易観察例は正式なGPAI尺度ではありません。"],
["Clemente et al. (2021)","Effects of Small-Sided Game Interventions on the Technical Execution and Tactical Behaviors of Young and Youth Team Sports Players: A Systematic Review and Meta-Analysis","https://doi.org/10.3389/fpsyg.2021.667041","少人数ゲームによる技術実行の改善が示唆されました。ただし採択研究で戦術行動のアウトカムは確認されず、判断力向上を一律に実証したとは言えません。"]
];
const sections=[
["発達段階は年齢だけでは決められない","同じU12でも、身体的成熟、競技経験、課題への理解、疲労への反応は異なります。年齢は目安として使い、実際の選手の様子を見て課題の難しさを調整します。"],
["判断力は状況の中で育てる","例えば2対1では、守備者の位置を見てパスかドライブかを選ぶ必要があります。まず広いスペースで実施し、次に守備者の開始位置だけを変え、選択がどう変わるかを観察します。これらはRBAの実践提案であり、特定の成果を保証するものではありません。"],
["得点と成長を同一視しない","シュートが入ったかだけでなく、適切なタイミングで選択したか、実行できたか、ボールを持たない時に味方を助けられたかを別々に観察します。選択は良くても実行に失敗することがあります。"],
["年間計画から毎週の練習へ","年間計画は固定された予定表ではありません。月ごとの重点、週ごとの観察項目、練習後の振り返りをつなぎ、選手の反応に応じて変更します。"]
];
export default function Page(){return <main style={{maxWidth:860,margin:"0 auto",padding:"54px 24px 100px",color:"#252525",fontFamily:"'Yu Gothic',Meiryo,sans-serif",lineHeight:1.95}}>
<p style={{fontSize:12,letterSpacing:2,borderBottom:"1px solid #aaa",paddingBottom:15}}>RIOT BASKETBALL ACADEMY / JOURNAL</p>
<p style={{fontSize:12,letterSpacing:1,marginTop:38}}>COACHING REFERENCE GUIDE · OCTOBER 2026</p>
<h1 style={{fontFamily:"serif",fontSize:"clamp(29px,5vw,43px)",lineHeight:1.5,fontWeight:600}}>育成を考えるための<br/>参考文献と現場への応用</h1>
<p style={{fontSize:18}}>発達段階、判断力、成長評価。沖縄の指導現場で育成計画を考えるために、研究が示すこととRBAの実践提案を区別して整理しました。</p>
<p style={{borderLeft:"2px solid #555",paddingLeft:18}}>本資料は指導者の学習を支援するもので、特定の選手や指導者への評価、契約上の提出義務を示すものではありません。</p>
{sections.map(([title,body],i)=><section key={title} style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>{String(i+1).padStart(2,"0")}　{title}</h2><p>{body}</p></section>)}
<section style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>05　U8〜U15の課題例</h2><p>以下は研究から一意に決まる区分ではなく、RBAが現場で検証するための設計例です。</p>
{[["U8","遊び・方向転換・ボール操作・相手と空間への気づき"],["U10","1対1・簡単な数的優位・味方との協力"],["U12","2対1・2対2・3対3・オフボールのサポート"],["U15","複数の戦術選択・状況変化への適応・振り返り"]].map(([age,txt])=><p key={age}><strong>{age}</strong>　{txt}</p>)}</section>
<section style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>06　現場での4週間</h2><p>第1週：現状のプレーを観察する。第2週：課題条件を一つ変える。第3週：選択と実行を別々に記録する。第4週：同じ観察条件で比較し、次の課題を決める。</p><p>記録例：「適切な選択が6機会中4回、うち実行成功2回」。これは架空の例で、正式なGPAIの得点法ではありません。観察者間の一致を確認し、少数回の結果だけで選手の能力を断定しないでください。</p></section>
<section style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>07　原著・参考文献</h2>{refs.map(([author,title,url,note],i)=><div key={title} style={{padding:"18px 0",borderBottom:"1px solid #ddd"}}><p style={{fontSize:13,margin:0}}>文献 {String(i+1).padStart(2,"0")} / {author}</p><p style={{fontWeight:600}}>{title}</p><p>{note}</p><a href={url} target="_blank" rel="noopener noreferrer" style={{color:"#222",overflowWrap:"anywhere"}}>原著・出版社ページを確認 ↗</a></div>)}</section>
<p style={{fontSize:13,color:"#666",marginTop:50}}>RBA JOURNAL · 参考文献ガイド／最終更新：2026年10月15日</p><a href="/ja/journal" style={{color:"#222"}}>← ジャーナル一覧へ戻る</a></main>}