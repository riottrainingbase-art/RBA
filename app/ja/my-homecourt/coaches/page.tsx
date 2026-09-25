import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("ja","coaches");
export default function Page(){return <MyHomecourt locale="ja" role="coaches"/>}
