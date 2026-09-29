"use client";

import {useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRight,Search} from "lucide-react";
import styles from "./dhub-paid-library.module.css";

type ExplorerArticle={
  slug:string;
  category:string;
  title:string;
  summary:string;
  reading:string;
  sourceCount:number;
};

export function DhubPlayerLibraryExplorer({articles,root}:{articles:ExplorerArticle[];root:string}){
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("ALL");
  const [limit,setLimit]=useState(18);
  const categories=useMemo(()=>Array.from(new Set(articles.map(a=>a.category))).sort((a,b)=>a.localeCompare(b,"ja")),[articles]);
  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return articles.filter(article=>{
      if(category!=="ALL"&&article.category!==category)return false;
      if(!q)return true;
      return [article.title,article.summary,article.category].join(" ").toLowerCase().includes(q);
    });
  },[articles,query,category]);
  const visible=filtered.slice(0,limit);
  return <section className={styles.explorer}>
    <div className={styles.explorerHead}>
      <div><p className={styles.eyebrow}>QUICK FIND / PLAYER LIBRARY</p><h2>今の困りごとから探す。</h2><p>技名が分からなくても大丈夫です。「プレッシャー」「シュート」「試合終盤」「スクリーン」のように入力してください。</p></div>
      <div className={styles.explorerSearch}><Search size={18}/><input value={query} onChange={e=>{setQuery(e.target.value);setLimit(18)}} placeholder="例：プレッシャー、3x3、リバウンド"/></div>
    </div>
    <div className={styles.explorerCats}>
      <button type="button" data-active={category==="ALL"} onClick={()=>{setCategory("ALL");setLimit(18)}}>すべて <span>{articles.length}</span></button>
      {categories.map(cat=><button type="button" key={cat} data-active={category===cat} onClick={()=>{setCategory(cat);setLimit(18)}}>{cat} <span>{articles.filter(a=>a.category===cat).length}</span></button>)}
    </div>
    <div className={styles.explorerMeta}><strong>{filtered.length} ARTICLES</strong><span>{query?"「"+query+"」の検索結果":"検索語を入れなくてもカテゴリーから選べます。"}</span></div>
    {visible.length?<div className={styles.explorerGrid}>{visible.map(article=><Link href={root+"/"+article.slug} key={article.slug}>
      <div><span>{article.category}</span><span>{article.reading}</span><span>参考文献 {article.sourceCount}</span></div>
      <h3>{article.title}</h3><p>{article.summary}</p><strong>読む <ArrowRight size={15}/></strong>
    </Link>)}</div>:<div className={styles.explorerEmpty}>該当する記事がありません。検索語を短くしてみてください。</div>}
    {visible.length<filtered.length?<button type="button" className={styles.explorerMore} onClick={()=>setLimit(v=>v+18)}>さらに18本表示</button>:null}
  </section>;
}
