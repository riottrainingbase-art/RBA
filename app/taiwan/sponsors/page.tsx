import type { Metadata } from "next";
import { TaiwanSponsorship } from "@/components/taiwan-sponsorship";
export const metadata:Metadata={
 title:"RBA Taiwan | Youth Basketball Partnership & Sponsorship",
 description:"Corporate collaboration supporting youth access, coach education and Japan–Taiwan basketball exchange. Expressions of interest welcomed.",
 alternates:{canonical:"https://riotbasketballacademy.com/taiwan/sponsors",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/sponsors","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/sponsors","en":"https://riotbasketballacademy.com/taiwan/sponsors","ko":"https://riotbasketballacademy.com/ko/taiwan/sponsors"}},
 openGraph:{title:"RBA Taiwan | Youth Basketball Partnership & Sponsorship",description:"Corporate collaboration supporting youth access, coach education and Japan–Taiwan basketball exchange. Expressions of interest welcomed.",url:"https://riotbasketballacademy.com/taiwan/sponsors",type:"website",siteName:"Riot Basketball Academy"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanSponsorship locale="en" />;}
