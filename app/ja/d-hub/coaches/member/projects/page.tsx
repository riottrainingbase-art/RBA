import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BadgeJapaneseYen, BriefcaseBusiness, ExternalLink, Handshake, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "D-HUB PROJECTS | COACH LAB MEMBER" },
  robots: { index: false, follow: false },
};

const BAND_URL="https://band.us/n/aaa2bdj9xcJ1o";
const LINE_URL="https://lin.ee/5l1YG8N";

const lanes=[
  {tag:"ON COURT",title:"クリニック・キャンプの指導 / アシスタント",body:"RBA主催・連携企画で、年代、テーマ、経験、地域が合うメンバーへ声をかけます。"},
  {tag:"TEAM SUPPORT",title:"チーム練習・育成支援",body:"地域クラブやチームから依頼があった際、練習設計、オンコート支援、映像レビュー等を案件ごとに組みます。"},
  {tag:"REGIONAL",title:"地域開催・現地コーディネート",body:"会場、地域チーム、参加者との調整など、RBAの地域開催を支える役割です。"},
  {tag:"INTERNATIONAL",title:"国際交流・RBA UNITED運営",body:"海外チームとの交流、国内受入、国際大会などで、語学・運営・指導経験が合う人へ個別に相談します。"},
  {tag:"PERFORMANCE",title:"S&C・身体づくり支援",body:"必要な資格・経験・安全基準を確認した上で、S&Cや身体準備に関する案件をつなぎます。"},
  {tag:"OPERATIONS",title:"運営・翻訳・記録・イベント支援",body:"指導以外にも、受付、進行、通訳、撮影補助、レポート等、企画を成立させる仕事があります。"},
] as const;

export default async function Page(){
  const supabase=await createClient();
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/ja/my-homecourt/login?next=%2Fja%2Fd-hub%2Fcoaches%2Fmember%2Fprojects");
  const {data:hasAccess}=await supabase.rpc("has_dhub_coach_access");
  if(!hasAccess)redirect("/ja/d-hub/coaches/member");

  return <SiteFrame locale="ja" languagePage="d-hub">
    <main className="dhub-member-page">
      <section className="dhub-member-hero section-pad">
        <BriefcaseBusiness size={42}/>
        <p className="section-index">D-HUB COACH LAB / PROJECTS</p>
        <h1>学ぶだけでなく、<br/>実際の現場へつなぐ。</h1>
        <p>D-HUB PROJECTSは、RBAに届くクリニック、チーム支援、地域開催、国際交流などの依頼を、条件の合うCOACH LABメンバーへつなぐための仕組みです。案件獲得を保証する会員特典ではなく、学びと実務がつながるネットワークとして運用します。</p>
        <div className="dhub-member-actions">
          <a className="button button-member" href={BAND_URL} target="_blank" rel="noreferrer">案件・募集連絡をBANDで確認 <ExternalLink size={16}/></a>
          <a className="button button-light" href={LINE_URL} target="_blank" rel="noreferrer"><MessageCircle size={16}/>RBAに相談する</a>
        </div>
      </section>

      <section className="dhub-member-section section-pad">
        <div className="section-head"><div><p className="section-index">HOW PROJECTS MOVE</p><h2>案件は、条件を決めてから募集します。</h2></div><p>「とりあえず来てください」「経験になるので無償で」といった曖昧な募集にしません。</p></div>
        <div className="dhub-member-grid">
          <article><Handshake/><span>01 / REQUEST</span><h3>RBAが依頼を整理</h3><p>目的、対象年代、場所、日程、役割、必要スキル、責任範囲を依頼者と確認します。</p></article>
          <article><BadgeJapaneseYen/><span>02 / TERMS</span><h3>報酬・実費を先に提示</h3><p>報酬、交通・宿泊等の扱い、拘束時間、キャンセル条件を分かる範囲で募集前に明示します。</p></article>
          <article><Users/><span>03 / MATCH</span><h3>適性で声をかける</h3><p>肩書きだけでなく、年代経験、地域、専門性、D-HUBでの実践、安全面を見て相談します。</p></article>
          <article><ShieldCheck/><span>04 / DELIVER</span><h3>RBA基準で実施</h3><p>役割と安全管理を確認し、必要に応じて事前打合せ、実施、振り返りまで行います。</p></article>
        </div>
      </section>

      <section className="dhub-curriculum section-pad">
        <div className="section-head"><div><p className="section-index">PROJECT LANES</p><h2>回したい案件は、指導だけではありません。</h2></div><p>地域・年代・専門性が違うからこそ、D-HUB内に複数の仕事の入口をつくります。</p></div>
        <div className="dhub-curriculum-groups">
          {lanes.map((lane,index)=><section key={lane.tag}>
            <header><span>{String(index+1).padStart(2,"0")} / {lane.tag}</span><h3>{lane.title}</h3></header>
            <div><p>{lane.body}</p></div>
          </section>)}
        </div>
      </section>

      <section className="dhub-member-section dhub-member-dark section-pad">
        <div className="section-head"><div><p className="section-index inverse">BUSINESS MODEL</p><h2>メンバーから仕事代を取る仕組みにはしません。</h2></div><p>基本は、依頼者がRBAへ案件費用を支払い、RBAが企画・調整・品質管理を行い、担当メンバーには事前に合意した報酬を支払う形を目指します。</p></div>
        <div className="dhub-member-value">
          <div><span>CLIENT</span><strong>PROJECT FEE</strong><p>依頼内容に応じた指導・運営・調整費をRBAへ。</p></div>
          <div><span>RBA</span><strong>COORDINATE</strong><p>要件整理、見積、契約、連絡、安全管理、品質確認。</p></div>
          <div><span>MEMBER</span><strong>PAID ROLE</strong><p>役割と条件に合意したうえで実務を担当。</p></div>
          <div><span>AFTER</span><strong>REVIEW</strong><p>案件後に振り返り、次の改善と信頼につなげる。</p></div>
        </div>
      </section>

      <section className="homecourt-plan-separation section-pad">
        <div className="homecourt-plan-intro"><p className="section-index">OPERATING RULES</p><h2>「案件が欲しいから入会する」だけの場にはしない。</h2><p>D-HUB会費は仕事紹介料ではありません。案件数・収入・採用を保証せず、仕事のために追加課金を求めることもしません。案件ごとに必要条件と適性を確認します。</p></div>
        <div className="homecourt-plan-grid">
          <article className="homecourt-plan-card"><span>NO GUARANTEE</span><h3>案件・収入を保証しない</h3><p>メンバーであることだけを理由に仕事が発生するわけではありません。地域、日程、経験、役割との適合を優先します。</p></article>
          <article className="homecourt-plan-card"><span>NO PAY-TO-WORK</span><h3>仕事を得るための追加課金なし</h3><p>案件応募権や優先順位を有料オプションとして販売しません。</p></article>
          <article className="homecourt-plan-card"><span>SAFEGUARDING</span><h3>子どもの安全を最優先</h3><p>未成年に関わる役割は、必要な本人確認、資格・経験、役割分担、安全方針を案件ごとに確認します。</p></article>
          <article className="homecourt-plan-card"><span>TRANSPARENT TERMS</span><h3>条件を曖昧にしない</h3><p>報酬・実費・時間・業務内容を、担当決定前に共有する運用を基本にします。</p></article>
        </div>
      </section>

      <section className="dhub-next-lesson section-pad">
        <div><p className="section-index">MEMBER → PROJECT</p><h2>自分ができることも、D-HUB内で共有してください。</h2><p>活動地域、対象年代、得意領域、保有資格、語学、遠征可否などをBANDで共有しておくと、RBA側で案件との適合を判断しやすくなります。</p></div>
        <div className="dhub-next-card"><span>D-HUB BAND</span><p>案件募集・協力依頼・地域情報はBANDを一次連絡先として使い、正式条件は個別に確認します。</p><a className="button button-member" href={BAND_URL} target="_blank" rel="noreferrer">BANDを開く <ExternalLink size={16}/></a></div>
      </section>

      <section className="dhub-member-section section-pad">
        <div className="section-head"><div><p className="section-index">BRING A PROJECT</p><h2>メンバー側から地域案件を持ち込むこともできます。</h2></div><p>「自チームで研修したい」「地域でCampを開きたい」「指導者講習を企画したい」など、メンバーが現場で見つけたニーズをRBAと一緒に案件化します。</p></div>
        <div className="dhub-member-actions">
          <a className="button button-dark" href={LINE_URL} target="_blank" rel="noreferrer"><MessageCircle size={16}/>案件をRBAに相談</a>
          <Link className="button button-light" href="/ja/work-with-rba">RBAの実施メニューを見る <ArrowRight size={16}/></Link>
        </div>
      </section>
    </main>
  </SiteFrame>;
}
