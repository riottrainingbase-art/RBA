import type { Metadata } from "next";
import { MemberLogin } from "@/components/member-login";
export const metadata:Metadata={title:"RBA ID ログイン",robots:{index:false,follow:false}};
export default function Page(){return <MemberLogin locale="ja"/>;}