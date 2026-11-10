/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Users, Activity, CalendarDays } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

const biildactWebsite = "https://biildact.com/";
const biildactInstagram = "https://www.instagram.com/biildact.basketball.miyako/";
const photos = {
  logo: "https://biildact.com/wp-content/themes/biildact/brand/bd-h-black.png",
  boys: "https://biildact.com/wp-content/themes/biildact/photo/cls-boys2.jpg",
  girls: "https://biildact.com/wp-content/themes/biildact/photo/cls-girls1.jpg",
  coach: "https://biildact.com/wp-content/themes/biildact/photo/coach.jpg",
} as const;
const biildactLine = "https://lin.ee/wNiUTQJ";

export const metadata: Metadata = {
  title: "BiiLDact Basketball Academy｜岩手・宮古の地域スクール紹介｜RBA",
  description: "岩手県宮古市で身体の使い方・スキル・状況判断を大切にするBiiLDact Basketball Academy。RBAとの宮古クリニック実績、スクール紹介、無料体験への公式導線をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/network/biildact" },
  openGraph: {
    title: "宮古から、試合で使える力へ。｜BiiLDact × RBA地域紹介",
    description: "地域で学び続ける。岩手・宮古の独立運営アカデミーBiiLDactをご紹介します。",
    url: "https://riotbasketballacademy.com/ja/network/biildact",
    type: "website",
    locale: "ja_JP",
  },
};

const qualities = [
  { icon: Activity, title: "身体操作から考える", text: "重心、力の使い方、動き出しなど、プレーを支える身体の使い方に着目します。" },
  { icon: Users, title: "一人ひとりの課題を見つける", text: "普段のチーム活動に加え、個人の課題に向き合う練習機会を大切にしています。" },
  { icon: CalendarDays, title: "練習を試合につなぐ", text: "スキルを身につけるだけでなく、ゲームの中で見て選び、使えることを目指します。" },
];

export default function BiildactMiyakoPage() {
  return (
    <SiteFrame locale="ja" compact>
      <main className="bg-[#faf9f6] text-[#13253d]" lang="ja">
        <div className="mx-auto max-w-[1110px] px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
          <nav aria-label="現在のページ" className="mb-9 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#53657b]">
            <Link href="/ja" className="underline underline-offset-4">RBA</Link><span aria-hidden="true">/</span>
            <Link href="/ja/regions" className="underline underline-offset-4">全国の活動</Link><span aria-hidden="true">/</span>
            <span aria-current="page">宮古・BiiLDact</span>
          </nav>

          <section aria-labelledby="biildact-title" className="grid gap-9 border-b border-[#d8d8d1] pb-12 md:grid-cols-[1.35fr_0.65fr] md:items-end">
            <div>
              <p className="text-xs font-extrabold tracking-[.2em] text-[#68798b]">RBA LOCAL SPOTLIGHT / IWATE · MIYAKO</p>
              <h1 id="biildact-title" className="mt-5 text-[clamp(36px,6vw,74px)] font-black leading-[1.16] tracking-[-.055em]">
                宮古から、<br />試合で使える力へ。
              </h1>
              <p className="mt-5 text-xl font-black tracking-[-.025em]">BiiLDact Basketball Academy</p>
              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#46566a]">
                岩手県宮古市・沿岸地域で、身体の使い方とバスケットボールのスキル、試合での判断をつなぐ育成に取り組むアカデミーです。
                子どもたちが地域で学び続けられる環境を、RBAからもご紹介します。
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={biildactWebsite} target="_blank" rel="noopener noreferrer" data-growth-id="biildact-website-hero" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#122b4a] px-5 py-3 text-sm font-extrabold text-white" style={{ color: "#fff" }}>
                  スクール公式サイトを見る <ArrowUpRight size={17} aria-hidden="true" />
                </a>
                <a href={biildactLine} target="_blank" rel="noopener noreferrer" data-growth-id="biildact-line-hero" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#122b4a] bg-white px-5 py-3 text-sm font-extrabold text-[#122b4a]">
                  無料体験を公式LINEで相談 <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
            <aside className="border-l-4 border-[#9c7c51] bg-[#ebe8e0] p-6 sm:p-8">
              <p className="text-[10px] font-extrabold tracking-[.2em] text-[#655338]">ABOUT THE ACADEMY</p>
              <img src={photos.logo} width={440} height={200} alt="BiiLDact Basketball Academy公式ロゴ" loading="eager" className="mt-6 h-auto w-full max-w-[260px] object-contain" />
              <p className="mt-2 text-sm font-bold text-[#455467]">Basketball Academy / MIYAKO</p>
              <p className="mt-7 flex items-center gap-2 text-sm font-semibold"><MapPin size={17} aria-hidden="true" /> 岩手県宮古市</p>
              <p className="mt-3 text-sm leading-7 text-[#536174]">小学生〜高校生を中心に、初心者の相談も受け付けています。最新のクラス・会場・料金は、新公式サイトbiildact.comをご確認ください。</p>
            </aside>
          </section>

          <section className="py-14" aria-labelledby="biildact-strengths">
            <p className="text-xs font-extrabold tracking-[.17em] text-[#827056]">WHAT THEY VALUE</p>
            <h2 id="biildact-strengths" className="mt-3 text-3xl font-black leading-snug tracking-[-.035em]">上達だけでなく、<br className="sm:hidden" />動きの「なぜ」を学ぶ。</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {qualities.map((item) => <article key={item.title} className="border border-[#ddd9d1] bg-white p-6">
                <item.icon className="text-[#9c7c51]" size={26} aria-hidden="true" />
                <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#58677a]">{item.text}</p>
              </article>)}
            </div>
          </section>

          <section aria-label="BiiLDactの練習とコーチの写真" className="grid gap-4 pb-14 sm:grid-cols-3">
            {[
              { src: photos.boys, alt: "BiiLDact公式サイト掲載のクラス練習風景", label: "ACADEMY / PRACTICE" },
              { src: photos.girls, alt: "BiiLDact公式サイト掲載のクラス練習風景（女子）", label: "GIRLS / PRACTICE" },
              { src: photos.coach, alt: "山根弘之コーチの公式紹介写真", label: "COACH / HIROYUKI YAMANE" },
            ].map(photo => <figure key={photo.src} className="overflow-hidden border border-[#ddd9d1] bg-white">
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="px-4 py-3 text-[11px] font-extrabold tracking-[.09em] text-[#54657a]">{photo.label}</figcaption>
            </figure>)}
          </section>

          <section className="border-y border-[#d8d8d1] py-12" aria-labelledby="biildact-local">
            <p className="text-xs font-extrabold tracking-[.17em] text-[#827056]">LOCAL CLASS / MIYAKO</p>
            <h2 id="biildact-local" className="mt-3 text-3xl font-black">宮古で、日常的に学べる場所。</h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#516074]">
              現在の新公式サイトでは、小・中学生（男女一緒）は週1〜3回、土日を基本として夜19:00〜21:00の練習を案内しています。
              高校生には月1回程度の不定期クラスもあります。曜日・会場・料金は変更されるため、体験前に公式LINEでご確認ください。
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-[#354b63]">
              <span className="border border-[#b9c6d0] bg-white px-4 py-2">小・中学生／高校生</span>
              <span className="border border-[#b9c6d0] bg-white px-4 py-2">部活・所属クラブと両立可</span>
              <span className="border border-[#b9c6d0] bg-white px-4 py-2">無料体験・入会金／年会費なし</span>
            </div>
          </section>

          <section className="py-14" aria-labelledby="biildact-coach">
            <p className="text-xs font-extrabold tracking-[.17em] text-[#827056]">MEET THE COACH</p>
            <h2 id="biildact-coach" className="mt-3 text-3xl font-black">宮古から、指導と学びを続ける。</h2>
            <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#516074]">代表・山根弘之コーチ。身体の使い方を専門的に学び、選手が「見る・判断する・動く」をつなげる育成に取り組んでいます。JBAコーチライセンスC級などの指導・身体づくりの学習歴も公式サイトで紹介されています。</p>
          </section>

          <section className="grid gap-8 py-14 md:grid-cols-[1fr_1fr] md:items-center" aria-labelledby="biildact-history">
            <div>
              <p className="text-xs font-extrabold tracking-[.17em] text-[#827056]">RBA × BiiLDact / 2026.10.31</p>
              <h2 id="biildact-history" className="mt-3 text-3xl font-black leading-snug">宮古で、一緒に育成の機会を。</h2>
              <p className="mt-5 text-[15px] leading-8 text-[#516074]">
                2026年10月31日、RBAとBiiLDactは宮古で1DAY CLINICを企画・開催しました。
                少人数のゲームを通じて、普段の練習を試合の判断へつなぐ機会です。
                こうした地域の取り組みと、日々のスクール活動を応援しています。
              </p>
            </div>
            <div className="border border-[#dcd6cd] bg-white p-7">
              <p className="text-xs font-bold text-[#79674d]">PAST ACTIVITY / 過去開催</p>
              <h3 className="mt-3 text-xl font-black">RBA 1DAY CLINIC in MIYAKO</h3>
              <p className="mt-3 text-sm leading-7 text-[#57677b]">2026年10月31日・千徳地区体育館。開催当時の案内です。現在の参加受付ではありません。</p>
              <Link href="/events/miyako-20261031" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold underline underline-offset-4">
                当時の開催概要を見る <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="bg-[#122b4a] p-7 text-white sm:p-10" aria-labelledby="biildact-trial">
            <p className="text-xs font-bold tracking-[.17em] text-[#c8d4df]">FIRST STEP / MIYAKO</p>
            <h2 id="biildact-trial" className="mt-3 text-3xl font-black leading-snug">まずは、体験から。</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-8 text-[#e0e6ec]">
              お子さまに合うクラス、曜日や費用の確認、見学・体験のご相談はBiiLDactへ直接どうぞ。
              このページでは申込・決済・個人情報の受付を行っていません。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={biildactLine} target="_blank" rel="noopener noreferrer" data-growth-id="biildact-line-footer" className="inline-flex min-h-12 items-center gap-2 bg-white px-6 py-3 text-sm font-extrabold text-[#122b4a]">無料体験を公式LINEで相談 <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a href={biildactWebsite} target="_blank" rel="noopener noreferrer" data-growth-id="biildact-site-footer" className="inline-flex min-h-12 items-center gap-2 border border-white/60 px-6 py-3 text-sm font-extrabold text-white" style={{ color: "#fff" }}>新公式サイトでクラスを確認 <ArrowUpRight size={17} aria-hidden="true" /></a>
              <a href={biildactInstagram} target="_blank" rel="noopener noreferrer" data-growth-id="biildact-instagram" className="inline-flex min-h-12 items-center gap-2 border border-white/60 px-6 py-3 text-sm font-extrabold text-white" style={{ color: "#fff" }}>Instagramで練習を見る <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </section>
          <p className="mt-6 text-xs leading-6 text-[#617084]">
            ※BiiLDact Basketball Academyは独立して運営されている地域スクールです。RBAの直営校・フランチャイズ・加盟校としての案内ではありません。
            本ページは過去の共同企画に基づく活動紹介です。掲載内容の変更や最新の受入状況はBiiLDact公式案内を優先します。
            公式ロゴ・写真は、BiilDact側の掲載許諾をRBAが得たうえで、BiilDact公式サイトの画像を参照して表示しています。
          </p>
        </div>
      </main>
    </SiteFrame>
  );
}
