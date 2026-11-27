'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export function DevelopmentJourneyLink(){
  const path=usePathname();
  if(!/^\/ja\/(?:events(?:\/|$)|camp(?:\/|$)|clinic-request$|team-development$|international(?:\/|$)|team-training$|team-visit-clinic$|after-application$|payment-complete$)/.test(path))return null;
  return <section aria-labelledby="development-journey-title" className="border-t border-[#ccd5df] bg-[#eef2f6] px-6 py-8 text-[#10233f]">
    <div className="mx-auto max-w-[1000px]">
      <div className="flex items-center gap-4"><Image src="/rba-logo-original.jpg" alt="RBA公式ロゴ" width={30} height={42}/><h2 id="development-journey-title" className="text-2xl font-extrabold">この経験を、次の挑戦へ。</h2></div>
      <p className="my-4 leading-8">普段の練習、保護者の見守り、指導者との共有。クリニックやキャンプを一日で終わらせず、本人が目指す次の一歩を一緒に考えます。</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/ja/after-application" data-growth-id="programme-registration-guide" className="flex min-h-12 items-center border border-[#ccd5df] bg-white px-4 py-3 font-bold">申込後の流れを確認 →</Link>
        <Link href="/ja/after-clinic" data-growth-id="programme-after-clinic" className="flex min-h-12 items-center border border-[#ccd5df] bg-white px-4 py-3 font-bold">参加後の復習・ご感想 →</Link>
        <Link href="/ja/development-projects#plan" data-growth-id="programme-development-project" className="flex min-h-12 items-center bg-[#10233f] px-4 py-3 font-bold text-white">継続する育成計画を考える →</Link>
        <a href="https://note.com/rba_official/membership/join" data-growth-id="programme-note-support" target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center border border-[#ccd5df] bg-white px-4 py-3 font-bold">noteで育成を応援（月500円・1,000円）↗</a>
      </div>
      <p className="mt-3 text-xs leading-6">計画メモ・振り返りは登録不要。noteは成人・保護者向けの任意の月額契約で、自動更新・解約条件はnoteでご確認ください。クリニックの参加条件とは別です。</p>
    </div>
  </section>;
}
