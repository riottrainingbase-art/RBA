import type {Metadata} from "next";
import {DefinitiveStaticPage} from "@/components/definitive-static-page";

export const metadata:Metadata={
  title:{absolute:"D-HUB｜学びを実践につなげる指導者・選手向けプログラム | RBA"},
  description:"D-HUBは、テーマを決め、実践し、振り返ることを続けるRBAの継続型プログラムです。指導者向けのCOACH LABと、選手向けのPLAYERSがあります。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/d-hub"},
  openGraph:{
    title:"D-HUB｜COACH LAB / PLAYERS",
    description:"テーマを決め、現場で試し、振り返る。学びを継続的な実践に変えるプログラム。",
    url:"https://riotbasketballacademy.com/ja/d-hub",
    siteName:"Riot Basketball Academy",
    locale:"ja_JP",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  },
  twitter:{
    card:"summary_large_image",
    title:"D-HUB｜COACH LAB / PLAYERS",
    description:"課題を決め、実践し、振り返ることを続けるRBAの継続型プログラム。",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  }
};

export default function Page(){return <DefinitiveStaticPage page="d-hub" locale="ja"/>;}