import { RegionalProgram, regionalMetadata } from "@/components/regional-program";
export const metadata = regionalMetadata("en");
export default function Page() { return <RegionalProgram locale="en" />; }
