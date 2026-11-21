/**
 * RBA STORE transactional email configuration.
 * Do not treat a launch-approval flag as evidence of a working sender.
 * Never expose this configuration from a client component.
 */
export function getEssentialsNoticeConfig(){
 const p=process.env;
 const from=p.RBA_ESSENTIALS_NOTICE_FROM?.trim()||"";
 const apiKey=p.RBA_ESSENTIALS_RESEND_API_KEY?.trim()||"";
 const replyTo=p.RBA_ESSENTIALS_NOTICE_REPLY_TO?.trim()||"";
 const senderEmail=/^[^<>\r\n]{1,80}\s+<([^<>\s@]+@riotbasketballacademy\.com)>$/i.exec(from)?.[1]||"";
 const senderValid=senderEmail.length>0;
 const replyToValid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo);
 const configured=senderValid && replyToValid &&
   apiKey.startsWith("re_") && apiKey.length>8 &&
   p.RBA_ESSENTIALS_NOTICE_SENDER_VERIFIED==="true" &&
   p.RBA_ESSENTIALS_NOTICE_ENABLED==="true";
 return {configured,from,replyTo,apiKey};
}
