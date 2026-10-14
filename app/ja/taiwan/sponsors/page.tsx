import type { Metadata } from "next";
import { TaiwanSponsorship } from "@/components/taiwan-sponsorship";
export const metadata:Metadata={
 title:"RBA台湾｜日台育成交流の協賛・企業連携",
 description:"仙台から台湾へ。RBAの子どもたちの参加機会、指導者育成、日台交流を支える協賛・企業連携のご相談。",
 alternates:{canonical:"https://riotbasketballacademy.com/ja/taiwan/sponsors",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/sponsors","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/sponsors","en":"https://riotbasketballacademy.com/taiwan/sponsors","ko":"https://riotbasketballacademy.com/ko/taiwan/sponsors"}},
 openGraph:{title:"RBA台湾｜日台育成交流の協賛・企業連携",description:"仙台から台湾へ。RBAの子どもたちの参加機会、指導者育成、日台交流を支える協賛・企業連携のご相談。",url:"https://riotbasketballacademy.com/ja/taiwan/sponsors",type:"website",siteName:"Riot Basketball Academy"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanSponsorship locale="ja" />;}
