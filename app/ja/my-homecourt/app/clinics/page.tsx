import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MemberClinicCatalog } from "@/components/member-clinic-catalog";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "全クリニック・キャンプ｜申込・決済｜MY HOME COURT",
  description: "RBAのクリニック、スクール、キャンプ、オンライン講習、国際交流の参加窓口をMY HOME COURTから確認します。",
  robots: { index: false, follow: false },
};
export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Fclinics");
  return <main className="min-h-screen bg-[#f8f3ed] text-[#141414]">
    <header className="border-b border-black/15 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/ja/my-homecourt/app" className="flex items-center gap-3">
          <Image src="/rba-logo-original.jpg" width={44} height={56} alt="RBA公式ロゴ" className="h-14 w-11 object-contain"/>
          <span className="text-xs font-black leading-5 tracking-wide">RBA<br/>MY HOME COURT</span>
        </Link>
        <Link href="/ja/my-homecourt/app" className="text-sm font-bold underline underline-offset-4">会員ホームへ戻る</Link>
      </div>
    </header>
    <section className="bg-[#f36b17] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-black tracking-[.2em]">MY HOME COURT / APPLICATIONS</p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] font-black leading-tight">次のコートへ。<br/>申込まで、ここから。</h1>
        <p className="mt-5 max-w-3xl text-base font-bold leading-8">全国のクリニック・キャンプ・講習・国際交流を一つの入口に。企画ごとの対象・日程・参加費を見て、公式申込へ進みます。</p>
      </div>
    </section>
    <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12"><MemberClinicCatalog /></div>
  </main>;
}
