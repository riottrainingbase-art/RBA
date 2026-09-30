import type { Metadata } from "next";
import { SagaFukuokaCampPage } from "@/components/saga-fukuoka-camp-page";

export const metadata: Metadata = {
  title: "佐賀 × 福岡 2DAYS DEVELOPMENT CAMP | RBA",
  description: "2026年10月3日至4日，可選兩日全程、單日或單一時段。",
  alternates: {
    canonical: "https://riotbasketballacademy.com/zh-tw/camp/saga-fukuoka-2026",
    languages: {
      en: "https://riotbasketballacademy.com/camp/saga-fukuoka-2026",
      ja: "https://riotbasketballacademy.com/ja/camp/saga-fukuoka-2026",
      "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp/saga-fukuoka-2026",
      ko: "https://riotbasketballacademy.com/ko/camp/saga-fukuoka-2026",
      "x-default": "https://riotbasketballacademy.com/camp/saga-fukuoka-2026"
    }
  }
};

export default function Page(){ return <SagaFukuokaCampPage locale="zh-tw" />; }
