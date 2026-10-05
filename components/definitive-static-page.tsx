/* eslint-disable @next/next/no-html-link-for-pages -- static platform pages use a shared locale-aware HTML shell. */
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Script from "next/script";
import { localePath, type LanguagePage, type Locale } from "@/components/site-frame";

type RbaLocale = Locale;
type Props = { page: string; locale: RbaLocale };

const languageLabels:Record<Locale,string>={en:"EN",ja:"日本語","zh-tw":"繁中",ko:"한국어"};

function extractContent(html: string) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (main) return main[1];
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return body ? body[1] : html
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");
}

function sanitizeFragment(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi, "")
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<title[\s\S]*?<\/title>/gi, "")
    .replace(/\s(?:src|href)=["']\/assets\//gi, (m) => m.replace('/assets/', '/rba-definitive/assets/'))
    .replace(/\s(?:src|href)=["'](?:\.\.\/)*assets\//gi, (m) => m.replace(/(?:\.\.\/)*assets\//i, '/rba-definitive/assets/'));
}

function StaticHeader({locale,page}:{locale:Locale;page:string}){
  const secondary=locale==="ja"?["育成ガイド","/ja/development"] as const:[({en:"JOURNAL","zh-tw":"JOURNAL",ko:"JOURNAL"})[locale as "en"|"zh-tw"|"ko"],localePath(locale,"journal")] as const;
  const nav=[
    [({en:"Find",ja:"活動を探す","zh-tw":"尋找活動",ko:"활동 찾기"})[locale],localePath(locale,"opportunities")] as const,
    secondary,
    [({en:"Teams / organisers",ja:"チーム・団体","zh-tw":"團隊・主辦",ko:"팀・단체"})[locale],localePath(locale,"organizer")] as const,
    [({en:"International",ja:"海外交流","zh-tw":"國際交流",ko:"국제 교류"})[locale],localePath(locale,"international")] as const,
    [({en:"About",ja:"RBAについて","zh-tw":"關於RBA",ko:"RBA 소개"})[locale],localePath(locale,"about")] as const,
  ];
  const member=localePath(locale,"my-homecourt");
  return <header className="site-header" id="site-header"><div className="wrap nav">
    <a aria-label="Riot Basketball Academy home" className="brand" href={localePath(locale)}><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy" width={203} height={284} className="official-logo"/><span className="brand-wordmark">RBA<small>RIOT BASKETBALL ACADEMY</small></span></a>
    <nav aria-label="Main navigation" className="desktop-nav">{nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
    <div aria-label="Language" className="language-switch">{(Object.keys(languageLabels) as Locale[]).map(lang=><a key={lang} href={localePath(lang,page as LanguagePage)} aria-current={lang===locale?"page":undefined}>{languageLabels[lang]}</a>)}</div>
    <a className="btn fill nav-cta" href={member}>MY HOME COURT</a>
    <button aria-controls="mobile-menu" aria-expanded="false" aria-label={locale==="ja"?"メニューを開く":"Open menu"} className="mobile-btn" type="button">MENU</button>
  </div><div aria-hidden="true" className="mobile-panel" id="mobile-menu">
    <a href={localePath(locale,"opportunities")}>{({en:"Find opportunities",ja:"活動を探す","zh-tw":"尋找活動",ko:"활동 찾기"})[locale]}</a>
    <a href={secondary[1]}>{secondary[0]}</a>
    <a href={member}>MY HOME COURT</a>
    <a href={localePath(locale,"organizer")}>{({en:"Teams / organisers",ja:"チーム・団体","zh-tw":"團隊・主辦",ko:"팀・단체"})[locale]}</a>
    <a href={localePath(locale,"international")}>{({en:"International",ja:"海外交流","zh-tw":"國際交流",ko:"국제 교류"})[locale]}</a>
    <a href={localePath(locale,"about")}>{({en:"About",ja:"RBAについて","zh-tw":"關於RBA",ko:"RBA 소개"})[locale]}</a>
    <a href={localePath(locale,"policies")}>{({en:"Policies",ja:"参加規約・安全方針","zh-tw":"條款・安全",ko:"약관·안전"})[locale]}</a>
    <a href={localePath(locale,"contact")}>{({en:"Contact",ja:"お問い合わせ","zh-tw":"聯絡我們",ko:"문의하기"})[locale]}</a>
  </div></header>;
}

function StaticFooter({locale}:{locale:Locale}){
  return <footer className="footer"><div className="wrap footer-grid">
    <div className="footer-brand"><a className="brand" href={localePath(locale)} aria-label="Riot Basketball Academy"><Image src="/rba-logo-original.jpg" alt="Riot Basketball Academy" width={203} height={284} className="official-logo"/><span className="brand-wordmark">RBA<small>RIOT BASKETBALL ACADEMY</small></span></a><p>{({en:"Development opportunities across Japan and Asia.",ja:"育成の選択肢を、全国へ。","zh-tw":"把培育選擇連結到日本與亞洲。",ko:"육성의 선택지를 일본과 아시아로."})[locale]}</p></div>
    <div><strong>START</strong><a href={localePath(locale,"opportunities")}>{({en:"Find opportunities",ja:"活動を探す","zh-tw":"尋找活動",ko:"활동 찾기"})[locale]}</a><a href={localePath(locale,"my-homecourt")}>MY HOME COURT</a><a href={localePath(locale,"journal")}>JOURNAL</a></div>
    <div><strong>CONNECT</strong><a href={localePath(locale,"organizer")}>{({en:"Teams / organisers",ja:"チーム・団体","zh-tw":"團隊・主辦",ko:"팀・단체"})[locale]}</a><a href={localePath(locale,"international")}>{({en:"International",ja:"海外交流","zh-tw":"國際交流",ko:"국제 교류"})[locale]}</a><a href={localePath(locale,"contact")}>{({en:"Contact",ja:"お問い合わせ","zh-tw":"聯絡我們",ko:"문의하기"})[locale]}</a></div>
    <div><strong>TRUST</strong><a href={localePath(locale,"about")}>{({en:"About",ja:"RBAについて","zh-tw":"關於RBA",ko:"RBA 소개"})[locale]}</a><a href={localePath(locale,"policies")}>{({en:"Policies & safety",ja:"参加規約・安全方針","zh-tw":"條款與安全",ko:"약관·안전"})[locale]}</a></div>
  </div><div className="wrap footer-bottom"><span>© 2026 Riot Basketball Academy</span><span>Japan × Asia Youth Basketball Development Platform</span></div></footer>;
}

export function DefinitiveStaticPage({ page, locale }: Props) {
  const file = path.join(process.cwd(), "definitive-content", locale, `${page}.html`);
  const html = sanitizeFragment(extractContent(fs.readFileSync(file, "utf8")));
  return <div className={`definitive-shell locale-${locale}`} lang={locale==="zh-tw"?"zh-Hant-TW":locale}>
    {/* Static content keeps its recovered visual system, while its header/footer are generated from one shared source. */}
    {/* eslint-disable-next-line @next/next/no-css-tags */}
    <link rel="stylesheet" href="/rba-definitive/assets/platform-mobile-v8.css" />
    <StaticHeader locale={locale} page={page}/>
    <main id="main-content"><div className={`definitive-static locale-${locale}`} dangerouslySetInnerHTML={{ __html: html }} /></main>
    <StaticFooter locale={locale}/>
    <Script src="/rba-definitive/assets/site.js" strategy="afterInteractive" />
  </div>;
}
