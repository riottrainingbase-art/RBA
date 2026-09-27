import type { Metadata } from "next";
import { HomecourtMatchBoard } from "@/components/homecourt-match-board";
import { SiteFrame } from "@/components/site-frame";

export const metadata:Metadata={
  title:"HOMECOURT MATCH | 国際育成交流 | RBA",
  description:"日本・台湾・韓国・マレーシアなど、育成年代のチーム同士が交流試合・共同練習・受入条件からつながるHOMECOURT MATCH。",
  alternates:{canonical:"/ja/homecourt/match"}
};

export default function Page(){
  return <SiteFrame locale="ja" languagePage="international"><HomecourtMatchBoard/></SiteFrame>;
}
