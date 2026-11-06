import { pageMetadata } from "@/components/page-metadata";
import { LocalizedCorePage } from "@/components/localized-core-page";

export const metadata = pageMetadata("ja", "partners");

export default function Page() {
  return <LocalizedCorePage locale="ja" kind="partners" />;
}
