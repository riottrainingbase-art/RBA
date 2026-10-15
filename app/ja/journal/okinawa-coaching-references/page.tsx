import type { Metadata } from "next";
export const metadata: Metadata = { title:"育成年代の指導に役立つ研究と実践 | RBA JOURNAL",description:"発達段階、プレー中の判断、選手の成長の捉え方について、研究の知見と練習への生かし方を整理しました。",alternates:{canonical:"https://riotbasketballacademy.com/ja/journal/okinawa-coaching-references"}};
const refs=[
["Bergeron et al. (2015)","International Olympic Committee consensus statement on youth athletic development","https://doi.org/10.1136/bjsports-2015-094962","子どもの発達や成熟の個人差に配慮し、健康と長期的な競技参加を大切にすることを提言しています。特定の練習メニューの効果を調べた研究ではありません。"],
["Renshaw et al. (2019)","The Constraints-Led Approach: Principles for Sports Coaching and Practice Design","https://www.routledge.com/The-Constraints-Led-Approach-Principles-for-Sports-Coaching-and-Practice/p/book/9781138104068","選手自身の特徴、周囲の環境、練習のルールなどを調整することで、学びやすい状況をつくる考え方です。特定の2対1練習の効果を保証するものではありません。"],
["Oslin, Mitchell & Griffin (1998)","The Game Performance Assessment Instrument (GPAI): Development and Preliminary Validation","https://doi.org/10.1123/jtpe.17.2.231","試合中の判断、技術の実行、ボールを持たないときの動きなどを分けて観察するための評価方法です。このページの記録例は、GPAIの正式な採点方法ではありません。"],
["Clemente et al. (2021)","Effects of Small-Sided Game Interventions on the Technical Execution and Tactical Behaviors of Young and Youth Team Sports Players: A Systematic Review and Meta-Analysis","https://doi.org/10.3389/fpsyg.2021.667041","少人数で行うゲーム形式の練習について、技術面での改善が報告されています。一方、このレビューに含まれた研究では戦術的な行動の変化を評価できておらず、判断力が必ず向上するとまでは言えません。"]
];
const sections=[
["同じ年代でも、発達の状況は一人ひとり異なる","同じU12の選手でも、身体の成長、競技経験、練習内容の理解度、疲れやすさには違いがあります。年代ごとの目安は大切にしながらも、一人ひとりの様子を確かめ、練習の難易度や負荷を調整することが必要です。"],
["選手が自分で判断する場面を、練習の中につくる","例えば2対1では、守備者の位置や動きを見て、パスを出すか、自分で攻めるかを判断します。最初は広めのスペースで行い、慣れてきたら守備者の開始位置を変えてみます。そのとき、選手が何を見て選択したのかを確認します。これはRBAが提案する練習例であり、特定の効果を保証するものではありません。"],
["得点だけでは、選手の成長を十分に捉えられない","シュートが入ったかどうかだけでなく、打つべき場面だったか、選んだプレーを実行できたか、ボールを持っていないときに味方を助ける動きができたかも確認します。判断が適切でも、技術的なミスによって失敗することはあります。"],
["年間の育成方針を、日々の練習につなげる","年間計画は、一度作ったら変更できない予定表ではありません。月ごとに重点を置く課題を決め、毎週の練習で選手の様子を観察します。その結果を振り返り、必要に応じて次の練習内容を見直します。"]
];
export default function Page(){return <main style={{maxWidth:860,margin:"0 auto",padding:"54px 24px 100px",color:"#252525",fontFamily:"'Yu Gothic',Meiryo,sans-serif",lineHeight:1.95}}>
<p style={{fontSize:12,letterSpacing:2,borderBottom:"1px solid #aaa",paddingBottom:15}}>RIOT BASKETBALL ACADEMY / JOURNAL</p>
<p style={{fontSize:12,letterSpacing:1,marginTop:38}}>COACHING REFERENCE GUIDE · OCTOBER 2026</p>
<h1 style={{fontFamily:"serif",fontSize:"clamp(29px,5vw,43px)",lineHeight:1.5,fontWeight:600}}>育成を考えるための<br/>参考文献と現場への応用</h1>
<p style={{fontSize:18}}>子どもの成長には個人差があります。指導者は何を教え、どのような経験を用意し、選手の変化をどう確かめればよいのでしょうか。研究で示されている考え方を、日々の練習と結びつけて解説します。</p>
<p style={{borderLeft:"2px solid #555",paddingLeft:18}}>このページは、指導者が育成計画や練習内容を考える際の参考資料です。研究で確かめられたことと、RBAが提案する指導方法を区別して紹介します。</p>
{sections.map(([title,body],i)=><section key={title} style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>{String(i+1).padStart(2,"0")}　{title}</h2><p>{body}</p></section>)}
<section style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>05　U8〜U15の課題例</h2><p>以下は、研究によって各年代の正解が決められているわけではありません。RBAが指導計画を考える際の参考例です。</p>
{[["U8","遊びを通じた身体の動かし方、ボール操作、相手や空いている場所への気づき"],["U10","1対1、2対1などの簡単な場面での判断、味方と協力する経験"],["U12","2対1・2対2・3対3・オフボールのサポート"],["U15","複数の選択肢がある場面での判断、相手の変化への対応、プレーの振り返り"]].map(([age,txt])=><p key={age}><strong>{age}</strong>　{txt}</p>)}</section>
<section style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>06　4週間で取り組む観察と振り返りの例</h2><p>第1週は、普段のプレーを観察します。第2週は、スペースや人数などの条件を一つ変えてみます。第3週は、選手の判断と技術の実行を分けて記録します。第4週は、できるだけ同じ条件で再び観察し、次に取り組む課題を決めます。</p><p>例えば「判断する機会が6回あり、そのうち4回は状況に合った選択ができた。実際にプレーを成功させたのは2回」と記録します。数字は説明のための例であり、GPAIの正式な採点方法ではありません。指導者によって評価が大きく異ならないかも確かめ、数回のプレーだけで選手の能力を決めつけないようにします。</p></section>
<section style={{borderTop:"1px solid #bbb",marginTop:45,paddingTop:20}}><h2 style={{fontFamily:"serif",fontSize:25}}>07　原著・参考文献</h2>{refs.map(([author,title,url,note],i)=><div key={title} style={{padding:"18px 0",borderBottom:"1px solid #ddd"}}><p style={{fontSize:13,margin:0}}>文献 {String(i+1).padStart(2,"0")} / {author}</p><p style={{fontWeight:600}}>{title}</p><p>{note}</p><a href={url} target="_blank" rel="noopener noreferrer" style={{color:"#222",overflowWrap:"anywhere"}}>原著・出版社ページを確認 ↗</a></div>)}</section>
<p style={{fontSize:13,color:"#666",marginTop:50}}>RBA JOURNAL · 参考文献ガイド／最終更新：2026年10月15日</p><a href="/ja/journal" style={{color:"#222"}}>← ジャーナル一覧へ戻る</a></main>}