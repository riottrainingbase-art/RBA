import type { Metadata } from "next";
import { JapanExperienceLanding } from "@/components/japan-experience-landing";

export const metadata:Metadata={
 title:"RBA JAPAN EXPERIENCE｜企業合作與贊助",
 description:"邀請旅行業者、飯店、教育機構、地方供應商和企業品牌合作支持赴日青少年籃球交流。",
 alternates:{canonical:"https://riotbasketballacademy.com/zh-tw/international/partner-with-us",languages:{"en":"https://riotbasketballacademy.com/international/partner-with-us","ja":"https://riotbasketballacademy.com/ja/international/partner-with-us","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/partner-with-us","x-default":"https://riotbasketballacademy.com/international/partner-with-us"}},
 openGraph:{title:"RBA JAPAN EXPERIENCE｜企業合作與贊助",description:"邀請旅行業者、飯店、教育機構、地方供應商和企業品牌合作支持赴日青少年籃球交流。",url:"https://riotbasketballacademy.com/zh-tw/international/partner-with-us",type:"website",images:[{url:"/rba-court-hero.png"}]},
};
export default function Page(){return <JapanExperienceLanding locale="zh-tw" mode="business"/>;}
