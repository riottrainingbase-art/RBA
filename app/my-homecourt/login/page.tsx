import type { Metadata } from "next";
import { MemberLoginEntry } from "@/components/member-login-entry";
export const metadata:Metadata={title:"RBA ID Login",robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<{error?:string|string[];next?:string|string[];role?:string;source?:string}>}){const query=await searchParams;return <MemberLoginEntry locale="en" next={typeof query.next==="string"?query.next:undefined} initialRole={query.role==="coach"?"coach":undefined} source={typeof query.source==="string"?query.source.slice(0,80):undefined} authError={query.error==="browser"||query.error==="expired"?query.error:query.error==="auth"}/>;}
