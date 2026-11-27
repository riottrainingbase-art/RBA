import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, History, House, Search, ShieldCheck } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import Link from "next/link";
import { GrowthClickTracking } from "@/components/growth-click-tracking";

export const metadata:Metadata={
  title:"申込後の次の一歩｜RBA ID・MY HOME COURT",
  description:"RBAのクリニックやキャンプに申し込んだ後は、同じメールアドレスでRBA IDを作成し、参加予定や記録、次の育成機会をMY HOME COURTでまとめて確認できます。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/after-application"},
  robots:{index:true,follow:true},
  openGraph:{
    title:"申込で終わらせない。次の成長へ｜RBA",
    description:"RBA IDを作成し、今回の参加をMY HOME COURTで次の成長につなげる。",
    url:"https://riotbasketballacademy.com/ja/after-application",
    siteName:"Riot Basketball Academy",
    locale:"ja_JP",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter:{card:"summary_large_image",title:"申込で終わらせない。次の成長へ｜RBA",description:"RBA IDを作成し、今回の参加をMY HOME COURTで次の成長につなげる。",images:["https://riotbasketballacademy.com/rba-court-hero.png"]},
};

export default function Page(){
  return <SiteFrame locale="ja"><GrowthClickTracking/>
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja">← RBA</a>
      <p className="section-index"><CheckCircle2 size={16}/> AFTER APPLICATION</p>
      <h1>申し込みで終わらせない。<br/>今回の経験を、次の成長へ。</h1>
      <p>RBAのクリニック、キャンプ、講習へお申し込みいただいた方へ。申込時と同じメールアドレスでRBA IDを作成すると、今回の参加予定、過去の経験、保存した活動、学びをMY HOME COURTでまとめて確認できます。</p>
      <div className="closing-actions">
        <a className="button button-member" href="/ja/my-homecourt/login?source=after-application&next=%2Fja%2Fmy-homecourt%2Fapp"><House size={17}/>RBA IDをつくる<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/opportunities"><Search size={17}/>次の育成機会を見る<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad" aria-labelledby="application-checklist">
      <div className="section-head"><div><p className="section-index">BEFORE THE CLINIC</p><h2 id="application-checklist">当日までの確認事項</h2></div><p>参加確定は各企画の募集条件とRBAからの案内をご確認ください。無料のRBA IDやnoteへの加入は参加確定の条件ではありません。</p></div>
      <div className="homecourt-preview-grid">
        <article><span>01 / 申込</span><h3>申込内容を確認</h3><p>開催日・参加プラン・保護者のメールアドレスを確認します。送信後の案内が見当たらない時は迷惑メールフォルダもご確認ください。</p></article>
        <article><span>02 / 決済</span><h3>企画ごとの手順で支払う</h3><p>既存の決済案内に従い、入金済みの場合は再決済しないでください。照合後の参加確定連絡をお待ちください。</p></article>
        <article><span>03 / 当日</span><h3>場所・時間・持ち物を確認</h3><p>確定した会場住所、集合・開場時刻、駐車場、持ち物、当日連絡先をRBAからの案内でご確認ください。</p></article>
        <article><span>04 / 不明点</span><h3>不安が残るときは相談</h3><p>開催日と保護者名を添えてお問い合わせください。確認のために再申込や二重決済をする必要はありません。</p><Link className="text-link" href="/ja/contact" data-growth-id="after-application-help">RBAへ問い合わせる <ArrowRight size={16}/></Link></article>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">3 STEPS</p><h2>参加前から、次の成長につなげられます。</h2></div><p>最初からすべて入力する必要はありません。まずはRBA IDを作成し、今回の参加を自分の記録につなげるところから始められます。</p></div>
      <div className="homecourt-preview-grid">
        <article><House/><span>01</span><h3>RBA IDをつくる</h3><p>申込時と同じメールアドレスを使うと、今後の照合や参加履歴の整理がスムーズです。</p><a className="text-link" href="/ja/my-homecourt/login?source=after-application&next=%2Fja%2Fmy-homecourt%2Fapp">RBA IDを作成する <ArrowRight size={16}/></a></article>
        <article><History/><span>02</span><h3>過去の経験を一つ残す</h3><p>以前参加したRBAクリニックでも、最近のバスケ経験でも構いません。Basketball Passportの最初の1件にします。</p><a className="text-link" href="/ja/my-homecourt/participants">参加記録の使い方を見る <ArrowRight size={16}/></a></article>
        <article><Search/><span>03</span><h3>次の挑戦を一つ探す</h3><p>今のチームに所属したまま、地域や所属の外にどんな機会があるかを確認できます。</p><a className="text-link" href="/ja/opportunities">活動を探す <ArrowRight size={16}/></a></article>
        <article><ShieldCheck/><span>SAFE</span><h3>記録は自分のために</h3><p>参加履歴や成長記録は、本人・保護者など権限を持つアカウントを中心に扱います。</p><a className="text-link" href="/ja/policies">安全方針を確認 <ArrowRight size={16}/></a></article>
      </div>
    </section>

    <section className="section-pad"><h2 className="text-2xl font-bold">参加が終わった方へ</h2><p className="my-4 leading-8">気づいたこと、次の練習で試すことを整理する振り返りメモと、保護者の声かけ例を公開しています。登録なしで使えます。</p><a className="text-link" href="/ja/after-clinic">参加後の振り返り・次の機会を探す →</a></section>
    <section className="statement section-pad">
      <p className="section-index">WHY HOME COURT</p>
      <div>
        <h2>一度のクリニックを、<br/>次の成長につなげる。</h2>
        <p>参加した日の経験を、何を感じたか、次に何を試すか、次はどんな環境に触れたいかまでつなげる。それがMY HOME COURTの役割です。</p>
        <a className="text-link" href="/ja/my-homecourt">MY HOME COURTを見る<ArrowRight size={16}/></a>
      </div>
    </section>
  </SiteFrame>;
}
