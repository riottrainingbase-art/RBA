"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { coachPracticeNotes, coachResources, coachTopics } from "@/lib/coach-learning";
import { mvpDiscussionKinds, type MvpMember, type MvpReply, type MvpThread } from "@/lib/mvp-partner";
import styles from "./partner.module.css";

const memberColumns = "user_id,display_name,member_role,status";
const topicTitle = (id: string) => coachTopics.find(t => t.id === id)?.title || id;
const dateLabel = (value: string) => new Date(value).toLocaleString("en-GB", { timeZone: "Asia/Kuala_Lumpur", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });

export function PartnerRoom({ userId }: { userId: string }) {
  const [member, setMember] = useState<MvpMember | null>(null);
  const [members, setMembers] = useState<MvpMember[]>([]);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"discuss" | "learn" | "manage">("discuss");
  const [threads, setThreads] = useState<MvpThread[]>([]);
  const [threadCount, setThreadCount] = useState(0);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("all");
  const [selected, setSelected] = useState<MvpThread | null>(null);
  const [replies, setReplies] = useState<MvpReply[]>([]);
  const [replyCount, setReplyCount] = useState(0);
  const [replyLimit, setReplyLimit] = useState(50);
  const [replyState, setReplyState] = useState<"loading" | "ready" | "error">("loading");
  const [replyVersion, setReplyVersion] = useState(0);
  const [compose, setCompose] = useState(false);

  const load = useCallback(async (count = 30) => {
    const db = createClient();
    const own = await db.from("mvp_coach_members").select(memberColumns).eq("user_id", userId).maybeSingle();
    if (own.error) throw new Error("We could not load your partner access. Please try again.");
    const current = own.data as MvpMember | null;
    setMember(current);
    if (current?.status === "active") {
      const [people, discussions] = await Promise.all([
        db.from("mvp_coach_members").select(memberColumns).order("created_at"),
        db.from("mvp_coach_threads").select("*", { count: "exact" }).order("created_at", { ascending: false }).order("id").range(0, count - 1),
      ]);
      if (people.error || discussions.error) throw new Error("We could not refresh the coach room. Please try again.");
      setMembers((people.data || []) as MvpMember[]);
      setThreads((discussions.data || []) as MvpThread[]);
      setThreadCount(discussions.count || 0);
    } else { setMembers([]); setThreads([]); setSelected(null); }
    setFailed(false); setReady(true);
  }, [userId]);

  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => load()).catch(error => { if (!cancelled) { setFailed(true); setMessage(error.message); } });
    return () => { cancelled = true; };
  }, [load]);

  const selectedId = selected?.id;
  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    void (async () => {
      try {
        const { data, error, count } = await createClient().from("mvp_coach_replies").select("*", { count: "exact" }).eq("thread_id", selectedId).order("created_at").order("id").range(0, replyLimit - 1);
        if (cancelled) return;
        if (error) { setReplyState("error"); return; }
        setReplies((data || []) as MvpReply[]); setReplyCount(count || 0); setReplyState("ready");
      } catch { if (!cancelled) setReplyState("error"); }
    })();
    return () => { cancelled = true; };
  }, [selectedId, replyLimit, replyVersion]);

  async function run(action: () => Promise<void>) {
    if (lock.current) return;
    lock.current = true; setBusy(true); setMessage("");
    try { await action(); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Connection interrupted. Please try again."); }
    finally { lock.current = false; setBusy(false); }
  }
  async function requestAccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    await run(async () => {
      // RLS independently checks the confirmed email invitation. A URL or form field grants no access.
      const db = createClient();
      const display_name = String(form.get("name") || "").trim();
      const normal = await db.from("mvp_coach_members").insert({ user_id: userId, display_name, member_role: "coach", status: "pending" }).select(memberColumns).single();
      if (normal.error) {
        // Invited managers may only claim their predefined role, never a self-chosen privilege.
        const invited = await db.from("mvp_coach_members").insert({ user_id: userId, display_name, member_role: "manager", status: "active" }).select(memberColumns).single();
        if (invited.error) throw new Error("We could not submit your request. Check your name, refresh and try again. Contact RBA if it continues.");
      }
      await load(limit); setMessage("Your access request has been recorded.");
    });
  }
  async function postThread(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const element = event.currentTarget; const form = new FormData(element);
    await run(async () => {
      const { data, error } = await createClient().from("mvp_coach_threads").insert({ user_id: userId, title: String(form.get("title") || "").trim(), body: String(form.get("body") || "").trim(), kind: form.get("kind"), topic: form.get("topic"), age_group: String(form.get("age_group") || "").trim() }).select().single();
      if (error) throw new Error("Your discussion was not posted. Check the fields and your access, or wait a few minutes if you have posted several times.");
      element.reset(); setCompose(false); openThread(data as MvpThread);
      setMessage("Discussion posted to the MVP coach room."); await load(limit);
    });
  }
  async function postReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selected) return;
    const element = event.currentTarget; const form = new FormData(element);
    await run(async () => {
      const { error } = await createClient().from("mvp_coach_replies").insert({ user_id: userId, thread_id: selected.id, body: String(form.get("body") || "").trim() });
      if (error) throw new Error("Your reply was not posted. Refresh to check your access and whether the discussion is still open. If you posted several replies, wait a few minutes.");
      element.reset(); setReplyLimit(value => Math.max(value, replyCount + 1)); setReplyVersion(value => value + 1); setMessage("Reply posted.");
    });
  }
  function openThread(thread: MvpThread) {
    setSelected(thread); setReplies([]); setReplyCount(0); setReplyLimit(50); setReplyState("loading"); setReplyVersion(value => value + 1);
  }
  async function refresh() {
    await run(async () => {
      await load(limit);
      if (selected) {
        const { data, error } = await createClient().from("mvp_coach_threads").select("*").eq("id", selected.id).maybeSingle();
        if (error) throw new Error("Could not refresh this discussion.");
        setSelected(data as MvpThread | null); setReplyVersion(value => value + 1);
      }
      setMessage("Coach room refreshed.");
    });
  }
  async function manageAccess(person: MvpMember, status: "active" | "declined") {
    await run(async () => {
      const { data, error } = await createClient().from("mvp_coach_members").update({ status }).eq("user_id", person.user_id).select("user_id");
      if (error || !data?.length) throw new Error("Access was not changed. Refresh and try again.");
      await load(limit); setMessage(status === "active" ? `${person.display_name} can now enter the coach room.` : `${person.display_name} no longer has discussion access.`);
    });
  }
  async function changeThread(status: "open" | "resolved") {
    if (!selected) return;
    await run(async () => {
      const { data, error } = await createClient().from("mvp_coach_threads").update({ status }).eq("id", selected.id).select().single();
      if (error) throw new Error("The discussion status was not changed. Refresh and try again.");
      setSelected(data as MvpThread); await load(limit); setMessage(status === "resolved" ? "Marked resolved. Reopen whenever you need to continue." : "Discussion reopened.");
    });
  }
  async function remove(kind: "thread" | "reply", id: string) {
    if (!window.confirm(kind === "thread" ? "Delete this discussion and all its replies?" : "Delete this reply?")) return;
    await run(async () => {
      const { data, error } = await createClient().from(kind === "thread" ? "mvp_coach_threads" : "mvp_coach_replies").delete().eq("id", id).select("id");
      if (error || !data?.length) throw new Error("Nothing was deleted. Refresh and check your access.");
      if (kind === "thread") setSelected(null); else setReplyVersion(value => value + 1);
      await load(limit); setMessage("Removed from the discussion board.");
    });
  }
  const manager = member?.member_role === "manager";
  const author = (id: string) => members.find(person => person.user_id === id)?.display_name || "Partner coach";
  const badge = (id: string) => members.find(person => person.user_id === id)?.member_role === "manager" ? "PARTNERSHIP LEAD" : "MVP COACH";
  const visible = threads.filter(thread => (topic === "all" || thread.topic === topic) && `${thread.title} ${thread.body} ${thread.age_group}`.toLowerCase().includes(search.toLowerCase().trim()));

  if (!ready) return <section className={styles.section}><h1>Your MVP coach room</h1><p role="status">{failed ? message : "Checking your partner access…"}</p>{failed ? <button disabled={busy} onClick={() => void run(async () => { await load(); setMessage(""); })}>Try again</button> : null}</section>;
  if (member?.status !== "active") return <section className={styles.hero}><p className={styles.eyebrow}>RBA × MVP / PARTNER ACCESS</p><h1>You belong in<br />the conversation.</h1><p className={styles.lead}>The private room is for MVP coaches and RBA. Your name and request are visible to the partnership leads; approved coaches see your display name and contributions.</p>{!member ? <form onSubmit={requestAccess} className={styles.form}><label>Your coaching name<input name="name" required minLength={2} maxLength={60} placeholder="The name your colleagues know" autoComplete="name" /></label><label className={styles.check}><input type="checkbox" required />I am part of the MVP coaching team and agree to the <Link href="/policies" target="_blank">terms and privacy policy</Link>. I will keep player details anonymous and respect shared materials.</label><button className={styles.primary} disabled={busy}>Request MVP coach access →</button></form> : <div className={styles.callout}><h2>{member.status === "pending" ? "Your request is with the partnership leads." : "Your request needs a follow-up."}</h2><p>{member.status === "pending" ? "Wong or RBA can approve your access. Return here and refresh after approval. Your RBA ID is already set up." : "Contact Wong or RBA to check your academy affiliation."}</p><button disabled={busy} onClick={() => void refresh()}>Check access again</button></div>}<p role="status" className={styles.feedback}>{message}</p><Link href="/my-homecourt/app/coach-library?group=kuala-lumpur">Read the free coaching library while you wait ↗</Link><p><a href="mailto:riot.training.base@gmail.com?subject=MVP%20partner%20access">Ask RBA for access help</a></p></section>;

  return <>
    <section className={styles.roomHero}><p className={styles.eyebrow}>RBA × MVP / APPROVED PARTNER COACH</p><h1>Welcome to your<br /><em>coaching team’s room.</em></h1><p className={styles.lead}>Hello, {member.display_name}. Bring what you are seeing on court. We can learn more when we put our questions and experiences together.</p><p className={styles.muted}>Private to approved MVP and RBA coaches · Times shown in Malaysia time · Use Refresh for new posts and replies.</p></section>
    <nav className={styles.tabs} aria-label="Coach room sections"><button aria-pressed={tab === "discuss"} onClick={() => setTab("discuss")}>Questions & exchange</button><button aria-pressed={tab === "learn"} onClick={() => setTab("learn")}>Learning & practice</button>{manager ? <button aria-pressed={tab === "manage"} onClick={() => setTab("manage")}>Coach access ({members.filter(p => p.status === "pending").length})</button> : null}<button disabled={busy} onClick={() => void refresh()}>Refresh ↻</button></nav>
    <p role="status" aria-live="polite" className={styles.feedback}>{busy ? "Saving / refreshing…" : message}</p>
    {tab === "discuss" ? <section className={styles.section}><div className={styles.sectionHead}><div><p className={styles.eyebrow}>THE COACHES’ CONVERSATION</p><h2>What are you working on?</h2></div><button className={styles.primary} onClick={() => setCompose(value => !value)}>{compose ? "Close form" : "Start a discussion +"}</button></div>
      <p className={styles.muted}>Ask about a session, share a reflection or offer an idea. RBA and MVP coaches can respond here. Replies are asynchronous. Avoid players’ names, private contact details and identifiable player footage.</p>
      {compose ? <form className={styles.form} onSubmit={postThread}><div className={styles.formRow}><label>Post type<select name="kind">{Object.entries(mvpDiscussionKinds).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>Topic<select name="topic">{coachTopics.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label></div><label>Title<input name="title" required minLength={5} maxLength={140} placeholder="What is the one question or idea?" /></label><label>Age group / context<input name="age_group" maxLength={60} placeholder="e.g. U13 · 12 players · two baskets" /></label><label>What happened, and what would help?<textarea name="body" required minLength={10} maxLength={4000} rows={6} placeholder="Our goal… / What we tried… / What we observed… / My question…" /></label><button className={styles.primary} disabled={busy}>Post to the coach room</button></form> : null}
      <div className={styles.filters}><label>Search loaded discussions<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search a question or practice" /></label><label>Topic<select value={topic} onChange={e => setTopic(e.target.value)}><option value="all">All topics</option>{coachTopics.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label></div>
      <p className={styles.muted}>{visible.length} matching discussions · {threads.length} of {threadCount} loaded, newest first</p>
      <div className={styles.discussionLayout}><div className={styles.threadList}>{visible.map(thread => <button key={thread.id} className={styles.threadButton} aria-pressed={selected?.id === thread.id} onClick={() => openThread(thread)}><span className={styles.meta}>{mvpDiscussionKinds[thread.kind]} · {thread.status === "resolved" ? "Resolved" : "Open"}</span><strong>{thread.title}</strong><span>{topicTitle(thread.topic)}{thread.age_group ? ` · ${thread.age_group}` : ""}</span><small>{author(thread.user_id)} · {dateLabel(thread.created_at)}</small></button>)}{!visible.length ? <div className={styles.card}><h3>{threads.length ? "No matching discussions" : "Your first conversation starts here."}</h3><p>{threads.length ? "Change the search or topic, or load older discussions below." : "No coach posts yet. Start with one challenge from your next practice, or share an observation from the clinic."}</p></div> : null}{threads.length < threadCount ? <button disabled={busy} onClick={() => void run(async () => { const next = limit + 30; await load(next); setLimit(next); })}>Load older discussions</button> : null}</div>
      <article className={styles.conversation} aria-label="Selected discussion">{selected ? <><p className={styles.meta}>{mvpDiscussionKinds[selected.kind]} · {topicTitle(selected.topic)} · {selected.status}</p><h2>{selected.title}</h2><p className={styles.muted}>{author(selected.user_id)} · {badge(selected.user_id)} · {dateLabel(selected.created_at)}</p>{selected.age_group ? <p><strong>Context:</strong> {selected.age_group}</p> : null}<p className={styles.body}>{selected.body}</p><div className={styles.tools}>{selected.user_id === userId || manager ? <button disabled={busy} onClick={() => void changeThread(selected.status === "open" ? "resolved" : "open")}>{selected.status === "open" ? "Mark resolved" : "Reopen discussion"}</button> : null}{manager ? <button disabled={busy} onClick={() => void remove("thread", selected.id)}>Delete discussion</button> : null}</div><hr /><h3>Replies ({replyCount})</h3>{replyState === "loading" ? <p role="status">Loading replies…</p> : replyState === "error" ? <p role="alert">Could not load replies. <button onClick={() => setReplyVersion(value => value + 1)}>Try again</button></p> : <>{replies.map(reply => <article key={reply.id} className={styles.reply}><p className={styles.meta}>{author(reply.user_id)} · {badge(reply.user_id)}</p><small>{dateLabel(reply.created_at)}</small><p className={styles.body}>{reply.body}</p>{reply.user_id === userId || manager ? <button disabled={busy} onClick={() => void remove("reply", reply.id)}>Delete reply</button> : null}</article>)}{!replies.length ? <p className={styles.muted}>No replies yet. Share a useful observation or ask a follow-up question.</p> : null}{replies.length < replyCount ? <button onClick={() => setReplyLimit(value => value + 50)}>Load more replies</button> : null}</>}{selected.status === "open" ? <form className={styles.form} onSubmit={postReply}><label>Your reply<textarea name="body" required minLength={2} maxLength={3000} rows={4} placeholder="What have you tried? What would you suggest?" /></label><button className={styles.primary} disabled={busy}>Reply to this discussion</button></form> : <p className={styles.callout}>This discussion is resolved. Its author or a partnership lead can reopen it to continue.</p>}</> : <div className={styles.empty}><span className={styles.number}>Q ↔ A</span><h3>One question can help the whole team.</h3><p>Choose a discussion to read and reply, or start a new conversation. Questions and practical experiences are both welcome.</p></div>}</article></div>
    </section> : null}
    {tab === "learn" ? <Learning /> : null}
    {tab === "manage" && manager ? <section className={styles.section}><p className={styles.eyebrow}>PARTNERSHIP LEADS</p><h2>Welcome the right coaches.</h2><p>Confirm each coach’s name with your team before approving. Approval opens all partner discussions. Declining or removing access hides the board from that coach; their previous contributions remain available to the group.</p><h3>Requests ({members.filter(p => p.status === "pending").length})</h3>{!members.some(p => p.status === "pending") ? <p className={styles.muted}>No pending requests. Use Refresh to check for new coaches.</p> : null}{members.filter(p => p.status === "pending").map(person => <div className={styles.person} key={person.user_id}><strong>{person.display_name}</strong><button disabled={busy} onClick={() => void manageAccess(person, "active")}>Approve</button><button disabled={busy} onClick={() => void manageAccess(person, "declined")}>Decline</button></div>)}<h3>Your coaching group</h3>{members.filter(p => p.status !== "pending").map(person => <div className={styles.person} key={person.user_id}><span><strong>{person.display_name}</strong><small>{person.member_role === "manager" ? "Partnership lead" : "Coach"} · {person.status}</small></span>{person.member_role !== "manager" ? <button disabled={busy} onClick={() => void manageAccess(person, person.status === "active" ? "declined" : "active")}>{person.status === "active" ? "Remove access" : "Approve access"}</button> : null}</div>)}<p className={styles.callout}>Invite your coaches with <Link href="/partners/mvp">the MVP welcome page</Link>. Each person uses their own RBA ID, then requests access here.</p></section> : null}
  </>;
}

function Learning() {
  const [topic, setTopic] = useState("all");
  const [search, setSearch] = useState("");
  const resources = coachResources.filter(item => (topic === "all" || item.topics.some(id => id === topic)) && `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase().trim()));
  return <section className={styles.section}><p className={styles.eyebrow}>YOUR PARTNER LEARNING DESK</p><h2>Find one idea. Bring it to practice.</h2><p>Start with a question from your team. Read the original reference, test one adjustment and bring your observations back to the discussion board.</p><div className={styles.filters}><label>Search resources<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Try movement, shooting or games" /></label><label>Topic<select value={topic} onChange={e => setTopic(e.target.value)}><option value="all">All topics</option>{coachTopics.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label></div><p className={styles.muted}>{resources.length} resources · English · Publisher links open in a new tab</p><div className={styles.grid}>{resources.map(item => <article className={styles.card} key={item.id}><p className={styles.meta}>{item.kind} · {item.publisher}</p><h3>{item.title}</h3><p>{item.description}</p><small>{item.access}</small><a href={item.href} target="_blank" rel="noreferrer">Read the resource ↗</a></article>)}</div>{!resources.length ? <p>No resources match. Try a different topic or clear the search.</p> : null}<p><Link href="/my-homecourt/app/coach-library?group=kuala-lumpur">Open the full coach library to save resources and choose learning interests ↗</Link></p><h2 className={styles.section}>Try one simple coaching task.</h2><div className={styles.grid}>{coachPracticeNotes.filter(item => topic === "all" || item.topic === topic).map(item => <article className={styles.card} key={item.topic}><p className={styles.meta}>RBA PRACTICE PROMPT</p><h3>{item.title}</h3><p><strong>Try:</strong> {item.task}</p><p><strong>Watch:</strong> {item.observe}</p><p><strong>Ask:</strong> {item.question}</p></article>)}</div><p className={styles.muted}>Adapt space, pace and group size to the players. These are original RBA coaching prompts. References remain with their publishers; full-text access depends on the source. Only share materials you are authorised to distribute.</p></section>;
}
