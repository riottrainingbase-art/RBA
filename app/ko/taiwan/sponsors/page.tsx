import type { Metadata } from "next";
import { TaiwanSponsorship } from "@/components/taiwan-sponsorship";
export const metadata:Metadata={
 title:"RBA Taiwan | 유소년 농구 협찬 및 기업 협력",
 description:"일본과 대만의 유소년 농구 교류, 지도자 교육, 참가 기회 지원을 위한 기업 협력 안내.",
 alternates:{canonical:"https://riotbasketballacademy.com/ko/taiwan/sponsors",languages:{"ja":"https://riotbasketballacademy.com/ja/taiwan/sponsors","zh-Hant-TW":"https://riotbasketballacademy.com/zh-tw/taiwan/sponsors","en":"https://riotbasketballacademy.com/taiwan/sponsors","ko":"https://riotbasketballacademy.com/ko/taiwan/sponsors"}},
 openGraph:{title:"RBA Taiwan | 유소년 농구 협찬 및 기업 협력",description:"일본과 대만의 유소년 농구 교류, 지도자 교육, 참가 기회 지원을 위한 기업 협력 안내.",url:"https://riotbasketballacademy.com/ko/taiwan/sponsors",type:"website",siteName:"Riot Basketball Academy"},
 robots:{index:true,follow:true}
};
export default function Page(){return <TaiwanSponsorship locale="ko" />;}
