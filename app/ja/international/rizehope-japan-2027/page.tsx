import type { Metadata } from "next";
import { RizehopeInternationalPage } from "@/components/rizehope-international";

export const metadata:Metadata = {
  title: "RIZEHOPE JAPAN 2027｜U12国際交流試合・海外チーム招聘｜RBA",
  description: "2027年2月27・28日、柴田町総合体育館。予約済み会場で開催準備中のU12国際交流。海外チーム・国内チーム・RBA UNITEDの無料参加意向受付と海外アテンド・協賛相談をご案内。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
    languages: {
      ja: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
      en: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
      "x-default": "https://riotbasketballacademy.com/international/rizehope-japan-2027",
    },
  },
  openGraph: {
    title: "RIZEHOPE JAPAN 2027｜U12国際交流｜宮城",
    description: "2027.2.27–28 / 柴田町総合体育館 / 海外チーム・国内チーム・RBA UNITEDの先行意向受付",
    url: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};
export default function Page(){ return <RizehopeInternationalPage lang="ja"/>; }
