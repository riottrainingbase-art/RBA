import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EntryForm from "./entry-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "【申込時前金50%】RBA UNITED × GUAM｜神戸男子U14国際育成交流 2027",
  description: "2027年1月神戸・関西で計画中の男子U14国際育成交流。個人・チーム・選抜の有料仮申込。申込時前金50%、受入不可や正式条件に同意できない場合は全額返金。会場未確定。",
  robots: { index: false, follow: false },
};
export default async function Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const query = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from("profiles").select("display_name,role").eq("id",user.id).maybeSingle() : { data: null };
  const adultAccount = profile?.role === "parent" || profile?.role === "coach" || profile?.role === "admin";
  return (
    <main className="min-h-screen bg-[#f6f2e9] text-[#101010]">
      <header className="border-b border-black/20 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="flex items-center gap-3">
            <Image src="/rba-logo-original.jpg" width={46} height={56} alt="RBA公式ロゴ" className="h-14 w-12 object-contain" />
            <span className="text-xs font-black leading-5 tracking-wide">RIOT BASKETBALL<br />ACADEMY</span>
          </Link>
          <Link href="/ja/events/kobe-boys-u14-exchange-2027" className="text-sm font-bold underline underline-offset-4">企画案内に戻る</Link>
        </div>
      </header>
      <section className="border-b-4 border-black bg-[#ff6b13] px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-black tracking-[.2em]">RBA UNITED / JAPAN × GUAM / BOYS U14</p>
          <h1 className="mt-4 text-[clamp(2.3rem,6.8vw,5.3rem)] font-black leading-[1.08]">参加希望を登録して、<br />前金決済へ。</h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8">2027年1月5日〜10日｜グアム選手団来日予定。国内男子U14交流の中心候補日は1月6・7日（神戸・関西エリア）。</p>
          <div className="mt-6 max-w-3xl border-2 border-black bg-white px-5 py-4 text-sm font-bold leading-8">
            <strong>重要：会場・競技時間・国内受入枠・年齢判定基準は未確定です。</strong>
            <p>申込時に税込総額の50％を前金としてお支払いいただく「有料仮申込」です。支払いによって参加確定・選考通過・出場時間を保証するものではありません。</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["01 / APPLY","選手・保護者情報","対象区分と日程を選択し、必要事項を入力"],
            ["02 / DEPOSIT","前金50％を決済","登録番号を保持したまま公式Stripeへ移動"],
            ["03 / REVIEW","開催・受入確認","正式条件を別途案内。残金は承諾後に請求"],
          ].map(([n,t,d])=><div key={n} className="border border-black/25 bg-white p-5"><p className="text-xs font-black tracking-widest text-[#dd5811]">{n}</p><p className="mt-2 text-xl font-black">{t}</p><p className="mt-3 text-sm leading-7">{d}</p></div>)}
        </div>
        <EntryForm initialPlan={["individual_jan6","individual_jan7","individual_both","team_jan6","team_jan7","team_both","selected"].includes(query.plan||"") ? query.plan as "individual_jan6"|"individual_jan7"|"individual_both"|"team_jan6"|"team_jan7"|"team_both"|"selected" : undefined} initialEmail={adultAccount ? user?.email || "" : ""} initialName={adultAccount ? profile?.display_name || "" : ""} />
        <div className="mt-9 space-y-4 border border-black/25 bg-white p-6 text-sm leading-8">
          <h2 className="text-xl font-black">キャンセルと返金について</h2>
          <p>RBA側で会場・受入が確保できない場合、正式条件をご案内した後に参加者が同意できない場合、または選抜不合格の場合は、受領した前金を全額返金します。正式条件提示前に参加者が仮申込を取り下げる場合も前金を全額返金します。</p>
          <p>正式条件確定後の参加者都合による取消・返金条件は、改めて書面で提示し、同意を得た上で適用します。申込時に個人の交通・宿泊などの返金不可予約を行わないでください。交通・宿泊・食事・保険の費用負担は最終条件をご確認ください。</p>
          <p>オーストラリアElite AUS（U11・U13）との大阪近郊の交流は別途協議中であり、この男子U14有料仮申込の対象外です。</p>
          <p>お問合せ：<a className="underline" href="mailto:riot.training.base@gmail.com">riot.training.base@gmail.com</a>　|　<Link href="/ja/policies" className="underline">プライバシーポリシー</Link></p>
        </div>
      </section>
    </main>
  );
}
