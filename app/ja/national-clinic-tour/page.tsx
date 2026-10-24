import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Handshake,
  MapPinned,
  Repeat2,
  ShieldCheck,
} from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

const enquiryUrl = "https://form.jotform.com/262648437888073";

export const metadata: Metadata = {
  title: "全国クリニック開催・地域主催者募集 | Riot Basketball Academy",
  description:
    "あなたの街でRBAのバスケットボールクリニックを開催。チーム訪問、複数チーム合同、継続シリーズ。体育館・対象年代・希望時期を伺い、無料相談と個別見積から進めます。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/national-clinic-tour",
  },
  openGraph: {
    title: "あなたの街に、RBAを。｜全国クリニック開催相談",
    description: "一度きりではなく、次の練習、次の試合、次の開催へ。地域主催者・チームの開催相談受付中。",
    url: "https://riotbasketballacademy.com/ja/national-clinic-tour",
    type: "website",
    locale: "ja_JP",
    images: ["/rba-court-hero.png"],
  },
};

const formats = [
  {
    num: "01",
    kicker: "TEAM VISIT",
    title: "普段の練習にRBAが訪問",
    description:
      "いつものチーム練習の中で、見る・判断する・実行するを整理。選手への指導と、希望に応じた指導者への振り返りを行います。",
    audience: "U12 / U15 / U18などのチーム向け",
    points: ["普段の体育館を活用", "年代と課題に合わせた内容", "次の練習へつながる振り返り"],
  },
  {
    num: "02",
    kicker: "REGIONAL CLINIC",
    title: "近隣チームが集まる地域開催",
    description:
      "一つのチームだけでは難しい場合も、地域の複数チームが参加できる公開クリニックを企画。募集方法・運営・費用を地域ホストと協議します。",
    audience: "地域クラブ・指導者・主催団体向け",
    points: ["複数チーム合同で開催", "地元ホストと役割を分担", "対象・定員・費用は事前合意"],
  },
  {
    num: "03",
    kicker: "DEVELOPMENT SERIES",
    title: "3回で学びを積み重ねる",
    description:
      "1回で終わらず、前回の学びを普段の練習で試し、次回に確かめる。3〜6か月の中で3回を目安に、地域の事情に合わせて計画します。",
    audience: "再開催・継続訪問を希望する主催者向け",
    points: ["初回の課題を確認", "次回に変化を振り返る", "実施間隔は個別相談"],
  },
] as const;

const steps = [
  ["01", "開催相談", "希望の県・地域、対象年代、人数、時期、課題をフォームで共有。相談だけで費用は発生しません。"],
  ["02", "地域ホストと条件整理", "体育館の利用区分、地元募集、担当者、交通・宿泊費、希望する開催回数を確認。"],
  ["03", "内容・見積・書面合意", "指導内容、講師、総額、集金主体、安全管理、キャンセル・返金条件を双方で確認。"],
  ["04", "公式募集・当日開催", "会場や運営条件の確定後に募集。参加者の個人情報と写真の扱いにも配慮します。"],
  ["05", "振り返りと次の開催", "希望があれば、次の育成テーマと3か月後・半年後の再開催を相談します。"],
] as const;

const frequentlyAsked = [
  {
    q: "体育館が決まっていなくても相談できますか？",
    a: "はい。開催候補地域と希望時期が分かれば相談できます。ただし施設が未確定の段階では募集・開催を確約しません。利用料金や有料指導の可否は正式な施設管理者に確認します。",
  },
  {
    q: "小さなクラブでも呼べますか？",
    a: "相談できます。チーム訪問のほか、近隣クラブとの合同開催や主催者による一括契約も検討できます。必要人数は移動・施設などの条件から個別に算定します。",
  },
  {
    q: "開催料金はいくらですか？",
    a: "全国一律の確定料金はありません。指導時間・コーチ人数・開催地・交通宿泊・体育館・安全管理・募集方法を整理し、支払前に総額と内訳をご案内します。問い合わせと初回見積は無料です。",
  },
  {
    q: "年に複数回、定期開催できますか？",
    a: "可能な条件を一緒に検討します。初回の内容と運営結果を確認し、希望があれば約3か月後の再開催や3回シリーズを協議します。次回開催は自動更新や強制継続にはなりません。",
  },
  {
    q: "全国すべての地域ですぐ開催できますか？",
    a: "47都道府県から開催相談を受け付けていますが、日時・講師・体育館・地域ホストの条件によりお受けできない場合があります。未確定の開催予定や受け入れ先を決定済みとは表示しません。",
  },
  {
    q: "相談フォームを送ると料金や予約金が発生しますか？",
    a: "発生しません。まず成人の主催ご担当者から開催条件をお伺いします。開催日・施設・料金・役割・支払期日・取消条件を書面で合意した後に必要な決済をご案内します。",
  },
] as const;

export default function NationalClinicTourPage() {
  return (
    <SiteFrame locale="ja">
      <main className="bg-[#f6f5f2] text-[#151719]">
        <section className="relative overflow-hidden bg-[#111214] text-white" aria-labelledby="tour-headline">
          <div className="absolute inset-y-0 right-0 hidden w-[49%] lg:block">
            <Image src="/rba-court-hero.png" alt="" fill priority sizes="(min-width: 1024px) 49vw, 100vw" className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111214] via-[#111214]/35 to-[#111214]/25" />
          </div>
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-9 sm:pb-24 sm:pt-24 lg:py-28">
            <div className="max-w-[720px]">
              <p className="text-[11px] font-black tracking-[.22em] text-[#f3a567]">RBA NATIONAL CLINIC NETWORK</p>
              <h1 id="tour-headline" className="mt-5 text-[clamp(36px,6vw,78px)] font-black leading-[1.13] tracking-[-.06em]">
                あなたの街に、<br />RBAを。
              </h1>
              <p className="mt-6 max-w-[610px] text-[16px] font-semibold leading-8 text-white/90 sm:text-lg">
                バスケットボールの育成機会を、もっと身近に。チーム訪問、地域合同、継続開催。全国の地域ホスト・指導者・クラブの皆さまと一緒につくります。
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={enquiryUrl}
                  className="inline-flex min-h-14 items-center justify-between gap-5 bg-[#ff791f] px-6 py-4 text-[15px] font-black text-[#151719] transition-colors hover:bg-[#ff974d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff791f]"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="national-tour-hero-host-enquiry"
                >
                  地域開催について無料相談 <ArrowUpRight size={19} aria-hidden="true" />
                </a>
                <a href="#formats" className="inline-flex min-h-14 items-center justify-between gap-4 border border-white/50 px-6 py-4 text-sm font-bold text-white hover:bg-white/10">
                  3つの開催方法を見る <ArrowDown size={19} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-4 text-xs leading-6 text-white/65">ご相談・初回見積は無料。フォーム送信だけで予約確定・料金請求はありません。</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-px border-x border-b border-[#dedbd5] bg-[#dedbd5] sm:grid-cols-3" aria-label="開催方針">
          {[
            ["全国", "47都道府県から開催相談を受付"],
            ["3つ", "地域の事情に合わせた開催方式"],
            ["継続", "次の練習・次の開催を見据えた設計"],
          ].map(([top, bottom]) => (
            <div className="bg-white px-6 py-7 sm:px-8" key={top}>
              <p className="text-3xl font-black tracking-[-.05em]">{top}</p>
              <p className="mt-2 text-[13px] leading-6 text-neutral-600">{bottom}</p>
            </div>
          ))}
        </section>

        <section id="formats" className="mx-auto max-w-6xl px-5 py-16 sm:px-9 sm:py-24" aria-labelledby="formats-title">
          <p className="text-xs font-black tracking-[.16em] text-neutral-600">3 WAYS TO HOST</p>
          <div className="mt-2 grid items-end gap-4 lg:grid-cols-[1fr_0.7fr]">
            <h2 id="formats-title" className="text-[clamp(28px,4vw,49px)] font-black leading-[1.18] tracking-[-.05em]">地域に合う形から、<br />始められます。</h2>
            <p className="text-sm leading-7 text-neutral-600">一つのパッケージを全国に押し付けません。対象年代、会場、指導課題、予算と現地の協力体制を確認して決めます。</p>
          </div>
          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {formats.map((f) => (
              <article key={f.num} className="flex flex-col border border-neutral-300 bg-white p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black">{f.num}</span>
                  <ArrowUpRight size={22} aria-hidden="true" className="text-neutral-500" />
                </div>
                <p className="mt-8 text-[11px] font-black tracking-[.12em] text-[#a14c16]">{f.kicker}</p>
                <h3 className="mt-2 text-[24px] font-black leading-8 tracking-[-.04em]">{f.title}</h3>
                <p className="mt-3 text-sm font-semibold text-neutral-600">{f.audience}</p>
                <p className="mt-5 flex-1 text-sm leading-7 text-neutral-700">{f.description}</p>
                <ul className="mt-6 space-y-3 border-t border-neutral-200 pt-5">
                  {f.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-[13px] font-semibold text-neutral-700">
                      <CheckCircle2 size={17} className="mt-[2px] shrink-0" aria-hidden="true" /> {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#eae8e2]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-9 lg:grid-cols-2 lg:gap-16 lg:py-24">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-neutral-600">LOCAL HOST × RBA</p>
              <h2 className="mt-3 text-[clamp(30px,4vw,46px)] font-black leading-tight tracking-[-.05em]">支店を増やすのではなく、<br />地域の学びを増やす。</h2>
              <p className="mt-5 text-sm leading-8 text-neutral-700">
                RBAだけで全国の会場を押さえるのではなく、地域で活動するチーム・指導者・団体と連携します。主催者の立場に応じて、誰が何を担うかを開催前に書面で決めます。
              </p>
              <a href="/ja/regional-host" className="mt-6 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">
                地域ホストの考え方を見る <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="grid gap-3">
              <div className="border border-neutral-300 bg-white p-6">
                <div className="flex items-center gap-3"><MapPinned size={23} aria-hidden="true" /><h3 className="text-lg font-black">地域の主催者</h3></div>
                <p className="mt-3 text-sm leading-7 text-neutral-600">候補の体育館・施設利用規則、地元への周知、成人の責任者・当日協力スタッフ、参加者の募集を中心に調整。</p>
              </div>
              <div className="border border-neutral-300 bg-white p-6">
                <div className="flex items-center gap-3"><Handshake size={23} aria-hidden="true" /><h3 className="text-lg font-black">RBA</h3></div>
                <p className="mt-3 text-sm leading-7 text-neutral-600">育成テーマの設計、コーチの配置と指導、開催概要と見積、募集資料、安全管理の役割調整、終了後の振り返りを担当。</p>
              </div>
              <p className="px-1 text-xs leading-6 text-neutral-600">地域ホストは開催への協力者です。契約前にRBAの支部・公認指導者・独占エリアになるものではありません。</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-9 sm:py-24" aria-labelledby="workflow-title">
          <div className="flex items-center gap-3 text-neutral-600"><ClipboardList size={20} aria-hidden="true" /><p className="text-xs font-black tracking-[.16em]">HOW WE WORK</p></div>
          <h2 id="workflow-title" className="mt-3 text-[clamp(30px,4vw,46px)] font-black tracking-[-.05em]">相談から、次の開催まで。</h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-5">
            {steps.map(([n, title, desc]) => (
              <li key={n} className="border-t-2 border-neutral-900 bg-white p-5">
                <p className="text-[28px] font-black tracking-[-.08em] text-neutral-500">{n}</p>
                <h3 className="mt-5 text-[16px] font-black">{title}</h3>
                <p className="mt-3 text-[13px] leading-7 text-neutral-600">{desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex items-start gap-3 border border-neutral-300 bg-white p-5">
            <ShieldCheck className="mt-1 shrink-0" size={22} aria-hidden="true" />
            <p className="text-sm leading-7 text-neutral-700">
              <strong>募集開始の条件：</strong>日程・会場の有料利用可否、費用、集金主体、保険と安全管理、責任者、変更・キャンセル規定を確認してから一般向けに募集します。
            </p>
          </div>
        </section>

        <section className="bg-[#141516] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-9 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs font-black tracking-[.16em] text-[#f3a567]">REPEAT / DEVELOP</p>
              <h2 className="mt-3 text-[clamp(30px,4vw,48px)] font-black leading-tight tracking-[-.05em]">1回で終わらない。<br />だから、育成になる。</h2>
              <p className="mt-5 max-w-xl text-sm leading-8 text-white/75">
                初回で気づいた課題を普段の練習で試し、次回に変化を確かめる。ご希望に応じて年間2〜4回や3回シリーズの開催を相談できます。
              </p>
              <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" data-cta="national-tour-repeat-host-enquiry"
                 className="mt-7 inline-flex min-h-14 items-center justify-between gap-5 bg-white px-6 py-4 text-sm font-black text-[#141516] hover:bg-neutral-200">
                継続開催を相談する <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["1回目", "技術・判断の現状を確認"],
                ["2回目", "練習で試した変化を振り返る"],
                ["3回目", "ゲームへのつながりを再確認"],
              ].map(([heading, caption]) => (
                <div key={heading} className="flex items-center gap-5 border border-white/25 p-5">
                  <Repeat2 aria-hidden="true" className="shrink-0" size={23} />
                  <div><p className="font-black">{heading}</p><p className="mt-1 text-sm text-white/70">{caption}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-9 sm:py-24">
          <p className="text-xs font-black tracking-[.16em] text-neutral-600">COMMON QUESTIONS</p>
          <h2 className="mt-3 text-[clamp(29px,4vw,44px)] font-black tracking-[-.05em]">開催前によくある質問</h2>
          <div className="mt-7 divide-y divide-neutral-300 border-y border-neutral-300">
            {frequentlyAsked.map((entry) => (
              <details key={entry.q} className="group py-4">
                <summary className="cursor-pointer list-none py-2 text-[15px] font-black leading-7 marker:hidden">
                  <span className="flex items-center justify-between gap-4">{entry.q}<ArrowDown size={19} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" /></span>
                </summary>
                <p className="max-w-3xl pb-3 pt-2 text-sm leading-8 text-neutral-700">{entry.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-300 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-9 sm:py-20">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-neutral-100"><CalendarDays size={24} aria-hidden="true" /></div>
            <p className="mt-5 text-xs font-black tracking-[.16em] text-neutral-600">YOUR COURT, NEXT.</p>
            <h2 className="mt-3 text-[clamp(32px,5vw,58px)] font-black leading-tight tracking-[-.05em]">次は、あなたの地域へ。</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-neutral-700">県・希望時期・対象年代・人数が分かれば相談を始められます。体育館や料金が未確定でも、まずは条件を整理しましょう。</p>
            <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" data-cta="national-tour-footer-host-enquiry"
              className="mx-auto mt-8 inline-flex min-h-14 w-full max-w-md items-center justify-between bg-[#ff791f] px-6 py-4 text-sm font-black hover:bg-[#ff974d]">
              無料開催相談フォームへ <ArrowUpRight size={21} aria-hidden="true" />
            </a>
            <p className="mt-4 text-xs leading-6 text-neutral-500">送信後はRBAが内容を確認します。予約・費用・開催を自動確定するものではありません。</p>
            <a href="/ja/clinic-request" className="mt-6 inline-flex items-center gap-2 text-sm font-bold underline underline-offset-4">
              開催までの詳細を見る <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
