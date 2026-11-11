import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { worldYouthFeatures, worldYouthJournalPath } from "@/lib/world-youth-journal";

export const metadata: Metadata = {
  title: "世界のユースバスケ・コーチングコラム | RBA JOURNAL",
  description: "台湾の高校バスケ、世界の育成事情と、日本のコートで試せるコーチングの実践例。",
  alternates: { canonical: `https://riotbasketballacademy.com${worldYouthJournalPath}` },
};

export default function WorldYouthJournalPage() {
  return (
    <SiteFrame locale="ja" languagePage="journal">
      <div className="journal-hub journal-cms">
        <header className="journal-cms-hero section-pad">
          <Link href="/ja/journal" className="back-link">← RBA JOURNAL</Link>
          <p className="section-index">RBA JOURNAL</p>
          <h1>世界のユースバスケ</h1>
          <p>子どもたちはどこで学び、誰と競い、どう次の年代に進むのか。海外の育成事情と、日本のコートで試せるコーチングを届けます。</p>
        </header>
        <section className="journal-cms-index section-pad" aria-labelledby="world-youth-stories">
          <div className="section-head">
            <div><h2 id="world-youth-stories">創刊号とコーチングコラム</h2></div>
          </div>
          <div className="journal-cms-grid">
            {worldYouthFeatures.map((feature) => (
              <Link key={feature.slug} href={`${worldYouthJournalPath}/${feature.slug}`}>
                <p className="note-tag">{feature.topic}</p>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <strong>記事を読む <ArrowRight size={16} /></strong>
              </Link>
            ))}
          </div>
          <div className="homecourt-launch-actions">
            <Link className="button button-light" href="/ja/journal#world-youth-basketball-map">
              各国の育成制度を比較する <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </SiteFrame>
  );
}
