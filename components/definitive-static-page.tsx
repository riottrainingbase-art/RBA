import fs from "node:fs";
import path from "node:path";
import Script from "next/script";
type RbaLocale = "en" | "ja" | "zh-tw" | "ko";

type Props = { page: string; locale: RbaLocale };

function extractBody(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
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
  const html = sanitizeFragment(extractBody(fs.readFileSync(file, "utf8")));
  return (
    <>
      {/* Static V6 pages share the recovered platform stylesheet verbatim. */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/rba-definitive/assets/platform-mobile-v8.css" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/rba-definitive/assets/site.js" strategy="afterInteractive" />
    </>
  );
}
