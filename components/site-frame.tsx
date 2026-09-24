import { DocumentLanguage } from "./document-language";
import { ui } from "./ui-copy";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Bell, House, MessageCircle } from "lucide-react";
import { getLatestPublicUpdate } from "@/lib/public-content";


export type Locale = "en" | "ja" | "zh-tw" | "ko";
export type LanguagePage = "about" | "approach" | "schedule" | "opportunities" | "international" | "payments" | "payment-complete" | "clinic-request" | "asia" | "partners" | "social" | "contact" | "policies" | "events/torsten-loibl-online-clinic" | "players" | "families" | "coaches" | "home-court" | "my-homecourt" | "community" | "impact" | "d-hub" | "united" | "connect" | "organizer" | "platform" | "journal";


const labels = {
  en: { about:"About", approach:"Approach", schedule:"Calendar", payments:"Registration & payment", clinic:"Torsten Clinic", asia:"Japan Access", partners:"Partners", contact:"Contact", whatsapp:"Talk to RBA", explore:"EXPLORE", follow:"FOLLOW / CONTACT", statement:<>Participation. Development. Education.<br/>A national basketball platform.</>, safeguard:"Child safeguarding, media consent and context guide every public field story.", message:"Hello RBA, I would like to ask about a clinic, event, Japan–Asia exchange or partnership." },
  ja: { about:"RBAについて", approach:"育成方針", schedule:"開催日程", payments:"申込・決済", clinic:"指導者講習", asia:"海外連携", partners:"協賛・連携", contact:"お問い合わせ", whatsapp:"WhatsAppで相談", explore:"サイト案内", follow:"公式チャンネル", statement:<>普及・育成・教育を、全国へ。<br/>日本とアジアをつなぐ育成プラットフォーム。</>, safeguard:"子どもの安全と肖像利用への同意を大切にし、活動の背景が正しく伝わる発信を心がけています。", message:"RBAについて相談があります。クリニック、イベント、海外交流、協賛について詳しく教えてください。" },
  "zh-tw": { about:"關於RBA", approach:"培育理念", schedule:"活動日程", payments:"報名・付款", clinic:"教練講座", asia:"日本交流", partners:"合作夥伴", contact:"聯絡我們", whatsapp:"WhatsApp洽詢", explore:"網站導覽", follow:"官方平台", statement:<>把世界標準帶給日本的孩子。<br/>成為連結日本與亞洲的培育橋樑。</>, safeguard:"所有公開內容均重視兒少安全、影像使用同意與完整脈絡。", message:"您好RBA，我想詢問訓練營、日本交流、教練講座或合作方案。" },
  ko: { about:"RBA 소개", approach:"육성 철학", schedule:"프로그램 일정", payments:"신청・결제", clinic:"코치 클리닉", asia:"일본 교류", partners:"파트너십", contact:"문의하기", whatsapp:"WhatsApp 상담", explore:"사이트 안내", follow:"공식 채널", statement:<>세계적 기준을 일본의 아이들에게.<br/>일본과 아시아를 잇는 육성의 다리.</>, safeguard:"모든 공개 콘텐츠는 아동 보호, 촬영·게시 동의와 정확한 맥락을 우선합니다.", message:"안녕하세요 RBA. 클리닉, 일본 교류, 코치 교육 또는 파트너십에 대해 문의하고 싶습니다." },
} as const;


const languageLabels:Record<Locale,string>={en:"EN",ja:"日本語","zh-tw":"繁中",ko:"한국어"};


export function localePath(locale:Locale, page?:LanguagePage){
  const prefix=locale==="en"?"":`/${locale}`;
  return page?`${prefix}/${page}`:prefix||"/";
}


export async function SiteFrame({ children, locale="en", languagePage }: { children:React.ReactNode; locale?:Locale; languagePage?:LanguagePage }) {
  const c=labels[locale];
  const latest=await getLatestPublicUpdate(locale);
  const fullNav=[
    [({en:"Players",ja:"選手","zh-tw":"球員",ko:"선수"})[locale],localePath(locale,"players")],
    [({en:"Families",ja:"保護者","zh-tw":"家長",ko:"보호자"})[locale],localePath(locale,"families")],
    [({en:"Coaches",ja:"コーチ・指導者","zh-tw":"教練",ko:"코치·지도자"})[locale],localePath(locale,"coaches")],
    ["RBA PLATFORM",localePath(locale,"platform")],
    ["MY HOME COURT",localePath(locale,"home-court")],
    [c.about,localePath(locale,"about")],
    [c.approach,localePath(locale,"approach")],
    [c.schedule,localePath(locale,"schedule")],
    [c.payments,localePath(locale,"payments")],
    [c.clinic,localePath(locale,"events/torsten-loibl-online-clinic")],
    [c.asia,localePath(locale,"asia")],
    [c.partners,localePath(locale,"partners")],
    ["RBA IMPACT",localePath(locale,"impact")],
    [({en:"D-HUB / COACH DEVELOPMENT",ja:"D-HUB／指導者育成","zh-tw":"D-HUB／教練培育",ko:"D-HUB／코치 교육"})[locale],localePath(locale,"d-hub")],
    ["RBA UNITED",localePath(locale,"united")],
    ["RBA CONNECT",localePath(locale,"connect")],
    ["ORGANIZER",localePath(locale,"organizer")],
    [({en:"Journal",ja:"JOURNAL","zh-tw":"JOURNAL",ko:"JOURNAL"})[locale],localePath(locale,"journal")] as const,
  ] as const;
  const nav=[
    [({en:"Find",ja:"活動を探す","zh-tw":"尋找活動",ko:"활동 찾기"})[locale],localePath(locale,"opportunities")] as const,
    ["MY HOME COURT",localePath(locale,"my-homecourt")] as const,
    [({en:"Platform",ja:"育成プラットフォーム","zh-tw":"培育平台",ko:"육성 플랫폼"})[locale],localePath(locale,"platform")] as const,
    [({en:"Coaches",ja:"指導者", "zh-tw":"教練",ko:"코치"})[locale],localePath(locale,"coaches")] as const,
    [({en:"International",ja:"海外交流","zh-tw":"國際交流",ko:"국제 교류"})[locale],localePath(locale,"international")] as const,
    [({en:"Journal",ja:"JOURNAL","zh-tw":"JOURNAL",ko:"JOURNAL"})[locale],localePath(locale,"journal")] as const,
    [({en:"Organisers",ja:"開催・連携","zh-tw":"主辦・合作",ko:"개최・협력"})[locale],localePath(locale,"organizer")] as const,
    [c.about,localePath(locale,"about")] as const,
  ];
  const whatsappHref=`https://wa.me/818032483703?text=${encodeURIComponent(c.message)}`;
  const memberHref=`${locale==="en"?"":`/${locale}`}/my-homecourt/login`;
  return <div className="site-shell"><DocumentLanguage language={locale==="zh-tw"?"zh-Hant-TW":locale}/>
    <a className="skip-link" href="#main-content">{({en:"Skip to content",ja:"本文へ移動","zh-tw":"跳至內容",ko:"본문으로 이동"})[locale]}</a>
    <header className="site-header">
      <a href={localePath(locale)} className="brand-lockup" aria-label={ui(locale,"home")}><Image className="brand-logo" src="/rba-logo-original.jpg" alt="Riot Basketball Academy RBA logo" width={203} height={284} priority/><span>RIOT BASKETBALL<br/>ACADEMY</span></a>
      <nav aria-label={ui(locale,"nav")}>{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
      <details className="mobile-site-menu"><summary>{({en:"MENU",ja:"メニュー","zh-tw":"選單",ko:"메뉴"})[locale]}</summary><div><a className="mobile-menu-primary" href={localePath(locale,"opportunities")}>{({en:"Find opportunities",ja:"育成機会を探す","zh-tw":"尋找培育機會",ko:"성장 기회 찾기"})[locale]}<ArrowRight size={16}/></a>{fullNav.map(([label,href])=><a key={href} href={href}>{label}</a>)}<a href={memberHref}>MY HOME COURT / RBA ID</a><a href={localePath(locale,"contact")}>{c.contact}</a></div></details>
      <div className="header-actions">
        <a href={memberHref} className="header-member"><House size={17}/><span>{({en:"SIGN IN",ja:"会員ログイン","zh-tw":"會員登入",ko:"회원 로그인"})[locale]}</span><ArrowRight size={14}/></a>
        <a href={whatsappHref} className="header-whatsapp" target="_blank" rel="noreferrer"><MessageCircle size={16}/><span>WhatsApp</span></a>
        <a href={localePath(locale,"contact")} className="header-contact">{c.contact}<ArrowUpRight size={15}/></a>
        <div className="language-links" role="group" aria-label="Language / 言語 / 語言 / 언어">{(Object.keys(languageLabels) as Locale[]).map(lang=><a key={lang} href={localePath(lang,languagePage)} aria-current={lang===locale?"true":undefined} hrefLang={lang==="zh-tw"?"zh-Hant-TW":lang}>{languageLabels[lang]}</a>)}</div>
      </div>
    </header>
    {latest?<a className="site-update-strip" href={latest.href}><Bell size={15}/><span>{({en:"NEW",ja:"更新","zh-tw":"最新",ko:"NEW"})[locale]} / {latest.kind.toUpperCase()}</span><strong>{latest.title}</strong><span className="site-update-cta">{({en:"Read",ja:"読む","zh-tw":"閱讀",ko:"읽기"})[locale]} <ArrowRight size={14}/></span></a>:null}
    <main id="main-content">{children}</main>
    <footer className="site-footer">
      <div className="footer-brand"><Image className="footer-logo" src="/rba-logo-original.jpg" alt="Riot Basketball Academy RBA logo" width={203} height={284}/><p>{c.statement}</p></div>
      <div><p className="footer-label">{c.explore}</p>{fullNav.map(([label,href])=><a key={href} href={href}>{label}</a>)}<a href={localePath(locale,"contact")}>{c.contact}</a></div>
      <div><p className="footer-label">{c.follow}</p><a href={localePath(locale,"social")}>{({en:"All channels",ja:"公式発信一覧","zh-tw":"所有官方平台",ko:"공식 채널 모음"})[locale]}</a><a href="https://www.instagram.com/riot.basketball.academy/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.threads.com/@riot.basketball.academy" target="_blank" rel="noreferrer">Threads</a><a href="https://note.com/rba_official" target="_blank" rel="noreferrer">note</a><a href="https://lin.ee/5l1YG8N" target="_blank" rel="noreferrer">LINE</a><a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a></div>
      <div className="footer-legal"><p>{ui(locale,"city")}</p><p>{ui(locale,"representative")}</p><p>© 2026 Riot Basketball Academy</p><p>{c.safeguard}</p><a href={localePath(locale,"policies")}>{({en:"Privacy · Terms · Safety · Cancellation",ja:"プライバシー・参加規約・安全・キャンセル","zh-tw":"隱私・條款・安全・取消政策",ko:"개인정보・약관・안전・취소 정책"})[locale]}</a></div>
    </footer>
    <a className="member-dock" href={memberHref}><House size={20}/><span>MY HOME COURT</span><ArrowRight size={16}/></a>
    <a className="whatsapp-dock" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={c.whatsapp}><MessageCircle size={21}/><span>{c.whatsapp}</span></a>
  </div>;
}
