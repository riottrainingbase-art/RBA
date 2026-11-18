import type { Metadata } from "next";
import { SiteFrame } from "@/components/site-frame";
import { HomecourtNextPlay } from "@/components/homecourt-next-play";
import { getNextPlay, isNextPlayRole } from "@/lib/homecourt-next-play";

export const metadata: Metadata = {
  title: "RBA NEXT PLAY｜バスケの悩みを、次の1プレーに｜無料育成ガイド",
  description: "試合で動けない、出場時間が少ない、子どもへの声かけ、指導者の練習設計。選手・保護者・指導者の悩みから、今日できる3つの実践を見つけるRiot Basketball Academyの無料ガイド。",
  alternates: { canonical: "/ja/my-homecourt/next-play" },
  openGraph: {
    title: "RBA NEXT PLAY｜悩みを、次の1プレーに。",
    description: "保護者・選手・指導者の12の悩みから、今日の実践を見つける無料ガイド。",
    type: "website",
    locale: "ja_JP",
  },
};

export default async function NextPlayPage({ searchParams }: {
  searchParams: Promise<{ role?: string | string[]; topic?: string | string[] }>;
}) {
  const query = await searchParams;
  const role = typeof query.role === "string" && isNextPlayRole(query.role)
    ? query.role
    : "parent";
  const topic = typeof query.topic === "string" ? query.topic : "";
  const selected = getNextPlay(role, topic);
  return (
    <SiteFrame locale="ja" languagePage="my-homecourt">
      <HomecourtNextPlay initialRole={role} initialTopic={selected.id} />
    </SiteFrame>
  );
}
