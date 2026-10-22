import { RegionalProgram, regionalMetadata } from "@/components/regional-program";
export const metadata = regionalMetadata("ja");
export default function Page() { return <RegionalProgram locale="ja" />; }
