import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import styles from "./advanced.module.css";

export const metadata: Metadata = {
  title: "RBA有料サービス詳細｜継続育成・メンタリング・チーム訪問・法人研修",
  description: "HOMECOURT、D-HUB、チーム訪問指導の既存料金と提供範囲。新しい個別育成支援は無料相談・見積から。契約・請求前に内容と条件をご確認いただけます。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/services/advanced" },
  openGraph: { title: "RBA｜有料サービスと個別育成サポート", description: "現行の有料プランと、個別見積の新しい育成サービスを区別してご案内します。", url: "https://riotbasketballacademy.com/ja/services/advanced", siteName: "Riot Basketball Academy", type: "website" },
};
const INQUIRY="https://form.jotform.com/263261461105044";
const existing = [
  { id:"homecourt", label:"継続会員", title:"RBA HOMECOURT", price:"月額 3,300円", target:"選手・保護者・指導者", focus:"所属チームの外でも、育成情報と自分の成長記録を継続するための入口。", included:["RBA IDとMY HOME COURTの利用導線","目標・振り返り・次の活動を探すための育成環境","有料契約はStripeの明示的な申込後に開始"], excludes:"D-HUBの有料カリキュラム、スクール・クリニック参加費、個別指導は自動的に含まれません。", href:"/ja/home-court", cta:"HOMECOURTの正式条件を見る", pay:"Stripeの月額契約。無料のRBA IDとは別です。" },
  { id:"coaches", label:"継続会員", title:"D-HUB COACH LAB", price:"月額 3,300円", target:"現場で指導しているコーチ", focus:"48週の指導カリキュラムを軸に、学ぶ→試す→振り返る流れを継続。", included:["公開済み48レッスンのカリキュラムへの会員専用アクセス","実践課題、進捗記録、指導者間の学びの導線","RBA IDでログインし利用権限を確認"], excludes:"代表による1対1面談、録画講習の別販売商品、訪問指導は自動的に含まれません。", href:"/ja/d-hub", cta:"COACH LABの正式案内を見る", pay:"既存のSquare月額契約を確認。Stripe会員とは別サービスです。" },
  { id:"players", label:"継続会員", title:"D-HUB PLAYERS", price:"月額 3,300円", target:"選手と保護者", focus:"選手の課題を整理し、実践・試合経験・振り返りにつなぐ会員プログラム。", included:["会員向け育成モジュール、課題・進捗の記録","学習記事や振り返りにつながる選手向けページ","年齢と利用権限に応じたRBA IDでのアクセス"], excludes:"オンライン個人指導、動画解析、診断行為、遠征参加権は料金に含みません。", href:"/ja/d-hub/players", cta:"PLAYERSの正式案内を見る", pay:"既存会員やGREAM所属選手は、利用権限を確認してから新規決済を判断してください。" },
  { id:"advertising", label:"継続契約", title:"RBA企業広告", price:"月額 11,000円（税込）", target:"地域企業・法人", focus:"RBA公式サイトでの企業紹介と月次活動レポートを通じた広告掲載。", included:["社名・公式URL・許諾済みロゴと紹介文の掲載","月次活動・掲載状況の共通レポート","Stripeの請求・更新・解約管理"], excludes:"冠協賛、独占権、ウェア掲出、個別SNS投稿、成果保証は契約に含まれません。", href:"/ja/support", cta:"企業広告の契約条件を見る", pay:"既存の広告契約がある企業は、重複して申し込まないでください。" },
] as const;
const visit = [
  {duration:"3時間",amount:"33,000円",detail:"特定のゲーム課題に絞った集中指導の参考価格。"},
  {duration:"半日",amount:"55,000円",detail:"複数の課題を組み合わせ、ゲームでの再確認まで設計する参考価格。"},
  {duration:"終日",amount:"88,000円",detail:"対象年齢や人数に合わせて複数セッションを構成する参考価格。"},
] as const;
const proposals = [
 {code:"01 / COACH DEVELOPMENT",title:"RBA COACH MENTORING",tag:"指導者の個別伴走",term:"単発または複数回・個別協議",body:"日頃の練習を題材に、指導課題・問いかけ・制約設計・ゲームへの転移を一緒に整理する、新しい個別支援の相談窓口です。",flow:["現場で感じている課題を共有","指導目標とレビュー方法を確認","回数・納品物・料金を見積書に明記"],note:"動画素材や選手の個人情報は、権限・同意・安全な受け渡し方法が決まるまで収集しません。",id:"mentoring"},
 {code:"02 / TEAM DEVELOPMENT",title:"TEAM DEVELOPMENT PARTNER",tag:"チームの継続育成設計",term:"複数回・月次契約は個別協議",body:"一度きりのイベントではなく、チームの練習テーマとゲームでの変化を継続的に確認する伴走型プログラム案。",flow:["チーム課題と対象年代を整理","月次訪問・オンライン振り返りの実施可否を確認","担当者・会場・交通費・月次成果物を見積"],note:"施設利用と指導者配置が決まるまで開催・訪問の確約は行いません。",id:"team-development"},
 {code:"03 / FAMILY DEVELOPMENT",title:"PARENT DEVELOPMENT CONSULTATION",tag:"保護者向け育成相談",term:"単発相談・個別協議",body:"練習量、チーム環境、成長期の関わり方、競技経験の選び方を、長期育成の観点から整理する個別相談案。",flow:["保護者から相談テーマを確認","面談方法と所要時間を見積","必要な情報整理と選択肢の説明"],note:"診断・治療・法律判断・進学の合否保証は行いません。未成年者の病歴・氏名などは一般フォームに記載しないでください。",id:"family-advice"},
 {code:"04 / CORPORATE WELLNESS",title:"CORPORATE MOVEMENT & S&C",tag:"企業向け運動・コンディショニング研修",term:"単発研修・個別協議",body:"社員の運動習慣、基本的な身体動作、職場での身体活動をテーマにした企業向け指導・研修案。",flow:["対象人数・施設・安全条件を確認","運動強度と内容、講師と機材の要件を整理","実施時間・価格・責任範囲を見積"],note:"医学的評価・治療・健康結果の保証は含めません。実施可否は会場・人員・保険条件を確認します。",id:"corporate-wellness"}
] as const;
const faq=[
 {q:"すでにHOMECOURTやD-HUBの会員です。申し込み直す必要はありますか？",a:"いいえ。まず既存の決済と利用権限を照合してください。異なるメールアドレスで登録した場合も、重複課金する前にRBAへご相談ください。"},
 {q:"個別メンタリングやチーム継続支援の価格は？",a:"現在は新しいサービス構想について相談・見積だけを受け付けています。担当者の稼働、提供回数、納品物、交通費、施設・安全条件によって料金と提供可否を個別に決めます。相談だけで費用は発生しません。"},
 {q:"月額会員でイベントや指導者講習にも参加できますか？",a:"各イベント・スクール・遠征の申込、参加費、録画視聴権は別です。各プログラムの公式ページに明記された特典がある場合のみ適用されます。"},
 {q:"申し込んだらいつから課金されますか？",a:"現行の月額契約は各決済事業者の最終確認画面に表示される時期・金額で開始します。新しい個別相談は無料で、条件提示後に成人の正式な同意があるまで請求しません。"},
 {q:"キャンセルや更新停止は？",a:"既存月額契約は契約時の条件と各決済事業者の支払管理画面をご確認ください。新しい個別支援では契約前に実施日・取消時期・返金条件を文書で確認します。"},
 {q:"子どもの動画や健康情報を送っても大丈夫ですか？",a:"一般相談フォームには送らないでください。映像・健康情報が必要となる場合も、利用目的、保護者同意、保存方法、権限を先に明確にするまでは収集しません。"}
] as const;

export default function AdvancedPaidServicesPage(){
 return <SiteFrame locale="ja"><main className={styles.page}>
 <GrowthClickTracking/>
 <section className={styles.hero}><div className={styles.wrap}>
  <a href="/ja/services" className={styles.back}>← 公式サービス一覧へ</a>
  <div className={styles.brand}><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy公式ロゴ" width={45} height={63}/><span>RIOT BASKETBALL ACADEMY / ADVANCED SERVICES</span></div>
  <p className={styles.kicker}>CONTINUOUS LEARNING × REAL COACHING</p>
  <h1>単発で終わらない、<br/><em>本当に続く育成を。</em></h1>
  <p className={styles.lead}>現在利用できる有料会員・訪問指導と、これから検討する個別サポートを、料金・提供範囲・申込状態まで分けてご案内します。</p>
  <nav className={styles.pills} aria-label="ページ内の案内"><a href="#memberships">月額会員・企業広告</a><a href="#visits">チーム訪問</a><a href="#new-programmes">個別支援の新提案</a><a href="#faq">よくある質問</a></nav>
 </div></section>
 <section className={styles.section} id="memberships"><div className={styles.wrap}>
   <p className={styles.kicker}>01 / EXISTING PAID SERVICES</p><h2>すでにある有料サービスを、<br/>きちんと使い切る。</h2>
   <p className={styles.intro}>利用条件・申込先が既にあるサービスです。無料RBA IDや他サービスの権限と混同せず、必要なプランだけを選んでください。</p>
   <div className={styles.memberGrid}>{existing.map(item=><article key={item.id} className={styles.product}>
    <p className={styles.tag}>{item.label}　/　{item.target}</p><h3>{item.title}</h3><strong className={styles.amount}>{item.price}</strong>
    <p>{item.focus}</p><h4>提供する価値</h4><ul>{item.included.map(s=><li key={s}>{s}</li>)}</ul>
    <p className={styles.exclusion}><strong>別途：</strong>{item.excludes}</p><p className={styles.small}>{item.pay}</p>
    <a className={styles.action} data-growth-id={`advanced-current-${item.id}`} href={item.href}>{item.cta}<span aria-hidden="true">→</span></a>
   </article>)}</div>
 </div></section>
 <section className={styles.alt} id="visits"><div className={styles.wrap}>
   <p className={styles.kicker}>02 / EXISTING TEAM TRAINING</p><h2>チーム訪問指導は、<br/>目的と時間から選ぶ。</h2>
   <p className={styles.intro}>RBAの商品台帳に登録されている指導料の参考額です。開始前に、競技年代・人数・時間配分・施設費・交通費・税区分・保険・キャンセル条件を個別見積で確認します。</p>
   <div className={styles.visitGrid}>{visit.map(x=><article key={x.duration} className={styles.visit}><span>{x.duration}</span><strong>{x.amount}</strong><p>{x.detail}</p></article>)}</div>
   <div className={styles.pair}><a className={styles.action} href="/ja/clinic-request" data-growth-id="advanced-visit-enquiry">無料でチーム指導を相談する →</a><a className={styles.plain} href="/ja/team-training">練習設計の考え方を見る →</a></div>
 </div></section>
 <section className={styles.section} id="new-programmes"><div className={styles.wrap}>
   <p className={styles.kicker}>03 / CONCEPTS FOR CUSTOM PAID SUPPORT</p><h2>新しい有料サービスは、<br/>まず相談から設計する。</h2>
   <p className={styles.intro}>以下は企画・個別見積段階のサービス案です。料金・提供日時・担当人数は未確定です。フォーム提出だけで契約や課金、指導枠の確保は発生しません。</p>
   <div className={styles.proposalGrid}>{proposals.map(item=><article key={item.id} className={styles.proposal}>
     <div className={styles.cardTop}><span>{item.code}</span><b>個別見積・相談のみ</b></div>
     <h3>{item.title}</h3><p className={styles.label}>{item.tag}</p><p>{item.body}</p>
     <p className={styles.term}>{item.term}</p><h4>相談時に整理する内容</h4><ol>{item.flow.map(s=><li key={s}>{s}</li>)}</ol>
     <p className={styles.small}>{item.note}</p>
     <a href={INQUIRY} data-growth-id={`advanced-proposal-${item.id}`} target="_blank" rel="noopener noreferrer" className={styles.action}>無料で条件を相談する ↗</a>
   </article>)}</div>
   <div className={styles.notice}><strong>最初に費用は発生しません。</strong><p>問い合わせ→提供可能な体制の確認→正式見積→契約条件への同意→必要に応じて決済案内の順に進めます。新プランの自動課金・決済リンクは公開していません。</p></div>
 </div></section>
 <section className={styles.alt} id="faq"><div className={styles.wrap}>
  <p className={styles.kicker}>04 / BEFORE YOU PAY</p><h2>購入前によくある質問</h2>
  <div className={styles.faq}>{faq.map(x=><details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>)}</div>
  <p className={styles.small}>新しい提案を含め、通信販売で有料申込を行う場合は、提供量・対価・支払時期・提供時期・取消条件・申込期間等を最終確認画面で表示する必要があります。個別見積を経るサービスでも、成立前に必要事項を文書化します。</p>
 </div></section>
 <section className={styles.bottom}><div className={styles.wrap}>
 <p className={styles.kicker}>MAKE THE NEXT STEP CLEAR</p><h2>いま必要な支援から。</h2><p>新しいサービスは準備できる範囲から個別に設計します。既存サービスへの申込と、新しい個別支援の無料相談は別の窓口です。</p>
 <div className={styles.pair}><a className={styles.action} href={INQUIRY} data-growth-id="advanced-bottom-inquiry" target="_blank" rel="noopener noreferrer">新サービスについて無料相談 ↗</a><a className={styles.plain} href="/ja/services">既存サービス一覧へ戻る →</a></div>
 <p className={styles.small}>主催・指導・コーチングの実施可能性、動画等の権利、未成年者の安全管理は受注前に確認します。相談フォームにカード番号や未成年の健康情報を入力しないでください。</p>
 </div></section>
 </main></SiteFrame>;
}
