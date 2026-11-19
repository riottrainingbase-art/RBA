import type { Metadata } from "next";
import { RizehopeInternationalPage } from "@/components/rizehope-international";

export const metadata:Metadata = {
  title: "RIZEHOPE JAPAN 2027 | U12 International Basketball Exchange | RBA",
  description: "February 27–28, 2027, Shibata Town Gymnasium, Miyagi, Japan. Overseas U12 teams are invited to express interest for free. RBA coordinates visiting-team enquiries.",
  alternates: {
    canonical: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
    languages: {
      ja: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
      en: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
      "x-default": "https://riotbasketballacademy.com/international/rizehope-japan-2027",
    },
  },
  openGraph: {
    title: "RIZEHOPE JAPAN 2027 | U12 International Exchange",
    description: "Feb 27–28, 2027 / Shibata Town Gymnasium, Miyagi, Japan / Overseas and Japan-based U12 team interest",
    url: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
    siteName: "Riot Basketball Academy",
    type: "website",
    images: [{ url: "https://riotbasketballacademy.com/rba-definitive/assets/og-platform.png" }],
  },
};
export default function Page(){ return <RizehopeInternationalPage lang="en"/>; }
