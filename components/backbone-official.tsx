import Link from "next/link";
import { SiteFrame } from "@/components/site-frame";

const application="https://form.jotform.com/262818373047058";
const chiba="/backbone/chiba";

const principles=[
 {number:"01",title:"試合で試す",description:"クリニックで学んだことを、その日の3x3で使ってみます。"},
 {number:"02",title:"自分で判断する",description:"ボールを持つ前に見て、味方や相手の動きに合わせて選びます。"},
 {number:"03",title:"一人ひとりに経験を",description:"経験や技術の違いに配慮し、参加機会を大切にします。"}
];
const organiser=[
 ["会場・設備","体育館の利用許可、コートの安全、準備時間と代替案を確認します。"],
 ["運営体制","現地責任者、受付、試合進行、審判、緊急時の担当を決めます。"],
 ["安全と保護者への案内","参加同意、保険、けがへの対応、写真・動画の使用を確認します。"],
 ["開催要項","対象年代、定員、参加費、競技ルール、申込・キャンセル条件を明記します。"],
 ["費用・役割分担","会場費、運営費、担当業務、精算方法を事前に書面で確認します。"]
];

export function BackboneOfficial(){
 return <SiteFrame locale="ja">
  <div className="bg-[#f4f1eb] text-[#17191b]">
   <div className="mx-auto max-w-[1120px] px-6 sm:px-10">
    <section className="border-b border-[#c9c6c0] py-16 sm:py-24" aria-labelledby="backbone-title">
     <p className="text-xs font-bold tracking-[.17em] text-[#666]">RIOT BASKETBALL ACADEMY / BACKBONE</p>
     <h1 id="backbone-title" className="mt-6 text-[clamp(48px,8vw,105px)] font-black leading-[1.05] tracking-[-.065em]">BACKBONE <span className="text-[#5d6468]">3×3</span></h1>
     <h2 className="mt-7 text-[clamp(23px,3vw,36px)] font-bold leading-snug">練習したことを、試合で試そう。</h2>
     <p className="mt-5 max-w-[750px] text-base leading-8 text-[#4f5658]">BACKBONEは、RBAが地域のチームや指導者と一緒に開催する育成プログラムです。クリニックで学び、3x3で試し、次の練習につなげます。所属チームを変える必要はありません。</p>
     <div className="mt-8 flex flex-wrap gap-3">
      <Link className="inline-flex min-h-12 items-center bg-[#17191b] px-6 py-3 text-sm font-bold text-white" href={chiba}>直近の開催情報を見る ↗</Link>
      <a className="inline-flex min-h-12 items-center border border-[#17191b] px-6 py-3 text-sm font-bold" href="#host">地域開催について相談する ↓</a>
     </div>
    </section>
    <section className="py-14 sm:py-20" aria-labelledby="backbone-about">
     <p className="text-xs font-bold tracking-[.17em] text-[#686d6c]">ABOUT</p>
     <h2 id="backbone-about" className="mt-3 text-3xl font-bold">BACKBONEで大切にしていること</h2>
     <div className="mt-8 grid gap-4 sm:grid-cols-3">{principles.map(item=><article key={item.number} className="border-t border-[#aeb1ad] py-5"><span className="text-sm font-bold text-[#666]">{item.number}</span><h3 className="mt-4 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#535b5a]">{item.description}</p></article>)}</div>
     <p className="mt-7 max-w-[780px] text-sm leading-7 text-[#535b5a]">対象年代や試合の進め方は、各会場の人数・経験・安全面を考慮して決めます。大会の勝敗だけでなく、一人ひとりがプレーする機会を大切にします。</p>
    </section>
    <section className="border-t border-[#c9c6c0] py-14 sm:py-20" aria-labelledby="backbone-format">
     <p className="text-xs font-bold tracking-[.17em] text-[#686d6c]">PROGRAMME</p>
     <h2 id="backbone-format" className="mt-3 text-3xl font-bold">クリニックと3x3を、一日で。</h2>
     <div className="mt-8 grid gap-5 sm:grid-cols-2">
      <div className="border border-[#c9c6c0] bg-white p-6 sm:p-8"><span className="text-xs font-bold text-[#666]">STEP 01</span><h3 className="mt-3 text-2xl font-bold">クリニック</h3><p className="mt-3 text-sm leading-7 text-[#535b5a]">基本技術、スペーシング、相手を見て判断する練習などを、参加者の年代に合わせて行います。</p></div>
      <div className="border border-[#c9c6c0] bg-white p-6 sm:p-8"><span className="text-xs font-bold text-[#666]">STEP 02</span><h3 className="mt-3 text-2xl font-bold">3x3ゲーム</h3><p className="mt-3 text-sm leading-7 text-[#535b5a]">学んだことを実際のプレーで試します。ゲームの編成・試合時間・ルールは開催要項をご確認ください。</p></div>
     </div>
    </section>
    <section className="border-t border-[#c9c6c0] py-14 sm:py-20" aria-labelledby="backbone-next">
     <p className="text-xs font-bold tracking-[.17em] text-[#686d6c]">NEXT EVENT</p>
     <h2 id="backbone-next" className="mt-3 text-3xl font-bold">千葉 CHAPTER｜10月25日（日）</h2>
     <p className="mt-4 max-w-[770px] text-sm leading-8 text-[#535b5a]">2026年10月25日、千葉県神崎町で開催予定。午前は育成クリニック、午後は3x3ゲームです。個人参加も歓迎しています。</p>
     <div className="mt-6 grid gap-3 border-y border-[#c9c6c0] py-5 text-sm sm:grid-cols-3"><div><b>時間</b><p className="mt-1">9:00〜16:00</p></div><div><b>対象</b><p className="mt-1">小学1年生〜中学3年生</p></div><div><b>参加費</b><p className="mt-1">6,600円（税込）</p></div></div>
     <p className="mt-4 text-xs leading-6 text-[#666]">日程・会場・料金・申込状況は開催ページの最新案内をご確認ください。参加費は全会場共通ではありません。</p>
     <Link href={chiba} className="mt-5 inline-flex min-h-12 items-center border-b-2 border-[#17191b] text-sm font-bold">千葉開催の詳細・申込を見る ↗</Link>
     <p className="mt-5 text-sm text-[#535b5a]">ほかの地域の開催情報は <Link href="/ja/opportunities" className="font-bold underline underline-offset-4">RBA活動一覧</Link> からご確認ください。</p>
    </section>
    <section className="border-t border-[#c9c6c0] py-14 sm:py-20" id="host" aria-labelledby="backbone-host">
     <p className="text-xs font-bold tracking-[.17em] text-[#686d6c]">FOR ORGANISERS</p>
     <h2 id="backbone-host" className="mt-3 text-3xl font-bold">あなたの地域でも開催できます。</h2>
     <p className="mt-4 max-w-[790px] text-sm leading-8 text-[#535b5a]">体育館の確保や地域の運営を担ってくださる方と、開催方法を相談しています。最初からすべてが決まっている必要はありません。まずは開催したい地域や時期を教えてください。</p>
     <div className="mt-7 grid gap-3 sm:grid-cols-2">{organiser.map(([title,description])=><article className="border-t border-[#c9c6c0] py-4" key={title}><h3 className="text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-7 text-[#535b5a]">{description}</p></article>)}</div>
     <div className="mt-7 border-l-4 border-[#17191b] bg-white p-6"><p className="text-sm leading-7">お問い合わせ後に、役割分担や必要な費用、開催条件を個別に確認します。送信だけで開催や契約が決まることはありません。</p><a className="mt-5 inline-flex min-h-12 items-center bg-[#17191b] px-6 py-3 text-sm font-bold text-white" href={application} target="_blank" rel="noopener noreferrer">地域開催について問い合わせる ↗</a><p className="mt-3 text-xs text-[#666]">※選手の参加申込ではなく、主催・共催を希望する方向けのフォームです。</p></div>
    </section>
    <section className="border-t border-[#c9c6c0] py-12"><h2 className="text-2xl font-bold">BACKBONEの活動を見る</h2><p className="mt-3 text-sm leading-7 text-[#535b5a]">各地域での活動の様子は公式Instagramで紹介しています。写真・動画は掲載許可が確認できたものをご覧ください。</p><a href="https://www.instagram.com/backbone3x3/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center border-b border-[#17191b] text-sm font-bold">BACKBONE公式Instagram ↗</a></section>
   </div>
  </div>
 </SiteFrame>;
}
