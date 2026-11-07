import type { Metadata } from "next";
import { GreamRegionalPage } from "@/components/gream-regional-page";
const pageUrl="https://riotbasketballacademy.com/ja/gream-akita";
export const metadata:Metadata={
 title:"GREAM秋田 U15｜秋田の育成連携・活動案内｜RBA",
 description:"GREAM秋田のU15育成連携を紹介。DSMとの地域協力や育成方針、活動・募集条件の確認状況を整理しています。",
 alternates:{canonical:pageUrl},
 openGraph:{title:"GREAM AKITA U15｜地域育成連携",description:"秋田のU15育成連携。活動条件と募集状況は確認できた内容をもとにご案内します。",url:pageUrl,siteName:"Riot Basketball Academy",type:"website"}
};
export default function Page(){return <GreamRegionalPage
 location="AKITA" japanese="GREAM秋田" subtitle="秋田から、次のカテゴリーへ。"
 introduction="GREAM秋田は、DSMとのU15育成連携を紹介する地域ページです。仙台のGREAMと同じ料金・運営・申込条件を自動的に適用するものではありません。正式な運営主体・登録・活動条件は、地域側の確認を踏まえて更新します。"
 stage="活動・募集条件を確認中"
 stageExplanation="このページは秋田地域のU15育成連携の案内です。具体的な募集開始・練習曜日・会場・月会費・定員は確認できていないため、ここでは確定表示しません。"
 facts={[
  {label:"カテゴリー",value:"U15年代"},
  {label:"地域・協力",value:"秋田／DSMとの育成連携"},
  {label:"練習会場・曜日",value:"要確認"},
  {label:"募集・料金・登録条件",value:"要確認"}
 ]}
 actions={[{label:"秋田での活動状況を問い合わせる",href:"/ja/contact",primary:true},{label:"RBAの育成方針",href:"/ja/approach"}]}
 focuses={[
  {en:"FUNDAMENTALS",ja:"基礎をつくる",description:"ゲームにつながる身体操作・ボール技術を育てる。"},
  {en:"PERCEPTION",ja:"状況を読む",description:"攻守の情報に気づく習慣を身につける。"},
  {en:"DECISION",ja:"自分で選ぶ",description:"1対1から少人数ゲームの判断力を伸ばす。"},
  {en:"DEVELOPMENT",ja:"次へつなぐ",description:"U15年代の成長とその先の競技環境を考える。"}
 ]}
 faqs={[
  {question:"GREAM秋田はRBA直営のチームですか？",answer:"このページはDSMとの地域育成連携を紹介するものです。正式な運営・登録主体や契約関係は確認前のため、RBA直営や一律の運営形態を断定しません。"},
  {question:"どこで、いつ練習しますか？",answer:"正式な会場・曜日・時間は要確認です。現地の確定情報が整ってから公開します。"},
  {question:"月会費はいくらですか？",answer:"秋田の会費は未確認です。仙台の会費を秋田に当てはめず、決定した金額と支払手順を別途ご案内します。"},
  {question:"体験・入団の申し込みはできますか？",answer:"相談はお問い合わせフォームから可能です。送信だけで体験枠・入団資格・支払いが確定することはありません。"},
  {question:"チーム登録や大会参加は決まっていますか？",answer:"正式なチーム登録や大会予定について、現時点では確認済み情報を掲載できません。確定後に案内します。"}
 ]}
 note="チーム登録・運営主体・練習施設・参加費・募集開始について未確認の事項は保証していません。正式条件を知りたい方は個別にお問い合わせください。"
 otherRegionHref="/ja/gream-sendai"
 />;}
