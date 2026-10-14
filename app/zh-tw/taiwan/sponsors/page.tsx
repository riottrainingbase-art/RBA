import type { Metadata } from "next";
import { TaiwanSponsorship } from "@/components/taiwan-sponsorship";
export const metadata:Metadata={
 title:"RBA台灣｜青少年籃球培育・企業贊助合作",
 description:"支持台日青少年籃球交流、教練培育與參與機會。歡迎企業洽詢專案或實物合作。",
 alternates:{canonical:"https://riotbasketballacademy.com/zh-tw/taiwan/sponsors",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/sponsors","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/sponsors","en":"https://riotbasketballacademy.com/taiwan/sponsors","ko":"https://riotbasketballacademy.com/ko/taiwan/sponsors"}},
 openGraph:{title:"RBA台灣｜青少年籃球培育・企業贊助合作",description:"支持台日青少年籃球交流、教練培育與參與機會。歡迎企業洽詢專案或實物合作。",url:"https://riotbasketballacademy.com/zh-tw/taiwan/sponsors",type:"website",siteName:"Riot Basketball Academy"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanSponsorship locale="zh-tw" />;}
