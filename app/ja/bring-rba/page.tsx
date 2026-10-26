import type { Metadata } from "next";
import { DomesticGrowth } from "@/components/domestic-growth";
export const metadata: Metadata = {"title": "RBAをあなたのコートへ｜開催希望・企業親子企画・チーム支援", "description": "地域の開催希望、企業・団体の親子バスケットボール、チームの継続支援を相談できます。", "alternates": {"canonical": "/ja/bring-rba"}};
export default function Page(){return <DomesticGrowth mode="hub"/>}
