import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardList, ExternalLink, HeartHandshake, PenLine } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { NoteBridge } from "@/components/note-bridge";
import styles from "./page.module.css";

export const metadata:Metadata={
  title:"RBA JOURNALと公式noteの違い｜無料記事・有料記事・MY HOME COURT",
  description:"RBA JOURNALは無料で根拠と育成を学ぶ公式ライブラリー。公式noteは代表の視点や活動報告・実践編、MY HOME COURTは学びを行動に移す場所。料金と登録の違いも解説します。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/reading-guide"},
};

const ways=[
  {icon:BookOpen,subject:"はじめて育成について知りたい",step:"RBA JOURNALから",detail:"チーム選び、出場時間、練習設計など。無料の記事から、根拠とRBAの見解を分けて確認できます。",href:"/ja/journal",cta:"無料JOURNALを読む",external:false},
  {icon:PenLine,subject:"代表の考えや現場の背景を知りたい",step:"RBA公式noteから",detail:"問題提起、活動レポート、実際の現場で考えたことを読む。無料と有料の記事があるので各記事の表示を確認してください。",href:"https://note.com/rba_official",cta:"公式noteの記事一覧",external:true},
  {icon:ClipboardList,subject:"記事を読んだあと、実際に試したい",step:"MY HOME COURTへ",detail:"練習や試合での気づきを残し、次の活動を探す。無料RBA IDから始め、必要に応じて有料機能を選べます。",href:"/ja/my-homecourt",cta:"MY HOME COURTを見る",external:false},
  {icon:HeartHandshake,subject:"RBAの育成活動を継続して応援したい",step:"noteメンバーシップへ",detail:"任意の月額応援・育成記事プランを紹介。購読できる特典、更新・退会条件はnoteの最新案内が優先されます。",href:"/ja/supporters",cta:"応援プランの違いを確認",external:false},
] as const;

const faq=[
  {q:"RBA JOURNALを読むには、noteの会員登録が必要ですか？",a:"必要ありません。公開されているRBA JOURNALの記事は無料で読めます。noteの購入や月額加入は条件ではありません。"},
  {q:"noteの有料記事やメンバーシップは必須ですか？",a:"いいえ。どちらも希望する方だけが選ぶ任意のサービスです。無料のnote記事もあり、個別記事と月額メンバーシップは別の購入方法です。"},
  {q:"noteとMY HOME COURTの有料プランは共通ですか？",a:"別のサービスです。note上の購読・メンバーシップではMY HOME COURTの有料機能やD-HUBの権限は自動付与されません。各サービスの提供条件をご確認ください。"},
  {q:"JOURNALとnoteに似たテーマがあるのはなぜですか？",a:"同じ育成テーマでも役割が違います。JOURNALでは根拠・基礎解説・実践の出発点を整理し、noteでは現場での経験や代表の見方・詳しい実践を掘り下げます。重複転載ではなく読み分けができる運用を目指します。"},
  {q:"何から読み始めるのがおすすめですか？",a:"育成の基本を押さえたいならJOURNAL、活動の経緯や代表の率直な視点を知りたいならnoteです。学んだことを記録・行動に変えたいときはMY HOME COURTを使ってください。"},
] as const;

export default function ReadingGuidePage(){
  return <SiteFrame locale="ja" languagePage="journal">
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.wrap}>
          <Link href="/ja/journal" className={styles.back}>← RBA JOURNAL</Link>
          <p className={styles.kicker}>RBA / READING GUIDE</p>
          <h1>JOURNALとnote。<br/><span>違いは、読む目的。</span></h1>
          <p className={styles.intro}>RBAの発信を迷わず使えるように整理しました。<strong>JOURNALは無料で学ぶ場所。noteは現場の視点や背景を読む場所。</strong>そしてMY HOME COURTで、学びを次の行動につなげます。</p>
          <div className={styles.heroActions}><Link href="/ja/journal" className={styles.primary}>まず無料で記事を読む <ArrowRight size={18}/></Link><a href="https://note.com/rba_official" className={styles.secondary} target="_blank" rel="noopener noreferrer">noteを見に行く <ExternalLink size={18}/></a></div>
        </div>
      </header>

      <div className={styles.wrap}><NoteBridge variant="home"/></div>

      <section className={styles.section} aria-labelledby="readers-heading"><div className={styles.wrap}>
        <p className={styles.kicker}>CHOOSE YOUR NEXT STEP</p><h2 id="readers-heading">今の目的から選ぶ。</h2>
        <div className={styles.grid}>{ways.map(({icon:Icon,subject,step,detail,href,cta,external})=><article className={styles.choice} key={step}><Icon aria-hidden="true" size={28}/><span>{subject}</span><h3>{step}</h3><p>{detail}</p>{external?<a href={href} target="_blank" rel="noopener noreferrer">{cta} <ExternalLink size={16}/></a>:<Link href={href}>{cta} <ArrowRight size={16}/></Link>}</article>)}</div>
      </div></section>

      <section className={styles.faqSection} aria-labelledby="reading-faq"><div className={styles.wrap}>
        <p className={styles.kicker}>COST & MEMBERSHIP</p><h2 id="reading-faq">料金と登録について。</h2>
        <p className={styles.faqIntro}>読むだけなら、まず無料のJOURNALから。noteの単品記事・月額メンバーシップ、MY HOME COURTの任意の月額機能、D-HUB、各クリニックの参加費は別々に扱います。</p>
        <div className={styles.faq}>{faq.map(x=><details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>)}</div>
        <p className={styles.disclaimer}>※有料サービスの価格・提供内容・決済・更新・解約については、各公式サービスの最新の申込画面を必ず確認してください。RBA JOURNALの資料に記載される研究・制度情報も、記事の確認日と原典をご確認ください。</p>
      </div></section>
    </div>
  </SiteFrame>;
}
