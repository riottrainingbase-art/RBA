import type { Metadata } from "next";
import { JapanExperienceLanding } from "@/components/japan-experience-landing";

export const metadata:Metadata={
 title:"RBA JAPAN EXPERIENCE｜海外チームの日本遠征・育成交流",
 description:"海外の学校・クラブ向けに、バスケットボールキャンプ、交流試合、文化体験、教育交流の無料相談を受付。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/international/japan-experience",languages:{"en":"https://riotbasketballacademy.com/international/japan-experience","ja":"https://riotbasketballacademy.com/ja/international/japan-experience","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/japan-experience","x-default":"https://riotbasketballacademy.com/international/japan-experience"}},
 openGraph:{title:"RBA JAPAN EXPERIENCE｜海外チームの日本遠征・育成交流",description:"海外の学校・クラブ向けに、バスケットボールキャンプ、交流試合、文化体験、教育交流の無料相談を受付。",url:"https://riotbasketballacademy.com/ja/international/japan-experience",type:"website",images:[{url:"/rba-court-hero.png"}]},
};
export default function Page(){return <JapanExperienceLanding locale="ja" mode="visit"/>;}
