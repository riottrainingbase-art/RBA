"use client";

import { useState } from "react";

const landing="https://riotbasketballacademy.com/backbone/chiba";
const channels=[
 {id:"instagram",label:"Instagramストーリー",url:landing+"?utm_source=instagram&utm_medium=story&utm_campaign=backbone_chiba_20261025",text:"10/25（日）千葉県神崎町でBACKBONE 3×3。午前クリニック→午後ゲーム。小1〜中3、個人参加歓迎、6,600円（税込）。詳しくはリンクから。"},
 {id:"line",label:"LINE・保護者グループ",url:landing+"?utm_source=line&utm_medium=share&utm_campaign=backbone_chiba_20261025",text:"10/25（日）千葉県神崎町でBACKBONE 3×3を開催します。午前は育成クリニック、午後は3x3ゲーム。小学1年生〜中学3年生対象、チームは当日編成するので一人での参加も歓迎です。参加費6,600円（税込）。参加条件・募集状況は公式案内をご確認ください。"},
 {id:"partner",label:"地域クラブ・指導者への紹介",url:landing+"?utm_source=partner&utm_medium=referral&utm_campaign=backbone_chiba_20261025",text:"10月25日（日）に千葉県神崎町で、育成クリニックと3x3ゲームを組み合わせたBACKBONEを開催します。対象は小1〜中3、個人参加も歓迎です。ご関心のあるご家庭がいらっしゃれば、こちらの公式案内をご紹介いただけると助かります。ご負担になるようでしたらもちろん大丈夫です。"},
];
export function BackboneShareKit(){
 const [copied,setCopied]=useState("");
 async function copy(value:string,id:string){
  try{await navigator.clipboard.writeText(value);setCopied(id);}catch{setCopied("error");}
 }
 return <div className="bb-share-kit">
  {channels.map(ch=><article key={ch.id} className="bb-share-card">
   <h2>{ch.label}</h2>
   <p>{ch.text}</p>
   <p className="bb-share-url">{ch.url}</p>
   <button type="button" onClick={()=>copy(ch.text+"\n"+ch.url,ch.id)} className="bb-action">{copied===ch.id?"コピーしました ✓":"案内文とURLをコピー"}</button>
  </article>)}
  {copied==="error"?<p role="status">コピーできませんでした。案内文を選択してコピーしてください。</p>:null}
 </div>;
}
