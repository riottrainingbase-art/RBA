import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { programmes, isProgrammeActive } from "@/components/programme-data";
import type { Programme } from "@/components/programme-data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "クリニック・キャンプ申込｜MY HOME COURT｜RBA",
  description: "Riot Basketball Academyの募集中クリニック・キャンプ・講習を確認し、各企画の公式参加申込と決済案内へ進みます。",
  robots: { index: false, follow: false },
};

const types = {
  clinic: "クリニック・スクール",
  "development-camp": "キャンプ・遠征",
  coach: "指導者向け講習",
  united: "国際交流・UNITED",
  play: "イベント・大会",
} as const;

function programmeType(p: Programme): keyof typeof types {
  if (p.pathway === "clinic") return "clinic";
  if (p.pathway === "development-camp") return "development-camp";
  if (p.pathway === "coach") return "coach";
  if (p.pathway === "united") return "united";
  return "play";
}

function submission(p: Programme) {
  // The event-specific official intake is authoritative; do not infer that a
  // Google Form or Jotform automatically charges or confirms a participant.
  if (p.id === "kagoshima-nov29") return { text: "公式ページから参加区分を選択し決済", button: "参加申込・決済へ", route: p.applicationUrl };
  if (p.id === "torsten") return { text: "公式申込後、Squareの支払案内に従う", button: "講習の申込へ", route: p.applicationUrl };
  if (p.id === "okinawa-december-camp") return { text: "宿泊・通いの条件を確認し、公式サイトから申込", button: "プラン・申込・決済を確認", route: p.applicationUrl };
  if (p.id === "sendai-u15") return { text: "申込フォームで受付後、登録条件と決済をご案内", button: "スクール参加申込へ", route: p.applicationUrl };
  if (p.id === "kobe") return { text: "宿泊・食事・送迎と申込内容を確認、支払済みなら再決済しない", button: "キャンプ参加申込へ", route: p.applicationUrl };
  return { text: p.payment[1], button: "公式の参加申込を開く", route: p.applicationUrl };
}
function safeUrl(url: string) {
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try { const u = new URL(url); return u.protocol === "https:" ? u.toString() : null; }
  catch { return null; }
}

function ClinicCard({ programme }: { programme: Programme }) {
  const title = programme.title[1], kind = programmeType(programme), payment = submission(programme);
  const application = safeUrl(payment.route);
  const details = programme.japaneseInfoPath ? safeUrl(programme.japaneseInfoPath) : null;
  const external = Boolean(application && application.startsWith("https://"));
  return <article className="rounded-lg border border-black/15 bg-white p-5 shadow-sm sm:p-6">
    <div className="flex flex-wrap items-center gap-2 text-xs font-black">
      <span className="rounded bg-black px-3 py-1 text-white">{types[kind]}</span>
      <span className="text-[#c65513]">日程・申込条件は個別確認</span>
    </div>
    <h3 className="mt-4 text-xl font-black leading-snug sm:text-2xl">{title}</h3>
    <p className="mt-2 text-sm font-bold">{programme.date[1]}</p>
    <p className="mt-1 text-sm text-black/70">{programme.place[1]}</p>
    <p className="mt-4 text-sm font-bold">{programme.price[1]}</p>
    <p className="mt-2 text-xs leading-6">対象：{programme.audience[1]}</p>
    <p className="mt-4 border-t border-black/10 pt-4 text-xs leading-6 text-black/70">{payment.text}</p>
    <div className="mt-5 flex flex-wrap gap-3">
      {application ? <a href={application} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}
        className="inline-flex min-h-12 items-center justify-center rounded bg-[#ed6718] px-5 py-3 text-sm font-black text-black">{payment.button} <span aria-hidden="true" className="ml-2">→</span></a> : <span className="text-sm">受付先を確認中</span>}
      {details && details !== application ? <Link href={details} className="inline-flex min-h-12 items-center justify-center rounded border border-black/30 px-4 py-3 text-sm font-bold">詳細・注意事項</Link> : null}
    </div>
  </article>;
}

export default async function ClinicsPage() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/ja/my-homecourt/login?next=%2Fja%2Fmy-homecourt%2Fapp%2Fclinics");
  const active = programmes.filter(p => isProgrammeActive(p))
    .sort((a,b) => a.startDate.localeCompare(b.startDate));
  const general = active.filter(p => programmeType(p) === "clinic");
  const camps = active.filter(p => programmeType(p) === "development-camp");
  const lectures = active.filter(p => programmeType(p) === "coach");
  const others = active.filter(p => !["clinic","development-camp","coach"].includes(programmeType(p)));
  const sections = [
    { key: "clinics", title: "クリニック・スクール", items: general },
    { key: "camps", title: "キャンプ・遠征", items: camps },
    { key: "lectures", title: "オンライン・指導者講習", items: lectures },
    { key: "other", title: "その他の育成イベント", items: others },
  ];
  return <main className="min-h-screen bg-[#f6f2eb] text-[#111]">
    <header className="border-b border-black/20 bg-white px-5 py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/ja/my-homecourt/app" className="text-sm font-black underline underline-offset-4">← MY HOME COURTに戻る</Link>
        <Link href="/ja/opportunities" className="text-sm font-bold underline underline-offset-4">全国の活動案内</Link>
      </div>
    </header>
    <section className="border-b-4 border-black bg-[#f36c19] px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-black tracking-[.2em]">MY HOME COURT / ALL PROGRAMMES</p>
        <h1 className="mt-4 text-[clamp(2.3rem,6.5vw,5rem)] font-black leading-tight">参加したいクリニックを、<br/>ここから。</h1>
        <p className="mt-5 max-w-3xl text-base font-bold leading-8">RBAのクリニック、キャンプ、オンライン講習を一か所で確認。各企画の申込・決済の公式窓口へつなぎます。RBA IDを持っていても各企画の参加条件・料金は別途確認してください。</p>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-8">
      <div className="rounded-md border-l-4 border-[#e9651a] bg-white px-5 py-4 text-sm leading-8">
        <strong>支払いの重要なご案内</strong>
        <p>企画によってStripe・Square・主催者フォームなど、申込と支払いの手順が異なります。申込フォームの送信だけで参加が確定するとは限りません。既に支払済みの場合は同じ料金を再決済せず、確認が必要な場合はRBAへご相談ください。定員・実施・会場の確認が取れていない企画について、参加・支払いの確約はしません。</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {sections.filter(s=>s.items.length).map(s=><a href={"#"+s.key} key={s.key} className="rounded-full border border-black/20 bg-white px-4 py-2 text-sm font-bold">{s.title}（{s.items.length}）</a>)}
        <a href="#international" className="rounded-full border border-black/20 bg-white px-4 py-2 text-sm font-bold">国際交流</a>
      </div>
      {sections.filter(s=>s.items.length).map(s=><section key={s.key} id={s.key} className="scroll-mt-8 py-9">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><h2 className="text-2xl font-black sm:text-3xl">{s.title}</h2><p className="text-sm">{s.items.length}件の公式掲載企画</p></div>
        <div className="grid gap-4 md:grid-cols-2">{s.items.map(p=><ClinicCard key={p.id} programme={p}/>)}</div>
      </section>)}
      <section id="international" className="my-8 rounded-lg border-2 border-black bg-white p-6 sm:p-9">
        <p className="text-xs font-black tracking-widest text-[#e26013]">RBA UNITED × GUAM / KOBE 2027</p>
        <h2 className="mt-2 text-2xl font-black sm:text-3xl">神戸・男子U14 国際育成交流</h2>
        <p className="mt-3 text-sm leading-8">2027年1月5〜10日・グアム来日予定。交流日程・会場は調整中です。個人・チーム・選抜希望の前金50％付き仮申込を準備していますが、現在、カード決済はまだ開始していません。申込や出場を確約しません。</p>
        <Link href="/ja/events/kobe-boys-u14-exchange-2027/apply" className="mt-5 inline-flex min-h-12 items-center rounded bg-black px-5 py-3 text-sm font-black text-white">募集・前金条件を確認する →</Link>
      </section>
      {!active.length ? <p className="py-10 text-sm">現在確認できる募集企画はありません。<Link href="/ja/opportunities" className="underline">新しい案内を確認</Link>してください。</p> : null}
      <p className="mt-7 text-xs leading-7 text-black/60">この一覧はRBA公式サイトに登録された企画情報から生成しています。新規企画は、対象・日程・受付先が確認された時点で追加されます。外部フォームの受付状況や残枠は必ず遷移先でご確認ください。</p>
      <p className="mt-3 text-sm">お問い合わせ：<a href="mailto:riot.training.base@gmail.com" className="underline">riot.training.base@gmail.com</a></p>
    </section>
  </main>;
}
