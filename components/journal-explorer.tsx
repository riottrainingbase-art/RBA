"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";

type Locale = "en" | "ja" | "zh-tw" | "ko";
type JournalItem = {
  slug: string;
  category: string;
  audience: string;
  title: string;
  standfirst: string;
  reading: string;
  published_at: string | null;
  evidence_level: string | null;
  source_count: number;
};

const categoryOrder = ["development", "families", "coaching", "international", "programme"] as const;

const copy = {
  ja: {
    kicker: "ALL ARTICLES",
    title: "150本から、必要な記事だけ探す。",
    lead: "タイトルを眺め続けなくても大丈夫です。悩み・テーマ・対象者で絞り込めます。",
    search: "例：試合に出られない、U15、スクリーン、捻挫…",
    category: "テーマ",
    audience: "対象",
    any: "すべて",
    allPeople: "すべての方",
    families: "保護者",
    coaches: "指導者",
    players: "選手",
    partners: "海外・パートナー",
    results: "件の記事",
    read: "記事を読む",
    more: "さらに表示",
    clear: "条件をクリア",
    empty: "条件に合う記事がありません。検索語を短くするか、条件をクリアしてください。",
    categories: { development: "育成", families: "保護者", coaching: "指導者", international: "海外交流", programme: "プログラム" }
  },
  en: {
    kicker: "ALL ARTICLES", title: "Find the article you need.", lead: "Search and filter the Journal by topic and audience.",
    search: "Search the Journal…", category: "Topic", audience: "Audience", any: "All", allPeople: "Everyone", families: "Families", coaches: "Coaches", players: "Players", partners: "Partners", results: "articles", read: "Read article", more: "Show more", clear: "Clear filters", empty: "No articles match these filters.",
    categories: { development: "Development", families: "Families", coaching: "Coaching", international: "International", programme: "Programmes" }
  },
  "zh-tw": {
    kicker: "ALL ARTICLES", title: "找到現在需要的文章。", lead: "可依主題、對象與關鍵字篩選。",
    search: "搜尋文章…", category: "主題", audience: "對象", any: "全部", allPeople: "所有人", families: "家長", coaches: "教練", players: "球員", partners: "國際夥伴", results: "篇文章", read: "閱讀文章", more: "顯示更多", clear: "清除條件", empty: "沒有符合條件的文章。",
    categories: { development: "培育", families: "家長", coaching: "教練", international: "國際交流", programme: "活動" }
  },
  ko: {
    kicker: "ALL ARTICLES", title: "지금 필요한 글만 찾습니다.", lead: "주제, 대상, 키워드로 JOURNAL을 좁혀 볼 수 있습니다.",
    search: "글 검색…", category: "주제", audience: "대상", any: "전체", allPeople: "모두", families: "보호자", coaches: "코치", players: "선수", partners: "국제 파트너", results: "개 글", read: "글 읽기", more: "더 보기", clear: "조건 초기화", empty: "조건에 맞는 글이 없습니다.",
    categories: { development: "육성", families: "보호자", coaching: "코칭", international: "국제 교류", programme: "프로그램" }
  }
} as const;

function hrefFor(locale: Locale, slug: string) {
  return locale === "en" ? `/journal/${slug}` : `/${locale}/journal/${slug}`;
}

function normalize(value: string) {
  return value.toLocaleLowerCase().normalize("NFKC");
}

export function JournalExplorer({ locale, items }: { locale: Locale; items: JournalItem[] }) {
  const c = copy[locale];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [audience, setAudience] = useState("any");
  const [visible, setVisible] = useState(24);

  const availableAudiences = useMemo(() => {
    const values = new Set(items.map(item => item.audience));
    return ["families", "coaches", "players", "partners", "all"].filter(value => values.has(value));
  }, [items]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return items.filter(item => {
      if (category !== "all" && item.category !== category) return false;
      if (audience !== "any" && item.audience !== audience) return false;
      if (!q) return true;
      return normalize([item.title, item.standfirst, item.evidence_level || "", item.category, item.audience].join(" ")).includes(q);
    });
  }, [items, query, category, audience]);

  const shown = filtered.slice(0, visible);
  const hasFilters = Boolean(query || category !== "all" || audience !== "any");

  const resetVisible = () => setVisible(24);
  const clear = () => {
    setQuery("");
    setCategory("all");
    setAudience("any");
    setVisible(24);
  };

  return (
    <section className="journal-explorer section-pad" id="all-articles">
      <div className="journal-explorer-head">
        <div>
          <p className="section-index">{c.kicker}</p>
          <h2>{c.title}</h2>
        </div>
        <p>{c.lead}</p>
      </div>

      <div className="journal-explorer-controls">
        <label className="journal-search">
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={event => { setQuery(event.target.value); resetVisible(); }}
            placeholder={c.search}
            aria-label={c.search}
          />
          {query ? <button type="button" onClick={() => { setQuery(""); resetVisible(); }} aria-label={c.clear}><X size={17} /></button> : null}
        </label>

        <div className="journal-filter-row">
          <span>{c.category}</span>
          <div>
            <button className={category === "all" ? "is-active" : ""} onClick={() => { setCategory("all"); resetVisible(); }}>{c.any}</button>
            {categoryOrder.map(key => (
              <button key={key} className={category === key ? "is-active" : ""} onClick={() => { setCategory(key); resetVisible(); }}>
                {c.categories[key]}
                <small>{items.filter(item => item.category === key).length}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="journal-filter-row">
          <span>{c.audience}</span>
          <div>
            <button className={audience === "any" ? "is-active" : ""} onClick={() => { setAudience("any"); resetVisible(); }}>{c.any}</button>
            {availableAudiences.map(key => (
              <button key={key} className={audience === key ? "is-active" : ""} onClick={() => { setAudience(key); resetVisible(); }}>
                {key === "families" ? c.families : key === "coaches" ? c.coaches : key === "players" ? c.players : key === "partners" ? c.partners : c.allPeople}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="journal-results-head">
        <strong>{filtered.length} {c.results}</strong>
        {hasFilters ? <button type="button" onClick={clear}><X size={14} />{c.clear}</button> : null}
      </div>

      {shown.length ? (
        <div className="journal-explorer-grid">
          {shown.map(item => (
            <Link href={hrefFor(locale, item.slug)} key={item.slug} className="journal-explorer-card">
              <div className="journal-explorer-meta">
                <span>{c.categories[item.category as keyof typeof c.categories] || item.category}</span>
                <span>{item.reading}</span>
                {item.source_count ? <span>{locale === "ja" ? `参考文献 ${item.source_count}` : `${item.source_count} sources`}</span> : null}
              </div>
              <h3>{item.title}</h3>
              <p>{item.standfirst}</p>
              <div className="journal-explorer-card-foot">
                {item.evidence_level ? <small>{item.evidence_level}</small> : <small>RBA JOURNAL</small>}
                <strong>{c.read}<ArrowRight size={16} /></strong>
              </div>
            </Link>
          ))}
        </div>
      ) : <div className="journal-explorer-empty">{c.empty}</div>}

      {visible < filtered.length ? (
        <button className="journal-load-more" type="button" onClick={() => setVisible(value => value + 24)}>
          {c.more}<span>{Math.min(visible, filtered.length)} / {filtered.length}</span>
        </button>
      ) : null}
    </section>
  );
}
