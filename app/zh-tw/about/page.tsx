import { pageMetadata } from "@/components/page-metadata";
export const metadata = pageMetadata("zh-tw","about");
import { LocalizedCorePage } from "@/components/localized-core-page";
export default function Page(){return <LocalizedCorePage locale="zh-tw" kind="about"/>}
