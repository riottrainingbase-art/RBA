import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
 title:"RBA UNITED JAPAN｜神戸2027 男子U14選抜プログラム・前金50%仮申込",
 description:"男子U14選抜希望は仮申込時に前金50,000円、総額100,000円。選考不合格・開催不能・正式条件に同意できない場合は全額返金。会場・条件は調整中。",
 robots:{index:false,follow:false},
 alternates:{canonical:"/ja/events/kobe-boys-u14-exchange-2027/united"}
};
const apply="/ja/events/kobe-boys-u14-exchange-2027/apply?plan=selected&source=united";
export default function Page(){
 return <main className="min-h-screen bg-[#f8f3ec] text-black">
 <header className="border-b border-black/20 bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
 <Link className="flex items-center gap-3" href="/ja/events/kobe-boys-u14-exchange-2027"><Image src="/rba-logo-original.jpg" width={45} height={56} alt="RBA公式ロゴ" className="h-14 w-11 object-contain"/><span className="text-xs font-black">RIOT BASKETBALL<br/>ACADEMY</span></Link>
 <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="text-sm font-bold underline">国際交流の概要へ戻る</Link>
 </div></header>
 <section className="bg-[#f2691b] px-5 py-14"><div className="mx-auto max-w-5xl">
 <p className="text-xs font-black tracking-[.2em]">RBA UNITED JAPAN / SELECTED BOYS U14</p>
 <h1 className="mt-4 text-[clamp(2.2rem,6.2vw,4.6rem)] font-black leading-tight">同じコートで、<br/>世界と戦うための準備。</h1>
 <p className="mt-5 text-lg font-black leading-8">2027年1月｜神戸・関西　男子U14選抜育成プログラム</p>
 <p className="mt-4 max-w-3xl text-sm font-bold leading-8">RBA代表・西尾優人がヘッドコーチを担当する日本側の選抜活動。一般交流参加とは別プランです。</p>
 </div></section>
 <section className="mx-auto max-w-5xl px-5 py-12">
 <h2 className="text-3xl font-black">申込時の前金と総額</h2>
 <div className="mt-6 border-2 border-black bg-white p-6">
 <div className="grid gap-4 md:grid-cols-3">{[["税込総額","100,000円"],["仮申込時の前金50%","50,000円"],["正式承諾後の残金","50,000円"]].map(([k,v])=><div key={k}><p className="text-sm font-bold">{k}</p><strong className="mt-2 block text-2xl">{v}</strong></div>)}</div>
 <p className="mt-5 text-sm leading-8">選考希望者は申込時に前金50,000円を支払う有料仮申込です。選考不合格・会場確保不能・主催者都合での開催不能・正式条件に同意できない場合や正式条件提示前の申込撤回は、前金を全額返金します。残金50,000円は正式な受入と条件の同意後、別途請求します。</p>
 </div>
 <div className="mt-6 border-l-4 border-[#f2691b] bg-white p-6 text-sm leading-8"><strong>現時点では、会場・試合時刻・年齢判定基準・選抜条件・提供内容は未確定です。</strong>
 <p>1月5日の日本側事前練習、1月6〜7日のグアムとの交流を計画しています。宿泊・移動・食事の協賛は交渉中であり、無償提供を保証するものではありません。安全体制や保険、最終提供内容を後日説明します。仮申込・入金だけで選考通過や出場時間が決まることはありません。</p></div>
 <Link href={apply} className="mt-7 inline-flex min-h-14 items-center bg-black px-7 py-4 text-base font-black text-white">選抜希望で申込・前金50%へ進む →</Link>
 <p className="mt-5 text-sm">前金決済が停止中の場合は、画面上で受付準備中と表示します。支払済みの方は重複決済せずお問い合わせください。</p>
 <p className="mt-6 text-sm">お問い合わせ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a></p>
 </section>
 </main>;
}