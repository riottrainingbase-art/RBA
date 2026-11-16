import type { Metadata } from "next";
import { GovernanceLocalizedSummary } from "@/components/governance-localized-summary";
export const metadata:Metadata={title:"단체 개요 및 운영 원칙｜RBA",description:"RBA의 비영리 목적, 현행 일본어 규약과 미시행 개정안을 구분하여 안내합니다.",alternates:{canonical:"https://riotbasketballacademy.com/ko/about/governance",languages:{"en":"https://riotbasketballacademy.com/about/governance","ja":"https://riotbasketballacademy.com/ja/about/governance","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/about/governance","ko":"https://riotbasketballacademy.com/ko/about/governance"}}};
export default function Page(){return <GovernanceLocalizedSummary locale="ko"/>;}
