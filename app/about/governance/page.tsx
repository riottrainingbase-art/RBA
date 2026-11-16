import type { Metadata } from "next";
import { GovernanceLocalizedSummary } from "@/components/governance-localized-summary";
export const metadata:Metadata={title:"Organisation & Governance | RBA",description:"Current RBA rules, nonprofit purpose and a separate draft governance proposal. The Japanese source identifies the rules currently in force.",alternates:{canonical:"https://riotbasketballacademy.com/about/governance",languages:{"en":"https://riotbasketballacademy.com/about/governance","ja":"https://riotbasketballacademy.com/ja/about/governance","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/about/governance","ko":"https://riotbasketballacademy.com/ko/about/governance"}}};
export default function Page(){return <GovernanceLocalizedSummary locale="en"/>;}
