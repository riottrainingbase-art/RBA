import type { Metadata } from "next";
import s from "./rtb.module.css";
import { rtbFunnels as f, rtbPilotPricing as p } from "@/lib/rtb-commercial";
export const metadata:Metadata={title:{absolute:"Riot Training Base｜TRAIN / ASSESS / SELECT / PARTNER"},description:"仙台のRiot Training Base。トレーニング、Assessment、RTB SELECT、Team S&C、法人・ブランド連携。",robots:{index:false,follow:false}};
const yen=(n:number)=>"¥"+n.toLocaleString("ja-JP");
const personal=[
 ["01 / TRAIN","Personal Training","個別","目的、競技、経験に合わせ、基礎筋力からパフォーマンスまで段階的に積み上げます。","初回相談",f.start],
 ["02 / ASSESS","Movement / Performance Check",yen(p.movementCheck30)+"〜","30分3,300円／60分6,600円をパイロット価格として検証。医療診断ではなく、運動・トレーニング設計の入口です。","申込相談",f.start],
 ["03 / MEMBER","RTB Membership",yen(p.membershipBaseMonthly)+"〜 / 月","BASE 3,300円／PERFORMANCE 8,800円を候補に継続支援を検証中。先行登録では課金されません。","先行登録",f.membership],
 ["04 / SELECT","RTB SELECT","商品別","実際に使う理由があるものだけ。委託・予約・小ロットを優先し、在庫を積まずに選びます。","SELECTを見る","/rtb-select"],
];
const biz=[
 ["01 / TEAM","Team S&C",yen(p.teamSpot90)+"〜","SPOT 90分22,000円〜／月2回38,500円〜／月4回66,000円〜。",f.teamCorporate],
 ["02 / CORPORATE","Corporate Performance",yen(p.corporateTrial)+"〜","Trial 33,000円〜／月1回44,000円〜／月2回等77,000円〜。",f.teamCorporate],
 ["03 / BRAND","Product Test",yen(p.productTestStart)+"〜","14日33,000円〜／30日55,000円〜／FIELD 110,000円〜。肯定的評価や売上は保証しません。",f.productTest],
];
export default function Page(){return <div className={s["rtb-site"]}>
<div className={s["rtb-shell"]}><header className={s["rtb-header"]}><a className={s["rtb-brand"]} href="/rtb"><span className={s["rtb-mark"]}>RTB</span><span><strong>RIOT TRAINING BASE</strong><small>PERFORMANCE / SENDAI</small></span></a><nav className={s["rtb-nav"]}><a href="#services">SERVICES</a><a href="/rtb-select">SELECT</a><a href="#business">BUSINESS</a><a className={s["rba-link"]} href="/ja">RBA / BASKETBALL ↗</a></nav></header>
<section className={s["rtb-hero"]}><div><p className={s["rtb-eyebrow"]}>RIOT TRAINING BASE / SENDAI</p><h1><span>TRAIN.</span><span>ASSESS.</span><span>BUILD.</span></h1><p className={s["rtb-lede"]}>トレーニングを入口に、身体を理解し、必要なものを選び、次のパフォーマンスへつなげる。</p></div><aside className={s["rtb-aside"]}><p>RTBはRBAの物販ページではありません。仙台のトレーニング拠点として、個人・チーム・企業・ブランドに独立した価値を提供します。</p><a className={s["rtb-button"]} href={f.start} target="_blank" rel="noreferrer">初回相談 →</a></aside></section></div>
<div className={s["rtb-band"]}><div className={s["rtb-shell"]}><strong>TRAINING IS THE ENTRY.</strong><span>RBAはバスケットボール育成。RTBはトレーニング／パフォーマンス事業。</span></div></div>
<section id="services" className={s["rtb-section"]}><div className={s["rtb-shell"]}><div className={s["rtb-head"]}><div><p className={s["rtb-eyebrow"]}>FOR INDIVIDUALS</p><h2>相談で終わらせず、<br/>次の行動へ。</h2></div><p>初回相談からAssessment、Personal、継続支援、SELECTへ。現在は価格と提供内容をパイロットとして検証し、数字が確認できたものから正式化します。</p></div><div className={s["rtb-grid"]}>{personal.map(([tag,title,price,body,cta,href])=><article className={s["rtb-card"]} key={tag}><span>{tag}</span><h3>{title}</h3><p>{body}</p><footer><strong>{price}</strong><a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer">{cta} →</a></footer></article>)}</div></div></section>
<section className={s["rtb-section"]+" "+s["rtb-orange"]}><div className={s["rtb-shell"]}><div className={s["rtb-head"]}><div><p className={s["rtb-eyebrow"]}>RTB SELECT</p><h2>在庫より先に、<br/>需要をつくる。</h2></div><p>TRAIN / RECOVER / WEAR。委託・サンプル・予約・小ロットを優先し、売れたカテゴリーだけを残します。</p></div><a className={s["rtb-button"]} href="/rtb-select">RTB SELECTを見る →</a></div></section>
<section id="business" className={s["rtb-section"]+" "+s["rtb-dark"]}><div className={s["rtb-shell"]}><div className={s["rtb-head"]}><div><p className={s["rtb-eyebrow"]}>FOR TEAMS / COMPANIES / BRANDS</p><h2>サービスを、<br/>価格のある商品にする。</h2></div><p>Team S&C、法人支援、商品テストを相談だけで終わらせず、参考価格と専用商談導線を公開します。</p></div><div className={s["rtb-grid"]}>{biz.map(([tag,title,price,body,href])=><article className={s["rtb-card"]} key={tag}><span>{tag}</span><h3>{title}</h3><p>{body}</p><footer><strong>{price}</strong><a href={href} target="_blank" rel="noreferrer">商談する →</a></footer></article>)}</div></div></section>
<section className={s["rtb-section"]+" "+s["rtb-dark"]}><div className={s["rtb-shell"]+" "+s["rtb-rba-bridge"]}><div><p className={s["rtb-eyebrow"]}>BASKETBALL DEVELOPMENT</p><h2 style={{fontSize:"clamp(38px,5vw,68px)",lineHeight:1,letterSpacing:"-.05em",margin:0}}>Basketball belongs to RBA.</h2></div><div className={s["rtb-rba-box"]}><h3>RIOT BASKETBALL ACADEMY</h3><p>育成年代バスケットボール、Camp、RBA UNITED、D-HUB、MY HOME COURT、国際交流はRBAへ。RTBと連携しますが、役割を混同させません。</p><a className={s["rtb-button"]+" "+s.light} href="/ja">RBAへ →</a></div></div></section>
<footer className={s["rtb-footer"]}><div className={s["rtb-shell"]}><div><strong>RIOT TRAINING BASE</strong><p>TRAINING · PERFORMANCE · SELECT<br/>Sendai, Japan</p></div><div><a href="/rtb-select">RTB SELECT</a><a href={f.teamCorporate} target="_blank" rel="noreferrer">TEAM / CORPORATE</a><a href="/ja">RBA</a></div></div></footer>
</div>}