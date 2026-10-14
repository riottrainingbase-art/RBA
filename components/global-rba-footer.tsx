import Image from "next/image";

type Lang = "ja"|"en"|"zh-tw"|"ko";
const translations:Record<Lang,{brand:string;start:string;learn:string;host:string;international:string;member:string;about:string;policies:string;contact:string;notice:string}>={
 ja:{brand:"RBAの活動を探す",start:"参加する",learn:"学ぶ",host:"開催・相談",international:"海外交流",member:"MY HOME COURT",about:"RBAについて",policies:"規約・安全方針",contact:"お問い合わせ",notice:"参加条件・料金・日程は、各活動の公式案内をご確認ください。"},
 en:{brand:"Explore RBA",start:"Take part",learn:"Learn",host:"Host / partner",international:"International",member:"MY HOME COURT",about:"About RBA",policies:"Policies & safety",contact:"Contact",notice:"Please check each programme's official page for dates, fees and booking terms."},
 "zh-tw":{brand:"探索RBA",start:"參加活動",learn:"閱讀學習",host:"邀請合作",international:"日本交流",member:"MY HOME COURT",about:"認識RBA",policies:"條款與安全",contact:"聯絡我們",notice:"日期、費用與報名條件請以各活動的正式公告為準。"},
 ko:{brand:"RBA 활동 안내",start:"참가하기",learn:"배우기",host:"개최·협력",international:"해외 교류",member:"MY HOME COURT",about:"RBA 소개",policies:"약관·안전",contact:"문의하기",notice:"날짜, 참가비 및 신청 조건은 각 프로그램의 공식 안내를 확인해 주세요."}
};
export function GlobalRbaFooter({language}:{language:string}){
 const lang:Lang=language==="ja"?"ja":language==="ko"?"ko":language==="zh-tw"||language==="zh-Hant-TW"?"zh-tw":"en";
 const c=translations[lang],p=lang==="en"?"":"/"+lang;
 const links:[[string,string],[string,string],[string,string],[string,string]]=[
  [c.start,p+"/opportunities"],[c.learn,p+"/journal"],[c.host,p+"/organizer"],[c.international,p+"/international"]
 ];
 return <footer className="rba-global-footer" aria-label="RBA site-wide navigation">
  <div className="rba-global-footer-inner">
   <a className="rba-global-brand" href={p||"/"} aria-label="Riot Basketball Academy">
    <Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy 公式ロゴ" width={42} height={58} />
    <span><strong>RIOT BASKETBALL ACADEMY</strong><small>{c.brand}</small></span>
   </a>
   <nav aria-label={c.brand} className="rba-global-mainlinks">
    {links.map(([label,url])=><a href={url} key={url}>{label}<span aria-hidden="true"> ↗</span></a>)}
   </nav>
   <div className="rba-global-secondary">
    <a href="/backbone">BACKBONE 3×3</a>
    <a href={p+"/my-homecourt"}>{c.member}</a>
    <a href={p+"/about"}>{c.about}</a>
    <a href={p+"/policies"}>{c.policies}</a>
    <a href={p+"/contact"}>{c.contact}</a>
   </div>
   <p className="rba-global-notice">{c.notice}</p>
  </div>
 </footer>;
}
