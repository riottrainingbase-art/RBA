import type {Metadata} from "next";
import {DefinitiveStaticPage} from "@/components/definitive-static-page";

export const metadata:Metadata={
  title:{absolute:"D-HUB｜実践を続ける指導者・選手育成プログラム | RBA"},
  description:"D-HUBは有料記事の置き場ではなく、COACH LABとPLAYERSで課題・実践・振り返りを続けるRBAの継続育成プログラムです。HOMECOURT PLUSのDEVELOPMENT LIBRARYとは役割を分けています。",
  alternates:{canonical:"https://riotbasketballacademy.com/ja/d-hub"},
  openGraph:{
    title:"D-HUB｜COACH LAB / PLAYERS",
    description:"読むだけで終わらせず、テーマを決め、現場で試し、振り返り、次へ進む継続育成プログラム。",
    url:"https://riotbasketballacademy.com/ja/d-hub",
    siteName:"Riot Basketball Academy",
    locale:"ja_JP",
    type:"website",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  },
  twitter:{
    card:"summary_large_image",
    title:"D-HUB｜COACH LAB / PLAYERS",
    description:"課題 → 実践 → 振り返りを続けるRBAの継続育成プログラム。",
    images:["https://riotbasketballacademy.com/rba-court-hero.png"]
  }
};

export default function Page(){return <DefinitiveStaticPage page="d-hub" locale="ja"/>;}