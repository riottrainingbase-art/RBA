import type { Metadata } from "next";
import { JapanExperienceLanding } from "@/components/japan-experience-landing";

export const metadata:Metadata={
 title:"RBA JAPAN EXPERIENCE｜旅行会社・企業スポンサー募集",
 description:"訪日バスケットボール交流に向けた登録旅行会社、宿泊、交通、教育機関、地域企業、スポンサーの協業相談。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/international/partner-with-us",languages:{"en":"https://riotbasketballacademy.com/international/partner-with-us","ja":"https://riotbasketballacademy.com/ja/international/partner-with-us","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/partner-with-us","x-default":"https://riotbasketballacademy.com/international/partner-with-us"}},
 openGraph:{title:"RBA JAPAN EXPERIENCE｜旅行会社・企業スポンサー募集",description:"訪日バスケットボール交流に向けた登録旅行会社、宿泊、交通、教育機関、地域企業、スポンサーの協業相談。",url:"https://riotbasketballacademy.com/ja/international/partner-with-us",type:"website",images:[{url:"/rba-court-hero.png"}]},
};
export default function Page(){return <JapanExperienceLanding locale="ja" mode="business"/>;}
