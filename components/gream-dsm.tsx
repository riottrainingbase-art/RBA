import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Users, HeartHandshake, Check } from "lucide-react";
import { SiteFrame } from "./site-frame";
import { contactFormUrl } from "./contact-form";
import s from "./gream-dsm.module.css";

const root="/ja/gream-dsm";
const supportWays=[
 ["01 / FUNDING","資金で支える","日々の活動や大会参加に必要な費用を支援。年間協賛・単発協賛など、ご希望の関わり方から相談できます。"],
 ["02 / EQUIPMENT","用具・物品で支える","ボール、練習用品などの提供。チームが必要とする物品・数量を確認してから進めます。"],
 ["03 / LOCAL PARTNER","地域の力で支える","会場、移動、専門分野のサポートなど。企業や地域の皆さまの得意なことを、活動につなげます。"],
];
const uses=[ ["COURT","練習を続ける環境","会場・用具など、日常の活動を支える環境づくり。"],["GAME","挑戦する機会","大会や練習試合など、コートで経験を重ねるために。"],["MOVE","地域を越える経験","移動・遠征に伴う負担を軽くし、新しい相手と出会うために。"] ];
const email=(kind:string)=>`mailto:riot.training.base@gmail.com?subject=${encodeURIComponent(`GREAM DSM｜${kind}`)}&body=${encodeURIComponent(`GREAM DSMについて相談です。\n\n会社・団体名：\nご担当者名：\n返信先：\nご相談内容：\nご希望の支援方法・ご予算（任意）：\n`)}`;

export function DsmPage({support=false}:{support?:boolean}){
return <SiteFrame locale="ja"><div className={s.page}>
 <div className={s.breadcrumb}><Link href="/ja">RBA</Link><span>/</span>{support?<><Link href={root}>GREAM DSM</Link><span>/</span><span>スポンサー募集</span></>:<span>GREAM DSM</span>}</div>
 <section className={s.hero}>
  <div className={s.heroCopy}><span className={s.kicker}>AKITA · DAISEN / U15 BASKETBALL</span><h1>{support?<>この街の挑戦を、<br/>一緒に支える。</>:<>GREAM<br/><span>DSM.</span></>}</h1><p className={s.lead}>{support?"大仙のコートから、次の経験へ。GREAM DSMの活動を支えるスポンサー・地域パートナーを募集しています。":"秋田県大仙市を中心に活動する、U15バスケットボールクラブチーム。地域に根ざした活動を、ここから紹介します。"}</p><div className={s.heroMeta}><span><MapPin size={16}/>秋田県大仙市中心</span><span><Users size={16}/>U15クラブチーム</span></div><div className={s.actions}><a href={support?"#inquiry":`${root}/support`} className={s.primary}>{support?"協賛について相談する":"チームを支える"}<ArrowRight size={18}/></a><a href={support?root:"#about"} className={s.secondary}>{support?"チーム紹介を見る":"GREAM DSMを知る"}</a></div></div>
  <figure className={s.heroPhoto}><Image src="/gream-dsm/team.webp" alt="GREAM DSMの集合写真" width={1477} height={1108} priority sizes="(max-width: 900px) 100vw, 60vw"/><figcaption>GREAM DSM / TEAM</figcaption></figure>
 </section>
 <nav className={s.subnav} aria-label="GREAM DSMページ案内"><Link href={root} aria-current={!support?"page":undefined}>チーム紹介</Link><Link href={`${root}/support`} aria-current={support?"page":undefined}>スポンサー募集</Link><a href="#inquiry">お問い合わせ <ArrowUpRight size={15}/></a></nav>
 {support?<>
 <section className={s.section}><div className={s.sectionHead}><span className={s.kicker}>WHY YOUR SUPPORT MATTERS</span><h2>応援を、<br/>選手たちの経験へ。</h2><p>練習を続けること。試合で挑戦すること。いつもと違う相手と出会うこと。地域の皆さまとともに、選手たちがバスケットボールに取り組む環境を支えていきます。</p></div><div className={s.grid}>{uses.map(([tag,title,body])=><article className={s.card} key={tag}><small>{tag}</small><h3>{title}</h3><p>{body}</p></article>)}</div></section>
 <section className={`${s.section} ${s.dark}`}><div className={s.sectionHead}><span className={s.kicker}>WAYS TO SUPPORT</span><h2>あなたの得意なことで、<br/>チームの力に。</h2><p>規模を問わず、できることから。支援方法やご予算に合わせて、無理なく続けられる協力の形を相談します。</p></div><div className={s.grid}>{supportWays.map(([tag,title,body])=><article className={s.card} key={tag}><small>{tag}</small><h3>{title}</h3><p>{body}</p><a href="#inquiry">この支援について相談 <ArrowRight size={16}/></a></article>)}</div></section>
 <section className={s.section}><div className={s.twoCol}><div><span className={s.kicker}>PARTNERSHIP</span><h2>支援の目的と、<br/>関わり方を共有する。</h2></div><div><p>会社名・ロゴの掲載、活動報告、地域での交流など、ご希望を伺いながら協賛内容を整理します。</p><ul className={s.checks}>{["掲載場所・期間・内容を事前に確認","支援用途と報告方法を事前に共有","物品提供はチームの必要品を確認","協賛金額・お支払いは内容合意後にご案内"].map(t=><li key={t}><Check size={18}/>{t}</li>)}</ul><p className={s.note}>ユニフォーム等へのロゴ掲出は、規定や制作時期を含めて個別に相談します。掲載や広告効果を一律に保証するものではありません。</p></div></div></section>
 <section className={`${s.section} ${s.soft}`}><span className={s.kicker}>HOW IT WORKS</span><h2>相談から、協力の開始まで。</h2><ol className={s.steps}>{[["ご相談","会社・団体名と、支援したい内容をお知らせください。"],["内容のすり合わせ","用途・金額・期間・掲載や報告の方法を確認します。"],["合意・ご案内","合意した内容に沿って、支払方法や提供方法をご案内します。"],["活動とご報告","確認した方法で、活動や支援の活用状況を共有します。"]].map(([title,body],i)=><li key={title}><b>0{i+1}</b><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
 </>:<>
 <section id="about" className={s.section}><div className={s.twoCol}><div><span className={s.kicker}>OUR TEAM</span><h2>大仙に根ざす、<br/>U15のクラブチーム。</h2></div><div><p>GREAM DSMは、秋田県大仙市を中心に活動するU15バスケットボールクラブチームです。</p><p>選手が仲間とともにバスケットボールに取り組み、次の経験へ進む活動を、地域の皆さまの応援とともに育てていきます。</p><dl className={s.profile}><div><dt>チーム名</dt><dd>GREAM DSM</dd></div><div><dt>活動地域</dt><dd>秋田県大仙市を中心とした地域</dd></div><div><dt>カテゴリー</dt><dd>U15バスケットボールクラブ</dd></div><div><dt>活動・体験の相談</dt><dd>現在の募集状況・会場・日程はお問い合わせください。</dd></div></dl></div></div></section>
 <section className={`${s.section} ${s.soft}`}><div className={s.sectionHead}><span className={s.kicker}>ON THE COURT</span><h2>仲間と、コートに立つ。</h2></div><div className={s.gallery}><figure><Image src="/gream-dsm/team.webp" alt="GREAM DSMの選手たち" width={1477} height={1108} sizes="(max-width: 700px) 100vw, 50vw"/><figcaption>GREAM DSM</figcaption></figure><figure><Image src="/gream-dsm/team-youth.webp" alt="GREAM DSMの活動紹介用集合写真" width={1477} height={1108} sizes="(max-width: 700px) 100vw, 50vw"/><figcaption>TEAM GALLERY</figcaption></figure></div></section>
 <section className={`${s.section} ${s.dark}`}><div className={s.twoCol}><div><span className={s.kicker}>SUPPORT GREAM DSM</span><h2>この街のバスケを、<br/>一緒に支える。</h2></div><div><HeartHandshake size={38}/><p>資金協賛、用具・物品の提供、会場や移動の協力。企業・団体・地域の皆さまと、チームを支えるつながりをつくります。</p><Link href={`${root}/support`} className={s.primary}>スポンサー募集を見る <ArrowRight size={18}/></Link></div></div></section>
 </>}
 <section className={s.section}><div className={s.faq}><span className={s.kicker}>FAQ</span><h2>よくあるご質問</h2>{(support?[["協賛金額は決まっていますか？","支援内容・期間・ご予算を伺い、個別にご案内します。問い合わせだけで料金が発生することはありません。"],["物品やサービスの提供でも協力できますか？","はい。チームの必要品や運営状況を確認し、提供内容・時期・受け渡し方法を相談します。"],["会社名やロゴを掲載できますか？","掲載場所や期間を含めて個別に相談します。内容合意前の掲載確約は行いません。"],["個人でも応援できますか？","個人の方からのご相談も受け付けます。希望する支援方法をお知らせください。"]]:[["体験参加について相談できますか？","はい。希望するカテゴリーや学年、相談内容をお知らせください。現在の受け入れ状況と活動日程を確認してご案内します。"],["練習日程や会費はどこで確認できますか？","最新の会場・日程・会費・参加条件はお問い合わせください。確認できた内容をご案内します。"],["スポンサーとして応援できますか？","スポンサー募集ページで支援の形をご覧いただけます。資金だけでなく、物品や地域の協力についてもご相談ください。"]]).map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
 <section id="inquiry" className={`${s.section} ${s.inquiry}`}><div><span className={s.kicker}>LET’S TALK / GREAM DSM</span><h2>{support?"まずは、できることから。":"GREAM DSMへのご相談。"}</h2><p>{support?"会社・団体名、ご担当者名、希望する支援方法をお知らせください。予算が未定でもご相談いただけます。":"体験・活動に関するご相談、スポンサーとしてのご協力など、お問い合わせの際は「GREAM DSMについて」とお書きください。"}</p><div className={s.actions}><a href={email(support?"スポンサー・協賛の相談":"チーム・体験の相談")} className={s.primary}>メールで相談する <ArrowUpRight size={18}/></a><a className={s.secondary} href={contactFormUrl} target="_blank" rel="noopener noreferrer">フォームで相談する <ArrowUpRight size={18}/></a></div><p className={s.note}>フォームの相談内容に「GREAM DSM」とご記入ください。お問い合わせはRBA窓口で受け付けます。</p></div></section>
 </div></SiteFrame>;
}
