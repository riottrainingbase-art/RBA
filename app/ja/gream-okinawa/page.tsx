import type { Metadata } from "next";
import { GreamRegionalPage } from "@/components/gream-regional-page";
const pageUrl="https://riotbasketballacademy.com/ja/gream-okinawa";
export const metadata:Metadata={
 title:"GREAM沖縄 U15｜育成チーム・活動案内・コーチ協力｜RBA",
 description:"GREAM沖縄U15育成チームプロジェクト。育成方針、運営体制の調整状況、現在の活動案内、保護者・指導者の相談窓口。",
 alternates:{canonical:pageUrl},
 openGraph:{title:"GREAM OKINAWA U15｜育成チーム",description:"沖縄のU15育成チーム。既存の活動案内と新体制準備を分け、保護者が確認できる情報を整理。",url:pageUrl,siteName:"Riot Basketball Academy",type:"website"}
};
export default function Page(){return <GreamRegionalPage
 location="OKINAWA" japanese="GREAM沖縄" subtitle="沖縄で、続けられる育成の環境を。"
 introduction="GREAM沖縄はU15年代の育成チームプロジェクトです。競技経験や立場の違いを超え、選手が判断し成長できる環境づくりを目指します。現在の活動情報と新たな運営体制づくりは、混同しないよう分けてご案内します。"
 stage="新たな指導・運営体制を整備中"
 stageExplanation="新しい定期活動の曜日・会場・料金・体験日・募集開始は確定していません。既存会員の活動を一律に休止していると示すものでもありません。参加の可否やチーム登録については個別の正式案内をご確認ください。"
 facts={[
  {label:"カテゴリー",value:"U15年代"},
  {label:"地域",value:"沖縄県（詳細は活動ごとに確認）"},
  {label:"指導・安全管理",value:"新体制の確定情報を準備中"},
  {label:"日時・会費・募集",value:"未確定・正式案内待ち"}
 ]}
 actions={[
  {label:"現在の沖縄活動・会員向け案内",href:"/ja/okinawa",primary:true},
  {label:"指導者・会場協力を相談",href:"/ja/okinawa-coach"},
  {label:"保護者から問い合わせる",href:"/ja/contact"}
 ]}
 focuses={[
  {en:"SEE",ja:"見る",description:"ディフェンス・味方・スペースを認知する。"},
  {en:"DECIDE",ja:"判断する",description:"状況に応じたパス・ドライブ・シュートを選ぶ。"},
  {en:"ACT",ja:"実行する",description:"学んだ技術を対人の状況やゲームで使う。"},
  {en:"REFLECT",ja:"振り返る",description:"経験を言語化し、次の課題を見つける。"}
 ]}
 faqs={[
  {question:"今すぐ入団・体験できますか？",answer:"新しい体験会・チーム受け入れの確定日時はまだ公開していません。現在の会員向け情報は沖縄の活動ページで確認できます。新規の参加相談も可能ですが、相談のみで参加・入団・決済は確定しません。"},
  {question:"男女どちらも対象ですか？",answer:"対象カテゴリーはU15です。男女別の募集枠や実際の受け入れ体制は現地の正式案内で確認してください。"},
  {question:"練習会場やスタッフは決まっていますか？",answer:"新体制に向けて指導者・会場・安全管理の確認を進めています。正式に確認できていないスタッフ名・会場名・曜日は確定事項として掲載しません。"},
  {question:"GREAM仙台と同じ料金・練習日ですか？",answer:"いいえ。各地域の運営・料金・募集条件は独立して確認します。仙台の会費や活動日を沖縄へ自動適用しません。"},
  {question:"指導者として協力したい場合は？",answer:"沖縄のコーチ・地域協力の相談ページからご連絡ください。応募だけで採用や契約が成立することはありません。"}
 ]}
 note="公開情報はRBAが確認できる範囲を記載しています。新規募集、会場利用許可、資格、入金状態などが未確認の項目について推測した案内は行いません。"
 otherRegionHref="/ja/gream-sendai"
 />;}
