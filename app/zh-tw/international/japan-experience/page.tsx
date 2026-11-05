import type { Metadata } from "next";
import { JapanExperienceLanding } from "@/components/japan-experience-landing";

export const metadata:Metadata={
 title:"RBA JAPAN EXPERIENCE｜赴日籃球交流・文化體驗",
 description:"為海外學校與球隊提供日本籃球培育營、友誼賽和文化交流的免費洽詢。",
 alternates:{canonical:"https://riotbasketballacademy.com/zh-tw/international/japan-experience",languages:{"en":"https://riotbasketballacademy.com/international/japan-experience","ja":"https://riotbasketballacademy.com/ja/international/japan-experience","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/international/japan-experience","x-default":"https://riotbasketballacademy.com/international/japan-experience"}},
 openGraph:{title:"RBA JAPAN EXPERIENCE｜赴日籃球交流・文化體驗",description:"為海外學校與球隊提供日本籃球培育營、友誼賽和文化交流的免費洽詢。",url:"https://riotbasketballacademy.com/zh-tw/international/japan-experience",type:"website",images:[{url:"/rba-court-hero.png"}]},
};
export default function Page(){return <JapanExperienceLanding locale="zh-tw" mode="visit"/>;}
