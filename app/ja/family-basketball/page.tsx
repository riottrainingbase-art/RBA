import type { Metadata } from "next";
import { DomesticGrowth } from "@/components/domestic-growth";
export const metadata: Metadata = {"title": "企業・団体の親子バスケットボール企画｜RBA", "description": "社員家族の交流、地域の親子体験会、施設イベントに。初心者も参加できる親子バスケットボールを企画します。", "alternates": {"canonical": "/ja/family-basketball"}};
export default function Page(){return <DomesticGrowth mode="family"/>}
