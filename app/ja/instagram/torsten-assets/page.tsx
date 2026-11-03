import type { Metadata } from "next";
import { TorstenCarouselStudio } from "@/components/torsten-carousel-studio";

export const metadata: Metadata = {
  title: "Torsten Vol.2 投稿画像10枚の作成・保存 | RBA",
  description: "RBA公式ロゴを使用した白黒10枚のカルーセルをPNG形式で保存する制作ページです。",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://riotbasketballacademy.com/ja/instagram/torsten-assets" },
};

export default function Page() {
  return <TorstenCarouselStudio />;
}
