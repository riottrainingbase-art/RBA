"use client";

import {useMemo,useState} from "react";
import Link from "next/link";
import {ArrowRight,Search} from "lucide-react";
import styles from "./dhub-paid-library.module.css";

type CoachExplorerArticle={
  slug:string;
  category:string;
  title:string;
  summary:string;
  reading:string;
  sourceCount:number;
  status:"started"|"completed"|null;
};

export function DhubCoachLibraryExplorer({articles,root}:{articles:CoachExplorerArticle[];root:string}){
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("ALL");
  const [status,setStatus]=useState("ALL");
  const [limit,setLimit]=useState(18);

  const categories=useMemo(
    ()=>Array.from(new Set(articles.map(a=>a.category))).sort((a,b)=>a.localeCompare(b,"ja")),
    [articles]
  );

  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return articles.filter(article=>{
      if(category!=="ALL"&&article.category!==category)return false;
      if(status==="COMPLETED"&&article.status!=="completed")return false;
      if(status==="STARTED"&&article.status!=="started")return false;
      if(status==="NOT_STARTED"&&article.status!==null)return false;
      if(!q)return true;
      return [article.title,article.summary,article.category].join(" ").toLowerCase().includes(q);
    });
  },[articles,query,category,status]);

  const visible=filtered.slice(0,limit);
  const completed=articles.filter(a=>a.status==="completed").length;
  const started=articles.filter(a=>a.status==="started").length;
  const notStarted=articles.length-completed-started;

  const resetLimit=()=>setLimit(18);

  return <section className={styles.explorer}>
    <div className={styles.explorerHead}>
      <div>
        <p className={styles.eyebrow}>QUICK FIND / COACH LAB</p>
        <h2>{articles.length}本を、全部読む必要はありません。</h2>
        <p>今の現場で困っていることから探してください。「出場時間」「3x3」「保護者」「ACL」「練習設計」「映像」のような言葉でも絞れます。</p>
      </div>
      <div className={styles.explorerSearch}>
        <Search size={18}/>
        <input
          value={query}
          onChange={e=>{setQuery(e.target.value);resetLimit()}}
          placeholder="例：出場時間、保護者、3x3、ACL"
        />
      </div>
    </div>

    <div className={styles.explorerCats}>
      <button type="button" data-active={category==="ALL"} onClick={()=>{setCategory("ALL");resetLimit()}}>すべて <span>{articles.length}</span></button>
      {categories.map(cat=><button type="button" key={cat} data-active={category===cat} onClick={()=>{setCategory(cat);resetLimit()}}>{cat} <span>{articles.filter(a=>a.category===cat).length}</span></button>)}
    </div>

    <div className={styles.explorerCats}>
      <button type="button" data-active={status==="ALL"} onClick={()=>{setStatus("ALL");resetLimit()}}>進捗すべて <span>{articles.length}</span></button>
      <button type="button" data-active={status==="NOT_STARTED"} onClick={()=>{setStatus("NOT_STARTED");resetLimit()}}>未着手 <span>{notStarted}</span></button>
      <button type="button" data-active={status==="STARTED"} onClick={()=>{setStatus("STARTED");resetLimit()}}>進行中 <span>{started}</span></button>
      <button type="button" data-active={status==="COMPLETED"} onClick={()=>{setStatus("COMPLETED");resetLimit()}}>完了 <span>{completed}</span></button>
    </div>

    <div className={styles.explorerMeta}>
      <strong>{filtered.length} ARTICLES</strong>
      <span>{query?"「"+query+"」の検索結果":"カテゴリーと進捗から選べます。"}</span>
    </div>

    {visible.length?<div className={styles.explorerGrid}>{visible.map(article=><Link href={root+"/"+article.slug} key={article.slug}>
      <div>
        <span>{article.category}</span>
        <span>{article.reading}</span>
        <span>参考文献 {article.sourceCount}</span>
        {article.status?<span>{article.status==="completed"?"COMPLETED":"IN PROGRESS"}</span>:null}
      </div>
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
      <strong>{article.status==="completed"?"振り返る":article.status==="started"?"続きを使う":"読む"} <ArrowRight size={15}/></strong>
    </Link>)}</div>:<div className={styles.explorerEmpty}>該当する記事がありません。検索語や絞り込みを変えてみてください。</div>}

    {visible.length<filtered.length?<button type="button" className={styles.explorerMore} onClick={()=>setLimit(v=>v+18)}>さらに18本表示</button>:null}
  </section>;
}
