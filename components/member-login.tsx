"use client";
import { FormEvent, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, LoaderCircle, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { memberAuthDestination } from "@/lib/member-auth-redirect";
import { createEmailLinkClient } from "@/lib/supabase/client";
import type { Locale } from "./site-frame";


const words={
  ja:{title:"RBA IDを作成・ログイン",lead:"RBA IDは、過去の参加履歴、これからのクリニック、保存した活動、学びを一つにつなぐ共通IDです。初めての方も、以前RBAに参加したことがある方も、メールアドレスから始められます。",email:"メールアドレス",changeEmail:"メールアドレスを変更",send:"ログイン用メールを送る",sent:"メールをご確認ください",sentBody:"届いたメールのリンクを開くと、RBA IDの作成またはログインが完了します。以前RBAに参加した方は、参加時と同じメールアドレスを使うと参加履歴の確認がスムーズです。",role:"あなたの立場",terms:"参加規約とプライバシーポリシーを確認し、同意します。",termsRequired:"送信するには、参加規約とプライバシーポリシーへの同意が必要です。",player:"PLAYER",parent:"PARENT",coach:"COACH",safe:"選手は自分の経験や次の活動を、保護者はお子さまの予定や履歴を、指導者はD-HUBや講習・学習履歴を確認できます。RBA ID一つで、それぞれの情報をつなげます。",back:"MY HOME COURTへ戻る",error:"送信できませんでした。メールアドレスを確認し、もう一度お試しください。"},
  en:{title:"Sign in with your RBA ID",lead:"Enter your email. Open the secure link we send to access MY HOME COURT.",email:"Email address",changeEmail:"Change email address",send:"Send sign-in link",sent:"Check your email",sentBody:"Open the sign-in link in the email. You can request another if it expires.",role:"Your first HOME",terms:"I agree to the terms and privacy policy.",termsRequired:"Agree to the terms and privacy policy before sending the sign-in link.",player:"PLAYER",parent:"PARENT",coach:"COACH",safe:"Players, parents and coaches can each enter through the route designed for them.",back:"Back to MY HOME COURT",error:"We could not send the email. Check the address and try again."},
  "zh-tw":{title:"使用RBA ID登入",lead:"輸入電子郵件，開啟收到的安全連結即可進入MY HOME COURT。",email:"電子郵件",changeEmail:"更改電子郵件",send:"傳送登入連結",sent:"請查看電子郵件",sentBody:"開啟郵件中的登入連結。連結失效時可重新傳送。",role:"第一個HOME",terms:"我同意使用條款與隱私政策。",termsRequired:"傳送登入連結前，請先同意使用條款與隱私政策。",player:"PLAYER",parent:"PARENT",coach:"COACH",safe:"球員、家長與教練可從各自的入口開始，並以兒少安全與角色權限為優先。",back:"返回MY HOME COURT",error:"無法傳送。請確認電子郵件後重試。"},
  ko:{title:"RBA ID로 로그인",lead:"이메일을 입력하고 전송된 보안 링크를 열어 MY HOME COURT에 접속하세요.",email:"이메일",changeEmail:"이메일 주소 변경",send:"로그인 링크 보내기",sent:"이메일을 확인하세요",sentBody:"메일의 로그인 링크를 여세요. 만료되면 다시 요청할 수 있습니다.",role:"첫 HOME",terms:"이용약관과 개인정보처리방침에 동의합니다.",termsRequired:"로그인 링크를 보내기 전에 이용약관과 개인정보처리방침에 동의해 주세요.",player:"PLAYER",parent:"PARENT",coach:"COACH",safe:"선수, 보호자와 코치는 각자에게 맞는 경로로 시작하며 아동 안전과 역할별 권한을 우선합니다.",back:"MY HOME COURT로 돌아가기",error:"전송하지 못했습니다. 이메일을 확인하고 다시 시도하세요."}
} as const;


const feedback={
  ja:{expired:"ログインリンクを確認できませんでした。期限切れ、使用済み、または通信エラーの可能性があります。下のフォームから新しいリンクを送信してください。",rate:"送信が続いています。少し時間をおいてから、もう一度お試しください。"},
  en:{expired:"We could not verify your sign-in link. It may be expired, already used, or affected by a connection issue. Request a new link below.",rate:"Too many requests. Wait a little before trying again."},
  "zh-tw":{expired:"無法確認登入連結，可能已過期、已使用或遇到連線問題。請在下方重新申請連結。",rate:"傳送次數過多，請稍候再試。"},
  ko:{expired:"로그인 링크를 확인하지 못했습니다. 만료되었거나 이미 사용했거나 연결에 문제가 있을 수 있습니다. 아래에서 새 링크를 요청하세요.",rate:"요청이 너무 많습니다. 잠시 후 다시 시도하세요."},
} as const;

const authRecovery={
  ja:{browser:"ログインを始めたブラウザーを確認できませんでした。このブラウザーから新しいリンクを送り、そのリンクも同じブラウザーで開いてください。",expired:"このリンクは期限切れか、すでに使用されています。新しいリンクを一度だけ送信し、最後に届いたメールを開いてください。"},
  en:{browser:"We could not verify the browser that started sign-in. Request a new link here and open it in this same browser.",expired:"This link has expired or was already used. Request one new link and open the latest email."},
  "zh-tw":{browser:"無法確認開始登入的瀏覽器。請在此重新申請連結，並用同一個瀏覽器開啟。",expired:"此連結已過期或已使用。請申請一次新連結，並開啟最新收到的郵件。"},
  ko:{browser:"로그인을 시작한 브라우저를 확인하지 못했습니다. 여기서 새 링크를 요청하고 같은 브라우저에서 여세요.",expired:"링크가 만료되었거나 이미 사용되었습니다. 새 링크를 한 번 요청하고 가장 최근 메일을 여세요."},
} as const;

export function MemberLogin({locale,authError=false,next,source}:{locale:Locale;authError?:boolean|"browser"|"expired";next?:string;source?:string}){
  const c=words[locale]; const [email,setEmail]=useState(""); const [role,setRole]=useState("player"); const [terms,setTerms]=useState(false); const [busy,setBusy]=useState(false); const [sent,setSent]=useState(false); const [error,setError]=useState("");
  const submitting=useRef(false);
  const prefix=locale==="en"?"":`/${locale}`;
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if(submitting.current)return;
    if(!e.currentTarget.reportValidity())return;
    if(!terms){setError(c.termsRequired);return;}
    submitting.current=true;setBusy(true);setError("");
    try {
      const supabase=createEmailLinkClient();
      const destination=memberAuthDestination(next||`${prefix}/my-homecourt/app`);
      const redirectTo=`${location.origin}/auth/finish?next=${encodeURIComponent(destination)}`;
      const {error:sendError}=await supabase.auth.signInWithOtp({email:email.trim(),options:{emailRedirectTo:redirectTo,shouldCreateUser:true,data:{role,preferred_language:locale,signup_source:(source||"direct").slice(0,80)}}});
      if(sendError){setError(sendError.status===429?feedback[locale].rate:c.error);return;}
      setSent(true);
    }catch{setError(c.error);}
    finally{submitting.current=false;setBusy(false);}
  }
  return <main className="member-login-shell"><a className="member-login-back" href={`${prefix}/my-homecourt`}><ArrowLeft size={17}/>{c.back}</a><section className="member-login-card"><div className="member-login-copy"><p>RBA ID / ONE ID</p><h1>{c.title}</h1><span>{c.lead}</span><div className="member-login-trust"><ShieldCheck/><span>{c.safe}</span></div></div>{authError&&!sent?<p className="member-form-error" role="alert">{authError==="browser"||authError==="expired"?authRecovery[locale][authError]:feedback[locale].expired}</p>:null}{sent?<div className="member-login-sent" role="status"><CheckCircle2/><h2>{c.sent}</h2><p>{c.sentBody}</p><button type="button" onClick={()=>setSent(false)}>{c.changeEmail}</button></div>:<form onSubmit={submit} aria-busy={busy}><label>{c.email}<span><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} disabled={busy} autoCapitalize="none" spellCheck={false} autoComplete="email" required placeholder="you@example.com"/></span></label><fieldset><legend>{c.role}</legend><div>{["player","parent","coach"].map(item=><label key={item}><input type="radio" name="role" value={item} checked={role===item} onChange={e=>setRole(e.target.value)}/><span>{c[item as keyof typeof c]}</span></label>)}</div></fieldset><label className="member-terms"><input type="checkbox" checked={terms} onChange={e=>{setTerms(e.target.checked);if(e.target.checked)setError("");}}/><span>{c.terms} <a href={`${prefix}/policies`} target="_blank" rel="noreferrer">POLICY</a></span></label>{error?<p className="member-form-error" role="alert">{error}</p>:null}<button className="member-login-submit" disabled={busy}>{busy?<LoaderCircle className="spin"/>:<LockKeyhole/>}{c.send}</button></form>}</section></main>;
}
