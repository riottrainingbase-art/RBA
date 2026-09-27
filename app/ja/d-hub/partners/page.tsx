import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import styles from "./partner.module.css";

export const metadata: Metadata = {
  title: { absolute: "RBA DEVELOPMENT NETWORK | D-HUB PARTNER ACCESS" },
  description: "Gream仙台・Gream沖縄・DSMの指導スタッフ向けD-HUB COACH LABパートナーアクセス。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/d-hub/partners" },
};

const partners = [
  { slug: "gream-sendai", name: "Gream仙台" },
  { slug: "gream-okinawa", name: "Gream沖縄" },
  { slug: "dsm", name: "DSM" },
];

export default function Page() {
  return (
    <SiteFrame locale="ja" languagePage="d-hub">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>RBA DEVELOPMENT NETWORK / D-HUB PARTNER ACCESS</div>
          <ShieldCheck size={44}/>
          <h1>地域が違っても、<br/>育成の共通言語を持つ。</h1>
          <p>RBAと連携する組織の指導スタッフには、D-HUB COACH LABのFULL ACCESSを組織ライセンスとして提供します。「無料配布」ではなく、RBA DEVELOPMENT NETWORKの一員として学び・実践・振り返りを共有するためのアクセスです。</p>
          <div className={styles.actions}>
            <Link className="button button-member" href="/ja/d-hub/partner-access">所属スタッフとして登録する <ArrowRight size={16}/></Link>
            <Link className="button button-light" href="/ja/d-hub/coaches">D-HUB COACH LABを見る</Link>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div><span>LAUNCH PARTNERS</span><h2>第1期パートナー</h2></div>
            <p>まず3拠点から運用を開始し、実際の現場で使いながらRBA NETWORKの標準運用へ育てます。</p>
          </div>
          <div className={styles.partnerGrid}>
            {partners.map((partner,index)=><article key={partner.slug}>
              <span>{String(index+1).padStart(2,"0")}</span>
              <Building2 size={24}/>
              <h3>{partner.name}</h3>
              <p>D-HUB COACH LAB / FULL ACCESS</p>
              <Link href={"/ja/d-hub/partner-access?org="+partner.slug}>所属確認へ <ArrowRight size={15}/></Link>
            </article>)}
          </div>
        </section>

        <section className={styles.dark}>
          <div className={styles.sectionHead}>
            <div><span>WHAT IS INCLUDED</span><h2>指導者に渡すのは、ログイン権限だけではありません。</h2></div>
            <p>「読む」で終わらず、現場で試し、記録し、次の指導へつなげるところまでを共通の運用にします。</p>
          </div>
          <div className={styles.valueGrid}>
            <article><CheckCircle2/><span>01</span><h3>48-WEEK CURRICULUM</h3><p>12テーマ×4レッスン。育成年代の指導を体系的に見直します。</p></article>
            <article><CheckCircle2/><span>02</span><h3>MEMBER ARTICLES</h3><p>Fundamentals、練習設計、S&amp;C、安全、保護者対応まで現場単位で深掘りします。</p></article>
            <article><CheckCircle2/><span>03</span><h3>FIELD PRACTICE</h3><p>毎週ひとつ、次の練習で試す課題を決めます。</p></article>
            <article><CheckCircle2/><span>04</span><h3>REVIEW</h3><p>成功・失敗の評価だけでなく、選手に実際に起きたことを記録します。</p></article>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <div><span>HOW TO START</span><h2>登録は3分。承認後すぐ使えます。</h2></div>
            <p>共有ID・共有パスワードは使いません。指導者一人につき1つのRBA IDで管理します。</p>
          </div>
          <div className={styles.steps}>
            <article><span>01</span><Users/><h3>RBA IDでログイン</h3><p>まだアカウントがない場合は、そのままRBA IDを作成します。</p></article>
            <article><span>02</span><Building2/><h3>所属を申請</h3><p>所属組織・役割・担当年代・学びたいテーマを登録します。</p></article>
            <article><span>03</span><ShieldCheck/><h3>RBAが所属確認</h3><p>承認されるとD-HUB COACH LAB FULL ACCESSが有効になります。</p></article>
          </div>
          <div className={styles.finalCta}>
            <div><strong>Gream仙台 / Gream沖縄 / DSM</strong><p>対象スタッフは下記から登録してください。</p></div>
            <Link className="button button-member" href="/ja/d-hub/partner-access">PARTNER ACCESSを申請 <ArrowRight size={16}/></Link>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
