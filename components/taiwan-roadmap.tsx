import Link from "next/link";
import Image from "next/image";
import {SiteFrame} from "./site-frame";
import "./taiwan-official.css";

type Language = "ja" | "zh-tw";
const jp = {
 title:"台湾で、子どもたちの育ち方に新しい選択肢を。",
 intro:"私たちは、今ある指導や制度を一方的に否定するのではなく、選手一人ひとりが考え、挑戦し、長くバスケットボールを楽しめる環境を、台湾の仲間と一緒につくりたいと考えています。",
 premise:"出発点は、現場の声を聴くこと。",
 caveat:"台湾の育成環境には、地域や学校、クラブによって違いがあります。リーグの状況や体育班の役割についても、単一の原因で説明できるものではありません。この計画は、現地の選手・保護者・指導者の声を聞き、課題を確かめながら改善するための提案です。",
 principles:"活動の共通原則",
 steps:"実行ロードマップ",
 model:"続けられる事業にするために",
 measure:"成果を、どう確かめるか",
 governance:"RBAと現地パートナーの役割",
 status:"今、決まっていること・これから決めること",
 join:"この計画に関わる",
};
const zh = {
 title:"讓台灣孩子，有更多適合自己的籃球成長選擇。",
 intro:"我們並不是要否定現有的學校或球隊制度，而是希望與台灣的夥伴一起，打造讓孩子敢於思考、嘗試，並長期享受籃球的學習環境。",
 premise:"從傾聽第一線的聲音開始。",
 caveat:"台灣不同地區、學校與俱樂部的培育環境各有差異。職業聯盟、體育班制度與國際賽事表現，也不能簡化成單一因果。本計畫希望先了解球員、家長與教練的實際經驗，再逐步驗證與改善。",
 principles:"共同遵守的培育原則",
 steps:"推動路線圖",
 model:"如何建立可持續的運作模式",
 measure:"如何評估成果",
 governance:"RBA與在地夥伴的分工",
 status:"已確認與待討論事項",
 join:"參與計畫",
};
const valuesJa=[
 ["子どもの主体性","答えを教える前に、見る・考える・選ぶ機会をつくる。"],
 ["経験機会を大切に","早い段階で一部の選手だけを選別せず、出場・挑戦・失敗から学べる場を増やす。"],
 ["指導者も学び続ける","声かけや練習の設計を見直し、子どもへの敬意と安全を指導の基準にする。"],
 ["地域の文化を尊重","台湾の学校、クラブ、保護者、指導者の経験に学び、外から正解を押しつけない。"],
 ["安全と透明性","年齢に合った負荷、休養、けが予防、保護者の同意、相談・苦情の窓口を整える。"],
 ["成果を公開して改善","満足度だけでなく参加機会や継続率、現場での変化を記録し、改善につなげる。"],
];
const valuesZh=[
 ["尊重孩子的自主性","先提供觀察、思考與選擇的機會，而不是直接給出所有答案。"],
 ["重視每位孩子的參與","避免過早只選擇少數球員，增加上場、嘗試與從失誤中學習的機會。"],
 ["教練也要持續學習","反思教學語言與課程設計，以尊重孩子及安全為共同標準。"],
 ["尊重在地文化","向台灣的學校、俱樂部、家長與教練學習，而不是從外部強加標準答案。"],
 ["安全與透明","建立適齡負荷、休息、傷害預防、家長同意及意見反映機制。"],
 ["用成果持續改善","記錄參與機會、持續參與率與現場改變，不只看滿意度。"],
];
const stagesJa=[
 ["01 / 0–3か月","聴く・確かめる","台北・新北の保護者、指導者、学校・クラブにヒアリング。年齢別のニーズ、時間・費用・移動の壁、既存活動の強みを整理。","成果物：現場ヒアリング記録／ニーズ整理／安全・法務確認表"],
 ["02 / 3–6か月","小さく試す","現地パートナーとの役割分担が整えば、少人数の体験会とコーチ勉強会を試行。子どもの安全、保険、会場、指導者の資格等を事前確認。","成果物：試行プログラム／参加者アンケート／現場の振り返り"],
 ["03 / 6–12か月","改善して続ける","継続クラス、指導者研修、日台オンライン交流を検討。実施費用と参加者負担を把握し、無理のない運営モデルを検証。","成果物：共通指導ガイド／収支実績／改善レポート"],
 ["04 / 12か月以降","地域へ広げる","試行結果を公開できる範囲で共有。希望する学校・クラブと協働し、台湾のほかの地域への展開を判断。","成果物：協働先向け導入資料／年間評価報告"],
];
const stagesZh=[
 ["01 / 0–3個月","先傾聽、再確認","訪談台北、新北的家長、教練、學校與俱樂部；了解不同年齡的需求、費用、交通與現有制度的優點。","階段成果：訪談紀錄／需求整理／安全及法規清單"],
 ["02 / 3–6個月","小規模試行","待與在地夥伴確認分工後，嘗試小型體驗課與教練交流。事前確認兒少安全、保險、場地及教練資格等事項。","階段成果：試行課程／問卷／現場檢討"],
 ["03 / 6–12個月","改善並持續運作","評估定期課程、教練培訓及台日線上交流。記錄成本與家庭負擔，檢驗長期營運的可行性。","階段成果：教學指引／收支紀錄／改進報告"],
 ["04 / 12個月以後","與其他地區分享","在取得同意的前提下分享試行成果，與有興趣的學校及俱樂部合作，再評估是否拓展至其他縣市。","階段成果：合作說明／年度評估報告"],
];
export function TaiwanRoadmap({locale}:{locale:Language}){
 const t=locale==="ja"?jp:zh, values=locale==="ja"?valuesJa:valuesZh, stages=locale==="ja"?stagesJa:stagesZh;
 const isJa=locale==="ja", form="https://form.jotform.com/262859034372058";
 return <SiteFrame locale={locale} languagePage="taiwan"><div className="rba-taiwan">
  <section className="rba-taiwan-hero"><div className="rba-taiwan-inner">
   <div className="rba-taiwan-top"><p>RBA / JAPAN × TAIWAN</p><nav aria-label="Language"><Link href="/ja/taiwan/roadmap" aria-current={isJa?"page":undefined}>日本語</Link><Link href="/zh-tw/taiwan/roadmap" aria-current={!isJa?"page":undefined}>繁體中文</Link></nav></div>
   <div className="rba-taiwan-partner"><Image src="/rba-logo-original.jpg" width={56} height={78} alt="RBA official logo" className="rba-taiwan-brand-mark"/><div className="rba-taiwan-partner-wordmark"><span>RIOT BASKETBALL ACADEMY</span><span className="rba-taiwan-times">×</span><span>TAIWAN DEVELOPMENT ROADMAP</span></div></div>
   <h1>{t.title}</h1><p className="rba-taiwan-lead">{t.intro}</p>
   <p className="rba-taiwan-credit">ROADMAP / WORKING PLAN · {isJa?"2026年10月版・検証しながら更新":"2026年10月版・持續檢證與更新"}</p>
   <a className="rba-taiwan-btn" href="#roadmap">{isJa?"ロードマップを見る":"查看推動路線圖"} ↓</a>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">01 / OUR STARTING POINT</p><h2>{t.premise}</h2><p className="rba-taiwan-intro">{t.caveat}</p>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">2026 / TAIWAN MARKET INTELLIGENCE</p>
   <h2>{isJa?"台湾の育成市場を知る。競争よりも、違いと需要を理解する。":"先了解台灣的青少年籃球市場，再決定如何創造價值。"}</h2>
   <p className="rba-taiwan-intro">{isJa?"公開されている2026年の料金・事業内容をもとに比較しました。台湾全体の市場規模やシェアを示すものではありません。料金は事業者・時期・会場で変わるため、参入価格の決定には別途検証が必要です。":"以下整理2026年公開的課程內容與價格，並非全台市場規模或市占率調查。價格依場地與方案而異，正式定價前仍須進一步驗證。"}</p>
   <div className="rba-taiwan-cards">
    <article><span>EMPOWER / CLUB</span><h3>{isJa?"継続型の育成クラブ":"長期培育俱樂部"}</h3><p>{isJa?"公開料金は月4回 NT$3,400〜5,000。女子向けクラブも展開しています。月謝型・女子育成はすでに競争と需要がある市場です。":"公開方案為每月四堂 NT$3,400–5,000，並設有女子俱樂部。固定課程與女子培育已有市場參與者。"}</p><a href="https://www.empower.com.tw/camp/empowerspark/" target="_blank" rel="noopener noreferrer">EMPOWER 2026 ↗</a></article>
    <article><span>SPARTANS / SMALL GROUP</span><h3>{isJa?"判断力を重視する少人数指導":"重視決策的小班教學"}</h3><p>{isJa?"天母の公開プログラムは1回 NT$1,150、10回 NT$9,500。CLAと英語を使った指導を提供しています。主体性や国際性は差別化の独占領域ではありません。":"天母公開課程單堂 NT$1,150、十堂 NT$9,500，強調CLA與英語教學。自主性及國際視野並非無人提供的領域。"}</p><a href="https://spartans.tw/en/tianmu" target="_blank" rel="noopener noreferrer">SPARTANS PROGRAMME ↗</a></article>
    <article><span>EMPOWER / CAMPS</span><h3>{isJa?"広域の短期キャンプ":"跨城市短期營隊"}</h3><p>{isJa?"2026年の夏季キャンプは台北・新北・新竹・台中・台南へ展開。RBAは規模だけを競うより、コーチ育成・指導品質の検証・日台交流を組み合わせた価値を目指します。":"2026夏令營涵蓋台北、新北、新竹、台中及台南。RBA將優先探索教練培育、品質評估與台日交流的整合價值。"}</p><a href="https://www.empower.com.tw/camp/2026-summer/" target="_blank" rel="noopener noreferrer">2026 CAMP ↗</a></article>
   </div>
   <p className="rba-taiwan-small">{isJa?"市場の最大手を名乗るための参加者数・加盟組織数・売上の比較データはまだありません。『台湾で最も広く学び合える育成ネットワークを目指す』ことを長期目標とし、実績は公開できる範囲で定期的に報告します。":"目前尚無可比較的學員、合作組織及營收資料，不能宣稱市場第一。長期願景是建立跨地域、持續互相學習的培育網絡，並定期揭露可核實的成果。"}</p>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">2026 / PRIORITY SEGMENTS & VALIDATION</p>
   <h2>{isJa?"誰に、どんな価値を提供するか。":"優先服務誰？先驗證哪些需求？"}</h2>
   <div className="rba-taiwan-roles">
    <article><strong>{isJa?"国際コミュニティ・家庭":"國際社群與家庭"}</strong><p>{isJa?"日本語・英語・中国語で参加しやすい体験機会。需要は保護者ヒアリングと事前登録で確認し、学校との提携を既成事実にしません。":"透過家長訪談與意向登記確認多語言體驗課的需求；不預先宣稱已與學校合作。"}</p></article>
    <article><strong>{isJa?"指導者・学生":"教練與學生"}</strong><p>{isJa?"現場観察、問いかけ、練習設計を学ぶ機会。18歳以上の関心登録から始め、実務配置前に研修・安全・就労資格を確認します。":"先收集成年人參與意願；正式任教前確認培訓、兒少安全及工作資格。"}</p></article>
    <article><strong>{isJa?"学校・独立クラブ":"學校與獨立俱樂部"}</strong><p>{isJa?"既存の活動を尊重した共同研修や交流。導入の可否は担当者との協議と、選手・保護者の意見で判断します。":"尊重原有團隊運作，共同討論教練研習及交流；是否合作需取得相關單位同意。"}</p></article>
   </div>
   <p className="rba-taiwan-small">{isJa?"事業化の判断条件（計画案）：①関心登録とヒアリングでニーズ確認、②会場・指導者・保険・個人情報管理の確保、③1回の試行で安全・満足度・参加継続意向を確認、④損益分岐と双方の役割分担を文書化してから継続募集へ。":"啟動正式營運前，先確認需求、場地與人員、安全及資料管理；完成小規模試行並建立收支與合作分工紀錄後，再評估擴大。"}</p>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">02 / SHARED PRINCIPLES</p><h2>{t.principles}</h2>
   <div className="rba-taiwan-cards">{values.map(([h,b],i)=><article key={h}><span>{String(i+1).padStart(2,"0")}</span><h3>{h}</h3><p>{b}</p></article>)}</div>
  </div></section>
  <section className="rba-taiwan-section" id="roadmap"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">03 / IMPLEMENTATION</p><h2>{t.steps}</h2>
   <p className="rba-taiwan-intro">{isJa?"以下の期間は事業開始後の目安です。実施日程や開催を確約するものではなく、前の段階の検証ができた場合に次へ進みます。":"以下時程為計畫啟動後的參考階段，並非已確定的活動日期。完成前一階段的評估後，才決定是否進入下一階段。"}</p>
   <div className="rba-taiwan-cards">{stages.map(([step,head,body,outcome])=><article key={step}><span>{step}</span><h3>{head}</h3><p>{body}</p><p style={{fontSize:13,borderTop:"1px solid #d4ddd5",paddingTop:16,marginTop:20}}>{outcome}</p></article>)}</div>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">04 / SUSTAINABLE MODEL</p><h2>{t.model}</h2>
   <p className="rba-taiwan-intro">{isJa?"単発イベントだけで終わらせず、活動の質と継続性を両立させるため、以下の収益・費用構造を仮説として検証します。料金や売上は確定していません。":"不以單次活動為終點。我們會先測試以下收入與成本結構，兼顧教學品質與持續營運。目前沒有確定收費或營收數字。"}</p>
   <div className="rba-taiwan-cards">
    <article><span>REVENUE</span><h3>{isJa?"収入の候補":"可能的收入"}</h3><p>{isJa?"参加費のある少人数クラス、指導者向け講習、学校・クラブからの委託、活動方針に合う協賛など。無料体験会との組み合わせも検討します。":"小班課程、教練研習、學校或俱樂部委託，以及理念相符的贊助；亦評估免費體驗活動。"}</p></article>
    <article><span>COSTS</span><h3>{isJa?"必要な経費":"主要成本"}</h3><p>{isJa?"会場費、コーチ・通訳の報酬、移動費、保険、安全対策、教材、運営・集客費などを把握し、事業ごとに収支を確認します。":"場地、教練與翻譯報酬、交通、保險、安全措施、教材、行政及推廣費用，逐項記錄。"}</p></article>
    <article><span>DECISION RULE</span><h3>{isJa?"継続の判断":"是否持續"}</h3><p>{isJa?"参加者の満足度だけで判断せず、安全面・継続参加・指導の質・実際の収支を確認。赤字を前提に無理な拡大はしません。":"除了滿意度，也評估安全、持續參與、教學品質與實際收支，不以長期虧損為前提擴張。"}</p></article>
   </div>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">05 / EVALUATION</p><h2>{t.measure}</h2>
   <div className="rba-taiwan-cards">
    <article><span>ACCESS</span><h3>{isJa?"参加機会":"參與機會"}</h3><p>{isJa?"参加人数、初参加の割合、練習中の関与機会、継続率、参加を妨げる費用や移動の課題。":"參與人數、新加入比例、課堂參與機會、留存率，以及費用與交通障礙。"}</p></article>
    <article><span>LEARNING</span><h3>{isJa?"選手とコーチの成長":"球員與教練的學習"}</h3><p>{isJa?"選手の意思決定や挑戦回数、コーチの問いかけ・フィードバックの変化を、観察項目を決めて振り返ります。":"透過事先制定的觀察項目，檢視球員判斷與嘗試機會、教練提問及回饋方式的變化。"}</p></article>
    <article><span>SAFETY</span><h3>{isJa?"安全・運営":"安全與營運"}</h3><p>{isJa?"けがや事故、相談対応、保護者の意見、収支と負担を確認。子どもの個人情報や映像は同意に基づき扱います。":"檢視傷害與事故、意見處理、家長回饋、收支及負擔。兒少個資與影像須取得適當同意。"}</p></article>
   </div>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">06 / ROLES & RESPONSIBILITIES</p><h2>{t.governance}</h2>
   <div className="rba-taiwan-roles">
    <article><strong>RBA</strong><p>{isJa?"育成方針・研修内容の提案、評価項目の設計、日台の学習・交流の調整を担う案です。":"擬負責提出培育理念、設計研習與評估項目，協調台日交流。"}</p></article>
    <article><strong>TAIWAN PARTNERS</strong><p>{isJa?"現地のニーズ把握、会場・指導者・保護者との調整、台湾の法令と文化への適合などを協議します。":"討論在地需求、場地與人員協調，以及法規和文化適切性。"}</p></article>
    <article><strong>JOINT DECISIONS</strong><p>{isJa?"費用負担、収益配分、責任範囲、保険、知的財産、子どもの安全と情報管理は、書面で合意してから実施します。":"費用、收益分配、責任、保險、智慧財產、兒少保護與資料管理，應在實施前書面確認。"}</p></article>
   </div>
  </div></section>
  <section className="rba-taiwan-section"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">07 / CONFIRMED VS PLANNED</p><h2>{t.status}</h2>
   <div className="rba-taiwan-cards">
    <article><span>{isJa?"実施済み":"已進行"}</span><h3>2026 / JAPAN × TAIWAN</h3><p>{isJa?"RBAとSPARTANS Academyは2026年に台湾で育成年代の交流活動を行いました。既存の交流実績と、新しい事業計画は分けてご案内します。":"RBA與SPARTANS Academy於2026年在台灣進行青少年籃球交流。既有活動與未來規劃會分開說明。"}</p></article>
    <article><span>{isJa?"検討中":"規劃中"}</span><h3>{isJa?"コーチ育成・試行クラス":"教練培育與試行課程"}</h3><p>{isJa?"学生・社会人の関心登録を受け付けていますが、指導者採用や研修、クラス開催は未確定です。":"目前開放成年人填寫意向表單；教練聘任、研習與課程日期均尚未確認。"}</p></article>
    <article><span>{isJa?"未決定":"尚未決定"}</span><h3>{isJa?"日程・料金・契約":"時程、費用與合約"}</h3><p>{isJa?"実施日、参加費、会場、募集人数、協賛、運営分担、契約条件は今後の協議事項です。":"日期、收費、場地、人數、贊助、分工與合約條款，仍待協商確認。"}</p></article>
   </div>
  </div></section>
  <section className="rba-taiwan-section rba-taiwan-muted"><div className="rba-taiwan-inner">
   <p className="rba-taiwan-label">08 / GET INVOLVED</p><h2>{t.join}</h2>
   <p className="rba-taiwan-intro">{isJa?"指導を学んでみたい方は関心登録フォームへ。学校・クラブ・保護者コミュニティの方は、実施可能性や地域の課題についてご意見をお聞かせください。":"想學習教學的朋友可先填寫意向表單；學校、俱樂部與家長社群也歡迎分享在地需求與合作想法。"}</p>
   <div className="rba-taiwan-links"><a href={form} target="_blank" rel="noopener noreferrer">{isJa?"コーチ育成の関心登録":"教練培育意向登記"} ↗</a><a href="mailto:riot.training.base@gmail.com?subject=RBA%20Taiwan%20Roadmap">{isJa?"計画への意見・協業相談":"提供建議／洽談合作"} ↗</a><Link href={isJa?"/ja/taiwan":"/zh-tw/taiwan"}>{isJa?"台湾ページに戻る":"返回台灣專頁"} ↗</Link></div>
   <p className="rba-taiwan-small">{isJa?"本ページはRBAの事業計画案です。台湾全体の現状を断定する調査報告や、現地パートナーが承認済みの契約・共同事業の発表ではありません。":"本頁為RBA提出的工作計畫草案，並非對台灣全體現況的定論，也不代表在地夥伴已核准合作契約或共同營運。"}</p>
  </div></section>
 </div></SiteFrame>;
}