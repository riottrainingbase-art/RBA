import type { Metadata } from "next";
import { GovernanceLocalizedSummary } from "@/components/governance-localized-summary";
export const metadata:Metadata={title:"團體概要與治理原則｜RBA",description:"RBA非營利宗旨、現行規章及未生效的改訂草案。",alternates:{canonical:"https://riotbasketballacademy.com/zh-tw/about/governance",languages:{"en":"https://riotbasketballacademy.com/about/governance","ja":"https://riotbasketballacademy.com/ja/about/governance","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/about/governance","ko":"https://riotbasketballacademy.com/ko/about/governance"}}};
export default function Page(){return <GovernanceLocalizedSummary locale="zh-tw"/>;}
