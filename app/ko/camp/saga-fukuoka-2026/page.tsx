import type { Metadata } from "next";
import { SagaFukuokaCampPage } from "@/components/saga-fukuoka-camp-page";

export const metadata: Metadata = {
  title: "사가 × 후쿠오카 2DAYS DEVELOPMENT CAMP | RBA",
  description: "2026년 10월 3–4일. 2일 전체, 당일 또는 1세션 참가 플랜.",
  alternates: {
    canonical: "https://riotbasketballacademy.com/ko/camp/saga-fukuoka-2026",
    languages: {
      en: "https://riotbasketballacademy.com/camp/saga-fukuoka-2026",
      ja: "https://riotbasketballacademy.com/ja/camp/saga-fukuoka-2026",
      "zh-Hant-TW": "https://riotbasketballacademy.com/zh-tw/camp/saga-fukuoka-2026",
      ko: "https://riotbasketballacademy.com/ko/camp/saga-fukuoka-2026",
      "x-default": "https://riotbasketballacademy.com/camp/saga-fukuoka-2026"
    }
  }
};

export default function Page(){ return <SagaFukuokaCampPage locale="ko" />; }
