import type { Metadata } from "next";
import { SagaFukuokaCampPage } from "@/components/saga-fukuoka-camp-page";

export const metadata: Metadata = {
  title: "Saga × Fukuoka 2-Day Development Camp | RBA",
  description: "RBA Development Camp on 3–4 October 2026 with full-camp, day-only and single-session options.",
  alternates: {
    canonical: "https://riotbasketballacademy.com/camp/saga-fukuoka-2026",
    languages: {
      en: "https://riotbasketballacademy.com/camp/saga-fukuoka-2026",
      ja: "https://riotbasketballacademy.com/ja/camp/saga-fukuoka-2026",
      "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp/saga-fukuoka-2026",
      ko: "https://riotbasketballacademy.com/ko/camp/saga-fukuoka-2026",
      "x-default": "https://riotbasketballacademy.com/camp/saga-fukuoka-2026"
    }
  }
};

export default function Page(){ return <SagaFukuokaCampPage locale="en" />; }
