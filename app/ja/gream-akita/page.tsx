import type { Metadata } from "next";
import { GreamAnnualPlan } from "@/components/gream-annual-plan";
import { ShizugawaCampReport } from "@/components/shizugawa-camp-report";
import { GreamRegionalPage } from "@/components/gream-regional-page";
const pageUrl="https://riotbasketballacademy.com/ja/gream-akita";
const trialFormUrl = "https://form.jotform.com/263100516738049";
const officialResultsUrl = "https://akita.pba-japanbasketball.jp/u15/game/8314/";
const tournamentMatches = [
  { round: "1回戦", opponent: "YOKOTE CLUB", scored: 69, conceded: 61 },
  { round: "2回戦", opponent: "AKITA ELAN", scored: 86, conceded: 45 },
  { round: "3回戦", opponent: "NORTH UNITED LEO", scored: 71, conceded: 54 },
  { round: "準決勝", opponent: "秋田ノーザンハピネッツU15", scored: 74, conceded: 73 },
  { round: "決勝", opponent: "RCSクラブ", scored: 45, conceded: 89 },
] as const;
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
 actions={[{label:"秋田の練習体験を申し込む",href:trialFormUrl,primary:true},{label:"年間計画・遠征費を見る",href:"#annual-plan-2027"},{label:"活動について問い合わせる",href:"/ja/contact"},{label:"企業・お店としてDSM GREAMを支える",href:"/ja/gream/support"},{label:"GREAM全国のチームを見る",href:"/ja/gream"}]}
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
  {question:"体験・入団の申し込みはできますか？",answer:"練習体験は、保護者の方から秋田専用フォームでお申し込みいただけます。送信後に日程や参加条件をご案内します。"},
  {question:"チーム登録や大会参加は決まっていますか？",answer:"2026年度の秋田県U15選手権大会の結果は、このページの大会結果をご覧ください。2027年度の参加候補は年間活動計画でご覧いただけます。"}
 ]}
 note="チーム登録・運営主体・練習施設・参加費等の条件は、現地側と確認してから正式案内します。企業協賛も相談段階では料金・契約・決済は発生しません。"
 otherRegionHref="/ja/gream-sendai"
 >
  <section id="akita-u15-results-2026" aria-labelledby="akita-u15-results-heading" style={{ background: "#f4f6f7", borderBottom: "1px solid #dce2e4", padding: "clamp(40px,6vw,76px) max(20px,6vw)" }}>
    <div style={{ maxWidth: 1120, margin: "0 auto" }}>
      <p style={{ color: "#526169", fontSize: 12, fontWeight: 900, letterSpacing: 2, margin: "0 0 12px" }}>
        GAME RESULTS / JR. WINTER CUP AKITA QUALIFIER
      </p>
      <h2 id="akita-u15-results-heading" style={{ fontSize: "clamp(27px,4.5vw,49px)", letterSpacing: "-.04em", lineHeight: 1.25, margin: "0 0 14px" }}>
        秋田県U15選手権 男子準優勝
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.85, margin: "0 0 16px" }}>
        2026年10月31日・11月1日・3日に三種町で開催された、第7回秋田県U15バスケットボール選手権大会（Jr.ウインターカップ2026-27秋田県予選）で、DSM GREAMが男子準優勝しました。準決勝では秋田ノーザンハピネッツU15に1点差で勝利し、決勝に進みました。
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.8, margin: "0 0 22px" }}>
        選手たちに声援を送ってくださった皆さま、ありがとうございました。
      </p>
      <table style={{ width: "100%", maxWidth: 790, borderCollapse: "collapse", fontSize: "clamp(13px,2vw,16px)", textAlign: "left", background: "#fff" }}>
        <caption style={{ textAlign: "left", fontWeight: 800, paddingBottom: 9 }}>DSM GREAMの全5試合（スコアはDSM GREAMを先に表記）</caption>
        <thead style={{ background: "#172026", color: "#fff" }}>
          <tr>
            <th scope="col" style={{ padding: "11px 9px", whiteSpace: "nowrap" }}>ラウンド</th>
            <th scope="col" style={{ padding: "11px 9px" }}>対戦相手</th>
            <th scope="col" style={{ padding: "11px 9px", whiteSpace: "nowrap" }}>スコア</th>
          </tr>
        </thead>
        <tbody>
          {tournamentMatches.map(({ round, opponent, scored, conceded }) => (
            <tr key={round} style={{ borderBottom: "1px solid #dce2e4" }}>
              <th scope="row" style={{ padding: "11px 9px", whiteSpace: "nowrap" }}>{round}</th>
              <td style={{ padding: "11px 9px", overflowWrap: "anywhere" }}>{opponent}</td>
              <td style={{ padding: "11px 9px", whiteSpace: "nowrap", fontWeight: 850 }}>{scored}–{conceded}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ margin: "18px 0 0" }}>
        <a href={officialResultsUrl} style={{ fontWeight: 800, textDecoration: "underline", textUnderlineOffset: 4 }}>秋田県バスケットボール協会の公式結果を見る →</a>
      </p>
    </div>
  </section>
  <GreamAnnualPlan team="akita" />
  <section id="akita-u15-results-2025" aria-labelledby="akita-u15-results-2025-heading" style={{ background: "#fff", borderBottom: "1px solid #dce2e4", padding: "clamp(38px,5vw,62px) max(20px,6vw)" }}>
    <div style={{ maxWidth: 1120, margin: "0 auto" }}>
      <p style={{ color: "#526169", fontSize: 12, fontWeight: 900, letterSpacing: 2, margin: "0 0 10px" }}>2025 SEASON / RESULTS ARCHIVE</p>
      <h2 id="akita-u15-results-2025-heading" style={{ fontSize: "clamp(26px,4vw,43px)", margin: "0 0 14px" }}>2025年度 男子の試合結果</h2>
      <p style={{ lineHeight: 1.85 }}>第6回秋田県U15バスケットボール選手権大会（Jr.ウインターカップ2025-26秋田県予選）。公式記録の出場名は「D.S.Mユースバスケットボールクラブ」です。</p>
      <p style={{ lineHeight: 1.85 }}><time dateTime="2025-11-02">11月2日</time>・ナイスアリーナ｜男子1回戦 <strong>D.S.M 56–66 Limitless Possibility Club</strong></p>
      <p style={{ lineHeight: 1.85 }}>2025年度の県U14・U15リーグについて、県協会の公開案内では個別のスコアを確認できていません。招待大会・交流戦も含め、記録を確認できた試合から追記します。</p>
      <p style={{ lineHeight: 1.85 }}><a href="https://akita.pba-japanbasketball.jp/wp-content/uploads/2025/11/2025u15_result_boys_day1.pdf" style={{ textDecoration: "underline", fontWeight: 750 }}>県選手権の公式試合記録（PDF）↗</a>　<a href="https://akita.pba-japanbasketball.jp/u15/news/7682/" style={{ textDecoration: "underline", fontWeight: 750 }}>2025年度県リーグ公式案内 ↗</a></p>
    </div>
  </section>
  <ShizugawaCampReport team="akita" />
 </GreamRegionalPage>;}
