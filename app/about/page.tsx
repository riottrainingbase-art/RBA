import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("en","about");
import { LocalizedCorePage } from "@/components/localized-core-page";
export default function Page(){return <LocalizedCorePage locale="en" kind="about"/>}