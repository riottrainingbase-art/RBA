import {NextResponse} from "next/server";
import {getLatestPublicUpdate,type ContentLocale} from "@/lib/public-content";
export async function GET(request:Request){
 const locale=new URL(request.url).searchParams.get("locale")||"ja";
 if(!["en","ja","zh-tw","ko"].includes(locale))return NextResponse.json({update:null},{status:400});
 try{const update=await getLatestPublicUpdate(locale as ContentLocale);return NextResponse.json({update},{headers:{"Cache-Control":"public, s-maxage=60, stale-while-revalidate=120"}});}catch{return NextResponse.json({update:null},{status:503});}
}
