import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Check, CreditCard, LockKeyhole, RefreshCw, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { canReadMemberArticles } from "@/lib/member-article-access";
import { HOMECOURT_BILLING_PORTAL } from "@/lib/homecourt-billing";
import { memberArticles } from "@/lib/member-articles";
import styles from "./subscribe.module.css";

export const dynamic="force-dynamic";
export const metadata:Metadata={title:"HOMECOURT メンバーシップ | RBA",robots:{index:false,follow:false}};

const checkout="/api/commerce/checkout/homecourt-monthly?locale=ja";
const statusCopy:Record<string,string>={
  guardian_required_for_minor:"未成年の選手本人アカウントから直接決済できません。保護者アカウントとの確認後にお手続きください。",
  guardian_link_required:"保護者と選手のアカウント連携を確認できませんでした。連携状況をご確認ください。",
  payment_route_unavailable:"現在、Stripe決済を開始できません。時間を置いてもう一度お試しください。",
  checkout_unavailable:"決済を開始できませんでした。契約状況を確認してから、もう一度お試しください。",
  subscription_already_active:"すでにHOMECOURTの契約記録があります。新しく決済せず、現在の契約状況をご確認ください。",
  subscription_payment_issue:"既存のHOMECOURT契約でお支払い確認が必要です。新しい契約を作らず、Stripeの契約管理画面からカード・請求状況をご確認ください。",
};
export default async function Page({searchParams}:{searchParams:Promise<{status?:string|string[]}>}){
  const query=await searchParams;
  const status=typeof query.status==="string"?query.status:"";
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user) redirect(`/ja/my-homecourt/login?next=${encodeURIComponent("/ja/my-homecourt/subscribe")}`);
  const {data,error}=await db.from("subscriptions")
    .select("id,status,plan_key,current_period_end,cancel_at_period_end")
    .eq("user_id",user.id).eq("plan_key","homecourt_monthly");
  const subscriptions=data||[];
  const active=!error&&canReadMemberArticles(subscriptions);
  const pending=!active&&subscriptions.some(item=>["active","trialing"].includes(item.status)&&(!item.current_period_end||!Number.isFinite(Date.parse(item.current_period_end))));
  const paymentIssue=subscriptions.some(item=>["past_due","unpaid"].includes(item.status));
  const playerCount=memberArticles.filter(item=>item.role==="player").length;
  const parentCount=memberArticles.filter(item=>item.role==="parent").length;
  const coachCount=memberArticles.filter(item=>item.role==="coach").length;
  return <main className={styles.shell}>
    <header><Link href="/ja/my-homecourt">RBA / MY HOME COURT</Link><Link href="/ja/my-homecourt/app">HOME COURTを開く</Link></header>
    <section className={styles.hero}>
      <p>HOMECOURT PLUS / MONTHLY</p>
      <h1>学んで、試して、振り返る。<br/>成長を続けるためのホームコート。</h1>
      <p className={styles.lead}>RBA IDと月額メンバーシップをつなぎ、選手・保護者・指導者それぞれの学びを、次の練習や試合、会話へ持ち帰れます。</p>
    </section>
    {status&&statusCopy[status]?<section className={styles.alert} role="alert"><strong>{status==="subscription_already_active"?"現在の契約をご確認ください":status==="subscription_payment_issue"?"契約中のお支払い状況をご確認ください":"決済を開始できませんでした"}</strong><p>{statusCopy[status]}</p><Link href="/ja/contact">RBAへ問い合わせる</Link></section>:null}
    {error?<section className={styles.alert} role="alert"><strong>契約状況を確認できませんでした</strong><p>追加のお支払いはせず、時間を置いてもう一度このページを開いてください。</p></section>:null}
    {active?<section className={styles.state}><ShieldCheck/><div><p>MEMBERSHIP ACTIVE</p><h2>HOMECOURTを利用できます。</h2><p>現在のRBA IDで会員コンテンツを開けます。</p><div><Link className={styles.primary} href="/ja/my-homecourt/app/learn">学びのライブラリを開く</Link><a className={styles.secondary} href={HOMECOURT_BILLING_PORTAL} target="_blank" rel="noreferrer">カード・請求書・解約</a></div></div></section>
    :paymentIssue?<section className={styles.state}><CreditCard/><div><p>PAYMENT ACTION NEEDED</p><h2>既存の契約のお支払い状況をご確認ください。</h2><p>新しいメンバーシップを作る必要はありません。Stripeの契約管理画面でカード・請求状況を確認してください。</p><div><a className={styles.primary} href={HOMECOURT_BILLING_PORTAL} target="_blank" rel="noreferrer">Stripeで契約を確認する</a><Link className={styles.secondary} href="/ja/contact">RBAへ問い合わせる</Link></div></div></section>
    :pending?<section className={styles.state}><RefreshCw/><div><p>MEMBERSHIP SYNCING</p><h2>メンバーシップの反映を確認しています。</h2><p>決済済みの場合は、もう一度支払わないでください。StripeとRBA IDの同期後に会員コンテンツが開きます。</p><div><Link className={styles.primary} href="/ja/my-homecourt/app/my">契約状況を確認する</Link><Link className={styles.secondary} href="/ja/contact">反映されない場合はこちら</Link></div></div></section>
    :error?null:<><section className={styles.plan}>
      <div><span>MONTHLY</span><strong>¥3,300</strong><small>毎月のメンバーシップ</small></div>
      <ul>
        <li><Check/>PLAYER：{playerCount}本の実践ガイド</li>
        <li><Check/>PARENT：{parentCount}本の保護者向け実践ガイド</li>
        <li><Check/>COACH：{coachCount}本の指導者向けガイド</li>
        <li><Check/>学ぶ → 試す → 振り返る → 次を決める</li>
        <li><Check/>参加履歴・目標・次の育成機会と同じRBA IDでつながる</li>
      </ul>
      <div className={styles.account}><LockKeyhole/><div><strong>ログイン中のRBA ID</strong><span>{user.email||"メールアドレス確認済みアカウント"}</span></div></div>
      <a className={styles.checkout} href={checkout}><CreditCard/>Stripeで月額メンバーシップを始める</a>
      <p className={styles.note}>このボタンからRBAの公式Stripe決済ページへ進みます。決済時も、できるだけこのRBA IDと同じメールアドレスをご利用ください。</p>
    </section>
    <section className={styles.steps}><article><span>01</span><strong>RBA ID</strong><p>先にログインして、誰のメンバーシップかを確認します。</p></article><article><span>02</span><strong>STRIPE</strong><p>Stripe画面で月額¥3,300の内容を確認して決済します。</p></article><article><span>03</span><strong>HOME COURT</strong><p>決済後はRBAへ戻り、会員状態が反映されるとライブラリを利用できます。</p></article></section></>}
    <section className={styles.footer}><Link href="/ja/policies">参加規約・方針を確認</Link><Link href="/ja/contact">決済について問い合わせる</Link></section>
  </main>;
}
