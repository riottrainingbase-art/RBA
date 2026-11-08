import type { Metadata } from "next";
import { ShizugawaCampReport } from "@/components/shizugawa-camp-report";
import { GreamRegionalPage } from "@/components/gream-regional-page";
const pageUrl="https://riotbasketballacademy.com/ja/gream-akita";
export const metadata:Metadata={
 title:"DSM GREAM AKITA｜大仙・仙北・美郷の男子U15育成｜RBA",
 description:"DSM GREAM AKITAは秋田県大仙・仙北・美郷地域の男子U15育成プロジェクト。高橋雄作HCとRBAの育成連携、活動相談・企業協賛の入口をご案内します。",
 alternates:{canonical:pageUrl},
 openGraph:{title:"DSM GREAM AKITA｜男子U15育成",description:"大仙・仙北・美郷から、考え続けるU15育成へ。DSM GREAMの活動・協賛窓口。",url:pageUrl,siteName:"Riot Basketball Academy",type:"website"}
};
export default function Page(){return <GreamRegionalPage
 location="AKITA" japanese="DSM GREAM AKITA" subtitle="秋田から、次の一歩へ。"
 introduction="DSM GREAMは、大仙・仙北・美郷地域の男子U15育成プロジェクトです。高橋雄作HCとRBA代表・西尾優人（アドバイザー）のもと、ゲームで自分で考えて判断できる選手の成長を支えます。仙台とは異なる地域運営のため、正式な募集・参加費・練習会場は現地確認後にご案内します。"
 stage="男子U15｜体験・活動の相談"
 stageExplanation="男子U15の活動・体験相談についてRBA窓口で確認できます。練習曜日・場所・月会費・定員などの未確認事項は、確定情報を受け取ってから案内します。送信だけで入団・支払いは確定しません。"
 facts={[
  {label:"カテゴリー",value:"男子U15育成"},
  {label:"活動エリア",value:"大仙・仙北・美郷"},
  {label:"ヘッドコーチ",value:"高橋 雄作"},
  {label:"RBAアドバイザー",value:"西尾 優人"},
  {label:"練習会場・曜日",value:"要確認"},
  {label:"募集・料金・登録条件",value:"正式案内時に確認"}
 ]}
 actions={[{label:"秋田の参加・体験を問い合わせる",href:"/ja/contact",primary:true},{label:"企業・お店としてDSM GREAMを支える",href:"/ja/gream/support"},{label:"GREAM全国のチームを見る",href:"/ja/gream"}]}
 focuses={[
  {en:"FUNDAMENTALS",ja:"基礎をつくる",description:"ゲームにつながる身体操作・ボール技術を育てる。"},
  {en:"PERCEPTION",ja:"状況を読む",description:"攻守の情報に気づく習慣を身につける。"},
  {en:"DECISION",ja:"自分で選ぶ",description:"1対1から少人数ゲームの判断力を伸ばす。"},
  {en:"DEVELOPMENT",ja:"次へつなぐ",description:"U15年代の成長とその先の競技環境を考える。"}
 ]}
 faqs={[
  {question:"DSM GREAMはRBA直営のチームですか？",answer:"RBAはDSMとの育成連携を行います。地域の登録・運営・協賛契約の主体は確認中で、RBA直営と断定するものではありません。"},
  {question:"どこで、いつ練習しますか？",answer:"正式な会場・曜日・時間は要確認です。現地の確定情報が整ってから公開します。"},
  {question:"月会費はいくらですか？",answer:"秋田の会費は未確認です。仙台の会費を秋田に当てはめず、決定した金額と支払手順を別途ご案内します。"},
  {question:"体験・入団の申し込みはできますか？",answer:"相談はお問い合わせフォームから可能です。送信だけで体験枠・入団資格・支払いが確定することはありません。"},
  {question:"チーム登録や大会参加は決まっていますか？",answer:"正式なチーム登録や大会予定について、現時点では確認済み情報を掲載できません。確定後に案内します。"}
 ]}
 note="チーム登録・運営主体・練習施設・参加費等の条件は、現地側と確認してから正式案内します。企業協賛も相談段階では料金・契約・決済は発生しません。"
 otherRegionHref="/ja/gream-sendai"
 >
  <ShizugawaCampReport team="akita" />
 </GreamRegionalPage>;}
