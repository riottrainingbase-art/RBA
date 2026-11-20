import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, CircleHelp, ShieldCheck, Users, Wallet } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { isRizehopeUnitedIndividualPaymentReady, rizehopeProject } from "@/lib/rizehope-2027";

export const metadata: Metadata={
  title:"RBA UNITED｜RIZEHOPE JAPAN 2027｜U12個人参加と前金案内",
  description:"全国のU12選手が所属を変えずに参加を検討できるRBA UNITED。無料先行登録、編成条件、保護者同意、前金・残金の流れを案内します。",
};

const stages=[
  ["01","保護者から無料参加意向登録","本人の所属クラブはそのままで構いません。無料登録は選考合格・出場・入金の確約ではありません。"],
  ["02","年齢と指導・安全体制の確認","大会のU12年齢条件、希望者数、指導者・引率者、保険・救護・休息・保護者同意を確認します。"],
  ["03","チーム編成と大会枠の確認","国内、海外、RBA UNITEDを合わせて最大10チーム。RBA UNITEDに優先確保枠はありません。"],
  ["04","正式な個人負担額と規約の提示","個人参加総額、前金、残金、交通宿泊などの別途費用、返金規約、残金期限と徴収主体を文書で提示します。"],
  ["05","合意・承認後の前金案内","個別の選考と参加規約を確認した保護者にのみ支払案内を行い、参加費への充当額を示します。"],
  ["06","入金照合後に最終参加を確定","同じ選手への二重請求を防止。残金入金と保護者同意を照合し、決定事項を個別に通知します。"],
] as const;

export default function RizehopeUnitedPage(){
  const p=rizehopeProject.unitedIndividual;
  const ready=isRizehopeUnitedIndividualPaymentReady();
  return <SiteFrame locale="ja" languagePage="international">
    <main className="bg-[#f8f7f4] text-[#171717]">
      <section className="border-b-8 border-[#f57929] bg-[#111] px-5 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-[.15em] text-[#ff924e]">RIZEHOPE JAPAN 2027 / RBA UNITED U12</p>
          <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">所属はそのまま。<br/><span className="text-[#ff8a35]">東北で、世界と挑戦する。</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-white/85">RBA UNITEDは、全国のクラブから選手を募る期間限定の育成チーム構想です。試合の中で見る・考える・選ぶ機会を、普段とは異なる仲間や対戦相手との交流からつくります。</p>
          <p className="mt-7 text-sm leading-8"><strong>2027年2月27日（土）・28日（日）</strong>　宮城県柴田町総合体育館／会場2日間の予約・入場演出許可は取得済み</p>
          <a href={p.freeInterestForm} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center gap-2 bg-[#ff8a35] px-6 py-4 font-black text-black">保護者から無料で参加意向を登録 <ArrowRight size={18}/></a>
          <p className="mt-4 max-w-3xl text-xs leading-7 text-white/70">RBA UNITEDのチーム編成、出場、個人参加費、前金・残金は未確定です。無料登録に支払義務や参加枠確保はありません。</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="border-t-4 border-[#f57929] bg-white p-6"><CheckCircle2 size={28}/><h2 className="mt-3 text-2xl font-black">確認できていること</h2><p className="mt-4 text-sm leading-8">大会予定日と会場の2日間予約、大会・入場演出の許可、保護者向け無料登録窓口。所属チームを変えずに参加を検討できます。</p></article>
          <article className="border-t-4 border-neutral-500 bg-white p-6"><CircleHelp size={28}/><h2 className="mt-3 text-2xl font-black">まだ調整中のこと</h2><p className="mt-4 text-sm leading-8">出場チーム、U12年齢資格、競技規定、RBA UNITEDの選手と指導者の人数、保険・救護、参加費とキャンセル・返金条件。</p></article>
        </div>
      </section>
      <section className="bg-white px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-widest text-[#bc591b]">APPLICATION / ACCEPTANCE / DEPOSIT</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">無料申込から、正式参加・前金・残金まで</h2>
          <p className="mt-5 max-w-4xl leading-8 text-neutral-700">「行ってみたい」という気持ちと、費用を伴う正式な契約を分けます。支払いだけで選考や出場が決まることはありません。</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">{stages.map(([no,title,description])=><li key={no} className="border border-neutral-200 bg-[#faf8f5] p-6"><span className="text-3xl font-black text-[#bd5b1e]">{no}</span><h3 className="mt-3 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-8 text-neutral-700">{description}</p></li>)}</ol>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-5 border-l-4 border-[#f57929] bg-[#fff0e5] p-6 sm:flex-row">
          <Users size={34} className="shrink-0"/>
          <div><h2 className="text-xl font-black">国内U12チームの66,000円は、選手個人の参加費ではありません。</h2>
          <p className="mt-4 text-sm leading-8">国内の一般チームは2日間・1チーム66,000円（税込）の参加費案です。RBA UNITEDの選手1名については、2日間の価格を通常24,800円・先行優待22,000円、前金はいずれも10,000円として再試算しています。先行の適用条件・人数・締切、正式価格・税込表示・決済開始は未確定です。これらを混同して請求しません。</p></div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="border border-neutral-200 bg-white p-6">
          <p className="text-xs font-black tracking-widest text-[#b95c1e]">INTERNAL COST MODEL / PROVISIONAL</p>
          <h2 className="mt-3 text-2xl font-black">RBA UNITED｜新しい料金プラン案</h2>
          <p className="mt-3 text-sm leading-8 text-neutral-700">保護者の負担を抑えるため、旧36,000円の試算を見直しました。以下は税込を想定した<strong>未確定の料金提案</strong>です。無料参加意向登録の段階では請求されません。</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-t-4 border-[#f57929] bg-[#fff5eb] p-5">
              <p className="text-xs font-black tracking-widest text-[#a04a19]">EARLY INTEREST / PROPOSED</p>
              <h3 className="mt-2 text-lg font-black">先行優待価格案</h3>
              <p className="mt-2 text-4xl font-black">22,000円</p>
              <p className="mt-3 text-sm leading-8">前金10,000円 ＋ 残金12,000円<br/>前金は総額の一部です。</p>
            </div>
            <div className="border-t-4 border-neutral-600 bg-[#f7f7f7] p-5">
              <p className="text-xs font-black tracking-widest text-neutral-600">REGULAR / PROPOSED</p>
              <h3 className="mt-2 text-lg font-black">通常価格案</h3>
              <p className="mt-2 text-4xl font-black">24,800円</p>
              <p className="mt-3 text-sm leading-8">前金10,000円 ＋ 残金14,800円<br/>前金は総額の一部です。</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-8 text-neutral-700">先行優待の対象・期限・人数は決まっていません。2日間の指導・チーム編成・大会参加費の配分を試算している段階で、交通・宿泊・食事は各家庭が別に負担する想定です。正式な出場条件・安全体制・徴収主体・税務・返金規約が確定するまで、前金を含む決済は行いません。</p>
        </div>
      </section>
      <section className="bg-[#161616] px-5 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black tracking-widest text-[#ff8a35]">PAYMENT / SAFEGUARDED RELEASE</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">前金決済は、選考と条件確認が終わってから。</h2>
          {ready?<p className="mt-7 border-l-4 border-[#ff8a35] bg-white/10 p-6">選考・条件同意済みの保護者に限り、個別の決済案内をお送りします。一般公開の支払リンクはありません。</p>:<div className="mt-7 border-l-4 border-[#ff8a35] bg-white/10 p-6"><Wallet size={30}/><p className="mt-4 text-xl font-black">現在、個人向けの前金・残金決済は受付していません。</p><p className="mt-3 text-sm leading-8 text-white/80">参加費、主催・徴収主体、返金規約、参加資格、入金照合が確定した後に、正式承認者へ個別に案内します。未確定の価格でStripeリンクを公開しません。</p></div>}
          <p className="mt-6 flex items-start gap-3 text-sm leading-8 text-white/75"><ShieldCheck className="shrink-0 text-[#ff8a35]" size={24}/>未成年者の参加には保護者同意と安全体制の確認が必要です。交通・宿泊などの旅行手配は別途、適切な契約主体と確認します。</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-3xl font-black">まずは、挑戦してみたい気持ちを教えてください。</h2>
        <p className="mt-4 max-w-3xl leading-8">保護者の方が無料で登録できます。今のチームを辞める必要も、費用を支払う必要もありません。正式なチーム編成ができるかを一つずつ確認していきます。</p>
        <a href={p.freeInterestForm} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center gap-2 bg-[#ff822e] px-7 py-4 font-black text-black">RBA UNITED 無料参加意向フォーム <ArrowRight size={17}/></a>
        <p className="mt-5 text-sm">お問い合わせ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
      </section>
    </main>
  </SiteFrame>;
}
