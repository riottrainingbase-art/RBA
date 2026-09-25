import { MyHomecourt } from "@/components/my-homecourt";
import { homecourtRoleMetadata } from "@/components/page-metadata";
export const metadata=homecourtRoleMetadata("ja","families");
export default function Page(){return <MyHomecourt locale="ja" role="families"/>}
