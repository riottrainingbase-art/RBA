import { pageMetadata } from "@/components/page-metadata";
import { TorstenJapanLanding } from "@/components/torsten-japan-landing";

export const metadata = pageMetadata("ja", "events/torsten-loibl-online-clinic");

export default function Page() {
  return <TorstenJapanLanding />;
}
