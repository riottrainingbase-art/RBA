"use client";

import {useMemo,useState} from "react";
import {ArrowRight,CheckCircle2,RotateCcw,Share2} from "lucide-react";
import {torstenRegistrationUrl} from "@/components/programme-data";

const questions=[
  ["試合で、打つ前の判断も振り返っている","守備の位置や打つ・運ぶ・パスの選択を観察しているか。","decision"],
  ["ボールを持っていない時の準備も練習している","キャッチ前の位置取り、視野、足の準備を扱っているか。","decision"],
  ["シュート練習に守備や時間などの条件がある","反復練習に加えて、状況に応じて判断する機会があるか。","practice"],
  ["リング数や人数にかかわらず全員の学習機会を確保している","待ち時間や固定起用による経験格差を考慮しているか。","practice"],
  ["コーチの指示だけでなく選手自身に考える問いを使っている","選手が何を見て選んだかを聞くことがあるか。","feedback"]
] as const;
const options=["まだ意識していない","時々できている","日常的に取り組んでいる"] as const;
const suggestions={
 decision:["打つ前の状況判断を、練習につなげる","まずボールを受ける前に選手が何を見ているか観察しよう。","5対5の攻撃を10回観察し、パス前の準備とシュートを選ばなかった場面を記録する。"],
 practice:["反復からゲームに近い学習へ","本数だけでなく、練習中に何を判断していたかに注目しよう。","同じシュート課題を「守備なし」と「判断条件あり」で行い、選手の見ている情報を比較する。"],
 feedback:["選手自身が考える声かけへ","次は正解を教える前に、選手の考えを聞くことから始めよう。","「今、何が見えた？」「ほかに選択肢はあった？」と一つ質問し、練習後に振り返る。"]
} as const;
export function TorstenShootingCheckJa(){
 const [answers,setAnswers]=useState<(number|null)[]>(Array(5).fill(null));
 const [result,setResult]=useState(false);
 const [copied,setCopied]=useState(false);
 const count=answers.filter(v=>v!==null).length;
 const suggestion=useMemo(()=>{
  const averages=[
   {key:"decision" as const,score:((answers[0]??0)+(answers[1]??0))/2},
   {key:"practice" as const,score:((answers[2]??0)+(answers[3]??0))/2},
   {key:"feedback" as const,score:(answers[4]??0)}
  ];
  averages.sort((a,b)=>a.score-b.score);
  return suggestions[averages[0].key];
 },[answers]);
 return <div className="tc-check">
  <main className="tc-check-wrap">
   <header className="tc-check-hero"><p className="tc-check-kicker">RBA COACH EDUCATION / FREE PRACTICE CHECK</p><p className="tc-check-meta">約2分・無料・個人情報入力不要</p><h1>あなたのシュート練習は、<br/><em>試合につながっているか。</em></h1><p>5つの問いで、明日の練習を見直すヒントを見つけよう。RBA独自の振り返りツールです。シュートフォームの正しさやコーチの能力を判定するものではありません。</p></header>
   {!result ? <section className="tc-check-card" aria-label="練習設計の振り返り">
    <div className="tc-check-progress"><span>回答 {count} / 5</span><div role="progressbar" aria-valuenow={count} aria-valuemin={0} aria-valuemax={5}><i style={{width:String(count*20)+"%"}}/></div></div>
    {questions.map((q,i)=><fieldset key={q[0]} className="tc-check-question"><legend><span>Q{String(i+1).padStart(2,"0")}</span>{q[0]}</legend><p>{q[1]}</p><div className="tc-check-options">{options.map((opt,j)=><label key={opt} className={answers[i]===j?"tc-check-option is-selected":"tc-check-option"}><input type="radio" name={"question_"+i} checked={answers[i]===j} onChange={()=>setAnswers(a=>a.map((v,k)=>k===i?j:v))}/><span>{opt}</span>{answers[i]===j&&<CheckCircle2 size={18}/>}</label>)}</div></fieldset>)}
    <button className="tc-check-btn" type="button" disabled={count!==5} onClick={()=>setResult(true)}>振り返り結果を見る <ArrowRight size={18}/></button>
    <p className="tc-check-note">回答はこの画面内で使われ、RBAには送信されません。科学的な診断や指導力評価ではありません。</p>
   </section> : <section className="tc-check-card" aria-live="polite">
    <p className="tc-check-kicker">YOUR NEXT PRACTICE</p><h2>{suggestion[0]}</h2><p>{suggestion[1]}</p><div className="tc-check-tip"><strong>次の練習でできること</strong><p>{suggestion[2]}</p></div>
    <h3>さらに学びたい指導者の方へ</h3><p>11月25日、トーステン・ロイブル氏のオンライン講習「現代バスケットボールにおけるシューターの育成と活用」を開催。技術・練習設計・スペーシング・判断を一つの流れとして学びます。</p>
    <div className="tc-check-event"><span>2026.11.25 WED 20:00–21:30</span><strong>LIVE ¥3,300 / 30日録画 ¥4,400</strong><small>税込・日本語逐次通訳付き</small></div>
    <a className="tc-check-btn" href={torstenRegistrationUrl} target="_blank" rel="noopener noreferrer">講習に申し込む <ArrowRight size={18}/></a>
    <a className="tc-check-link" href="/ja/events/torsten-loibl-online-clinic">講習の内容を先に確認する →</a>
    <div className="tc-check-footerBtns"><button type="button" onClick={()=>{setAnswers(Array(5).fill(null));setResult(false);setCopied(false)}}><RotateCcw size={15}/>もう一度振り返る</button><button type="button" onClick={async()=>{const text="【指導者向け無料チェック】あなたのシュート練習は試合につながっているか。5つの問いから練習を見直すRBAの2分チェック。 https://riotbasketballacademy.com/ja/coach/shooting-check";try{if(navigator.share){await navigator.share({text})}else{await navigator.clipboard.writeText(text);setCopied(true)}}catch{}}}><Share2 size={15}/>{copied?"コピーしました":"同僚に共有する"}</button></div>
   </section>}
   <footer className="tc-check-siteFooter"><a href="/ja/coaches">← RBAの指導者向け活動</a><small>© Riot Basketball Academy</small></footer>
  </main>
 </div>;
}
