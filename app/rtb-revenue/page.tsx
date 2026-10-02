import type { Metadata } from "next";
import RTBRevenueClient from "./rtb-revenue-client";

export const metadata:Metadata={
 title:{absolute:"RTB｜TRAIN / ASSESS / SELECT / PARTNER"},
 description:"Riot Training Baseのトレーニング、評価、RTB SELECT、チーム・法人・ブランド連携の入口。",
 robots:{index:false,follow:false},
};

export default function Page(){return <RTBRevenueClient/>;}
