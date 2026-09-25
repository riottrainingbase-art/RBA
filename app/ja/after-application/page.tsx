import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, History, House, Search, ShieldCheck } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata:Metadata={
  title:"申込後の次の一歩｜RBA ID・MY HOME COURT",
  description:"RBAのクリニック・キャンプへ申し込んだ後は、同じメールアドレスでRBA IDを作成し、参加予定・記録・次の育成機会をMY HOME COURTにつなげられます。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/after-application"},
  robots:{index:true,follow:true},
  openGraph:{
    title:"申込で終わらせない。次の成長へ｜RBA",
    description:"RBA IDを無料で作成し、今回の参加をMY HOME COURTにつなげる。",
    url:"https://riotbasketballacademy.com/ja/after-application",
    siteName:"Riot Basketball Academy",
    locale:"ja_JP",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"],
  },
  twitter:{card:"summary_large_image",title:"申込で終わらせない。次の成長へ｜RBA",description:"RBA IDを無料で作成し、今回の参加をMY HOME COURTにつなげる。",images:["https://riotbasketballacademy.com/rba-court-hero.png"]},
};

export default function Page(){
  return <SiteFrame locale="ja">
    <section className="inner-hero section-pad">
      <a className="back-link" href="/ja">← RBA</a>
      <p className="section-index"><CheckCircle2 size={16}/> AFTER APPLICATION</p>
      <h1>申込で終わらせない。<br/>今回の挑戦を、次の成長へ。</h1>
      <p>RBAのクリニック・キャンプ・講習へお申し込みいただいた方へ。申込時に使ったメールアドレスでRBA IDを作成すると、今回の参加予定、過去の経験、保存した活動、学びをMY HOME COURTにまとめていけます。</p>
      <div className="closing-actions">
        <a className="button button-member" href="/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp"><House size={17}/>RBA IDを無料でつくる<ArrowRight size={17}/></a>
        <a className="button button-dark" href="/ja/opportunities"><Search size={17}/>次の育成機会を見る<ArrowRight size={17}/></a>
      </div>
    </section>

    <section className="homecourt-product-preview section-pad">
      <div className="section-head"><div><p className="section-index">3 STEPS</p><h2>参加前から、成長は始められます。</h2></div><p>全部入力する必要はありません。まずはRBA IDをつくり、今回の参加を自分の育成履歴につなげるところから始めてください。</p></div>
      <div className="homecourt-preview-grid">
        <article><House/><span>01</span><h3>RBA IDをつくる</h3><p>申込時と同じメールアドレスを使うと、今後の照合や参加履歴の整理がスムーズです。</p><a className="text-link" href="/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp">無料で作成する <ArrowRight size={16}/></a></article>
        <article><History/><span>02</span><h3>過去の経験を一つ残す</h3><p>以前参加したRBAクリニックでも、最近のバスケ経験でも構いません。Basketball Passportの最初の1件にします。</p><a className="text-link" href="/ja/my-homecourt/participants">参加記録の使い方を見る <ArrowRight size={16}/></a></article>
        <article><Search/><span>03</span><h3>次の挑戦を一つ見る</h3><p>今いるチームを続けながら、地域や所属の外にもどんな機会があるかを見ておく。</p><a className="text-link" href="/ja/opportunities">活動を探す <ArrowRight size={16}/></a></article>
        <article><ShieldCheck/><span>SAFE</span><h3>記録は自分のために</h3><p>参加履歴や成長記録は、本人・保護者など権限を持つアカウントを中心に扱います。</p><a className="text-link" href="/ja/policies">安全方針を確認 <ArrowRight size={16}/></a></article>
      </div>
    </section>

    <section className="statement section-pad">
      <p className="section-index">WHY HOME COURT</p>
      <div>
        <h2>一回のクリニックを、<br/>一回で終わらせない。</h2>
        <p>参加した日だけ上手くなるのではなく、何を感じたか、次に何を試すか、次はどんな環境に触れるかまでつなぐ。それがMY HOME COURTの役割です。</p>
        <a className="text-link" href="/ja/my-homecourt">MY HOME COURTを見る<ArrowRight size={16}/></a>
      </div>
    </section>
  </SiteFrame>;
}
