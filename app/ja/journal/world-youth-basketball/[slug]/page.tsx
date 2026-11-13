import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { GrowthClickTracking } from "@/components/growth-click-tracking";
import { SiteFrame } from "@/components/site-frame";
import { worldYouthFeatures, worldYouthJournalPath } from "@/lib/world-youth-journal";

const taiwanArticlePath = "/zh-tw/journal/world-youth-basketball";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return worldYouthFeatures.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = worldYouthFeatures.find((item) => item.slug === slug);
  if (!feature) notFound();

  const url = `https://riotbasketballacademy.com${worldYouthJournalPath}/${slug}`;
  return {
    title: `${feature.title} | RBA JOURNAL`,
    description: feature.description,
    alternates: slug === "taiwan-hbl"
      ? { canonical: url, languages: { ja: url, "zh-Hant-TW": taiwanArticlePath } }
      : { canonical: url },
    openGraph: { title: feature.title, description: feature.description, url, type: "article", locale: "ja_JP" },
  };
}

export default async function WorldYouthArticlePage({ params }: Props) {
  const { slug } = await params;
  const feature = worldYouthFeatures.find((item) => item.slug === slug);
  if (!feature) notFound();

  return (
    <SiteFrame locale="ja" languagePage="journal">
      <GrowthClickTracking />
      <article className="journal-article journal-cms-article">
        <header className="article-hero section-pad">
          <Link className="back-link" href={worldYouthJournalPath}>← 世界のユースバスケ</Link>
          {slug === "taiwan-hbl" && (
            <Link className="back-link" href={taiwanArticlePath} hrefLang="zh-TW" lang="zh-Hant-TW" data-growth-id="journal-hbl-traditional-chinese">
              繁體中文版・分享給台灣教練
            </Link>
          )}
          <p className="section-index">{feature.topic}</p>
          <h1>{feature.title}</h1>
          <div className="article-hero-summary"><p>{feature.description}</p></div>
        </header>
        <div className="article-body section-pad">
          <aside className="article-side-note">
            <nav aria-label="記事内目次">
              {feature.sections.map((section, index) => (
                <a key={section.heading} href={`#section-${index+1}`}>{section.heading}</a>
              ))}
              <a href="#feature-sources">参考資料</a>
            </nav>
          </aside>
          <div>
            {feature.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index+1}`}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <section id="feature-sources" aria-labelledby="feature-sources-title">
              <h2 id="feature-sources-title">参考資料</h2>
              <ul>{feature.sources.map((source) => (
                <li key={source.href}><a href={source.href}>{source.label}</a></li>
              ))}</ul>
            </section>
            <section aria-labelledby="feature-next">
              <h2 id="feature-next">次の学び方</h2>
              <p>{feature.next.description}</p>
              <a className="text-link" href={feature.next.href} data-growth-id={`journal-${slug}-next`}>
                {feature.next.label} <ArrowRight size={16} />
              </a>
            </section>
          </div>
        </div>
      </article>
    </SiteFrame>
  );
}
