import type { Metadata } from "next";
import Image from "next/image";
import { SiteFrame } from "@/components/site-frame";
import { unitedLinks, unitedPortfolio, unitedProjects, unitedReleaseGates } from "@/lib/united-system";

const canonical = "https://riotbasketballacademy.com/ja/united";
export const metadata: Metadata = {
  title:"RBA UNITED｜仲間を全国へ、挑戦を世界へ｜Riot Basketball Academy",
  description:"RBA UNITEDは所属チームの移籍を前提とせず、初対面の仲間と交流・試合・国際交流に挑戦する期間限定の育成ネットワーク。保護者向けの無料参加意向受付。",
  alternates:{canonical},
  openGraph:{title:"RBA UNITED｜仲間を全国へ。挑戦を世界へ。",description:"所属はそのまま。クリニックで出会い、キャンプで仲良くなり、UNITEDで新しい試合に挑戦する。",url:canonical,type:"website",locale:"ja_JP",images:["/rba-logo-original.jpg"]},
};

const journey = [
  ["01","MEET","クリニックで出会う","いつものチームとは違う考え方、選手、指導者に出会う。"],
  ["02","CONNECT","キャンプで仲間になる","一緒に練習し、食事や振り返りの時間を共有する。宿泊は企画ごとの条件に従います。"],
  ["03","PLAY","UNITEDで試合する","期間限定の合同編成。大会・交流戦の資格や選考は企画ごとに確認します。"],
  ["04","GROW","日常に持ち帰る","所属先に戻っても学びが続く。MY HOME COURTに記録して次へ。"],
] as const;

export default function UnitedJapanPage(){
  return <SiteFrame locale="ja">
  <main className="bg-[#f6f3ec] text-[#161616]">
    <header className="bg-[#ff7627] px-5 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4 border-b-4 border-black pb-4">
          <a href="/ja" className="inline-flex items-center gap-3 font-black">
            <Image src="/rba-logo-original.jpg" width={38} height={50} alt="RBA公式ロゴ"/>
            <span className="text-xs tracking-[.1em]">RIOT BASKETBALL ACADEMY</span>
          </a>
          <span className="text-xs font-black">RBA / UNITED 2027</span>
        </div>
        <p className="mt-12 text-sm font-black">所属チームの枠を越えて、次のコートへ。</p>
        <h1 className="mt-4 text-[clamp(3.8rem,11vw,9rem)] font-black leading-[.94] tracking-[-.055em]">RBA<br/>UNITED<span className="text-white">.</span></h1>
        <p className="mt-7 max-w-4xl border-y-4 border-black py-5 text-xl font-black leading-9 sm:text-3xl">クリニックで知り合う。<br/>一緒に過ごし、仲間になる。<br/>そして、試合する。</p>
        <p className="mt-6 max-w-3xl text-base font-bold leading-8">RBA UNITEDは、子どもが現在の所属先を変えることなく、全国・海外の仲間と期間限定で活動するための育成ネットワークです。選手の技術だけでなく、仲間・判断・挑戦・自立の経験を大切にします。</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={unitedLinks.parentInterest} className="inline-flex min-h-14 items-center bg-black px-7 py-4 text-center font-black text-white" target="_blank" rel="noopener noreferrer">保護者向け無料参加希望登録 ↗</a>
          <a href="#united-projects" className="inline-flex min-h-14 items-center border-2 border-black bg-white px-7 py-4 font-black">予定・企画を見る ↓</a>
        </div>
        <p className="mt-4 max-w-3xl text-xs font-semibold leading-6">※無料登録は参加申込・選考通過・航空券や宿泊の予約・決済ではありません。未成年者のため、保護者の方からご登録ください。</p>
      </div>
    </header>

    <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <p className="text-xs font-black tracking-widest text-[#af5016]">OUR DEVELOPMENT PATHWAY</p>
      <h2 className="mt-3 text-3xl font-black sm:text-4xl">出会って、つながって、挑戦する。</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {journey.map(([num,tag,title,body])=><article key={num} className="border-2 border-black bg-white p-5">
          <div className="flex items-start justify-between border-b-2 border-black pb-3"><span className="text-3xl font-black">{num}</span><span className="text-xs font-black text-[#aa4c17]">{tag}</span></div>
          <h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7">{body}</p>
        </article>)}
      </div>
    </section>

    <section className="bg-[#151515] px-5 py-14 text-white sm:py-20" id="united-system">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black tracking-widest text-[#ffaf80]">ONE RBA ECOSYSTEM / CLEAR CONTRACTS</p>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">6つのサービスを、正しくつなぐ。</h2>
        <p className="mt-4 max-w-4xl leading-8 text-white/80">CLINIC、DEVELOPMENT CAMP、UNITED、RIZEHOPE、MY HOME COURT、TEAMWEAR。それぞれ役割を分け、申込・会計・契約・権利は混同しません。</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {unitedPortfolio.map(p=><article key={p.code} className="border border-white/30 bg-[#222] p-6">
            <div className="flex flex-wrap justify-between gap-3 text-xs font-black text-[#ffaf80]"><span>{p.code}</span><span className="border border-white/40 px-2 py-1 text-white">{p.status}</span></div>
            <h3 className="mt-3 text-xl font-black">{p.title}</h3>
            <p className="mt-2 text-base font-bold">{p.role}</p>
            <p className="mt-3 text-sm leading-7 text-white/75">{p.detail}</p>
            <p className="mt-4 border-t border-white/20 pt-4 text-sm leading-7"><strong>料金・会計：</strong>{p.fee}</p>
            <a href={p.href} className="mt-3 inline-block text-sm font-black underline underline-offset-4">公式案内を見る ↗</a>
          </article>)}
        </div>
        <p className="mt-6 border-l-4 border-[#ff7627] pl-4 text-sm leading-7">既存企画の金額は各企画だけの価格です。UNITED個人参加の新料金や、海外遠征・ユニフォームの販売価格を示すものではありません。</p>
      </div>
    </section>

    <section id="united-projects" className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
      <p className="text-xs font-black tracking-widest text-[#af5016]">UNITED PROJECTS</p>
      <h2 className="mt-3 text-3xl font-black sm:text-4xl">開催実績と、これからの交流。</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7">準備段階の大会・交流は、日程・対戦・会場・選考・費用を正式に確認してから販売します。個人参加資格は毎回異なります。</p>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {unitedProjects.map(p=><article key={p.code} className="flex flex-col border-2 border-black bg-white p-6">
          <div className="flex flex-wrap gap-2 text-xs font-black"><span className="bg-[#ff7627] px-2 py-1">{p.age}</span><span className="border border-black/40 px-2 py-1">{p.status}</span></div>
          <h3 className="mt-4 text-xl font-black">{p.title}</h3><p className="mt-2 text-sm font-bold">{p.date}</p>
          <p className="mt-4 flex-1 text-sm leading-7">{p.note}</p>
          <a href={p.url} target={p.url.startsWith("https")?"_blank":undefined} rel={p.url.startsWith("https")?"noopener noreferrer":undefined} className="mt-5 inline-flex min-h-12 items-center self-start border-2 border-black bg-[#ff7627] px-4 text-sm font-black">{p.cta} ↗</a>
        </article>)}
      </div>
    </section>

    <section className="bg-white px-5 py-14 sm:py-20" id="safety">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black tracking-widest text-[#af5016]">TRUST / SAFETY / TRANSPARENCY</p>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">子どもの挑戦を、安心して任せられるように。</h2>
        <p className="mt-4 max-w-4xl leading-8">遠征の楽しさだけでなく、施設・宿泊・送迎・食事・引率・危機管理・返金まで、すべてが商品品質です。販売前に次の8項目を確かめます。</p>
        <ol className="mt-7 grid gap-3 md:grid-cols-2">
          {unitedReleaseGates.map((gate,i)=><li key={i} className="flex gap-3 border border-black/15 bg-[#faf6ee] p-4 text-sm font-semibold leading-7"><strong className="text-[#a34b19]">{String(i+1).padStart(2,"0")}</strong>{gate}</li>)}
        </ol>
        <p className="mt-6 text-sm leading-7">JBAの公式大会における登録・移籍と、独立した交流活動は別です。また、有償で旅行業務に当たる手配を行う場合は、適法な登録旅行業者との契約を前提にします。</p>
      </div>
    </section>

    <section className="bg-[#ff7627] px-5 py-14 sm:py-20" id="partners">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black tracking-widest">PARTNERS / UNIFORMS / VENUES</p>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">企業・地域・施設と、育成環境をつくる。</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <article className="border-2 border-black bg-white p-5"><h3 className="text-xl font-black">施設・地域協力</h3><p className="mt-3 text-sm leading-7">体育館・宿泊施設・地域開催の協力。利用規約と有償開催の許可を事前に確認します。</p><a href="/ja/clinic-request" className="mt-5 inline-block font-black underline">開催相談 ↗</a></article>
          <article className="border-2 border-black bg-white p-5"><h3 className="text-xl font-black">企業スポンサー</h3><p className="mt-3 text-sm leading-7">参加費支援、用具、移動支援、安全運営への協力。月額11,000円の広告とは別契約で、使途と露出を明示します。</p><a href={unitedLinks.partnerInquiry} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-black underline">企業協賛の相談 ↗</a></article>
          <article className="border-2 border-black bg-white p-5"><h3 className="text-xl font-black">OFFICIAL GAME KIT</h3><p className="mt-3 text-sm leading-7">RBA UNITED競技用リバーシブルを試作準備中。製造・価格・サイズ・競技規定を確認するまでは販売しません。</p><a href={unitedLinks.store} className="mt-5 inline-block font-black underline">公式ウェア案内 ↗</a></article>
        </div>
        <div className="mt-8 flex flex-wrap gap-3"><a href={unitedLinks.parentInterest} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center bg-black px-7 py-4 font-black text-white">保護者から無料で希望登録 ↗</a><a href={unitedLinks.myHomecourt} className="inline-flex min-h-14 items-center border-2 border-black bg-white px-7 py-4 font-black">MY HOME COURTへ ↗</a></div>
        <p className="mt-5 max-w-4xl text-sm font-bold leading-7">スポンサーへの選手情報の提供や、本人の意思に反する宣伝出演は行いません。協賛実績・施設提携・販売開始は書面の事実確認後に案内します。</p>
      </div>
    </section>
  </main>
  </SiteFrame>;
}
