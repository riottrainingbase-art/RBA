import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = { title: "RBA UNITED｜申込・前金50％決済", robots: { index: false, follow: false } };
export default function Page() { redirect("/ja/events/kobe-boys-u14-exchange-2027/apply"); }
