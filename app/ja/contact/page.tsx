import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Plane, Users, Volleyball } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";

export const metadata: Metadata = {
  title: { absolute: "RBAお問い合わせ｜参加・チーム・地域開催・海外交流" },
  description: "参加したい活動、チーム・団体支援、地域開催、海外交流、協賛・連携など、内容に合うRBAの窓口をご案内します。",
  alternates: { canonical: "https://riotbasketballacademy.com/ja/contact" },
  openGraph: {
    title: "RBAお問い合わせ｜参加・チーム・地域開催・海外交流",
    description: "参加、チーム支援、地域開催、海外交流など、相談内容に合う窓口をご案内します。",
    url: "https://riotbasketballacademy.com/ja/contact",
    siteName: "Riot Basketball Academy",
    locale: "ja_JP",
    type: "website",
    images: ["/rba-court-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RBAお問い合わせ｜参加・チーム・地域開催・海外交流",
    description: "参加、チーム支援、地域開催、海外交流など、相談内容に合う窓口をご案内します。",
    images: ["/rba-court-hero.png"],
  },
};

const routes = [
  {
    icon: Volleyball,
    tag: "PLAYER / FAMILY",
    title: "活動に参加したい",
    body: "クリニック、キャンプ、スクール、大会・遠征など、現在参加できる活動を探します。",
    href: "/ja/opportunities",
    cta: "募集中の活動を見る",
  },
  {
    icon: Users,
    tag: "TEAM / ORGANIZER",
    title: "チーム・団体で相談したい",
    body: "チーム育成、訪問指導、地域開催、大会・イベント運営について、目的に合う窓口を選べます。",
    href: "/ja/organizer",
    cta: "チーム・団体向けを見る",
  },
  {
    icon: Plane,
    tag: "INTERNATIONAL",
    title: "海外交流を相談したい",
    body: "交流試合、遠征、キャンプ、指導者交流、海外アカデミーとの連携を相談できます。",
    href: "/ja/international",
    cta: "海外交流を見る",
  },
  {
    icon: HelpCircle,
    tag: "OTHER",
    title: "その他の問い合わせ",
    body: "申込・決済の確認、協賛・連携、上記に当てはまらない内容はこちらからお送りください。",
    href: "https://form.jotform.com/262590542634055",
    cta: "お問い合わせフォームを開く",
    external: true,
  },
] as const;

export default function Page() {
  return <SiteFrame locale="ja" languagePage="contact">
    <section className="inner-hero section-pad">
      <Link className="back-link" href="/ja">← RBA</Link>
      <p className="section-index">CONTACT RBA</p>
      <h1>相談したい内容から、<br/>お選びください。</h1>
      <p>活動への参加、チーム支援、海外交流など、相談内容ごとに専用ページがあります。該当する項目を選んでください。どれに当てはまるか分からない場合は、お問い合わせフォームからご連絡ください。</p>
    </section>

    <section className="access-grid section-pad">
      {routes.map(({icon:Icon,tag,title,body,href,cta,...route})=><article key={tag}>
        <Icon size={28}/>
        <span>{tag}</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <a className="text-link" href={href} target={"external" in route&&route.external?"_blank":undefined} rel={"external" in route&&route.external?"noreferrer":undefined}>{cta}<ArrowRight size={16}/></a>
      </article>)}
    </section>

    <section className="closing-cta section-pad">
      <p className="eyebrow">NOT SURE WHERE TO START?</p>
      <h2>相談内容がまとまっていなくても、<br/>大丈夫です。</h2>
      <p>地域、対象年代、人数、希望時期、困っていることなど、分かる範囲だけで構いません。</p>
      <div className="closing-actions">
        <a className="button button-orange" href="https://form.jotform.com/262590542634055" target="_blank" rel="noreferrer">お問い合わせフォーム<ArrowRight size={17}/></a>
        <a className="button button-dark" href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer">公式LINEを見る<ArrowRight size={17}/></a>
      </div>
    </section>
  </SiteFrame>;
}
