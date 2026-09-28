import { pageMetadata } from "@/components/page-metadata";
import { LocalizedPayments } from "@/components/localized-payments";
export const metadata=pageMetadata("ja","payments");
export const revalidate=300;

export default function Page(){return <LocalizedPayments locale="ja"/>}