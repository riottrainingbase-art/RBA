"use client";

import {useMemo,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRight,Eye,FileText,Plus,Save,Search,Trash2} from "lucide-react";
import {saveArticle,restoreRevision} from "@/app/ja/d-hub/admin/articles/actions";
import styles from "@/app/ja/d-hub/admin/articles/admin-articles.module.css";

type Section={heading:string;paragraphs:string[]};
type Ref={title?:string;source?:string;year?:number|null;url?:string;note?:string};
type Article={
 id?:string;
 program_type:"coach_lab"|"players";
 slug:string;
 category:string;
 title:string;
 summary:string;
 reading:string;
 sections:Section[];
 field_action:string;
 reflection_questions:string[];
 related_public_slugs:string[];
 source_references:Ref[];
 editorial_note?:string;
 published?:boolean;
 published_at?:string|null;
 has_admin_draft?:boolean;
};
type PublicPost={slug:string;title:string;category:string;referenceCount:number};
type Revision={id:string;revision_no:number;created_at:string;change_note:string|null};

const warningRules=[
 ["「重要です」が残っています",/重要です/g],
 ["「大切です」が残っています",/大切です/g],
 ["「〜していきます」型の表現があります",/していきます/g],
 ["「ということです」があります",/ということです/g],
 ["「本記事では」があります",/本記事では/g],
 ["「以下では」があります",/以下では/g],
 ["「いかがでしょうか」があります",/いかがでしょうか/g],
 ["「することができます」があります",/することができます/g],
] as const;

function localInputValue(iso?:string|null){
 if(!iso)return "";
 const d=new Date(iso);
 if(!Number.isFinite(d.getTime()))return "";
 const pad=(n:number)=>String(n).padStart(2,"0");
 return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())+"T"+pad(d.getHours())+":"+pad(d.getMinutes());
}

export function DhubArticleAdminEditor({
 initial,categories,publicPosts,revisions=[]
}:{initial:Article;categories:string[];publicPosts:PublicPost[];revisions?:Revision[]}){
 const [program,setProgram]=useState(initial.program_type);
 const [slug,setSlug]=useState(initial.slug||"");
 const [category,setCategory]=useState(initial.category||"");
 const [title,setTitle]=useState(initial.title||"");
 const [summary,setSummary]=useState(initial.summary||"");
 const [reading,setReading]=useState(initial.reading||"8 MIN READ");
 const [sections,setSections]=useState<Section[]>(
  initial.sections?.length?initial.sections:[
   {heading:"",paragraphs:[""]},
   {heading:"",paragraphs:[""]},
   {heading:"",paragraphs:[""]},
   {heading:"",paragraphs:[""]}
  ]
 );
 const [fieldAction,setFieldAction]=useState(initial.field_action||"");
 const [questions,setQuestions]=useState((initial.reflection_questions||[]).join("\n"));
 const [related,setRelated]=useState<string[]>(initial.related_public_slugs||[]);
 const [refs,setRefs]=useState<Ref[]>(initial.source_references||[]);
 const [note,setNote]=useState(initial.editorial_note||"");
 const [schedule,setSchedule]=useState(
  localInputValue(initial.published_at&&new Date(initial.published_at)>new Date()?initial.published_at:null)
 );
 const [postSearch,setPostSearch]=useState("");

 const fullText=useMemo(
  ()=>[title,summary,...sections.flatMap(s=>[s.heading,...s.paragraphs]),fieldAction,questions].join("\n"),
  [title,summary,sections,fieldAction,questions]
 );
 const warnings=useMemo(
  ()=>warningRules.map(([label,regex])=>({label,count:(fullText.match(regex)||[]).length})).filter(x=>x.count>0),
  [fullText]
 );
 const selectedPostRefs=useMemo(
  ()=>publicPosts.filter(p=>related.includes(p.slug)).reduce((sum,p)=>sum+p.referenceCount,0),
  [publicPosts,related]
 );
 const filteredPosts=useMemo(()=>{
  const q=postSearch.trim().toLowerCase();
  if(!q){
   return publicPosts.filter(p=>related.includes(p.slug))
    .concat(publicPosts.filter(p=>!related.includes(p.slug)).slice(0,8));
  }
  return publicPosts.filter(p=>[p.title,p.slug,p.category].join(" ").toLowerCase().includes(q)).slice(0,16);
 },[postSearch,publicPosts,related]);

 const payload=JSON.stringify({
  id:initial.id,
  program_type:program,
  slug,category,title,summary,reading,sections,
  field_action:fieldAction,
  reflection_questions:questions.split("\n").map(x=>x.trim()).filter(Boolean),
  related_public_slugs:related,
  manual_references:refs,
  editorial_note:note,
  publish_at:schedule?new Date(schedule).toISOString():null
 });

 function setSection(index:number,next:Partial<Section>){
  setSections(items=>items.map((item,i)=>i===index?{...item,...next}:item));
 }
 function addSection(){setSections(items=>[...items,{heading:"",paragraphs:[""]}])}
 function removeSection(index:number){
  setSections(items=>items.length<=3?items:items.filter((_,i)=>i!==index));
 }
 function toggleRelated(value:string){
  setRelated(items=>items.includes(value)?items.filter(x=>x!==value):[...items,value]);
 }
 function updateRef(index:number,next:Partial<Ref>){
  setRefs(items=>items.map((item,i)=>i===index?{...item,...next}:item));
 }

 const isLive=Boolean(initial.published&&(!initial.published_at||new Date(initial.published_at)<=new Date()));
 const currentState=!initial.published
  ?"下書き"
  :initial.published_at&&new Date(initial.published_at)>new Date()
   ?"公開予約"
   :initial.has_admin_draft
    ?"公開中 / 編集下書きあり"
    :"公開中";

 return <div className={styles.editorShell}>
  <div className={styles.editorTop}>
   <Link href="/ja/d-hub/admin/articles"><ArrowLeft size={15}/> 記事一覧</Link>
   <div><span>現在</span><strong>{currentState}</strong></div>
  </div>

  <form action={saveArticle}>
   <input type="hidden" name="payload" value={payload}/>

   <section className={styles.editorHero}>
    <div>
     <p>D-HUB ARTICLE CMS</p>
     <h1>{initial.id?"記事を編集":"新しい記事を作る"}</h1>
     <span>本文、参考文献、公開日時までこの画面で完結します。</span>
    </div>
    <div className={styles.programSwitch}>
     <button type="button" disabled={Boolean(initial.id)} className={program==="coach_lab"?styles.active:""} onClick={()=>setProgram("coach_lab")}>COACH LAB</button>
     <button type="button" disabled={Boolean(initial.id)} className={program==="players"?styles.active:""} onClick={()=>setProgram("players")}>PLAYERS</button>
    </div>
   </section>

   <div className={styles.editorGrid}>
    <main>
     <section className={styles.panel}>
      <h2>基本情報</h2>
      <label>タイトル<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="現場の言葉で、具体的に"/></label>
      <label>概要<textarea rows={4} value={summary} onChange={e=>setSummary(e.target.value)} placeholder="誰の、どんな悩みに答える記事か。"/></label>
      <div className={styles.twoCol}>
       <label>カテゴリ
        <input list="dhub-categories" value={category} onChange={e=>setCategory(e.target.value)} placeholder="例：練習設計"/>
        <datalist id="dhub-categories">{categories.map(c=><option value={c} key={c}/>)}</datalist>
       </label>
       <label>読了時間<input value={reading} onChange={e=>setReading(e.target.value)} placeholder="8 MIN READ"/></label>
      </div>
      <label>URL用スラッグ<input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="空欄なら自動生成"/></label>
     </section>

     <section className={styles.panel}>
      <div className={styles.panelHead}>
       <div><h2>本文</h2><p>段落の区切りは空行で入れます。</p></div>
       <button type="button" onClick={addSection}><Plus size={15}/> セクション追加</button>
      </div>
      <div className={styles.sections}>
       {sections.map((section,index)=><article key={index}>
        <div className={styles.sectionIndex}>
         <span>{String(index+1).padStart(2,"0")}</span>
         {sections.length>3?<button type="button" onClick={()=>removeSection(index)} aria-label="削除"><Trash2 size={15}/></button>:null}
        </div>
        <label>見出し<input value={section.heading} onChange={e=>setSection(index,{heading:e.target.value})}/></label>
        <label>本文
         <textarea
          rows={8}
          value={section.paragraphs.join("\n\n")}
          onChange={e=>setSection(index,{paragraphs:e.target.value.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean)})}
         />
        </label>
       </article>)}
      </div>
     </section>

     <section className={styles.panel}>
      <h2>{program==="coach_lab"?"次の現場でやること":"次の練習・試合でやること"}</h2>
      <textarea rows={5} value={fieldAction} onChange={e=>setFieldAction(e.target.value)} placeholder="読んだ後に、一つだけ試せる行動へ。"/>
      <h3>振り返りの問い</h3>
      <textarea rows={5} value={questions} onChange={e=>setQuestions(e.target.value)} placeholder={"1行に1問\n最低3問"}/>
     </section>

     <section className={styles.panel}>
      <div className={styles.panelHead}>
       <div><h2>関連する無料JOURNAL</h2><p>選んだ記事の参考文献は保存時に自動で取り込みます。</p></div>
       <span className={styles.refCount}>自動候補 {selectedPostRefs}件</span>
      </div>
      <label className={styles.searchBox}><Search size={16}/><input value={postSearch} onChange={e=>setPostSearch(e.target.value)} placeholder="タイトル・カテゴリ・slugで検索"/></label>
      <div className={styles.postPicker}>
       {filteredPosts.map(post=><button type="button" key={post.slug} onClick={()=>toggleRelated(post.slug)} className={related.includes(post.slug)?styles.selected:""}>
        <span>{post.category}</span><strong>{post.title}</strong><small>参考文献 {post.referenceCount}件</small>
       </button>)}
      </div>
     </section>

     <section className={styles.panel}>
      <div className={styles.panelHead}>
       <div><h2>参考文献</h2><p>COACH LABは参考文献0件では公開できません。関連JOURNALからの自動取得に加えて、手動追加もできます。</p></div>
       <button type="button" onClick={()=>setRefs(items=>[...items,{title:"",source:"",url:"",note:""}])}><Plus size={15}/> 追加</button>
      </div>
      <div className={styles.refs}>
       {refs.map((ref,index)=><article key={index}>
        <div className={styles.sectionIndex}><span>REF {String(index+1).padStart(2,"0")}</span><button type="button" onClick={()=>setRefs(items=>items.filter((_,i)=>i!==index))}><Trash2 size={14}/></button></div>
        <label>文献タイトル<input value={ref.title||""} onChange={e=>updateRef(index,{title:e.target.value})}/></label>
        <div className={styles.twoCol}>
         <label>出典<input value={ref.source||""} onChange={e=>updateRef(index,{source:e.target.value})}/></label>
         <label>年<input type="number" value={ref.year||""} onChange={e=>updateRef(index,{year:e.target.value?Number(e.target.value):null})}/></label>
        </div>
        <label>URL<input value={ref.url||""} onChange={e=>updateRef(index,{url:e.target.value})}/></label>
        <label>メモ<textarea rows={3} value={ref.note||""} onChange={e=>updateRef(index,{note:e.target.value})}/></label>
       </article>)}
      </div>
     </section>

     <section className={styles.panel}>
      <h2>編集メモ</h2>
      <textarea rows={4} value={note} onChange={e=>setNote(e.target.value)} placeholder="公開しない内部メモ。修正方針や次回追記など。"/>
     </section>
    </main>

    <aside>
     <section className={styles.stickyPanel}>
      <h2>公開</h2>
      {isLive?<p className={styles.liveEditNote}>公開中の記事は「内容を保存」「保存してプレビュー」では本番本文を変えません。編集下書きとして保存し、「今すぐ公開」で差し替えます。</p>:null}
      <label>公開予約日時<input type="datetime-local" value={schedule} onChange={e=>setSchedule(e.target.value)}/></label>
      <div className={styles.publishButtons}>
       <button name="intent" value="save"><Save size={15}/> 内容を保存</button>
       <button name="intent" value="preview"><Eye size={15}/> 保存してプレビュー</button>
       <button name="intent" value="draft"><FileText size={15}/> 下書きに戻す</button>
       <button className={styles.primary} name="intent" value="publish"><ArrowRight size={15}/> 今すぐ公開</button>
       <button name="intent" value="schedule" disabled={!schedule||isLive}><ArrowRight size={15}/> 公開予約</button>
       {isLive?<small>公開中の記事の予約差し替えは、複製して新記事として予約します。</small>:null}
      </div>

      <div className={styles.checkPanel}>
       <strong>公開チェック</strong>
       <p>本文 {sections.filter(s=>s.heading&&s.paragraphs.length).length} セクション</p>
       <p>振り返り {questions.split("\n").filter(x=>x.trim()).length} 問</p>
       <p>参考文献 手動{refs.length}件＋自動候補{selectedPostRefs}件</p>
      </div>

      <div className={warnings.length?styles.warnings:styles.clean}>
       <strong>{warnings.length?"日本語表現の確認":"日本語チェック"}</strong>
       {warnings.length?warnings.map(w=><p key={w.label}>{w.label} × {w.count}</p>):<p>定型的なAI表現の検出なし</p>}
      </div>
     </section>

     {revisions.length?<section className={styles.revisions}>
      <h2>変更履歴</h2>
      {revisions.slice(0,8).map(rev=><form action={restoreRevision} key={rev.id}>
       <input type="hidden" name="revision_id" value={rev.id}/>
       <div><strong>REV {rev.revision_no}</strong><span>{new Date(rev.created_at).toLocaleString("ja-JP")}</span><small>{rev.change_note||"save"}</small></div>
       <button type="submit">この版を下書きに復元</button>
      </form>)}
     </section>:null}
    </aside>
   </div>
  </form>
 </div>;
}
