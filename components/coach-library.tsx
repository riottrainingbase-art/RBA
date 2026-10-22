"use client";

import Link from "next/link";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { coachLibraryPath, coachTopics, coachResources, coachPracticeNotes, type CoachGroup, type CoachTopic } from "@/lib/coach-learning";
import styles from "./coach-learning.module.css";

export function CoachLibrary({ userId, group }: { userId: string; group: CoachGroup }) {
  const [topic, setTopic] = useState<CoachTopic | "all">("all");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);
  const [savedOnly, setSavedOnly] = useState(false);
  const pending = useRef(false);
  useEffect(() => {
    let mounted = true;
    const supabase = createClient();
    void (async () => {
      try {
        const { data, error } = await supabase.from("homecourt_saves").select("item_key").eq("user_id", userId).eq("item_type", "content").like("item_key", "coach-library-%");
        if (!mounted) return;
        if (error) { setStatus("We could not load your saved items. Reload to try again; you can still read every resource."); return; }
        const keys = (data || []).map(row => row.item_key as string);
        setSaved(keys.filter(key => key.startsWith("coach-library-resource-")));
        setInterests(keys.filter(key => key.startsWith("coach-library-topic-")));
        setReady(true);
      } catch { if (mounted) setStatus("We could not load your saved items. Reload to try again; reading is still available."); }
    })();
    return () => { mounted = false; };
  }, [userId]);
  async function toggle(id: string, kind: "resource" | "topic") {
    if (pending.current || !ready) return;
    pending.current = true;
    const key = `coach-library-${kind}-${id}`;
    setBusy(key); setStatus("");
    const current = kind === "resource" ? saved : interests;
    const exists = current.includes(key);
    try {
      const supabase = createClient();
      const resource = coachResources.find(item => item.id === id);
      const selected = coachTopics.find(item => item.id === id);
      const { error } = exists
        ? await supabase.from("homecourt_saves").delete().eq("user_id", userId).eq("item_type", "content").eq("item_key", key)
        : await supabase.from("homecourt_saves").insert({ user_id: userId, item_type: "content", item_key: key, title: kind === "topic" ? `Coaching interest: ${selected?.title}` : resource?.title, href: kind === "topic" ? `${coachLibraryPath(group)}#interests` : resource?.href, metadata: { source: "malaysia-coach-library", group, kind, topic: kind === "topic" ? id : undefined } });
      if (error) { setStatus("We could not save this change. Please try again."); return; }
      const update = (items: string[]) => exists ? items.filter(item => item !== key) : [...items, key];
      if (kind === "resource") setSaved(update); else setInterests(update);
      const { error: activityError } = await supabase.from("analytics_events").insert({ user_id: userId, event_name: exists ? "unsave" : "save", item_type: kind === "topic" ? "coach_interest" : "coach_resource", item_key: id, role: "coach", locale: "en", metadata: { source: "malaysia-coach-library", group } });
      setStatus(activityError ? "Saved to your RBA ID, but we could not send the activity update to RBA. You can email your learning question below." : kind === "topic" ? "Your topic preference has been updated." : exists ? "Resource removed from saved items." : "Resource saved to your RBA ID.");
    } catch { setStatus("Connection interrupted. Please try again."); }
    finally { pending.current = false; setBusy(null); }
  }
  function trackOpen(id: string) {
    // Opening is an interest signal, not a claim that the material has been read.
    const supabase = createClient();
    void supabase.from("analytics_events").insert({ user_id: userId, event_name: "learn_open", item_type: "coach_resource", item_key: id, role: "coach", locale: "en", metadata: { source: "malaysia-coach-library", group } }).then(() => {}, () => {});
  }
  const resources = useMemo(() => coachResources.filter(item =>
    (topic === "all" || item.topics.includes(topic)) &&
    (!savedOnly || saved.includes(`coach-library-resource-${item.id}`)) &&
    `${item.title} ${item.description} ${item.publisher} ${item.topics.map(id => coachTopics.find(t => t.id === id)?.title).join(" ")}`.toLowerCase().includes(search.trim().toLowerCase())
  ), [topic, savedOnly, saved, search]);
  const notes = coachPracticeNotes.filter(note => topic === "all" || note.topic === topic);
  const place = group === "penang" ? "Penang" : group === "kuala-lumpur" ? "Kuala Lumpur" : "Malaysia";
  return <main className={styles.shell}><div className={styles.wrap}>
    <header className={styles.top}><Link className={styles.brand} href="/"><Image src="/rba-logo-original.jpg" alt="RBA" width={35} height={49} /><span>RIOT BASKETBALL<br />ACADEMY</span></Link><Link href="/my-homecourt/app">My RBA ID ↗</Link></header>
    <section className={styles.hero}><p className={styles.eyebrow}>COACH LIBRARY / {place} / FREE WITH RBA ID</p><h1>What do you need for your next practice?</h1><p className={styles.lead}>Choose a question. Read one resource. Try one idea with your team. Return here to review and keep learning.</p><div className={styles.group}><a href="#resources">Find a resource ↓</a><a href="#practice">Simple practice ideas ↓</a><a href="#interests">Tell us your interests ↓</a></div><p className={styles.subtle}>Your saved items are private to your account. RBA administrators can see the topics you choose and resource-opening activity to plan future learning. Opening a link is not recorded as completion.</p></section>
    <section id="resources" className={styles.section}><p className={styles.eyebrow}>01 / READ & WATCH</p><h2>Find the right starting point.</h2><div className={styles.filters} role="group" aria-label="Filter resources by topic"><button className={styles.filter} aria-pressed={topic === "all"} onClick={() => setTopic("all")}>All topics</button>{coachTopics.map(item => <button className={styles.filter} key={item.id} aria-pressed={topic === item.id} onClick={() => setTopic(item.id)}>{item.title}</button>)}</div>
      <label className={styles.search}>Search resources<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Try shooting, games or movement" /></label>
      <div className={styles.filters}><button className={styles.filter} disabled={!ready} aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}>Saved resources ({saved.length})</button></div>
      <p className={styles.subtle} aria-live="polite">{resources.length} resources · English · Links open in a new tab</p>
      <div className={styles.grid}>{resources.map(item => { const key = `coach-library-resource-${item.id}`; return <article className={styles.card} key={item.id}><span className={styles.meta}>{item.kind}</span><h3>{item.title}</h3><p>{item.description}</p><small>{item.publisher}<br />{item.access}</small><div className={styles.actions}><a href={item.href} target="_blank" rel="noreferrer" onClick={() => trackOpen(item.id)}>Open resource ↗</a><button type="button" aria-label={`${saved.includes(key) ? "Unsave" : "Save"} ${item.title}`} aria-pressed={saved.includes(key)} disabled={!ready || busy !== null} onClick={() => void toggle(item.id, "resource")}>{busy === key ? "Saving…" : saved.includes(key) ? "Saved ✓" : "Save"}</button></div></article>; })}</div>
      {!resources.length ? <p className={styles.notice}>No resources match. Try another topic, clear the search or switch off Saved resources.</p> : null}
      <p className={styles.subtle}>References are linked to their original publishers. RBA’s practice prompts below are coaching suggestions, not statements issued or endorsed by FIBA or the IOC.</p>
    </section>
    <section id="practice" className={styles.section}><p className={styles.eyebrow}>02 / TAKE IT TO THE COURT</p><h2>Simple ideas to try.</h2><p className={styles.subtle}>Adapt space, pace and group size to the players. Use a clear court and allow recovery between turns. Review control and decisions before increasing difficulty.</p><div className={styles.notegrid}>{notes.map(note => <article className={styles.card} key={note.topic}><span className={styles.meta}>RBA PRACTICE PROMPT</span><h3>{note.title}</h3><p><strong>Try:</strong> {note.task}</p><p><strong>Watch:</strong> {note.observe}</p><p><strong>Ask:</strong> {note.question}</p></article>)}</div></section>
    <section id="interests" className={styles.section}><p className={styles.eyebrow}>03 / SHAPE WHAT COMES NEXT</p><h2>What would you like to learn more about?</h2><p className={styles.subtle}>Choose any topics. Each change is saved immediately to your RBA ID and shared with RBA’s administrators to guide future resources. This does not subscribe you to marketing emails.</p><div className={styles.interest}>{coachTopics.map(item => <label key={item.id}><input type="checkbox" checked={interests.includes(`coach-library-topic-${item.id}`)} disabled={!ready || busy !== null} onChange={() => void toggle(item.id, "topic")} /><span><strong>{item.title}</strong><small>{item.question}</small></span></label>)}</div><p className={styles.status} role="status" aria-live="polite">{status || (!ready ? "Loading your saved items…" : "You can change your choices at any time.")}</p><a href={`mailto:riot.training.base@gmail.com?subject=${encodeURIComponent(`Coach learning question — ${place}`)}&body=${encodeURIComponent("Hi Masato,\n\nMy coaching question is:\n\nTeam / age group:\n\nWhat we have tried:\n")}`}>Send Masato a specific coaching question ↗</a></section>
    <section className={styles.notice}><strong>Keep this route.</strong><p>Bookmark this page to return. To invite another coach, share the welcome page so they create their own RBA ID.</p><a href={`/coaches/malaysia?group=${group}`}>Open the page to share ↗</a></section>
    <footer className={styles.footer}><p>Riot Basketball Academy · Masato Nishio · <Link href="/policies">Terms & privacy</Link></p><p>This free starter collection is separate from paid D-HUB lessons and HOMECOURT PLUS guides. No paid access is granted or required here.</p></footer>
  </div></main>;
}
