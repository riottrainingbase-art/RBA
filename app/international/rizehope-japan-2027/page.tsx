import type { Metadata } from "next";
import { RizehopeFestivalEntry } from "@/components/rizehope-festival-entry";

export const metadata: Metadata = {
  title: "RIZEHOPE JAPAN 2027 | International U12 Basketball Festival",
  description: "27–28 February 2027, Shibata, Miyagi, Japan. Free overseas U12 team interest, a separate domestic-club application and RBA UNITED guardian interest.",
  alternates: {
    canonical: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
    languages: {
      en: "https://riotbasketballacademy.com/international/rizehope-japan-2027",
      ja: "https://riotbasketballacademy.com/ja/international/rizehope-japan-2027",
    },
  },
  openGraph: {
    title: "RIZEHOPE JAPAN 2027 | International U12 Basketball Festival",
    description: "Different teams. One shared court. PLAY. LEARN. CONNECT.",
    images: ["/rba-logo-original.jpg"],
    type: "website",
  },
};

export default function Page() {
  return <RizehopeFestivalEntry locale="en" />;
}
