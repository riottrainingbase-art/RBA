import type { Metadata } from "next";
import { ArrowUpRight, BookOpen, CalendarDays, GraduationCap, Globe2, House, Users } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Instagramから参加する・学ぶ",
  description:
    "沖縄国際キャンプ（12月22〜24日・7〜18歳）、全国クリニック、オンライン指導者講習、D-HUB、MY HOME COURTへ。選手・保護者・指導者のための公式入口。",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://riotbasketballacademy.com/ja/instagram" },
  openGraph: {
    title: "次のコートは、ここから。｜RBA",
    description: "クリニックに参加する。指導を学ぶ。世界とつながる。RBAの公式入口。",
    url: "https://riotbasketballacademy.com/ja/instagram",
    images: ["/rba-court-hero.png"],
    type: "website",
    locale: "ja_JP",
  },
};

const track = (path: string, content: string, campaign = "rba_instagram_profile_202610") => {
  const params = new URLSearchParams({
    utm_source: "instagram",
    utm_medium: "bio",
    utm_campaign: campaign,
    utm_content: content,
  });
  return `${path}?${params.toString()}`;
};

const entries = [
  {
    number: "01",
    kicker: "PLAY / 全国で参加する",
    title: "クリニック・キャンプ",
    description: "U8〜U18の育成クリニックやキャンプ。開催地・対象年代・料金を見て、参加したい活動を選べます。",
    action: "開催予定・申込方法を見る",
    href: track("/ja/schedule", "clinic_schedule"),
    icon: CalendarDays,
  },
  {
    number: "02",
    kicker: "CONNECT / 次の挑戦へ",
    title: "RBA UNITED・国際交流",
    description: "国内外のチームと学びをつなぐ活動。募集内容や参加条件は各企画の公式案内でご確認ください。",
    action: "国際交流・遠征の情報を見る",
    href: track("/ja/united", "international_united"),
    icon: Globe2,
  },
  {
    number: "03",
    kicker: "LEARN / 指導を学ぶ",
    title: "D-HUB COACH LAB",
    description: "指導者が学びを現場で試し、振り返り、次の練習へつなげる継続学習プログラム。",
    action: "D-HUBの内容を見る",
    href: track("/ja/d-hub", "dhub_coach"),
    icon: GraduationCap,
  },
  {
    number: "04",
    kicker: "KEEP / 経験を残す",
    title: "MY HOME COURT",
    description: "選手・保護者・指導者それぞれが、参加の記録や次の学びをつなぐRBAのホームコート。",
    action: "無料で始める方法を見る",
    href: track("/ja/my-homecourt", "my_homecourt"),
    icon: House,
  },
] as const;

// Resolve time in a server utility; avoid sampling a clock in React render code.
function currentPromotions() {
  const now = Date.now();
  return {
    torsten: now < Date.parse("2026-11-25T00:00:00+09:00"),
    okinawa: now < Date.parse("2026-12-24T12:00:00+09:00"),
  };
}

export default function InstagramEntryPage() {
  // 11/25 (JST)以降は新規販促カードを表示しない。200名達成時は別途早期停止。
  const { torsten: showTorsten, okinawa: showOkinawa } = currentPromotions();

  return (
    <main className="min-h-screen bg-[#f4f4f1] text-[#151719]">
      <div className="mx-auto max-w-[860px]">
        <header className="flex items-center justify-between border-b border-neutral-300 px-5 py-4 sm:px-9">
          <a href="/ja" className="flex items-center gap-3" aria-label="RBA公式サイトのトップへ">
            <Image
              src="/rba-logo-original.jpg"
              alt="RBA公式ロゴ"
              width={39}
              height={48}
              className="h-12 w-[39px] border border-neutral-300 bg-white object-contain"
            />
            <span className="text-[11px] font-black leading-[1.25] tracking-[.09em]">
              RIOT BASKETBALL<br />ACADEMY
            </span>
          </a>
          <span className="text-[10px] font-bold tracking-[.12em] text-neutral-600">OFFICIAL / JAPAN</span>
        </header>

        {showOkinawa && (
          <section className="mx-5 mt-5 border border-[#d95100] bg-[#ff761b] p-5 text-[#151719] sm:mx-9 sm:mt-7 sm:p-7" aria-labelledby="okinawa-feature-title">
            <p className="text-[11px] font-black tracking-[.12em]">PICK UP / OKINAWA INTERNATIONAL CAMP</p>
            <h2 id="okinawa-feature-title" className="mt-3 text-[32px] font-black leading-[1.2] tracking-[-.04em] sm:text-[44px]">沖縄で、<br />世界の仲間とバスケ。</h2>
            <p className="mt-4 text-[18px] font-black leading-7 sm:text-xl">2026年12月22日（火）〜24日（木）</p>
            <p className="mt-1 text-sm font-bold">7〜18歳対象 · 国際ユースキャンプ · 2泊3日</p>
            <p className="mt-4 text-sm leading-6">海外の選手と練習・ゲーム・交流。<br />お友達と一緒の参加も、ご相談ください。</p>
            <a className="mt-5 flex min-h-14 items-center justify-between gap-3 bg-[#151719] px-5 py-4 text-sm font-black text-white transition-colors hover:bg-[#333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#151719] sm:text-base"
              href={track("/ja/events/okinawa-international-camp-2026", "featured_okinawa_details", "okinawa_camp_20261222")}
              style={{ color: "#fff" }} data-cta="okinawa_camp_details">沖縄キャンプの詳細・参加案内 <ArrowUpRight size={20} className="shrink-0" aria-hidden="true" /></a>
            <a className="mt-3 flex min-h-12 items-center justify-between gap-3 border border-[#151719] bg-white px-4 py-3 text-sm font-black transition-colors hover:bg-[#fff5eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#151719]"
              href={track("/ja/events/okinawa-international-camp-2026/apply", "featured_okinawa_japan", "okinawa_camp_20261222")}
              data-cta="okinawa_camp_japan">日本国内からの参加・料金相談 <ArrowUpRight size={18} className="shrink-0" aria-hidden="true" /></a>
            <p className="mt-3 text-xs font-medium leading-5">国内参加はRBAが窓口です。国内料金・現地割引は個別にご案内します。</p>
          </section>
        )}

        <section className="px-5 pb-7 pt-10 sm:px-9 sm:pt-14" aria-labelledby="instagram-title">
          <p className="text-[11px] font-bold tracking-[.2em] text-neutral-600">FROM INSTAGRAM</p>
          <h1 id="instagram-title" className="mt-4 text-[clamp(38px,7vw,70px)] font-black leading-[1.06] tracking-[-.06em]">
            次のコートは、<br />ここから。
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] font-medium leading-7 text-neutral-700 sm:text-base">
            育成の可能性を、もっと広く。<br />
            全国のクリニック、指導者の学び、国際交流。<br className="hidden sm:block" />
            目的に合った入口を選んでください。
          </p>
          <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold text-neutral-600" aria-label="対象">
            <span className="border border-neutral-300 bg-white px-3 py-2">選手</span>
            <span className="border border-neutral-300 bg-white px-3 py-2">保護者</span>
            <span className="border border-neutral-300 bg-white px-3 py-2">指導者</span>
            <span className="border border-neutral-300 bg-white px-3 py-2">チーム・地域</span>
          </div>
        </section>

        {showTorsten && (
          <section className="mx-5 overflow-hidden bg-[#17191b] text-white sm:mx-9" aria-labelledby="featured-title">
            <div className="border-b border-white/20 px-5 py-4 sm:px-7">
              <p className="text-[11px] font-bold tracking-[.18em] text-neutral-300">FEATURED / 11.25 ONLINE</p>
            </div>
            <div className="px-5 py-7 sm:px-7 sm:py-9">
              <p className="text-[12px] font-bold text-neutral-200">練習では入る。試合では打てない。</p>
              <h2 id="featured-title" className="mt-3 text-[30px] font-black leading-[1.12] tracking-[-.045em] sm:text-[43px]">
                シュートを、<br />試合の判断につなげる。
              </h2>
              <p className="mt-4 text-sm leading-7 text-neutral-300">
                TORSTEN LOIBL ONLINE CLINIC Vol.2。シュート技術、スペーシング、練習設計、試合での判断を90分で考えます。
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-white/20 pt-5 text-[12px]">
                <div><span className="block text-neutral-400">開催</span><strong className="mt-1 block text-sm">11/25（水）20:00〜21:30</strong></div>
                <div><span className="block text-neutral-400">形式</span><strong className="mt-1 block text-sm">Zoom・日本語逐次通訳</strong></div>
                <div><span className="block text-neutral-400">LIVE（税込）</span><strong className="mt-1 block text-lg">¥3,300</strong></div>
                <div><span className="block text-neutral-400">録画（税込）</span><strong className="mt-1 block text-lg">¥4,400</strong><span className="block text-[10px] text-neutral-400">配信開始後30日間</span></div>
              </div>
              <a
                className="mt-6 flex min-h-14 items-center justify-between gap-3 bg-white px-5 py-3 font-black text-[#17191b] transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={track("/ja/events/torsten-loibl-online-clinic", "featured_torsten", "torsten_vol2_20261125")}
                data-cta="torsten_vol2"
              >
                講習の内容・申込方法を見る <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <p className="mt-3 text-[11px] leading-5 text-neutral-400">公式案内 → 専用Googleフォーム → フォーム送信後、選択プランの決済へ。</p>
            </div>
          </section>
        )}

        <section className="px-5 pb-12 pt-10 sm:px-9" aria-labelledby="find-your-route">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold tracking-[.18em] text-neutral-600">CHOOSE YOUR NEXT STEP</p>
              <h2 id="find-your-route" className="mt-2 text-[26px] font-black tracking-[-.04em] sm:text-3xl">RBAでできること</h2>
            </div>
            <p className="text-[11px] font-semibold text-neutral-500">4つの入口</p>
          </div>
          <nav aria-label="RBAの活動を選ぶ" className="grid gap-3 sm:grid-cols-2">
            {entries.map((entry) => {
              const Icon = entry.icon;
              return (
                <a
                  key={entry.number}
                  href={entry.href}
                  data-cta={entry.number}
                  className="group flex h-full flex-col border border-neutral-300 bg-white px-5 py-6 transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:px-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-neutral-500">{entry.number}</span>
                    <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-[10px] font-bold tracking-[.12em] text-neutral-500">{entry.kicker}</p>
                  <h3 className="mt-2 text-[22px] font-black tracking-[-.04em]">{entry.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-neutral-600">{entry.description}</p>
                  <span className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-200 pt-4 text-[13px] font-black">
                    {entry.action}<ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              );
            })}
          </nav>
          <p className="mt-5 text-[12px] leading-6 text-neutral-600">
            日程、対象年代、参加費、残席、キャンセル条件は、各企画の公式ページで最新情報をご確認ください。
          </p>
        </section>

        <section className="border-y border-neutral-300 bg-white px-5 py-10 sm:px-9" aria-labelledby="first-time-heading">
          <p className="text-[11px] font-bold tracking-[.18em] text-neutral-500">FIRST TIME HERE?</p>
          <h2 id="first-time-heading" className="mt-2 text-[25px] font-black tracking-[-.03em]">はじめてRBAを知った方へ。</h2>
          <p className="mt-3 text-sm leading-7 text-neutral-700">
            RBAは、育成年代のバスケットボールを中心に、全国クリニック、指導者教育、国際交流を行っています。単発の参加で終わらせず、次の挑戦につなげることを大切にしています。
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <a className="flex items-center justify-between border border-neutral-300 px-4 py-3 text-sm font-bold hover:bg-neutral-100" href={track("/ja/players", "for_players")}>選手の方 <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="flex items-center justify-between border border-neutral-300 px-4 py-3 text-sm font-bold hover:bg-neutral-100" href={track("/ja/families", "for_families")}>保護者の方 <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className="flex items-center justify-between border border-neutral-300 px-4 py-3 text-sm font-bold hover:bg-neutral-100" href={track("/ja/coaches", "for_coaches")}>指導者の方 <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="mt-6 flex flex-wrap gap-5 text-[13px] font-bold">
            <a className="inline-flex items-center gap-2 underline underline-offset-4" href={track("/ja/journal", "free_journal")}><BookOpen size={17} aria-hidden="true" /> 無料JOURNALで学ぶ</a>
            <a className="inline-flex items-center gap-2 underline underline-offset-4" href={track("/ja/clinic-request", "team_inquiry")}><Users size={17} aria-hidden="true" /> チーム開催を相談する</a>
          </div>
        </section>

        <footer className="px-5 pb-12 pt-8 sm:px-9">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-bold text-neutral-600">
            <span>RIOT BASKETBALL ACADEMY / JAPAN</span>
            <a href="/ja" className="inline-flex items-center gap-1 underline underline-offset-4">公式サイトへ <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
          <p className="mt-5 text-[11px] leading-5 text-neutral-500">
            申し込み・決済は各企画の公式案内をご確認ください。RBA IDの登録だけで有料会員になることはありません。
          </p>
        </footer>
      </div>
    </main>
  );
}
