import fs from "node:fs";
import path from "node:path";
import Script from "next/script";
import { SiteFrame, type LanguagePage } from "@/components/site-frame";
type RbaLocale = "en" | "ja" | "zh-tw" | "ko";

type Props = { page: string; locale: RbaLocale };

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

export function DefinitiveStaticPage({ page, locale }: Props) {
  const file = path.join(process.cwd(), "definitive-content", locale, `${page}.html`);
  const html = sanitizeFragment(extractContent(fs.readFileSync(file, "utf8")));
  return (
    <SiteFrame locale={locale} languagePage={page as LanguagePage}>
      {/* Static content keeps its recovered visual system, while navigation and footer are shared globally. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/rba-definitive/assets/platform-mobile-v8.css" />
      <div className={`definitive-static locale-${locale}`} lang={locale==="zh-tw"?"zh-Hant-TW":locale} dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/rba-definitive/assets/site.js" strategy="afterInteractive" />
    </SiteFrame>
  );
}
