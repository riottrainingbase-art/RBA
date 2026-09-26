"use client";

import { useState } from "react";
import type { Locale } from "./site-frame";
import styles from "./member-journey.module.css";

type Audience = "player" | "parent" | "coach";
const content = {
  ja: {
    title: "あの日の経験を、次の挑戦へ。", intro: "クリニックでつかんだ感覚や、仲間とのプレーで見つけた課題。今日の気づきを振り返りながら、次に挑戦したいことを見つけましょう。",
    audience: "知りたい情報を選ぶ", roles: {player:"選手",parent:"保護者",coach:"コーチ・指導者"},
    clinic:"次のクリニックを探す", clinicBody:"開催地・対象年代・日程を確認して、自分に合う活動を見つけましょう。",
    learn:["プレーのヒント","子どもの挑戦を支える","指導を学び直す"], learnBody:["次の練習で取り組むことを、一つ決めるところから始めます。","結果だけでなく、本人が選んだことや挑戦したことにも目を向けてみましょう。","D-HUBのプログラムを通して、練習設計や選手との関わり方を考えます。"],
    projects:"活動の幅を広げる", projectLabels:["RBA UNITED・交流活動","国内外の交流を相談する","地域でクリニックを開催する"],
    review:"今日の振り返り", questions:["何に取り組みましたか？","気づいたこと・できるようになったことは？","次に試してみたいことは？"],
    privacy:"このメモはアカウントに保存されません。ページを離れる前にダウンロードしてください。ほかの人の個人情報は書かないでください。", download:"メモをダウンロード", downloaded:"ダウンロードを開始しました。ファイルを確認してください。", failed:"ダウンロードできませんでした。メモをコピーして保管してください。", support:"参加履歴の確認・お問い合わせ", supportBody:"以前の参加記録が見つからない場合は、参加した日付・会場を添えてご相談ください。", payments:"申込・お支払いの案内", policies:"参加規約・安全方針",
  },
  en: {
    title:"Turn your experience into a next step.",intro:"You do not need to belong to a team. Find an activity, reflect on practice and explore resources that fit you.",audience:"Choose your interests",roles:{player:"Player",parent:"Parent",coach:"Coach"},clinic:"Find your next clinic",clinicBody:"Check locations, age groups and dates to find an activity that fits.",learn:["Ideas for your game","Support your child","Develop your coaching"],learnBody:["Choose one thing to work on at your next practice.","Notice the choices and challenges your child takes on, as well as results.","Explore D-HUB programmes to reflect on practice design and your work with players."],projects:"Explore more opportunities",projectLabels:["RBA UNITED and exchange","Ask about exchange opportunities","Host a local clinic"],review:"Reflect on today",questions:["What did you work on?","What did you notice or learn?","What would you like to try next?"],privacy:"This note is not saved to your account. Download it before leaving this page. Do not include other people's personal information.",download:"Download your note",downloaded:"Download started. Please check your files.",failed:"Download failed. Copy your note to keep it.",support:"Help with past participation and other questions",supportBody:"If a past record is missing, contact us with the date and venue of your activity.",payments:"Registration and payment information",policies:"Participation and safety policies",
  },
  "zh-tw": {
    title:"把這次的經驗，帶進下一次練習。",intro:"不需要加入球隊也能使用。尋找活動、回顧練習，從適合自己的內容開始。",audience:"選擇想看的資訊",roles:{player:"球員",parent:"家長",coach:"教練"},clinic:"尋找下一場訓練營",clinicBody:"查看地點、適合年齡與日期，找到適合自己的活動。",learn:["球員練習指南","支持孩子的挑戰","持續精進指導"],learnBody:["先選一件下次練習想嘗試的事。","除了結果，也關注孩子自己的選擇與嘗試。","透過D-HUB課程，思考訓練設計與引導球員的方法。"],projects:"探索更多活動",projectLabels:["RBA UNITED與交流活動","洽詢國內外交流","在當地舉辦訓練營"],review:"今天的回顧",questions:["今天練習了什麼？","有什麼發現或進步？","下次想嘗試什麼？"],privacy:"這份筆記不會儲存至帳戶。離開頁面前請先下載，並避免填入他人的個人資料。",download:"下載筆記",downloaded:"已開始下載，請查看檔案。",failed:"下載失敗，請複製筆記以保留內容。",support:"查詢過去參加紀錄與其他問題",supportBody:"找不到過去的紀錄時，請提供活動日期與地點，聯絡我們協助確認。",payments:"報名與付款說明",policies:"參加規範與安全方針",
  },
  ko: {
    title:"오늘의 경험을 다음 도전으로.",intro:"팀에 소속되지 않아도 이용할 수 있습니다. 다음 활동을 찾고, 훈련을 돌아보며 자신에게 맞는 정보부터 살펴보세요.",audience:"관심 정보 선택",roles:{player:"선수",parent:"보호자",coach:"코치·지도자"},clinic:"다음 클리닉 찾기",clinicBody:"지역, 대상 연령, 일정을 확인하고 자신에게 맞는 활동을 찾아보세요.",learn:["선수를 위한 연습 안내","아이의 도전 지원하기","지도 역량 키우기"],learnBody:["다음 훈련에서 시도할 한 가지를 정해 보세요.","결과뿐 아니라 아이가 선택하고 도전한 과정에도 관심을 가져보세요.","D-HUB 프로그램을 통해 훈련 설계와 선수 지도 방법을 살펴보세요."],projects:"더 넓은 활동 만나기",projectLabels:["RBA UNITED와 교류 활동","국내외 교류 문의","지역 클리닉 개최"],review:"오늘의 돌아보기",questions:["무엇을 연습했나요?","새롭게 알게 되거나 할 수 있게 된 것은?","다음에 시도하고 싶은 것은?"],privacy:"메모는 계정에 저장되지 않습니다. 페이지를 떠나기 전에 다운로드하세요. 다른 사람의 개인정보는 작성하지 마세요.",download:"메모 다운로드",downloaded:"다운로드를 시작했습니다. 파일을 확인하세요.",failed:"다운로드하지 못했습니다. 메모를 복사하여 보관하세요.",support:"이전 참가 기록 확인 및 문의",supportBody:"이전 기록이 보이지 않으면 참가 날짜와 장소를 적어 문의해 주세요.",payments:"신청·결제 안내",policies:"참가 규정·안전 방침",
  },
} as const;

/** Public resources only. Audience selection never grants data access or changes account roles. */
export function MemberJourney({locale,initialAudience="player"}:{locale:Locale;initialAudience?:Audience}) {
  const c=content[locale];
  const [audience,setAudience]=useState<Audience>(initialAudience);
  const [notes,setNotes]=useState(["","",""]);
  const [status,setStatus]=useState("");
  const prefix=locale==="en"?"":`/${locale}`;
  const index=audience==="player"?0:audience==="parent"?1:2;
  function download(){
    let url:string|undefined;
    try {
      const body=[c.review,...c.questions.map((q,i)=>`${q}\n${notes[i].trim()}`)].join("\n\n");
      url=URL.createObjectURL(new Blob(["\uFEFF",body],{type:"text/plain;charset=utf-8"}));
      const link=document.createElement("a");link.href=url;link.download="rba-reflection.txt";document.body.appendChild(link);link.click();link.remove();setStatus(c.downloaded);
    }catch{setStatus(c.failed);}
    finally{if(url){const objectUrl=url;window.setTimeout(()=>URL.revokeObjectURL(objectUrl),1000);}}
  }
  return <section className={styles.journey} aria-labelledby="member-journey-title">
    <h2 id="member-journey-title">{c.title}</h2><p>{c.intro}</p>
    <div className={styles.audiences} role="group" aria-label={c.audience}>{(["player","parent","coach"] as const).map(role=><button type="button" key={role} aria-pressed={audience===role} onClick={()=>setAudience(role)}>{c.roles[role]}</button>)}</div>
    <div className={styles.cards}>
      <a href={`${prefix}/schedule`}><h3>{c.clinic}</h3><p>{c.clinicBody}</p></a>
      <a href={`${prefix}/${["players","families","d-hub"][index]}`}><h3>{c.learn[index]}</h3><p>{c.learnBody[index]}</p></a>
    </div>
    <details className={styles.reflection}><summary>{c.review}</summary>
      <p id="reflection-privacy">{c.privacy}</p>
      {c.questions.map((question,i)=><label key={question}>{question}<textarea value={notes[i]} maxLength={2000} rows={3} aria-describedby="reflection-privacy" onChange={e=>{setNotes(current=>current.map((note,n)=>n===i?e.target.value:note));setStatus("");}}/></label>)}
      <button type="button" disabled={!notes.some(n=>n.trim())} onClick={download}>{c.download}</button><p role="status">{status}</p>
    </details>
    <h3>{c.projects}</h3><ul className={styles.links}>{["united","connect","clinic-request"].map((path,i)=><li key={path}><a href={`${prefix}/${path}`}>{c.projectLabels[i]} <span aria-hidden="true">→</span></a></li>)}</ul>
    <div className={styles.help}><h3><a href={`${prefix}/contact`}>{c.support}</a></h3><p>{c.supportBody}</p><a href={`${prefix}/payments`}>{c.payments}</a><a href={`${prefix}/policies`}>{c.policies}</a></div>
  </section>;
}
