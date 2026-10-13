import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RBA | 次の一歩へ",
  description: "選手・保護者、指導者、チーム・企業へ。RBAの活動と学びの入口。",
  robots: { index: false, follow: true },
};

const groups = [
  { number:"01", title:"選手・保護者", english:"PLAYERS & FAMILIES", links:[["活動を探す","/ja/opportunities","activities"],["HOMECOURT PLUS","/ja/homecourt-plus","plus"]] },
  { number:"02", title:"指導者", english:"COACHES", links:[["D-HUB","/ja/d-hub","dhub"],["JOURNAL","/ja/journal/coaches","coach_journal"]] },
  { number:"03", title:"チーム・企業", english:"TEAMS & PARTNERS", links:[["育成支援・連携","/ja/organizer","organizer"],["お問い合わせ","/ja/contact","contact"]] },
] as const;

const destination = (path:string, item:string) => path + "?utm_source=instagram&utm_medium=bio&utm_campaign=rba_entry&utm_content=" + item;

export default function Page() {
  return <main className="min-h-screen bg-[#f8f8f6] text-[#111111]" style={{color:"#111111",backgroundColor:"#f8f8f6"}}>
    <div className="mx-auto max-w-[620px] px-6 pb-20 pt-9 sm:px-10">
      <header className="flex items-center justify-between border-b border-[#d4d4d0] pb-6">
        <a href="/ja" className="text-[13px] font-black tracking-[0.13em]" style={{color:"#111111"}}>RBA<span className="ml-2 text-[10px] font-medium tracking-[0.12em]">RIOT BASKETBALL ACADEMY</span></a>
        <span className="text-[10px] tracking-[0.12em] text-[#777]">JAPAN</span>
      </header>
      <section className="pb-12 pt-20 sm:pt-24">
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[#666]">RIOT BASKETBALL ACADEMY</p>
        <h1 className="mt-5 text-[clamp(38px,8vw,60px)] font-black leading-[1.2] tracking-[-0.045em]">バスケの、その先へ。</h1>
        <p className="mt-6 text-sm leading-7 text-[#555]">今いる場所から、次の成長へ。</p>
      </section>
      <nav aria-label="RBAの活動を探す" className="border-t border-[#c9c9c5]">
        {groups.map(group=><section key={group.number} className="border-b border-[#c9c9c5] py-8">
          <div className="flex items-start gap-4">
            <span className="pt-1 text-xs font-semibold text-[#777]">{group.number}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold tracking-[0.13em] text-[#777]">{group.english}</p>
              <h2 className="mt-1 text-[27px] font-bold tracking-[-0.035em]">{group.title}</h2>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-4">
                {group.links.map(([label,path,key])=><a key={key} href={destination(path,key)} className="inline-flex min-h-11 items-center gap-2 border-b border-[#777] py-2 text-[13px] font-semibold hover:border-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{color:"#111111"}}>{label}<span aria-hidden="true">↗</span></a>)}
              </div>
            </div>
          </div>
        </section>)}
      </nav>
      <footer className="mt-12 flex items-center justify-between text-[10px] tracking-[0.08em] text-[#777]"><span>© RIOT BASKETBALL ACADEMY</span><a href="/ja" style={{color:"#555"}}>OFFICIAL SITE ↗</a></footer>
    </div>
  </main>;
}
